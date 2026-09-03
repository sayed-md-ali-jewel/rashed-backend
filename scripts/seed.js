/* eslint-disable no-console */
"use strict";

const { compileStrapi, createStrapi } = require("@strapi/core");

const PUBLISHED = { status: "published" };

const kv = (label, value = label) => ({ label, value });
const tv = (title, value = title) => ({ title, value });

const seo = ({
  seoTitle,
  metaDescription,
  focusKeyword,
  canonicalUrl,
  schema,
  indexing = "index",
}) => ({
  seoTitle,
  metaDescription,
  focusKeyword,
  canonicalUrl,
  jsonLdSchema: schema,
  indexing,
});

const doctorProfile = {
  heroSection: {
    name: "Dr. Md. Rashedul Alam",
    title: "Consultant Medicine Specialist",
    heroBadge: "Board Certified Physician",
    heroIntro:
      "Compassionate healthcare focused on your wellness. Specializing in internal medicine with a holistic approach to patient care.",
    heroCareTitle: "Patient-Centered Care",
    heroCareDescription: "Personalized treatment plans for every patient.",
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    heroStats: [
      kv("Patients Served", "5000+"),
      kv("Years Experience", "15+"),
      kv("Success Rate", "98%"),
      kv("Emergency Care", "24/7"),
    ],
  },
  servicesSection: {
    consultationFee: 1000,
    services: [
      kv(
        "General Consultation",
        "Comprehensive assessment and treatment planning",
      ),
      kv(
        "Follow-up Care",
        "Progress review, medication adjustment, and ongoing support",
      ),
      kv("Health Screening", "Preventive checkups and risk assessment"),
      kv(
        "Medical Reports Review",
        "Lab, imaging, and diagnostic report interpretation",
      ),
    ],
    medicalServices: [
      {
        title: "Preventive Care",
        description:
          "Comprehensive health screenings, vaccinations, and lifestyle counseling to keep you healthy and prevent disease before it starts.",
        items: [
          tv(
            "Annual Physical Exams",
            "Routine yearly checkups and preventive evaluations",
          ),
          tv(
            "Health Risk Assessments",
            "Screening for lifestyle and family-history risks",
          ),
          tv("Vaccination Programs", "Age-appropriate immunization guidance"),
          tv(
            "Wellness Counseling",
            "Nutrition, sleep, activity, and habit planning",
          ),
        ],
      },
      {
        title: "Chronic Disease Management",
        description:
          "Expert care for long-term conditions including diabetes, hypertension, heart disease, and respiratory disorders.",
        items: [
          tv(
            "Diabetes Care",
            "Blood sugar monitoring and long-term treatment planning",
          ),
          tv(
            "Hypertension Management",
            "Blood pressure control and risk reduction",
          ),
          tv("Asthma & COPD", "Respiratory symptom control and inhaler review"),
          tv("Heart Disease Monitoring", "Ongoing cardiovascular follow-up"),
        ],
      },
      {
        title: "Acute Care",
        description:
          "Same-day appointments for sudden illnesses, infections, minor injuries, and urgent medical concerns.",
        items: [
          tv(
            "Same-Day Appointments",
            "Fast access for sudden illness or urgent concerns",
          ),
          tv(
            "Infection Treatment",
            "Evaluation and medication guidance for common infections",
          ),
          tv(
            "Minor Injury Care",
            "Initial care for strains, cuts, and simple injuries",
          ),
          tv(
            "Urgent Consultations",
            "Prompt medical advice when symptoms change quickly",
          ),
        ],
      },
      {
        title: "Diagnostic Services",
        description:
          "On-site laboratory testing, imaging coordination, and comprehensive diagnostic evaluations.",
        items: [
          tv("Blood Work", "Lab test planning and results interpretation"),
          tv(
            "EKG Testing",
            "Basic heart rhythm assessment when clinically needed",
          ),
          tv(
            "Imaging Referrals",
            "Coordinated referrals for ultrasound, X-ray, or scans",
          ),
          tv(
            "Health Screenings",
            "Targeted screening based on age and risk profile",
          ),
        ],
      },
    ],
  },
  profileDetailsSection: {
    designation: "Senior Consultant",
    specialization: "Internal Medicine",
    medicalRegistrationNumber: "BMDC A-123456",
    yearsOfExperience: 15,
    onlineConsultationFee: 800,
    biography:
      "A patient-focused clinician providing evidence-based care across internal medicine, chronic disease management, preventive health, and diagnostic consultations.",
    languages: [
      kv("Bangla", "Native"),
      kv("English", "Professional"),
      kv("Hindi", "Conversational"),
    ],
    certifications: [
      kv("Board Certification", "Internal Medicine"),
      kv("Advanced Cardiac Life Support", "Certified"),
      kv("Diabetes Care Certification", "Completed"),
    ],
    hospitalAffiliations: [
      kv("City Care Hospital", "Dhanmondi, Dhaka"),
      kv("Green Life Clinic", "Mirpur 10, Dhaka"),
    ],
    expertiseCards: [
      {
        title: "Education",
        items: [
          tv("MBBS", "Dhaka Medical College"),
          tv("FCPS Medicine", "Bangladesh College of Physicians and Surgeons"),
          tv("MD Internal Medicine", "BSMMU"),
        ],
      },
      {
        title: "Experience",
        items: [
          tv("15+ years", "Internal Medicine clinical practice"),
          tv("Former Registrar", "Tertiary hospital medicine department"),
          tv("Clinical Professor", "Teaching and mentoring junior clinicians"),
        ],
      },
      {
        title: "Certifications",
        items: [
          tv("Board Certified", "Internal Medicine"),
          tv("Advanced Cardiac Life Support", "Certified"),
          tv("Diabetes Care", "Certification completed"),
        ],
      },
      {
        title: "Publications",
        items: [
          tv("50+ Articles", "Peer-reviewed clinical publications"),
          tv("Healthcare Guides", "Author of patient education resources"),
          tv("Conference Speaker", "Regular speaker at medical conferences"),
        ],
      },
    ],
    qualifications: [
      kv("MBBS", "Dhaka Medical College"),
      kv("FCPS Medicine", "Bangladesh College of Physicians and Surgeons"),
      kv("MD Internal Medicine", "BSMMU"),
    ],
    specialisations: [
      kv("Diabetes", "Long-term diabetes monitoring and lifestyle planning"),
      kv(
        "Hypertension",
        "Blood pressure management and cardiovascular risk reduction",
      ),
      kv(
        "Respiratory Medicine",
        "Asthma, COPD, and common respiratory conditions",
      ),
      kv("Preventive Care", "Screening, counseling, and early intervention"),
    ],
    experience: [
      kv("Clinical Practice", "15+ years in internal medicine"),
      kv("Hospital Medicine", "Former registrar at a tertiary hospital"),
      kv("Teaching", "Clinical professor and mentor"),
    ],
    awards: [
      kv("Best Clinical Service Award", "2022"),
      kv("Community Health Excellence", "2023"),
    ],
  },
  aboutSection: {
    aboutHeading: "A Personal Approach to Medicine",
    aboutImageUrl:
      "https://images.unsplash.com/photo-1584467735871-8f8eafa7f867?auto=format&fit=crop&w=1200&q=80",
    aboutBio: [
      kv(
        "Listening First",
        "I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment.",
      ),
      kv(
        "Evidence-Based Care",
        "My practice focuses on preventive care, chronic disease management, and helping patients achieve optimal health through evidence-based medicine combined with a holistic perspective.",
      ),
      kv(
        "Community Health",
        "Outside of medicine, I am passionate about medical education, community health initiatives, and staying active through hiking and yoga, practices I often recommend to my patients.",
      ),
    ],
  },
  contactSection: {
    phone: "+8801700000000",
    whatsapp: "+8801700000000",
    address: "Dhaka, Bangladesh",
    contactInformation: "+8801700000000, appointments@doctorcare.test",
    socialLinks: [
      kv("Facebook", "https://facebook.com/doctorcare"),
      kv("LinkedIn", "https://linkedin.com/in/doctorcare"),
      kv("X", "https://x.com/doctorcare"),
      kv("YouTube", "https://youtube.com/@doctorcare"),
    ],
  },
  seo: seo({
    seoTitle: "Dr. Md. Rashedul Alam | Medicine Specialist in Dhaka",
    metaDescription:
      "Book appointments with Dr. Md. Rashedul Alam, a consultant medicine specialist in Dhaka.",
    focusKeyword: "medicine specialist Dhaka",
    schema: {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Md. Rashedul Alam",
      medicalSpecialty: "Internal Medicine",
    },
  }),
};

