const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const N=1; // generates the AI cars 1- 100 - Used for training Algo
const cars=generateCars(N);
// set the local memory to save the trained algo data
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}
// Creates the DUMMY car and locates/ draws them on the road
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-00,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1000,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1000,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1400,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1800,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2000,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2250,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2250,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2450,30,50,"DUMMY",2,getRandomColor()),
];

animate();
// SAVE THE BEST TRAINING ALGO IN THE LOCAL MEMORYS
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}
// DELETES THE TRAINED ALGO FROM THE LOCAL MEMEORY
function discard(){
    localStorage.removeItem("bestBrain");
}
// Generates self-driving car (AI), N: can be adjusted between 1-100
function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}


function animate(time){
    // loop through the traffic array i.e cars, and update each of them and to keep in mind the road borders.
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    
    for(let i =0; i<cars.length;i++){
       // updates the Car object
    cars[i].update(road.borders, traffic);  
    }
   
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
    
    // resize the canvas
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    //cam on top, creates an illusion the road is moving
    carCtx.save();
    // set the car positions on the canvas
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    // draw the car and road object on to the canvas
    road.draw(carCtx);
    //car.draw(carCtx);

    // a loop through to draw each  dummy car
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha =0.2;
    // draws the AI carm
    for(let i =0; i<cars.length;i++){
        cars[i].draw(carCtx);
    }

    carCtx.globalAlpha =1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    // call the animate method again and again to give an illusion of movement 
    requestAnimationFrame(animate);
}

