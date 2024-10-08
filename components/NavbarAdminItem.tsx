import Link from "next/link";
import React from "react";

interface NavbarAdminItemProps {
  data: {
    name: string;
    link: string;
  };
  chosenItem: string;
}

const NavbarAdminItem = ({ data, chosenItem }: NavbarAdminItemProps) => {
  return (
    <Link
      href={data.link}
      className={`flex items-center justify-start cursor-pointer rounded-md ${
        chosenItem === data.name
          ? "border border-blue-500 text-blue-500"
          : "border border-gray-400 text-gray-400"
      }  py-4`}
    >
      <div
        className={`w-2 h-6 rounded-tr-xl rounded-br-xl mr-2 ${
          chosenItem === data.name ? "bg-blue-500" : "bg-gray-400"
        }`}
      ></div>
      <div>{data.name}</div>
    </Link>
  );
};

export default NavbarAdminItem;
