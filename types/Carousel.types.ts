import { StaticImageData } from 'next/image';
import { ReactNode, ReactElement } from 'react';
import { IButton } from '../components';

type CarouselText = 'center' | 'left' | 'right';
type AnimationStyle = 'fade' | 'slide' | 'none';

export interface ICarouselItem {
  /** Starting position of the Carousel Item */
  position: number;
  /** The Carousel Image URL or Component */
  component: string | StaticImageData | ReactNode;
  /** The visible state of the Carousel Item */
  active?: boolean;
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
  items: ICarouselItem[];
  /** Number of visible items in the viewport at a single time */
  visibleItems?: number;
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
  /** Priority to load the carousel images */
  priority?: boolean;
  /** Class attribute of the Slideshow container */
  className?: string;
}
