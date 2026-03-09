"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play } from "lucide-react";
import type { Role } from "@/data/constants";
import SunIcon from "./SunIcon";
import VideoModal from "./VideoModal";

const NAV_ITEMS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Explore", href: "#roles" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Navbar({
  role,
  onRoleChange,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-sun-200/20 border-b border-sun-200/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <SunIcon className="w-8 h-8" />
            <span className="text-xl font-bold text-slate-900">
              Dhoop
            </span>
          </a>

          {/* Desktop Center: Nav + Role Switcher */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-sun-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
              {(["investor", "host", "vc"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    role === r
                      ? "bg-sun-500 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {r === "vc" ? "VC" : r === "investor" ? "Investor" : "Host"}
                </button>
              ))}
            </div>
          </div>

          {/* Lazy Button */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-md"
            >
              <Play className="w-3 h-3" />
              I Don&apos;t Read
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 justify-self-end"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-sun-200/30"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-slate-600 hover:text-sun-600"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {(["investor", "host", "vc"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      role === r
                        ? "bg-sun-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {r === "vc" ? "VC" : r === "investor" ? "Investor" : "Host"}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setVideoOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold"
                >
                  <Play className="w-3 h-3" />
                  I Don&apos;t Read
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </motion.nav>
  );
}
