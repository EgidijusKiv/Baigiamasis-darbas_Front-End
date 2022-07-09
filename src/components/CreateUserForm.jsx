import './CreateUserForm.css'
import React, {useState} from 'react';

export default function CreateUserForm() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [fetchState, setFetchState] = useState(false)

    async function createUser() {
        const reqOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: name,
                last_name: surname,
                email: email,
                age: age,
            })
        };
        const response = await fetch('http://127.0.0.1:9000/users', reqOptions);
        const data = await response.json();
        setFetchState(data.acknowledged);
        setTimeout(refresh, 3000);
        
}
function refresh() {
    window.location.reload();
}
console.log(fetchState);
    return (
        <div className="form-create">
            <h3>Naujo vartotojo forma</h3>
            <form>
                <label htmlFor="fname">Vardas:</label>
                <input
                    onChange={e => setName(e.target.value)}
                    type="text"
                    id="fname"
                    placeholder="...Vardas..."
                    value={name} />
                <label htmlFor="lname">Pavardė:</label>
                <input
                    onChange={e => setSurname(e.target.value)}
                    type="text"
                    id="lname"
                    placeholder="...Pavardė..."
                    value={surname} />
                <label htmlFor="email">El. paštas:</label>
                <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="...Elektroninis paštas..."
                    value={email} />
                <label htmlFor="age">Amžius:</label>
                <input
                    onChange={e => setAge(e.target.value)}
                    type="number"
                    id="lname"
                    value={Number(age)} />
                <div className='form-buttons'>
                    <button onClick={(e) => {
                        e.preventDefault()
                        createUser();
                    }}>Submit</button>
                    <button>Atšaukti</button>
                </div>
               {fetchState && <div className='success'>"SUCCESS!!! Naujas vartotojas sukurtas"</div>}
            </form>
        </div>
    );
}