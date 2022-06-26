/* eslint-disable @next/next/no-img-element */
import React from 'react';

type AssetImageType = {
  image: string | undefined;
};

const AssetImage = ({
  image,
}: AssetImageType) => {

  if (!image) {
    return (
      <span className={`inline-block rounded-full overflow-hidden bg-gray-100 w-10 h-10`}>
    </span>
    );
  }
  return (
    <img
      src={image}
      alt=''
      className="w-10 h-10 rounded-full"
    />
  );
};

export default AssetImage;
