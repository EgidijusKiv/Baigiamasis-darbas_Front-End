import './EditForm.css';
import React, { useContext, useState } from 'react';
import EditContext from './EditContext';

export default function EditForm(props) {
  // eslint-disable-next-line
  const [name, setName] = useState(props.user.first_name);
  // eslint-disable-next-line
  const [surname, setSurname] = useState(props.user.last_name);
  // eslint-disable-next-line
  const [email, setEmail] = useState(props.user.email);
  // eslint-disable-next-line
  const [age, setAge] = useState(props.user.age);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const { setEditUser } = useContext(EditContext);

  function refresh() {
    window.location.reload();
  }

  async function updateUser() {
    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // eslint-disable-next-line
        _id: props.user._id,
        first_name: name,
        last_name: surname,
        email,
        age,
      }),
    };
    const reqResponse = await fetch('http://127.0.0.1:9000/users', reqOptions);
    const data = await reqResponse.json();
    setResponse(data.acknowledged);
    setTimeout(refresh, 2000);
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
      updateUser();
    } else {
      setError(true);
    }
  }

  return (
    <div className="form-edit">
      <h3>Vartotojo koregavimo forma</h3>
      <form>
        {
        // eslint-disable-next-line
      }<label htmlFor="fname">Vardas:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="fname"
          value={name}
        />
        {
        // eslint-disable-next-line
      }<label htmlFor="lname">Pavardė:</label>
        <input
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          id="lname"
          value={surname}
        />
        {
        // eslint-disable-next-line
      }<label htmlFor="email">El. paštas:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
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
              setEditUser(false);
            }}
          >
            Atšaukti

          </button>
        </div>
        {(success && response) && <div className="success">SUCCESS!!! Esamas vartotojas pakoreguotas</div>}
        {(error && !response) && <div className="error">ERROR!!! Tikrinkite įvestus duomenis</div>}
      </form>
    </div>
  );
}
