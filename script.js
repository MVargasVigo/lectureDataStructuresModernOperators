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
  order: function (starter, main) {
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
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
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

/*We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀*/

/* const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, draw, team2 } = game.odds;
console.log(team1, draw, team2);
 */
