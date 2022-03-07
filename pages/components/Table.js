
function Table(props) {

    const GetFieldAccess = (name, field) =>
    {
        let props = field.properties[name];
        let type = props.type;
        console.log(props);
        if(type == "rich_text")
        {
            return props["rich_text"]["0"]["plain_text"];
        }
        if(type == "title"){
            return props["title"]["0"]["plain_text"];
        }
        if(type == "rollup")
        {
            return props["rollup"]["number"];
        }
        if(type == "formula")
        {
            return props["formula"]["number"];
        }
        if(type == "select")
        {
            return props["select"]["name"];
        }
        if(type == "number")
        {
            return props["number"];
        }
        if(type == "date")
        {
            return props["start"];
        }
        if(type == "relation")
        {

            return "Relation";
        }
        return "Unknown";
    }


    return (
        <table>
            <thead>
                <tr>
                    {props.fields.map(element => {

                        return (<th key={element}>{element}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
            {
                props.database.map((field) => {


                    return (<tr>
                        {props.fields.map(element => {

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