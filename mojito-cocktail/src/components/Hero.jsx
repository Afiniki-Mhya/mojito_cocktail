import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
    const videoRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            stagger: 0.08,
            ease: "expo.out",
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            stagger: 0.06,
            delay: 1,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
        });

        // Animate leaves on scroll
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".left-leaf", { y: -200 }, 0)
            .to(".right-leaf", { y: 200 }, 0);

        const video = videoRef.current;
        if (video) {
            video.pause();

            const setupVideoScroll = () => {
                const duration =
                    isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
                video.currentTime = 0;

                gsap.to(video, {
                    currentTime: duration,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                });
            };

            if (video.readyState >= 1) {
                setupVideoScroll();
            } else {
                const onLoaded = () => {
                    setupVideoScroll();
                    video.removeEventListener("loadedmetadata", onLoaded);
                };
                video.addEventListener("loadedmetadata", onLoaded);
            }
        }
    }, []);

    return (
        <>
            {/* Fixed background video */}
            <div className="video fixed top-0 left-0 w-full h-full z-1 overflow-hidden ">
                <video
                    ref={videoRef}
                    src="/videos/input.mp4"
                    playsInline
                    preload="auto"
                    muted
                />
            </div>

            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img
                    src="/images/hero-left-leaf.png"
                    alt="leaf-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="leaf-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Crisp. Cool. Calming</p>
                            <p className="subtitle">
                                Sip the spirit <br /> of summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on the menu is a blend of premium ingredients,
                                creative flair and timeless recipes - designed to soothe your
                                senses
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Hero;
