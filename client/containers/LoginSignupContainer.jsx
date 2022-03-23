import React from 'react';
//import Login from '../components/Login.jsx';
//import SignUp from '../components/SignUp.jsx';
import LoginSignup from  "../components/LoginSignup.jsx"
import '../stylesheets/Login.scss';

//Page that returns the login and signup components

const LoginSignupContainer = (props) => {
  return (
    <div className='LSPage'>

      <div id={'img1'}>
        <img id='loginArt1' src='https://media.istockphoto.com/vectors/check-the-goods-in-stock-before-sending-it-to-a-customer-beginning-of-vector-id1057532448?k=20&m=1057532448&s=612x612&w=0&h=fmINUJsUX0mQs4go6jEirlNUz1i3Vv6dWEzkFIJrDvg='></img>
      </div>
      
      
      <div className="LoginSignupBox">
        <h1 className="welcome">Welcome</h1>
        <div className="LogSign">
          <LoginSignup setUser = {props.setUser}/>
        </div>
      </div>

      <div id={'img2'}>
        <img id='loginArt2' src='https://media.istockphoto.com/vectors/top-seller-are-very-profitable-from-sell-cargo-and-more-of-order-vector-id1057532406?k=20&m=1057532406&s=612x612&w=0&h=PESQdB7nN-S0MTyzrclNfP79iRiGflkpWzoBfmkt6Zs=' ></img>
      </div>

    </div>
  );
};

export default LoginSignupContainer;