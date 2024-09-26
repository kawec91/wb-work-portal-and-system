import Image from "next/image";
import React from "react";

interface ReportsAdminStatCardProps {
  icon: string;
  text: string;
}

const ReportsAdminStatCard = ({ icon, text }: ReportsAdminStatCardProps) => {
  return (
    <div className="h-24 w-32 flex items-center justify-between shadow shadow-current rounded-tr-md rounded-br-md">
      <div
        className={`h-full w-2 bg-yellow-400 border-t-[1px] border-yellow-400`}
      ></div>
      <div className="flex flex-col items-center justify-center border-t-[1px] border-b-[1px] border-r-[1px] border-gray-400 h-24 w-full rounded-tr-md rounded-br-md">
        <div className="flex justify-center items-center gap-2 py-2">
          <div>
            <Image src={icon} height={36} width={36} alt="stat-icon" />{" "}
          </div>
          <div className="text-3xl">1000</div>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default ReportsAdminStatCard;