const websiteSetting = {
  brandSection: {
    siteName: "Dr.Rashed",
    footerDescription:
      "A Strapi-managed doctor portfolio and appointment experience with scheduling, accounting, and SEO tools.",
  },
  contactSection: {
    contactPhone: "+8801700000000",
    contactEmail: "appointments@doctorcare.test",
    contactAddress: "Dhaka, Bangladesh",
  },
  socialLinksSection: {
    facebookUrl: "https://facebook.com/doctorcare",
    linkedinUrl: "https://linkedin.com/in/doctorcare",
    xUrl: "https://x.com/doctorcare",
    youtubeUrl: "https://youtube.com/@doctorcare",
    telegramUrl: "https://t.me/doctorcare",
  },
  defaultSeo: seo({
    seoTitle: "Doctor Portfolio & Appointment System",
    metaDescription:
      "Doctor portfolio, schedules, booking, clinic accounting, and SEO management.",
  }),
  heroSection: {
    heroPrimaryCta: "Book Appointment",
    heroSecondaryCta: "Learn More",
  },
  schedulesSection: {
    scheduleBadge: "Live availability",
    scheduleTitle: "Upcoming Schedules",
    scheduleDescription:
      "Book from automatically generated slots and receive a queue number.",
    scheduleEmptyTitle: "No upcoming schedules",
    scheduleEmptyDescription:
      "New consultation dates will appear here as soon as they are published.",
    scheduleBookButton: "Book slot",
    scheduleDetailBadge: "Upcoming consultation",
    shareScheduleLabel: "Share this schedule",
  },
  appointmentSection: {
    appointmentsBadge: "Appointments",
    appointmentsTitle: "Choose a hospital schedule and reserve a queue number.",
    appointmentsDescription:
      "Slots are generated from backend-managed consultation duration settings and checked before confirmation.",
    appointmentFormBadge: "Appointment request",
    appointmentFormTitle: "Choose your slot",
    appointmentFormDescription:
      "Queue number is assigned automatically after a valid slot is selected.",
    patientNameLabel: "Full name",
    patientNamePlaceholder: "Patient full name",
    patientMobileLabel: "Mobile number",
    patientMobilePlaceholder: "01XXXXXXXXX",
    patientSlotLabel: "Appointment slot",
    patientSlotPlaceholder: "Choose a slot",
    appointmentSubmitButton: "Request appointment",
    appointmentValidationMessage:
      "Please enter a valid name, Bangladeshi mobile number, and slot.",
    appointmentSuccessMessage:
      "Appointment requested. Queue number: {queueNumber}",
    appointmentApprovedMessage:
      "Dear {patientName}, your appointment{dateText} has been approved.{queueText} Thank you.",
    appointmentCancelledMessage:
      "Dear {patientName}, your appointment{dateText} has been cancelled. Please contact the clinic if you need a new booking.",
  },
  profileSection: {
    servicesTitle: "Medical Services",
    servicesDescription:
      "From preventive care to chronic disease management, I offer a full spectrum of internal medicine services to meet your healthcare needs at every stage of life.",
    profileBadge: "Clinical profile",
    profileTitle: "Expertise at a glance",
  },
  mediaSection: {
    testimonialsBadge: "Patient voices",
    testimonialsTitle: "Testimonials",
    galleryBadge: "Clinic gallery",
    galleryTitle: "Gallery",
    galleryDescription:
      "A quick look at the care environment, consultation setup, and patient support spaces.",
  },
  contactCtaSection: {
    contactBadge: "Contact",
    contactTitle: "Need clinic information?",
  },
  smsProviderConfig: [
    tv("Provider", "disabled"),
    tv(
      "Notes",
      "Configure SMS credentials here when a provider is selected for production notifications.",
    ),
  ],
};

