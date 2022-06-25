/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import { ShieldCheckIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import LoadMiniProfile from './LoadMiniProfile'


import Chat from './Chat'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Listing({ listing }) {
	const [showChat, setShowChat] = useState(false)
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
							{listing.title}
						</h1>
					</div>

					<section aria-labelledby="information-heading" className="mt-4">
						<h2 id="information-heading" className="sr-only">
							Product information
						</h2>

						<div className="flex items-center">
							<p className="text-lg text-gray-900 sm:text-xl">{listing.price}</p>
						</div>

						<div className="mt-4 space-y-6">
							<p className="text-base text-gray-500">{listing.description}</p>
						</div>

						<div className="flex items-center mt-6">
							<LoadMiniProfile walletAddress={listing.seller} />
						</div>

						<div className="mt-4 space-y-6">
							{listing.communities.length > 0 && (
								<div className="mt-1 text-base">
									<span className="text-gray-500">This listing is only for members of</span>{' '}
									<span className="text-blue-500">
										{listing.communities.map(community => (
											<span key={community.name}>{community.name}</span>
										))}
									</span>
								</div>
							)}
						</div>
					</section>
				</div>

				{/* Product image */}
				<div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
					<div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
						<img src={listing.imageSrc} className="object-cover object-center w-full h-full" />
					</div>
				</div>

				{/* Product form */}
				<div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
					<section aria-labelledby="options-heading">
						<div className="flex mt-10 space-x-2">
							<button
								onClick={() => {
									setShowChat(true)
								}}
								className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-gray-300 border border-transparent rounded-md hover:bg-gray-400 focus:outline-none"
							>
								Message
							</button>
							<button className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none">
								Buy Now
							</button>
						</div>
					</section>
				</div>
			</div>
			<Chat address={listing.seller} showChat={showChat} setShowChat={setShowChat} />
		</div>
	)
}
