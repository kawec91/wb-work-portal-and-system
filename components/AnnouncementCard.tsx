import Image from "next/image";
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
      <div className="rounded-md relative h-[300px] w-60 border border-white-[5px]">
        <Image
          src={`${data.image}`}
          alt="announcement-image"
          width={240}
          height={240}
          className="rounded-md object-contain"
        />
        <div className="top-1/2 -translate-y-1/2 left-0 absolute w-full text-center bg-black/75 p-2 z-30">
          {data.title}
          <hr className="my-2" />
          <p className="text-center">Więcej...</p>
        </div>
        <div className="bg-white p-[2px] rounded-full absolute -bottom-[22px] -left-8">
          <div className="w-full bg-black h-full rounded-full py-2 px-4">
            {data.salary} zł brutto/h
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
