"use client";

import SunIcon from "./SunIcon";

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SunIcon className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-2">
            Dhoop
          </h3>
          <p className="text-slate-400 max-w-lg text-sm mb-8">
            Onchain Solar Yield Vault. Bridging India&apos;s solar financing gap through
            DePINFi pools and performance-linked cohort tokens on Solana.
          </p>

          <div className="grid grid-cols-3 gap-8 mb-12 text-center">
            <div>
              <p className="text-2xl font-black text-sun-400">12-20%</p>
              <p className="text-xs text-slate-500 mt-1">Target APR</p>
            </div>
            <div>
              <p className="text-2xl font-black text-sun-400">$50</p>
              <p className="text-xs text-slate-500 mt-1">Min. Investment</p>
            </div>
            <div>
              <p className="text-2xl font-black text-sun-400">15yr</p>
              <p className="text-xs text-slate-500 mt-1">Asset Life</p>
            </div>
          </div>

          {/* Source Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { label: "PM Surya Ghar Scheme", href: "https://www.pmsuryaghar.gov.in" },
              { label: "MNRE Rooftop Solar Data", href: "https://mnre.gov.in" },
              { label: "IFC MSME Finance Gap", href: "https://www.ifc.org/en/what-we-do/sector-expertise/financial-institutions/msme-finance" },
              { label: "Mercom India Solar Report", href: "https://www.mercomindia.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-sun-400 transition-colors underline underline-offset-2"
              >
                {link.label} {"\u2197"}
              </a>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 w-full">
            <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
              This is a demo / interactive pitch and does not constitute financial, legal, investment, or tax advice.
              Token purchases involve significant risks including total loss of capital. Past performance does not guarantee future results.
              Regulatory frameworks for crypto assets are evolving. The protocol does not guarantee any returns, yields, or financial outcomes.
            </p>
            <p className="text-xs text-slate-700 mt-4">
              &copy; 2026 Dhoop. Built on Solana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
