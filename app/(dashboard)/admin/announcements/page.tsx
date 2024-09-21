import React from "react";

const AdminAnnouncements = async () => {
  const announcementsData = await fetch(
    `${process.env.NEXTAPP_URL}/api/announcements`
  ).then((res) => res.json());

  if (announcementsData.message) {
    return <div className="text-center">{announcementsData.message}</div>;
  }
  return <div>/admin/announcements</div>;
};

export default AdminAnnouncements;
