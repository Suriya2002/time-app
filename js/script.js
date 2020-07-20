/* *************************************************************************** */
/* Get user Name */
/* *************************************************************************** */
function getUserName() {
    let name = localStorage.getItem('name');

    // Check the local storage if the name is already stored
    if (name == null || name == 'null') {
        name = prompt('Enter you name: ');
        localStorage.setItem('name', name);
    }
    name = name[0].toUpperCase() + name.slice(1);
    document.querySelector('.greetings__name').innerHTML = name;
}

function init() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let greeting = 'Good morning';
    let monthDate = 0;
    let datesDate = date.getDate();
    let dateSuperScript = 'th';

    // Store months in an array
    const months = [];
    months[0] = 'January';
    months[1] = 'February';
    months[2] = 'March';
    months[3] = 'April';
    months[4] = 'May';
    months[5] = 'June';
    months[6] = 'July';
    months[7] = 'August';
    months[8] = 'September';
    months[9] = 'October';
    months[10] = 'November';
    months[11] = 'December';

    // Change am-pm according to time
    amPm = getAmPm(hour);

    // Generate greetings according to the time
    greeting = getGreetings(hour);

    // Change background according to time
    changeBackground(hour);

    // Change to 12 hours clock
    hour = change12HoursClock(hour);

    // Change super-script (st, nd, rd, th) on date according to time
    dateSuperScript = changeSuperScript(datesDate);

    // Add zero infront, if time is less than 10
    hour = addZero(hour);
    minute = addZero(minute);
    second = addZero(second);
    monthDate = addZero(monthDate);

    // Update User Interface
    document.querySelector('.time__hour').innerHTML = hour;
    document.querySelector('.time__minutes').innerHTML = minute;
    document.querySelector('.time__seconds').innerHTML = second;
    document.querySelector('.time__am-pm').innerHTML = amPm;
    document.querySelector('.greetings__time').innerHTML = greeting;

    document.querySelector('.date__day').innerHTML = datesDate;
    document.querySelector('.date__month').innerHTML = months[date.getMonth()];
    document.querySelector('.date__super-script').innerHTML = dateSuperScript;
    document.querySelector('.date__year').innerHTML = date.getFullYear();

    // Refresh init function every 0.5 seconds (to display correct seconds)
    let temp = setTimeout(init, 500);
}

// Displays the text input only when clicked on the google icon and disappears if clicked anywhere else.
document.querySelector('.google').addEventListener('click', function () {
    document.querySelector('.search').style.transform = 'scale(1)';
});
document.querySelector('.container').addEventListener('click', function (ev) {
    document.querySelector('.search').style.transform = 'scale(0)';

    // This is important! If removed, we'll get both alerts.
    ev.stopPropagation();
});

/* *************************************************************************** */
/* Am/Pm Implementation */
/* *************************************************************************** */
function getAmPm(hour) {
    if (hour < 12) return 'am';
    else return 'pm';
}

/* *************************************************************************** */
/* Greetings Implementation */
/* *************************************************************************** */
function getGreetings(hour) {
    if (hour > 3 && hour < 12) {
        return 'Good morning';
    } else if (hour >= 12 && hour < 16) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

/* *************************************************************************** */
/* 12 Hours Clock format Implementation */
/* *************************************************************************** */
function change12HoursClock(hour) {
    if (hour > 12) return hour - 12;
    return hour;
}

/* *************************************************************************** */
/* Super Script (on date) Implementation */
/* *************************************************************************** */
// Returns super script on date according to time.
function changeSuperScript(date) {
    if (Math.floor((date % 100) / 10) === 1) return 'th';

    if (date % 10 === 1) return 'st';
    else if (date % 10 === 2) return 'nd';
    else if (date % 10 === 3) return 'rd';
    else return 'th';
}

/* *************************************************************************** */
/* Background Change Implementation */
/* *************************************************************************** */
function changeBackground(hour) {
    document.body.style.backgroundImage = `url('images/${hour}.jpg')`;
}

/* *************************************************************************** */
/* Zero Innfront of Time (if time < 10) Implementation */
/* *************************************************************************** */
function addZero(time) {
    if (time < 10) time = '0' + time;
    return time;
}

init();
getUserName();
