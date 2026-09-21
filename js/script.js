document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 🔧 HELPER
    // =========================================

    const $ = (id) => document.getElementById(id);


    // =========================================
    // 🎂 BIRTHDAY INFORMATION
    // =========================================

    $("celebrantName").textContent = birthdayData.celebrant_name;

    $("birthdayDate").textContent = birthdayData.birthday;

    $("welcomeMessage").textContent = birthdayData.welcome_message;

    $("personalMessage").textContent = birthdayData.personal_message;


    // =========================================
    // ✨ SECTION NAVIGATION
    // =========================================

    function showSection(id) {

        document.querySelectorAll(".section").forEach(section => {

            section.classList.add("hidden");

            section.classList.remove("section-enter");

        });

        const section = $(id);

        if (!section) return;

        section.classList.remove("hidden");

        // Restart animation
        void section.offsetWidth;

        section.classList.add("section-enter");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =========================================
    // 🔘 NEXT BUTTONS
    // =========================================

    document.querySelectorAll("[data-next]").forEach(button => {

        button.addEventListener("click", () => {

            showSection(button.dataset.next);

        });

    });


    // =========================================
    // 📸 MEMORIES
    // =========================================

    function renderMemories() {

        const container = $("memories-list");

        if (!container) return;

        container.innerHTML = "";

        memories.forEach(memory => {

            const card = document.createElement("div");

            card.className = "photo-card";

            card.innerHTML = `
                <img
                    src="assets/images/memories/${memory.image}"
                    alt="${memory.title}"
                >

                <h3>${memory.title}</h3>

                <p>${memory.description}</p>

                ${memory.memory_date
                    ? `<small>${memory.memory_date}</small>`
                    : ""
                }
            `;

            container.appendChild(card);

        });

    }


    // =========================================
    // 💌 18 WISHES
    // =========================================

    function renderWishes() {

        const container = $("wishes-list");

        if (!container) return;

        container.innerHTML = "";

        wishes.forEach((item, index) => {

            const card = document.createElement("div");

            card.className = "wish-card";

            card.innerHTML = `
                <h3>Wish ${index + 1} 💖</h3>

                <p>${item.wish}</p>

                <small>— ${item.sender_name}</small>
            `;

            container.appendChild(card);

        });

    }


    // =========================================
    // 🖼️ PHOTO GALLERY
    // =========================================

    function renderGallery() {

        const container = $("gallery-list");

        if (!container) return;

        container.innerHTML = "";

        gallery.forEach(photo => {

            const card = document.createElement("div");

            card.className = "photo-card";

            card.innerHTML = `
                <img
                    src="${photo.image}"
                    alt="Birthday photo"
                >

                <p>${photo.caption}</p>
            `;

            // Open lightbox
            card.addEventListener("click", () => {

                $("lightboxImage").src = photo.image;

                $("lightboxCaption").textContent =
                    photo.caption;

                $("lightbox").classList.remove("hidden");

            });

            container.appendChild(card);

        });

    }


    // =========================================
    // 🚀 RENDER EVERYTHING
    // =========================================

    renderMemories();

    renderWishes();

    renderGallery();


    // =========================================
    // 🎁 OPEN GIFT
    // =========================================

    const openGiftButton = $("openGift");

    const giftOverlay = $("giftOverlay");

    const gift = giftOverlay.querySelector(".gift");


    openGiftButton.addEventListener("click", () => {

        // Show gift overlay
        giftOverlay.classList.remove("hidden");

        // Restart gift animation
        gift.classList.remove("gift-opening");

        void gift.offsetWidth;

        gift.classList.add("gift-opening");


        // 🎵 Start music
        const music = $("birthdayMusic");

        music.play()
            .then(() => {

                $("musicControl").textContent = "🔊";

            })
            .catch(() => {

                console.log("Music requires user interaction.");

            });


        // After gift animation
        setTimeout(() => {

            giftOverlay.classList.add("hidden");

            showSection("message-section");


            // 💕 Heart burst
            for (let i = 0; i < 12; i++) {

                setTimeout(() => {

                    createFloatingHeart();

                }, i * 100);

            }

        }, 900);

    });


    // =========================================
    // 🎵 MUSIC CONTROL
    // =========================================

    const music = $("birthdayMusic");

    const musicControl = $("musicControl");


    musicControl.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {

                    musicControl.textContent = "🔊";

                })
                .catch(() => {});

        } else {

            music.pause();

            musicControl.textContent = "🔇";

        }

    });


// =========================================
// 🎉 CELEBRATE
// =========================================

$("celebrate").addEventListener("click", () => {

    const button = $("celebrate");
    const finalCard = document.querySelector(".final-card");

    // 🎉 Button effect
    button.classList.remove("celebrate-button-pop");
    void button.offsetWidth;
    button.classList.add("celebrate-button-pop");

    // 🎂 Final card effect
    if (finalCard) {
        finalCard.classList.remove("celebration-active");
        void finalCard.offsetWidth;
        finalCard.classList.add("celebration-active");
    }

    // 🎊 Create a BIG burst
    const celebrationEmojis = [
        "🎉",
        "✨",
        "💖",
        "💕",
        "🎊",
        "❤️",
        "⭐"
    ];

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("div");

        particle.className = "celebration-particle";

        particle.textContent =
            celebrationEmojis[
                Math.floor(
                    Math.random() * celebrationEmojis.length
                )
            ];

        // Start from center
        particle.style.left = "50%";
        particle.style.top = "50%";

        // Random direction
        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            120 + Math.random() * 280;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        particle.style.fontSize =
            (18 + Math.random() * 22) + "px";

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1600);
    }

    // ❤️ Extra heart burst
    for (let i = 0; i < 20; i++) {

        setTimeout(() => {
            createFloatingHeart();
        }, i * 40);

    }

});


    // =========================================
    // ❌ LIGHTBOX
    // =========================================

    $("closeLightbox").addEventListener("click", () => {

        $("lightbox").classList.add("hidden");

    });


    $("lightbox").addEventListener("click", (event) => {

        if (event.target === $("lightbox")) {

            $("lightbox").classList.add("hidden");

        }

    });


    // =========================================
    // 💕 FLOATING HEARTS
    // =========================================

    function createFloatingHeart() {

        const heart = document.createElement("div");

        const hearts = [
            "❤️",
            "💕",
            "💗",
            "💖",
            "💓"
        ];

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.className = "floating-heart";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (14 + Math.random() * 16) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 4) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 9000);

    }


    // Automatically create hearts
    setInterval(createFloatingHeart, 800);


    // =========================================
    // ✨ SCROLL ANIMATIONS
    // =========================================

    const animatedElements =
        document.querySelectorAll(
            ".section, .photo-card, .card, .birthday-card"
        );


    animatedElements.forEach(element => {

        element.classList.add("fade-in");

    });


    const animationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(element => {

        animationObserver.observe(element);

    });


    // =========================================
    // ✨ GLOWING HEADINGS
    // =========================================

    document.querySelectorAll("h1").forEach(heading => {

        heading.classList.add("glow-text");

    });

});