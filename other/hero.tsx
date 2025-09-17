import {
  useRef
} from "react";
import {
  useGSAP
} from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  CustomEase
} from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const frameCount = 126;
const currentFrame = (index: number) =>
`/assets/frames6/frame_${(index + 1).toString().padStart(4, "0")}.png`;

export default function HeroSection() {
  const canvasRef = useRef < HTMLCanvasElement | null > (null);
  const imagesRef = useRef < HTMLImageElement[] > ([]);
  const videoFrames = useRef( {
    frame: 0
  });
  const failedImages = useRef < Set < string>>(new Set());

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // ✅ Lenis smooth scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ✅ Setup canvas size
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(pixelRatio, pixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    });

    // ✅ Preload frames
    let imagesToLoad = frameCount;
    const onLoad = () => {
      imagesToLoad--;
      if (imagesToLoad === 0) {
        render();
        setupScrollTrigger();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = () => {
        failedImages.current.add(img.src);
        onLoad();
      };
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    // ✅ Draw function
    const render = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = imagesRef.current[videoFrames.current.frame];
      if (
        !img ||
        !img.complete ||
        img.naturalWidth <= 0 ||
        failedImages.current.has(img.src)
      ) {
        return;
      }

      const imageAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth: number,
      drawHeight: number,
      drawX: number,
      drawY: number;

      if (imageAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // ✅ ScrollTrigger setup
    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: `+=${window.innerHeight * 7}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const animationProgress = Math.min(progress / 0.9, 1);
          const targetFrame = Math.round(animationProgress * (frameCount - 1));
          videoFrames.current.frame = targetFrame;
          render();
        },
      });
    };

    // ✅ Cleanup when component unmounts
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.kill();
    };
  },
    []); // only run once

  return (
    <section className="hero-section w-screen h-screen">
      <canvas ref={canvasRef} className="w-full h-full bg-black"></canvas>
    </section>
  );
}