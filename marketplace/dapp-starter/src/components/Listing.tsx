/* eslint-disable @next/next/no-img-element */
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import { ShieldCheckIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import LoadMiniProfile from './LoadMiniProfile'

const product = {
	name: 'Everyday Ruck Snack',
	href: '#',
	price: '$220',
  seller: "kesslykaes.eth",
	description:
		"Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
	imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
	imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
	breadcrumbs: [
		{ id: 1, name: 'Travel', href: '#' },
		{ id: 2, name: 'Bags', href: '#' },
	],
	sizes: [
		{ name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
		{ name: '20L', description: 'Enough room for a serious amount of snacks.' },
	],
}
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Listing() {
	const router = useRouter()

	return (
		<div className="bg-white">
			<div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
				{/* Product details */}
				<div className="lg:max-w-lg lg:self-end">
					<div className="mb-6">
						<button
							onClick={() => {
								router.push('/')
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-4">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							{product.name}
						</h1>
					</div>

					<section aria-labelledby="information-heading" className="mt-4">
						<h2 id="information-heading" className="sr-only">
							Product information
						</h2>

						<div className="flex items-center">
							<p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>
						</div>

						<div className="mt-4 space-y-6">
							<p className="text-base text-gray-500">{product.description}</p>
						</div>

						<div className="flex items-center mt-6">
              <LoadMiniProfile walletAddress={product.seller} />
						</div>
					</section>
				</div>

				{/* Product image */}
				<div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
					<div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
						<img
							src={product.imageSrc}
							alt={product.imageAlt}
							className="object-cover object-center w-full h-full"
						/>
					</div>
				</div>

				{/* Product form */}
				<div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
					<section aria-labelledby="options-heading">
						<form>
							<div className="mt-10">
								<button
									type="submit"
									className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
								>
									Buy Now
								</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		</div>
	)
}
