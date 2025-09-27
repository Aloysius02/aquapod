import Marquee from "@/components/animata/marquee"
import {
  navLinks
} from "@/constant"
import Social from "@/components/social"


export default function Footer() {

  return (
    <section className="gradient-bg2 overflow-hidden">
      <div className="padding-y">

        {/*heading*/}
        <div className="container padding-x mb-6">
          <p className="size-sm">
            Interested in an amazing adventure?
            <br />
          Reserve one of our Aquapod®
        </p>
      </div>

      <Marquee applyMask={false}>
        <h2 className="text-marquee">
          Book Your Aquapod—
        </h2>
      </Marquee>


      <div className="container padding-x mt-10">
        <div className="flex flex-col-reverse sm:flex-row w-full sm:justify-between sm:items-start gap-8">
          <div className="flex flex-col gap-8">
            <p className="text-sp max-w-[400px]">
              This website is just the concept
              work done by Aloysius to showcase
              my capabilities.
            </p>
            <Social />
          </div>
          <ul className="flex flex-col relative">
            {navLinks.map((item, i)=>(
              <li key={i} className="text-xl hover:text-sp transition-all duration-300">
                <a href={item?.link}>{item?.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*seperator*/}
      <div className="w-full h-[1px] bg-sp my-8"></div>

      <footer className="container padding-x overflow-hidden flex flex-col">
        <div className="text-sp size-sm flex flex-col sm:flex-row w-full sm:justify-between sm:items-center">
          <p>
            Website made by Aloysius
          </p>
          <p>
            All right reserved © 2025
          </p>
        </div>
      </footer>
    </div>
  </section>
)
}