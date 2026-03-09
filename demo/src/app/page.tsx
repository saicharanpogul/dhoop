"use client";

import { useState } from "react";
import type { Role } from "@/data/constants";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CapitalFlowSection from "@/components/CapitalFlowSection";
import RoleExperience from "@/components/RoleExperience";
import DashboardSection from "@/components/DashboardSection";
import RoadmapSection from "@/components/RoadmapSection";
import TechStackSection from "@/components/TechStackSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [role, setRole] = useState<Role>("investor");

  return (
    <main>
      <Navbar role={role} onRoleChange={setRole} />
      <HeroSection onRoleChange={setRole} />
      <ProblemSection />
      <CapitalFlowSection />
      <RoleExperience role={role} onRoleChange={setRole} />
      <DashboardSection />
      <RoadmapSection />
      <TechStackSection />
      <FooterSection />
    </main>
  );
}
