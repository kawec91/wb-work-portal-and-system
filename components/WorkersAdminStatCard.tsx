"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingSpiner from "./LoadingSpiner";

interface WorkersAdminStatCardProps {
  icon: string;
  text: string;
}

const WorkersAdminStatCard = ({ icon, text }: WorkersAdminStatCardProps) => {
  const [isLoading, setLoading] = useState(false);
  const [noWorkers, setNoWorkers] = useState(0);
  useEffect(() => {
    const getServerData = async () => {
      setLoading(true);
      try {
        const data = await fetch(`http://localhost:3000/api/users`).then(
          (res) => res.json()
        );
        if (data) {
          let counter = 0;
          for (const i of data) {
            if (i.role === "admin" || i.role === "user") {
              counter += 1;
            }
          }
          setNoWorkers(counter);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getServerData();
  }, []);
  return (
    <div className="h-24 w-32 flex items-center justify-between shadow shadow-current rounded-tr-md rounded-br-md">
      <div
        className={`h-full w-2 bg-green-500 border-t-[1px] border-green-500`}
      ></div>
      <div className="flex flex-col items-center justify-center border-t-[1px] border-b-[1px] border-r-[1px] border-gray-400 h-24 w-full rounded-tr-md rounded-br-md">
        <div className="flex justify-center items-center gap-2 py-2">
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <>
              <div>
                <Image src={icon} height={36} width={36} alt="stat-icon" />{" "}
              </div>
              <div className="text-3xl">{noWorkers}</div>
            </>
          )}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default WorkersAdminStatCard;
