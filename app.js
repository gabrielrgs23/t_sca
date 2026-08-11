/*==========================================================
    APP
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initMobileMenu();

    initSmoothScroll();

    initReveal();

    initHeroParallax();

    initCounters();

    initCardTilt();

});

/*==========================================================
    NAVBAR
==========================================================*/

function initNavbar(){

    const header = document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/*==========================================================
    COUNTERS
==========================================================*/

function initCounters(){

    const counters = document.querySelectorAll(

        ".hero-stat strong"

    );

    if(!counters.length) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const element = entry.target;

                const text = element.textContent.trim();

                const value = parseInt(text);

                if(isNaN(value)){

                    observer.unobserve(element);

                    return;

                }

                animateCounter(

                    element,

                    value

                );

                observer.unobserve(element);

            });

        },

        {

            threshold:.6

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

function animateCounter(

    element,

    target

){

    let current = 0;

    const duration = 1800;

    const increment =

        target / (duration / 16);

    function update(){

        current += increment;

        if(current >= target){

            element.textContent =

                target;

            return;

        }

        element.textContent =

            Math.floor(current);

        requestAnimationFrame(update);

    }

    update();

}

/*==========================================================
    CARD TILT
==========================================================*/

function initCardTilt(){

    const cards = document.querySelectorAll(

        ".solution-card"

    );

    if(!cards.length) return;

    cards.forEach(card=>{

        card.addEventListener("mousemove",(event)=>{

            const rect =

                card.getBoundingClientRect();

            const x =

                event.clientX - rect.left;

            const y =

                event.clientY - rect.top;

            const rotateY =

                ((x / rect.width) - .5) * 8;

            const rotateX =

                ((y / rect.height) - .5) * -8;

            card.style.transform =

                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform = "";

        });

    });

}

/*==========================================================
    HEADER SHRINK
==========================================================*/

(function initHeaderShrink(){

    const header = document.querySelector(".header");

    if(!header) return;

    function update(){

        if(window.scrollY > 120){

            header.classList.add("shrink");

        }else{

            header.classList.remove("shrink");

        }

    }

    update();

    window.addEventListener("scroll", update);

})();

/*==========================================================
    SCROLL PROGRESS
==========================================================*/

(function initScrollProgress(){

    const progress = document.createElement("div");

    progress.className = "scroll-progress";

    document.body.appendChild(progress);

    function update(){

        const scrollTop = window.scrollY;

        const height =

            document.documentElement.scrollHeight -

            window.innerHeight;

        const value =

            (scrollTop / height) * 100;

        progress.style.width = value + "%";

    }

    update();

    window.addEventListener("scroll", update);

})();

/*==========================================================
    LAZY IMAGES
==========================================================*/

(function initLazyImages(){

    const images = document.querySelectorAll("img");

    if(!images.length) return;

    images.forEach(image=>{

        image.loading = "lazy";

        image.decoding = "async";

    });

})();

/*==========================================================
    PERFORMANCE
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        document.body.classList.add("loaded");

    },

    { once:true }

);

/*==========================================================
    REDUCED MOTION
==========================================================*/

(function initReducedMotion(){

    const reduceMotion = window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );

    if(!reduceMotion.matches) return;

    document.documentElement.classList.add(

        "reduce-motion"

    );

})();

/*==========================================================
    PASSIVE EVENTS
==========================================================*/

window.addEventListener(

    "touchstart",

    ()=>{},

    {

        passive:true

    }

);

window.addEventListener(

    "wheel",

    ()=>{},

    {

        passive:true

    }

);

/*==========================================================
    SAFE INIT
==========================================================*/

function safeExecute(callback){

    try{

        callback();

    }catch(error){

        console.error(

            "[APP ERROR]",

            error

        );

    }

}

/*==========================================================
    RESIZE
==========================================================*/

window.addEventListener(

    "resize",

    debounce(()=>{

        document.documentElement.style.setProperty(

            "--window-width",

            `${window.innerWidth}px`

        );

    },150)

);

/*==========================================================
    LOAD
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        document.body.classList.add(

            "page-loaded"

        );

    },

    {

        once:true

    }

);

/*==========================================================
    INITIALIZE
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        [

            initNavbar,

            initMobileMenu,

            initSmoothScroll,

            initReveal,

            initHeroParallax,

            initCounters,

            initCardTilt

        ].forEach(fn=>{

            safeExecute(fn);

        });

    }

);

/*==========================================================
    ACTIVE MENU
==========================================================*/

(function(){

    const sections = document.querySelectorAll("section[id]");

    const links = document.querySelectorAll(

        ".nav-links a"

    );

    if(!sections.length) return;

    function updateActive(){

        let current = "";

        sections.forEach(section=>{

            const top =

                section.offsetTop - 140;

            const bottom =

                top + section.offsetHeight;

            if(

                window.scrollY >= top &&

                window.scrollY < bottom

            ){

                current = section.id;

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href") ===

                "#" + current

            ){

                link.classList.add("active");

            }

        });

    }

    updateActive();

    window.addEventListener(

        "scroll",

        updateActive,

        {

            passive:true

        }

    );

})();