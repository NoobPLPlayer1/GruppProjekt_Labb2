
import {useEffect, useState} from 'react'

function Table(props) {

    const GetFieldAccess = (name, field) =>
    {
        let props = field?.properties[name];
        let type = props?.type;
        if(type == "rich_text")
        {
            return props.rich_text[0].plain_text;
        }
        if(type == "title"){
            return props.title[0].plain_text;
        }
        if(type == "rollup")
        {
            return props.rollup.number;
        }
        if(type == "formula")
        {
            return props.formula.number;
        }
        if(type == "select")
        {
            return props.select.name;
        }
        if(type == "number")
        {
            return props.number;
        }
        if(type == "date")
        {
            var start = props.date.start;
            var end = props.date.end;
            if(start && end){
                return start + " until " + end;
            }
            else if(start){
                return start
            }
            else if(end){
                return end
            }
        }
        if(type == "relation")
        {

            return "Relation";
        }
        return "Unknown";
    }

    const [database, setDatabase] = useState([]);
    let fields = props.fields;

    useEffect(() => {
        async function GetDatabase(){
            const res = await fetch('http://localhost:3000/api/get', {
                method: 'POST',
                credentials:'include',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    database: props.database,
                    filter: props.filter,
                    sort: props.sort,
                })
            });
            var result = await res.json();

            if (res.status === 201) {
                setDatabase(result);
                console.log("ok");
            } else {
                console.log("rip");
            }
        }
        console.log("sendit");
        GetDatabase();

    },[props.filter])


    return (
        <table>
            <thead>
                <tr>
                    {fields.map(element => {

                        return (<th key={element}>{element}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
            {
                database.map((field) => {


                    return (<tr>
                        {fields.map(element => {
                            return (<td key={element}>{GetFieldAccess(element, field)}</td>)
                        })}
                    </tr>)
                })
            }
            
            </tbody>
        </table>
    )
}

export default Table;