import 'tailwindcss/tailwind.css'
import { APP_NAME } from '@/lib/consts'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import CurrentUserProvider from '@/components/providers/CurrentUserProvider';

import LayoutHeader from '@/components/layout/LayoutHeader'

const localhost = {
	id: 31337, name: "Localhost", network: "localhost",
	rpcUrls: {
		default: "http://127.0.0.1:8545"
	}
};
const { chains, provider } = configureChains(
	// [chain.mainnet],
	[localhost],
	[apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<CurrentUserProvider>
					<LayoutHeader>
						<Component {...pageProps} />
					</LayoutHeader>
				</CurrentUserProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default App
