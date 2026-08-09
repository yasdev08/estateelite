"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { TrendingUp, Home, Globe, Users } from "lucide-react";

const STATS = [
  {
    icon: Home,
    value: 1847,
    suffix: "+",
    label: "Properties Sold",
    description: "Across 45 global markets",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: TrendingUp,
    value: 14,
    suffix: "B+",
    prefix: "$",
    label: "In Transactions",
    description: "Lifetime portfolio value",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    value: 45,
    suffix: "",
    label: "Global Markets",
    description: "International affiliate network",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "4.9 average rating",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
];

export function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-28 bg-[#07111F] overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">By the numbers</div>
          <h2 className="text-fluid-4xl font-black text-white tracking-tight leading-none">
            A track record that speaks
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                relative overflow-hidden rounded-2xl p-7 border border-white/[0.07]
                bg-gradient-to-b from-white/[0.04] to-transparent
                group hover:border-white/[0.14] transition-all duration-500
              `}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-white/20`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>

              {/* Count */}
              <div className="relative">
                <div className="flex items-baseline gap-0.5">
                  {stat.prefix && (
                    <span className="text-3xl font-black text-white/80">{stat.prefix}</span>
                  )}
                  <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-black text-white tracking-tight leading-none">
                    {inView ? (
                      <CountUp
                        end={stat.value}
                        duration={2.2}
                        delay={i * 0.15}
                        useEasing
                        easingFn={(t, b, c, d) => {
                          t /= d;
                          return -c * t * (t - 2) + b;
                        }}
                      />
                    ) : 0}
                  </span>
                  <span className="text-3xl font-black text-gold">{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold text-white/80 mt-2 mb-1">{stat.label}</div>
                <div className="text-xs text-white/35 font-medium">{stat.description}</div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Partner logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-white/25 uppercase mb-8">
            Featured in & Partner with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {[
              "The Wall Street Journal",
              "Forbes",
              "Architectural Digest",
              "Financial Times",
              "The New York Times",
              "Bloomberg",
            ].map((name) => (
              <div
                key={name}
                className="text-sm font-bold tracking-widest text-white/20 uppercase hover:text-white/40 transition-colors duration-300 cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
