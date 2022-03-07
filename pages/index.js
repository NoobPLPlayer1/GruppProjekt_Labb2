import { Client } from "@notionhq/client";
import { useEffect } from 'react';
import Table from "./components/Table"; './components/Table.js'
const projectsId = "cdae3ce226d44c21b810c95c6e86aa0c";
const peopleId = "b7a24c0cba3f4582a6b24cd4548feeaa";
const timereportId = "8acace5aa128437da75c516327908aca";


export default function Home({ results }) {

    useEffect(() => {
        console.log(results);
    })


    const getTidRapportColNames = () => {
        const colNames = [];

        /*for (var key in results[0].properties) {
            console.log(key);
            console.log(results[0].properties[key].id);
        }*/



        Object.keys(results[0].properties).forEach(function (key) {

            colNames.push(
                <th className="col" key={results[0].properties[key].id}>
                    {key}
                </th>
            );

        });
        return colNames;
    };

    const getTidRapportEnteries = () => {
        const enteries= [];



        return enteries;
    };
    return (
        <div>
            <Table 
            fields={["Projectname", "Status", "Hours", "Worked hours", "Hours left", "Timespan", "Timereports"]} 
            pages = {{}}
            database = {results} />

            {/*<table>
                <tbody>
                    <tr>
                        {getTidRapportColNames()}
                    </tr>
                    <tr>

                    </tr>
                </tbody>
            </table>
            */}
        </div>
    )
}

export async function getStaticProps() {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
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