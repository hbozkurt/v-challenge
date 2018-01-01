import React from 'react';
import Slider from 'react-slick';
import images from '../assets/images/slides';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => (
  <Slider {...settings} >
    {images.map(i => <img src={i.src} alt={`img_${i.key}`} key={i.key} />)}
  </Slider>
);

export default Carousel;
