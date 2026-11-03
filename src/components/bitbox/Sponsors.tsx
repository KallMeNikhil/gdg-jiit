"use client";

import React from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/src/components/ui/glowing-effect";
import { AuroraText } from "@/src/components/ui/aurora-text";
import { LiveGroup } from "@/src/components/ui/LiveGroup";

const sponsors = {
  title: [
    { name: "Devfolio", logo: "/Sponsors/devfolio.png", link: "https://devfolio.co/" },
  ],
  poweredBy: [],
  coSponsors: [
    { name: ".xyz", logo: "/Sponsors/xyzz.webp", link: "https://gen.xyz/" },
    { name: "Interview Buddy", logo: "/Sponsors/InterviewBuddy.svg", link: "https://interviewbuddy.net/", bgWhite: true },
    { name: "RevUp", logo: "/Sponsors/RevupLifeSkills.jpg", link: "https://www.instagram.com/revuplifeskills/" },
    { name: "Lucr8 Ventures", logo: "/Sponsors/Lucr8Ventures.jpg", link: "https://www.instagram.com/envision_thapar/" },
    { name: "Hover Robotix", logo: "/Sponsors/HoverRobotix.png", link: "https://hoverrobotix.com/", bgWhite: true },
    { name: "Mentor X", logo: "/Sponsors/MentorXGlobal.png", link: "https://thementorx.com/" },
    { name: "Code Crafters", logo: "https://github.com/codecrafters-io.png", link: "https://codecrafters.io/", bgWhite: true },
    { name: "Sublime Text", logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ4ODg0NDQ0NDQ0NDQ8NDQ0NFREWFhURExUYHSggGBolHRYVITMhKDUsLi4uFys/ODMtOygtLjcBCgoKDg0OGxAQGzAmICUvKy0tLS8tLS0uLS0tNy0tLS0tLS43LS4tLS0tKy0tNi0tKy8vLS0tLS0tKy4tKy0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQUDBAcCBgj/xAA+EAACAQMABgQMBAQHAAAAAAAAAQIDBBEFBhIhMVEiMjORQUJSYWJxcnOBobGyBxOS0RQXY4IWIyQ0Q8HC/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQFAQIDBgf/xAA0EQEAAgECBAMIAQMDBQAAAAAAAQMCBBEFITJxMTPREkFRYYGRobEGweHwFSNCIiRDUlP/2gAMAwEAAhEDEQA/APuPxA13dg/4W12ZXUo5nN740Ivhu8MgOS6Q0pc3Utq4r1azzn/Mm5RXqjwXwA1AAAAAAAAAAAAAAAAAAAAAAAAAAAAZ7O9r0JbdCrUpS50qkoP444gdO1B19nXqQs76SdSfRo3GFHbl5E/BnzgdJA/Nml76V1dXFxLOa1WdTf4It9FfBYXwA1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE05yhKMovEotSjJcVJPKYHTP5pf0mBzEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYQlJ4inJ8optmuWUYxvlOzMRMztCzoav3c1n8tRWMr8ySi36kV9vF9JXO3tb9o3S8OH35Rvtt3Vkk02nuabTXJosYmJjeESY2naUGWAAAAAAIAAAAAAAAAAAAAAAAAAADJRozqPEIym+UU2aZ2YVxvnMR3bY4ZZztjG62tdWbmpvns0l6bzLuRVX8b01fLHfKfl6p1fDbs/HkubTVe3hh1HKq/P0I9yKi/jt+fLCIx/MrCrhdWPVO64oW1OmsU4RgvRikVNt9ls755TKwwqwwjbGNmU4t3Nb3tqvvan3M+jUeVj2j9PIW+Zl3lhOrmAAAAAAAAAAAAAAAAAAAAAAZre1q1XinCU/ZTa7zlbfXVG+eUQ6YVZ2dMbre01Wrz31JRpLl15dyKm/jtGHLCJyn7R/n0T6uF25dU7fldWmrVrTw5KVWXOb6P6UU9/G9TZyx2xj5eqwq4ZTh48+62pUoQWIRjFcopJFXnZnnO+U7p2OGOMbYxs9mjYAADA5re9tV97U+5n0ajyse0fp5C3zMu8sJ1cwAAAAAIAAAAAAAAAAAADZtbCvW7OnKS54xHvZHu1VNPmZRDrXRZZ04rm01Uqy31akYLlFbcv2Ki/j9WPKvGZ78oWFfCs5652XVpq9aUsPYdSXlVXtfLgVF/GNVby9r2Y+XL8+Kwq4dRh7t+60hFRWIpJcksIrMspyneZ3TYxiPBJhkAAAAAAYHNL3tqvvan3M+jUeVj2j9PIW+Zl3lhOrmAAAAAAAAAAAAAAZA3LTRVzW7OlLD8aS2Y97Il+u09PXlHbxlIr0ttnTiurTVKTw61VL0aay+9lRf8AyDGOVWO/zlYV8JmevL7Lm00Ha0cONJSkvGqPbfz3Ip7+Kaq7lOW0fCOX91hVoaK/DHfvzWSWOBXzO/il7AAAAAAAAAAAA5pe9tV97U+5n0Wjyse0fp5C3zMu8sJ1cwAAAAAIAAAAAAB9NovVdThGpXnKO0lL8uGMpednndZxz2M5wpjfb3z6LfT8M9rGMrJ+i+tNEW1HDhSjtLx5Lbn3so7+Iam7rznb4Ryj8LOrSU19OLeIaSAAAAAAAAAAAAAAAczve2q+9qfcz6LR5WPaP08hb5mXeWE6uYAAAAAAAAAAAIYHUKHUh7MfofOLevLvL2OHTD2aNgAAAAAAAAAAAAAGpd6Tt6PaVYprxU9qXciVRodRf0Yzt8fd93C3VVV9WSjv9bI4lGhBttNKc9yXnwXOm4BlvE3ZfSPVW3cVjbauPrL5RvLbe9t5b5s9PEbcoUoAAAAAACAAAAAAMEuoUOpD2Y/Q+cW9eXeXscOmHs0bAAAAAAAAAABX3emrWjlTqxcl4sOnL5cCdRw3U3c8cJ2+M8oRbdbTX45fbmpbvW7iqNL+6o/+kW9H8f8Afbl9I9Vfbxb/ANMfupbzTF1Wyp1ZKL8WHQj8uJcUcP01PThG/wAZ5q+3V3WdWX25NAmowAAAAAAAAAAAAAABDBLqNDqQ9mP0PnFvXl3l7HDph7NGwAAAAAAABo6Td2o/6ZUm8b9ttS+HgJmkjS7/APcTP08PVG1E37f7W31fG6VqX7bVz+alyxin8tzPW6PDRbb0ez/X881BqMtT/wCXf+n45KwsUQAAAAAAAAAAAACAAAAAAMEuo0OpD2Y/Q+cW9eXeXscOmHs0bAAAAAAAAACGsrD3rk96ETMTvBMb+Kuu9BWtbLdNRk/Gp9BlhRxXU1coy3j580S3Q02eMbdlJeaozWXQqqXo1FsvvRcUfyDCeVuO3zj0V1vCco8vL7qS70Xc0e0pTS8pLaj3ouKddp7ujOP1P2lX2aa2vqxaZKcAAAAAAAAAAAAAAACGCXUqHUh7MfofOLevLvL2OHTD2aNgAAAAAAAAAAAAAGjd6Itq3XpRz5UejLvRNo4jqaenL6TzRrdHTZ1YqK/1SwnK3qNtLKp1Fx8yki503H95jG7H6x6K27hW0b1z9J9XyzWNz3NbmuTPSRO/OFOAAAAAAAgAAAAAAH1Wi9aoxhGncQlmKUfzYYllLmuZ5vWcDyyznOmY5+6f6SudPxSMcYxsj6voLTSdvW7OrCT5ZxLuZR3aK+nrxlZ16mqzpybZFdwAAAAAAAAAAAAAADmN921b3tT7mfRaPKx7R+nkLfMy7ywHVzAAAAAAAAAAAAAAEwLC001dUepVk0vFn04/MhX8O013Vjz+MckmvWXV+GX35rqz1v4KvS/vpP8A8v8Acp7/AOP++rP6T6x6LCri3/0x+3ovLPTNrW6lWOfJl0JdzKe/h2pp6seXxjmsatZTZ05N8hJIAAAAAAAAAADA5hfdtW97U+5n0ajyse0fp5C3zMu8sJ1cwAAAAAIAAAAEgQBIAAAAgDesdI3VNpUalT2F00/gyHqNJprI3txjv4flIp1F2M7YTPbxfWaL0jeSx/EUIKPlqWxL9O88vrNLo8PJsmZ+HjH3Xmmt1OXmYx3/ALLeFeL8OPXuKucJhO3ZTVkAAAAAAAMDmF921b3tT7mfRqPKx7R+nkLfMy7ywnVzAAACAAAAAAAAAAABkoUZ1Hs04Sm+UYuRpZZhXG+cxHdthhlnO2Mbri01XuZ757NJek9qXciqu43p8OWO+XZPq4Zdl1clxa6rW8N9Ryqvk3sx7kVN3HNRnyw2x/M/n0WFfC6cermtaNrTprFOEYLlGKRV2X2WTvnlM907CvDCNsY2enA03bvDgZ3YFtR4NozynxGSNxJcUn8mazhHuZ3ZY3EX5vWaThJuypmrIAAADA5hfdtW97U+5n0ajyse0fp5C3zMu8sB1cwAAAAAAAAAAAQBe6L1ZrV4RqTkqUJb45WZuPPHgKfV8ZqoynDGPamPssdPw7O3GMpnaF/aasWlPfKLqv8AqPo/pRSX8a1NnTPsx8vVZV8Npw8Y37rilShBbMIxhFcIxioruRVZ2ZZzvlO8/NOxxxxjbGNnrBq2RgCHEzuIcTO48uI3YeXEzuPLgZ3HhwNt2EJNcG16jO8SPca8lx3/ACZrOEG7LG4i+OV6zScJZ3ZU0+Dz6jVlJgcvvu2re9qfcz6NR5WPaP08hb5mXeWE6uYAAAAIAAAAAABDBLqlv2cPYj9D5xb5mXeXscOmGQ0bAAAAAjAEYAhozuIcRuIcTO7Dy4mdx5cDO48OBndhiqyjTW1KSgvKlJRR0wwysn2cY3/LXLLHCN8p2Vl3rRSppqnL82eHjdiOfOyzo4JbZMTnHsx+UG7iVWMTGPOXxs5uTcnvcm5N823lnrccYxiIj3PPzMzO8oMsAAAAAAAAAAAAhgdUt+pD2I/Q+cW9eXeXscOmGQ0bAAAAAAAAEYAjAGG5uaVFZq1IU16cks+rmdqqLbZ2rxme0OdluFcb5zEKS81qt4ZVNSqvnjYj3veW9HA78+dkxj+ZQLOKVY9PNSXes1zUyoONJegsy72W9PBtNXzy/wCqfmr7eJXZ+HJUVaspvanKU5c5NyfzLTDDHCNsY2j5IOWU5TvlO7ybNQAAAgCQAEAAAAAAAMEuqW/Uh7EfofOLevLvL2OHTDIaNgAAAAAAGrd6QoUFmrVhDzN5k/UlvJFOkvun/bxmf8+LjZqK6+vKIUl5rfRjlUacqj8qXQj+5b0cAty525RHbnPor7OK4R0Rv+FHeayXdXKU1TjyprD7+JcUcI0tXu3n5q+3iF+fv27KmcnJuUm5SfGUm238WWWOMYxtEbQhzMzO8oMsAAAAAAAAAAAAAAAAABDA6rb9SHsR+h84t68u8vY4dMMho2AAADSvNLW1DtKsU/JT2p9y3kujQai7ownv4R+Ue3VU19WSivNcYrKoUnL0qj2V3IuKP4/l425fSPVX2cWj/hj91Jeafu6251HCL8Wn0F38S3o4XpqfDHefnzV9uuus8Z27KxvLy97fFve2WEcuUIgAAAAAAAAAAAAACAAAAAAAAIYJdWt+pD2I/Q+cW9eXeXscOmGRs0iN2ytvNOWlDKnVTkvEh05fIn0cM1N3Tjy+M8kW3W01+OX25qO81xbyqFHHpVXl/pX7lvR/H4jnbn9I9Z9FdZxaf+GP3Ud5pm6rZ26ssPxYdCPyLijh+np6MY+vNAs1d1nVk0CYjAAAAAAAAAAAAAAAAAAAAAAAAAAAfQf4uuFTjCMKcZRiouo8ybx4ccEUn+hUTZOWWUzE+7+6y/1S32YxiI7qq70ncVu0qzkvJzsx7kWVOjop6MYhDs1FtnVk0yS4pAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxpG0lb161CfWo1alKXncZNZ+QGuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJN7kst7klxb5AfffyvvPLQF9+Juo1S4qSv7KG3Ukl/EUY9abSxtx5vHFeYDktSEoScJxcZxeJRknGUXyafADyAAAAAAAAAAAAAAAAAAAAAAAAAAAAt7SXF7kvC2B0j8OdQ61StTvb2m6dGk1Uo0aixOrNb4ylHwRT37+IHYgAHKPxm/4fWBywAAAAAAAAAAAAAAAAAAAAAAAAAAAH334Rf7yfsgdsAAf/9k=", link: "https://www.sublimetext.com/", bgWhite: true },

  ],
  oldSponsors: [],
};

const SponsorCard = ({
  item,
  className = "",
  borderColor = "border-white/10",
  glowStyles = "",
  ambientColor = "rgba(255,255,255,0.05)",
}: {
  item: { name: string; logo: string; link: string; bgWhite?: boolean };
  className?: string;
  borderColor?: string;
  glowStyles?: string;
  ambientColor?: string;
}) => {
  return (
    <LiveGroup
      className={`relative block h-full w-full ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[28px] border bg-[rgba(15,15,15,0.4)] backdrop-blur-[25px] saturate-150 transition-all duration-500 hover:scale-[1.02] group-live:scale-[1.02] md:rounded-[40px] ${borderColor} ${glowStyles}`}
      >
        <GlowingEffect
          spread={50}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.2}
          borderWidth={2}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 group-live:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${ambientColor}, transparent)`,
          }}
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center p-4 md:p-8">
          {item.bgWhite ? (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-4 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-live:scale-105 md:p-6">
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 group-live:scale-110"
              />
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
    </LiveGroup>
  );
};

export default function Sponsors() {

  return (
    <div className="mb-[60px] mt-[100px] flex w-full flex-col items-center justify-center px-5 md:mb-[100px] md:mt-[150px] md:w-[80%] md:px-0">

      {sponsors.title.length > 0 && (
        <div className="w-full flex flex-col items-center mb-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Title <AuroraText>Sponsors</AuroraText>
            </h2>
            <div className="h-1 w-20 bg-white/20 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="w-full max-w-md md:max-w-lg">
            {sponsors.title.map((s, i) => (
              <SponsorCard
                key={i}
                item={s}
                className="h-52 md:h-72"
                borderColor="border-purple-500/20 hover:border-purple-500/50"
                glowStyles="hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]"
                ambientColor="rgba(168,85,247,0.1)"
              />
            ))}
          </div>
        </div>
      )}

      {sponsors.poweredBy.length > 0 && (
        <div className="w-full flex flex-col items-center mb-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Powered <span className="text-white/50">By</span>
            </h3>
            <div className="h-1 w-20 bg-white/20 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="w-full max-w-md md:max-w-lg">
            {sponsors.poweredBy.map((s, i) => (
              <SponsorCard
                key={i}
                item={s}
                className="h-56 md:h-64"
                borderColor="border-blue-500/20 hover:border-blue-500/50"
                glowStyles="hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]"
                ambientColor="rgba(59,130,246,0.1)"
              />
            ))}
          </div>
        </div>
      )}

      {sponsors.coSponsors.length > 0 && (
        <div className="w-full flex flex-col items-center mb-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Co <span className="text-white/50">Sponsors</span>
            </h3>
            <div className="h-1 w-20 bg-white/20 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="w-full max-w-none px-0 md:px-10 lg:px-16">
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
              {sponsors.coSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  item={s}
                  className="h-36 sm:h-48 md:h-56"
                  borderColor="border-orange-500/20 hover:border-orange-500/50"
                  glowStyles="hover:shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]"
                  ambientColor="rgba(249,115,22,0.1)"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {sponsors.oldSponsors.length > 0 && (
        <div className="w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-white/30 tracking-tighter">
              Past Sponsors
            </h3>
            <div className="h-1 w-20 bg-white/10 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="w-full max-w-none px-3 md:px-10 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {sponsors.oldSponsors.map((s, i) => (
                <SponsorCard
                  key={i}
                  item={s}
                  className="h-36 md:h-40 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  borderColor="border-white/5 hover:border-white/20"
                  glowStyles="hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.15)]"
                  ambientColor="rgba(255,255,255,0.05)"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}