import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="bg-[#F6F0E3]">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Request Dawg Bites
          </h1>
          <p className="text-xl opacity-80 leading-relaxed">
            Tell us about your event and we’ll follow up with timing,
            availability, and a simple flat-rate option.
          </p>
        </motion.div>
      </div>
    </section>
  );
}