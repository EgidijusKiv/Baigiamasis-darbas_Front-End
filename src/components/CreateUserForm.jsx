import './CreateUserForm.css';
import React, { useState, useContext } from 'react';
import EditContext from './EditContext';

export default function CreateUserForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const [resText, setResText] = useState([]);
  const { setNewUser } = useContext(EditContext);

  function refresh() {
    setNewUser(false);
  }
  async function createUser() {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: name,
        last_name: surname,
        email,
        age,
      }),
    };
    const reqResponse = await fetch('http://127.0.0.1:9000/users', reqOptions);
    const data = await reqResponse.json();
    if (data.acknowledged) {
      setResponse(data.acknowledged);
      setResText(data.insertedId);
      setTimeout(refresh, 3000);
    } else {
      setResponse(data[0].acknowledged);
      setResText(data[1]);
    }
  }

  function checkForFetch() {
    if (
      name !== ''
        && name.length > 2
        && surname !== ''
        && surname.length > 2
        && email !== ''
        && email.indexOf('@') > -1
        && email.indexOf('.') > -1
        && age > 0
        && age <= 99
    ) {
      setSuccess(true);
      createUser();
    } else {
      setError(true);
    }
  }

  return (
    <div className="form-create">
      <h3>Naujo vartotojo forma</h3>
      <form>
        {
        // eslint-disable-next-line
      }<label htmlFor="fname">Vardas:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="fname"
          placeholder="...Vardas..."
          value={name}
        />
        {
        // eslint-disable-next-line
      }<label htmlFor="lname" />
        Pavardė:
        <input
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          id="lname"
          placeholder="...Pavardė..."
          value={surname}
        />

        {
        // eslint-disable-next-line
      }<label htmlFor={email}>El. paštas:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id={email}
          placeholder="...Elektroninis paštas..."
          value={email}
        />
        {
        // eslint-disable-next-line
      }<label htmlFor="age">Amžius:</label>
        <input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          id="lname"
          value={Number(age)}
        />
        <div className="form-buttons">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              checkForFetch();
            }}
          >
            Submit

          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setNewUser(false);
            }}
          >
            Atšaukti

          </button>
        </div>
        {(success && response) && (
        <div className="success">
          {`Naujas vartotojas sukurtas, kurio ID: ${resText}`}
        </div>
        )}
        {!response && <div className="error">{resText}</div>}
        {error && <div className="error">Tikrinkite įvestus duomenis</div>}
      </form>
    </div>
  );
}
