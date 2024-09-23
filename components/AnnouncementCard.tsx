import Link from "next/link";
import React from "react";
interface AnnouncementCardProps {
  data: {
    id: number;
    title: string;
    salary: string;
    image: string;
    description: string;
    location: string;
  };
}
const AnnouncementCard = ({ data }: AnnouncementCardProps) => {
  return (
    <Link href={`/ogloszenia/${data.id}`}>
      <div className="h-12 w-12 bg-slate-200"></div>
    </Link>
  );
};

export default AnnouncementCard;
