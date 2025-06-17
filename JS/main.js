document.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis({
    duration: 1.4,
    easing: t => t * (2 - t),
    smooth: true,
    smoothTouch: false
});

function raf(time) {
    console.log(lenis)
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let latestScrollTop = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  latestScrollTop = window.scrollY || window.pageYOffset;
  requestTick();
});

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}


function updateParallax() {
  const scrollTop = latestScrollTop;
  const fadeDistance = 800;
  // Parallax effect
  const video = document.getElementById('heroVideo');
  if (video) {
    video.style.transform = `translate(-50%, -50%) translateY(${scrollTop * 0.5}px)`;
  }
  // Overlay fade-in
  const overlayElements = document.querySelectorAll('.firstThing');
  let overlayOpacity = scrollTop / fadeDistance;
  overlayOpacity = Math.max(0, Math.min(1, overlayOpacity));
  overlayElements.forEach(el => {
    el.style.opacity = overlayOpacity;
  });
  ticking = false;
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; 
    }
    window.scrollTo(0, 0);

    //Navbar
    const navbar = document.getElementById("mainNav");
    setTimeout(() => {
      navbar.style.transform = "translate(-50%, 0)";
      navbar.style.opacity = "1";
    }, 2200);
    let lastScrollY = window.scrollY;

    function handleScrollDirection() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        navbar.style.transform = 'translate(-50%, -50px)';
        navbar.style.opacity = "0";
      } else {
        navbar.style.transform = 'translate(-50%, 0)';
        navbar.style.opacity = "1";
      }

      lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', handleScrollDirection);

    //Arrow Down 
    let arrow = document.querySelector('.arrowDown');
    let arrowShown = false;
    let userHasScrolled = false;
    let arrowTimeout;

    window.addEventListener('load', () => {
    arrowTimeout = setTimeout(() => {
        if (!userHasScrolled) {
        arrow.classList.add('arrowShow');
        arrowShown = true;
        }
    }, 6000);
    });

    window.addEventListener('scroll', () => {
    userHasScrolled = true;

    if (arrowShown) {
        arrow.classList.remove('arrowShow');
        arrowShown = false;
    }

    clearTimeout(arrowTimeout);
    });
})