import Image from "next/image";
import React from "react";

const LoadingSpiner = () => {
  return (
    <div className="animate-spin">
      <Image
        src={"/assets/icons/spiner.png"}
        height={32}
        width={32}
        alt="spiner-icon"
      />
    </div>
  );
};

export default LoadingSpiner;
