import {
  useState,
  useRef
} from "react";
import {
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";
import gsap from "gsap";
import {
  SplitText
} from "gsap/SplitText";
import {
  useGSAP
} from "@gsap/react";

import {
  testimony
} from "@/constant";
import {
  navLinks
} from "@/constant"

export default function Feedback() {
  const [index,
    setIndex] = useState(0);
  const container = useRef(null);

  const {
    contextSafe
  } = useGSAP( {}, {
      scope: container
    });

  const TestimonyAnimation = contextSafe((isNext: boolean) => {
    const splitQuote = new SplitText(".quote", {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    const tl = gsap.timeline({
      overwrite: "auto",
      onComplete: () => {
        if (isNext) {
          setIndex((prev) => (prev + 1) % 3);
        } else {
          setIndex((prev) => (prev - 1 + 3) % 3);
        }

        // delay to allow DOM update
        setTimeout(() => {
          enterAnimation(splitQuote);
        }, 500);
      },
    });

    // exit animation
    tl.to(splitQuote.lines,
      {
        y: -100,
        stagger: 0.04,
        duration: 1,
        ease: "power2.out",
      });
    tl.to(
      ".avatar",
      {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
    tl.to(
      [".name",
        ".location"],
      {
        x: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
  });

  // --- Enter animation ---
  function enterAnimation(prevSplit: SplitText) {
    prevSplit.revert();

    const quote = document.querySelector(".quote");
    if (!quote) return;

    quote.innerHTML = testimony[index]?.quote;

    const newsplitQuote = new SplitText(".quote", {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    const tl = gsap.timeline({
      overwrite: "auto"
    });

    tl.fromTo(
      newsplitQuote.lines,
      {
        y: 100
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 1,
        ease: "power2.out",
      }
    );
    tl.to(
      ".avatar",
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
    tl.to(
      [".name", ".location"],
      {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
  }

  // --- Navigation handlers ---
  const next = () => TestimonyAnimation(true);
  const prev = () => TestimonyAnimation(false);

  return (
    <section id={navLinks[5]?.id} ref={container} className="relative">
      <div className="container padding-x padding-y">
        {/* First part */}
        <p className="size-sm">
          What Guests Say About AquaPods®
        </p>

        {/* Second part */}
        <div className="mt-8 flex flex-col gap-10">
          <h2 className="quote text-2xl sm:text-3xl md:text-6xl md:max-w-[1000px] sm:max-w-[500px]">
            {testimony[0]?.quote}
          </h2>

          <div className="flex items-center gap-8">
            <div className="avatar w-16 h-16 rounded-full overflow-hidden">
              <img
              src={testimony[index]?.src}
              alt={testimony[index]?.name}
              />
          </div>

          <div className="text-sp">
            <p className="name">
              {testimony[index]?.name}
            </p>
            <p className="location">
              ({testimony[index]?.location})
            </p>
          </div>
        </div>
      </div>

      {/* Third part */}
      <div className="mt-12 flex justify-between w-full items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={prev}
            className="feedback-btn w-14 h-14 rounded-full border-2 border-white flex justify-center items-center text-2xl transition-all duration-300 hover:bg-sp hover:border-sp hover:text-black"
            >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="feedback-btn w-14 h-14 rounded-full border-2 border-white flex justify-center items-center text-2xl transition-all duration-300 hover:bg-sp hover:border-sp hover:text-black"
            >
            <FaArrowRight />
          </button>
        </div>

        <div className="w-full h-[2px] bg-white/[0.3] relative max-w-[400px]">
          <span
            style={ { width: `${33.33 * (index + 1)}%` }}
            className="absolute top-0 left-0 h-full bg-white/[0.8] transition-all duration-500"
            />
        </div>
      </div>
    </div>
  </section>
);
}