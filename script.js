// Typewriter Effect for the Cover Subtitle
const consoleText = document.querySelector('.console-text');
const originalText = consoleText.innerHTML; // Store the HTML (with spans)
consoleText.innerHTML = ''; // Clear it initially

let i = 0;
const typeSpeed = 30; // ms

// Simple text typing (ignores HTML tags for simplicity, or we can use a library, 
// but for this specific "Initializing..." string, we can just reveal it or type plain text)
// Since it has child spans, let's try a different approach:
// Reveal the container and animate a cursor, or just type the plain text part first then fade in the status.

// Let's do a pure text typing for a new element, or simple reveal.
// Alternative: "Initializing System..." is the part to type.
// Let's restructure the HTML slightly in JS to type the first part, then show the rest.

const typeWriter = (text, element, callback) => {
    let index = 0;
    element.innerHTML = '';

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        } else {
            if (callback) callback();
        }
    }
    type();
};

// Fix for the console text: specific typing logic
const statusPart = ` Security: <span class="status-active">Active</span> | Network: <span class="status-stable">Stable</span> | Web: <span class="status-online">Online</span>]`;
const prefix = "[Initializing System...";

// Clear and prepare
consoleText.innerHTML = '<span id="typed-prefix"></span><span id="typed-status" style="opacity:0"></span>';
const typedPrefix = document.getElementById('typed-prefix');
const typedStatus = document.getElementById('typed-status');
typedStatus.innerHTML = statusPart;

// Start typing
setTimeout(() => {
    typeWriter(prefix, typedPrefix, () => {
        // Fade in the status part
        let op = 0;
        const fadeInt = setInterval(() => {
            if (op >= 1) clearInterval(fadeInt);
            typedStatus.style.opacity = op;
            op += 0.05;
        }, 50);
    });
}, 500);


// Matrix Rain Effect (Scoped to Closing Section)
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const closingSection = document.getElementById('closing');

// Set canvas dimensions to match the closing section
function resizeCanvas() {
    canvas.width = closingSection.offsetWidth;
    canvas.height = closingSection.offsetHeight;
}
resizeCanvas();

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
let columns = canvas.width / fontSize;

let rainDrops = [];

function initRain() {
    columns = canvas.width / fontSize;
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
}
initRain();

const draw = () => {
    ctx.fillStyle = 'rgba(5, 5, 16, 0.1)'; // Slightly more opacity for faster fade
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

let interval = setInterval(draw, 30);

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "flex"; // Changed to flex to help center if needed, but css has block. Let's align.
        // Actually CSS has display:none and padding-top 50px. Let's just use block as per CSS or override.
        // Let's stick to the CSS I wrote: display: none -> display: block
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });
});

// Close functionality
closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
});

// Close on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initRain();
});
