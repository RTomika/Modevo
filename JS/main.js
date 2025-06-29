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

document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('submit.php', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    document.querySelector('.successBox')?.classList.add('xShow');
    //alert("SENT SUCCESSFULLY");
    form.reset();
  } 
  else if (data.error === 'invalid_email') {
    document.querySelector('.emailErrorBox')?.classList.add('emailErr');
    //alert("INVALID EMAIL");
  } 
  else {
    alert(data.message);
  }
})
.catch(err => {
  console.error('Fetch error:', err);
  alert('Hálózati hiba vagy JSON feldolgozási hiba.');
});
});


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

window.onload = () => {
  setTimeout(() => {
    const title = document.getElementById("heroSubText");
    const letters = title.textContent.trim().split("");
    title.textContent = "";
    title.style.visibility = "visible";

    letters.forEach((char, i) => {
      const span = document.createElement("span");

      if (char === " ") {
        // Use non-breaking space and no transform
        span.innerHTML = "&nbsp;";
        span.style.display = "inline-block";
        span.style.width = "0.3em"; // keeps consistent spacing
        span.style.transition = "none";
      } else {
        span.textContent = char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        span.style.transition = `all 0.5s ease ${i * 0.05}s`;
      }

      title.appendChild(span);
    });

    // Trigger animation
    setTimeout(() => {
      const spans = title.querySelectorAll("span");
      spans.forEach(span => {
        if (span.textContent.trim()) {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }
      });
    }, 50);
  }, 1000);
};


const mainText = document.getElementById("mainText");
const heroBtn = document.getElementById("heroBtn");
  setTimeout(() => {
    mainText.classList.add("mainTextShow");
  }, 100);
  setTimeout(() => {
    heroBtn.classList.add("heroBtnShow");
  }, 1800);

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


    const boxes = document.querySelectorAll(".boxes");
    const priceBoxes = document.querySelectorAll(".priceBoxes");
    const priceBox1 = document.getElementById("priceBox1");
    const priceBox2 = document.getElementById("priceBox2");
    const priceBox3 = document.getElementById("priceBox3");
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 1) {
              box1.classList.add("boxShow");
              setTimeout(() => {
                box2.classList.add("boxShow");
              }, 300);
              setTimeout(() => {
                box3.classList.add("boxShow");
              }, 600);
            }
        });
    }, { threshold: 1 });

    boxes.forEach(box => observer2.observe(box));



  const observerPrice = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 1) {
              priceBox1.classList.add("priceShow");
              setTimeout(() => {
                priceBox2.classList.add("priceShow");

              }, 300);
              setTimeout(() => {
                priceBox3.classList.add("priceShow");
              }, 600);
            }
        });
    }, { threshold: 1 });

    boxes.forEach(box => observer2.observe(box));

    priceBoxes.forEach(priceBox => observerPrice.observe(priceBox));

    const dropElements = document.querySelectorAll(".dropScroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                entry.target.classList.add("dropShow");
            }
        });
    }, { threshold: 0.7 });

    dropElements.forEach(dropElement => observer.observe(dropElement));

})