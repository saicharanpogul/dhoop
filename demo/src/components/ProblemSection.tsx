"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sun,
  TrendingUp,
  AlertTriangle,
  Home,
  Percent,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { MARKET_STATS } from "@/data/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  sun: Sun,
  "trending-up": TrendingUp,
  "alert-triangle": AlertTriangle,
  home: Home,
  percent: Percent,
  clock: Clock,
};

function AnimatedCounter({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="text-2xl sm:text-3xl font-black text-slate-900"
    >
      {value}
    </motion.span>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-100 text-sun-700 text-xs font-semibold mb-4">
            THE OPPORTUNITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            India&apos;s Solar Boom Meets a{" "}
            <span className="text-gradient-sun">$360B Financing Gap</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The demand is explosive, but traditional banks can&apos;t serve millions of small rooftop projects.
            Crypto capital is the unlock.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {MARKET_STATS.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || Sun;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-sun-200 transition-all group"
              >
                <Icon className="w-6 h-6 text-sun-500 mb-3 group-hover:scale-110 transition-transform" />
                <AnimatedCounter value={stat.value} delay={i * 0.1 + 0.3} />
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* The Paradox Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sun-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">The Paradox</h3>
            <div className="grid sm:grid-cols-3 gap-6 items-center">
              <div className="text-center sm:text-left">
                <p className="text-3xl font-black text-sun-400">15-28%</p>
                <p className="text-sm text-slate-400 mt-1">
                  IRR on rooftop solar, one of India&apos;s highest returning infra investments
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-sm">but</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-black text-red-400">$360B</p>
                <p className="text-sm text-slate-400 mt-1">
                  MSME credit gap. Businesses that benefit most can&apos;t access INR 2-4L for installation
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-sun-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">The Crypto Capital Arbitrage:</strong>{" "}
                  Billions in stablecoins earn 3-6% in DeFi. Rooftop solar offers 12-20% net yields
                  with 20+ year asset life, ESG alignment, and government subsidy support.
                  A well-structured DePINFi pool on Solana can raise INR 1 crore in days vs. 6-12 months via traditional finance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
