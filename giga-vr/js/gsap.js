"use strict";

gsap.registerPlugin(ScrollTrigger);

//---------- loading-animation ----------
const loading = document.querySelector(".loading-animation");
const tl = gsap.timeline();

window.addEventListener("load", () => {
  setTimeout(() => {
    tl.to(loading, { autoAlpha: 0, duration: 1, ease: "power4.out" });
    tl.from(".first-view__img", { scale: 0, duration: 1, ease: "elastic.out" });
    tl.to(".first-view__catch-copy", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
      onComplete: () => {
        document.querySelector(".first-view__img").removeAttribute("style");
      },
    });
  }, 2000);
});

// ----------- about -----------
const aboutImages = document.querySelectorAll(".about__description__image");
const aboutTexts = document.querySelectorAll(".about__description__text");
const aboutTitle = document.querySelector(".about .section-title");

aboutImages.forEach((image) => {
  gsap.from(image, {
    opacity: 0,
    rotate: "90deg",
    scale: 0,
    scrollTrigger: {
      trigger: image,
      start: "top-=1000px top",
      end: "bottom+=300px bottom",
      once: true,
      scrub: 1,
      // markers: true,
    },
  });
});

aboutTexts.forEach((text) => {
  gsap.from(text, {
    opacity: 0,
    y: "100%",
    pause: true,
    scrollTrigger: {
      trigger: text,
      start: "top-=800px top+=100px",
      end: "bottom bottom",
      scrub: 1,
      once: true,
      // markers: true,
    },
  });
});

// ---------- game-soft ----------
const gameSoftImages = document.querySelectorAll(".game-soft__gallery__image");

gsap.from(".game-soft__gallery__image", {
  opacity: 0,
  y: -200,
  duration: 1.5,
  ease: "power4.out",
  stagger: {
    each: 0.1,
    from: "random",
  },
  scrollTrigger: {
    trigger: ".game-soft__gallery",
    start: "top 50%",
  },
  onComplete: () => {
    gameSoftImages.forEach((image) => {
      image.removeAttribute("style");
    });
  },
});

gsap.from(".game-soft__title--emphasis", {
  scale: 0,
  duration: 1,
  ease: "bounce.out",
  scrollTrigger: {
    trigger: ".game-soft",
    start: "top 70%",
  },
});

const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 0 });
const gameVideos = document.querySelectorAll(".game-soft__video");

tl2.to(gameVideos[2], { opacity: 0, duration: 4, ease: "power4.out" });
tl2.to(gameVideos[1], { opacity: 0, duration: 4, ease: "power4.out" });
tl2.to(gameVideos[2], { opacity: 1, duration: 4, ease: "power4.out" });

//----------- vr-lineup -----------
const lineupTitle = document.querySelector(".vr-lineup .c-font-english--uppercase");
const text = "giga vr";
const textArr = [...text];

for (let i = 0; i < textArr.length; i++) {
  const span = document.createElement("span");
  span.classList.add("spans");
  span.textContent = textArr[i];
  lineupTitle.append(span);
}

const spans = document.querySelectorAll(".spans");
spans.forEach((span) => {
  span.style.display = "inline-block";
});

gsap.from(".spans", {
  opacity: 0,
  y: 50,
  rotate: "90deg",
  duration: 0.7,
  ease: "power4.out",
  stagger: {
    each: 0.1,
  },
  scrollTrigger: {
    trigger: ".vr-lineup",
    start: "top 50%",
  },
});

document.querySelectorAll('.vr-lineup__item').forEach((lineupItem)=>{
  gsap.from(lineupItem, {
    opacity: 0,
    x: -25,
    y: 200,
    rotate: "15deg",
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: lineupItem,
      start: "top top+=500px",
      // markers: true,
    },
  });
});

// ---------- campaign ---------
gsap.from(".campaign__title",{
  opacity: 0,
  x: "-100%",
  duration: 0.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".campaign__title",
    start: "top-=400px top",
  }
});

gsap.from(".campaign__figure-wrap",{
  opacity: 0,
  x: "-100%",
  duration: 0.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".campaign__figure-wrap",
    start: "top-=300px top",
  }
});

gsap.from(".campaign__price",{
  opacity: 0,
  x: "-100%",
  duration: 0.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".campaign__price",
    start: "top-=300px top",
  }
});

gsap.from(".campaign-inner .c-catch-copy",{
  opacity: 0,
  x: "-100%",
  duration: 0.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".campaign-inner .c-catch-copy",
    start: "top-=300px top",
  }
});