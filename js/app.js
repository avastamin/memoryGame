
// Total card
var cardList = [
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb'
]
// list of opened cards
let openedCards = [];
// declaring number of move variable
let NumOfMoves = 0;
// declaring total number of Cards
let totalCard = cardList.length;

let counter = document.querySelector(".moves");
let displayTimer = document.getElementById('time');
// declare variables for star icons
let stars = document.querySelectorAll(".fa-star");
// declare modal for congratulations message
let modal = document.getElementById("popup1")
// declare close icon in modal
let closeicon = document.querySelector(".close");


// Main function to start Game
const startGame = () => {

  let shuffledArray = shuffle(cardList);

  //render cardlist
  renderCardLists(shuffledArray);

  // render initial number of moves
  rendernumberOfMoves(NumOfMoves)

}
//Initiate the Game
startGame();

//@description render number of moves
function rendernumberOfMoves(NumOfMoves) {
    counter.innerHTML = NumOfMoves;
}
function renderCardLists(shuffledArray) {
  const ul = document.getElementById('deck');
  shuffledArray.map(function(list){
    ul.append(createCard(list))
  })
}

//@description create single card
function createCard(cardName) {
  var li = document.createElement("li");
      li.className ="card";
      li.setAttribute('card-name', cardName);
  var i = document.createElement("i");
      i.className = "fa " + cardName;
    li.append(i)

    return li;
}

//@description counter for card list
function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayTimer.innerHTML = (minutes + ":" + seconds);

        if (++timer == 0) {
            timer = duration;
        }
    }, 1000);
}

 var clickCounter= 0;
 var lists = document.querySelectorAll(".card");

 for (var i = 0; i < lists.length; i++) {
   var list = lists[i];

   list.addEventListener("click", myCardAction);

 }

//@description onclick handle and make changes on card list
 function myCardAction() {

     if(hasClass(this,'disabled')){ return}

      clickCounter++;
      if (clickCounter == 1) {
        startTimer(1);
      }

      this.classList.add('open','show','disabled');

      openedCards.push(this);
      var len = openedCards.length;


      if(len === 2){
        NumOfMoves ++;

          if(openedCards[0].getAttribute("card-name") === openedCards[1].getAttribute("card-name")){
            // call markAsMatched function
            markAsMatched()
          } else {
            setTimeout(resetOpenedCard, 1000)
          }
      }

      if (NumOfMoves > 0) {
        // call rendernumberOfMoves function
        rendernumberOfMoves(NumOfMoves);
        // call updateRatingFunc function
        updateRatingFunc(NumOfMoves);
      }

      let matchedCard = document.getElementsByClassName("match");
      if (matchedCard.length  == totalCard) {
        // call congratulations function
        congratulations()
      }
}
//@description to check class name
//https://stackoverflow.com/a/10960588/1960558
function hasClass( elem, klass ) {
     return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
}


//@description restart button to restart game.
 var restartButton = document.getElementById("restart");
 restartButton.addEventListener("click",function(e){
   // restart game
   restartGame()

 },false);


//@description Mark cards as matched
function markAsMatched() {
  for (var i = 0; i < openedCards.length; i++) {
    openedCards[i].classList.add("match", "disabled");
    openedCards[i].classList.remove("show", "open");
  }
    openedCards = [];
}

//@description Reset opened Cards
function resetOpenedCard() {
  for (var i = 0; i < openedCards.length; i++) {
    openedCards[i].classList.remove("show", "open", "disabled");
  }
  openedCards = [];
}


/**
* @description Update ratings
* @param {number} NumOfMoves
* @returns {mixed} Update DOM event
*/
function updateRatingFunc(NumOfMoves){

    // setting rates based on moves
    if (NumOfMoves > 8 && NumOfMoves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (NumOfMoves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// @description function to show congratulations modal
function congratulations(){

        totalTime = displayTimer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = NumOfMoves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = totalTime;

        //closeicon on modal
        closeModal();

}

// @description function to close modal on congratulations message
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        // restart game
        restartGame()
    });
}


// @desciption for user to play Again
function playAgain(){
    modal.classList.remove("show");
    // call restartGame function
    restartGame()
}


//@description restart game
function restartGame() {
     window.location.reload();
}
