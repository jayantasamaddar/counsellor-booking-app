import {
  ReactElement,
  ReactNode,
  isValidElement,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/future/image';
import styles from './Carousel.module.scss';
import slide1 from '../../assets/slideshow-1.jpg';
import slide2 from '../../assets/slideshow-2.jpg';

import { AiOutlineLeft } from '@react-icons/all-files/ai/AiOutlineLeft';
import { AiOutlineRight } from '@react-icons/all-files/ai/AiOutlineRight';
import { Button, IButton } from '../Button';

type CarouselText = 'center' | 'left' | 'right';
type AnimationStyle = 'fade' | 'slide' | 'none';

export interface ICarouselItem {
  /** Starting position of the Carousel Item */
  position: number;
  /** The Carousel Image URL or Component */
  component: string | StaticImageData | ReactNode;
  /** The Carousel Heading */
  heading?: string;
  /** The Carousel Subheading */
  subheading?: string;
  /** Position of the text */
  textPosition?: CarouselText;
  /** Primary Button */
  primaryButton?: IButton;
  /** Horizontal Text Alignment */
  hAlign?: CarouselText;
  /** Vertical Text Alignment */
  vAlign?: CarouselText;
}

export interface ICarouselNavigation {
  buttonLeft: ReactElement;
  buttonRight: ReactElement;
}

export interface ICarousel {
  /** The components of the Carousel in an array */
  items?: ICarouselItem[];
  /** Number of visible items in the viewport at a single time */
  visibleItems?: number;
  /** Maximum number of items in the carousel */
  limit?: number;
  /** Whether carousel spans full-width */
  fullWidth?: boolean;
  /** Provide Custom Buttons */
  navigation?: ICarouselNavigation;
  /** Hide Navigation Arrows */
  hideNavigation?: boolean;
  /** Animation Style */
  animation?: AnimationStyle;
  /** Animation Duration in milliseconds */
  animationDuration?: number;
  /** Class attribute of the Slideshow container */
  className?: string;
}

const carouselItems = [
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

/** Carousel Component */
export const Carousel = ({
  items = carouselItems,
  visibleItems = 1,
  limit = 5,
  fullWidth = false,
  navigation,
  hideNavigation,
  animation = 'none',
  animationDuration = 0,
  className,
}: ICarousel) => {
  /** Declare Variables, State, Refs */
  const [visibleSlides, setVisibleSlides] = useState<ICarouselItem[]>([]);

  /** Load Initial Slides */
  useEffect(() => {
    setVisibleSlides(items.slice(0, visibleItems));
  }, [items, visibleItems]);

  /*************************************************************************/
  /** Event Handlers */
  /*************************************************************************/

  /** Right Arrow Click - Next Item */
  const nextItem = useCallback(() => {
    if (visibleSlides.length === items.length) return;

    const lastVisiblePos = visibleSlides[visibleSlides.length - 1].position;
    const newItemPos =
      items[items.length - 1].position > lastVisiblePos
        ? lastVisiblePos + 1
        : items[0].position;

    const newItem = items.find(e => e.position === newItemPos) as ICarouselItem;

    // Set New Slides
    setVisibleSlides(prev => [...prev.filter((e, i) => i > 0), newItem]);
  }, [items, visibleSlides]);

  /** Left Arrow Click - Previous Item */
  const prevItem = useCallback(() => {
    if (visibleSlides.length === items.length) return;

    const firstVisiblePos = visibleSlides[0].position;
    const newItemPos =
      items[0].position < firstVisiblePos
        ? firstVisiblePos - 1
        : items[items.length - 1].position;

    const newItem = items.find(e => e.position === newItemPos) as ICarouselItem;

    // Set New Slides
    setVisibleSlides(prev => [
      newItem,
      ...prev.filter((e, i) => i < prev.length - 1),
    ]);
  }, [items, visibleSlides]);

  /*************************************************************************/
  /** Render Carousel */
  /*************************************************************************/

  const classes = `${styles.carousel} ${
    className?.split(' ').includes('hero-slideshow')
      ? styles['hero-slideshow']
      : className || ''
  }`;

  return (
    <div className={classes}>
      <div className="carousel_container">
        {visibleSlides.map(
          ({ position, component, primaryButton, heading }) => (
            <div
              className="carousel_item"
              key={position}
              data-position={position}
            >
              {isValidElement(component) ? (
                <>{component}</>
              ) : (
                <>
                  <Image
                    src={component as string | StaticImageData}
                    alt={heading || `Slideshow-${position}`}
                    fill
                    sizes="100vw"
                  />
                  {primaryButton && (
                    <Button
                      className={styles.carousel_primary_button}
                      link={primaryButton?.link}
                      uppercase={primaryButton?.uppercase}
                    >
                      {(primaryButton as IButton).children}
                    </Button>
                  )}
                </>
              )}
            </div>
          )
        )}
      </div>
      {!hideNavigation && (
        <div className="carousel_navigation">
          <div className="carousel_navigation_left" onClick={prevItem}>
            {navigation?.buttonLeft || <AiOutlineLeft />}
          </div>
          <div className="carousel_navigation_right" onClick={nextItem}>
            {navigation?.buttonRight || <AiOutlineRight />}
          </div>
        </div>
      )}
    </div>
  );
};
