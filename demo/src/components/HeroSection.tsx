"use client";

import { motion } from "framer-motion";
import { ArrowDown, Zap, Sun, TrendingUp, Shield } from "lucide-react";
import type { Role } from "@/data/constants";
import SunIcon from "./SunIcon";

export default function HeroSection({
  onRoleChange,
}: {
  onRoleChange: (r: Role) => void;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-sun-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-sun-100/40 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffc107 1px, transparent 1px), linear-gradient(90deg, #ffc107 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sun-100 border border-sun-300 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-sun-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-sun-800">
            Built on Solana &middot; Powered by Real Solar Revenue
          </span>
        </motion.div>

        {/* Sun Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <SunIcon className="w-20 h-20 animate-pulse-sun rounded-full" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6"
        >
          Solar Yield,{" "}
          <span className="text-gradient-sun">Onchain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Global crypto investors fund Indian rooftop solar installations.
          Hosts get free solar & 50% cheaper electricity.
          Everyone earns real yield from the sun.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-slate-500 mb-10 max-w-2xl mx-auto"
        >
          DePINFi pools + performance-linked cohort tokens on Solana.
          Bridging India&apos;s $360B solar financing gap.
        </motion.p>

        {/* KPI Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: TrendingUp, label: "Target Yield", value: "12-20% APR" },
            { icon: Zap, label: "Minimum Deposit", value: "$50 USDC" },
            { icon: Shield, label: "Asset-Backed", value: "Real Solar Revenue" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-lg shadow-sun-200/30 border border-sun-100"
            >
              <kpi.icon className="w-5 h-5 text-sun-500" />
              <div className="text-left">
                <p className="text-xs text-slate-500">{kpi.label}</p>
                <p className="text-sm font-bold text-slate-900">{kpi.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Role Selection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-sm font-semibold text-slate-700 mb-4">
            Choose your perspective to explore the platform:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {[
              {
                role: "investor" as const,
                title: "I'm an Investor",
                subtitle: "Earn 12-20% APR in USDC",
                bg: "bg-sun-50",
                border: "border-sun-200",
                iconColor: "text-sun-500",
                titleColor: "text-sun-700",
                subtitleColor: "text-sun-600/70",
                Icon: Zap,
              },
              {
                role: "host" as const,
                title: "I'm a Host",
                subtitle: "Free solar, 50% cheaper bills",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                iconColor: "text-emerald-500",
                titleColor: "text-emerald-700",
                subtitleColor: "text-emerald-600/70",
                Icon: Sun,
              },
              {
                role: "vc" as const,
                title: "I'm a VC",
                subtitle: "Protocol economics & scale",
                bg: "bg-violet-50",
                border: "border-violet-200",
                iconColor: "text-violet-500",
                titleColor: "text-violet-700",
                subtitleColor: "text-violet-600/70",
                Icon: TrendingUp,
              },
            ].map((item) => (
              <motion.button
                key={item.role}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onRoleChange(item.role);
                  document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative px-8 py-5 rounded-2xl ${item.bg} border ${item.border} w-full sm:w-auto text-left transition-shadow hover:shadow-md`}
              >
                <item.Icon className={`w-5 h-5 mb-1 ${item.iconColor}`} />
                <span className={`block text-base font-bold ${item.titleColor}`}>{item.title}</span>
                <span className={`block text-xs font-medium mt-0.5 ${item.subtitleColor}`}>
                  {item.subtitle}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-5 h-5 text-sun-400" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
