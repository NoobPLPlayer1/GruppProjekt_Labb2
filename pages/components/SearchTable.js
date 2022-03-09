import Table from "./Table";
import {useEffect, useState} from 'react'

function SearchTable(props) {

    const [filter, setFilter] = useState();
    const [status, setStatus] = useState("All");

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
            <Table fields={props.fields} database={props.database} filter={filter} />
        </div>
    )
}

export default SearchTable;