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

        var { date, hour, project, user, note } = JSON.parse(req.body); //here i catch everything from form

        await notion.pages.create({ //here i update the timereport table according to data submitted
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
                        id: project
                    },
                    ],
                },
                Person: {

                    relation: [{
                        id: user
                    },
                    ],
                },

                Note: {
                    title: [{
                        type: "text",
                        text: {
                            content: note
                        },
                    }],
                },
            },

        });
        res.status(201).json({ msg: 'Success' });
    } catch (error) {
        res.status(500).json({ msg: 'There was an error' });
    }
}