CREATE database bamazon_db;

USE bamazon_db;

CREATE table store (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO store (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Nutrition Gold Standard Whey - Vanilla", "Health and Fitness", "26.49", "120985"),
("Pupper Fun Dog Feeding Station", "Pet Care", "12.29", "10098"),
 ("Beats By Dre Studio Solo Headphones", "Electronics", "149.99", "13457"),
("Patagonia Black Hole Duffel - Large", "Travel", "249.69", "12056"),
("Cotopaxi Luzon Del Dia 18L Daypack", "Travel", "49.69", "10493"),
("Converse Chuck Taylor - Midnight Black", "Clothing", "65.99", "509"),
("Apple iPhone 6s Plus - Space Grey", "Electronics", "699.99", "145389"),
("Harry Potter Limited Edition Illustrated Set", "Books", "239.99", "568"),
 ("Kleenex Tissues - 5 Pack", "Grocery", "23.99", "452"),
("Kellog's Corn Flakes", "Grocery", "3.69", "100563");