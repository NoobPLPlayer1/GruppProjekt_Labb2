import Table from "./Table";
import {useEffect, useState} from 'react'
import { QueryDatabase } from '../notion'

function SearchTable(props) {

    const [database, setDatabase] = useState([]);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState(undefined);
    const [sort, setSort] = useState(undefined);
    const [status, setStatus] = useState("All");
    const [user, setUser] = useState("All");
    const [users, setUsers] = useState([]);
    const [timereports, setTimereports] = useState([]);

    /*function setUsers(list)
    {
        var map = [];
        list.forEach((item) => {
            map[item.id] = item;
        })
        setUsersRaw(map)
    }/**/

    function setStatusFilter(status)
    {
        if(status == "All")
        {
            setFilter(undefined);
        }
        else
        {
            setFilter({ property:"Status", select: { equals: status } });
        }
        setStatus(status);
    }
    async function setUserFilter(user)
    {
        setUser(user);
        filterUsers();
    }

    async function filterUsers(){
        var items = [];
        database.forEach((row) => {
            var result = false;
            var selectedUser = null;
            if(user != "All") {
                users.forEach((item) => { // Hämtar id med persons namn
                    if(item.properties.Name.title[0].plain_text == user){
                        selectedUser = item.id;
                    }
                })
                timereports.forEach((report) => { // Kollar om det finns någon tidsrapportering som innehåller både person och projekt
                    if(row.id == report.properties.Project.relation[0].id && (selectedUser == report.properties.Person.relation[0].id || selectedUser == "All"))
                    {
                        result = true;
                    }
                })
            }
            else{
                result = true;
            }
            if(result){
                items.push(row);
            }
        });
        setItems(items);
    }
    
    useEffect(() => {
        
        async function GetData(){
            await QueryDatabase("8acace5aa128437da75c516327908aca", undefined, undefined, setTimereports);
            await QueryDatabase("b7a24c0cba3f4582a6b24cd4548feeaa", undefined, undefined, setUsers);
            await QueryDatabase(props.database, filter, sort, setDatabase);
            
        }
        GetData();
    }, [filter, sort])
    useEffect(() => {
        filterUsers();
    }, [user])


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
                    onChange={(e) => setUserFilter(e.target.value)}
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