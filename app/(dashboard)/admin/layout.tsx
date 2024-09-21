import NavbarAdmin from "@/components/NavbarAdmin";
import { ReactNode } from "react";
interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="w-full text-white flex items-center">
      <div className="w-1/6">
        <NavbarAdmin />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
