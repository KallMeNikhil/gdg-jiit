"use client";
import React from "react";

import { AwardsData } from "@/src/data/bitbox/awards";
import { LiveGroup } from "../ui/LiveGroup";

export default function BentoComponent() {
  return (
    <div className="w-full max-w-none px-0 py-6 md:py-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[230px] md:grid-rows-2">
        {AwardsData.map((award) => (
          <LiveGroup
            key={award.name}
            className={`relative overflow-hidden rounded-[32px] md:rounded-[40px]
            border bg-[rgba(15,15,15,0.4)] backdrop-blur-[25px] saturate-150 
            transition-all duration-500 hover:scale-[1.02] live:scale-[1.02]
            ${award.borderColor} ${award.glowStyles} ${award.className}
            ${award.name === "1st Prize" ? "md:row-span-2 md:h-full" : "md:h-[260px]"}
            `}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 group-live:opacity-100
              transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: `linear-gradient(${award.ambientColor}, transparent)` }}
            />

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <img
                src={award.img}
                alt={award.name}
                className="relative object-contain opacity-70 blur-[0px] grayscale-25 
                transition-all duration-700 ease-in-out 
                group-hover:opacity-100 group-hover:blur-0 
                group-hover:scale-110 group-hover:grayscale-0
                group-live:opacity-100 group-live:scale-110 group-live:grayscale-0
                mask-[radial-gradient(circle_at_center,black_0%,transparent_80%)]
                w-[75%] md:w-[85%]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,10,10,0.8)_100%)]" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
              <div className="flex flex-col gap-3">
                <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                  {award.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                    {award.name}
                  </h3>
                  <p className="text-sm text-[#a1a1a1] max-w-50 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center justify-center mt-6">
                <div className={`text-2xl md:text-4xl font-extrabold ${award.amountColor} tracking-tighter drop-shadow-lg`}>
                  {award.amount}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent pointer-events-none" />
          </LiveGroup>
        ))}
      </div>
    </div>
  );
}