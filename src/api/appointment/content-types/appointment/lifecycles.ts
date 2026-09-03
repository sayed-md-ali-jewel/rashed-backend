async function syncAppointmentSlots(data: any, where: any) {
  if (!data) return;

  const finalStatus = data.appointmentStatus || data.status || "pending";
  data.appointmentStatus = finalStatus;
  data.status = finalStatus;

  if (!data.paymentStatus || data.paymentStatus === "") {
    data.paymentStatus = "pending";
  }

  let scheduleId =
    data.schedule?.connect?.[0]?.documentId ??
    data.schedule?.connect?.[0]?.id ??
    data.schedule?.connect?.[0] ??
    data.schedule?.set?.[0]?.documentId ??
    data.schedule?.set?.[0]?.id ??
    data.schedule?.set?.[0] ??
    data.schedule?.documentId ??
    data.schedule?.id ??
    data.schedule;

  if (!scheduleId && where) {
    try {
      const existing = await strapi.db.query("api::appointment.appointment").findOne({
        where: typeof where === "object" ? where : { id: where },
        populate: { schedule: true }
      });
      scheduleId = existing?.schedule?.documentId ?? existing?.schedule?.id;
    } catch {
      // fallback
    }
  }

  let durationMinutes = 10;
  let foundSchedule: any = null;
  if (scheduleId) {
    let schedule: any = null;
    try {
      schedule = await strapi.documents("api::schedule.schedule").findOne({
        documentId: String(scheduleId)
      });
    } catch {
      // fallback
    }
    if (!schedule && !isNaN(Number(scheduleId))) {
      schedule = await strapi.db.query("api::schedule.schedule").findOne({
        where: { id: Number(scheduleId) }
      });
    }
    if (!schedule) {
      schedule = await strapi.db.query("api::schedule.schedule").findOne({
        where: { documentId: String(scheduleId) }
      });
    }
    if (schedule) {
      foundSchedule = schedule;
      if (schedule?.slotDurationMinutes && Number(schedule.slotDurationMinutes) > 0) {
        durationMinutes = Number(schedule.slotDurationMinutes);
      }
    }
  }

  if (data.slotStart) {
    const startTime = new Date(data.slotStart).getTime();
    if (!isNaN(startTime)) {
      data.slotEnd = new Date(startTime + durationMinutes * 60 * 1000).toISOString();
    }
  } else if (data.slotEnd) {
    const endTime = new Date(data.slotEnd).getTime();
    if (!isNaN(endTime)) {
      data.slotStart = new Date(endTime - durationMinutes * 60 * 1000).toISOString();
    }
  } else if (foundSchedule?.startsAt) {
    const startTime = new Date(foundSchedule.startsAt).getTime();
    if (!isNaN(startTime)) {
      data.slotStart = new Date(startTime).toISOString();
      data.slotEnd = new Date(startTime + durationMinutes * 60 * 1000).toISOString();
    }
  }
}

export default {
  async beforeCreate(event: any) {
    await syncAppointmentSlots(event.params?.data, null);
  },

  async beforeUpdate(event: any) {
    await syncAppointmentSlots(
      event.params?.data,
      event.params?.where?.id ?? event.params?.where?.documentId ?? event.params?.where
    );
  }
};
