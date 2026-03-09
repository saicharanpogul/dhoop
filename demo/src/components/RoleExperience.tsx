"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Coins,
  TrendingUp,
  ArrowUpRight,
  Sun,
  Zap,
  Receipt,
  CheckCircle2,
  Home,
  BadgeDollarSign,
  BarChart3,
  Users,
  Target,
  Layers,
  ShieldCheck,
  LineChart,
  Wrench,
  Handshake,
} from "lucide-react";
import type { Role } from "@/data/constants";
import {
  HOST_SELECTION_CRITERIA,
  PPA_TIERS,
  REVENUE_STREAMS,
  COMPETITORS,
  ECOSYSTEM_PARTNERS,
} from "@/data/constants";

/* ─── Investor Experience ─── */
function InvestorExperience() {
  const [depositAmount, setDepositAmount] = useState(1000);
  const [timeframe, setTimeframe] = useState(12);
  const yieldRate = 0.15;
  const monthlyYield = (depositAmount * yieldRate) / 12;
  const totalYield = monthlyYield * timeframe;

  return (
    <div className="space-y-8">
      {/* Journey Steps */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { icon: Wallet, title: "Connect Wallet", desc: "Phantom, Backpack, or Solflare" },
          { icon: Coins, title: "Deposit USDC", desc: "Min $50 into DePINFi pool" },
          { icon: Sun, title: "Fund Solar", desc: "Capital installs rooftop panels" },
          { icon: TrendingUp, title: "Earn Yield", desc: "Monthly USDC distributions" },
        ].map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-sun-100 shadow-sm text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-sun-100 flex items-center justify-center mx-auto mb-3">
              <step.icon className="w-6 h-6 text-sun-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
            {i < 3 && (
              <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2">
                <ArrowUpRight className="w-4 h-4 text-sun-300" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Interactive Yield Calculator */}
      <div className="bg-white rounded-3xl border border-sun-200 p-6 sm:p-8 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
          <BadgeDollarSign className="w-5 h-5 text-sun-500" />
          Interactive Yield Simulator
        </h3>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Deposit Amount: <span className="text-sun-600 font-bold">${depositAmount.toLocaleString()} USDC</span>
              </label>
              <input
                type="range"
                min={50}
                max={50000}
                step={50}
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full h-2 bg-sun-100 rounded-lg appearance-none cursor-pointer accent-sun-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$50</span>
                <span>$50,000</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Timeframe: <span className="text-sun-600 font-bold">{timeframe} months</span>
              </label>
              <input
                type="range"
                min={1}
                max={60}
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                className="w-full h-2 bg-sun-100 rounded-lg appearance-none cursor-pointer accent-sun-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1 month</span>
                <span>60 months</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-sun-soft rounded-2xl p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Monthly Yield</span>
                <span className="text-lg font-bold text-sun-700">${monthlyYield.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Yield ({timeframe}mo)</span>
                <span className="text-lg font-bold text-sun-700">${totalYield.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-sun-200">
                <span className="text-sm font-semibold text-slate-700">Total Value</span>
                <span className="text-2xl font-black text-slate-900">
                  ${(depositAmount + totalYield).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Based on 15% APR (base case). Actual yields: 12-20% APR depending on cohort performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Return Structure */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Coins className="w-5 h-5 text-violet-500" />
            Energy Yield (Stable)
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Monthly USDC distributions from solar energy revenue, paid pro-rata to all pool participants.
          </p>
          <div className="bg-violet-50 rounded-lg p-3 text-center">
            <span className="text-2xl font-black text-violet-700">12-20%</span>
            <span className="text-sm text-violet-600 ml-1">APR</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-sun-100 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sun-500" />
            Cohort Token (Speculative)
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Tradeable tokens on Meteora DLMM with performance-linked buybacks creating automatic buy pressure when panels overperform.
          </p>
          <div className="bg-sun-50 rounded-lg p-3 text-center">
            <span className="text-2xl font-black text-sun-700">+ Capital Gains</span>
          </div>
        </div>
      </div>

      {/* Buyback Mechanic Explanation */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sun-400" />
          Performance-Linked Buyback (Core Innovation)
        </h3>

        {/* Trigger Mechanism */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-sun-400 font-bold text-sm mb-2">Target Set</p>
            <p className="text-xs text-slate-400">
              At launch, a monthly generation target is set based on system capacity and location irradiance data.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-emerald-400 font-bold text-sm mb-2">Overperformance</p>
            <p className="text-xs text-slate-400">
              If cohort exceeds target by 5%+, 50% of excess revenue buys back tokens from Meteora pool creating buy pressure.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-violet-400 font-bold text-sm mb-2">NAV Floor</p>
            <p className="text-xs text-slate-400">
              5% escrow reserve ensures a floor price based on remaining system life, preventing death spirals.
            </p>
          </div>
        </div>

        {/* 70/30 Hybrid Mechanism */}
        <div className="border-t border-slate-700 pt-6">
          <h4 className="font-bold text-base mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-sun-400" />
            Hybrid Buyback: 70% Burn / 30% Reserve
          </h4>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* 70% Burn */}
            <div className="bg-gradient-to-br from-orange-900/40 to-slate-800 rounded-2xl p-5 border border-orange-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-lg font-black text-orange-400">
                  70%
                </div>
                <div>
                  <p className="font-bold text-orange-400 text-sm">Permanent Burn</p>
                  <p className="text-xs text-slate-400">Deflationary supply reduction</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                70% of bought-back tokens are burned permanently on-chain. Every overperformance event visibly shrinks supply. A live dashboard tracks cumulative burns per cohort, serving as a powerful trust signal and marketing tool.
              </p>
            </div>
            {/* 30% Reserve */}
            <div className="bg-gradient-to-br from-violet-900/40 to-slate-800 rounded-2xl p-5 border border-violet-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-lg font-black text-violet-400">
                  30%
                </div>
                <div>
                  <p className="font-bold text-violet-400 text-sm">Cohort Reserve</p>
                  <p className="text-xs text-slate-400">12-month time-locked wallet</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                30% goes to a cohort-specific reserve wallet with time-lock and governance constraints. Funds inverter replacements (INR 30-50K around year 8-12), storm repairs, and host defaults without going back to investors.
              </p>
            </div>
          </div>

          {/* Governance Rules */}
          <div className="mt-5 bg-slate-800/60 rounded-xl p-4">
            <p className="text-xs font-semibold text-sun-400 mb-2">Smart Contract Governance (Trustless)</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-400">Reserve tokens can only be sold to fund documented maintenance events (oracle/multisig verified)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-400">Reserve tokens can only be sold at or above the NAV floor price</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-400">If unused for 3 years, reserve tokens auto-burn, eliminating &quot;will they dump&quot; anxiety</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Host Experience ─── */
function HostExperience() {
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const savingsPercent = 0.45;
  const monthlySavings = monthlyBill * savingsPercent;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="space-y-8">
      {/* Journey Steps */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { icon: Home, title: "Apply", desc: "Submit DISCOM bills & roof details" },
          { icon: CheckCircle2, title: "Get Approved", desc: "Property & bill verification" },
          { icon: Wrench, title: "Free Installation", desc: "EPC partner installs panels" },
          { icon: Zap, title: "Save Money", desc: "35-50% lower electricity bills" },
        ].map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <step.icon className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Savings Calculator */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-emerald-500" />
          Your Savings Calculator
        </h3>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Current Monthly DISCOM Bill: <span className="text-emerald-600 font-bold">INR {monthlyBill.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min={3000}
              max={20000}
              step={500}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>INR 3,000</span>
              <span>INR 20,000</span>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Current Bill</span>
                <span className="font-bold text-red-500">INR {monthlyBill.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">With Dhoop (PPA rate)</span>
                <span className="font-bold text-emerald-600">INR {(monthlyBill - monthlySavings).toLocaleString()}/mo</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-emerald-200">
                <span className="text-sm font-semibold text-slate-700">You Save Monthly</span>
                <span className="text-xl font-black text-emerald-700">INR {monthlySavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Annual Savings</span>
                <span className="font-bold text-emerald-700">INR {annualSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">15-Year Savings</span>
                <span className="font-bold text-emerald-700">INR {(annualSavings * 15).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PPA Tiered Pricing */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Tiered PPA Pricing</h3>
        <p className="text-sm text-slate-600 mb-4">
          Rates decrease over time as capital is recovered. DISCOM rate: INR 7-9/kWh (and rising 3-5% yearly).
        </p>
        <div className="grid sm:grid-cols-4 gap-3">
          {PPA_TIERS.map((tier) => (
            <div
              key={tier.years}
              className={`rounded-xl p-4 text-center ${
                tier.rate === 0
                  ? "bg-emerald-100 border-2 border-emerald-400"
                  : "bg-slate-50 border border-slate-200"
              }`}
            >
              <p className="text-xs font-semibold text-slate-500 mb-1">Year {tier.years}</p>
              <p className={`text-2xl font-black ${tier.rate === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                {tier.rate === 0 ? "FREE" : `INR ${tier.rate}`}
              </p>
              {tier.rate > 0 && <p className="text-xs text-slate-400">/kWh</p>}
              <p className="text-xs text-slate-500 mt-2">{tier.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Host Selection Criteria */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Eligibility Criteria</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {HOST_SELECTION_CRITERIA.map((c) => (
            <div key={c} className="flex items-start gap-2 p-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key benefit */}
      <div className="bg-emerald-900 rounded-3xl p-6 sm:p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Zero Upfront Cost</h3>
        <p className="text-emerald-200 max-w-lg mx-auto">
          We finance, install, and maintain your solar system. You just pay for the electricity at a lower rate than your current bill. After 15 years, the system is yours. Free electricity for 10+ more years.
        </p>
      </div>
    </div>
  );
}

/* ─── VC Experience ─── */
function VCExperience() {
  return (
    <div className="space-y-8">
      {/* Market Sizing */}
      <div className="bg-white rounded-3xl border border-violet-200 p-6 sm:p-8 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-violet-500" />
          Market Opportunity
        </h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-violet-50 rounded-xl">
            <p className="text-3xl font-black text-violet-700">$360B</p>
            <p className="text-sm text-slate-600 mt-1">MSME Credit Gap</p>
          </div>
          <div className="text-center p-4 bg-sun-50 rounded-xl">
            <p className="text-3xl font-black text-sun-700">10M</p>
            <p className="text-sm text-slate-600 mt-1">PM Surya Ghar Target Homes</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <p className="text-3xl font-black text-emerald-700">7 GW</p>
            <p className="text-sm text-slate-600 mt-1">Forecast 2025 Additions</p>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4 text-center">
          158% YoY growth. 74% residential. India&apos;s solar financing gap is the bottleneck, not demand, not technology.
        </p>
      </div>

      {/* Revenue Model */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-sun-500" />
          Protocol Revenue (4 Streams)
        </h3>
        <div className="space-y-3">
          {REVENUE_STREAMS.map((rs) => (
            <div
              key={rs.stream}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">{rs.stream}</p>
                <p className="text-xs text-slate-500">{rs.basis}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sun-600">{rs.rate}</p>
                <p className="text-xs text-slate-500">{rs.scaling}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Economics */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-1">Per Installation (Base)</p>
          <p className="text-2xl font-black text-slate-900">16.4% IRR</p>
          <p className="text-xs text-slate-500 mt-1">5kW system, 6.5yr payback</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-1">Cohort (15 installs)</p>
          <p className="text-2xl font-black text-slate-900">$4,900-6,100</p>
          <p className="text-xs text-slate-500 mt-1">Annual net revenue to investors</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-1">Default Rate Target</p>
          <p className="text-2xl font-black text-slate-900">&lt;5%</p>
          <p className="text-xs text-slate-500 mt-1">NACH + security deposit + strict criteria</p>
        </div>
      </div>

      {/* Competitive Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-500" />
          Competitive Landscape
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 text-slate-500 font-medium">Player</th>
              <th className="text-left py-2 text-slate-500 font-medium">Yield</th>
              <th className="text-left py-2 text-slate-500 font-medium">Our Edge</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((c) => (
              <tr
                key={c.name}
                className={`border-b border-slate-100 ${c.highlight ? "bg-sun-50 border-sun-200" : ""}`}
              >
                <td className={`py-3 font-medium ${c.highlight ? "text-sun-600 font-bold" : "text-slate-900"}`}>
                  {c.name}
                </td>
                <td className={`py-3 ${c.highlight ? "text-sun-600 font-semibold" : "text-slate-600"}`}>{c.yield}</td>
                <td className={`py-3 ${c.highlight ? "text-sun-600 font-semibold" : "text-slate-600"}`}>{c.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ecosystem Partners */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
          <Handshake className="w-5 h-5 text-emerald-500" />
          Ecosystem (In Talks)
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          Dhoop is exploring collaborations with DePIN energy projects. Excess solar generation from Dhoop rooftops can feed into the broader energy ecosystem.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {ECOSYSTEM_PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
            >
              <h4 className="font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1.5">
                {p.name}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-emerald-600/70 mt-1">{p.role}</p>
              <p className="text-sm text-slate-600 mt-2">{p.synergy}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Key Thesis */}
      <div className="bg-violet-900 rounded-3xl p-6 sm:p-8 text-white">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sun-400" />
          Investment Thesis
        </h3>
        <p className="text-violet-200 text-sm leading-relaxed">
          DePINFi is proven on Solana. Dhoop applies it to a 10x larger market (rooftop solar, $360B
          credit gap) with a novel performance-linked buyback mechanic no competitor has. India is
          adding 7 GW/year rooftop solar with massive government support. The arbitrage between
          3-6% DeFi yields and 12-20% solar yields is structural and durable.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-violet-800 rounded-xl p-4 text-center">
            <p className="text-sun-400 font-bold">Pre-Seed Target</p>
            <p className="text-xl font-black text-white mt-1">$200-500K</p>
          </div>
          <div className="bg-violet-800 rounded-xl p-4 text-center">
            <p className="text-sun-400 font-bold">36-Month Goal</p>
            <p className="text-xl font-black text-white mt-1">$5M+ Deployed</p>
          </div>
          <div className="bg-violet-800 rounded-xl p-4 text-center">
            <p className="text-sun-400 font-bold">Exit Multiples</p>
            <p className="text-xl font-black text-white mt-1">20-50x Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Role Experience Section ─── */
export default function RoleExperience({
  role,
  onRoleChange,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="roles" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-sun-100 text-sun-700 text-xs font-semibold mb-4">
            EXPLORE BY ROLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            See Dhoop Through{" "}
            <span className="text-gradient-sun">Your Lens</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">
            Choose a role to explore the platform from that perspective with interactive demos and real economics.
          </p>

          {/* Role Tabs */}
          <div className="inline-flex bg-slate-100 rounded-2xl p-1.5">
            {([
              { key: "investor" as const, label: "Investor", icon: LineChart, desc: "Earn yield on USDC" },
              { key: "host" as const, label: "Host", icon: Home, desc: "Get free solar" },
              { key: "vc" as const, label: "VC / Protocol", icon: BarChart3, desc: "Evaluate the model" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => onRoleChange(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-semibold ${
                  role === tab.key
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Role Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role || "none"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === "investor" && <InvestorExperience />}
            {role === "host" && <HostExperience />}
            {role === "vc" && <VCExperience />}
            {!role && (
              <div className="text-center py-16 text-slate-400">
                <Sun className="w-16 h-16 mx-auto mb-4 text-sun-300" />
                <p className="text-lg">Select a role above to explore the platform</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
