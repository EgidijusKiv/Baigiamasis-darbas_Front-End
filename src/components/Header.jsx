import './Header.css';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Header(props) {
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const result = await fetch('http://127.0.0.1:9000/users');
    const data = await result.json();
    setUsers(data);
  }
  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (

    <div className="header">
      <table className="header-table">
        <tbody>
          <tr>
            <th>Nr.</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El.paštas</th>
            <th>Amžius</th>
            <th></th>
          </tr>
          {users
            .map((user, i) => (
              <tr key={i}>
                <td>{++i}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                {props.edit && (
                <td>
                  <button className="header-table edit" type="button">
                    <span><BiEdit /></span>
                    {' '}
                    Koreguoti
                  </button>
                  <button className="header-table delete" type="button">
                    <span><RiDeleteBinLine /></span>
                    {' '}
                    Ištrinti
                  </button>
                </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
