import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "../../assets/hotdog-hero.mov";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[650px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Flat-Rate Food Experiences
            <span className="block text-[#D8B870]">
              For Employees & Customers
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 opacity-90">
            Dawg Bites partners with businesses to deliver turnkey food events
            where employees or customers eat free — no transactions, no hassle,
            no logistics on your end.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-[#982810] text-white px-8 py-4 rounded-lg font-semibold"
            >
              Request a Flat-Rate Event
            </Link>

            <Link
              to="#how-it-works"
              className="border border-white/70 text-white px-8 py-4 rounded-lg font-semibold"
            >
              How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}