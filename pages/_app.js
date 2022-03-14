import '../styles/globals.css'
import Layout from './components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <Layout>

            <Head>
                <meta charSet='utf-8' />
                <title>KoalaManager</title>
            </Head>


            <Component {...pageProps} />

        </Layout>

        
        )
}

export default MyApp
