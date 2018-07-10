$(document).ready(function () {

    //object that holds all questions and answer information
    var questions = {
        one: {
            question: "What is Spider-Man's alter ego name?",
            answers: ["Bruce Wayne", "Bruce Banner", "Peter Parker", "Tony Stark"],
            correct: "Peter Parker"
        },
        two: {
            question: "What is Bruce Wayne's butlers name?",
            answers: ["Robin", "Alfred", "Archer", "Todd"],
            correct: "Alfred"
        },
        // three: {
        //     question: "How many infinity stones does Thanos need to rule the universe?",
        //     answers: ["0, he's already the man", "3", "5", "6"],
        //     correct: "6"
        // },
        // four: {
        //     question: "Which hero is not part of the X-Men group?",
        //     answers: ["Gambit", "Cyclops", "Punisher", "Jubilee"],
        //     correct: "Punisher"
        // },
        // five: {
        //     question: "What planet is Superman from?",
        //     answers: ["Earth", "Crypton", "Wakanda", "Asgard"],
        //     correct: "Crypton"
        // },
        // six: {
        //     question: "Who is Scarlet Witch's brother?",
        //     answers: ["Vision", "Silver Surver", "Quicksilver", "Flash"],
        //     correct: "Quicksilver"
        // },
        // seven: {
        //     question: "What image is on the Punisher's costume?",
        //     answers: ["Skull", "The letter P", "A Knife", "A Bullseye"],
        //     correct: "Skull"
        // },
        // eight: {
        //     question: "What item gives the Green Lantern his super powers?",
        //     answers: ["An axe", "A Hammer", "A Ring", "A Stick"],
        //     correct: "A Ring"
        // },
        // nine: {
        //     question: "All of these characters are villians, except for?",
        //     answers: ["Deadpool", "Red Skull", "Joker", "Dr.Doom"],
        //     correct: "Deadpool"
        // },
        // ten: {
        //     question: "BONUS QUESTION: Which comic universe is way better than the other?",
        //     answers: ["Marvel", "DC"],
        //     correct: "Marvel"
        // },
    };

    //divs to contain info
    var rightDiv = $("<div class='rightAns'></div>");
    var timerDiv = $("<div class='countdown'><h3></h3></div>");
    var questionDiv = $("<div class='question'><h3></h3></div>");
    var answerDiv = $("<div class='answers'></div>");

    //return object keys
    var keys = Object.keys(questions);
    var key = keys[n];
    var time = 30;
    var n = 0;

    //reset and game setup
    function setup() {
        $(".start").css("display", "none");

        var correct = 0;
        var incorrect = 0;
        var timeout = 0;
        n = 0;

        key = keys[n];

        var reset = function () {
            $(".finalInfo").remove();
            time = 30;
            $(".rightAns").empty();
            $(".rightAns").remove();
            $(".main").append(timerDiv);
            $(".countdown h3").html("TIME LEFT: " + time);
            $(".main").append(questionDiv);
            $(".main").append(answerDiv);
        }

        reset();

        //questions and answer box
        function showQA() {
            $(".question h3").html(questions[key].question);

            for (var i = 0; i < questions[key].answers.length; i++) {
                $(".answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
            }

            $(".answers p").on("click", function () {
                var selected = $(this).text();

                //rigt and wrong box
                if (selected === questions[key].correct) {
                    clearInterval(counter);
                    $(timerDiv).remove();
                    $(questionDiv).remove();
                    $(".answers p").remove();
                    $(answerDiv).remove();
                    $(".main").append(rightDiv);
                    $(".rightAns").text("THAT'S A BINGO!");
                    correct++;
                } else {
                    clearInterval(counter);
                    $(timerDiv).remove();
                    $(questionDiv).remove();
                    $(".answers p").remove();
                    $(answerDiv).remove();
                    $(".main").append(rightDiv);
                    $(".rightAns").text("YOU'RE NOT A COMIC NERD! THE RIGHT ANSWER IS: " + questions[key].correct);
                    incorrect++;
                }
                n++;
                key = keys[n];

                //show score after last question
                if (checkIfLast()) {
                    displayFinalScore();

                } else {
                    setTimeout(countReset, 3 * 1000);
                    setTimeout(reset, 3 * 1000);
                    setTimeout(showQA, 3 * 1000);
                }
            });
        }

        showQA();

        var counter = setInterval(count, 9 * 100);

        //shows time remaining at the top of each question
        function count() {
            time--
            $(".countdown h3").html("TIME LEFT: " + time);

            if (time < 1) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                $(".main").append(rightDiv);
                $(".rightAns").html("YOU TOOK TO LONG! THE RIGHT ANSWER IS: " + questions[key].correct);
                timeout++;
                n++;
                key = keys[n];

                if (checkIfLast()) {
                    displayFinalScore();
                } else {
                    setTimeout(countReset, 3 * 1000);
                    setTimeout(reset, 3 * 1000);
                    setTimeout(showQA, 3 * 1000);
                }
            }
        }

        function checkIfLast() {
            if (key === undefined) {
                return true;
            }
            return false;
        }

        //Answer timer
        function countReset() {
            counter = setInterval(count, 9 * 100);
        }

        //Final score display
        function displayFinalScore() {
            $(".rightAns").remove();
            $(".start").css("margin-top", "30px");
            $(".start").css("display", "inline");
            $(".main").prepend("<h2 class=\"finalInfo\">UNANSWERED: " + timeout + "</h2>");
            $(".main").prepend("<h2 class=\"finalInfo\">INCORRECT: " + incorrect + "</h2>");
            $(".main").prepend("<h2 class=\"finalInfo\">CORRECT: " + correct + "</h2>");
        }
    };
    //need to have reset after game is over
    $(document).on("click", ".start", setup);

});