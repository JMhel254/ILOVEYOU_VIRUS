// ======================================
// MUSIC PLAYBACK
// ======================================
function playMusic() {
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.5;
        music.play().catch(() => {
            console.log("Autoplay blocked, will retry on next click.");
        });
    }
}

function tryResumeMusic() {
    const music = document.getElementById('bgMusic');
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
    document.querySelectorAll('.card').forEach(c => {
        c.style.animation = 'none';
        c.classList.add('hidden');
    });

    // Show the target card with entrance animation
    const target = document.getElementById('step' + step);
    target.classList.remove('hidden');
    target.style.animation = 'cardEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both';

    // Start music on first button click (step 2)
    if (!musicStarted && step >= 2) {
        musicStarted = true;
        playMusic();
    } else {
        // Keep retrying if it was blocked earlier
        tryResumeMusic();
    }

    // Start butterflies from step 2 onwards
    if (!butterfliesStarted && step >= 2) {
        butterfliesStarted = true;
        startButterflies();
    }
}

// ======================================
// CHECKLIST LOGIC
// ======================================
let checks = 0;

function checkItem(id) {
    const item = document.getElementById(id);
    if (item.classList.contains('checked')) return;

    item.classList.add('checked');
    const box = item.querySelector('.checkbox');
    box.innerText = '✅';
    checks++;

    if (checks === 3) {
        const msg = document.getElementById('checklist-msg');
        msg.innerText = "Wait… that describes YOU perfectly! ✨";
        
        const btn = document.getElementById('step2-btn');
        btn.classList.remove('hidden');
        btn.style.animation = 'cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both';
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
    "Last chance… 🥺"
];
let txtIndex = 0;

function avoidNo() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    // Make Yes bigger
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Change No text
    noBtn.innerText = noTexts[txtIndex];
    txtIndex = (txtIndex + 1) % noTexts.length;

    // Make No button smaller
    const currentSize = parseFloat(getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = Math.max(currentSize - 1, 8) + 'px';
    noBtn.style.opacity = Math.max(0.3, 1 - (txtIndex * 0.1));
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
        const floater = document.createElement('div');
        floater.classList.add('floater');
        const icons = ['❤', '🕊️', '✨', '✝️', '🦋', '💕', '🌸'];
        floater.innerText = icons[Math.floor(Math.random() * icons.length)];

        floater.style.left = Math.random() * 100 + 'vw';
        floater.style.animationDuration = Math.random() * 3 + 3 + 's';
        floater.style.fontSize = Math.random() * 18 + 16 + 'px';

        document.body.appendChild(floater);
        setTimeout(() => floater.remove(), 6000);
    }, 250);
}

// ======================================
// BUTTERFLIES
// ======================================
function startButterflies() {
    // Spawn a few immediately
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createButterfly(), i * 600);
    }
    // Then keep spawning
    setInterval(() => createButterfly(), 3000);
}

function createButterfly() {
    const b = document.createElement('div');
    b.classList.add('butterfly');
    b.innerText = '🦋';
    b.style.fontSize = (Math.random() * 16 + 18) + 'px';
    b.style.left = Math.random() * 90 + 5 + 'vw';
    b.style.animationDuration = (Math.random() * 6 + 6) + 's';
    document.body.appendChild(b);

    setTimeout(() => b.remove(), 12000);
}