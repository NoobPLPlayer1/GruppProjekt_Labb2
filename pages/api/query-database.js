import { cors } from '../cors.js'
import { notion } from '../notion';

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
            sorts: sort,
        });
        res.status(201).json(response.results); 
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}
