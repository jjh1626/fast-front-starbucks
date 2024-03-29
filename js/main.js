
/** 스크롤 처리 */ 
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// _.throttle(함수, 시간) : lodash 라이브러리 (스크롤 이벤트가 너무 많이 발생되지 않도록)
// gsap.to(요소, 지속시간, 옵션) : gsap 애니메이션 라이브러리
window.addEventListener('scroll',_.throttle(function(){
  console.log('scroll 위치:',window.scrollY);
  if(window.scrollY > 500){
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    })
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    })
  }
}, 300));

toTopEl.addEventListener('click', function(){
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(window, .7, {
    scrollTo: 0
  })
});


/** 메인 이미지 처리 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    opacity: 1,
    delay: (index + 1) * .7   // 0.7, 1.4, 2.1 ...
  })
});


/** 공지사항 : swiper 처리 */
// new Swiper(선택자, 옵션)
const noticeSwiper = new Swiper('.notice-line .swiper',{
  direction: 'vertical',
  autoplay: true,   // 자동재생
  loop: true        // 반복재생
});


/** 프로모션 : swiper 처리 */
const promotionSwiper = new Swiper('.promotion .swiper',{
  direction: 'horizontal',  // 기본값(지정하지 않아도 됨)
  slidesPerView: 3,         // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10,         // 슬라이드 사이 여백
  centeredSlides: true,     // 첫번째 보여질 슬라이드 가운데 보이기
  loop: true,               // 반복재생
  autoplay: {
    delay: 5000              //5초 (기본값 3000 : 3초)
  },
  pagination: {
    el: '.promotion .swiper-pagination',  // 페이지 번호 요소 선택자
    clickable: true   // 사용자의 페이지 번호 요소 제어 가능여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});


/** YOUTUBE 영역 처리 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// YOUTUBE 영역 이미지 애니메이션 처리
function floatingObject(selector, delay, size){
  // gsap.to(요소, 시간, 옵션)
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y: size,
      repeat: -1,   //반복(-1:무한반복)
      yoyo: true,   //되돌아감
      ease: "power1.inOut",
      delay: random(0, delay)
  })
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


/** ScrollMagic */
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,   // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


/** 하단 AWARDS 부분 스크롤 처리 */
// new Swiper(선택자, 옵션)
const awardSwiper = new Swiper('.awards .swiper', {
  direction: 'horizontal',
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})
