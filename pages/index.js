import {useState, useEffect} from 'react'
import { QueryDatabase } from './notion'
import SearchTable from './components/SearchTable';
import Form from "./components/Form"; './components/Form.js'
import { notion, projectsId } from './notion';


export default function Home({ CurrentUser, SetCurrentUser, results }) {
    return  <>{ (CurrentUser == "Signed out" ? <LoginHome SetCurrentUser={SetCurrentUser}/> : <ManageHome results={results} CurrentUser={CurrentUser} />) }</>
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
                    return <option key={user.id} value={user.properties.Name.title[0].plain_text}>{user.properties.Name.title[0].plain_text}</option>
                })}
            </select>
        </form>
    </div>)
}

function ManageHome({ results, CurrentUser }){ // Huvudsidan
    return <div>
        <SearchTable fields={["Projectname", "Status", "Hours", "Worked hours", "Hours left", "Timespan"]} CurrentUser={CurrentUser} />
        <Form props={results} /> 
    </div>
}

export async function getServerSideProps() {
    
    const databaseId = projectsId;
    const response = await notion.databases.query({
        database_id: databaseId,

    });
    
    //console.log(response);
    return {
        props: {
            results: response.results,
            
        },
    };

}