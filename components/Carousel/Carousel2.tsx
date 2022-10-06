import { isValidElement, useState, useEffect, useCallback } from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/future/image';
import styles from './Carousel.module.scss';

import { AiOutlineLeft } from '@react-icons/all-files/ai/AiOutlineLeft';
import { AiOutlineRight } from '@react-icons/all-files/ai/AiOutlineRight';
import { Button, IButton } from '..';
import type { ICarouselItem, ICarousel } from '../../types';

/** Carousel Component */
export const Carousel2 = ({
  items,
  visibleItems = 1,
  fullWidth = false,
  navigation,
  hideNavigation,
  animation = 'none',
  animationDuration = 0,
  priority,
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
