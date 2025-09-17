import {
  useRef
} from 'react';
//import gsap from 'gsap';
import {
  useGSAP
} from '@gsap/react';
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";

export default function Hero() {
  const container = useRef(null);


  const frameCount = 126;
  const currentFrame = (index: number) =>`frames/frame_${(index + 1).toString().padStart(4, "0")}.png`;


  const canvasRef = useRef < HTMLCanvasElement | null > (null);
  const imagesRef = useRef < HTMLImageElement[] > ([]);
  const videoFrames = useRef( {
    frame: 0
  });
  const failedImages = useRef < Set < string>>(new Set());

  useGSAP(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

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


    // reload frames
    let imagesToLoad = frameCount;
    function onLoad () {
      imagesToLoad--;
      if (!imagesToLoad) {
        render();
        setupScrollTrigger();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = () => {
        failedImages.current.add(img.src);
        console.log("failed to load")
        onLoad();
      };
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }


    // raw function
    function render() {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      context?.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = imagesRef.current[videoFrames.current.frame];
      if (
        !img ||
        !img.complete ||
        img.naturalWidth <= 0 ||
        failedImages.current.has(img.src)
      ) {
        console.log("failed images")
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

      context?.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };


    // crollTrigger setup
    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: `+=${window.innerHeight * 7}`,
        markers: true,
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

    window.addEventListener("resize", () => {
      setCanvasSize();
      render();
      //ScrollTrigger.refresh();
    });


    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  },
    {
      scope: container
    });

  return (
    <section id="hero" ref={container} className="w-screen h-[100svh]  relative">
      <div className="absolute w-full h-full bg-red-700">
        <canvas ref={canvasRef} className="w-full h-full bg-blue-500"></canvas>
      </div>
      <div className="container relative">
        Micheal
        <img src="frames/frame_0001.png" />
    </div>
  </section>
);
}