"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Activity, Sun, Zap, TrendingUp, DollarSign } from "lucide-react";

type MonthlyDatum = {
  month: string;
  generation: number;
  target: number;
  revenue: number;
  buyback: number;
};

type LiveDatum = {
  time: string;
  power: number;
};

function generateMonthlyData(): MonthlyDatum[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const irradianceMultiplier = [0.85, 0.9, 1.0, 1.1, 1.15, 0.8, 0.6, 0.65, 0.75, 0.85, 0.8, 0.8];
  const baseGeneration = 600;

  return months.map((month, i) => {
    const generation = Math.round(baseGeneration * irradianceMultiplier[i] + (Math.random() - 0.5) * 40);
    const target = Math.round(baseGeneration * irradianceMultiplier[i]);
    const revenue = Math.round(generation * 4.5);
    return {
      month,
      generation,
      target,
      revenue,
      buyback: generation > target * 1.05 ? Math.round((generation - target) * 4.5 * 0.5) : 0,
    };
  });
}

function generateLiveData(): LiveDatum[] {
  const now = new Date();
  const data: LiveDatum[] = [];
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 3600000);
    const h = hour.getHours();
    const solarFactor = h >= 6 && h <= 18 ? Math.sin(((h - 6) / 12) * Math.PI) : 0;
    const kw = Math.max(0, solarFactor * 4.2 + (Math.random() - 0.5) * 0.3);
    data.push({
      time: `${h}:00`,
      power: parseFloat(kw.toFixed(2)),
    });
  }
  return data;
}

export default function DashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [monthlyData, setMonthlyData] = useState<MonthlyDatum[]>([]);
  const [liveData, setLiveData] = useState<LiveDatum[]>([]);
  const [activeTab, setActiveTab] = useState<"live" | "monthly" | "cohort">("live");
  const [mounted, setMounted] = useState(false);

  const refreshLiveData = useCallback(() => {
    setLiveData(generateLiveData());
  }, []);

  // Generate data only on client to avoid hydration mismatch
  useEffect(() => {
    setMonthlyData(generateMonthlyData());
    setLiveData(generateLiveData());
    setMounted(true);
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(refreshLiveData, 5000);
    return () => clearInterval(interval);
  }, [mounted, refreshLiveData]);

  const totalGeneration = monthlyData.reduce((sum, d) => sum + d.generation, 0);
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalBuyback = monthlyData.reduce((sum, d) => sum + d.buyback, 0);
  const currentPower = liveData[liveData.length - 1]?.power || 0;

  return (
    <section id="economics" className="py-24 bg-gradient-sun-soft relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-200 text-sun-800 text-xs font-semibold mb-4">
            LIVE DASHBOARD
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Real-Time <span className="text-gradient-sun">Performance</span> Data
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Every installation reports kWh generation via smart inverters. Oracle-verified data drives yield distribution and buyback triggers.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Zap, label: "Current Output", value: `${currentPower} kW`, color: "text-sun-600", bgColor: "bg-sun-50" },
            { icon: Sun, label: "Annual Generation", value: `${(totalGeneration / 1000).toFixed(1)} MWh`, color: "text-emerald-600", bgColor: "bg-emerald-50" },
            { icon: DollarSign, label: "Annual Revenue", value: `INR ${(totalRevenue / 1000).toFixed(1)}K`, color: "text-violet-600", bgColor: "bg-violet-50" },
            { icon: TrendingUp, label: "Buyback Triggered", value: `INR ${totalBuyback.toLocaleString()}`, color: "text-orange-600", bgColor: "bg-orange-50" },
          ].map((kpi) => (
            <div key={kpi.label} className={`${kpi.bgColor} rounded-2xl p-4 border border-white/50`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color} mb-2`} />
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Chart Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-100">
            {([
              { key: "live" as const, label: "Live Power Output", icon: Activity },
              { key: "monthly" as const, label: "Monthly Generation", icon: Sun },
              { key: "cohort" as const, label: "Revenue & Buybacks", icon: TrendingUp },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "text-sun-600 border-b-2 border-sun-500 bg-sun-50/50"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {!mounted ? (
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                Loading chart data...
              </div>
            ) : (
              <>
                {activeTab === "live" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs text-slate-500">Simulated live data &middot; Updates every 5s</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={liveData}>
                        <defs>
                          <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit=" kW" />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                          formatter={(value) => [`${value} kW`, "Power Output"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="power"
                          stroke="#FFC107"
                          strokeWidth={2}
                          fill="url(#powerGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {activeTab === "monthly" && (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit=" kWh" />
                      <Tooltip
                        contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                      />
                      <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Target" />
                      <Bar dataKey="generation" fill="#FFC107" radius={[4, 4, 0, 0]} name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {activeTab === "cohort" && (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit=" INR" />
                      <Tooltip
                        contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                      />
                      <Bar dataKey="revenue" fill="#FFC107" radius={[4, 4, 0, 0]} name="Revenue" />
                      <Bar dataKey="buyback" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Buyback" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </>
            )}
          </div>

          <div className="px-6 pb-4">
            <p className="text-xs text-slate-400 text-center">
              Data simulated for demo purposes. In production, real-time data feeds from smart inverters via Switchboard oracles on Solana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
