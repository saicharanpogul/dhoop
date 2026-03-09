export type Role = "investor" | "host" | "vc" | null;

export const MARKET_STATS = [
  { label: "Rooftop Solar Added (H1 2025)", value: "2.8 GW", icon: "sun" },
  { label: "Year-on-Year Growth", value: "158%", icon: "trending-up" },
  { label: "MSME Credit Gap", value: "$360B", icon: "alert-triangle" },
  { label: "PM Surya Ghar Target", value: "10M Homes", icon: "home" },
  { label: "Typical System IRR", value: "15-28%", icon: "percent" },
  { label: "Payback Period", value: "5-7 Years", icon: "clock" },
];

export const CAPITAL_FLOW_STEPS = [
  {
    step: 1,
    title: "Deposit USDC",
    description: "Global crypto investors deposit USDC into DePINFi pool on Solana",
    side: "crypto",
  },
  {
    step: 2,
    title: "Pool Funded",
    description: "Pool reaches target; smart contract locks deposits",
    side: "crypto",
  },
  {
    step: 3,
    title: "USDC → USD",
    description: "Offshore entity (Dubai/Singapore) converts USDC to USD via Circle",
    side: "bridge",
  },
  {
    step: 4,
    title: "USD → INR",
    description: "Wire to Indian SPV via banking channels with FIRC",
    side: "bridge",
  },
  {
    step: 5,
    title: "Install Solar",
    description: "SPV pays EPC partner; panels installed on host rooftop",
    side: "physical",
  },
  {
    step: 6,
    title: "Claim Subsidy",
    description: "Host claims PM Surya Ghar subsidy; transfers to SPV",
    side: "physical",
  },
  {
    step: 7,
    title: "Generate Power",
    description: "System commissioned; smart inverter tracks kWh generation",
    side: "physical",
  },
  {
    step: 8,
    title: "Collect Revenue",
    description: "Host pays SPV monthly via NACH auto-debit",
    side: "physical",
  },
  {
    step: 9,
    title: "Revenue → USDC",
    description: "SPV sends net revenue to offshore entity; converted to USDC",
    side: "bridge",
  },
  {
    step: 10,
    title: "Distribute Yield",
    description: "Smart contract distributes USDC pro-rata to pool participants",
    side: "crypto",
  },
];

export const PPA_TIERS = [
  { years: "1-5", rate: 4.5, note: "Peak performance period" },
  { years: "6-10", rate: 4.0, note: "Accounts for panel degradation" },
  { years: "11-15", rate: 3.5, note: "Capital recovered, host rewarded" },
  { years: "15+", rate: 0, note: "Ownership transfers to host. FREE electricity" },
];

export const HOST_SELECTION_CRITERIA = [
  "Monthly DISCOM bill above INR 3,000",
  "Owned property with clear title (15+ year roof rights)",
  "Daytime electricity usage pattern",
  "Unshaded, south-facing roof (300-400 sq ft minimum)",
  "NACH auto-debit mandate signed",
  "Security deposit of 2-3 months",
  "No history of utility payment defaults",
];

export const REVENUE_STREAMS = [
  { stream: "Origination Fee", rate: "2-3%", basis: "Capital raised per pool", scaling: "Linear with new cohorts" },
  { stream: "AUM Fee", rate: "1-2%", basis: "Annual on deployed capital", scaling: "Compounds as cohorts grow" },
  { stream: "Trading Fee Share", rate: "0.5%", basis: "All cohort token trades", scaling: "Scales with volume" },
  { stream: "Performance Fee", rate: "10-15%", basis: "Excess yield above target", scaling: "Upside capture" },
];

export const ROADMAP_PHASES: Array<{
  phase: number;
  title: string;
  months: string;
  items: string[];
  capital: string;
  status: "complete" | "active" | "upcoming";
}> = [
  {
    phase: 0,
    title: "Foundation",
    months: "0-1",
    items: [
      "Incorporate Indian SPV in Telangana",
      "Draft PPA & host agreements",
      "Partner with EPC installers",
      "Identify 3-5 pilot hosts",
    ],
    capital: "INR 1 lakh",
    status: "active" as const,
  },
  {
    phase: 1,
    title: "MVP Pilot",
    months: "1-3",
    items: [
      "Install 3-5 rooftop systems",
      "Build monitoring dashboard",
      "Validate unit economics (15-18% IRR)",
      "Prepare investor pitch data",
    ],
    capital: "INR 10-15 lakh",
    status: "upcoming" as const,
  },
  {
    phase: 2,
    title: "DePINFi Launch",
    months: "3-7",
    items: [
      "Offshore entity (Dubai/Singapore)",
      "Solana smart contracts + audit",
      "First DePINFi pool: $50K raise",
      "Switchboard oracle integration",
    ],
    capital: "USD 50-100K",
    status: "upcoming" as const,
  },
  {
    phase: 3,
    title: "Cohort Tokens",
    months: "7-12",
    items: [
      "Meteora DLMM cohort tokens",
      "Performance-linked buybacks",
      "50+ installations in Telangana",
      "Pre-seed: $200-500K",
    ],
    capital: "USD 200-500K",
    status: "upcoming" as const,
  },
  {
    phase: 4,
    title: "National Scale",
    months: "12-36",
    items: [
      "500+ installations, 5+ states",
      "Community solar & C&I projects",
      "Southeast Asia & Africa expansion",
      "Protocol governance token",
    ],
    capital: "USD 1-5M",
    status: "upcoming" as const,
  },
];

export const TECH_STACK = [
  { layer: "Blockchain", tech: "Solana (Anchor)", purpose: "Token issuance, vault logic, yield distribution" },
  { layer: "Token Standard", tech: "SPL Token-2022", purpose: "Transfer hooks, metadata" },
  { layer: "Liquidity", tech: "Meteora DLMM", purpose: "Cohort token trading" },
  { layer: "Oracles", tech: "Switchboard + Pyth", purpose: "Solar data + FX rates" },
  { layer: "Frontend", tech: "Next.js / React", purpose: "Investor & host dashboards" },
  { layer: "Smart Contracts", tech: "Anchor (Rust)", purpose: "Pool deposits, buybacks, yield" },
  { layer: "Telemetry", tech: "Inverter APIs", purpose: "Real-time kWh data" },
  { layer: "KYC/AML", tech: "Sumsub", purpose: "Investor verification" },
];

export const COMPETITORS = [
  { name: "Banks/NBFCs", yield: "N/A (loan interest 10-14%)", gap: "6-12 month approval, collateral required" },
  { name: "Traditional RESCO", yield: "14-18% project IRR", gap: "No investor access, opaque, no liquidity" },
  { name: "Tokenised Treasuries", yield: "3-6% APR", gap: "No physical asset, no ESG" },
  { name: "InvITs/REITs", yield: "8-12% APR", gap: "High minimums, slow settlement" },
  { name: "Dhoop (Us)", yield: "12-20% APR", gap: "Oracle-driven buybacks + DeFi liquidity", highlight: true },
];

export const ECOSYSTEM_PARTNERS = [
  {
    name: "DeCharge",
    role: "DePINFi pioneer. EV charging infra on Solana.",
    synergy: "Potential: Excess solar units from Dhoop rooftops power DeCharge EV stations, creating a solar-to-mobility energy loop.",
    url: "https://decharge.network",
  },
  {
    name: "GreenKWh",
    role: "Cooperative clean energy network. Solar-powered EV charging + battery storage.",
    synergy: "Potential: Dhoop rooftop generation feeds into GreenKWh's distributed energy grid for local EV charging and storage.",
    url: "https://greenkwh.net",
  },
];
