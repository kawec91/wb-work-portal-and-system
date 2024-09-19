import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center h-16 bg-slate-200 text-black px-4">
      <Link href={"/"}>White Bull</Link>
      <Link className={buttonVariants()} href={"/signin"}>
        Logowanie
      </Link>
    </div>
  );
}

export default Navbar;
