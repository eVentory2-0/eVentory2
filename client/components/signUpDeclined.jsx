import React from 'react';
import {useState} from 'react';

const SignUpDeclined = (props) => {
  console.log('Sign Up Props: ', props);
  if (props.signUpDeclined){
    return (
      <div className='signUpDeclinedContainer'>
        <p>Account Name Already Taken!</p>
        <p>Please Enter a new One!</p>
      </div>
    )
  }
  else {
    // return nothing!
    return (
       <div /*style={{display: 'none'}}*/>
         <p></p>
         <p></p>
       </div>
    )
  }
}

export default SignUpDeclined;