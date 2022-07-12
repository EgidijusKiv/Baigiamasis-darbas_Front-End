import './Header.css';
import { useEffect, useState, useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import EditForm from './EditForm'
import { EditContext } from '../App';
import CreateUserForm from './CreateUserForm'



export default function Header(props) {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const {edit} = useContext(EditContext);


  async function getUsers() {
    const result = await fetch('http://127.0.0.1:9000/users');
    const data = await result.json();
    setUsers(data);
  }
  async function deleteUser(id) {
    await fetch(`http://127.0.0.1:9000/users/${id}`, {method: 'DELETE'} );
    window.location.reload();
  }


  useEffect(() => {
    getUsers();
  }, []);

  function showEditUser(user) {
    setEditUser(!editUser)
    setUserInfo(user)
  }
  function createNewUser() {
    setNewUser(!newUser)  
  }

  return (
    <div className="header">
      <button onClick={(e) => {
        createNewUser();
      }}>Test NewUser</button>
      {editUser && <div>
        <EditForm user={userInfo} />
      </div>}
      {newUser && <div>
        <CreateUserForm />
      </div>}
      <table className="header-table">
        <tbody>
          <tr>
            <th>Nr.</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El.paštas</th>
            <th>Amžius</th>
            {edit && <th /> }
          </tr>
          {users
            .map((user, i) => (
              <tr key={i}>
                <td>{`${i + 1}.`}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                {props.edit && (
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        showEditUser(user);
                      }}
                      className="header-table edit"
                      type="button">
                      <span><BiEdit /></span>
                      {' '}
                      Koreguoti
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteUser(user._id)
                      }}
                      className="header-table delete"
                      type="button">
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
