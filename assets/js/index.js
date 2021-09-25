$(document).ready(function() {

    // date
    const todaysDate = moment();

    // current date for jumbotron
    $("#currentDay").text(todaysDate.format("dddd | MMMM Do YYYY | hh:mm a"));

    // function to create rows
    function createScheduler(date) {
        
        // Set start time for 8am
        date = moment(date).hour(8);

        for (let i = 0; i < 12; i++) {

            // create div with class : row
            const rowDiv = $("<div>").addClass("row").attr("id", `row${i}`);

            //create div with classes : col-1, time-block, hour for hour display
            const hourDiv = $("<div>").addClass("col-1 hour time-block d-flex align-items-center justify-content-center").text(date.format("H a")).attr("id", `hour${i}`);

            // create div with classes : col-10 for schedule text area
            const textDiv = $("<textarea>").addClass("col-10 time-block text-box save-block").attr("id", `text${i}`);

            // create div with classes : col-1 and saveBtn for the save button
            const saveDiv = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn save-block");
            let saveBtnIcon = $("<button>").addClass("btn fas fa-save fa-lg save-button").attr("id", i).attr("title", "Save");

            // append everything to schedule container
            $(".container").append(rowDiv.append(hourDiv, textDiv, saveDiv.append(saveBtnIcon)));

            //color coding textDiv in accordance to the time
            if (todaysDate.isAfter(date, "hour")) {
                textDiv.addClass("past");
            } else if (todaysDate.isBefore(date, "hour")) {
                textDiv.addClass("future");
            } else {
                textDiv.addClass("present");
            }

            // incrementing the starting hour : checking the time first, followed by an increment
            date.add(1, "hour");
        }
    }

    // call createScheduler on page load

    $( window ).on("load", createScheduler());

    let saveButton = $(".saveBtn");
    let textBox = $(".text-box");
    let clearBtn = $(".clr-btn");

    // show the to-do's
    function displayToDo() {
        for (let i = 0; i < 12; i++) {
            let storedCalList = localStorage.getItem("text" + i);
            $("#text" + i).text(storedCalList);
        }
    }

    // add to-do's
    function addText(event) {
        event.preventDefault();
        localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
    }

    // click to save
    saveButton.click(addText);
    displayToDo();
    
    // clear all
    clearBtn.on("click", function(){
        localStorage.clear();
        textBox.empty();
        location.reload();
    });
});