import { motion } from "framer-motion";
import { ShieldCheck, DollarSign, Truck, Smile } from "lucide-react";

const items = [
  {
    icon: DollarSign,
    title: "Flat-Rate Pricing",
    desc: "Simple, predictable cost",
  },
  {
    icon: Truck,
    title: "Turnkey Setup",
    desc: "Fully staffed & insured",
  },
  {
    icon: Smile,
    title: "Free for Attendees",
    desc: "No POS or transactions",
  },
  {
    icon: ShieldCheck,
    title: "Business-Ready",
    desc: "Professional & reliable",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#F6F0E3] border-y border-[#E6D2AC]">
      <div className="max-w-7xl mx-auto px-8 py-28">
        <div className="grid md:grid-cols-4 gap-16">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-6"
              >
                {/* Icon */}
                <Icon
                  className="text-[#982810]"
                  size={56}
                  strokeWidth={1.75}
                />

                {/* Title */}
                <div className="text-2xl font-extrabold">
                  {item.title}
                </div>

                {/* Description */}
                <div className="text-lg opacity-75">
                  {item.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}