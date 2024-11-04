import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const initializeSwiper = () => {
  return new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 6000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      dynamicBullets: true,
    },
    simulateTouch: true,
    grabCursor: true,
  });
};
