var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});


function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number.';
	}
}

function customerBuy() {
    inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How much do you need?',
			validate: validateInput,
			filter: Number
        }
    ]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
            if (err) throw err;
            if (data.length === 0) {
				console.log('ERROR: Invalid ID. Please select a valid ID.');
				showInventory();

			} else {
				var productData = data[0];
				if (quantity <= productData.stock_quantity) {
					console.log('Item in stock. Placing order, please stand by for shipping notification.');
                    
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    
                    connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder is placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us! Please wait for shipping notification.');
                        console.log("\n---------------------------------------------------------------------\n");
                        
                        connection.end();
					})
				} else {
					console.log('Sorry, there is insufficient stock to complete your order.');
					console.log('Please adjust your order.');
					console.log("\n---------------------------------------------------------------------\n");

					showInventory();
				}
			}
		})
	})
}



function showInventory() {
	queryStr = 'SELECT * FROM products';
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Available Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");
	  	customerBuy();
	})
}function bamazon() {
    showInventory();
}
bamazon();    