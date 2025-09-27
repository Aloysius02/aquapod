import {
  useMediaQuery
} from "react-responsive";
import gsap from "gsap";
import {
  useGSAP
} from "@gsap/react";
import {
  useRef
} from "react";
import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  Activities
} from "@/constant";
import {
  SplitText
} from "gsap/SplitText";
import {
  navLinks
} from "@/constant"

export default function Activity() {
  const isMobile = useMediaQuery( {
    maxWidth: 640
  });

  const container = useRef(null)

  useGSAP(()=> {

    //title
    SplitText.create(".title",
      {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });

    gsap.set(".title .line", {
      y: -120
    })

    gsap.to(".title .line", {
      y: 0,
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "top top+=50px",
        scrub: 1,
      }
    })

    //difficulty
    const tween = gsap.from(".difficulty", {
      width: 0,
      duration: 2,
      paused: true
    });

    ScrollTrigger.create({
      trigger: ".activities",
      start: "top center",
      end: "top top+=20%",
      onEnter: ()=> {
        tween.play()
      },
      onEnterBack: ()=> {
        tween.reverse()
      }
    })


    //slider
    const slide = document.querySelector < HTMLDivElement > (".slide");

    if (!slide) return

    const rect = slide.getBoundingClientRect();

    gsap.to(".slide", {
      x: `-${rect.width - window.innerWidth}px`,
      scrollTrigger: {
        trigger: ".slider",
        start: "top top",
        end: isMobile ? `+=${window.innerHeight * 2}px`: `+=${window.innerHeight * 3}px`,
        pin: true,
        scrub: 1,
      }
    })


  },
    {
      scope: container
    })

  return (
    <section id={navLinks[4]?.id} ref={container} className="pt-[3rem] sm:pt-[5rem] gradient-bg ">

      <div className="padding-y">
        {/*text content*/}
        <div className=" container padding-x">
          {/*heading*/}
          <p className="size-sm mb-6">
            Ready for an adventure?
          </p>
          <h1 className="title size-xl leading-none font-medium">Discover the Ocean Experiences</h1>

          {/*body*/}
          <div className="mt-16 flex flex-col md:flex-row-reverse w-full md:justify-between gap-16 md:gap-28 lg:gap-32 md:items-center">

            <p className="size-md text-sp flex-1">
              We want to make sure your stay is relaxing and rejuvenating. That’s why we offer a variety of experiences with different levels of immersion. Whether you seek gentle waves or deeper connections, there’s something for everyone to make your ocean escape truly memorable.
            </p>


            <div className="flex-1">
              <p className="size-sm mb-8 max-w-[200px] sm:max-w-[300px]">
                Offerred AquaPods® activities has different levels of difficulty
              </p>
              <div className="activities flex flex-col gap-8">
                {Activities.map((item, i)=>(
                  <div key={i} className="w-full flex flex-col gap-4">

                    {/*top*/}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-2xl text-sp">
                        {item?.difficulty}
                      </p>
                      <p className="text-sp text-sm">
                        {item?.duration} duration
                      </p>
                    </div>

                    {/*bottom*/}
                    <div className="w-full h-[2px] bg-white/[0.3] relative">
                      <span
                        style={ {
                          width: `${item?.percentage}`
                        }}
                        className="difficulty absolute top-0 left-0 h-full bg-white/[0.8]"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*slider*/}
        <div className="slider w-screen overflow-hidden max-sm:pt-[2rem] sm:h-[100dvh] mt-[4rem] sm:mt-[10rem]">

          <div className="slide flex items-center gap-2 sm:h-full w-[260vw] md:w-[240vw]">
            {Activities.map((item, i)=>(
              <div key={i} className="flex-1 sm:h-full rounded-3xl">

                {/*img*/}
                <div className="w-full rounded-3xl sm:rounded-[3rem] sm:h-full h-[250px] overflow-hidden relative">
                  <img src={item?.src}></img>
                  <div className="absolute inset-0 bg-black/[0.3]"></div>

                  {/*content*/}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between sm:p-8">

                    {/*top*/}
                    <div className="flex w-full justify-between items-start max-sm:justify-end">
                      <p className="text-3xl font-medium max-sm:hidden max-w-[300px]">
                        {item?.title}
                      </p>
                      <span
                        className="w-24 h-12 border-2 flex justify-center items-center rounded-full border-white ">
                        {item?.difficulty}
                      </span>
                    </div>


                    {/*bottom*/}
                    <div className="w-full flex justify-between items-end">
                      <p className="text-xl max-w-[400px] max-sm:hidden">
                        {item?.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="index w-12 h-12 border-2 border-sp flex justify-center text-[1.2rem] items-center rounded-full border-dashed">
                          0{i+1}
                        </span>
                        <span className="w-12 h-12 border-2 border-muted-foreground flex justify-center text-[1.2rem] items-center rounded-full text-muted-foreground border-dashed">
                          0{Activities?.length}
                        </span>
                      </div>
                    </div>



                  </div>
                </div>

                {/*mobile*/}
                <div className="sm:hidden mt-10 flex flex-col gap-4 px-2">
                  <h2 className="max-w-[250px] font-medium text-2xl">{item?.title}</h2>
                  <p className="text-sp w-[96%]">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}