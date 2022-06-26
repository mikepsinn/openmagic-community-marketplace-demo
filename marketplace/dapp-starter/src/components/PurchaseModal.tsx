/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import { acceptItem } from '@/api/web3/contract'
import useCurrentUser from '@/hooks/useCurrentUser';

import truncateEthAddress from 'truncate-eth-address'

import { toast } from "react-hot-toast";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function PurchaseModal({ open, setOpen, listing }) {
	const [address, setAddress] = useState('')
	const currentUser = useCurrentUser()

	const handlePurchase = async () => {
		if (currentUser.address) {
			toast("Confirm transaction in Metamask");
			await acceptItem(currentUser.address, listing.id, listing.price);
			toast.success("Successfully Purchased! 🎉");
			location.reload();
		}
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
							enterTo="opacity-100 translate-y-0 md:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 md:scale-100"
							leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
						>
							<Dialog.Panel className="flex w-full text-base text-left transition transform md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
								<div className="relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
									<button
										type="button"
										className="absolute text-gray-400 top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close</span>
										<XIcon className="w-6 h-6" aria-hidden="true" />
									</button>

									<div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
										<div className="sm:col-span-4 lg:col-span-5">
											<div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1">
												<img src={listing.imageSrc} className="object-cover object-center" />
											</div>
										</div>
										<div className="sm:col-span-8 lg:col-span-7">
											<h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
												{listing.title}
											</h2>

											<section aria-labelledby="information-heading" className="mt-3">
												<h3 id="information-heading" className="sr-only">
													Product information
												</h3>

												<p className="text-2xl text-gray-900">${listing.price}</p>

												<div className="mt-6">
													<h4 className="sr-only">Description</h4>

													<p className="text-sm text-gray-700">{listing.description}</p>
												</div>
											</section>

											<section aria-labelledby="options-heading" className="mt-6">
												<div className="col-span-6 sm:col-span-4">
													<label
														htmlFor="about"
														className="block text-sm font-medium text-gray-700"
													>
														Address
													</label>
													<div className="mt-1">
														<textarea
															id="about"
															name="about"
															rows={3}
															className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															value={address}
															onChange={event => {
																setAddress(event.target.value)
															}}
														/>
														<span className="text-sm text-gray-600">
															Your address will be encrypted with{' '}
															{truncateEthAddress(listing.seller)}`s public key. Only{' '}
															{truncateEthAddress(listing.seller)} will be able to see
															your address.
														</span>
													</div>
												</div>
												<div className="mt-6">
													<button
														type="submit"
														className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none"
														onClick={handlePurchase}
													>
														Purchase
													</button>
												</div>
											</section>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
