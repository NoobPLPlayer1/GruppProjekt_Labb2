const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/* Log databases
Name: title
Comment: BUHh
Status: ~H=x
Created By: g~QH
Last Edited By: CBl
*//*
async function getDatabase(){
    const res = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID });
    console.log(res);
}
getDatabase();/**/

const Name = 'title';
const Status = '~H=x';
const Comment = 'BUHh';
const CreatedBy = 'g~QH';
const LastEditBy = '{CBl';

function notionPropertiesById(props){
    return Object.values(props).reduce((obj, prop) => {
        const { id, ...rest } = prop;
        return { ...obj, [id]: rest };
    })
}

async function getSuggestions(){
    const notionPages = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        sorts: [{
            property: Status, 
            direction: "descending"
        }]
    })

    return notionPages.results.map(fromNotionObject);
}

function fromNotionObject(notionPage) {
    const propertiesByID = notionPropertiesById(notionPage.properties);
    console.log(propertiesByID);

    return {
        id: notionPage.id,
        title: propertiesByID[Name].title[0].plain_text,
        status: propertiesByID[Status].select.name,
        comment: propertiesByID.rich_text[0].text.content,
        created_by: propertiesByID[CreatedBy].created_by.name,
        last_edited_by: propertiesByID[LastEditBy].last_edited_by.name,
    }
}

module.exports = {
    getSuggestions,
}