'using strict';

// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// Create a constructor function that creates an object associated with each product, and has the following properties:
//      Name of the product
//      File path of image
//
// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
//
// Attach an event listener to the section of the HTML page where the images are going to be displayed.
//
// Once the users ‘clicks’ a product, generate three new products for the user to pick from.


const fileNames = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];


var products = [];


var createProducts = () => {
  fileNames.forEach((file) =>{
    var name = file.slice(0, file.length - 4);
    var path = '/img/' + file;
    new Product(name, path);
  });
};

$(document).ready(() => {
  startVoting();

});

var startVoting = () => {
  createProducts();
  console.log(products);
  renderHTML.createImgList();
};


var Product = function(name, filePath){
  this.name = name;
  this.filePath = filePath;
  Product.pushToList(this);
};

Product.pushToList = (product) => {
  products.push(product);
};


var imgGenerator = {
  getPaths: function(){
    var indices = imgGenerator.getUniqueIndices();
    var paths = [];
    

    indices.forEach((index) => {
      paths.push(products[index].filePath);
    });
    return paths;
  },


  getUniqueIndices: function(){
    var indexA;
    var indexB;
    var indexC;
    indexA = imgGenerator.getRandomIndex(null);
    indexB = imgGenerator.getRandomIndex([indexA]);
    indexC = imgGenerator.getRandomIndex([indexA, indexB]);    
    console.log([indexA, indexB, indexC]);
    return [indexA, indexB, indexC];
  },

  getRandomIndex: function(claimedIndices){    
    console.log(claimedIndices);
    var randomNumber = Math.floor(Math.random() * products.length);
    if(claimedIndices === null){
      return randomNumber;
    }
    claimedIndices.forEach((index) => {
      if(randomNumber === parseInt(index)){
        console.log('going back');
        imgGenerator.getRandomIndex(claimedIndices);
      }
    });
    return randomNumber;
  },
};
    
   




  





var renderHTML = {
  createImgList: function(){
    var paths = imgGenerator.getPaths();
    var liHtml = '<li><img src="' + paths[0] + '"></img></li><li><img src="' + paths[1] + '"></img></li><li><img src="' + paths[2] + '"></img></li>';
    $('#images').append(liHtml);
  }
};







//As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
//
//    Add onto your constructor function a property to hold the number of times a product has been clicked.
//
//     After every selection by the viewer, update the newly added property to reflect if it was clicked.









// As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
//
// By default, the user should be presented with 25 rounds of voting before ending the session.
//
// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.







//As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
//
//  Create a prototype property attached to the product object that keeps track of all the products that are currently being considered.
//
//  After voting rounds have been completed, remove the event listeners on the product.
//
//  Display the list of all the products followed by the votes received and number of times seen for each. Example: Banana Slicer had 3 votes
