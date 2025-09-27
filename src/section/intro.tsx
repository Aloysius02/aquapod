import gsap from 'gsap';
import {
  useGSAP
} from '@gsap/react';
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  navLinks
} from "@/constant"
import {
  useRef
} from "react"

export default function Intro() {
  const container = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        let opacity = gsap.utils.mapRange(0, 0.6, 1, 0, progress);

        gsap.set(".hero-container", {
          opacity: gsap.utils.clamp(0, 1, opacity)
        });
      }
    })

    gsap.to(".welcome-text", {
      backgroundPosition: "0% 0%",
      scrollTrigger: {
        trigger: container.current,
        start: "top center-=100px",
        end: "top top",
        scrub: 1,
      }
    })

  }, [])


  return (
    <section ref={container} id={navLinks[1]?.id} className="bg-gradient-to-b from-zinc-900/[0] to-zinc-900 relative">

      <div className="container padding-y padding-x">
        <h2 className="text-2xl sm:text-3xl md:text-5xl w-full w-full sm:max-w-5xl welcome-text mb-12 sm:mb-16 md:mb-20">Welcome to a world of serene ocean bliss with AquaPods®,
          where you will
          discover tranquil water atmospheres from floating retreats, nestled in
          breathtaking seascapes. Immerse yourself in nature’s embrace, experiencing
          luxury and relaxation from the heart of the open water.</h2>

        <div className="flex flex-col sm:flex-row gap-8 sm:items-center
          md:gap-24 w-full sm:justify-between">
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="w-[150px] h-[100px] md:w-[200px] lg:w-[220px] md:h-[140px] rounded-[4rem] overflow-hidden">
              <img src="images/intro1.jpg" alt="aquapod" />
          </div>
          <div className="w-[150px] h-[100px] md:w-[200px] lg:w-[220px] md:h-[140px] rounded-[4rem] overflow-hidden">
            <img src="images/intro2.jpg" alt="aquapod" />
        </div>
      </div>
      <p className="text-sp size-md w-full sm:max-w-[450px] text-white">
        A place where you can be with yourself and your loved ones.
        A place where you can experience unforgettable ocean moments.
      </p>
    </div>
  </div>
</section>
)
}