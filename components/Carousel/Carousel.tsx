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
  }, [visibleItems]);

  /*************************************************************************/
  /** Event Handlers */
  /*************************************************************************/

  /**********************************/
  /** Right Arrow Click - Next Item */
  /**********************************/
  const nextItem = useCallback(() => {
    const activeSlides = slides.filter(slide => slide?.active);

    if (activeSlides.length === slides.length) return;

    const lastActivePos = activeSlides[activeSlides.length - 1].position;
    const newItemPos =
      slides[slides.length - 1].position > lastActivePos
        ? lastActivePos + 1
        : (slides.find(slide => !slide?.active) as ICarouselItemProps).position;

    const newItem = slides.find(
      e => e.position === newItemPos
    ) as ICarouselItemProps;

    setSlides(prev => [
      { ...newItem, active: true },
      ...prev
        .filter(s => s.position !== newItemPos)
        .map(slide => {
          if (slide.position === lastActivePos) {
            return { ...slide, active: false };
          } else return slide;
        }),
    ]);
  }, [slides]);

  /*************************************/
  /** Left Arrow Click - Previous Item */
  /*************************************/
  const prevItem = useCallback(() => {
    const activeSlides = slides.filter(slide => slide?.active);

    if (activeSlides.length === slides.length) return;

    const inactiveSlides = slides.filter(slide => !slide?.active);

    const firstActivePos = activeSlides[0].position;
    const newItemPos =
      slides[0].position < firstActivePos
        ? firstActivePos - 1
        : inactiveSlides[inactiveSlides.length - 1].position;

    const newItem = slides.find(
      e => e.position === newItemPos
    ) as ICarouselItemProps;

    setSlides(prev => [
      ...prev
        .filter(s => s.position !== newItemPos)
        .map(slide => {
          if (slide.position === firstActivePos) {
            return { ...slide, active: false };
          } else return slide;
        }),
      { ...newItem, active: true },
    ]);
  }, [slides]);

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
        <>
          <div
            className={`${styles.carousel_navigation} ${styles.left}`}
            onClick={prevItem}
          >
            {navigation?.buttonLeft || <AiOutlineLeft />}
          </div>
          <div
            className={`${styles.carousel_navigation} ${styles.right}`}
            onClick={nextItem}
          >
            {navigation?.buttonRight || <AiOutlineRight />}
          </div>
        </>
      )}
    </div>
  );
};
