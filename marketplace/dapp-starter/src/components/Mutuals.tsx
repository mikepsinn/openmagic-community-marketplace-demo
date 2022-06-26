/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function Mutuals(mutuals) {
	return (
		<div className="flex items-center mt-4 mb-2 space-x-2 ">
			<div className="flex -space-x-1 overflow-hidden">
				{mutuals?.mutuals?.mutualDaos?.map(dao => (
					<img
						key={dao.name}
						className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
						src={dao.image}
					/>
				))}
				{mutuals?.mutuals?.mutualCollections?.map(collection => (
					<img
						key={collection.name}
						className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
						src={collection.image_url}
					/>
				))}
				{mutuals?.mutuals?.mutualPoaps?.map(poap => (
					<img
						key={poap.event.name}
						className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
						src={poap.event.image_url}
					/>
				))}
			</div>
			<div className="text-sm font-medium text-gray-500">
				{mutuals?.mutuals?.mutualDaos?.length +
					mutuals?.mutuals?.mutualCollections?.length +
					mutuals?.mutuals?.mutualPoaps?.length}{' '}
				Communities in common
			</div>
		</div>
	)
}
