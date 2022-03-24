const client = require("../models/eventoryModel");
const bcrypt = require('bcryptjs');

const accountsController = {};

/*
 * Middleware to get all Accounts
 */
// accountsController.getAllAccounts = async (req, res, next) => {
//   try {
//     // query the database for all accounts in accounts
//     const dbRes = await client.query("SELECT * FROM accounts");
//     // store the result of the query into res.locals.accounts
//     res.locals.accounts = dbRes.rows;
//     // return next
//     return next();
//   } catch (err) {
//     // if there is an err, return the errorObj to the global error handler
//     return next({
//       log: "Error Express - usersController.getAllUsers",
//       status: 500,
//       message: { err },
//     });
//   }
// };
/*
 * Middleware to get a single account
 */
// accountsController.getAnAccount = async (req, res, next) => {
//   // get the name from req.params
//   const { name } = req.params;
//   try {
//     // create an object with the query text, and the values to insert into the query
//     const query = {
//       text: "SELECT * FROM accounts WHERE accounts.name = $1",
//       values: [name],
//     };
//     // query the database for all accounts in accounts
//     const dbRes = await client.query(query);
//     // store the result of the query into res.locals.accounts
//     console.log("db Response: ", dbRes);
//     res.locals.account = dbRes.rows[0];
//     // return next
//     return next();
//   } catch (err) {
//     // if there is an err, return the errorObj to the global error handler
//     return next({
//       log: "Error Express - accountsController.getAnAccount",
//       status: 500,
//       message: { err },
//     });
//   }
// };
/*
 * Middleware to create an account
 */
accountsController.createAccount = async (req, res, next) => {
  // get the name, email, password, type from the req.body
  const { name, email, password, type } = req.body;
  
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    // create an object with the query text, and the values to insert into the query
    const query = {
      text: "INSERT INTO accounts (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [name, email, passwordHash, type],
    };
    // query the database for all accounts in accounts
    const result = await client.query(query); //<----- TURN BACK ON

    // console.log("Result: ", result.rows[0]);
    // store the result of the query into res.locals.accounts
    res.locals.message = result.rows[0]; //<----- TURN BACK ON
    
    // TESTING
    // res.locals.message = "testing"         

    return next();
  } catch (err) {
    // if there is an err, return the errorObj to the global error handler
    return next({
      log: "Error Express - accountsController.createAccount",
      status: 500,
      message: { err },
    });
  }
};

/**
 * Middleware to login
 */
accountsController.login = async (req, res, next) => {
  // get the username and password from the req body
  const { username, password } = req.body;

  try {

    // select all users with the username
    const query = {
      text: "SELECT * from accounts WHERE name = $1",
      values: [username],
    };
    // query the database, assign the result in dbRes
    const dbRes = await client.query(query);
    //check if the account password matches the req body password
    const verified = bcrypt.compareSync(password, dbRes.rows[0].password);

    // console.log('VERIFIED!!!!: ', verified);

    if (verified){
      // destruct id, name, email, type from db response
      const { id, name, email, type } = dbRes.rows[0];

      console.log(id, name, email, type);

      const sendUser = {
        id,
        name,
        email,
        type
      }

      // assign res.locals.account the account information
      res.locals.account = sendUser;
      // go to the next middleware
      next();

    } else {
      // if the passwords dont match return an error
      return next({
        log: "Error Express - accountsController.login, password does not match",
        status: 500,
        message: { err: "Password does not match" },
      });
    }
  } catch (err) {
    // if there is an err, return the errorObj to the global error handler
    // if it errs here, the account does not exist
    return next({
      log: "Error Express - accountsController.login",
      status: 500,
      message: { err: "Account does not exist" },
    });
  }
};
/**
 * Middleware to change password
 */
accountsController.changePassword = async (req, res, next) => {

  try {

    const { name } = req.params;

    const { password } = req.body;

    const firstQuery = {

      text: "SELECT * from accounts WHERE name = $1",
      values: [name],

    };

    // query the database, assign the result in dbRes
    const dbRes = await client.query(firstQuery);
    //check if the account password matches the req body password
    const verified = bcrypt.compareSync(password, dbRes.rows[0].password);

  
    // If verified we will update the password
    if (verified) {

      // get the new password from the body
      const { newpassword } = req.body;

      // BCRYPT
      const passwordHash = bcrypt.hashSync(newpassword, 10);

      // update the password where the account name is equal to name
      const query = {
        text: "UPDATE accounts SET password = $2 WHERE accounts.name = $1",
        values: [name, passwordHash],
      };

      await client.query(query);

      // assign res.locals.message a string stating the password has been updated
      res.locals.message = "Password has been updated";

      // go to the next middleware
      next();

    } else {
      // if the passwords dont match return an error
      return next({
        log: "Error Express - accountsController.changePassword, password does not match",
        status: 500,
        message: { err: "Password does not match, Cannot update password" },
      });

    }
  } catch (err) {
    // if there is an err, return the errorObj to the global error handler
    return next({
      log: "Error Express - accountsController.changePassword",
      status: 500,
      message: { err },
    });
  }
};
/**
 * Middleware to delete an account
 */
accountsController.deleteAccount = async (req, res, next) => {
  // get the name from params
  const { name } = req.params;
  try {
    // update the password where the account name is equal to name
    const query = {
      text: "DELETE FROM accounts WHERE accounts.name = $1",
      values: [name],
    };
    await client.query(query);
    // assign res.locals.message a string stating the password has been updated
    res.locals.message = "Account has been deleted";
    // go to the next middleware
    next();
  } catch (err) {
    // if there is an err, return the errorObj to the global error handler
    return next({
      log: "Error Express - accountsController.deleteAccount",
      status: 500,
      message: { err },
    });
  }
};

module.exports = accountsController;
