import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07111F] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-lg">
        {/* Big 404 */}
        <div
          className="text-[clamp(6rem,20vw,12rem)] font-black leading-none tracking-tighter mb-4"
          style={{
            background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight mb-3">
          Property Not Found
        </h1>
        <p className="text-white/50 text-[15px] leading-relaxed mb-10">
          The page you&apos;re looking for may have been sold, moved, or never listed.
          Let&apos;s find you something better.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl"
          >
            <Home className="w-4 h-4" />
            Back Home
          </Link>
          <Link
            href="/properties"
            className="glass inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            <Search className="w-4 h-4" />
            Browse Properties
          </Link>
        </div>

        <Link
          href="javascript:history.back()"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    </div>
  );
}
