
import {useEffect, useState} from 'react'
import {EditPage} from '../notion';

function Table(props) {
    const CreateUpdateField = (name, field) =>
    {
        if(updateFields != undefined && updateFields[name] === true) {
            let props = field?.properties[name];
            let type = props?.type;
            let value = prompt(name, GetFieldAccess(name,field));
            var obj = {};
            if(value == null)
                return undefined;

            if(type == "rich_text")
            {
                obj[name] = { rich_text: [ { text: { content: value } } ] } // HAR INTE TESTATS
            }
            if(type == "title"){
                obj[name] = { title: [ { text: { content: value } } ] }
            }
            if(type == "select")
            {
                obj[name] = { select: { name: value } } // HAR INTE TESTATS
            }
            if(type == "number")
            {
                obj[name] = { number: parseInt(value) }
            }
            return obj;
        }
        return undefined;
    }

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

    let database = props.database;
    let fields = props.fields;
    let updateFields = props.updateFields;
    let invalidate = props.invalidate;

    useEffect(() => {
        let list = [];
        fields.forEach(element => {
            list.push({
                property: element,
                direction: "ascending"
            })
        });
        props.setSort(list);
    },[])

    function setSortOn(name)
    {
        var index = props.sort.findIndex((prop) => prop.property == name)
        var ascend = index != 0 || props.sort[index].direction == "descending";

        props.sort.splice(index, 1);
        props.sort.unshift({ property: name, direction: (ascend ? "ascending" : "descending") })
        let list = [...props.sort]; // Måste kopiera så att react fattar att det måste hämtas data
        props.setSort(list);
    }

    return (
        <table>
            <thead>
                <tr>
                    {fields.map(element => {

                        return (<th key={element} onClick={(e) => setSortOn(element)}>{element}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
            {
                props.database.map((field) => {
                    
                    return (<tr key={field.id}>
                        {fields.map(element => {
                            return (<td onClick={() => EditValue(element, field)} key={element}>{GetFieldAccess(element, field)}</td>)
                        })}
                    </tr>)
                })
            }
            
            </tbody>
        </table>
    )

    async function EditValue(element, field){
        var res = CreateUpdateField(element, field)
        if(res != undefined)
        {
            await EditPage(field.id, res);
            invalidate({});
        }
    }
}

export default Table;