import { GetServerSideProps } from 'next'
import * as React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { ProfileType } from '@/api/walletScan'
import MiniProfile from '@/components/profile/MiniProfile'

import { getWalletInfo } from '@/api/walletScan'
import { useRouter } from 'next/router'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Failed = () => {
	return (
		<section>
			<div className="flex flex-col items-center justify-center text-center layout">
				<div className="text-gray-600 text-normal">Failed to get profile 🥲</div>
			</div>
		</section>
	)
}

type UserProps = {
	walletAddress: string
}

export default function HoverOverlay({ walletAddress }: UserProps) {
	const [profile, setProfile] = React.useState<ProfileType>(null)
	const [loading, setLoading] = React.useState(true)
	const [failed, setFailed] = React.useState(false)

	const router = useRouter()

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => setMounted(true), [])

	let timeout // NodeJS.Timeout
	const timeoutDuration = 200

	const buttonRef = useRef(null) // useRef<HTMLButtonElement>(null)
	const [openState, setOpenState] = useState(false)

	const toggleMenu = open => {
		// log the current open state in React (toggle open state)
		setOpenState(openState => !openState)
		// toggle the menu by clicking on buttonRef
		buttonRef?.current?.click() // eslint-disable-line
	}

	// Open the menu after a delay of timeoutDuration
	const onHover = (open, action) => {
		// if the modal is currently closed, we need to open it
		// OR
		// if the modal is currently open, we need to close it
		if ((!open && !openState && action === 'onMouseEnter') || (open && openState && action === 'onMouseLeave')) {
			// clear the old timeout, if any
			clearTimeout(timeout)
			// open the modal after a timeout
			timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
		}
		// else: don't click! 😁
	}

	const handleClick = open => {
		setOpenState(!open) // toggle open state in React state
		clearTimeout(timeout) // stop the hover timer if it's running
	}

	const handleClickOutside = event => {
		if (buttonRef.current && !buttonRef.current.contains(event.target)) {
			event.stopPropagation()
		}
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	})

	React.useEffect(() => {
		const getProfile = async () => {
			if (walletAddress) {
				const resp = await getWalletInfo(walletAddress)
				if (resp) {
					setProfile(resp)
				} else {
					setFailed(true)
				}
				setLoading(false)
			}
		}
		getProfile()
	}, [walletAddress])

	if (!mounted) return null

	return (
		<div className="relative">
			<Popover className="relative">
				{({ open }) => (
					<div
					className='inline-block'
						onMouseEnter={() => onHover(open, 'onMouseEnter')}
						onMouseLeave={() => onHover(open, 'onMouseLeave')}
					>
						<Popover.Button ref={buttonRef} className="text-left outline-none">
							<span
								onClick={() => {
									router.push(`/user/${walletAddress}`)
								}}
								className="hover:underline"
							>
								{walletAddress}
							</span>
						</Popover.Button>

						<Transition
							show={open}
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel static className="absolute z-50 p-4 bg-white rounded-md shadow-md cursor-default">
								{loading && 'Loading...'}
								{!loading && <div>{!failed ? <MiniProfile profile={profile} /> : <Failed />}</div>}
							</Popover.Panel>
						</Transition>
					</div>
				)}
			</Popover>
		</div>
	)
}
