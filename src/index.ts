import type { Core } from "@strapi/strapi";

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const paramsAny = context.params as any;
      if (paramsAny?.status && paramsAny.status !== "published" && paramsAny.status !== "draft") {
        if (paramsAny.data && (!paramsAny.data.status || paramsAny.data.status === "")) {
          paramsAny.data.status = paramsAny.status;
        }
        delete paramsAny.status;
      }

      if (
        context.uid === "api::appointment.appointment" &&
        (context.action === "create" || context.action === "update")
      ) {
        const data = context.params?.data as any;
        if (data) {
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

          const paramsAny = context.params as any;
          if (!scheduleId && paramsAny?.documentId) {
            try {
              const existing = await strapi.documents("api::appointment.appointment").findOne({
                documentId: paramsAny.documentId,
                populate: ["schedule"]
              });
              scheduleId = (existing?.schedule as any)?.documentId ?? (existing?.schedule as any)?.id;
            } catch {
              // fallback
            }
          }

          let durationMinutes = 10;
          let foundSchedule: any = null;
          if (scheduleId) {
            let schedule = await strapi.documents("api::schedule.schedule").findOne({
              documentId: String(scheduleId)
            });
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
              if (schedule.slotDurationMinutes && Number(schedule.slotDurationMinutes) > 0) {
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
      }

      if (
        context.uid === "api::schedule.schedule" &&
        (context.action === "create" || context.action === "update")
      ) {
        const data = context.params?.data as any;
        if (data && data.startsAt) {
          const duration = Number(data.slotDurationMinutes || 10);
          const maxAppts = Number(data.maxAppointments || 0);
          const startTime = new Date(data.startsAt).getTime();
          if (!isNaN(startTime) && (!data.endsAt || data.endsAt === "")) {
            const totalMinutes = maxAppts > 0 ? maxAppts * duration : 180;
            data.endsAt = new Date(startTime + totalMinutes * 60 * 1000).toISOString();
          }
        }
      }
      return next();
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
        where: { type: "public" },
        populate: ["permissions"]
      });

      if (!publicRole) return;

      const publicActions = [
        "api::doctor-profile.doctor-profile.find",
        "api::doctor-profile.doctor-profile.update",
        "api::website-setting.website-setting.find",
        "api::website-setting.website-setting.update",
        "api::hospital.hospital.find",
        "api::hospital.hospital.findOne",
        "api::hospital.hospital.create",
        "api::hospital.hospital.update",
        "api::hospital.hospital.delete",
        "api::schedule.schedule.find",
        "api::schedule.schedule.findOne",
        "api::schedule.schedule.create",
        "api::schedule.schedule.update",
        "api::schedule.schedule.delete",
        "api::patient.patient.find",
        "api::patient.patient.findOne",
        "api::patient.patient.create",
        "api::patient.patient.update",
        "api::patient.patient.delete",
        "api::appointment.appointment.find",
        "api::appointment.appointment.findOne",
        "api::appointment.appointment.create",
        "api::appointment.appointment.update",
        "api::appointment.appointment.delete",
        "api::appointment.appointment.book",
        "api::testimonial.testimonial.find",
        "api::testimonial.testimonial.findOne",
        "api::testimonial.testimonial.create",
        "api::testimonial.testimonial.update",
        "api::testimonial.testimonial.delete",
        "api::gallery-item.gallery-item.find",
        "api::gallery-item.gallery-item.findOne",
        "api::gallery-item.gallery-item.create",
        "api::gallery-item.gallery-item.update",
        "api::gallery-item.gallery-item.delete",
        "api::faq.faq.find",
        "api::faq.faq.findOne",
        "api::faq.faq.create",
        "api::faq.faq.update",
        "api::faq.faq.delete",
        "api::blog-post.blog-post.find",
        "api::blog-post.blog-post.findOne",
        "api::blog-post.blog-post.create",
        "api::blog-post.blog-post.update",
        "api::blog-post.blog-post.delete",
        "api::page.page.find",
        "api::page.page.findOne",
        "api::page.page.create",
        "api::page.page.update",
        "api::page.page.delete",
        "api::service.service.find",
        "api::service.service.findOne",
        "api::service.service.create",
        "api::service.service.update",
        "api::service.service.delete",
        "api::payment.payment.find",
        "api::payment.payment.findOne",
        "api::payment.payment.create",
        "api::payment.payment.update",
        "api::payment.payment.delete"
      ];

      for (const action of publicActions) {
        const existing = await strapi.db.query("plugin::users-permissions.permission").findOne({
          where: { action, role: publicRole.id }
        });

        if (!existing) {
          await strapi.db.query("plugin::users-permissions.permission").create({
            data: {
              action,
              role: publicRole.id
            }
          });
        }
      }
    } catch (error) {
      strapi.log.error("Bootstrap public permission setup error:", error);
    }
  }
};
