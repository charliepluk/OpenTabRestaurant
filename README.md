# OpenTabRestaurant

## Introduction

OpenTab is a point of sale service that allows for customers to order beverages and food at their favorite restaurants. It is comprised of two parts, the mobile application for customers and a web application for restaurant employees. This repository holds the web application where the restaurants can join the OpenTab service and set up their menu for customers to view and order. They will be able to manage their menu as well as the orders coming in view past orders. The OpenTab platform for the restuarant side was built using HTML5, CSS3, JavaScript, NodeJS, ExpressJS, and SQL.

The GitHub repository link for the mobile application for customers is: https://github.com/charliepluk/OpenTab

## Features
* Account Registration
* Login/Logout
* Add and Remove Menu Item
* Edit Menu Item
* Order Queue Status
* View Order Histor
* Fulfill Order
* Edit Restaurant Info

## Getting Started
### Installation and Setup
1. Install [Node.js](https://nodejs.org/) & MySQL (XAMPP on Windows/MAMP on MAC) if you haven't already.

2. Clone this repository and install its dependencies.

		> git clone git://github.com/charliepluk/OpenTabRestaurant.git OpenTabRestaurant
		> cd OpenTabRestaurant
		> npm install
		
3. Copy the opentab.sql file in the project and paste it into PHPMyAdmin to create a new DB

### Run
1. In XAMP or MAMP start the MySQL Sever on Port 3306.

3. From within the OpenTabRestaurant directory start the server.

		> npm start
		
2. Open a browser window and navigate to: [http://localhost:8000](http://localhost:8000)

## Demo video



## Contributors

* Charlie Plukfangpanya, Developer
* Akshay Patel, Developer
* Cameron Liddell, Developer

