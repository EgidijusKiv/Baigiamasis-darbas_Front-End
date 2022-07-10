import './Navigation.css';
import React from 'react';
import logo from '../logo.svg';


export default function Navigation() {
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
        <button type="button">+ Naujas vartotojas</button>
        <button type="button">Koreguoti vartotojus</button>
      </div>

    </div>
  );
}
