import * as React from 'react'
import Iframe from 'react-iframe'
import truncateEthAddress from 'truncate-eth-address'

export default function Chat({ address, showChat, setShowChat, hide, setHide }) {

	if (!showChat) return null

	return (
		<div
			onClick={() => {
				setHide(curHide => !curHide)
			}}
			className="fixed bottom-0 overflow-hidden bg-green-800 shadow-md cursor-default rounded-t-md right-10"
		>
			<div className="flex justify-between p-4 text-white">
				<div>{truncateEthAddress(address)}</div>
				<button
					onClick={e => {
						e.preventDefault()
						e.stopPropagation()
						setShowChat(false)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div className={hide && 'hidden'}>
				<Iframe
					url={`http://localhost:3001/dm/${address}`}
					width="450px"
					height="550px"
					display="block"
					position="relative"
				/>
			</div>
			{hide && <div className="flex w-72"></div>}
		</div>
	)
}
