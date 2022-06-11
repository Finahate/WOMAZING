const swiperHeader = new Swiper(".swiper-header", {
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  const swiperTeam = new Swiper(".swiper-team", {
    loop: true,
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });