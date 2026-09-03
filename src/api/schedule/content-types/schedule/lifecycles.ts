function calculateScheduleEndsAt(data: any) {
  if (!data || !data.startsAt) return;

  const durationMinutes = Number(data.slotDurationMinutes || 10);
  const maxAppointments = Number(data.maxAppointments || 0);
  const startTime = new Date(data.startsAt).getTime();

  if (isNaN(startTime)) return;

  if (!data.endsAt || data.endsAt === "") {
    if (maxAppointments > 0) {
      data.endsAt = new Date(startTime + maxAppointments * durationMinutes * 60 * 1000).toISOString();
    } else {
      // Default to 3 hours session
      data.endsAt = new Date(startTime + 3 * 60 * 60 * 1000).toISOString();
    }
  }
}

export default {
  async beforeCreate(event: any) {
    calculateScheduleEndsAt(event.params?.data);
  },

  async beforeUpdate(event: any) {
    calculateScheduleEndsAt(event.params?.data);
  }
};
