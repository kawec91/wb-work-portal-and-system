"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AnnouncementAdminCardProps {
  data: {
    id: number;
    title: string;
    salary: string;
    image: string;
    description: string;
    location: string;
  };
}

const AnnouncementAdminCard = ({ data }: AnnouncementAdminCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleDelete = async (announcementId: number) => {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/announcement/delete?id=${announcementId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Announcement deleted successfully.");
        // Optionally, trigger any further actions like refreshing the list
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to delete announcement.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the announcement.");
    } finally {
      setIsDeleting(false);
      router.push("http://localhost:3000/admin");
    }
  };
  return (
    <div
      key={`admin-an-${data.id}`}
      className="w-full flex items-center justify-between border border-black p-4 rounded-md"
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <h4 className="text-2xl">{data.title}</h4>
          <p className="text-md text-gray-400">{data.location}</p>
        </div>
        <div>{data.salary} PLN BRUTTO/H</div>
      </div>
      <div className="ml-12">
        {message && <p>{message}</p>}
        <button
          key={`btn-${data.id}`}
          disabled={isDeleting}
          onClick={() => handleDelete(data.id)}
        >
          {isDeleting ? "Usuwanie..." : "Usuń"}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementAdminCard;
