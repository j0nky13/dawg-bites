import { motion } from "framer-motion";

const cases = [
  {
    title: "Employee Lunches & Appreciation",
    desc:
      "Perfect for morale boosts, milestone celebrations, or simply showing appreciation without disrupting the workday.",
  },
  {
    title: "Customer Appreciation Events",
    desc:
      "Create a welcoming, memorable experience that makes customers want to stay longer and come back.",
  },
  {
    title: "Grand Openings & Promotions",
    desc:
      "Draw real attention during high-impact moments with a food experience that feels intentional, not gimmicky.",
  },
  {
    title: "Community & Corporate Events",
    desc:
      "A reliable option for festivals, company gatherings, and on-site activations of all sizes.",
  },
];

export default function ServiceUseCases() {
  return (
    <section className="bg-[#F6F0E3]">
      <div className="max-w-7xl mx-auto px-6 py-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-36 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Common Ways Companies
            <span className="block text-[#982810]">
              Use DawgBites
            </span>
          </h2>
        </motion.div>

        {/* Use cases */}
        <div className="space-y-32 max-w-5xl">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-12"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-2 h-10 w-1 bg-[#982810]" />

              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                {item.title}
              </h3>

              <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-3xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}