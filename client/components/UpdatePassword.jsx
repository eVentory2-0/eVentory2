import React, { useState, useEffect } from "react";
import axios from 'axios'

const UpdatePassword = (props) => {
    // makeRequest initially set to false
    // will be use to make a path request to server inside of useEffect if makeRequest is truthy
    const [makeRequest, handleMakeRequest] = useState(false);
    const [passwordUpdated, handlePasswordUpdate] = useState(false);
    // make a path request to our server to update the password using useEffect
    // ensuring we make the request after the page has completed render
    useEffect(() => {
      if (makeRequest){
        // if makeRequest is truthy, make a fetch request to the server
        // utilize axios to make a patch request to the /accounts endpoint with the username as a parameter
        // pass in the currentPassword input and the newPassword input as the body for the patch request as:
          // password, newPassword
        console.log('AXIOS: ', props);
        axios({
          method: 'patch',
          url: `/accounts/:${props.user.name}`,
          data: {
            body: {
              'password': document.getElementById('verifyPass').value,
              'newpassword': document.getElementById('newPass').value
            }
          }
        })
        .then(res => {
          console.log('Response: ', res);
          if ( res.data.message === "Password has been updated" ) {
            handlePasswordUpdate(true)
          }
        })
        .catch(err => {
            
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
            <label for='verifyPass'>Verify Password:</label>
            <input type='text' id='verifyPass' name='verifyPass'></input>
          </div>
          <div>
            <label for='newPass'>Enter New Password:</label>
            <input type='text' id='newPass' name='newPass'></input>
          </div>
          <div>
            <button type='submit'>Update Password</button>  
          </div>
        </form>
      </div>
    );
  };
  
  export default UpdatePassword;