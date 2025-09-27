import {
  useRef
} from "react";
import {
  useMediaQuery
} from "react-responsive";
import gsap from "gsap";
import {
  useGSAP
} from "@gsap/react";
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  cn
} from "@/lib/utils";
import {
  SplitText
} from "gsap/SplitText";
import {
  navLinks
} from "@/constant"

export default function Hero() {
  const isMobile = useMediaQuery( {
    maxWidth: 768
  });

  const frameCount = 126;
  const currentFrame = (index: number) =>
  `frames/frame_${(index + 1).toString().padStart(4, "0")}.png`;

  const canvasRef = useRef < HTMLCanvasElement | null > (null);
  const imagesRef = useRef < HTMLImageElement[] > ([]);
  const videoFrames = useRef( {
    frame: 0
  });

  useGSAP(() => {
    //setInitialState
    setInitialState();


    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // setup canvas size
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
    function onLoad() {
      imagesToLoad--;
      if (!imagesToLoad) {
        introAnimation();
        render();
        setupScrollTrigger();
      }
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = () => {
        console.log("failed to load image");
        onLoad();
      };
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    // render function
    function render() {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      context?.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = imagesRef.current[videoFrames.current.frame];
      if (!img || !img.complete || img.naturalWidth <= 0) {
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
    }

    // srollTrigger setup
    function setupScrollTrigger() {
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `bottom bottom`,
        scrub: 1,
        onUpdate: self => {
          const progress = self.progress;

          const animationProgress = Math.min(progress / 0.9, 1);
          const targetFrame = Math.round(
            animationProgress * (frameCount - 1)
          );
          videoFrames.current.frame = targetFrame;
          render();

          let opacity = gsap.utils.mapRange(0, 0.5, 1, 0, progress);

          gsap.set(".intro-text", {
            opacity: gsap.utils.clamp(0, 1, opacity)
          });

          const ease = "power3.out"
          const threshold = 0.7;
          const tl = gsap.timeline()
          tl.to(".hero-title .char", {
            y: progress > threshold ? 0: "100%",
            duration: 1,
            ease,
            stagger: 0.06
          })
          .to(".hero-subtitle .line", {
            y: progress > threshold ? 0: "100%",
            duration: 1,
            ease,
            stagger: 0.06
          }, "<+=0.1")
          .to(".hero-desc .line", {
            y: progress > threshold ? 0: "100%",
            duration: 1,
            ease,
            stagger: 0.06
          }, "<+=0.1")

          //navbar
          if (progress > threshold) {
            gsap.to(".menu", {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease,
            });
          }
        }
      });
    }

    window.addEventListener("resize",
      () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
      });


    return () => {
      window.removeEventListener("resize",
        setCanvasSize);
    };
  },
    []);

  function setInitialState() {
    SplitText.create(".loaderText",
      {
        type: "chars",
        charsClass: "char",
        mask: "chars"
      });
    SplitText.create(".intro-text",
      {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });
    SplitText.create(".hero-title",
      {
        type: "chars,lines",
        mask: "lines",
        charsClass: "char"
      });
    SplitText.create(".hero-subtitle",
      {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });
    SplitText.create(".hero-desc",
      {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });

    gsap.set(".loaderText .char",
      {
        x: "100%"
      });
    gsap.set(".intro-text .line",
      {
        y: "100%"
      });
    gsap.set(".hero-title .char",
      {
        y: "100%",
      });
    gsap.set(".hero-subtitle .line",
      {
        y: "100%"
      });
    gsap.set(".hero-desc .line",
      {
        y: "100%"
      });

    //nav bar
    gsap.set(".menu",
      {
        scale: 0.6,
        opacity: 0
      });
  }

  function introAnimation() {
    const rect = document.querySelector < SVGRectElement > ("#mask-rect");

    if (!rect) return;

    const bbox = rect.getBBox();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const scaleX = viewportWidth / bbox.width;
    const scaleY = viewportHeight / bbox.height;

    const scaleFactor = Math.max(scaleX, scaleY);

    const tl = gsap.timeline();

    tl.to(".loaderText .char", {
      x: 0,
      duration: 1,
      delay: 1,
      stagger: 0.08,
      ease: "power2.out"
    })
    .to(".loader", {
      scaleX: 0.4,
      duration: 1,
      ease: "power3.out"
    })
    .to(".loader", {
      scaleX: 0.7,
      duration: 1,
      delay: 0.1,
      ease: "power3.out"
    })
    .to(".loader", {
      scaleX: 1,
      duration: 1,
      delay: 0.1,
      ease: "power3.out"
    })
    .to(".loader-container", {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(
      ["#mask-rect,.loader"],
      {
        transform: `translate(-50%, -50%) scale(${
        scaleFactor * 1.5
        })`,
        duration: 1,
        ease: "power3.out",
        onStart: () => {
          gsap.set(".loader", {
            transformOrigin: "center"
          });
        }
      },
      "<"
    )
    .to(
      ".canvas-container",
      {
        scale: 1
      },
      "<"
    )
    .to(".intro-text .line", {
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.06
    });
  }

  return (
    <section id={navLinks[0]?.id} className="hero w-screen h-[700vh]">
      <div className="hero-container w-full h-[100dvh] fixed top-0">

        <div
          className="masked relative w-full h-full"
          >
          {/*canva*/}
          <div className="canvas-container absolute w-full h-full scale-110">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              ></canvas>
          </div>

          {/*hero content*/}
          <div className="relative padding-x h-full container">
            <div className="absolute w-full  h-[100dvh]">
              <p className="intro-text text-shadow font-asap w-full italic text-sm
                max-w-[250px] md:max-w-[400px] md:text-xl absolute top-[50%]
                left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
                Step into serenity with ocean vistas and golden sunsets, where AquaPods® offer eco-luxury and deep relaxation. Recharge and reconnect with nature’s embrace.
              </p>
              <div className="mt-[3rem]">
                <h1 className="hero-title text-5xl sm:text-8xl lg:text-9xl
                  font-bold text-white sm:absolute top-[1rem] left-0
                  text-shadow mb-6">
                  Aquapods
                </h1>
                <div className=" flex flex-col gap-4 sm:flex-row sm:justify-between sm:absolute bottom-[1rem] w-full left-0  sm:items-center text-white">
                  <p className="hero-subtitle text-xl md:text-2xl  font-medium
                    max-w-[200px] md:max-w-[250px] text-shadow">
                    Drift Closer to Nature Find Your Peace
                  </p>
                  <p className="hero-desc text-sm text-shadow max-w-[300px] sm:max-w-[200px] md:w-[250px] flex">
                    Experience luxury on the waves, immerse in
                    nature with AquaPods<sub>®</sub>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*loader*/}
          <div className="loader-container secondary-bg  absolute inset-0  ">
            <div
              className={cn(
                "loader absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  bg-white  origin-left scale-x-0  ",
                isMobile
                ? "w-[200px] h-[80px]": "w-[280px] h-[120px]"
              )}
              />

            <p className="loaderText mix-blend-difference text-white  tracking-[0.4rem] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 absolute">
              AQUAPOD
            </p>
          </div>
        </div>

        <svg className="absolute top-0 left-0 w-screen h-[100dvh] ">
          <mask
            id="mask"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
            >
            <rect
              style={ {
                transform: "translate(-50%, -50%)",
                transformOrigin: "center",
                transformBox: "fill-box"
              }}
              id="mask-rect"
              className="fill-white"
              width={isMobile ? 200: 280}
              height={isMobile ? 70: 100}
              rx={isMobile ? 30: 40}
              x="50%"
              y="50%"
              />
          </mask>
        </svg>
      </div>
    </section>
  );
}