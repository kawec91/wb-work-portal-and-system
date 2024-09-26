import NavbarAdmin from "@/components/NavbarAdmin";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await getServerSession();
  const myUser = await db.user.findUnique({
    where: {
      email: session?.user.email ? session?.user.email : "",
    },
  });
  return (
    <>
      {myUser?.role === "admin" ? (
        <div className="w-full text-black flex items-center bg-white">
          <div className="w-1/6">
            <NavbarAdmin />
          </div>
          <div className="w-full ">{children}</div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          You are not an Admin. Access reject.
        </div>
      )}
    </>
  );
};

export default AdminLayout;
