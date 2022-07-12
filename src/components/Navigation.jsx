import './Navigation.css';
import React, {useContext} from 'react';
import logo from '../logo.svg';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiEdit } from 'react-icons/bi';
import { EditContext } from '../App';


export default function Navigation() {
  const {edit, setEdit} = useContext(EditContext);
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
        <button type="button"><AiOutlineUsergroupAdd/> Naujas vartotojas</button>
        <button 
        onClick={()=>{ edit ? setEdit(false) : setEdit(true)}} 
        type="button"><BiEdit/> Koreguoti vartotojus</button>
      </div>

    </div>
  );
}
