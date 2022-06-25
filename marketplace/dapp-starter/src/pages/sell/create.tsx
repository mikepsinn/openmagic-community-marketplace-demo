/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Create() {
	return (
		<>
			<div className="bg-gray-50">
				<div className="flex items-center justify-between max-w-md px-4 py-10 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
					<div className="p-4 ">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Create Listing</h3>
									<p className="mt-1 text-sm text-gray-600">
										This information will be displayed publicly so be careful what you share.
									</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<form action="#" method="POST">
									<div className="shadow sm:rounded-md sm:overflow-hidden">
										<div className="px-4 py-5 space-y-6 bg-white sm:p-6">
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
														placeholder="you@example.com"
														defaultValue={''}
													/>
												</div>
											</div>
											<div className="col-span-6 sm:col-span-4">
												<label
													htmlFor="email-address"
													className="block text-sm font-medium text-gray-700"
												>
													Email address
												</label>
												<input
													type="text"
													name="email-address"
													id="email-address"
													autoComplete="email"
													className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												/>
											</div>
											<div className="col-span-6 sm:col-span-4">
												<label
													htmlFor="email-address"
													className="block text-sm font-medium text-gray-700"
												>
													Email address
												</label>
												<input
													type="text"
													name="email-address"
													id="email-address"
													autoComplete="email"
													className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700">Photo</label>
												<div className="flex items-center mt-1">
													<span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
														<svg
															className="w-full h-full text-gray-300"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
														</svg>
													</span>
													<button
														type="button"
														className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													>
														Change
													</button>
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700">
													Cover photo
												</label>
												<div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
													<div className="space-y-1 text-center">
														<svg
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
																/>
															</label>
															<p className="pl-1">or drag and drop</p>
														</div>
														<p className="text-xs text-gray-500">
															PNG, JPG, GIF up to 10MB
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
											<button
												type="submit"
												className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Save
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
