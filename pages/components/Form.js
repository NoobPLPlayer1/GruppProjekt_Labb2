import { useState } from "react";

function Form(props) {


    const projectNameDisplay = () => { //save in a list different options which contains name and id of each project
        
        let projectnames = [];
        props.props.forEach((project) => {
            const path = project.properties.Projectname.title[0].plain_text;
            projectnames.push(
                <option value={project.id} key={project.id}> {path}</option>
            );
        });
        return projectnames;
    };

    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [project, setProject] = useState('');

    const submitForm = async (e) => { //When we click on submit then we will send the result of each field to ourselves

        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({ date, hour, project }), //This is where we send the parameters to our selves like a payload
        });

        if (res.status === 201) {
            console.log("Done!");
            
        } else {
            console.log("Error!");
        }
    };

    return (
        <form className="hej2" onSubmit={submitForm}> {/*when we click on submit then run function submitForm above*/}
            <h1 className="hej3">Rapportera tid</h1>
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
            </div>

            <button className="hej" type="submit">
                Submit
            </button>
        </form>
        )
    
}

export default Form;


