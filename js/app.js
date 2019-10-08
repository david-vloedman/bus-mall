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

// Change maxVotes to equal number of time the user can vote
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
  htmlController.createImgList();

};

var votingComplete = () => {
  htmlController.renderResults();
};

// ******************************
//  Product
// ******************************

var Product = function(name, filePath){
  this.name = name;
  this.filePath = filePath;
  this.clicked = 0;
  this.previouslyShown = false;
  this.appeared = 0;
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
//  imgController
// ******************************

var imgController = {

  getPaths: function(){
    var indices = imgController.getUniqueIndices();
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

    while(products[a].previouslyShown){
      a = this.getRandomIndex();
    }

    while(a === b || products[b].previouslyShown){
      b = this.getRandomIndex();
    }
    while(a === c || b === c || products[c].previouslyShown){
      c = this.getRandomIndex();
    }

    products.forEach((product, index, array) =>{
      array[index].previouslyShown = false;
    });

    products[a].appeared++;
    products[b].appeared++;
    products[c].appeared++;
    products[a].previouslyShown = true;
    products[b].previouslyShown = true;
    products[c].previouslyShown = true;

    return [a,b,c];
  },

  getRandomIndex: function(){
    return Math.floor(Math.random() * products.length);
  },
};

// ******************************
//  htmlController
// ******************************

var htmlController = {
  createImgList: function(){
    this.clearList();
    var paths = imgController.getPaths();
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
      li.innerHTML = `${item.name} was clicked ${item.clicked} times and appeared ${item.appeared}`;
      list.appendChild(li);
      var lineBreak = document.createElement('br');
      list.appendChild(lineBreak);
    });
    this.renderChart();
  },
  renderChart: function(){
    var context = document.getElementById('chart');
    chartController.setOptions(context, 'bar', '# of votes');
    chartController.makeChart();

  }
};



// ******************************
//  clickController
// ******************************

document.addEventListener('click', (e) => {
  clickController.imgClicked(e);
});


var clickController = {
  imgClicked: (event) => {
    var img = event.target.id;
    clickController.updateClicks(img);
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
//  chartController
// ******************************

var chartController = {

  context: '',
  type: '',
  properties: {
    type: '',
    data: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        backgroundColor: ''
      },{
        label: '',
        data: [],
        backgroundColor: ''
      }]
    },
  },



  setOptions: function(context, type, chartLbl){
    this.context = context;
    this.properties.type = type;

    this.properties.data.datasets[0].label = chartLbl;
    this.properties.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
    this.properties.data.datasets[1].label ='# of times shown';
    this.properties.data.datasets[1].backgroundColor = 'rgba(153, 102, 255, 0.2)';
    this.getChartData();
  },

  getChartData: function(){
    products.forEach(product => {
      this.properties.data.labels.push(product.name);
      this.properties.data.datasets[0].data.push(product.clicked);

      this.properties.data.datasets[1].data.push(product.appeared);
    });


  },

  makeChart: function(){
    return new Chart(this.context, this.properties);
  },

};


// ******************************
//  Entry Point
// ******************************

!function(){
  createProducts();
  startVote();
}();


