import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import ReportsAdminStatCard from "@/components/ReportsAdminStatCard";
import AplicationAdminStatCard from "@/components/AplicationAdminStatCard";
import WorkersAdminStatCard from "@/components/WorkersAdminStatCard";
import UsersAdminStatCard from "@/components/UsersAdminStatCard";
import AnnouncementsAdminStatCard from "@/components/AnnouncementsAdminStatCard";

async function Dashboard() {
  //Get session in server component
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[calc(100vh_-_100px)] p-4">
      <div className="w-full flex items-center justify-between flex-wrap">
        <UsersAdminStatCard icon="/assets/icons/users.png" text="Użytkownicy" />
        <WorkersAdminStatCard
          icon="/assets/icons/worker.png"
          text="Pracownicy"
        />
        <AnnouncementsAdminStatCard
          icon="/assets/icons/doc.png"
          text="Ogłoszenia"
        />

        <AplicationAdminStatCard
          icon="/assets/icons/paper.png"
          text="Aplikacje"
        />
        <ReportsAdminStatCard icon="/assets/icons/reports.png" text="Raporty" />
      </div>
    </div>
  );
}

export default Dashboard;
