import slide1 from '../assets/slideshow-1.jpg';
import slide2 from '../assets/slideshow-2.jpg';

export const slideshow = [
  {
    position: 1,
    component: slide1,
    primaryButton: {
      children: 'About Us',
      link: '#about-us',
      uppercase: true,
    },
  },
  {
    position: 2,
    component: slide2,
    primaryButton: {
      children: 'Contact Us',
      link: '#contact-us',
      uppercase: true,
    },
  },
];
