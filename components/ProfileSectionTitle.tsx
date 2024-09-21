import React from "react";

interface ProfileSectionTitleProps {
  title: string;
}

const ProfileSectionTitle = ({ title }: ProfileSectionTitleProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-1/4 py-4">
        <hr className="border-[2px] border-white" />
      </div>
      <h4 className="font-bold text-xl uppercase text-center">{title}</h4>
      <div className="w-1/4 py-4">
        <hr className="border-[2px] border-white" />
      </div>
    </div>
  );
};

export default ProfileSectionTitle;
