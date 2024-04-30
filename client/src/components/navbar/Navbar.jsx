import React from 'react';
import style from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={style["navbar"]}>
        <div className={style["navbar-content"]}>
      <h2>MY TODO APP</h2>
      <p>don't forget what u are doing</p>
      </div>
    </div>
  )
}

export default Navbar