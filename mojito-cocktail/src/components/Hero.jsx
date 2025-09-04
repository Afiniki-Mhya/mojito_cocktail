import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import {useMediaQuery} from "react-responsive";

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({maxWidth: 767});

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

    const StartValue = isMobile ? 'top 50%' : 'Center 60% ';
    const EndValue = isMobile ? '120% top' : 'bottom top ';



  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="leaf-leaf"
          className=" left-leaf "
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="leaf-leaf"
          className=" right-leaf "
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block  ">
              <p>Crisp. Cool. Calming</p>
              <p className="subtitle">
                Sip the spirit <br /> of summer{" "}
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
        <div className="video absolute inset-0">
      <video
        ref={videoRef}
        src="/videos/input.mp4"
        playsInline
        preload="auto"
        muted
        style={{ width: "100%", display: "block" }}
      />
        </div>
    </>
  );
};

export default Hero;
