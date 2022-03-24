import React from 'react';
import ProfileUpdate from '../components/ProfileUpdate.jsx';
import ProfilePic from '../components/ProfilePic.jsx';

// import child components
import UpdatePassword from '../components/UpdatePassword.jsx';

const AccountPageContainer = (props) => {
  console.log('Account Props: ', props);
  return (
    <div>
      <h1>hey yall</h1>
      <UpdatePassword user={props.user}/>
    </div>
  );
};

export default AccountPageContainer;