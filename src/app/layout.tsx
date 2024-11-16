import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/context/Context'

import Nav from '@/components/navigation/Nav'

import { fetchData } from '@/app/lib/utils/actions'

import './globals.css'
import SmoothScroll from './lib/scroll-provider'
import Lenis from './lib/scroll-provider'
import { Toaster } from './components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })
export type Album = {
	name: string
	path: string
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { results, usage } = await fetchData()

	return (
		<ThemeProvider>
			<html lang="en">
				<body id="body" className={inter.className}>
					<div className="flex">
						<Nav rootFolders={results} usage={usage} />
					</div>
					<div className="flex h-screen w-screen justify-center overflow-scroll">
						{children}
						<Toaster />
					</div>
				</body>
			</html>
		</ThemeProvider>
	)
}