const hospitals = [
  {
    name: "City Care Hospital",
    address: "House 12, Road 8, Dhanmondi, Dhaka",
    phone: "+8801700000000",
    googleMapsUrl: "https://www.google.com/maps?q=Dhanmondi+Dhaka",
    embeddedMapUrl:
      "https://www.google.com/maps?q=Dhanmondi+Dhaka&output=embed",
    latitude: 23.7465,
    longitude: 90.376,
    consultationFee: 1000,
    active: true,
  },
  {
    name: "Green Life Clinic",
    address: "Mirpur 10, Dhaka",
    phone: "+8801711111111",
    googleMapsUrl: "https://www.google.com/maps?q=Mirpur+10+Dhaka",
    embeddedMapUrl:
      "https://www.google.com/maps?q=Mirpur+10+Dhaka&output=embed",
    latitude: 23.8067,
    longitude: 90.3686,
    consultationFee: 900,
    active: true,
  },
  {
    name: "Central Health Clinic",
    address: "Banani, Dhaka",
    phone: "+8801722222222",
    googleMapsUrl: "https://www.google.com/maps?q=Banani+Dhaka",
    embeddedMapUrl: "https://www.google.com/maps?q=Banani+Dhaka&output=embed",
    latitude: 23.7937,
    longitude: 90.4066,
    consultationFee: 1000,
    active: true,
  },
];

