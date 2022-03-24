//Unit testing react components
import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';


// import App from '../client/index.js';
// import Login from '../client/components/Login.jsx';
// import Signup from '../client/components/Signup.jsx';
import Inventory from '../client/components/Inventory.jsx';
import { TestWatcher } from 'jest';


describe('Unit testing React components', () => {

//Inventory Component
//TODO: Test the following:
//1. The page loads with five h4 elements, with the values from props.invInfo of following:
//id, name, quanitity, category, location
//2. The page loads with two buttons, 'Update' and 'Delete'
//3. The updatedItem function should update the item when 'Update' button is clicked 
//4. The deletedItem function should delete the item when 'Delete' button is clicked

  describe('Inventory', () => {
    let text;
    // initialize props
    const props = {
      id: 27,
      name: 'Twenty-seven',
      quantity: 27,
      category: 'numbers',
      location: 'isle',
    };

    beforeAll(() => {
      text = render(<Inventory {...props} />);
    });

    //checks if first h4 and second h4 elements have rendered on page
    test('Renders the props', () => {
      expect(text.getByText(`${props.id}`).nextSibling).toHaveTextContent(`${props.name}`);
    })

  })


//Inventory Display Component
//TODO: Test the following:
//1. The page loads with five h4 elements, with following text:
//'ID', 'NAME', 'QUANTITY', 'CATEGORY', 'LOCATION'
//2. The addedItem function should add the item when 'Add Item' button is clicked

//Login Component
//TODO: Test the following:
//1. The page loads with h2 element with text 'Please sign in'
//2. The page renders input containers
//3. The page renders submit button
//4. The handleSubmit function is invoked when submit button is clicked
//5. Need to test that the user is authenticated (but this should probably take place in supertests) 

//Login Signup
//TODO: Test the following:
//1.  If isShow variable is true, render a link with text 'Not a member? Sign-Up here!'
//2.  If isShow variable is false, render a link with text 'Already a member? Log-In here!'

//NavBarLoggedOut

//NavBarLoggedIn


//Sign up
})