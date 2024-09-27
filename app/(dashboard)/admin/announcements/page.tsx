"use client";

import AnnouncementAdminCard from "@/components/AnnouncementAdminCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface announcementsDataPropsAdmim {
  id: number;
  title: string;
  salary: string;
  image: string;
  description: string;
  location: string;
}

const AdminAnnouncements = () => {
  const [announcementsDbListAdmin, setAnnouncementsDbListAdmin] = useState([]);
  useEffect(() => {
    const serverData = async () => {
      const myData = await fetch(
        `http://localhost:3000/api/announcements`
      ).then((res) => res.json());

      setAnnouncementsDbListAdmin(myData);
    };
    serverData();
  }, []);
  return (
    <div className="min-h-[calc(100vh_-_150px)] flex flex-col justify-start">
      <div className="w-full text-right p-2 border-b-[1px] border-black">
        <Link className={buttonVariants()} href={"/admin/announcements/new"}>
          Nowe ogłoszenie
        </Link>
      </div>
      <div className="p-2 h-full w-full flex flex-col items-center text-black gap-4">
        {announcementsDbListAdmin.map((ann: announcementsDataPropsAdmim) => (
          <AnnouncementAdminCard data={ann} key={`${ann.id}-ann-adm-card`} />
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
