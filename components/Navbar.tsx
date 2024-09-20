import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNavbar from "./UserAccountNavbar";

async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 w-full flex justify-between items-center h-16 bg-slate-200 text-black px-4">
      <Link href={"/"}>White Bull</Link>
      {session?.user ? (
        <UserAccountNavbar />
      ) : (
        <Link className={buttonVariants()} href={"/signin"}>
          Logowanie
        </Link>
      )}
    </div>
  );
}

export default Navbar;
