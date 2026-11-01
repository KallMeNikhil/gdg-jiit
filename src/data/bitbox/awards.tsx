import { Award, Medal, Trophy } from "lucide-react";
import {JSX} from"react"



export type AwardsType={
    name:string
    description:string
    icon:JSX.Element
    className:string
    borderColor: string
    img:string
    glowStyles:string
    ambientColor:string
    amount:string
    amountColor:string
}

export const AwardsData:AwardsType[] = [
  {
    name: "1st Prize",
    description: "Cash Prize and Goodies!",
    icon: <Trophy className="w-6 h-6 text-[#d9a441]" />,
    img: "/1stTrophy.webp",
    className: "md:col-span-1 md:row-span-2",
    borderColor: "border border-[#d9a441]/20 hover:border-[#d9a441]/50",
    glowStyles: "group-hover:shadow-[0_0_50px_-12px_rgba(217,164,65,0.3)]",
    ambientColor: "from-[#d9a441]/10",
    amount: "₹15,000",
    amountColor: "text-[#d9a441]",
  },
  {
    name: "2nd Prize",
    description: "Cash Prize and Goodies!",
    icon: <Award className="w-6 h-6 text-[#C0C0C0]" />,
    img: "/2ndTrophy.webp",
    className: "md:col-span-1 md:row-span-1",
    borderColor: "border-[#e2e2e2]/20 hover:border-[#e2e2e2]/50",
    glowStyles: "group-hover:shadow-[0_0_50px_-12px_rgba(192,192,192,0.3)]",
    ambientColor: "from-[#C0C0C0]/10",
    amount: "₹10,000",
    amountColor: "text-[#C0C0C0]",
  },
  {
    name: "3rd Prize",
    description: "Cash Prize and Goodies!",
    icon: <Medal className="w-6 h-6 text-[#CD7F32]" />,
    img: "/3rdTrophy.webp",
    className: "md:col-span-1 md:row-span-1",
    borderColor: "border-[#cd7f32]/20 hover:border-[#cd7f32]/50",
    glowStyles: "group-hover:shadow-[0_0_50px_-12px_rgba(205,127,50,0.3)]",
    ambientColor: "from-[#CD7F32]/10",
    amount: "₹5,000",
    amountColor: "text-[#CD7F32]",
  },
];
