import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { Provider } from 'react-redux'

import AuthProvider from './AuthProvider/AuthProvider'
import { TypeComponentAuthFields } from './AuthProvider/auth.types'
import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'
import Layout from '@/components/layout/Layout'
import { store } from '@/store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
export default MainProvider
