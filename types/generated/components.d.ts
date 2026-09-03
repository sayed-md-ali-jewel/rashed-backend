import type { Schema, Struct } from '@strapi/strapi';

export interface DoctorAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_doctor_about_sections';
  info: {
    displayName: 'About';
  };
  attributes: {
    aboutBio: Schema.Attribute.Component<'shared.long-key-value', true>;
    aboutHeading: Schema.Attribute.String;
    aboutImage: Schema.Attribute.Media<'images'>;
    aboutImageUrl: Schema.Attribute.String;
  };
}

export interface DoctorContactSection extends Struct.ComponentSchema {
  collectionName: 'components_doctor_contact_sections';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    address: Schema.Attribute.Text;
    contactInformation: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'shared.key-value', true>;
    whatsapp: Schema.Attribute.String;
  };
}

export interface DoctorExpertiseCard extends Struct.ComponentSchema {
  collectionName: 'components_doctor_expertise_cards';
  info: {
    displayName: 'Expertise Card';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.title-value', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DoctorHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_doctor_hero_sections';
  info: {
    displayName: 'Doctor Hero';
  };
  attributes: {
    heroBadge: Schema.Attribute.String;
    heroCareDescription: Schema.Attribute.Text;
    heroCareTitle: Schema.Attribute.String;
    heroIntro: Schema.Attribute.Text;
    heroStats: Schema.Attribute.Component<'shared.key-value', true>;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DoctorProfileDetailsSection extends Struct.ComponentSchema {
  collectionName: 'components_doctor_profile_details_sections';
  info: {
    displayName: 'Profile Details';
  };
  attributes: {
    awards: Schema.Attribute.Component<'shared.key-value', true>;
    biography: Schema.Attribute.RichText & Schema.Attribute.Required;
    certifications: Schema.Attribute.Component<'shared.key-value', true>;
    designation: Schema.Attribute.String;
    experience: Schema.Attribute.Component<'shared.key-value', true>;
    expertiseCards: Schema.Attribute.Component<'doctor.expertise-card', true>;
    hospitalAffiliations: Schema.Attribute.Component<'shared.key-value', true>;
    languages: Schema.Attribute.Component<'shared.key-value', true>;
    medicalRegistrationNumber: Schema.Attribute.String;
    onlineConsultationFee: Schema.Attribute.Decimal;
    qualifications: Schema.Attribute.Component<'shared.key-value', true>;
    specialisations: Schema.Attribute.Component<'shared.key-value', true>;
    specialization: Schema.Attribute.String;
    yearsOfExperience: Schema.Attribute.Integer;
  };
}

export interface DoctorServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_doctor_service_cards';
  info: {
    displayName: 'Service Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.title-value', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DoctorServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_doctor_services_sections';
  info: {
    displayName: 'Services';
  };
  attributes: {
    consultationFee: Schema.Attribute.Decimal;
    medicalServices: Schema.Attribute.Component<'doctor.service-card', true>;
    services: Schema.Attribute.Component<'shared.key-value', true>;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta';
  info: {
    displayName: 'SEO Meta';
  };
  attributes: {
    breadcrumbs: Schema.Attribute.JSON;
    canonicalUrl: Schema.Attribute.String;
    focusKeyword: Schema.Attribute.String;
    indexing: Schema.Attribute.Enumeration<['index', 'noindex']> &
      Schema.Attribute.DefaultTo<'index'>;
    jsonLdSchema: Schema.Attribute.JSON;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    readabilityScore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    seoScore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    seoTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    socialPreviewNotes: Schema.Attribute.Text;
    twitterDescription: Schema.Attribute.Text;
    twitterImage: Schema.Attribute.Media<'images'>;
    twitterTitle: Schema.Attribute.String;
  };
}

export interface SharedKeyValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_key_values';
  info: {
    displayName: 'Key Value';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLongKeyValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_long_key_values';
  info: {
    displayName: 'Long Key Value';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedLongTitleValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_long_title_values';
  info: {
    displayName: 'Long Title Value';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedTitleValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_title_values';
  info: {
    displayName: 'Title Value';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebsiteAppointmentSection extends Struct.ComponentSchema {
  collectionName: 'components_website_appointment_sections';
  info: {
    displayName: 'Appointment';
  };
  attributes: {
    appointmentApprovedMessage: Schema.Attribute.Text;
    appointmentCancelledMessage: Schema.Attribute.Text;
    appointmentFormBadge: Schema.Attribute.String;
    appointmentFormDescription: Schema.Attribute.Text;
    appointmentFormTitle: Schema.Attribute.String;
    appointmentsBadge: Schema.Attribute.String;
    appointmentsDescription: Schema.Attribute.Text;
    appointmentsTitle: Schema.Attribute.String;
    appointmentSubmitButton: Schema.Attribute.String;
    appointmentSuccessMessage: Schema.Attribute.Text;
    appointmentValidationMessage: Schema.Attribute.Text;
    patientMobileLabel: Schema.Attribute.String;
    patientMobilePlaceholder: Schema.Attribute.String;
    patientNameLabel: Schema.Attribute.String;
    patientNamePlaceholder: Schema.Attribute.String;
    patientSlotLabel: Schema.Attribute.String;
    patientSlotPlaceholder: Schema.Attribute.String;
  };
}

export interface WebsiteBrandSection extends Struct.ComponentSchema {
  collectionName: 'components_website_brand_sections';
  info: {
    displayName: 'Brand';
  };
  attributes: {
    footerDescription: Schema.Attribute.Text;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WebsiteContactCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_website_contact_cta_sections';
  info: {
    displayName: 'Contact CTA';
  };
  attributes: {
    contactBadge: Schema.Attribute.String;
    contactTitle: Schema.Attribute.String;
  };
}

export interface WebsiteContactSection extends Struct.ComponentSchema {
  collectionName: 'components_website_contact_sections';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    contactAddress: Schema.Attribute.Text;
    contactEmail: Schema.Attribute.Email;
    contactPhone: Schema.Attribute.String;
  };
}

export interface WebsiteHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_website_hero_sections';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    heroPrimaryCta: Schema.Attribute.String;
    heroSecondaryCta: Schema.Attribute.String;
  };
}

export interface WebsiteMediaSection extends Struct.ComponentSchema {
  collectionName: 'components_website_media_sections';
  info: {
    displayName: 'Testimonials & Gallery';
  };
  attributes: {
    galleryBadge: Schema.Attribute.String;
    galleryDescription: Schema.Attribute.Text;
    galleryTitle: Schema.Attribute.String;
    testimonialsBadge: Schema.Attribute.String;
    testimonialsTitle: Schema.Attribute.String;
  };
}

export interface WebsiteProfileSection extends Struct.ComponentSchema {
  collectionName: 'components_website_profile_sections';
  info: {
    displayName: 'Services & Profile';
  };
  attributes: {
    profileBadge: Schema.Attribute.String;
    profileTitle: Schema.Attribute.String;
    servicesDescription: Schema.Attribute.Text;
    servicesTitle: Schema.Attribute.String;
  };
}

export interface WebsiteSchedulesSection extends Struct.ComponentSchema {
  collectionName: 'components_website_schedules_sections';
  info: {
    displayName: 'Schedules';
  };
  attributes: {
    scheduleBadge: Schema.Attribute.String;
    scheduleBookButton: Schema.Attribute.String;
    scheduleDescription: Schema.Attribute.Text;
    scheduleDetailBadge: Schema.Attribute.String;
    scheduleEmptyDescription: Schema.Attribute.Text;
    scheduleEmptyTitle: Schema.Attribute.String;
    scheduleTitle: Schema.Attribute.String;
    shareScheduleLabel: Schema.Attribute.String;
  };
}

export interface WebsiteSocialLinksSection extends Struct.ComponentSchema {
  collectionName: 'components_website_social_links_sections';
  info: {
    displayName: 'Social Links';
  };
  attributes: {
    facebookUrl: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
    telegramUrl: Schema.Attribute.String;
    xUrl: Schema.Attribute.String;
    youtubeUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'doctor.about-section': DoctorAboutSection;
      'doctor.contact-section': DoctorContactSection;
      'doctor.expertise-card': DoctorExpertiseCard;
      'doctor.hero-section': DoctorHeroSection;
      'doctor.profile-details-section': DoctorProfileDetailsSection;
      'doctor.service-card': DoctorServiceCard;
      'doctor.services-section': DoctorServicesSection;
      'seo.meta': SeoMeta;
      'shared.key-value': SharedKeyValue;
      'shared.link': SharedLink;
      'shared.long-key-value': SharedLongKeyValue;
      'shared.long-title-value': SharedLongTitleValue;
      'shared.title-value': SharedTitleValue;
      'website.appointment-section': WebsiteAppointmentSection;
      'website.brand-section': WebsiteBrandSection;
      'website.contact-cta-section': WebsiteContactCtaSection;
      'website.contact-section': WebsiteContactSection;
      'website.hero-section': WebsiteHeroSection;
      'website.media-section': WebsiteMediaSection;
      'website.profile-section': WebsiteProfileSection;
      'website.schedules-section': WebsiteSchedulesSection;
      'website.social-links-section': WebsiteSocialLinksSection;
    }
  }
}
