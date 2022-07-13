import './EditForm.css';
import React, { useContext, useState } from 'react';
import { EditContext } from '../App';

export default function EditForm(props) {
    console.log(props);
    const [name, setName] = useState(props.user.first_name);
    const [surname, setSurname] = useState(props.user.last_name);
    const [email, setEmail] = useState(props.user.email);
    const [age, setAge] = useState(props.user.age);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(false);
    const { setEditUser } = useContext(EditContext);

    async function updateUser() {
        const reqOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: props.user._id,
                first_name: name,
                last_name: surname,
                email: email,
                age: age,
            })
        };
        const response = await fetch('http://127.0.0.1:9000/users', reqOptions);
        const data = await response.json();
        setResponse(data.acknowledged);
    }

    function checkForFetch() {
        if (
            name !== '' &&
            name.length > 2 &&
            surname !== '' &&
            surname.length > 2 &&
            email !== '' &&
            email.indexOf('@') > -1 &&
            email.indexOf('.') > -1 &&
            age > 0 &&
            age <= 99
        ) {
            setSuccess(true);
            updateUser();
            setTimeout(refresh, 2000);
        } else {
            setError(true);
        }

    }
    function refresh() {
        window.location.reload();
    }

    return (
        <div className="form-edit">
            <h3>Vartotojo koregavimo forma</h3>
            <form>
                <label htmlFor="fname">Vardas:</label>
                <input
                    onChange={e => setName(e.target.value)}
                    type="text"
                    id="fname"
                    value={name} />
                <label htmlFor="lname">Pavardė:</label>
                <input
                    onChange={e => setSurname(e.target.value)}
                    type="text"
                    id="lname"
                    value={surname} />
                <label htmlFor="email">El. paštas:</label>
                <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="email"
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
                        checkForFetch();
                    }}>Submit</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEditUser(false);
                    }} >Atšaukti</button>
                </div>
                {(success && response) && <div className='success'>"SUCCESS!!! Esamas vartotojas pakoreguotas"</div>}
                {(error && !response) && <div className='error'>"ERROR!!! Tikrinkite įvestus duomenis"</div>}
            </form>
        </div>
    );
}