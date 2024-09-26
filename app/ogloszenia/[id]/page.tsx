import { db } from "@/lib/db";
import Image from "next/image";
import React, { useState } from "react";
import walletIcon from "../../../public/assets/icons/wallet.png";
import locationIcon from "../../../public/assets/icons/location.png";
import Link from "next/link";

interface AnnouncementPageProps {
  params: {
    id: string;
  };
}

interface AnnouncementPageDetails {
  id: number;
  title: string;
  salary: string;
  image: string;
  description: string;
  location: string;
}

const AnnouncementPage = async (props: AnnouncementPageProps) => {
  let announcementsUnique: AnnouncementPageDetails | null =
    await db.announcement.findUnique({
      where: {
        id: parseInt(props.params.id),
      },
    });
  if (announcementsUnique === null) {
    announcementsUnique = {
      id: 0,
      title: "",
      salary: "",
      image: "",
      description: "",
      location: "",
    };
  }

  return (
    <>
      <div className="bg-white p-8 flex items-center justify-center text-black">
        <div className="bg-slate-100 p-4 w-3/5 rounded-xl flex flex-col">
          <div className="py-4 flex">
            <h3 className="text-3xl w-full">{announcementsUnique?.title}</h3>
            <Link
              href={`/ogloszenia/${props.params.id}/aplication`}
              className="font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
            >
              Aplikuj
            </Link>
          </div>
          <hr className="border-white border-[2px]" />
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <Image
                src={walletIcon}
                height={32}
                width={32}
                alt="wallet-icon"
              />
              <div className="flex flex-col items-start justify-center">
                <h5 className="uppercase text-sm">Wynagrodzenie</h5>
                <h4 className="font-bold">
                  {announcementsUnique?.salary} zł brutto / h
                </h4>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src={locationIcon}
                height={32}
                width={32}
                alt="location-icon"
              />
              <div className="flex flex-col items-start justify-center">
                <h5 className="uppercase text-sm">Lokalizacja</h5>
                <h4 className="font-bold">{announcementsUnique?.location}</h4>
              </div>
            </div>
          </div>
          <hr className="border-white border-[2px]" />
          <div
            className="py-4"
            dangerouslySetInnerHTML={{
              __html: announcementsUnique.description,
            }}
          />
          {/* <p className="py-4">{description}</p> */}
          <hr className="border-white border-[2px]" />
          <div className="pb-4 pt-8 flex items-center justify-center">
            <Link
              href={`/ogloszenia/${props.params.id}/aplication`}
              className="font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
            >
              Aplikuj
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementPage;
