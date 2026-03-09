"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Circle, Loader2 } from "lucide-react";
import { ROADMAP_PHASES } from "@/data/constants";

const STATUS_STYLES = {
  complete: {
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    line: "bg-emerald-400",
  },
  active: {
    icon: Loader2,
    bg: "bg-sun-50",
    border: "border-sun-300",
    badge: "bg-sun-100 text-sun-700",
    line: "bg-sun-400",
  },
  upcoming: {
    icon: Circle,
    bg: "bg-white",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600",
    line: "bg-slate-200",
  },
};

export default function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-100 text-sun-700 text-xs font-semibold mb-4">
            ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            From Pilot to{" "}
            <span className="text-gradient-sun">National Scale</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            A phased approach: validate unit economics locally, then scale globally with DePINFi pools and cohort tokens.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {ROADMAP_PHASES.map((phase, i) => {
            const styles = STATUS_STYLES[phase.status];
            const StatusIcon = styles.icon;
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl ${styles.bg} ${styles.border} border-2 p-6 sm:p-8 relative`}
              >
                {/* Connecting line */}
                {i < ROADMAP_PHASES.length - 1 && (
                  <div className={`absolute left-10 sm:left-12 top-full w-0.5 h-6 ${styles.line}`} />
                )}

                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Phase icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    phase.status === "active" ? "bg-sun-500" : phase.status === "complete" ? "bg-emerald-500" : "bg-slate-200"
                  }`}>
                    <StatusIcon
                      className={`w-6 h-6 text-white ${phase.status === "active" ? "animate-spin" : ""}`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-bold text-lg text-slate-900">
                        Phase {phase.phase}: {phase.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles.badge}`}>
                        Month {phase.months}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        {phase.capital}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 text-sun-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scale targets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 text-white"
        >
          <h3 className="text-center font-bold text-xl mb-8">36-Month Targets</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,000+", label: "Installations" },
              { value: "10,000", label: "Investor Wallets" },
              { value: "$5M+", label: "Capital Deployed" },
              { value: "10+ States", label: "Coverage" },
            ].map((t) => (
              <div key={t.label}>
                <p className="text-2xl sm:text-3xl font-black text-sun-400">{t.value}</p>
                <p className="text-sm text-slate-400 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
