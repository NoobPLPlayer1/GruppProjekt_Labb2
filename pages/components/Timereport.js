import { useState } from "react";
function Timereport(props) {

    const projectNameDisplay = () => { //save in a list different options which contains name and id of each project
        
        let projectnames = [];
        props.props.results.forEach((project) => {
            const path = project.properties.Projectname.title[0].plain_text;
            projectnames.push(
                <option value={project.id} key={project.id}> {path}</option>
            );
        });
        return projectnames;
    };

    const [date, setDate] = useState(new Date().toISOString().slice(0,10)); //Here i set intial value to todays, it will never be empty
    const [hour, setHour] = useState('');
    const [project, setProject] = useState('');
    const [note, setNote] = useState('');
    const user = props.props.user;

    const submitForm = async (e) => { //When we click on submit then we will send the result of each field to ourselves
        
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({ date, hour, project, user, note }), //This is where we send the parameters to our selves
        });

        if (res.status === 201) {
            console.log("Done!");
            
        } else {
            console.log("Error!");
        }
    };

    return (
        <form className="form" onSubmit={submitForm}> {/*when we click on submit then run function submitForm above*/}
            <h1 className="form-headline">Rapportera tid</h1>
            <div>
                <label htmlFor="date">Skriv in datum</label>
                <input
                    type="date"
                    id="datum"
                    name="datum"
                    
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label htmlFor="hour">Antal timmar</label>
                <input
                    type="number"
                    id="tid"
                    name="tid"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    required
                />

                <label htmlFor="project">Choose projekt</label>
                <select
                    name="projektnamn"
                    id="projektnamn"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                >
                    <option value="" disabled required>
                        choose project
                    </option>

                    {projectNameDisplay()} {/* Here you show the name of each project from the project list first created */}
                </select>

                <label htmlFor="note">Note</label>
                <input
                    type="text"
                    id="note"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                />
            </div>

            <button className="form-button" type="submit">
                Submit
            </button>
        </form>
        )
    
}

export default Timereport;

