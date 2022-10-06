import { isValidElement, useState, useEffect, useCallback } from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/future/image';
import styles from './Carousel.module.scss';

import { AiOutlineLeft } from '@react-icons/all-files/ai/AiOutlineLeft';
import { AiOutlineRight } from '@react-icons/all-files/ai/AiOutlineRight';
import { Button, IButton } from '..';
import type { ICarouselItem, ICarousel } from '../../types';

interface ICarouselItemProps extends ICarouselItem {
  active?: boolean;
}

/** Carousel Component */
export const Carousel = ({
  items,
  visibleItems = 1,
  fullWidth = false,
  navigation,
  hideNavigation,
  animation,
  animationDuration,
  priority,
  className,
}: ICarousel) => {
  /** Declare Variables, State, Refs */
  const [slides, setSlides] = useState<ICarouselItemProps[]>(items);

  /** Load Initial Slides */
  useEffect(() => {
    setSlides(prev => [
      ...prev.slice(0, visibleItems).map(item => ({ ...item, active: true })),
      ...prev.slice(visibleItems),
    ]);
  }, [items, visibleItems]);

  /*************************************************************************/
  /** Event Handlers */
  /*************************************************************************/

  /** Right Arrow Click - Next Item */
  const nextItem = useCallback(() => {
    const visibleSlides = slides.filter(slide => slide?.active);

    if (visibleSlides.length === items.length) return;

    const lastVisiblePos = visibleSlides[visibleSlides.length - 1].position;
    const newItemPos =
      slides[slides.length - 1].position > lastVisiblePos
        ? lastVisiblePos + 1
        : slides[0].position;

    console.log({ lastVisiblePos, newItemPos });

    setSlides(prev =>
      prev.map(slide => {
        if (slide.position === newItemPos) {
          return { ...slide, active: true };
        } else if (slide.position === lastVisiblePos) {
          return { ...slide, active: false };
        } else return slide;
      })
    );
  }, [items, slides]);

  /** Left Arrow Click - Previous Item */
  const prevItem = useCallback(() => {
    const visibleSlides = slides.filter(slide => slide?.active);

    if (visibleSlides.length === items.length) return;

    const firstVisiblePos = visibleSlides[0].position;
    const newItemPos =
      items[0].position < firstVisiblePos
        ? firstVisiblePos - 1
        : items[items.length - 1].position;

    setSlides(prev =>
      prev.map(slide => {
        if (slide.position === newItemPos) {
          return { ...slide, active: true };
        } else if (slide.position === firstVisiblePos) {
          return { ...slide, active: false };
        } else return slide;
      })
    );
  }, [items, slides]);

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
        {slides.map(
          ({ position, component, active, primaryButton, heading }) => (
            <div
              className={`carousel_item ${
                animation === 'fade' ? 'fade_in' : animation || ''
              }`}
              key={position}
              data-position={position}
              data-active={active ? 'active' : 'inactive'}
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
                    priority={priority}
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
