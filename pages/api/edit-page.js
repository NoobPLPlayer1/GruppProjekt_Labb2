// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const timereportId = "8acace5aa128437da75c516327908aca";
import { Client } from "@notionhq/client";
import { cors } from '../cors.js'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
    
    await cors(req, res)

    if (req.method !== 'PATCH') {
        return res
            .status(405)
            .json({ message: `${req.method} requests are not allowed` });
    }

    try {
        const { page, props } = req.body;
        await notion.pages.update({
            page_id: page,
            properties: props,
        });
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}