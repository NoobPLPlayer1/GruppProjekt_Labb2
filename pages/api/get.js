// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const timereportId = "8acace5aa128437da75c516327908aca";
import { Client } from "@notionhq/client";
import { cors } from './cors.js'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
    let method = req.method;

    await cors(req, res)

    if (method !== 'POST') {
        return res
            .status(405)
            .json({ message: `${method} requests are not allowed` });
    }
    try {
        const { database, filter, sort } = req.body;
        const response = await notion.databases.query({
            database_id: database,
            filter: filter,
            sort: sort,
        });
        res.status(201).json(response.results);
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}