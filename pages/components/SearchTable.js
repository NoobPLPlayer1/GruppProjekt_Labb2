import Table from "./Table";
import {useEffect, useState} from 'react'
import { QueryDatabase } from '../notion'

function SearchTable(props) {
    const [database, setDatabase] = useState([]); // Hämtade projekt
    const [items, setItems] = useState([]); // Projekt som visas
    const [filter, setFilter] = useState(undefined); // Filter som användes när vi hämtade projekt (undefined = inget filter)
    const [sort, setSort] = useState(undefined); // Sorteringen som användes när vi hämtade projekt (undefined = ingen sorteringen)
    const [status, setStatus] = useState("All"); // Användarens valda status
    const [user, setUser] = useState("All"); // Användarens valda användare
    const [users, setUsers] = useState([]); // Hämtade giltiga användare
    const [timereports, setTimereports] = useState([]); // Hämtade tidsrapporteringar

    function setStatusFilter(status)
    {
        if(status == "All") // Hoppa över status filter
        {
            setFilter(undefined);
        }
        else // Filtrerar på status
        {
            setFilter({ property:"Status", select: { equals: status } }); 
        }
        setStatus(status);
        filterUsers();
    }

    async function filterUsers(){
        var items = [];
        database.forEach((row) => { // Kollar för varje hämtat projekt
            var result = false;
            var selectedUser = null;
            if(user != "All") // Om all är selected så hoppar vi över checken
            { 
                users.forEach((item) => { // Hämtar id med persons namn
                    if(item.properties.Name.title[0].plain_text == user){
                        selectedUser = item.id;
                    }
                })
                timereports.forEach((report) => { // Kollar om det finns någon tidsrapportering som innehåller både person och projekt
                    if(report.properties.Project.relation.length > 0 && row.id == report.properties.Project.relation[0].id && (report.properties.Person.relation.length > 0 && selectedUser == report.properties.Person.relation[0].id || selectedUser == "All"))
                    {
                        console.log(report.properties.Person);
                        result = true;
                    }
                })
            }
            else{
                result = true;
            }
            if(result) // Om Projektet bör visas lägger vi till det i 'items'
            {
                items.push(row);
            }
        });
        setItems(items);
    }
    
    useEffect( // Körs varje gång då antingen filter eller sortering ändras
    () => {
        
        async function GetData(){
            // 'Promise.all()' väntar på att alla 'QueryDatabase's ska bli klar
            await Promise.all([
                QueryDatabase("8acace5aa128437da75c516327908aca", undefined, undefined, setTimereports),
                QueryDatabase("b7a24c0cba3f4582a6b24cd4548feeaa", undefined, undefined, setUsers),
                QueryDatabase(props.database, filter, sort, setDatabase)
            ]);
            
        }
        GetData();
    }, [filter, sort])
    useEffect( // Körs varje gång då antingen användare eller projekt hämtas
    () => {
        filterUsers();
    }, [user, database])


    return (
        <div>
            <form>
                <label htmlFor="status">Show Status: </label>
                <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >

                    <option value="All">
                        All
                    </option>
                    <option value="Done">
                        Done
                    </option>
                    <option value="Active">
                        Active
                    </option>
                    <option value="Next up">
                        Next up
                    </option>
                </select>
            </form>
            <form>
                <label htmlFor="user">Show User: </label>
                <select
                    name="user"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                >
                    <option value="All">
                        All
                    </option>
                    {users.map((user) => {
                        return <option>{user.properties.Name.title[0].plain_text}</option>
                    })}
                </select>
            </form>
            {<Table fields={props.fields} database={items} filter={filter} />}
        </div>
    )
}

export default SearchTable;