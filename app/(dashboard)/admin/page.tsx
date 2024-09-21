import NavbarAdmin from "@/components/NavbarAdmin";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

async function Dashboard() {
  //Get session in server component
  const session = await getServerSession(authOptions);
  console.log(session);

  return <div className="w-full">/Admin</div>;
  // if (session?.user) {
  //   return (
  //     <h2 className="text-2xl">
  //       Admin page - welcome back{" "}
  //       {session?.user.username === null
  //         ? session?.user.name
  //         : session?.user.username}
  //     </h2>
  //   );
  // }
  // return <h2 className="text-2xl">Please login to see this admin page</h2>;
}

export default Dashboard;
