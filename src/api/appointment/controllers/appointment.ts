import { factories } from "@strapi/strapi";

function generateSlots(schedule) {
  const slots = [];
  const start = new Date(schedule.startsAt);
  const end = new Date(schedule.endsAt);
  const durationMs = Number(schedule.slotDurationMinutes || 10) * 60 * 1000;
  let queueNumber = 1;

  for (let cursor = start.getTime(); cursor + durationMs <= end.getTime(); cursor += durationMs) {
    slots.push({
      start: new Date(cursor).toISOString(),
      end: new Date(cursor + durationMs).toISOString(),
      queueNumber
    });
    queueNumber += 1;
  }

  return slots;
}

export default factories.createCoreController("api::appointment.appointment", ({ strapi }) => ({
  async book(ctx) {
    const { patientName, mobileNumber, address, scheduleId, slotStart, reason } = ctx.request.body ?? {};

    if (!patientName || !mobileNumber || !scheduleId || !slotStart) {
      return ctx.badRequest("Patient name, mobile number, schedule, and slot are required");
    }

    const idStr = String(scheduleId);
    let schedule = await strapi.documents("api::schedule.schedule").findOne({
      documentId: idStr,
      populate: ["hospital"]
    });

    if (!schedule) {
      const idNum = Number(scheduleId);
      if (!isNaN(idNum) && Number.isInteger(idNum)) {
        const found = await strapi.db.query("api::schedule.schedule").findOne({
          where: { id: idNum, scheduleStatus: { $ne: "cancelled" } },
          populate: { hospital: true }
        });
        if (found?.documentId) {
          schedule = await strapi.documents("api::schedule.schedule").findOne({
            documentId: found.documentId,
            populate: ["hospital"]
          });
        }
      }
    }

    if (!schedule) {
      schedule = await strapi.documents("api::schedule.schedule").findFirst({
        filters: { slug: { $eq: idStr }, scheduleStatus: { $ne: "cancelled" } },
        populate: ["hospital"]
      });
    }

    if (!schedule) {
      const found = await strapi.db.query("api::schedule.schedule").findOne({
        where: { slug: idStr, scheduleStatus: { $ne: "cancelled" } },
        populate: { hospital: true }
      });
      if (found?.documentId) {
        schedule = await strapi.documents("api::schedule.schedule").findOne({
          documentId: found.documentId,
          populate: ["hospital"]
        });
      }
    }

    if (!schedule || schedule.scheduleStatus === "cancelled") {
      return ctx.notFound("Schedule not found");
    }

    const bookedAppointments = await strapi.documents("api::appointment.appointment").findMany({
      filters: {
        schedule: { documentId: { $eq: schedule.documentId } }
      }
    });
    const bookedTimestamps = new Set(
      bookedAppointments
        .filter((a: any) => a.appointmentStatus !== "cancelled" && a.status !== "cancelled")
        .map((a: any) => new Date(a.slotStart).getTime())
    );
    const targetSlotTime = new Date(slotStart).getTime();
    const slot = generateSlots(schedule).find((item: any) => new Date(item.start).getTime() === targetSlotTime);

    if (!slot || bookedTimestamps.has(targetSlotTime)) {
      return ctx.conflict("Slot is no longer available");
    }

    let patient = await strapi.documents("api::patient.patient").findFirst({
      filters: { mobileNumber: { $eq: mobileNumber } }
    });

    if (!patient) {
      patient = await strapi.documents("api::patient.patient").create({
        data: { fullName: patientName, mobileNumber, address }
      });
    } else if (address && !patient.address) {
      patient = await strapi.documents("api::patient.patient").update({
        documentId: patient.documentId,
        data: { address }
      });
    }

    try {
      const appointment = await strapi.documents("api::appointment.appointment").create({
        data: {
          patient: patient.documentId,
          patientName,
          mobileNumber,
          address,
          schedule: schedule.documentId,
          slotStart: slot.start,
          slotEnd: slot.end,
          queueNumber: slot.queueNumber,
          reason,
          appointmentStatus: "pending",
          paymentStatus: "pending",
          paymentAmount: 0
        }
      });

      await strapi.documents("api::payment.payment").create({
        data: {
          appointment: appointment.documentId,
          patient: patient.documentId,
          patientName,
          hospitalName: schedule.hospital?.name,
          consultationFee: schedule.fee ?? 0,
          discount: 0,
          totalAmount: schedule.fee ?? 0,
          status: "pending"
        }
      });

      return {
        appointmentId: String(appointment.documentId ?? appointment.id),
        queueNumber: appointment.queueNumber,
        status: (appointment as any).appointmentStatus ?? "pending"
      };
    } catch (error) {
      console.error("Appointment booking error:", error);
      return ctx.badRequest("Failed to complete appointment booking");
    }
  }
}));
