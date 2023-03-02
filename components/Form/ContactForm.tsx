import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button, Error as FormError } from '..';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ContactForm.module.scss';

export interface IContactForm {
  name?: string;
  email?: string;
  message?: string;
}

export type INotifyType = 'success' | 'error';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContactForm>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const notify = (type: INotifyType, message: string) => {
    return toast[type](message, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  };

  const onSubmit = async (formData: IContactForm) => {
    try {
      const { status } = await axios.post('/api/contact', formData);
      if (status === 200) {
        reset();
        notify('success', 'Your message has been submitted.');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.contact_form_container}>
        <form onSubmit={handleSubmit(onSubmit)} className="gap-10 md:px-[20%]">
          <div className="contact_form_group gap-8 md:gap-10">
            <div className="contact_form_name">
              <label className="contact_label" htmlFor="contact_name">
                Name
              </label>
              <input
                id="contact_name"
                className={`contact_input ${
                  errors?.name ? 'focus:ring-2 focus:ring-red-500' : ''
                }`}
                type="text"
                {...register('name', {
                  required: { value: true, message: 'Name is required' },
                  maxLength: 100,
                  pattern: {
                    value: /^[A-Za-z ]+$/i,
                    message: 'Name can only contain alphabets and spaces',
                  },
                })}
              />
              {errors?.name?.message && (
                <FormError>{errors.name.message as string}</FormError>
              )}
            </div>

            <div className="contact_form_email">
              <label className="contact_label" htmlFor="contact_email">
                Email
              </label>
              <input
                id="contact_email"
                className={`contact_input ${
                  errors?.email ? 'focus:ring-2 focus:ring-red-500' : ''
                }`}
                type="email"
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Email is invalid',
                  },
                })}
              />
              {errors?.email?.message && (
                <FormError>{errors.email.message as string}</FormError>
              )}
            </div>
          </div>

          <div className="contact_form_message">
            <label className="contact_label" htmlFor="contact_message">
              Message
            </label>
            <textarea
              id="contact_message"
              className={`contact_input h-40 ${
                errors?.message ? 'focus:ring-2 focus:ring-red-500' : ''
              }`}
              {...register('message', {
                required: { value: true, message: 'Message is required' },
                minLength: {
                  value: 30,
                  message: 'Message should be at least 30 characters',
                },
                maxLength: {
                  value: 1000,
                  message: 'Reached character limit',
                },
              })}
            />
            {errors?.message?.message && (
              <FormError>{errors.message.message as string}</FormError>
            )}
          </div>

          <div className="contact_form_submit flex flex-col gap-2 md:px-20 lg:px-40">
            <Button
              type="submit"
              className="contact_form_submit_button"
              uppercase
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
