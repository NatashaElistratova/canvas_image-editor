import './style.css';

let canvasFrame = document.getElementById('canvasFrame');
let context = canvasFrame.getContext("2d");
let goButton = document.getElementById('goButton');
let paint = false;
let clickX = [];
let clickY = [];
let clickDrag = [];
let clearButton = document.getElementById('clearButton');
let colorButton = document.getElementsByClassName('colorButton');
let sizeButton = document.getElementsByClassName('sizeButton');
let colorPurple = "#cb3594";
let colorGreen = "#659b41";
let colorYellow = "#ffcf33";
let colorBrown = "#986928";
let curColor = colorGreen;
let clickColor = [];
let sizeSmall = 2;
let sizeNormal = 5;
let sizeLarge = 10;
let curSize = sizeNormal;
let clickSize = [];
let photoUrl;

//load image
function loadImage(url){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
				let photo = this.response;
							photo = JSON.parse(photo);
							photoUrl = photo.url;

							let img = new Image();
								img.onload = () => {
									context.drawImage(img, 0, 0);
								};
								img.src = photoUrl;
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.send();
  });
}

goButton.onclick = () => {
	loadImage(`${API}/photos/1`);
};

//clear canvas
function clearCanvas(){
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];
	context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
}
canvasFrame.onmousedown = function({pageX, pageY}){

  paint = true;
  addClick(pageX - this.offsetLeft, pageY - this.offsetTop);
  redraw();
};

canvasFrame.onmousemove = function({pageX, pageY}) {
  if(paint){
    addClick(pageX - this.offsetLeft, pageY - this.offsetTop, true);
    redraw();
  }
};

canvasFrame.onmouseup = e => {
  paint = false;
};

canvasFrame.onmouseleave = e => {
  paint = false;
};

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function redraw(){

  context.lineJoin = "round";

  for(let i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);

	   context.strokeStyle = clickColor[i];
	   context.lineWidth = clickSize[i];
     context.closePath();
     context.stroke();
  };
};

// end drawing

clearButton.onclick = clearCanvas;

// colors

for(let i=0; i<colorButton.length; i++){
	colorButton[i].onclick = clickColorButton;
}
function clickColorButton(){
    for(let i=0; i<colorButton.length; i++){
       colorButton[i].classList.remove('button_active');
    };
    this.classList.add('button_active');

    switch(this.id){
        case 'colorPurple':
           curColor = colorPurple;
           break;
       case 'colorGreen':
           curColor = colorGreen;
           break;
       case 'colorYellow':
           curColor = colorYellow;
           break;
       case 'colorBrown':
           curColor = colorBrown;
           break;
    };
}
// end colors

// size
for(let i=0; i<sizeButton.length; i++){
	sizeButton[i].onclick = clickSizeButton;
}
function clickSizeButton(){
    for(let i=0; i<sizeButton.length; i++){
       sizeButton[i].classList.remove('button_active');
    };
    this.classList.add('button_active');

    switch(this.id){
        case 'sizeSmall':
           curSize = sizeSmall;
           break;
       case 'sizeNormal':
           curSize = sizeNormal;
           break;
       case 'sizeLarge':
           curSize = sizeLarge;
           break;
    };
};
