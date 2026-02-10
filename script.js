// ======================================
// MUSIC PLAYBACK
// ======================================
function playMusic() {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.volume = 0.5;
    music.play().catch(() => {
      console.log("Autoplay blocked, will retry on next click.");
    });
  }
}

function tryResumeMusic() {
  const music = document.getElementById("bgMusic");
  if (music && music.paused) {
    music.play().catch(() => {});
  }
}

// ======================================
// STEP NAVIGATION
// ======================================
let musicStarted = false;
let butterfliesStarted = false;

function nextStep(step) {
  // Hide all cards
  document.querySelectorAll(".card").forEach((c) => {
    c.style.animation = "none";
    c.classList.add("hidden");
  });

  // Show the target card with entrance animation
  const target = document.getElementById("step" + step);
  target.classList.remove("hidden");
  target.style.animation =
    "cardEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both";

  // Start music on first button click (step 2)
  if (!musicStarted && step >= 2) {
    musicStarted = true;
    playMusic();
  } else {
    // Keep retrying if it was blocked earlier
    tryResumeMusic();
  }

  // Start floating icons from step 2 onwards
  if (!butterfliesStarted && step >= 2) {
    butterfliesStarted = true;
    startFloatingIcons();
  }

  // Start word rotation on step 4
  if (step === 4) {
    startWordRotation();
  }
}

// ======================================
// CHECKLIST LOGIC
// ======================================
let checks = 0;

function checkItem(id) {
  const item = document.getElementById(id);
  if (item.classList.contains("checked")) return;

  item.classList.add("checked");
  const box = item.querySelector(".checkbox");
  box.innerText = "✅";
  checks++;

  if (checks === 5) {
    const msg = document.getElementById("checklist-msg");
    msg.innerText = "Wait… that describes YOU perfectly! ✨";

    const btn = document.getElementById("step2-btn");
    btn.classList.remove("hidden");
    btn.style.animation =
      "cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both";
  }
}

// ======================================
// "NO" BUTTON LOGIC
// ======================================
let yesScale = 1;
const noTexts = [
  "Pray about it? 🙏",
  "Are you sure?",
  "1 Cor 13 says love is patient…",
  "Don't harden your heart! 😢",
  "God is watching 👀",
  "Faith over fear! Click Yes!",
  "I'll buy you dinner after church!",
  "Pretty please? ✝️",
  "Last chance… 🥺",
];
let txtIndex = 0;

function avoidNo() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  // Make Yes bigger
  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Change No text
  noBtn.innerText = noTexts[txtIndex];
  txtIndex = (txtIndex + 1) % noTexts.length;

  // Make No button smaller
  const currentSize = parseFloat(getComputedStyle(noBtn).fontSize);
  noBtn.style.fontSize = Math.max(currentSize - 1, 8) + "px";
  noBtn.style.opacity = Math.max(0.3, 1 - txtIndex * 0.1);
}

// ======================================
// CELEBRATION (STEP 5)
// ======================================
function finish() {
  nextStep(5);
  createBlessings();
}

function createBlessings() {
  setInterval(() => {
    const floater = document.createElement("div");
    floater.classList.add("floater");
    const icons = [
      "❤", "🕊️", "✨", "✝️", "🦋", "💕", "🌸", 
      "💖", "🥰", "💍", "🤍", "😍", "💌", "💏",
      "🌹", "🧸", "💒", "👰", "🤵"
    ];
    floater.innerText = icons[Math.floor(Math.random() * icons.length)];

    // Randomize position and size
    floater.style.left = Math.random() * 100 + "vw";
    floater.style.fontSize = Math.random() * 20 + 20 + "px"; // 20px - 40px
    
    // Vary the animation speed
    const duration = Math.random() * 3 + 4; // 4s - 7s
    floater.style.animationDuration = duration + "s";

    // Add some random horizontal wobble
    floater.style.transform = `translateX(${Math.random() * 40 - 20}px)`;

    document.body.appendChild(floater);
    
    // Remove after animation completes
    setTimeout(() => floater.remove(), duration * 1000 + 100);
  }, 100); // Faster spawn (100ms)
}

// ======================================
// FLOATING ICONS (Background)
// ======================================
function startFloatingIcons() {
  // Spawn a few immediately
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createFloatingIcon(), i * 400);
  }
  // Then keep spawning
  setInterval(() => createFloatingIcon(), 2000);
}

function createFloatingIcon() {
  const b = document.createElement("div");
  b.classList.add("butterfly"); // Keeping class name for CSS compatibility, or adding new style?
  // Let's reuse 'butterfly' class but change content, or better, add a specific style for mixed icons if needed.
  // Actually, 'butterfly' class in CSS defines the animation. Let's see if we can reuse it.
  // The user wants mixed icons, not just butterflies.
  
  const icons = ["🦋", "❤", "🕊️", "✨", "💕", "🌸", "💖", "🥰"];
  b.innerText = icons[Math.floor(Math.random() * icons.length)];
  
  b.style.fontSize = Math.random() * 16 + 18 + "px";
  b.style.left = Math.random() * 90 + 5 + "vw";
  b.style.animationDuration = Math.random() * 6 + 6 + "s";
  document.body.appendChild(b);

  setTimeout(() => b.remove(), 12000);
}


