// import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/styles.css';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import type { Session } from "next-auth"
import Layout from '../components/layout/layout';

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}