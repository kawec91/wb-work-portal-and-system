"use client";

import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function UserAccountNavbar() {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/signin`,
        })
      }
      variant="destructive"
    >
      Wyloguj
    </Button>
  );
}

export default UserAccountNavbar;
