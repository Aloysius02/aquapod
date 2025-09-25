import {
  cn
} from "@/lib/utils"
import gsap from 'gsap';
import {
  useRef
} from "react"
import {
  useGSAP
} from '@gsap/react';
import {
  SplitText
} from "gsap/SplitText";
import {
  navLinks
} from "@/constant"


export default function Discover() {
  const container = useRef(null)
  const choose = [
    "Sustainable",
    "Nature-Care",
    "Smart",
    "Privacy",
    "Spacious",
    "Panoramic"
  ]

  useGSAP(()=> {
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

  }, {
    scope: container
  })


  return (
    <section id={navLinks[2]?.id} ref={container}>
      <div className="container padding-sp">

        {/*top*/}
        <p className="size-sm mb-4">
          Discover Available AquaPods®
        </p>
        <h2 className="title size-lg mb-10 md:mb-12 font-medium">Choose the one you like best</h2>

        {/*down*/}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-10 md:gap-14
          lg:gap-18 sm:items-center">

          {/*left*/}
          <p className="text-sp size-md flex-1">
            You can choose one of three premium options. Each AquaPod provides
            the highest quality and meets your relaxation needs. Choose the one
            you like
          </p>

          {/*right*/}
          <div className="flex-1 ">
            <p className="size-sm w-[200px] mb-6">
              All AquaPods® are built on the same principles
            </p>
            <div className="flex gap-3 flex-wrap">
              {choose.map((item, i)=>(
                <div key={i} className={cn("px-4 py-3 rounded-full border-2 w-fit",
                  i % 2 === 0 ? "text-sp border-sp": "border-white")}>
                  <p className="text-[1.2rem]">
                    { item }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}