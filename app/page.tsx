import AnnouncementCard from "@/components/AnnouncementCard";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface announcementsDataProps {
  id: number;
  title: string;
  salary: string;
  image: string;
  description: string;
  location: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const announcementsDbList = await fetch(
    `http://localhost:3000/api/announcements`
  ).then((res) => res.json());
  console.log("HOME", announcementsDbList);
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl"> Home </h1>
      <Link className={buttonVariants()} href={"/admin"}>
        Open Admin
      </Link>
      <div>
        {announcementsDbList.map((item: announcementsDataProps) => (
          <AnnouncementCard data={item} key={`home-ac-${item.id}`} />
        ))}
      </div>
    </div>
  );
}
