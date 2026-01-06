import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="bg-[#F6F0E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-8">
            Turnkey Food Experiences
            <span className="block text-[#982810]">
              For Businesses & Events
            </span>
          </h1>

          <p className="text-xl md:text-2xl opacity-80 leading-relaxed mb-12">
            Dawg Bites provides flat-rate, on-site hot dog and burger service
            designed specifically for employee lunches, customer appreciation,
            promotions, and corporate events.
          </p>

          <p className="text-lg opacity-75 max-w-3xl leading-relaxed">
            No transactions. No logistics. No guesswork. Just a simple,
            professional food experience that shows up ready and delivers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}