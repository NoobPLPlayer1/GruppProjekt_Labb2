import {useState, useEffect} from 'react'
import SearchTable from './components/SearchTable';
import Timereport from "./components/Timereport"; './components/Timereport.js'
import TimeChart from "./components/TimeChart"; './components/TimeChart.js'
import { notion, projectsId } from './notion';

export default function Home({ CurrentUser, SetCurrentUser, results }) {
    return <ManageHome results={results} CurrentUser={CurrentUser} />
}



function ManageHome({ results, CurrentUser }){ // Huvudsidan
    return (
        <div>

            <SearchTable fields={["Projectname", "Status", "Hours", "Worked hours", "Hours left", "Timespan"]} updateFields={{ Hours: true, Projectname: true }} CurrentUser={CurrentUser} />
            <Timereport props={{ results: results, user: CurrentUser }} />
            <TimeChart props={{ results: results, user: CurrentUser }} />
            
        </div>
    )
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