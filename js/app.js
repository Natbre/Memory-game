let click = 0;
let starCount = "";
let win = 0;
let pair = 0;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var setInt = "";
let clicked = 0;

//restarting the game

function restart() {
    for (let k = 0; k < cardsList.length; k++) {
        let el = document.getElementsByClassName('card');
        el[k].setAttribute("class", "card");
        let moves = document.querySelector('span');
        moves.textContent = 0;
        click = 0;
        let starFirst = document.querySelector('li.starsFirst>i');
        starFirst.setAttribute("class", "fa fa-star");
        let starSecond = document.querySelector('li.starsSecond>i');
        starSecond.setAttribute("class", "fa fa-star");
        clearInterval(setInt);
        totalSeconds = 0;
        secondsLabel.innerHTML = "00";
        minutesLabel.innerHTML = "00";
        win = 0;
        shuffle(cardsList);
        cardsList.forEach(function(item, index) {
            let shuffleCard = document.querySelectorAll('li.card>i');
            shuffleCard[index].setAttribute("class", item);

        });

    }

}
document.querySelector('div.restart').addEventListener('click', function() {

    restart();
})


function clockStarts() {
        var totalSeconds = 0;
        setInt = setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }

        }
    }
    //defining the cards
const cardsList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube',
    'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb',
    'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'
];
//Shuffling the cards
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


shuffle(cardsList);
///Reassigning the new value after shuffle
cardsList.forEach(function(item, index) {
    let shuffleCard = document.querySelectorAll('li.card>i');
    shuffleCard[index].setAttribute("class", item);

});
let currentClass = "";

function showOpen(index) {
    ////Opening the card
    const el = document.getElementsByClassName('card');
    for (let i = 0; i < cardsList.length; i++) {
        el[i].addEventListener('click', function(e) {
            e.preventDefault();
            //Counting the clicks


            if (el[i].className === 'card') {
                clicked++;

                $(this).toggleClass("open show");


                click++;


                //Starting the clock
                if (click === 1) {
                    clockStarts();

                }
                let moves = document.querySelector('span');
                moves.textContent = parseInt(clicked);
                let cardClass = el[i].querySelector('li>i');


                let previous = cardClass.className;

                //Reducing stars after certain number of clicks
                function noFirstStar() {

                    if (click > 25) {
                        let star = document.querySelector('li.starsFirst>i');
                        star.setAttribute("class", "star");
                        starCount = 2;
                    }
                }
                noFirstStar();

                function noSecondStar() {

                    if (click > 35) {
                        let star = document.querySelector('li.starsSecond>i');
                        star.setAttribute("class", "star");
                        starCount = 1;
                    }
                }
                noSecondStar();
                //Matching the cards
                function explode() {

                    if (click % 2 === 0) {
                        //                const el = document.getElementsByClassName('card');
                        for (let p = 0; p < cardsList.length; p++) {
                            if (el[p].className !== 'card matched') {

                                // for (let j = 0; j < cardsList.length; j++) {
                                if (currentClass === previous && el[p].className === 'card open show') {
                                    el[p].setAttribute("class", "card match shake-slow");
                                    pair = 1;


                                } else {
                                    function closeCards() {
                                        if (el[p].className === 'card open show') {
                                            el[p].setAttribute("class", "card");
                                            pair = 0;
                                        }
                                    }
                                    setTimeout(closeCards, 200);
                                    //}
                                }
                            }
                        }
                    }
                }
                explode();
                currentClass = previous;
                win = win + pair;
                pair = 0;
            }
            //The pop up informing the the game is won
            function winner() {

                if (win === 8) {
                    clearInterval(setInt);
                    swal({
                        title: "Congratulations!!! You won!!!",
                        text: " Your time is " + minutesLabel.innerHTML + " min " + secondsLabel.innerHTML + " s.\n " + "You have " + starCount + " stars left.\n" + " Do you want to start over?",
                        icon: "success",
                        button: {
                            text: "Aww yiss!",
                        }
                    });
                }
            }
            setTimeout(winner, 50);
        })

    }


};


showOpen();


// function handler(e) {
//     // remove this handler
//     e.target.removeEventListener(e.type, arguments.callee);
// }
//restarting the game

function restart() {
    for (let k = 0; k < cardsList.length; k++) {
        let el = document.getElementsByClassName('card');
        el[k].setAttribute("class", "card");
        let moves = document.querySelector('span');
        moves.textContent = 0;
        click = 0;
        let starFirst = document.querySelector('li.starsFirst>i');
        starFirst.setAttribute("class", "fa fa-star");
        let starSecond = document.querySelector('li.starsSecond>i');
        starSecond.setAttribute("class", "fa fa-star");
        clearInterval(setInt);
        totalSeconds = 0;
        secondsLabel.innerHTML = "00";
        minutesLabel.innerHTML = "00";
        win = 0;
        shuffle(cardsList);
        cardsList.forEach(function(item, index) {
            let shuffleCard = document.querySelectorAll('li.card>i');
            shuffleCard[index].setAttribute("class", item);

        });

    }

}
document.querySelector('div.restart').addEventListener('click', function() {

    restart();
})