import 'tailwindcss/tailwind.css'
import { APP_NAME } from '@/lib/consts'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import CurrentUserProvider from '@/components/providers/CurrentUserProvider'
import ChatProvider from '@/components/providers/ChatProvider'

import { Toaster } from 'react-hot-toast'

import LayoutHeader from '@/components/layout/LayoutHeader'

const { chains, provider } = configureChains(
	// [chain.mainnet],
	[chain.localhost],
	[apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<CurrentUserProvider>
					<ChatProvider>
						<LayoutHeader>
							<Toaster position="bottom-right" reverseOrder={false} />
							<Component {...pageProps} />
						</LayoutHeader>
					</ChatProvider>
				</CurrentUserProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default App
