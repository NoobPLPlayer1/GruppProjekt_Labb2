import { useEffect } from 'react';
import Table from "./components/Table"; './components/Table.js'
import SearchTable from './components/SearchTable';
import Form from "./components/Form"; './components/Form.js'
import { useState } from "react";
import { notion } from './notion';
const projectsId = "cdae3ce226d44c21b810c95c6e86aa0c";
const peopleId = "b7a24c0cba3f4582a6b24cd4548feeaa";
const timereportId = "8acace5aa128437da75c516327908aca";


export default function Home({ results }) {

   
    return (
        <div>

            <SearchTable fields={["Projectname", "Status", "Hours", "Worked hours", "Hours left", "Timespan"]} database={projectsId} />
            <Form props={results} />
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