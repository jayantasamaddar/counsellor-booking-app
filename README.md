# List of Requirements

- Single Page Application
  - **About Me**
  - **Services**
  - **Testimonials**
  - **Booking**
  - **Contact**

---

# Homepage

## About Me

About Me section of the Home Page will have the following Components:

- A Hero Image
- An Avatar of the Counsellor
- Few words describing the Counsellor.

---

## Services Available

A List of services that require the following data structure per Service:

```ts
type ServiceCategoryTypes =
  | 'depression'
  | 'anxiety'
  | 'relationship'
  | 'stress'
  | 'negativity'
  | 'career';

interface ServiceTypes {
  /** ID of the Service: Auto-generated */
  _id: string;
  /** Name of the Service */
  name: string;
  /** An Image to illustrate or depict the service */
  image: string;
  /** Categories of Service. Default is `uncategorized` */
  categories?: ServiceCategoryTypes[] | 'uncategorized';
  /** Brief Description of the Service */
  description: string;
}
```

---

## Testimonials

The Testimonials will showcase any patient testimonials. If patients want to hide their real identity, they have the choice and an auto generated `display_name` and `display_photo` will be used in that case.

The data structure looks like:

```ts
interface TestimonialTypes {
  /** ID of the Testimonial: Auto-generated */
  _id: string;
  /** Name of the Patient */
  patient_name: string;
  /** Patient's photo */
  patient_photo?: string;
  /** Whether this is a verified user having an account and who made a transaction via website */
  isVerified: boolean;
  /** Whether real identity is hidden */
  hideRealIdentity: boolean;
  /** Display Name for representational purpose */
  display_name: string;
  /** Display Image for representational purpose */
  display_photo: string;
  /** Service taken */
  service: string;
  /** The actual testimonial text */
  text: string;
}
```

---

## Booking

This section allows the patient to book a service for an available slot.

(COMING SOON)

---

## Contact

This section has a form that allows a direct email to be sent to the Counsellor without revealing the e-mail address / phone.

The following form fields are available:

```ts
type ContactFormSubject =
  | 'booking_enquiry'
  | 'grievance'
  | 'suggestions'
  | 'other';

interface ContactFormTypes {
  /** First Name of the Form Filler */
  first_name: string;
  /** Last Name of the Form Filler */
  last_name: string;
  /** Subject of the Message */
  subject: ContactFormSubject;
  /** The Message */
  message: string;
}
```

---
