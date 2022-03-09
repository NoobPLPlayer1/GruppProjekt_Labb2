// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const timereportId = "8acace5aa128437da75c516327908aca";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: `${req.method} requests are not allowed` });
    }

    try {

        const { date, hour, project } = JSON.parse(req.body);

        let projectid;
        switch (project) {
            case "My first project":
                projectid = "496bdaf8-bdce-49b3-a131-ce9d77463236";
                break;
            case "Another project":
                projectid = "3fb461b3-3ac1-41da-864f-80dfe27e1ec5";
                break;
            case "The best project":
                projectid = "3b31c901-c596-4df9-80ef-1c5cb1453efa";
                break;
        }
        await notion.pages.create({
            parent: {

                database_id: timereportId,

            },

            properties: {
                Date: {

                    date: {
                        start: date
                    },

                },
                Hours: {
                    number: ~~hour
                },

                Project: {

                    relation: [{
                        id: projectid,
                    },
                    ],
                },
            },

        });
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}