const carousel = document.querySelector(".skills-carousel");
const originalCards = Array.from(document.querySelectorAll(".skill-card"));
const filters = document.querySelectorAll(".skill-filter");

let scrollPosition = 0;
let scrollInterval = null;
let isPaused = false;

/* ==========================
   AUXILIARY FUNCTIONS
========================== */

function hasOverflow() {
  return carousel.scrollWidth > carousel.clientWidth;
}

function getVisibleCards() {
  return originalCards.filter(
    (card) => !card.classList.contains("is-hidden")
  );
}

/* ==========================
   AUTO SCROLL
========================== */

function startAutoScroll() {
  stopAutoScroll();

  if (!hasOverflow()) return;

  scrollInterval = setInterval(() => {
    if (isPaused) return;

    scrollPosition += 1.2;
    carousel.scrollLeft = scrollPosition;

    const halfScroll = carousel.scrollWidth / 2;

    if (scrollPosition >= halfScroll) {
      scrollPosition = 0;
      carousel.scrollLeft = 0;
    }
  }, 16);
}


function stopAutoScroll() {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}

/* ==========================
   BUILD INFINITE LOOP
========================== */

function rebuildCarousel(cards, duplicate = false) {
  carousel.innerHTML = "";

  cards.forEach((card) => {
    carousel.appendChild(card.cloneNode(true));
  });

  if (duplicate) {
    cards.forEach((card) => {
      carousel.appendChild(card.cloneNode(true));
    });
  }

  scrollPosition = 0;
  carousel.scrollLeft = 0;
}

/* ==========================
   CHECK LOOP POSSIBILITY
========================== */

function updateCarouselLayout() {
  stopAutoScroll();
  isPaused = false;

  const visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  // monta SEM duplicar primeiro
  rebuildCarousel(visibleCards, false);

  // espera o browser calcular layout
  requestAnimationFrame(() => {
    // 🔹 SEM overflow → centraliza
    if (!hasOverflow()) {
      carousel.classList.add("centered");
      stopAutoScroll();
      return;
    }

    // 🔹 COM overflow → cria loop
    carousel.classList.remove("centered");

    rebuildCarousel(visibleCards, true);

    // espera novamente após duplicar
    requestAnimationFrame(() => {
      if (hasOverflow()) {
        startAutoScroll();
      }
    });
  });
}

/* ==========================
   FILTER
========================== */

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    originalCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
    
    updateCarouselLayout();
  });
});

/* ==========================
   PAUSE ON HOVER
========================== */

carousel.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".skill-card");
  if (card) {
    isPaused = true;
  }
});

carousel.addEventListener("mouseout", (e) => {
  const card = e.target.closest(".skill-card");
  if (card) {
    isPaused = false;
  }
});

/* ==========================
   INIT
========================== */

window.addEventListener("load", updateCarouselLayout);
window.addEventListener("resize", updateCarouselLayout);
