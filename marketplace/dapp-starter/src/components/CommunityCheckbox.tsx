import * as React from 'react'

export default function CommunityCheckbox({ title, image }) {
	return (
		<div className="flex items-center mt-4">
			<div className="flex items-center h-5">
				<input
					id={title}
					name={title}
					type="checkbox"
					className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
				/>
			</div>
			<div className="ml-3 text-sm">
				<label htmlFor={title} className="flex items-center space-x-2 font-medium text-gray-700">
					{image && <img className="w-6 h-6 rounded-full" src={image} alt="" />}
					<p>{title}</p>
				</label>
			</div>
		</div>
	)
}

// <div
// 	key={dao.name}
// 	className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm"
// >
// 	<div className="flex-shrink-0">
// 		<img className="w-10 h-10 rounded-full" src={dao.image} alt="" />
// 	</div>
// 	<div className="flex-1 min-w-0">
// 		<div className="focus:outline-none">
// 			<span className="absolute inset-0" aria-hidden="true" />
// 			<p className="text-sm font-medium text-gray-900">
// 				{dao.name || <span className="text-gray-600">No Name</span>}
// 			</p>
// 			<p className="text-sm text-gray-500 truncate">{dao.address}</p>
// 		</div>
// 	</div>
// </div>
