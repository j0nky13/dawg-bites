import { motion } from "framer-motion";

export default function ServiceModel() {
  return (
    <section className="bg-[#E6D2AC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            A Simple
            <span className="block text-[#982810]">
              Flat-Rate Model
            </span>
          </h2>

          <p className="text-xl opacity-80 leading-relaxed">
            Dawg Bites operates on a straightforward flat-rate pricing structure
            designed for businesses — not individual transactions.
          </p>
        </motion.div>

        {/* Model breakdown */}
        <div className="space-y-24 max-w-5xl">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -left-10 top-1 text-[#982810] font-extrabold text-sm tracking-widest">
              01
            </div>

            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              Your company covers the cost of the event upfront. We arrive fully
              staffed, insured, and ready to serve within a defined time window.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -left-10 top-1 text-[#982810] font-extrabold text-sm tracking-widest">
              02
            </div>

            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              Employees or customers eat free during the event. There are no
              point-of-sale systems, no vouchers, and no reimbursements to
              manage.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -left-10 top-1 text-[#982810] font-extrabold text-sm tracking-widest">
              03
            </div>

            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              The result is a clean, predictable experience that feels generous
              without becoming operationally complex.
            </p>
          </motion.div>
        </div>

        {/* Divider + emphasis */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-32 h-px w-32 bg-[#982810] origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-20 max-w-4xl text-xl font-medium leading-relaxed"
        >
          It’s a hospitality experience that feels generous on-site and
          <span className="text-[#982810] font-semibold">
            {" "}effortless behind the scenes.
          </span>
        </motion.p>
      </div>
    </section>
  );
}