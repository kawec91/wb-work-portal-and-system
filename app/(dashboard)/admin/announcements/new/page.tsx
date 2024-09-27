import NewAnnouncementForm from "@/components/form/NewAnnouncementForm";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NewAnnouncementsPage = () => {
  return (
    <div className="min-h-[calc(100vh_-_150px)] flex flex-col justify-start ">
      <div className="w-full text-right p-2 border-b-[1px] border-black">
        <Link className={buttonVariants()} href={"/admin/announcements"}>
          Powrót
        </Link>
      </div>
      <div className="flex items-center justify-center w-full p-2">
        <NewAnnouncementForm />
      </div>
    </div>
  );
};

export default NewAnnouncementsPage;
