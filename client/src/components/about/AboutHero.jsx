import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="bg-[#F6F0E3]">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
            About
            <span className="block text-[#982810]">
              Dawg Bites
            </span>
          </h1>

          <p className="text-xl md:text-2xl opacity-80 leading-relaxed max-w-3xl">
            Locally owned. Charleston proud. Built around great food, reliable
            service, and experiences people actually remember.
          </p>
        </motion.div>
      </div>
    </section>
  );
}