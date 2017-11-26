// scripts.js
function Phone(name, brand, price, color) {
	this.brand = brand;
	this.price = price;
	this.color = color;
	this.name = name;
}

Phone.prototype.printInfo = function () {
		console.log('The phone name is ' + this.name + ' brand is ' + this.brand +', color is '+ this.color +' and the price is ' + this.price +' zł.');
}

var iPhone6S = new Phone ('iPhone 6s ', 'Apple', 1649, 'silver');
var samsungGalaxyS6 = new Phone ('Samsung Galaxy S6 ','Samsung', 1099, 'gold');
var onePlusOne = new Phone ('One Plus One','One Plus', 1989, 'black');

iPhone6S.printInfo();
samsungGalaxyS6.printInfo();
onePlusOne.printInfo();


