export interface ITestimonial {
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
  /** ID of the Service whose testimonial this is */
  service: string;
  /** The actual testimonial text */
  text: string;
}
