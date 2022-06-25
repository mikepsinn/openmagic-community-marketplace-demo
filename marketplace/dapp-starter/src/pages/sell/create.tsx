/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useRouter } from 'next/router'

import Communities from '@/components/Communities'
import useCurrentUser from '@/hooks/useCurrentUser'

import { readImageFromIPFS, uploadImageToIPFS } from "@/api/web3/ipfs";
import { listItem } from "@/api/web3/contract";

export default function Create() {
	const router = useRouter()
	const currentUser = useCurrentUser()

	const [title, setTitle] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [imageSrc, setImageSrc] = useState<string>('');
	const [imageSrcUrl, setImageSrcUrl] = useState<string>('')
	const [listPublic, setListPublic] = useState(false);

	const handleImageUpload = async (file) => {
		const imageCID = await uploadImageToIPFS(file);
		setImageSrc(imageCID);
		const imageUrlIPFS = await readImageFromIPFS(imageCID);
		setImageSrcUrl(imageUrlIPFS);
	}

	const handleSubmit = async () => {
		if (currentUser) {
			const metadata = {
				title,
				price,
				description,
				imageSrc,
				listPublicly: true,
				communities: [],
				timestamp: Math.floor(Date.now() / 1000),
			}

			await listItem(currentUser.address, metadata)
		}
	}

	return (
		<>
			<div className="pb-10 bg-gray-50">
				<div className="flex items-center justify-between max-w-md px-4 py-10 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
					<div className="">
						<div className="mb-6">
							<button
								onClick={() => {
									router.push('/sell')
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
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Create Listing</h3>
									<p className="mt-1 text-sm text-gray-600">
										Create a listing that everyone can see, or only people who are in your
										communities.
									</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								{/* <form method="POST"> */}
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="px-4 py-5 space-y-6 bg-white sm:p-6">
										<div className="col-span-6 sm:col-span-4">
											<label htmlFor="title" className="block text-sm font-medium text-gray-700">
												Title
											</label>
											<input
												type="text"
												name="title"
												id="title"
												value={title}
												onChange={event => {
													setTitle(event.target.value)
												}}
												className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>
										<div className="col-span-6 sm:col-span-4">
											<label htmlFor="price" className="block text-sm font-medium text-gray-700">
												Price
											</label>
											<input
												type="text"
												name="price"
												id="price"
												value={price}
												onChange={event => {
													setPrice(event.target.value)
												}}
												className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>
										<div>
											<label htmlFor="about" className="block text-sm font-medium text-gray-700">
												Description
											</label>
											<div className="mt-1">
												<textarea
													id="about"
													name="about"
													rows={3}
													className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													value={description}
													onChange={event => {
														setDescription(event.target.value)
													}}
												/>
											</div>
											<div>
												<label
													htmlFor="about"
													className="block text-sm font-medium text-gray-700"
												>
													Description
												</label>
												<div className="mt-1">
													<textarea
														id="about"
														name="about"
														rows={3}
														className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
														value={description}
														onChange={(event) => {setDescription(event.target.value)}}
													/>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700">
													Photos
												</label>
												<div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
													<div className="space-y-1 text-center">
														{ 
															!imageSrcUrl && <svg
																className="w-12 h-12 mx-auto text-gray-400"
																stroke="currentColor"
																fill="none"
																viewBox="0 0 48 48"
																aria-hidden="true"
															>
																<path
																	d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
																	strokeWidth={2}
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														}
														<div className="flex text-sm text-gray-600">
															<label
																htmlFor="file-upload"
																className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
															>
																<span>Upload a file</span>
																<input
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	className="sr-only"
																	onChange={(e) => handleImageUpload(e.target.files[0])}
																/>
															</label>
															<p className="pl-1">or drag and drop</p>
														</div>
														<p className="text-xs text-gray-500">
															PNG, JPG, GIF up to 10MB
														</p>
														{imageSrcUrl && <img src={imageSrcUrl}></img>}
													</div>
													<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
												</div>
											</div>
										</div>
									</div>
									<div className="px-4 py-5 space-y-6 bg-gray-50 sm:p-6">
										<div>
											<p className="block text-sm font-medium text-gray-700">List Publicly</p>
											<div className="flex items-start mt-4">
												<div className="flex items-center h-5">
													<input
														id="public"
														name="public"
														type="checkbox"
														checked={listPublic}
														className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
														onChange={() => setListPublic(!listPublic)}
													/>
												</div>
												<div className="ml-3 text-sm">
													<label htmlFor="public" className="font-medium text-gray-700">
														Public Listing
													</label>
													<p className="text-gray-500">
														Anyone can view and place an offer on your posting.
													</p>
												</div>
											</div>
										</div>
										{!listPublic && (
											<div>
												<p className="block text-sm font-medium text-gray-700">
													List to your Communities
												</p>
												{currentUser && <Communities profile={currentUser} />}
											</div>
										)}
									</div>
									<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
										<button
											className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none"
											onClick={handleSubmit}
										>
											Publish
										</button>
									</div>
								</div>
								{/* </form> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
