import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section className="bg-[#E6D2AC]">
      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Who We Are
            <span className="block text-[#982810]">
              & Why We Exist
            </span>
          </h2>

          <p className="text-xl opacity-80 max-w-3xl leading-relaxed">
            Dawg Bites exists to make shared food moments simple, positive,
            and easy to host — especially in environments where professionalism
            matters.
          </p>
        </motion.div>

        {/* Narrative Block */}
        <div className="max-w-4xl border-l border-[#982810]/30 pl-8 space-y-10 text-lg md:text-xl opacity-85 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            We’re a locally owned food service based in Charleston, South
            Carolina. From the beginning, our focus has been straightforward:
            good food should bring people together without adding stress for the
            people organizing the experience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We saw businesses hesitate to host food events not because they
            didn’t care — but because food often comes with too many variables.
            Too many decisions. Too much coordination. Too much room for things
            to go sideways.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Dawg Bites was built to remove that friction. We show up prepared,
            operate with intention, and focus on delivering an experience that
            feels generous on-site and effortless behind the scenes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-medium"
          >
            At the end of the day, it comes down to trust. We respect the spaces
            we’re invited into, the people we’re serving, and the brands we’re
            representing — and we aim to leave every event better than we found
            it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}