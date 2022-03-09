
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

    useEffect(()=> {

    }, [props.database])

    let database = props.database;
    let fields = props.fields;

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
                props.database.map((field) => {
                    return (<tr key={field.id}>
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