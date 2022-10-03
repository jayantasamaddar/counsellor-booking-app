# List of Requirements

## Front-end

- **Home Page**

  - **About Me**
  - **Services**
  - **Testimonials**
  - **Booking**
  - **Contact**

## Back-end

- **APIs**
  - **Accounts API** - For managing Accounts
  - **ServiceTypes API** - For managing Service Types
  - **Services API** - For managing Services
  - **Bookings API** - For managing Bookings

---

# Homepage

## About Me

About Me section of the Home Page will have the following Components:

- A Hero Image
- An Avatar of the Counsellor
- Few words describing the Counsellor.

---

## Services

Services are the offerings to patients. Each Service can have multiple Service Categories. Each Service Category gets its own page with a List of available Services for the category and Testimonials related to the Service Category.

A Service requires the following data structure:

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
  /** Whether Service is currently available or not. Allows turning off when desired. */
  available: boolean;
}
```

---

## Testimonials

The Testimonials will showcase any patient testimonials. If patients want to hide their real identity, they have the choice and an auto generated `display_name` and `display_photo` will be used in that case.

The data structure looks like:

```ts
interface ITestimonial {
  /** ID of the Testimonial: Auto-generated */
  _id: string;
  /** Real Name of the Patient */
  patient_name: string;
  /** Patient's photo */
  patient_photo?: string;
  /** Whether this is a verified user having an account and who made a transaction via website */
  isVerified: boolean;
  /** Whether real identity is hidden */
  hideIdentity: boolean;
  /** Display Name for representational purpose */
  display_name: string;
  /** Display Image for representational purpose */
  display_photo: string;
  /** ID of the Service taken */
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

# References

- **[Using SASS in Next.js](https://www.freecodecamp.org/news/how-to-use-sass-with-css-modules-in-next-js/)**
