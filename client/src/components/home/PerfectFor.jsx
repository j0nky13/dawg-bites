import { motion } from "framer-motion";

const audiences = [
  {
    title: "Employee-Focused Companies",
    desc:
      "Organizations that want to reward teams, boost morale, or simply make the workday better — without planning logistics or managing reimbursements.",
  },
  {
    title: "Customer-Experience Brands",
    desc:
      "Businesses that care about how customers feel on site and want to create a welcoming, memorable interaction rather than a rushed transaction.",
  },
  {
    title: "Launches, Promotions & Special Events",
    desc:
      "Teams running grand openings, promotions, or limited-time events where attention, energy, and foot traffic actually matter.",
  },
  {
    title: "Multi-Location or Growing Organizations",
    desc:
      "Companies that value consistency and scalability across offices, regions, or recurring events without reinventing the process every time.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const bodyVariant = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PerfectFor() {
  return (
    <section className="bg-[#F6F0E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            This Is a Strong Fit For
          </h2>

          <p className="text-xl opacity-80 leading-relaxed">
            Dawg Bites is built for organizations that care about experience,
            simplicity, and showing appreciation — without adding work for their
            team.
          </p>
        </motion.div>

        {/* Audience blocks */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-32"
        >
          {audiences.map((item, i) => (
            <motion.div key={item.title} className="relative">
              {/* Animated divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute -top-16 left-0 h-px w-24 bg-[#982810] origin-left"
              />

              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                {/* Title */}
                <motion.h3
                  variants={titleVariant}
                  className="text-3xl md:text-4xl font-extrabold leading-tight"
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  variants={bodyVariant}
                  className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl"
                >
                  {item.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom qualifier */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-40 max-w-4xl"
        >
          <p className="text-xl font-medium leading-relaxed">
            If your goal is to create a positive experience without operational
            friction,
            <span className="text-[#982810] font-semibold">
              {" "}this model tends to fit extremely well.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}