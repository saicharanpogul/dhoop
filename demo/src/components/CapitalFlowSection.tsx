"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Wallet,
  Lock,
  Repeat,
  Building2,
  Wrench,
  Gift,
  Zap,
  CreditCard,
  ArrowLeftRight,
  Coins,
} from "lucide-react";
import { CAPITAL_FLOW_STEPS } from "@/data/constants";

const STEP_ICONS = [
  Wallet, Lock, Repeat, Building2, Wrench, Gift, Zap, CreditCard, ArrowLeftRight, Coins,
];

const SIDE_COLORS = {
  crypto: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", dot: "bg-violet-500" },
  bridge: { bg: "bg-sun-50", border: "border-sun-200", text: "text-sun-700", dot: "bg-sun-500" },
  physical: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
};

export default function CapitalFlowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const step = CAPITAL_FLOW_STEPS[activeStep];
  const colors = SIDE_COLORS[step.side as keyof typeof SIDE_COLORS];
  const Icon = STEP_ICONS[activeStep];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-sun-soft relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-200 text-sun-800 text-xs font-semibold mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            From <span className="text-gradient-sun">USDC</span> to Rooftop to{" "}
            <span className="text-gradient-sun">Yield</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Click through each step to see how capital flows from global investors to Indian rooftops and back as yield.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { label: "Onchain (Solana)", color: "bg-violet-500" },
            { label: "Bridge (Fiat Rails)", color: "bg-sun-500" },
            { label: "Physical (India)", color: "bg-emerald-500" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <span className="text-xs text-slate-600">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Main Flow Visualization */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Step List */}
          <div className="space-y-1">
            {CAPITAL_FLOW_STEPS.map((s, i) => {
              const sc = SIDE_COLORS[s.side as keyof typeof SIDE_COLORS];
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeStep === i
                      ? `${sc.bg} ${sc.border} border-2 shadow-sm`
                      : "hover:bg-slate-50 border-2 border-transparent"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${sc.dot}`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      activeStep === i ? sc.text : "text-slate-600"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl ${colors.bg} ${colors.border} border-2 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[300px]`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-20 h-20 rounded-2xl ${colors.dot} flex items-center justify-center mb-6`}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>
            <span className={`text-xs font-bold ${colors.text} mb-2`}>
              STEP {step.step} OF 10
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-600 max-w-md">{step.description}</p>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-8">
              {CAPITAL_FLOW_STEPS.map((_, i) => {
                const dc = SIDE_COLORS[CAPITAL_FLOW_STEPS[i].side as keyof typeof SIDE_COLORS];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeStep ? `w-8 ${dc.dot}` : "w-2 bg-slate-300"
                    }`}
                  />
                );
              })}
            </div>

            {/* Nav buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/60 disabled:opacity-30 transition-all"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setActiveStep(Math.min(CAPITAL_FLOW_STEPS.length - 1, activeStep + 1))
                }
                disabled={activeStep === CAPITAL_FLOW_STEPS.length - 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${colors.dot} hover:opacity-90 disabled:opacity-30 transition-all`}
              >
                Next Step
              </button>
            </div>
          </motion.div>
        </div>

        {/* Two Entity Structure */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-violet-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Offshore Entity</h4>
                <p className="text-xs text-slate-500">Dubai / Singapore</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                Issues tokens & manages DePINFi pools
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                Receives USDC from global investors
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                Converts USDC → USD → wires to Indian SPV
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                Distributes USDC yield back to token holders
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Indian SPV</h4>
                <p className="text-xs text-slate-500">Pvt. Ltd. Company</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                Owns all physical solar assets
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                Signs PPAs, contracts EPC partners
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                Collects monthly revenue via NACH
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <strong>Zero crypto exposure.</strong> Only touches INR
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