// ======================================
// GALLERY — PREMIUM LIGHTBOX & DOTS
// ======================================
const galleryImages = [
  // 📸 Photo 1
  { src: "images/Image1.jpeg", caption: "🤍 The beginning of us" },
    // 🌹 GIF
  { src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGR6Y3JsZWR5MnRwMHN0MHlicTdsOHRoNDhjenZmaHdtdGJvMWJ3NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26FLdmIp6wJr91JAI/giphy.gif", caption: "🌹 Forever and always" },
  // 📸 Photo 2
  { src: "images/image2.jpeg", caption: "✨ Blessed with family" },
  // 💖 GIF
  { src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1yYzV5cW9tNHFpdW5laDQ4bThvN3JhdTdhNmV4Z2N5YWNiajJyeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26BRv0ThflsHCqDrG/giphy.gif", caption: "💖 My heart is yours" },
  // 📸 Photo 3
  { src: "images/image3.jpeg", caption: "💕 Side by side, always" },
  // 🧸 GIF
  { src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW81aHRtYjlkY3libm5kNjQ3dTkyemVidmlqb2t2M250cjdsaWllaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieTfp1MeFLiBQR2/giphy.gif", caption: "🧸 Bear hugs for you" },
   // 📸 Photo 4
  { src: "images/image4.jpeg", caption: "🥰 Serving God together, always" },
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const overlay = document.getElementById("lightboxOverlay");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  const counter = document.getElementById("lightboxCounter");

  img.src = galleryImages[index].src;
  caption.textContent = galleryImages[index].caption;
  counter.textContent = `${index + 1} / ${galleryImages.length}`;

  overlay.classList.remove("hidden");
  overlay.style.animation = "lightboxFadeIn 0.4s ease both";

  // Recreate the slide-up on the content
  const content = overlay.querySelector(".lightbox-content");
  content.style.animation = "none";
  void content.offsetWidth; // trigger reflow
  content.style.animation =
    "lightboxSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both";
}

function closeLightbox(e) {
  if (e) e.stopPropagation();
  const overlay = document.getElementById("lightboxOverlay");
  overlay.style.animation = "lightboxFadeIn 0.3s ease reverse both";
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 280);
}

function lightboxNav(dir, e) {
  if (e) e.stopPropagation();
  let next = currentLightboxIndex + dir;
  if (next < 0) next = galleryImages.length - 1;
  if (next >= galleryImages.length) next = 0;
  openLightbox(next);
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay && !overlay.classList.contains("hidden")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lightboxNav(1);
    if (e.key === "ArrowLeft") lightboxNav(-1);
  }
});

// Scroll to a specific gallery card
function scrollToCard(index) {
  const swipe = document.getElementById("gallerySwipe");
  if (!swipe) return;
  const cards = swipe.querySelectorAll(".gallery-card");
  if (cards[index]) {
    cards[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
  updateDots(index);
}

// Update gallery dots based on active index
function updateDots(activeIndex) {
  const dots = document.querySelectorAll(".gallery-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
  });
}

// IntersectionObserver to track which card is in view
function initGalleryObserver() {
  const swipe = document.getElementById("gallerySwipe");
  if (!swipe) return;

  const cards = swipe.querySelectorAll(".gallery-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          if (index !== -1) updateDots(index);
        }
      });
    },
    {
      root: swipe,
      threshold: 0.6,
    },
  );

  cards.forEach((card) => observer.observe(card));
}

// Initialize gallery observer when gallery becomes visible
const observerInit = new MutationObserver(() => {
  const galleryStep = document.getElementById("step3.5");
  if (galleryStep && !galleryStep.classList.contains("hidden")) {
    initGalleryObserver();
    observerInit.disconnect();
  }
});

observerInit.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});

// ======================================
// DATE FORM SUBMISSION (STEP 6 → 7)
// ======================================
function handleDateSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("dateForm");
  const btn = document.getElementById("submitDateBtn");
  const dateVal = document.getElementById("dateInput").value;
  const timeVal = document.getElementById("timeInput").value;
  const msgVal = document.getElementById("messageInput").value;

  if (!dateVal || !timeVal) return;

  // Show loading state
  btn.classList.add("loading");
  btn.textContent = "Sending...";

  // Format the date nicely
  const dateObj = new Date(dateVal + "T" + timeVal);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Prepare form data
  const formData = new FormData(form);

  // Send via fetch to FormSubmit
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      showConfirmation(formattedDate, formattedTime, msgVal);
    })
    .catch((error) => {
      // Even if fetch fails, try iframe fallback
      form.target = "form-target";
      form.submit();
      setTimeout(() => {
        showConfirmation(formattedDate, formattedTime, msgVal);
      }, 1500);
    });
}

function showConfirmation(date, time, message) {
  // Build the confirmation details
  const details = document.getElementById("dateConfirmDetails");
  let html = `📅 <strong>${date}</strong><br/>`;
  html += `🕐 <strong>${time}</strong>`;
  if (message && message.trim()) {
    html += `<br/><br/>💌 "${message}"`;
  }
  details.innerHTML = html;

  // Navigate to step 7
  nextStep(7);
}

// ======================================
// DYNAMIC WORD ROTATION (STEP 4)
// ======================================
function startWordRotation() {
  const wordSpan = document.getElementById("changing-word");
  const words = ["Valentine", "Love", "Wife", "Date", "Future", "Forever", "Best Friend"];
  let wordIndex = 0;

  // Initial call - but don't overwrite if it's already there
  if (!wordSpan) return;

  setInterval(() => {
    // Fade out
    wordSpan.style.opacity = "0";
    wordSpan.style.transition = "opacity 0.2s ease";

    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      if (wordSpan) {
        wordSpan.innerText = words[wordIndex];
        // Fade in
        wordSpan.style.opacity = "1";
      }
    }, 200);
  }, 1200); // Change every 1.2 seconds for better readability
}
