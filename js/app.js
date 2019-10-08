'using strict';

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
  console.log(voted);
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
    this.clearList();
    var paths = imgGenerator.getPaths();
    var lineItems = [1,2,3];
    lineItems.forEach((item, index, array) => {
      array[index] = document.createElement('li');
      var childImg = document.createElement('img');
      childImg.id = paths[index].name;
      childImg.src = paths[index].filePath;
      array[index].appendChild(childImg);
    });
    var list = document.getElementById('images');
    lineItems.forEach((item) => {
      list.appendChild(item);
    });
    voted++;
  },

  clearList: function(){
    var list = document.getElementById('images');    
    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
  },

  renderResults: function(){
    this.clearList();
    var list = document.getElementById('images');
    products.forEach(item => {
      var li = document.createElement('li');
      li.innerHTML = `${item.name} was clicked ${item.clicked} times`;
      list.appendChild(li);
      var lineBreak = document.createElement('br');
      list.appendChild(lineBreak);
    });
  }
};



// ******************************
//  clickManager
// ******************************

document.addEventListener('click', (e) => {
  clickManager.imgClicked(e);
});


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

// ******************************
//  Entry Point
// ******************************

!function(){
  createProducts();
  startVote();
}();