const schedules = [
  {
    title: "City Care Hospital - July 30",
    slug: "city-care-hospital-july-30",
    hospitalName: "City Care Hospital",
    startsAt: "2026-07-30T10:00:00+06:00",
    endsAt: "2026-07-30T13:00:00+06:00",
    slotDurationMinutes: 10,
    fee: 1000,
    seo: seo({
      seoTitle: "City Care Hospital Appointment | Dr. Md. Rashedul Alam",
      metaDescription:
        "Book an upcoming appointment schedule at City Care Hospital.",
    }),
  },
  {
    title: "Green Life Clinic - August 01",
    slug: "green-life-clinic-august-01",
    hospitalName: "Green Life Clinic",
    startsAt: "2026-08-01T17:00:00+06:00",
    endsAt: "2026-08-01T20:00:00+06:00",
    slotDurationMinutes: 15,
    fee: 900,
    seo: seo({
      seoTitle: "Green Life Clinic Appointment | Dr. Md. Rashedul Alam",
      metaDescription:
        "Book an upcoming appointment schedule at Green Life Clinic.",
    }),
  },
  {
    title: "Central Health Clinic - August 05",
    slug: "central-health-clinic-august-05",
    hospitalName: "Central Health Clinic",
    startsAt: "2026-08-05T09:30:00+06:00",
    endsAt: "2026-08-05T12:30:00+06:00",
    slotDurationMinutes: 10,
    fee: 1000,
    seo: seo({
      seoTitle: "Central Health Clinic Appointment | Dr. Md. Rashedul Alam",
      metaDescription:
        "Book an upcoming appointment schedule at Central Health Clinic.",
    }),
  },
];

const testimonials = [
  {
    name: "Mahmud H.",
    quote: "The consultation was calm, clear, and very practical.",
    rating: 5,
  },
  {
    name: "Nusrat J.",
    quote: "Booking was simple and the queue number made the visit easier.",
    rating: 5,
  },
  {
    name: "Rafiq A.",
    quote: "The follow-up plan was easy to understand and follow.",
    rating: 5,
  },
];

async function upsertSingle(strapi, uid, data) {
  const existing = await strapi.documents(uid).findFirst();

  if (existing?.documentId) {
    await strapi.documents(uid).update({
      documentId: existing.documentId,
      data,
      ...PUBLISHED,
    });
    console.log(`Updated ${uid}`);
    return;
  }

  await strapi.documents(uid).create({ data, ...PUBLISHED });
  console.log(`Created ${uid}`);
}

async function upsertByField(strapi, uid, field, value, data) {
  const existing = await strapi.documents(uid).findFirst({
    filters: { [field]: { $eq: value } },
  });

  if (existing?.documentId) {
    const updated = await strapi.documents(uid).update({
      documentId: existing.documentId,
      data,
      ...PUBLISHED,
    });
    console.log(`Updated ${uid}: ${value}`);
    return updated;
  }

  const created = await strapi.documents(uid).create({ data, ...PUBLISHED });
  console.log(`Created ${uid}: ${value}`);
  return created;
}

async function main() {
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    await upsertSingle(
      strapi,
      "api::doctor-profile.doctor-profile",
      doctorProfile,
    );
    await upsertSingle(
      strapi,
      "api::website-setting.website-setting",
      websiteSetting,
    );

    const hospitalsByName = new Map();
    for (const hospital of hospitals) {
      const record = await upsertByField(
        strapi,
        "api::hospital.hospital",
        "name",
        hospital.name,
        hospital,
      );
      hospitalsByName.set(hospital.name, record);
    }

    for (const schedule of schedules) {
      const { hospitalName, ...scheduleData } = schedule;
      const hospital = hospitalsByName.get(hospitalName);

      await upsertByField(
        strapi,
        "api::schedule.schedule",
        "slug",
        schedule.slug,
        {
          ...scheduleData,
          hospital: hospital?.documentId,
        },
      );
    }

    for (const testimonial of testimonials) {
      await upsertByField(
        strapi,
        "api::testimonial.testimonial",
        "name",
        testimonial.name,
        testimonial,
      );
    }

    console.log("Backend seed complete.");
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
