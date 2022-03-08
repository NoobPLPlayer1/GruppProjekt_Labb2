import { useState } from "react";

function Form() {

    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [project, setProject] = useState('');


    const submitForm = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({ date, hour, project }),
        });

        if (res.status === 201) {
            console.log("ok");
        } else {
            console.log("rip");
        }
    };

    return (
        <form className="hej2" onSubmit={submitForm}>
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

                    <option value="My first project">My first project</option>
                    <option value="Another project">Another project</option>
                    <option value="The best project">The best project</option>
                </select>
            </div>

            <button className="hej" type="submit">
                Submit
            </button>
        </form>
        )
    
}

export default Form;


