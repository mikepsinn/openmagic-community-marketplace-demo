/* eslint-disable @next/next/no-img-element */
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