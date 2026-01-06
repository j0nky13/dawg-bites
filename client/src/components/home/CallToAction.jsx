import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-[#982810] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Test a Flat-Rate Event?
        </h2>

        <p className="max-w-2xl mx-auto mb-10 opacity-90">
          Let’s talk about your company, your goals, and a simple pilot event.
        </p>

        <Link
          to="/contact"
          className="inline-block bg-white text-[#982810] px-10 py-4 rounded-lg font-semibold"
        >
          Request a Flat-Rate Event
        </Link>
      </div>
    </section>
  );
}