import { motion } from "framer-motion";

export default function SocialValue() {
  return (
    <section className="bg-[#E6D2AC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-40">
        {/* Big statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05]">
            This doesn’t just
            <br />
            feed people.
            <span className="block text-[#982810]">
              It gets seen.
            </span>
          </h2>
        </motion.div>

        {/* Supporting explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl text-xl leading-relaxed opacity-85"
        >
          <p>
            Every Dawg Bites event naturally creates shareable moments. We promote
            appearances before and during events, tag your location, mention
            your business, and capture short-form photo and video content that
            lives on long after the food is gone.
          </p>

          <p className="mt-8">
            When it makes sense, we collaborate on co-branded posts that position
            your company as the host — turning a simple lunch or event into
            ongoing visibility.
          </p>
        </motion.div>

        {/* Visual divider / rhythm break */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-32 h-1 w-32 bg-[#982810]"
        />

        {/* Close */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-20 max-w-4xl text-xl font-medium leading-relaxed"
        >
          The goal isn’t just to serve food —
          <span className="text-[#982810] font-semibold">
            {" "}it’s to create attention, engagement, and goodwill for your
            brand.
          </span>
        </motion.p>
      </div>
    </section>
  );
}