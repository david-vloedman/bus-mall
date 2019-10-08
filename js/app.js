'using strict';


// ******************************
//  Entry Point
// ******************************
$(document).ready(() => {
  createProducts();
  startVote();
});

// ******************************
//  Globals
// ******************************
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

var voted = 0;
var maxVotes = 25;

var createProducts = () => {
  fileNames.forEach((file) =>{
    var name = file.slice(0, file.length - 4);
    var path = '/img/' + file;
    new Product(name, path);
  });
};



var startVote = () => {
  
  if(voted === maxVotes) {
    votingComplete();
    return;
  }
  renderHTML.createImgList();
  
};

var votingComplete = () => {
  renderHTML.renderResults();
};

// ******************************
//  Product
// ******************************

var Product = function(name, filePath){
  this.name = name;
  this.filePath = filePath;
  this.clicked = 0;
  Product.pushToList(this);
};
Product.prototype.wasClicked = function(){
  
  this.clicked++;
  startVote();
};
Product.pushToList = (product) => {
  products.push(product);
};

// ******************************
//  imgGenerator
// ******************************

var imgGenerator = {

  getPaths: function(){
    var indices = imgGenerator.getUniqueIndices();    
    var paths = [];
    indices.forEach((index) => {
      paths.push(products[index]);
    });
    return paths;
  },


  getUniqueIndices: function(){
    var a = this.getRandomIndex();
    var b = this.getRandomIndex();
    var c = this.getRandomIndex();
    while(a === b){
      b = this.getRandomIndex();
    }
    while(a === c || b === c){
      c = this.getRandomIndex();
    }
    return [a,b,c];
  },

  getRandomIndex: function(){
    return Math.floor(Math.random() * products.length);
  },
};
// ******************************
//  renderHTML
// ******************************
var renderHTML = {
  createImgList: function(){
    var paths = imgGenerator.getPaths();
    var liA = '<li><img id="'+ paths[0].name + '"src="' + paths[0].filePath + '"></img></li>';
    var liB = '<li><img id="' + paths[1].name + '"src="' + paths[1].filePath + '"></img></li>';
    var liC = '<li><img id="' + paths[2].name + '"src="' + paths[2].filePath + '"></img></li>';   
    $('#images').empty();
    $('#images').append(liA + liB + liC);
    voted++;
  },

  renderResults: function(){
    $('#images').empty();
    products.forEach((product) => {
      var html = '<li>' + product.name + ' Votes:' + product.clicked + '</li><br>';
      $('#images').append(html);
    });
  }


};

document.addEventListener('click', (e) => {  
  clickManager.imgClicked(e);
});

// ******************************
//  clickManager
// ******************************

var clickManager = {
  imgClicked: (event) => {
    var img = event.target.id;
    clickManager.updateClicks(img);
  },

  updateClicks: (img) => {
    products.forEach(product => {     
      if(img === product.name) {        
        product.wasClicked();
      }
    });
  },
};

