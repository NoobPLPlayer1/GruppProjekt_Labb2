import Table from "./Table";
import { useEffect, useState } from 'react'
import { QueryDatabase, projectsId, peopleId, timereportId } from '../notion'

function SearchTable({fields, updateFields, CurrentUser}) {
    const [wasInvalidated, invalidate] = useState({});
    const [database, setProjects] = useState([]); // Hämtade projekt
    const [items, setItems] = useState([]); // Projekt som visas
    const [filter, setFilter] = useState(undefined); // Filter som användes när vi hämtade projekt (undefined = inget filter)
    const [sort, setSort] = useState(undefined); // Sorteringen som användes när vi hämtade projekt (undefined = ingen sorteringen)
    const [status, setStatus] = useState("All"); // Användarens valda status
    const [user, setUser] = useState("Me"); // Användarens valda användare
    const [users, setUsers] = useState([]); // Hämtade giltiga användare
    const [timereports, setTimereports] = useState([]); // Hämtade tidsrapporteringar

    var userNames = {};

    function setStatusFilter(status) {
        if (status == "All") // Hoppa över status filter
        {
            setFilter(undefined);
        }
        else // Filtrerar på status
        {
            setFilter({ property: "Status", select: { equals: status } });
        }
        setStatus(status);
        filterUsers();
    }

    async function filterUsers() {
        var items = [];
        var currentUser = user == "Me" ? CurrentUser : user;
        database.forEach((row) => { // Kollar för varje hämtat projekt
            var result = false;

            if (currentUser != "All") // Om all är selected så hoppar vi över checken
            {
                timereports.forEach((report) => { // Kollar om det finns någon tidsrapportering som innehåller både person och projekt
                    if (report.properties.Project.relation.length > 0 && row.id == report.properties.Project.relation[0].id && (report.properties.Person.relation.length > 0 && currentUser == report.properties.Person.relation[0].id)) {
                        result = true;
                    }
                })
            }
            else {
                result = true;
            }
            if (result) // Om Projektet bör visas lägger vi till det i 'items'
            {
                items.push(row);
            }
        });
        setItems(items);
    }

    useEffect( // Körs varje gång då antingen filter eller sortering ändras
        () => {

            async function GetData() {
                // 'Promise.all()' väntar på att alla 'QueryDatabase's ska bli klar
                await Promise.all([
                    QueryDatabase(timereportId, undefined, undefined, setTimereports),
                    QueryDatabase(peopleId, undefined, undefined, setUsers),
                    QueryDatabase(projectsId, filter, sort, setProjects)
                ]);
                users.forEach((p) => {
                    userNames[p.id] = p.properties.Name.title[0].plain_text;
                })
            }
            GetData();
        }, [filter, sort, setSort, wasInvalidated])
        useEffect( // Körs varje gång då antingen användare eller projekt hämtas
            () => {
                filterUsers();
            }, [user, users, timereports, database, sort, CurrentUser])


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
                    onLoad={(e) => setUser("Me")} // Sätter användare direkt så att projekt laddas korrekt
                >
                    <option value="All">
                        All
                    </option>
                    <option value="Me">
                        Me ({users.map((user) => {
                        if(user.id == CurrentUser)
                            return user.properties.Name.title[0].plain_text
                    })})
                    </option>
                    {users.map((user) => {
                        const userName = user.properties.Name.title[0].plain_text;
                        if(user.id != CurrentUser)
                            return <option key={user.id} value={user.id}>{userName}</option>
                    })}
                </select>
            </form>
            {<Table fields={fields} invalidate={invalidate} updateFields={updateFields} database={items} filter={filter} sort={sort} setSort={setSort} />}
        </div>
    )
}

export default SearchTable;