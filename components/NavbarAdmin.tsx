"use client";

import React, { useState } from "react";
import NavbarAdminItem from "./NavbarAdminItem";

interface menuListItemParams {
  name: string;
  link: string;
}

function NavbarAdmin() {
  const [chosenMenu, setChosenMenu] = useState("Dashboard");
  const menuList: menuListItemParams[] = [
    {
      name: "Dashboard",
      link: "/admin",
    },
    {
      name: "Użytkownicy",
      link: "/admin/users",
    },
    {
      name: "Ogłoszenia",
      link: "/admin/announcements",
    },
    {
      name: "Aplikacje",
      link: "/admin/aplications",
    },
    {
      name: "Raporty",
      link: "/admin/raports",
    },
  ];

  const handleMenuChoice = (name: any) => {
    setChosenMenu(name);
  };
  return (
    <div className="min-h-[calc(100vh_-_150px)] w-full text-white py-2 px-4 flex flex-col gap-4">
      {menuList.map((item) => (
        <button
          key={`unique-id-${item.name}`}
          onClick={() => handleMenuChoice(item.name)}
        >
          <NavbarAdminItem data={item} chosenItem={chosenMenu} />
        </button>
      ))}
    </div>
  );
}

export default NavbarAdmin;
