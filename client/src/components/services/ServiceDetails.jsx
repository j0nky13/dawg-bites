// import { motion } from "framer-motion";

// export default function ServiceDetails() {
//   return (
//     <section className="bg-[#E6D2AC]">
//       <div className="max-w-7xl mx-auto px-6 py-40">
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="grid md:grid-cols-[1fr_2fr] gap-20 items-start"
//         >
//           {/* Left framing column */}
//           <div className="sticky top-32">
//             <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
//               What’s
//               <span className="block text-[#982810]">
//                 Included
//               </span>
//             </h2>

//             <p className="text-lg opacity-70 max-w-sm">
//               Everything required to execute a professional, on-site food
//               experience — without burdening your team.
//             </p>
//           </div>

//           {/* Right content column */}
//           <div className="space-y-20 text-lg md:text-xl opacity-85 leading-relaxed">
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.05 }}
//             >
//               Every DawgBites service includes full staffing, setup, breakdown,
//               and professional on-site operation.
//             </motion.p>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//             >
//               We are fully insured and prepared to operate on business
//               properties, event spaces, and public venues where permitted.
//             </motion.p>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.15 }}
//             >
//               Events are scheduled within a defined time window to ensure smooth
//               flow, predictable service, and minimal disruption to your
//               operation.
//             </motion.p>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//             >
//               Optional branding, signage, or promotional coordination can be
//               discussed based on the event.
//             </motion.p>

//             {/* Close */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//               className="pt-16 border-t border-[#982810]/40"
//             >
//               <p className="text-xl font-medium">
//                 Everything is designed to be seamless on-site and
//                 <span className="text-[#982810] font-semibold">
//                   {" "}hands-off for your team.
//                 </span>
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";

export default function ServiceDetails() {
  return (
    <section className="bg-[#E6D2AC]">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1fr_2fr] gap-20 items-start"
        >
          {/* Left framing column — STATIC */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              What’s
              <span className="block text-[#982810]">
                Included
              </span>
            </h2>

            <p className="text-lg opacity-70 max-w-sm">
              Everything required to execute a professional, on-site food
              experience — without burdening your team.
            </p>
          </div>

          {/* Right content column */}
          <div className="space-y-20 text-lg md:text-xl opacity-85 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              Every Dawg Bites service includes full staffing, setup, breakdown,
              and professional on-site operation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We are fully insured and prepared to operate on business
              properties, event spaces, and public venues where permitted.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Events are scheduled within a defined time window to ensure smooth
              flow, predictable service, and minimal disruption to your
              operation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Optional branding, signage, or promotional coordination can be
              discussed based on the event.
            </motion.p>

            {/* Close */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-16 border-t border-[#982810]/40"
            >
              <p className="text-xl font-medium">
                Everything is designed to be seamless on-site and
                <span className="text-[#982810] font-semibold">
                  {" "}hands-off for your team.
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

