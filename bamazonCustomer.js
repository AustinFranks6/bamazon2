require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");



// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  
password: "a$apfranks23", //process.env.MYSQL_PASSWORD,
  database: "Bamazon"
})

connection.connect(function(err) {
  console.log("connected as id: "+connection.threadId);
  mainMenu();
})

function mainMenu() {
    inquirer.prompt([
      {
      type: 'input',
      name: 'item_id',
      message:'What type of item would you like to purchase?'
      },
      {
      type: 'input',
      name: 'stock_quantity',
      message: 'How many would you like?'
      }
      ]).then(function(input) {
      var item = input.item_id;
      var stock_quantity = input.item_id;
  
      var queryStr = 'SELECT * FROM products WHERE ?';
  
      connection.query(queryStr,{item_id: item}, function(err, data) {
        if (err) throw err;
  
        if (data.legnth ===0) {
          console.log('ERROR!:Invalid Input please input a valid item ID');
          displayInventory();
        } else {
          var prodcutData = data[0];
  
          if(stock_quantity <= prodcutData.stock_quantitity) {
            console.log('We have just enough of what you need !');
  
            var updateQueryStr = 'UPDATE products SET stock_quantity =' + (productData.stock_quantity - quantity) + 'WHERE item_id = '+ item;
  
            connection.query(updateQueryStr, function(err,data) {
              if (err) throw err;
              console.log('Your order has been placed, Total: $' +prodcutData.price * quantity);
              console.log('Thanks for shopping with Bamazon');
              console.log("END.........................................END")
  
              connection.end();
            })
          } else {
            console.log('We appologize for the inconvienience but we do not have enought product in stock to fufill your order');
            console.log('Please change your order to a feasable request');
            console.log("TRY AGAIN ...............................TRY AGAIN");
  
  
          }
        }
      })
    })
  }
  
  
  