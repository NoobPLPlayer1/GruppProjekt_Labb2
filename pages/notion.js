
import { Client } from "@notionhq/client";
export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function QueryDatabase(database, filter, sort, callback){
    const res = await fetch('http://localhost:3000/api/query-database', {
        method: 'POST',
        credentials:'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            database: database,
            filter: filter,
            sort: sort,
        })
    });
    var result = await res.json();

    if (res.status === 201) {
        callback(result);
    } else {
        console.log("rip");
    }
}