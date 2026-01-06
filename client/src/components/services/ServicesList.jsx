import { motion } from "framer-motion";
import {
  Briefcase,
  HeartHandshake,
  PartyPopper,
  Users,
} from "lucide-react";

const services = [
  {
    title: "Employee Lunches",
    desc: "Boost morale and reward your team with an on-site lunch that’s fast, fresh, and memorable.",
    icon: Briefcase,
  },
  {
    title: "Customer Appreciation",
    desc: "Drive foot traffic and build goodwill with free food that gets people talking.",
    icon: HeartHandshake,
  },
  {
    title: "Grand Openings",
    desc: "Make your opening day unforgettable and draw a crowd right from the start.",
    icon: PartyPopper,
  },
  {
    title: "Corporate & Community Events",
    desc: "Reliable catering for company events, festivals, and local gatherings of all sizes.",
    icon: Users,
  },
];

export default function ServicesList() {
  return (
    <section className="bg-[#E6D2AC] relative overflow-hidden">
      {/* soft background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F6F0E3]/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="group relative bg-[#F6F0E3] p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* accent strip */}
                <div className="absolute top-0 left-0 h-1 w-16 bg-[#982810] rounded-tl-3xl rounded-br-xl" />

                <div className="flex items-start gap-6">
                  {/* Icon badge */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-[#982810]/10 flex items-center justify-center text-[#982810] group-hover:scale-105 transition-transform">
                      <Icon size={30} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-extrabold mb-3 leading-tight">
                      {service.title}
                    </h3>

                    {/* divider */}
                    <div className="h-1 w-10 bg-[#982810] rounded mb-4 opacity-80" />

                    <p className="opacity-80 leading-relaxed text-base">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}