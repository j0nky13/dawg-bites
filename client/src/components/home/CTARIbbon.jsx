import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTARibbon() {
  return (
    <section className="bg-[#982810]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-white"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              Ready to Feed Your Crew?
            </h3>
            <p className="opacity-90">
              Employee lunches, customer appreciation, and events made easy.
            </p>
          </div>

          <Link
            to="/contact"
            className="bg-white text-[#982810] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Request a Date
          </Link>
        </motion.div>
      </div>
    </section>
  );
}