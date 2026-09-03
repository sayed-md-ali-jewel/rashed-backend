export async function up(knex) {
  const exists = await knex.schema.hasTable("appointments");
  if (!exists) return;

  await knex.raw(`
    CREATE UNIQUE INDEX IF NOT EXISTS appointment_schedule_slot_unique
    ON appointments (schedule_id, slot_start)
    WHERE status <> 'cancelled'
  `);
}

export async function down(knex) {
  await knex.raw("DROP INDEX IF EXISTS appointment_schedule_slot_unique");
}
