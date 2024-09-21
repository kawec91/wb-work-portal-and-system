import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserDataProps {
  id: string;
  username: string | null;
  createdAt: string;
  updatedAt: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string;
  role: string;
}

const AdminUsers = async () => {
  const usersData: UserDataProps[] = await fetch(
    `${process.env.NEXTAPP_URL}/api/users`
  ).then((res) => res.json());
  console.log("us", usersData);
  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh_-_150px)] justify-start">
      <Table>
        <TableCaption>Lista użytkowników</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nr</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="text-right">Comming soon</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
