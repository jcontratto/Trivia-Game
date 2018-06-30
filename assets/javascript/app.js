$(document).ready(function() {

    //object that holds all questions and answer information
    var questions = {
        one: {
            question: "What is Spider-Man's alter ego name?",
            answers: ["Bruce Wayne", "Logan", "Peter Parker", "Tony Stark"],
            correct: "Peter Parker"
        },
        two: {
            question: "What is Bruce Wayne's butlers name?",
            answers: ["Robin", "Alfred", "Archer", "Todd"],
            correct: "Alfred"
        },
    
        three: {
            question: "How many infinity stones does Thanos need to rule the universe?",
            answers: ["0, he's already the man", "2", "5", "6"],
            correct: "6"
        },
    
        four: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        five: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        six: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        seven: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        eight: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        nine: {
            question: "?",
            answers: [""],
            correct: ""
        },
    
        ten: {
            question: "?",
            answers: [""],
            correct: ""
        },
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
    
        var reset = function() {
            time = 30;
            $(".rightAns").empty();
            $(".rightAns").remove();
            $(".main").append(timerDiv);
            $(".countdown h3").html("TIME REMAINING: " + time);
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
                
        $(".answers p").on("click", function() {
            var selected = $(this).text();
    
            //rigt and wrong box
            if (selected === questions[key].correct) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                    $(".main").append(rightDiv);
                $(".rightAns").text("THAT'S A BINGO");
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
    
    var counter = setInterval(count, 500);
    
    //shows time remaining at the top of each question
    function count() {
        time--
        $(".countdown h3").html("TIME REMAINING: " + time);
         
        if (time < 1) {
        clearInterval(counter);
        $(timerDiv).remove();
        $(questionDiv).remove();
        $(".answers p").remove();
        $(answerDiv).remove();
        $(".main").append(rightDiv);
        $(".rightAns").html("OUT OF TIME! THE CORRECT ANSWER WAS: " + questions[key].correct);
        timeout++;
        n++;
        key = keys[n];
        
            if (checkIfLast()) {
            displayFinalScore();
            } else {
            setTimeout(countReset, 3000);
            setTimeout(reset, 3000);
            setTimeout(showQA, 3000);
            }
        }
    }
    
    function checkIfLast() {
        if (key === undefined) {
        return true;
        }
        return false;
        }
    
    //timer for message after choosing answer
     function countReset() {
        counter = setInterval(count, 500);
    }
    
    //displays final score after 'check if last' returns yes
    function displayFinalScore() {
        $(".rightAns").remove();
        $(".start").css("margin-top", "30px");
        $(".start").css("display", "inline");
        $(".main").prepend("<h2>UNANSWERED: " + timeout + "</h2>");
        $(".main").prepend("<h2>INCORRECT: " + incorrect + "</h2>");
        $(".main").prepend("<h2>CORRECT: " + correct + "</h2>");
        }
    };
    
    $(document).on("click", ".start", setup);
    
});