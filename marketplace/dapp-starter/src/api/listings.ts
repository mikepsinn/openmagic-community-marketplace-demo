export type listingType = {
  // data stored on blockchain
  id: string;
  seller: string;
  isOpen: boolean;

  // data stored in IPFS metadata
  title: string;
  price: string;
  description: string;
  imageSrc: string;
  listPublicly: boolean;
  communities: any[];
  timestamp: number
}

export type listingTypeDeprecated = {
  id: number;
  title: string;
  price: string;
  description: string;
  seller: string;
  imageSrc: string;
  listPublicly: boolean;
  communities: any[];
  listed: number
}

export const listings = <listingTypeDeprecated[]> [
  {
    id: 1,
    title: 'Leather Long Wallet',
    price: '$75',
    description: "this is a test description",
    seller: "0x9B82cffDc1B8a3c79de7Ea0f2dF7733F31A6A060",
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    listPublicly: true,
    communities: [{ name: "PlantDAO"}],
    listed: 1656174140,
  },
  {
    id: 2,
    title: 'Leather Long Wallet',
    price: '$75',
    description: "this is a test description",
    seller: "kesslykaes.eth",
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    listPublicly: true,
    communities: [],
    listed: 1656174140,
  },
]