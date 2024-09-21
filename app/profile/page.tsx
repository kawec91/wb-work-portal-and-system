import ProfileSectionTitle from "@/components/ProfileSectionTitle";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full flex flex-col items-center">
      <ProfileSectionTitle title="Profil" />
      {session?.user ? (
        <>
          <Image
            src={session?.user.image ? session?.user.image : ""}
            alt="profile-image"
            width={256}
            height={256}
            className="rounded-full"
          />
          <h1 className="text-3xl pt-4">
            {session?.user.name ? session?.user.name : ""}
          </h1>
        </>
      ) : (
        <></>
      )}

      <ProfileSectionTitle title="Dokumenty" />

      <ProfileSectionTitle title="Moje rekrutacje" />
    </div>
  );
};

export default ProfilePage;
