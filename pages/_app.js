import '../styles/globals.css'
import Layout from './components/Layout'
import Head from 'next/head'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
    const [currentUser, setCurrentUser] = useState("Signed out"); // Hämtade giltiga användare
    useEffect( // Körs varje gång då antingen användare ändras
        () => {
        }, [currentUser])
    return (
        <Layout>
            <Head>
                <meta charSet='utf-8' />
                <title>KoalaManager</title>
            </Head>


            <Component {...pageProps} CurrentUser={currentUser} SetCurrentUser={setCurrentUser} />

        </Layout>)
}

export default MyApp
