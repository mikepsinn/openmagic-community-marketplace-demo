import * as React from 'react'

export default function Writings({ mirror }) {
	return (
		<div>
			<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
				<p>Total Articles: {mirror.length}</p>
			</div>
			{mirror.length > 0 && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{mirror.map(article => (
						<a
							href={`https://viewblock.io/arweave/tx/${article}`}
							key={article}
							className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm"
						>
							<div className="flex-shrink-0">
								{/* <img className="w-10 h-10 rounded-full" src={poap.event.image_url} alt="" /> */}
							</div>
							<div className="flex-1 min-w-0">
								<div className="focus:outline-none">
									<span className="absolute inset-0" aria-hidden="true" />
									<p className="text-sm font-medium text-gray-900">
										{article || <span className="text-gray-500">No Name</span>}
									</p>
									{/* <p className="text-sm text-gray-500 truncate">{poap.event.description}</p> */}
								</div>
							</div>
						</a>
					))}
				</div>
			)}
		</div>
	)
}
