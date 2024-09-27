"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface MyTableRowProps {
  item: {
    id: string;
    username: string | null;
    createdAt: string;
    updatedAt: string;
    name: string | null;
    email: string;
    emailVerified: string | null;
    image: string;
    role: string;
  };
  no: number;
}

const MyTableRow = ({ item, no }: MyTableRowProps) => {
  const [oldRole, setOldRole] = useState(item.role);
  const [newRole, setNewRole] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setNewRole(oldRole);
    if (editMode === false) {
      console.log(newRole);
      setEditMode(true);
    }

    if (editMode === true) {
      setOldRole(newRole);
      setEditMode(false);
    }
  };
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{no + 1}</TableCell>
      <TableCell>{item.name === null ? item.username : item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>
        <select
          id={`role-select-${item.id}`}
          name="role"
          defaultValue={"Wybierz..."}
          onChange={(e) => setNewRole(e.target.value)}
          disabled={!editMode}
          value={oldRole}
        >
          <option value={"admin"}>Administrator</option>
          <option value={"user"}>Pracownik</option>
          <option value={"member"}>Użytkownik</option>
        </select>
      </TableCell>
      <TableCell className="text-right">
        {item.role === "admin" ? (
          "---"
        ) : (
          <>
            <button className="text-black" onClick={() => handleEdit()}>
              {editMode ? "Zapisz" : "Edytuj"}
            </button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MyTableRow;
