import {ChakraProvider} from '@chakra-ui/react';
import {AuthProvider} from '@/lib/auth';
import theme from '@/styles/theme';
import {css, Global} from '@emotion/react';
import Head from 'next/head';

const GlobalStyle = ({children}) => {
	return (
		<>
			<Head>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
			</Head>

			<Global
				styles={css`
					html {
						scroll-behavior: smooth;
					}
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
					}
				`}
			/>
			{children}
		</>
	);
};

function MyApp({Component, pageProps}) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<GlobalStyle />
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
