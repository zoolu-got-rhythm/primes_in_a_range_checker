
// returns boolean
const isFactorOf = (f, n) => {
    return n % f === 0
};

// returns string or array: generic return type?
const isPrime = (n) => {
    // range syntax
    let primeFactors = [], factors = [];
    for(let i = 0; i <= n; i++){
        if(isFactorOf(i, n) && (i === 1 || i === n)){
            primeFactors.push(i)
        }else if(isFactorOf(i, n)){
            factors.push(i);
        }
    }

    return primeFactors.length === 2 && factors.length === 0 ? "prime!" : factors;
};


const range = (min, max, fn) => {
    for(let i = min; i <= max; i++){
        fn(i, min, max)
    }
};

const checkPrimesInRange = (minVal, maxVal) => {
    let numbersInRange = [];
    range(minVal, maxVal, (i) => {
        numbersInRange.push(i);
    });

    let hashMap = {};

    numbersInRange.forEach((ele) => {hashMap[String(ele)] = isPrime(ele)});
    return hashMap;
};



// MVC CODE 

// model for storing primes data
class CurrentPrimesResultsInMemory {

    constructor(){
        this._numberOfUpdates = 0;
        this._currentPrimesResults = {};
    }

    get currentPrimesResults() {
        return this._currentPrimesResults;
    }

    set currentPrimesResults(value) {
        this._currentPrimesResults = value;
        render(this);
    }

    set numberOfUpdates(value) {
        this._numberOfUpdates = value;
        render(this);
    }

    get numberOfUpdates(){
        return this._numberOfUpdates;
    }

    incrementNumberOfUpdates(){
        render(this);
        this._numberOfUpdates++;
    }
}

let primesModel = new CurrentPrimesResultsInMemory();


// update view/dom logic here
const render = (model) => {
    // wipe prev results
    let viewContainer = document.getElementById("primesResults");
    let numberOfUpdatesContainer = document.getElementById("numberOfUpdates");
    numberOfUpdatesContainer.innerHTML = "number of updates " + model._numberOfUpdates;
    viewContainer.innerHTML = "";

    let dataToRenderAsArray = [];
    for(let prop in model.currentPrimesResults){
        dataToRenderAsArray.push(typeof model.currentPrimesResults[prop] === "string" ?
            prop + ": is a prime" : prop + " is not a prime: here are factors for it: "
            + model.currentPrimesResults[prop]); // type cohersion into string
    }

    let domList = document.createElement("ul");

    const dataMappedToDomElements = dataToRenderAsArray.forEach((primesResultsData) => {
        let listItemEntry = document.createElement("li");
        listItemEntry.appendChild(document.createTextNode(primesResultsData));
        domList.appendChild(listItemEntry);
    });

    viewContainer.appendChild(domList);
};

// instantiate primes model object

// controller: update model from here
const primesController = (e) => {
    var minVal = Number(document.getElementById("min").value);
    var maxVal = Number(document.getElementById("max").value);

    if((isNaN(minVal)|| isNaN(maxVal)) || minVal > maxVal){
        alert("please enter valid positive integers, with min being lower than max");
        return;
    }

    // update model using a setter
    let getRangeOfPrimesResults = checkPrimesInRange(minVal, maxVal);
    primesModel.incrementNumberOfUpdates();
    primesModel.currentPrimesResults = getRangeOfPrimesResults;
};

const checkPrimesButton = document.getElementById("submit_range_for_primes_btn");
checkPrimesButton.addEventListener("click", primesController);

// set initial  model state, will trigger render
primesModel.numberOfUpdates = 0;


