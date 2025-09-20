import {
  useEffect,
  useRef
} from "react"
import gsap from "gsap"
import {
  ReactLenis,
  type LenisRef
} from "lenis/react"
import {
  Hero,
  Intro,
  Discover
} from "@/section"
import {
  CustomEase
} from "gsap/CustomEase";
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  ScrollToPlugin
} from "gsap/ScrollToPlugin";
import {
  SplitText
} from "gsap/SplitText";
import {
  useGSAP
} from '@gsap/react';

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  CustomEase
);


function App() {
  const lenisRef = useRef < LenisRef > (null)

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const lenis = lenisRef.current?.lenis
    lenis?.on("scroll", ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis?.off("scroll", ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis root options={ { autoRaf: false }} ref={lenisRef}>
      <Hero />
      <Intro />
      <Discover />
    </ReactLenis>
  )
}

export default App