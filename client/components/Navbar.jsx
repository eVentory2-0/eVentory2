import React from 'react';
import { Outlet, Link } from "react-router-dom";

import NavBarLoggedIn from '../components/NavBarLoggedIn.jsx'
import NavBarLoggedOut from '../components/NavBarLoggedOut.jsx'
import { useState } from 'react';

import '../stylesheets/NavBar.scss';

/*
Navigation Bar Displayed at the top of every page

Will contain on not logged in page:
  Logo,
  Links:
    About Company,

will contain on logged in age:
  Logo,
  Links:
    Account
    Inventory
  Profile Icon
*/

const Navbar = (props) => {
  
  const [isShow, setIsShow] = React.useState(true);  
  const handleClick = () => {setIsShow(s => !s)};

console.log('Props: ', props);
  //for future engineers - if you type in a fake account you will get an error and this needs to be fixed. xoxo gossip girl
  // if our user doesn't have any data added into post trying to login - rerender the loggedOut NavBar and stay
  // on the login page
  if (!props.user){
  return (
    <div>
      <NavBarLoggedOut />
    </div>
    )
  } else {
      return (
        <div>
          <NavBarLoggedIn />
        </div>
    )
  };
};

     
export default Navbar;