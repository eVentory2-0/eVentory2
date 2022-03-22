const express = require('express');
router = express.Router();
const itemsController = require('../controllers/itemsController');

// Querys DB for all items belonging to the ID being sent through params
router.get('/:id',itemsController.getAllItems, (req,res) => {
  // returns an object with an items property and all items in an array as the value
  res.status(200).json({items: res.locals.items});
})

// Querys DB to update an item specified by id given in the request body
router.patch('/',itemsController.updateItem, (req,res) => {
  res.status(200).json({item: res.locals.updatedItem});
})

// Querys DB to create an item on into the items table
router.post('/',itemsController.createItem, (req,res) => {
  // request body sends the item information, then inserted into db table
  res.status(200).json({item: res.locals.createdItem});
})

// Querys DB for item specified by the itemID passed by params and deletes it from the database
router.delete('/:itemId', itemsController.deleteItem, (req, res) => {
  res.status(200).json({message: 'item deleted'});
})


module.exports = router;