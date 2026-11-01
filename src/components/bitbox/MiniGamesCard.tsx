import React from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface GameCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  borderColor?: string;
  glowStyles?: string;
  ambientColor?: string;
}

export default function MiniGamesGrid({ games }: { games: GameCardProps[] }) {
  return (
    <div className="w-full max-w-none px-3 md:px-10 lg:px-16 py-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 auto-rows-[230px] md:auto-rows-[260px]">
        {games.map((game, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-[40px] 
            border bg-[rgba(15,15,15,0.4)] backdrop-blur-[25px] saturate-150 
            transition-all duration-500 hover:scale-[1.02]
            ${game.borderColor || "border-white/10"} 
            ${game.glowStyles || "hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]"}`}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${game.ambientColor || 'rgba(255,255,255,0.05)'}, transparent)`
              }}
            />

            <div className="absolute inset-0 pointer-events-none">
              {game.image && (
                <img
                  src={game.image}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px] 
                  grayscale transition-all duration-700 ease-in-out 
                  group-hover:opacity-60 group-hover:blur-0 
                  group-hover:scale-110 group-hover:grayscale-0
                  [mask-image:radial-gradient(circle_at_center,black_0%,transparent_80%)]"
                />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,10,10,0.8)_100%)]" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              <div className="flex flex-col gap-3">
                {game.icon && (
                  <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                    <game.icon className="w-6 h-6 text-white/80" />
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-[#a1a1a1] max-w-[250px] leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/50 
              group-hover:text-white transition-colors cursor-pointer">
                <span>Play Now</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}