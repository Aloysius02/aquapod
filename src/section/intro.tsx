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

          let opacity = gsap.utils.mapRange(0, 0.5, 1, 0, progress);

          gsap.set(".hero-container", {
            opacity: gsap.utils.clamp(0, 1, opacity)
          });
        }
      }
    })

  }, [])


  return (
    <section id="intro" className="bg-gradient-to-b from-zinc-900/[0] to-zinc-900 relative">

    </section>
  )
}