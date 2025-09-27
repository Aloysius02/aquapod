import Menu from "@/components/ui/menu"
import Marquee from "@/components/animata/marquee"
import {
  navLinks
} from "@/constant"
import Social from "@/components/social"
import {
  SplitText
} from "gsap/SplitText";
import gsap from "gsap";
import {
  useGSAP
} from "@gsap/react";
import {
  useRef,
  useState
} from "react";


export default function NavMenu() {
  const container = useRef(null)
  const [open,
    setOpen] = useState < boolean > (false)


  useGSAP(()=> {
    SplitText.create(".open", {
      type: "chars",
      charsClass: "char",
      mask: "chars"
    })
    SplitText.create(".close", {
      type: "chars",
      charsClass: "char",
      mask: "chars"
    })
    SplitText.create(".navlinks a", {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    })

    gsap.set(".close .char", {
      y: 50
    })
    gsap.set(".nav-img", {
      scale: 1.2
    })
    gsap.set(".menu-content", {
      opacity: 0
    })
    gsap.set(".navlinks a .line", {
      y: "100%"
    })
  }, {
    scope: container
  })


  useGSAP(()=> {
    const tl = gsap.timeline()
    tl.to(".open .char", {
      y: open ? 50: 0,
      duration: 1,
      stagger: 0.06,
      ease: "power2.out"
    })
    tl.to(".close .char", {
      y: open ? 0: 50,
      duration: 1,
      stagger: 0.06,
      ease: "power2.out"
    }, "<")


    const ease = "power1.out"
    if (open) {
      const tl = gsap.timeline({
        onStart: () => {
          const wrapper = document.querySelector < HTMLElement > (".wrapper");
          if (wrapper) {
            wrapper.style.display = "block";
          }
        }
      })
      tl.to(".overlay",
        {
          opacity: 0.6,
          duration: 0.5,
          ease
        })
      tl.to(".nav-container",
        {
          width: "100%",
          bottom: 0,
          duration: 0.5,
          ease
        })
      tl.to(".nav-container",
        {
          height: "100%",
          duration: 0.5,
          ease
        })
      tl.to(".menu-content",
        {
          opacity: 1,
          duration: 0.5,
          ease,
        })
      tl.to(".nav-img",
        {
          scale: 1,
          duration: 0.5,
          ease
        },
        "<")
      tl.to(".navlinks a .line",
        {
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out"
        },
        "<")

    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          const wrapper = document.querySelector < HTMLElement > (".wrapper");
          if (wrapper) {
            wrapper.style.display = "none";
          }
        }
      })



      tl.to(".navlinks a .line",
        {
          y: "100%",
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out"
        })
      tl.to(".menu-content",
        {
          opacity: 0,
          duration: 0.5,
          ease
        },
        "<")
      tl.to(".nav-img",
        {
          scale: 1.2,
          duration: 0.5,
          ease
        },
        "<")
      tl.to(".nav-container",
        {
          bottom: "1.5rem",
          height: "60px",
          duration: 0.5,
          ease
        })
      tl.to(".nav-container",
        {
          width: "0%",
          duration: 0.5,
          ease
        })
      tl.to(".overlay",
        {
          opacity: 0,
          duration: 0.5,
          ease
        })
    }
  },
    {
      scope: container,
      dependencies: [open]
    })

  const handleMenu = ()=> {
    setOpen((prevState) => !prevState)
  }


  return (
    <nav ref={container}>
      <div className="wrapper hidden fixed w-screen h-[100dvh] top-0 left-0 z-40">
        <div className="overlay absolute inset-0 bg-black opacity-0" />

        <div className="absolute inset-0">
          <div className="inset-2 absolute">
            <div className="nav-container w-[0%] h-[60px]  bottom-[1.5rem] transition-all duration-300 absolute secondary-bg rounded-[2rem] left-[50%] -translate-x-1/2 overflow-hidden">

              <div className="menu-content w-full h-full flex flex-col sm:flex-row sm:justify-between sm:items-center overflow-auto">
                {/*left*/}
                <div className="flex-1 sm:h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-4">
                  <ul className="flex flex-col gap-2 sm:gap-3">
                    {navLinks.map((item,
                      i)=>(
                      <li key={i} className="navlinks text-3xl sm:text-4xl md:text-6xl text-sp hover:text-white duration-300 transition-all">
                        <a onClick={handleMenu} href={item?.link}>
                          {item?.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-6 flex-col-reverse md:flex-row md:items-center">
                    <Social />
                  </div>

                </div>
                {/*right*/}
                <div className="sm:h-full h-[40%] sm:w-[40%] w-full rounded-[2rem] overflow-hidden relative">
                  <img className="nav-img" src="images/nav.jpg" />
                <div className="absolute top-1/2 w-full -translate-y-1/2">
                  <Marquee applyMask={false}>
                    <h2 className="text-5xl md:text-9xl font-medium ">
                      Aquapod®
                    </h2>
                  </Marquee>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    {/*menu*/}
    <div className="menu w-[150px] h-[60px] bg-white fixed left-[50%] -translate-x-1/2 bottom-[2rem] rounded-full p-2 flex items-center justify-between z-50">
      <div className="flex-1 h-full p-2 overflow-hidden relative flex justify-center items-center text-black text-xl">
        <p className="open absolute">
          Open
        </p>
        <p className="close absolute">
          Close
        </p>
      </div>
      <Menu onClick={handleMenu} open={open} className="shrink-0 w-12 h-12 rounded-full" />
    </div>
  </nav>
)
}