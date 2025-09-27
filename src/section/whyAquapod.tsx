import {
  useMediaQuery
} from "react-responsive";
import gsap from "gsap";
import {
  useGSAP
} from "@gsap/react";
import {
  useRef,
  useState,
  useEffect
} from "react";
import Marquee from "@/components/animata/marquee";
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  useScrollDirection
} from "react-use-scroll-direction";
import {
  whyAquapodData
} from "@/constant";
import {
  cn
} from "@/lib/utils";
import {
  SplitText
} from "gsap/SplitText";
import {
  navLinks
} from "@/constant"


export default function WhyAquapod() {
  const isMobile = useMediaQuery( {
    maxWidth: 640
  });

  const [isReverse,
    setIsReverse] = useState(false);

  const {
    isScrollingUp,
    isScrollingDown
  } = useScrollDirection();

  const scrollUpRef = useRef(isScrollingUp);
  const scrollDownRef = useRef(isScrollingDown);

  useEffect(() => {
    scrollUpRef.current = isScrollingUp;
    scrollDownRef.current = isScrollingDown;
  }, [isScrollingUp, isScrollingDown]);

  const container = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom-=10%",
        end: "top top+=10%",
        onUpdate: () => {
          if (scrollUpRef.current) {
            setIsReverse(true);
          } else if (scrollDownRef.current) {
            setIsReverse(false);
          }
        }
      });

      if (!isMobile) {
        gsap.to(".heading",
          {
            y: "9rem",
            scrollTrigger: {
              trigger: container.current,
              start: "top center",
              end: "top top",
              scrub: 1,
            }
          })
      }
    },
    {
      scope: container
    }
  );

  return (
    <section
      id={navLinks[3]?.id}
      ref={container}
      className="min-h-[100dvh] relative"
      >
      <div className="w-screen overflow-hidden">
        {/*heading*/}
        <div className="w-full heading">
          <div className="padding-x">
            <p className="sub text-sm">
              Want to learn more about
              <br />
            the benefit of AquaPods®?
          </p>
        </div>

        {/*Marquee*/}
        <div className="mt-4">
          <Marquee applyMask={false} reverse={isReverse}>
            <h2 className="text-marquee font-medium ">
              Why Aquapods®?
            </h2>
          </Marquee>
        </div>
      </div>

      {/*body*/}
      {isMobile ? <Mobile />: <DeskTop />}
    </div>
  </section>
);
}


