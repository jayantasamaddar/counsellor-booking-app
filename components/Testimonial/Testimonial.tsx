import Image from 'next/future/image';
import { ITestimonial } from '../../types';
import styles from './Testimonial.module.scss';
import { ImQuotesLeft } from '@react-icons/all-files/im/ImQuotesLeft';

export interface ITestimonialProps {
  /** List of Testimonials */
  data: ITestimonial;
  /** Class attribute of the Testimonials container */
  className?: string;
}

export const Testimonial = ({
  data: { _id, display_photo, display_name, text, service },
  className,
}: ITestimonialProps) => {
  return (
    <div id={_id} className={`${styles.testimonial} ${className || ''}`}>
      <Image
        className="testimonial_image"
        src={
          display_photo ||
          'https://via.placeholder.com/300x200.png?text=Patient+Photo'
        }
        alt={display_name}
        fill
        sizes="100vw"
      />
      <div className="testimonial_content">
        <div className="testimonial_quote">
          <ImQuotesLeft />
        </div>
        <p className="testimonial_text">{text}</p>
        <div className="testimonial_context">
          <h4 className="testimonial_name">{display_name}</h4>
          <p className="testimonial_service">{service}</p>
        </div>
      </div>
    </div>
  );
};
