export default {
  routes: [
    {
      method: "POST",
      path: "/appointments/book",
      handler: "appointment.book",
      config: {
        auth: false,
        policies: []
      }
    }
  ]
};
