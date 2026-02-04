const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}
navSlide();

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["websites.", "dashboards.", "e-commerce sites.", "Figma designs."];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            const animation = entry.target.getAttribute('data-aos');
            if (animation) {
                entry.target.style.animationName = animation;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 1s ease-out';
    observer.observe(el);
});


let vantaEffect = VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00f2ea,
    backgroundColor: 0x0a0a0a,
    points: 10.00,
    maxDistance: 20.00,
    spacing: 15.00
});


window.addEventListener('resize', () => {
    if (vantaEffect) vantaEffect.resize();
});

const tiltCards = document.querySelectorAll('.project-card, .skill-card');

tiltCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
    });
});

const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

const BOT_TOKEN = '8294558578:AAFmR_N2eehhm9T1FC57A8WEZPmk9OQGsag';
const CHAT_ID = '-5089584594';

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || !CHAT_ID || CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        alert('Please configure your Telegram Bot Token and Chat ID in app.js!');
        return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    const text = `New Portfolio Contact! 🚀\n\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                submitBtn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#00f2ea';
                submitBtn.style.color = '#000';
                contactForm.reset();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Telegram Error:', data);
                alert('Oops! Something went wrong. Please try again later.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('Failed to send message. Check console for details.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});
