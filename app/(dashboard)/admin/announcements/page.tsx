import AnnouncementCard from "@/components/AnnouncementCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface announcementsDataProps {
  id: number;
  title: string;
  salary: string;
  image: string;
  description: string;
  location: string;
}

const AdminAnnouncements = async () => {
  const announcementsData = await fetch(
    `http://localhost:3000/api/announcements`
  ).then((res) => res.json());

  return (
    <div className="min-h-[calc(100vh_-_150px)] flex flex-col justify-start">
      <div className="w-full text-right p-2 border-b-[1px] border-black">
        <Link className={buttonVariants()} href={"/admin/announcements/new"}>
          Nowe ogłoszenie
        </Link>
      </div>
      <div className="p-2 h-full">
        {announcementsData.map((item: announcementsDataProps) => {
          <AnnouncementCard data={item} key={`ac-${item.id}`} />;
        })}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
