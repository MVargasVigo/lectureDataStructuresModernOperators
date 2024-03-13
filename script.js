'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starter, main) {
    return [this.starterMenu[starter], this.mainMenu[main]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  //In the below function, we set an object as an argument and set default values to some of the properties that should be specified when the function gets called.
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
};

//Destructuring Arrays
//The code below should destructure the categories array in the restaurant object. The 'main' variable will copy the value of the first index of the categories array, and the 'secondary' variable will copy the value of the 3rd index of the same arra. Note that the 2nd index is skipped by adding a coma and a space next to the first variable.
const [main, , secondary] = restaurant.categories;

//Nested destructuring: for the following nested array:
const nested = [2, 4, [5, 6]];
//We basically write the variables exactly like the indexes of the array that we want to destructure.
const [i, , [j, k]] = nested;

//Setting default values while destructuring
const [p, q, r = 1] = [8, 9];
//Here, p and q will copy the values of the array that is destructured, but r, since there is no third index in the array, would be undefined if we don't set a default value, which in this case is the '1';

//Destructuring Objects
//Similarily to arrays, we create a variable with curly braces that coincide with the names of the property of the object that we want to extract. As so:
const { openingHours, categories } = restaurant;

//We can also destructure and change the name of the new properties by adding the new name next to the name of the property after a colon like so:
const {
  name: restaurantName,
  openingHours: hours,
  categories: tagsOne,
} = restaurant;
//When we log restaurantName, hours, and tags, their values will be copied from the specified properties of the restaurant object.

//Setting Default Values:
const { menu = [], starterMenu: starters = [] } = restaurant;
//Here, the default value of an empty array is given to both the menu and the starterMenu properties. menu doesn't exist in the object, so it will have that empty array as its value. starterMenu also gets renamed to "starters" and has a default value of an empty array in case it doesn't exist, but since it does, its value will be destructured from the restaurant object, so it will be: an array containing ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'].

//Nested Objects
//Inside of the openingsHours object, if we want to destructure the friday object and access the values of the open and close properties, we do this:
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//Destructuring objects that are passed as arguments in a function:
//For the above method called OrderDelivery:

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
//With the method created above, we are able to set default values for when the function is called and are also able to destructure its properties so that they can be used as needed. The only thing that is needed is that the object passed as an argument has the same property names as the destructured properties specified in the method created on lines 34-38.

//Spread (...) takes all of the elements from an iterable (like a string, or array) and copies them in a different place.
//We can only use the spread operator when building an array or when we pass values into a function.
//We can only use the spread operator in a place where we would otherwise write values separated by commas.

const newMenu = [...restaurant.mainMenu, 'Gnocci'];

// Spread to Copy array
const mainMenuCopy = [...restaurant.mainMenu];
// Spread to Join 2 arrays
const menuMerged = [...restaurant.starterMenu, ...restaurant.mainMenu];

const str = 'Mauricio';
const letters = [...str, ' ', 'S.'];

const ingredients = ['Tomato', 'Garlic', 'Meat'];

restaurant.orderPasta(...ingredients);

//Spread in Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
//Spread to Copyan object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';

//Rest: while spread is used to unpack elements from an array or string, rest does the opposite and packs the 'remaining' elements. Usually, the difference shows in the place of the operation. Spread is used on the right side of the =, while REST is used un the left side of the =. For example:

const [a, b, ...others] = [1, 2, 3, 4, 5];
//If we console log the others variable, the result will be an array containing the "rest" of the elements that weren't specified in the deconstructing of the array. So it will log [3, 4, 5] as the "others" variable.

//We can use both spread and rest on both sides of the assignment operator. For example:

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

//In the code above, we destructure pizza, risotto and the "rest" of the plates in the menu from the joint array of mainMenu and starterMenu. The variables pizza and risotto will have the value of the strings with the same name due to the destructuring, while the otherFood variable will have the value of an array with all the other foods. Note that one element is skipped in the destructuring (before risotto).

//Rest in destructuring objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
//If we console log the weekdays variable, the result will be an object containing the friday and thursday objects.

//Rest in functions
const add = function (...numbers) {
  console.log(numbers);
  //In the code above, the rest operator is passed as a parameter in a function, which means that once the function is called, for example with the following parameters: add(5, 3, 7, 2); the console will log [5, 3, 7, 2]. It will pack the numbers passed as parameters into an array. Since it's an array, we can also loop through an array like the following example:
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
  //The loop above will print into the console the sum of all the numbers passed as arguments to the add function. It works because when we used the rest parameter, they all get packed into a single array that then gets looped through.
};

//Short Circuiting

//With ||: It will return the first truthy result from a boolean statement. For example:

console.log(undefined || 0 || '' || 'Hello' || 23 || null);
//The code above will print out "Hello" to the console. This happens because it is the first truthy value. This is helpful when we want to set default values.

//With &&: it short circuits when the first value is falsy. If it only sees truthy values, it will return the final value. For example:

console.log('Hello' && 23 && null && 'Jonas');
//The code above will skipp Hello and 23 because they are truthy and stop at null because it is falsy. The logic here is that it will continue if everything is true, but stop if it finds something false because then it wouldn't follow the usual && logic of true & true. Practically, the && short circuit will help when we want to execute code in the second "operand" when the first one is true.

//Nullish Coalescing Operator
//Works almost the same as the or operator above, but it works with nullish values instead of falsy values. Meaning, it only considers nulls and undefined as false, while 0 and an empty string are also considered truthy. For example:
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
//The code above should log 0 instead of 10, because 0 is considered truthy for the nullish coalesching operator. If we were to use the exact same code but replacing the ?? with ||, it would log 10, even if the actual number of guests was 0, because the || operator considers 0 a falsy value, and it skips all falsys.

//Logical Assignment Operators
//Given the following objects:
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//OR assignment operator: it will assign a "default" value to the numGuests property in case it doesn't exist. It works like the short circuiting. If the property exists, it will return it, if it's not, it will skip it and return the other value. As below
rest1.numGuests ||= 10; //Will return 20
rest2.numGuests ||= 10; //Will return 10 since it doesn't exist before

rest1.numGuests = 0;
//Nullish assignment operator: exactly like the nullish coalescing, it works just like the OR operator but including 0s and empty strings. It will only consider nulls and undefineds as falsy
rest1.numGuests ??= 10; //Will return 0, since it's the actual value of the property.
rest2.numGuests ??= 10; //Will return 10 since it doesn't exist before

//AND assignment operator: will asign a value to a variable if it is currently truthy. Basically, it will replace the value of an existing variable (unless it is a falsy value. )
rest1.owner &&= 'ANONYMOUS';
rest2.owner &&= 'ANONYMOUS';

//Looping over arrays: for of. Don't forget to add the "let" or "const" to the item that loops over the array.

//Looping over objects:
///To get the keys, we can use Object.keys(desiredObject).
//To get the values, we can use Object.values(desiredObject).
//To get both, we can use Object.entries(desiredObject).

//Maps

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(1, 'Lisbon, Porugal');
//Study this later
