-- Create the database
CREATE DATABASE IF NOT EXISTS alwadiflafel;
USE alwadiflafel;

-- Table structure for table `dishes`
CREATE TABLE `dishes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into dishes table
INSERT INTO dishes (ID, name, price, allergies, description) VALUES
(1, 'Spaghetti Carbonara', 12.99, 'Dairy, Eggs', 'Classic Italian pasta dish'),
(2, 'Margherita Pizza', 10.99, 'Dairy', 'Tomato, mozzarella, and basil'),
(3, 'Caesar Salad', 8.99, 'Dairy, Eggs', 'Romaine lettuce with Caesar dressing'),
(4, 'Chicken Alfredo', 14.99, 'Dairy', 'Pasta with creamy Alfredo sauce and chicken'),
(5, 'Beef Tacos', 9.99, 'None', 'Tacos with seasoned beef and toppings'),
(6, 'Vegan Burger', 11.99, 'None', 'Burger with vegan patty and toppings'),
(7, 'Grilled Salmon', 17.99, 'Fish', 'Grilled salmon with lemon and herbs'),
(8, 'Chocolate Cake', 6.99, 'Dairy, Gluten', 'Rich chocolate cake'),
(9, 'French Fries', 3.99, 'None', 'Crispy French fries'),
(10, 'Mushroom Risotto', 13.99, 'Dairy', 'Creamy risotto with mushrooms');

-- Table structure for table `ingredients`
CREATE TABLE `ingredients` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL CHECK (`unit` in ('KG','G','ML','L','piece')),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into ingredients table
INSERT INTO ingredients (ID, name, quantity, unit) VALUES
(1, 'Tomato', 100, 'G'),
(2, 'Mozzarella', 200, 'G'),
(3, 'Lettuce', 300, 'G'),
(4, 'Chicken', 150, 'G'),
(5, 'Beef', 250, 'G'),
(6, 'Vegan Patty', 1, 'piece'),
(7, 'Salmon', 200, 'G'),
(8, 'Chocolate', 100, 'G'),
(9, 'Potato', 500, 'G'),
(10, 'Mushroom', 200, 'G');

-- Table structure for table `ingredient_dishes`
CREATE TABLE `ingredient_dishes` (
  `ingredient_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`,`dish_id`),
  KEY `dish_id` (`dish_id`),
  CONSTRAINT `ingredient_dishes_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ingredient_dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into ingredient_dishes table
INSERT INTO ingredient_dishes (ingredient_id, dish_id, quantity) VALUES
(1, 2, 50),
(2, 2, 100),
(3, 3, 50),
(4, 4, 100),
(5, 5, 100),
(6, 6, 1),
(7, 7, 150),
(8, 8, 50),
(9, 9, 200),
(10, 10, 100);

-- Table structure for table `orders`
CREATE TABLE `orders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `order_status` varchar(100) DEFAULT NULL,
  `discounts` decimal(10,2) DEFAULT NULL,
  `detailed_price` decimal(10,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into orders table
INSERT INTO orders (ID, order_status, discounts, detailed_price, date, payment_status, shipping_address) VALUES
(1, 'Completed', 0, 32.97, '2023-01-01', 'Paid', '123 Main St'),
(2, 'Pending', 10, 26.97, '2023-01-02', 'Unpaid', '456 Elm St'),
(3, 'Shipped', 5, 28.97, '2023-01-03', 'Paid', '789 Oak St'),
(4, 'Cancelled', 0, 0.00, '2023-01-04', 'Refunded', '321 Pine St'),
(5, 'Completed', 15, 40.97, '2023-01-05', 'Paid', '654 Maple St'),
(6, 'Pending', 0, 16.99, '2023-01-06', 'Unpaid', '987 Birch St'),
(7, 'Shipped', 10, 53.97, '2023-01-07', 'Paid', '543 Cedar St'),
(8, 'Completed', 0, 25.98, '2023-01-08', 'Paid', '876 Spruce St'),
(9, 'Pending', 5, 21.98, '2023-01-09', 'Unpaid', '135 Walnut St'),
(10, 'Shipped', 0, 34.97, '2023-01-10', 'Paid', '246 Chestnut St');

-- Table structure for table `order_dishes`
CREATE TABLE `order_dishes` (
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`,`dish_id`),
  KEY `dish_id` (`dish_id`),
  CONSTRAINT `order_dishes_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`ID`),
  CONSTRAINT `order_dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into order_dishes table
INSERT INTO order_dishes (order_id, dish_id, quantity) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(2, 4, 1),
(2, 5, 1),
(3, 6, 1),
(3, 7, 1),
(4, 8, 1),
(5, 9, 1),
(5, 10, 1),
(6, 1, 1),
(7, 2, 1),
(7, 3, 1),
(8, 4, 1),
(8, 5, 1),
(9, 6, 1),
(9, 7, 1),
(10, 8, 1),
(10, 9, 1);

-- Table structure for table `people`
CREATE TABLE `people` (
  `email` varchar(255) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street_number` int(11) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into people table
INSERT INTO people (email, role, city, street_number, last_name, first_name, phone_number) VALUES
('john.doe@example.com', 'Customer', 'New York', '123', 'Doe', 'John', '555-1234'),
('jane.smith@example.com', 'Customer', 'Los Angeles', '456', 'Smith', 'Jane', '555-5678'),
('alice.jones@example.com', 'Customer', 'Chicago', '789', 'Jones', 'Alice', '555-9012'),
('bob.brown@example.com', 'Customer', 'Houston', '321', 'Brown', 'Bob', '555-3456'),
('carol.davis@example.com', 'Customer', 'Phoenix', '654', 'Davis', 'Carol', '555-7890'),
('david.wilson@example.com', 'Admin', 'Philadelphia', '987', 'Wilson', 'David', '555-1234'),
('eve.white@example.com', 'Customer', 'San Antonio', '543', 'White', 'Eve', '555-5678'),
('frank.thomas@example.com', 'Customer', 'San Diego', '876', 'Thomas', 'Frank', '555-9012'),
('grace.moore@example.com', 'Customer', 'Dallas', '135', 'Moore', 'Grace', '555-3456'),
('henry.taylor@example.com', 'Customer', 'San Jose', '246', 'Taylor', 'Henry', '555-7890');

-- Table structure for table `people_orders`
CREATE TABLE `people_orders` (
  `email` varchar(255) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`email`,`order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `people_orders_ibfk_1` FOREIGN KEY (`email`) REFERENCES `people` (`email`),
  CONSTRAINT `people_orders_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into people_orders table
INSERT INTO people_orders (email, order_id) VALUES
('john.doe@example.com', 1),
('jane.smith@example.com', 2),
('alice.jones@example.com', 3),
('bob.brown@example.com', 4),
('carol.davis@example.com', 5),
('david.wilson@example.com', 6),
('eve.white@example.com', 7),
('frank.thomas@example.com', 8),
('grace.moore@example.com', 9),
('henry.taylor@example.com', 10);

-- AUTO_INCREMENT for tables
ALTER TABLE `dishes` MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `ingredients` MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `orders` MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

-- End of file
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
