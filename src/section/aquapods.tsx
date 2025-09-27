import Marquee from "@/components/animata/marquee"
import {
  Aquapods
} from "@/constant"
import {
  cn
} from "@/lib/utils"
import gsap from "gsap";
import {
  useGSAP
} from "@gsap/react";
import {
  useRef,
  useState,
} from "react";
import {
  IoMdAdd
} from "react-icons/io";
import {
  SplitText
} from "gsap/SplitText";
import {
  useMediaQuery
} from "react-responsive";


export default function Aquapod() {
  const isMobile = useMediaQuery( {
    maxWidth: 640
  });
  const [Details,
    setDetails] = useState(Aquapods[0])

  const container = useRef(null)

  const {
    contextSafe
  } = useGSAP(()=> {

      //initial state
      setInitialState()


      //animation
      function cardContentReveal(id: string, reveal: boolean) {
        const card = document.querySelector(id)
        if (!card) return

        const title = card.querySelectorAll(".title .char")
        const desc = card.querySelectorAll(".description .line")
        const button = card.querySelector(".card-btn")
        const progress = card.querySelector(".progress")

        const tl = gsap.timeline()

        const ease = "power3.out"
        tl.to(title, {
          y: reveal ? 0: 50,
          duration: 0.5,
          stagger: 0.04,
          ease
        })
        tl.to(desc, {
          y: reveal ? 0: 50,
          duration: 0.5,
          stagger: 0.06,
          ease,
        }, "<+=0.06")
        tl.to(button, {
          opacity: reveal ? 1: 0,
          duration: 0.5,
          ease
        }, "<")
        tl.to(progress, {
          opacity: reveal ? 1: 0,
          duration: 1,
          ease
        }, "<")
      }


      function contentAnimationProgress(progress: number, id: string) {
        if (progress > 0.7 && progress < 0.8) {
          cardContentReveal(id, false)
        }

        if (progress > 0.8 && progress < 0.9) {
          cardContentReveal(id, true)
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
        }
      })



      tl.from("#classic", {
        scale: 0.5,
        onUpdate: function() {
          const progress = this.progress()
          contentAnimationProgress(progress, "#classic")

          gsap.to(".progress span", {
            width: progress > 0.9 ? "33%": 0
          })
        }
      });
      tl.to(".marquee",
        {
          opacity: 0
        });


      tl.to("#deck",
        {
          y: 0,
          onUpdate: function() {
            const progress = this.progress()
            contentAnimationProgress(progress, "#deck")

            gsap.to(".progress span", {
              width: progress > 0.9 ? "66%": "33%"
            })
          }
        });
      tl.to("#classic",
        {
          scale: 0.9,
          opacity: 0.5
        },
        "<+=0.05");
      tl.to("#reef",
        {
          y: "120dvh"
        },
        "<");


      tl.to("#reef",
        {
          y: 0,
          onUpdate: function() {
            const progress = this.progress()
            contentAnimationProgress(progress, "#reef")

            gsap.to(".progress span", {
              width: progress > 0.9 ? "100%": "66%"
            })
          }
        });
      tl.to("#classic",
        {
          opacity: 0
        },
        "<");
      tl.to("#deck",
        {
          scale: 0.9,
          opacity: 0.6
        },
        "<+=0.05")

    },
    {
      scope: container
    })



  function setInitialState() {
    SplitText.create(".title",
      {
        type: "chars,lines",
        charsClass: "char",
        mask: "lines"
      })
    SplitText.create(".description",
      {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      })

    gsap.set(".title .char",
      {
        y: 50
      })
    gsap.set(".description .line",
      {
        y: 50
      })
    gsap.set(".card-btn",
      {
        opacity: 0
      })
    gsap.set(".progress",
      {
        opacity: 0
      })


    //details
    gsap.set(".details .detail-container",
      {
        height: 0,
        width: isMobile ? "100%": "100%"
      })
    gsap.set(".details .overlay",
      {
        opacity: 0
      })
    gsap.set(".details .opacityReveal",
      {
        opacity: 0
      })
    gsap.set(".details .price-container",
      {
        width: 0
      })
  }



  const openDetails = contextSafe(() => {
    const tl = gsap.timeline({
      onStart: ()=> {
        const detail = document.querySelector(".details");

        if (detail instanceof HTMLElement) {
          detail.style.display = "block";
        }
      }
    });

    tl.to(".details .overlay",
      {
        opacity: 1
      });
    tl.to(".details .detail-container",
      {
        height: "100dvh",
        width: "100%"
      },
      "<+=0.08");
    tl.to(".details .price-container",
      {
        width: "100%"
      });
    tl.to(".details .opacityReveal",
      {
        opacity: 1
      })
  });

  const closeDetails = contextSafe(() => {
    const tl = gsap.timeline({
      onComplete: ()=> {
        const detail = document.querySelector(".details");

        if (detail instanceof HTMLElement) {
          detail.style.display = "none";
        }
      }
    })

    tl.to(".details .opacityReveal",
      {
        opacity: 0
      })
    tl.to(".details .price-container",
      {
        width: 0
      })
    tl.to(".details .detail-container",
      {
        height: 0,
        width: isMobile ? "100%": "100%"
      })
    tl.to(".details .overlay",
      {
        opacity: 0
      })
  });


  return (
    <div ref={container}>
      <section>
        {/*cards*/}
        <div className="h-[100dvh] relative w-screen">
          {/*Marquee*/}
          <div className="marquee w-full absolute top-1/2 left-1/2 -translate-x-1/2
            -translate-y-1/2 overflow-hidden">
            <Marquee applyMask={false}>
              <h2 className="text-marquee font-medium ">
                Aquapods<sub>®</sub>
              </h2>
            </Marquee>
          </div>

          <div className="relative">
            {Aquapods.map((card,
              i)=>(
              <div
                id={card?.id}
                key={card?.id}
                style={ {
                  transform: `translateY(calc(120dvh * ${i}))`
                }}
                className={cn("w-full h-[100dvh] rounded-[2rem] md:rounded-[4rem] overflow-hidden absolute",
                )}>
                <img src={card?.src} />

              {/*content*/}
              <div className="absolute inset-0">
                <div className="px-4 md:px-10">
                  <h3 className="title text-shadow absolute top-[2rem] sm:top-1/2 sm:-translate-y-1/2 font-medium text-2xl sm:text-3xl md:text-5xl">{card?.title}</h3>
                </div>

                <div className="absolute bottom-[8rem] flex flex-col sm:flex-row  sm:justify-between w-full  sm:items-center gap-6 px-4 md:px-10">
                  {/*left/top*/}
                  <div className="flex sm:items-center gap-4 md:gap-8 flex-col sm:flex-row">
                    <button
                      onClick={()=> {
                        setDetails(card)
                        openDetails()
                      }}
                      className="card-btn rounded-full w-14 h-14 bg-sp flex justify-center items-center text-black shrink-0">
                      <IoMdAdd size={28} />
                    </button>
                    <p className="description text-shadow text-sm max-w-[300px]  md:max-w-[350px] text-left">
                      {card?.description}
                    </p>
                  </div>

                  {/*right/bottom*/}
                  <div className="progress w-[250px] md:w-[300px]  h-[2px] md:h-[3px]  bg-white/[0.3] rounded-full relative overflow-hidden">
                    <span className="absolute left-0 top-0 h-full w-0 bg-sp"></span>
                  </div>
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </section>


    {/*details*/}
    <div className="details fixed top-0 left-0 w-screen h-[100dvh] z-20 hidden">
      <div className="overlay absolute inset-0 bg-black/[0.8]">

        {/*close button desktop*/}
        <button onClick={closeDetails} className="rounded-full w-14 h-14 secondary-bg text-white flex justify-center items-center text-black right-4 top-4 absolute  max-sm:hidden z-50 rotate-45">
          <IoMdAdd size={28} />
        </button>


        <div className="detail-container absolute left-0 bottom-0 w-full h-[100dvh] overflow-hidden">

          <div className="hide-scrollbar absolute max-sm:inset-2 sm:w-[350px] sm:bottom-4 sm:top-4 sm:left-4 secondary-bg rounded-2xl">

            <div className="w-full h-full p-6 sm:flex justify-between flex-col overflow-auto hide-scrollbar">
              {/*close button*/}
              <button onClick={closeDetails} className="opacityReveal rounded-full w-14 h-14 primary-bg flex justify-center items-center text-white fixed rotate-[225deg] sm:hidden">
                <IoMdAdd size={28} />
              </button>

              {/*top*/}
              <div className="opacityReveal w-full max-sm:mt-16">
                {/*first part*/}
                <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="w-full max-sm:flex justify-between items-center">
                    <h3 className="text-2xl sm:text-4xl  font-medium">Details</h3>
                    <p className="text-sm">
                      ({Details?.title})
                    </p>
                  </div>
                  <div className="h-[150px] sm:w-[250px] sm:h-[70px]  overflow-hidden rounded-3xl">
                    <img src={Details?.src} />
                </div>
              </div>

              {/*second part*/}
              <div className="mt-10">
                <p className="text-sm text-sp mb-6">
                  {Details?.description}
                </p>

                <div>
                  {Details?.detail.map((item,
                    i)=>(
                    <div key={i} className={cn("w-full py-3",
                      Details?.detail.length - 1 !== i ? "border-b-[1px] border-white/[0.3]": ""
                    )}>
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key} className="flex justify-between w-full text-sm">
                          <p>
                            {key}
                          </p>
                          <p className="text-right">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*bottom*/}
            <div className="price-container w-full rounded-full h-14 primary-bg max-sm:mt-8 shrink-0">
              <div className="flex justify-between items-center px-4 text-sm w-full h-full">
                <p className="opacityReveal text-muted-foreground">
                  Cost
                </p>
                <p className="opacityReveal">
                  {Details.price}USD / <span className="text-muted-foreground">Night</span>
                </p>
              </div>
            </div>
            <div className="h-6 w-full sm:hidden"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
)
}