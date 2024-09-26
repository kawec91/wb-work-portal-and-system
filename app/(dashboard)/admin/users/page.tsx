"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import MyTableRow from "@/components/MyTableRow";

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

const AdminUsers = () => {
  const [usersData, setUsersData] = useState<UserDataProps[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [newRole, setNewRole] = useState("");
  const handleEdit = (elementId: string) => {
    const con = document.getElementById(`role-select-${elementId}`);
    console.log(con);
    if (editMode === false) {
      setEditMode(true);
    }

    if (editMode === true) {
      setEditMode(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const serverData = await fetch(`http://localhost:3000/api/users`).then(
        (res) => res.json()
      );

      console.log("us", serverData);
      setUsersData(serverData);
    };
    getData();
  }, []);
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
            <MyTableRow item={item} no={i} key={`mtr-${item.username}`} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
