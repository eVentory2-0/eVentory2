import React from 'react';


const UpdatePasswordMessage = (props) => {
  if (props.message === null){
    return (
      <div>

      </div>
    )
  }
  else if (props.message === false){
    return (
      <div>
        <p>Password Update Failed!</p>
      </div>
    )
  }
  else if (props.message === true){
    return (
      <div>
        <p>Password Update Was Successful!</p>
      </div>
    )
  }
}

export default UpdatePasswordMessage;