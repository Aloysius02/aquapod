import {
  useRef,
} from 'react';
import {
  useMediaQuery
} from "react-responsive"
import gsap from 'gsap';
import {
  useGSAP
} from '@gsap/react';
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  cn
} from "@/lib/utils"
import {
  SplitText
} from "gsap/SplitText";

export default function Intro() {

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#intro",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;

          let opacity = gsap.utils.mapRange(0, 0.4, 1, 0, progress);

          gsap.set(".hero-container", {
            opacity: gsap.utils.clamp(0, 1, opacity)
          });
        }
      }
    })

    gsap.to(".welcome-text", {
      backgroundPosition: "0% 0%",
      scrollTrigger: {
        trigger: "#intro",
        start: "top center",
        end: "top top",
        markers: true,
        scrub: 1
      }
    })

  }, [])


  return (
    <section id="intro" className="bg-gradient-to-b from-zinc-900/[0] to-zinc-900 relative">
      <div className="container padding-sp">

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full max-w-5xl
          font-medium welcome-text mb-12 sm:mb-16 md:mb-20">Welcome to a world of serene ocean bliss with AquaPods®,
          where you will
          discover tranquil water atmospheres from floating retreats, nestled in
          breathtaking seascapes. Immerse yourself in nature’s embrace, experiencing
          luxury and relaxation from the heart of the open water.</h2>

        <div className="flex flex-col sm:flex-row gap-8 sm:items-center md:gap-16">
          <div className="flex items-center gap-2">
            <div className="w-[150px] h-[100px] md:w-[200px] md:h-[140px] rounded-[4rem] overflow-hidden">
              <img src="images/intro1.jpg" alt="aquapod" />
          </div>
          <div className="w-[150px] h-[100px] md:w-[200px] md:h-[140px] rounded-[4rem] overflow-hidden">
            <img src="images/intro2.jpg" alt="aquapod" />
        </div>
      </div>
      <p className="color-sp  text-xl font-medium md:text-2xl">
        A place where you can be with yourself and your loved ones.
        A place where you can experience unforgettable ocean moments.
      </p>
    </div>
  </div>
</section>
)
}