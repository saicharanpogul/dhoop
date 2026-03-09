"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TECH_STACK } from "@/data/constants";

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-sun-soft relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-200 text-sun-800 text-xs font-semibold mb-4">
            ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Built on <span className="text-gradient-sun">Solana</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Every layer chosen for speed, cost, and composability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK.map((item, i) => (
            <motion.div
              key={item.layer}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-sun-200 hover:shadow-lg transition-all group"
            >
              <span className="text-xs font-bold text-sun-600 uppercase tracking-wider">
                {item.layer}
              </span>
              <h4 className="font-bold text-slate-900 mt-2 text-sm">{item.tech}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.purpose}</p>
            </motion.div>
          ))}
        </div>

        {/* Oracle Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
        >
          <h3 className="font-bold text-slate-900 mb-6 text-center">Oracle & Telemetry Pipeline</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
            {[
              { label: "Smart Inverter", sub: "Growatt / GoodWe" },
              { label: "Cloud API", sub: "15min cadence" },
              { label: "Backend Service", sub: "Aggregation" },
              { label: "Switchboard Oracle", sub: "On Solana" },
              { label: "Smart Contract", sub: "Buyback + Yield" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="bg-sun-50 border border-sun-200 rounded-xl px-4 py-3 text-center min-w-[120px]">
                  <p className="text-xs font-bold text-slate-900">{step.label}</p>
                  <p className="text-[10px] text-slate-500">{step.sub}</p>
                </div>
                {i < 4 && (
                  <svg className="w-6 h-6 text-sun-400 flex-shrink-0 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
