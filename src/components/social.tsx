import {
  CiGlobe,
  CiLinkedin,
  CiInstagram
} from "react-icons/ci";

import {
  FaBehance
} from "react-icons/fa";

export default function Social() {
  const social = [{
    icon: CiLinkedin,
  },
    {
      icon: CiInstagram,
    },
    {
      icon: CiGlobe,
    },
    {
      icon: FaBehance,
    },
  ]
  return (
    <div className="flex items-center gap-2">
      {social.map((item, i)=>(
        <button key={i} className="w-14 h-14 rounded-full flex justify-center items-center border-white border-[1px]">
          <item.icon size={26} />
        </button>
      ))}
    </div>
  )
}