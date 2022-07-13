import './Navigation.css';
import React, { useContext } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import logo from '../logo.svg';

import EditContext from './EditContext';

export default function Navigation() {
  const {
    edit, setEdit, newUser, setNewUser,
  } = useContext(EditContext);
  return (
    <div className="navigation">
      <div className="navigation-left">
        <img src={logo} alt="Logo" />
        <p>React project</p>

      </div>
      <div className="navigation-middle">
        <h3>Final Full-Stack Project</h3>
      </div>
      <div className="navigation-right">
        <button
          onClick={() => {
            if (newUser) { setNewUser(false); } else { setNewUser(true); }
          }}
          type="button"
        >
          <AiOutlineUsergroupAdd />
          {' '}
          Naujas vartotojas

        </button>
        <button
          onClick={() => {
            if (edit) { setEdit(false); } else { setEdit(true); }
          }}
          type="button"
        >
          <BiEdit />
          {!edit ? ' Koreguoti vartotojus' : ' Išjungti koregavimą'}
          {' '}

        </button>
      </div>

    </div>
  );
}
