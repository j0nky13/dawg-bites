import { motion } from "framer-motion";

const moments = [
  {
    headline: "Your employees walk outside at lunch.",
    sub: "Food is ready. No wallets. No lines. No confusion.",
    detail:
      "We arrive fully set up before the lunch window begins. Employees step outside, eat freely, and head back to work without handling payments, reimbursements, or approvals.",
    outcome:
      "You get a smooth lunch hour that boosts morale without interrupting operations.",
  },
  {
    headline: "Customers show up for more than just a transaction.",
    sub: "They remember the experience — and your brand.",
    detail:
      "Instead of a standard visit, customers are greeted with a positive on-site experience tied directly to your business. Food becomes the interaction, not a side distraction.",
    outcome:
      "This creates goodwill, longer visits, and a reason to come back — without sales pressure.",
  },
  {
    headline: "Your grand opening actually draws a crowd.",
    sub: "Not just foot traffic — real momentum.",
    detail:
      "We help turn a short promotional window into a focal point. The event feels active, social, and worth attending — not just another ribbon cutting.",
    outcome:
      "You get attention when it matters most, not weeks later.",
  },
  {
    headline: "Multiple locations. One simple execution.",
    sub: "Consistent results, wherever you operate.",
    detail:
      "Whether it’s several offices or recurring events, the same flat-rate model applies. One process, one expectation, predictable execution.",
    outcome:
      "This scales cleanly without reinventing logistics every time.",
  },
];

export default function PerfectFor() {
  return (
    <section className="bg-[#E6D2AC]">
      <div className="max-w-6xl mx-auto px-6 py-40">
        {/* SECTION INTRO — THIS IS THE KEY FIX */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            What This Looks Like
            <span className="block text-[#982810]">
              In Practice
            </span>
          </h2>

          <p className="text-xl opacity-80 leading-relaxed">
            Dawg Bites is designed to remove friction while creating a positive,
            memorable on-site experience. Here’s how companies typically use
            the model.
          </p>
        </motion.div>

        {/* MOMENTS */}
        <div className="space-y-40">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.headline}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-10"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {moment.headline}
              </h3>

              <p className="text-xl md:text-2xl text-[#982810] font-semibold">
                {moment.sub}
              </p>

              <p className="max-w-3xl text-lg opacity-85 leading-relaxed">
                {moment.detail}
              </p>

              <p className="max-w-3xl text-lg font-medium leading-relaxed">
                {moment.outcome}
              </p>

              {index !== moments.length - 1 && (
                <div className="pt-20">
                  <div className="h-px w-24 bg-[#982810]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}