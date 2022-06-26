/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProfileType } from '@/api/walletScan';
import { getProfileImage } from "@/lib/profile";

type ProfileImageType = {
  profile: ProfileType;
  small: boolean;
};

const ProfileImage = ({
  profile,
  small = false,
}: ProfileImageType) => {
  const profileImage = getProfileImage(profile);

  if (!profileImage) {
    return (
      <span className={`inline-block rounded-full overflow-hidden bg-gray-100 ` + (small ? 'w-10 h-10' : 'w-20 h-20')}>
      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
    );
  }
  return (
    <img
      src={profileImage}
      alt='profile image'
      className={'rounded-full object-cover ' + (small ? 'w-10 h-10' : ' w-20 h-20')}
    />
  );
};

export default ProfileImage;
