import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNavbar from "./UserAccountNavbar";
import { db } from "@/lib/db";

async function Navbar() {
  const session = await getServerSession(authOptions);
  const myUser = await db.user.findUnique({
    where: {
      email: session?.user.email ? session?.user.email : "",
    },
  });

  return (
    <div className="fixed top-0 w-full flex justify-between items-center h-16 bg-slate-200 text-black px-4">
      <Link href={"/"}>White Bull</Link>
      {session?.user ? (
        <div className="flex items-center gap-4">
          {myUser?.role === "admin" ? (
            <Link href={"/admin"}>Admin Panel</Link>
          ) : (
            <></>
          )}
          <Link href={"/profile"}>Profil</Link>
          <UserAccountNavbar />
        </div>
      ) : (
        <Link className={buttonVariants()} href={"/signin"}>
          Logowanie
        </Link>
      )}
    </div>
  );
}

export default Navbar;
