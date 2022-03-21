import { Client } from "@notionhq/client";
export const projectsId = "cdae3ce226d44c21b810c95c6e86aa0c";
export const peopleId = "b7a24c0cba3f4582a6b24cd4548feeaa";
export const timereportId = "8acace5aa128437da75c516327908aca";
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
        console.log(database);
        console.log(filter);
        console.log(sort);
        console.log(result);
    }
}

export async function EditPage(page, props){
    const res = await fetch('http://localhost:3000/api/edit-page', {
        method: 'PATCH',
        credentials:'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            page: page,
            props: props,
        })
    });

    if (res.status === 201) {
        console.log("Success");
    } else {
        console.log("rip");
    }
}