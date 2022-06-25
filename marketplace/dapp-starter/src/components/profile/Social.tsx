import * as React from 'react'
import ProfileImage from './ProfileImage'

export default function Social({ lens, profile }) {
	if (lens.length == 0) {
		return <div className="my-4 text-sm font-medium text-gray-500">No Socials Connected</div>
	}

	return (
		<div>
      <div className='flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500'>
  <p>
    Connected Socials: {lens.length}
  </p>
  </div>

			{lens.map(len => (
				<div key={len.id} className="p-4 my-4 bg-white border rounded">
					<a
						className="text-sm font-medium "
						style={{ color: '#00501E' }}
						href={`https://www.lensfrens.xyz/${len.handle}`}
					>
						Lens Profile ↗
					</a>
          <div className="flex items-center space-x-5">
				<div className="flex-shrink-0 mt-2">
					<div className="relative">
						<ProfileImage profile={profile} small={false} />
						<span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
					</div>
				</div>
				<div>
        <h1 className="text-2xl font-bold text-gray-900">{len.name}</h1>
					<p className="text-sm font-medium text-gray-500">@{len.handle}</p>
					<p>{len.bio}</p>
				</div>
			</div>
					<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
						<p>
							<b>{len.totalFollowers || 0}</b> followers
						</p>
						<p>
							<b>{len.totalFollowers || 0}</b> following
						</p>
						<p>
							<b>{len.totalPosts || 0}</b> posts
						</p>
						<p>
							<b>{len.totalComments || 0}</b> comments
						</p>
						<p>
							<b>{len.totalCollects || 0}</b> collects
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

