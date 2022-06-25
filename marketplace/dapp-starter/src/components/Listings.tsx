/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router"
import HoverOverlay from "./HoverOverlay"


export default function Listings({ listings }) {
  const router = useRouter();
  return (
    <div className="bg-white">
      <div>

        <div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
          {listings.map((listing) => (
            <div key={listing.id} className="relative" onClick={() => router.push(`/listing/${listing.id}`)}>
              <div className="w-full h-56 overflow-hidden bg-gray-200 rounded-md hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={listing.imageSrc}
                  className="object-cover object-center w-full h-full cursor-pointer"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a>
                  {listing.title}
                </a>
              </h3>
              <div className="mt-1 text-sm text-gray-500"><HoverOverlay walletAddress={listing.seller} /></div>
              <p className="mt-1 text-sm font-medium text-gray-900">{listing.price}</p>
              { listing.communities.length > 0 && 
              <div className="mt-1 text-sm">
                <span className="text-gray-500">Only for members of</span> {' '}
                <span className="text-blue-500">
                {listing.communities.map(community => (
                  <span key={community.name}>
                    {community.name}
                  </span>
                ))}
                </span>
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
