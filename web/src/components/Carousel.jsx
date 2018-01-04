import React from 'react';
import Slider from 'nuka-carousel';
import images from '../assets/images/slides';

const Carousel = () => (
  <Slider>
    {images.map(i => <img src={i.src} alt={`img_${i.key}`} key={i.key} />)}
  </Slider>
);

export default Carousel;