function Mobile() {
  return (
    <div className="flex flex-col gap-6 mt-8 padding-x">
      {whyAquapodData.map((data, i)=> (
        <div className="w-full rounded-[1.5rem] secondary-bg flex flex-col gap-4">

          {/*text content*/}
          <div className="w-full flex flex-col p-4 gap-28">

            {/*top*/}
            <h2 className="text-xl max-w-[220px] font-medium text-sp">{data?.title}</h2>

            {/*bottom*/}
            <div className="flex justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="index w-12 h-12 border-2 border-sp flex justify-center text-[1.2rem] items-center rounded-full border-dashed">
                  0{i+1}
                </span>
                <span className="w-12 h-12 border-2 border-muted-foreground flex justify-center text-[1.2rem] items-center rounded-full text-muted-foreground border-dashed">
                  0{whyAquapodData?.length}
                </span>
              </div>
              <p className="text-sm">
                {data?.description}
              </p>
            </div>
          </div>
          {/*image content*/}
          <div className="overflow-hidden h-[250px] rounded-[1.5rem]">
            <img src={data?.src}></img>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeskTop() {
  const container = useRef(null);

  useGSAP(
    () => {
      //initial state
      gsap.set([".card2",
        ".card3",
        ".card4"],
        {
          x: "102%"
        });
      gsap.set([".card3",
        ".card4"],
        {
          y: "100%"
        });

      gsap.set(".card2",
        {
          zIndex: 10
        })
      gsap.set(".card3",
        {
          zIndex: 8,
          scale: 0.8
        })
      gsap.set(".card4",
        {
          zIndex: 6,
          scale: 0.8
        })



      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * 2}px`,
          scrub: 1,
          pin: true,
        }
      });

      tl.to(".card1",
        {
          scale: 0.8,
          opacity: 0
        });
      tl.to(".card2",
        {
          x: 0,
        },
        "<");
      tl.to(".card2 div",
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)"
        },
        "<");
      tl.to(".card3",
        {
          y: 0,
          scale: 1,
          onComplete: () => {
            gsap.set(".card2",
              {
                zIndex: 8
              });
            gsap.set(".card3",
              {
                zIndex: 10
              });
          },
        },
        "<");



      let lastProgress = 0;
      function TextSwitchAnimation(index: number) {
        const data = whyAquapodData[index]

        function splitText(el: Element | null) {
          if (!el) return null;
          return SplitText.create(el, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });
        }

        const title = document.querySelector(".card3 .title");
        const desc = document.querySelector(".card3 .description");
        const cardIndex = document.querySelector(".card3 .card-index");
        const indexNumber = document.querySelector(".card3 .index");

        if (!title || !desc || !indexNumber || !cardIndex) return;

        let splitTitle = splitText(title);
        let splitDesc = splitText(desc);

        if (!splitTitle || !splitDesc) return;

        gsap.to(cardIndex, {
          opacity: 0,
          duration: 0.5
        })

        gsap.to([splitTitle.lines, splitDesc.lines], {
          y: -100,
          stagger: 0.08,
          onComplete: () => {
            splitTitle.revert();
            splitDesc.revert();

            title.innerHTML = data?.title;
            desc.innerHTML = data?.description;
            indexNumber.innerHTML = `0${data?.id}`;

            const newSplitTitle = splitText(title);
            const newSplitDesc = splitText(desc);

            if (!newSplitTitle || !newSplitDesc) return;


            gsap.fromTo(
              [newSplitTitle.lines, newSplitDesc.lines],
              {
                y: 100
              },
              {
                y: 0, stagger: 0.08
              }
            );
            gsap.to(cardIndex, {
              opacity: 1,
              duration: 0.5
            })
          },
        });
      }




      tl.to(".card2",
        {
          scale: 0.8,
          opacity: 0
        });
      tl.to(".card3",
        {
          x: 0,
          onReverseComplete: () => {
            gsap.set(".card2",
              {
                zIndex: 10
              });
            gsap.set(".card3",
              {
                zIndex: 8
              });
          },
          onUpdate: function () {
            const current = this.progress();
            const forward = current > lastProgress;
            lastProgress = current;

            if (forward && current > 0 && current < 0.05) {
              // Forward entering
              TextSwitchAnimation(2);
            }


            if (!forward && current < 1 && current > 0.95) {
              // Reverse entering
              TextSwitchAnimation(1);
            }
          },
        },
        "<");
      tl.to(".card4",
        {
          y: 0,
          scale: 1,
        },
        "<")


    },
    {
      scope: container
    }
  );

  const cardClass =
  "absolute h-full w-[49.5%] secondary-bg rounded-[2.5rem] top-0 left-0 overflow-hidden";

  return (
    <div
      ref={container}
      className="whyCards w-full h-[100dvh] relative primary-bg mt-10 overflow-hidden"
      >
      {Array.from({
        length: 4
      }).map((_,
        i) => (
        <div key={i} className={cn("", cardClass, `card${i + 1}`)}>
          {/*card 1 and card 3*/}
          {(i === 0 || i === 2) && (
            <div className="w-full h-full p-4 md:p-8 flex justify-between flex-col">
              <p className="title text-3xl max-w-[350px] text-sp">
                {i === 0
                ? whyAquapodData[0]?.title: whyAquapodData[1]?.title}
              </p>
              <div className="flex justify-between items-center w-full gap-6">
                <div className="flex items-center gap-2 card-index">
                  <span className="index w-12 h-12 border-2 border-sp flex justify-center text-[1.2rem] items-center rounded-full border-dashed">
                    0
                    {i === 0
                    ? whyAquapodData[0]?.id: whyAquapodData[1]?.id}
                  </span>
                  <span className="w-12 h-12 border-2 border-muted-foreground flex justify-center text-[1.2rem] items-center rounded-full text-muted-foreground border-dashed">
                    0 {whyAquapodData?.length}
                  </span>
                </div>
                <p className="max-w-[250px] description">
                  {i === 0
                  ? whyAquapodData[0]?.description: whyAquapodData[1]?.description}
                </p>
              </div>
            </div>
          )}

          {/*card 2*/}
          {i === 1 && (
            <>
              <img src={whyAquapodData[1].src}></img>
              <div
                style={ {
                  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                  WebkitClipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                }}
                className="absolute inset-0">
                <img src={whyAquapodData[0].src}></img>
              </div>
            </>
          )
          }

          {/*card 4*/}
          {i === 3 && (
            <img src={whyAquapodData[2].src}></img>
          )
          }
        </div>
      ))}
    </div>
  );
}