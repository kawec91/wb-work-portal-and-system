"use client";

import AnnouncementCard from "@/components/AnnouncementCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface announcementsDataProps {
  id: number;
  title: string;
  salary: string;
  image: string;
  description: string;
  location: string;
}

export default function Home() {
  const [announcementsDbList, setAnnouncementsDbList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const myData = await fetch(
        `http://localhost:3000/api/announcements`
      ).then((res) => res.json());
      setAnnouncementsDbList(myData);
    };
    getData();
  }, []);
  return (
    <div className="w-full min-h-[calc(100vh_-_150px)] flex justify-center items-center flex-wrap gap-10">
      <div>
        {announcementsDbList.map((item: announcementsDataProps) => (
          <AnnouncementCard data={item} key={`home-ac-${item.id}`} />
        ))}
      </div>
    </div>
  );
}
