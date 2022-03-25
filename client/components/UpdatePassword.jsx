import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../stylesheets/Account.scss";

import UpdatePasswordMessage from "./UpdatePasswordMessage.jsx";

const UpdatePassword = (props) => {
    // makeRequest initially set to false
    // will be use to make a path request to server inside of useEffect if makeRequest is truthy
    const [makeRequest, handleMakeRequest] = useState(false);
    const [passwordUpdated, handlePasswordUpdate] = useState(false);
    const [passwordMessage, handlePasswordMessage] = useState(null);
    // make a path request to our server to update the password using useEffect
    // ensuring we make the request after the page has completed render
    useEffect(() => {
      console.log('Make Request: ', makeRequest);
      if (makeRequest){
        // if makeRequest is truthy, make a fetch request to the server
        // utilize axios to make a patch request to the /accounts endpoint with the username as a parameter
        // pass in the currentPassword input and the newPassword input as the body for the patch request as:
          // password, newPassword
        console.log('Password: ', document.getElementById('verifyPass').value);
        console.log('Password: ', document.getElementById('newPass').value);
        console.log('AXIOS: ', props);
        axios({
          method: 'patch',
          url: `/accounts/${props.user.name}`,
          data: {
              'password': document.getElementById('verifyPass').value,
              'newPassword': document.getElementById('newPass').value
          }
        })
        .then(res => {
          console.log('Response: ', res.data);
          
          if ( res.data.message === "Password has been updated" ) {
            handleMakeRequest(false);
            handlePasswordUpdate(true);
            handlePasswordMessage(true);
          }          
        })
        .catch(err => {
          handlePasswordMessage(false);
        })
      }
    });
  
    // create a submit handler to prevent the events default action of re-rendering the page
    const handleSubmit = (e) => {
      // prevent the default submit action from happening
      e.preventDefault();
      // reassign makeRequest to truthy so we can make the server request in useEffect
      handleMakeRequest(true);
      // useEffect will be invoked after
    }
    
    return (
      <div className="accountUpdateContainer">
        <form className='updatePasswordForm' onSubmit={ handleSubmit }>
          <div>
            
            <input type='password' id='verifyPass' name='verifyPass' placeholder="Verify Password"></input>
          </div>
          <div>
            
            <input type='password' id='newPass' name='newPass' placeholder="New Password"></input>
          </div>
          <div>
            <button type='submit' className="submitbutton">Update Password</button>  
          </div>
        </form>

        <div className="passwordUpdateMessageContainer">
          <UpdatePasswordMessage message={passwordMessage}/>
        </div>
      </div>
    );
  };
  
  export default UpdatePassword;