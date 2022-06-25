/* eslint-disable @next/next/no-img-element */

import HoverOverlay from "./HoverOverlay"

const products = [
  {
    id: 1,
    name: 'Leather Long Wallet',
    seller: "kesslykaes.eth",
    price: '$75',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 2,
    name: 'Leather Long Wallet',
    seller: "kesslykaes.eth",
    price: '$75',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 3,
    name: 'Leather Long Wallet',
    seller: "kesslykaes.eth",
    price: '$75',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-01.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 4,
    name: 'Leather Long Wallet',
    seller: "kesslykaes.eth",
    price: '$75',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 5,
    name: 'Leather Long Wallet',
    seller: "kesslykaes.eth",
    price: '$75',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  // More products...
]

export default function Listings() {
  return (
    <div className="bg-white">
      <div>

        <div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <div className="w-full h-56 overflow-hidden bg-gray-200 rounded-md hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center w-full h-full cursor-pointer"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a>
                  {product.name}
                </a>
              </h3>
              <div className="mt-1 text-sm text-gray-500 cursor-pointer"><HoverOverlay walletAddress={product.seller} /></div>
              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
