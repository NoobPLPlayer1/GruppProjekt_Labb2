import '../styles/globals.css'
import Layout from './components/Layout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { QueryDatabase } from './notion'


function MyApp({ Component, pageProps }) {
    const [currentUser, setCurrentUser] = useState("Signed out"); // Hämtade giltiga användare
    useEffect( // Körs varje gång då antingen användare ändras
        () => {
        }, [currentUser])
    return (<>{
        (currentUser == "Signed out" ? 
            <Layout>
                <Head>
                    <meta charSet='utf-8' />
                    <title>KoalaManager</title>
                </Head>


                <LoginHome CurrentUser={currentUser} SetCurrentUser={setCurrentUser} />

            </Layout> :
                <Layout>
                <Head>
                    <meta charSet='utf-8' />
                    <title>KoalaManager</title>
                </Head>


                <Component {...pageProps} CurrentUser={currentUser} SetCurrentUser={setCurrentUser} />

            </Layout>)} 
            </>)
}

function LoginHome({ CurrentUser, SetCurrentUser }){ // Login sidan
    const [users, setUsers] = useState([]); // Hämtade giltiga användare
    
    useEffect( // Körs när sidan laddas
        () => {

            async function GetData() {
                // 'Promise.all()' väntar på att alla 'QueryDatabase's ska bli klar
                await Promise.all([
                    QueryDatabase("b7a24c0cba3f4582a6b24cd4548feeaa", undefined, undefined, setUsers)
                ]);

            }
            GetData();
        }, [])
    
    return (
    <div>
        <h2>Login</h2>
        <form>
            <label htmlFor="user">User </label>
            <select
                name="user"
                id="user"
                onChange={(e) => { SetCurrentUser(e.target.value); }}
            >
                <option value={"Signed out"}>
                    Signed out
                </option>
                    {users.map((user) => {
                        
                        return <option key={user.id} value={user.id}>{user.properties.Name.title[0].plain_text}</option>
                        
                   
                })}
            </select>
        </form>
    </div>)
}

export default MyApp
