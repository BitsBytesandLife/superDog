//Super Dog Event
let superDogEventsArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
];

loadEvents();

function loadEvents() {
    let events = [];
    events = getData();
    displayData(events);
}

function getData() {
    // is this superDogEventsArray or "superDogEventsArray"?
    let events = JSON.parse(localStorage.getItem("superDogEventsArray")) || [];


    if (events.length == 0) {
        events = superDogEventsArray;
        localStorage.setItem("superDogEventsArray", JSON.stringify(superDogEvents));
    }
    return events;
}

function saveEvent() {
    let events = JSON.parse(localStorage.getItem("superDogEventsArray")) || superDogEvents;

    let obj = {};

    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;
    obj["state"] = document.getElementById("newEventState").value;
    obj["attendance"] = document.getElementById("newEventAttendance").value;
    obj["date"] = document.getElementById("newEventDate").value;

    events.push(obj);

    localStorage.setItem("superDogEventsArray", JSON.stringify(superDogEventsArray));

    displayData(events);
}

function displayData(superDogEvents) {

    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    //clear the table
    resultsBody.innerHTML = "";


    for (let i = 0; i < superDogEvents.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("event").textContent = superDogEvents[i].event;
        dataRow.getElementById("city").textContent = superDogEvents[i].city;
        dataRow.getElementById("state").textContent = superDogEvents[i].state;
        dataRow.getElementById("attendance").textContent = superDogEvents[i].attendance;
        dataRow.getElementById("eventDate").textContent = superDogEvents[i].date;
        resultsBody.appendChild(dataRow);

    }
}

var filteredEvents = superDogEventsArray;

//build a dropdown of specific cities
function buildDropDown() {
    var eventDD = document.getElementById("eventDropDown");
    //discuss this statement
    let distinctEvents = [...new Set(superDogEventsArray.map((event) => event.city))];

    let linkHTMLEnd =
        '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultHTML = "";

    for (var i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayStats();
    displayData(events);
    loadEvents();
}

//show stats for a specific city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    curEvents = JSON.parse(localStorage.getItem("superDogEventsArray")) || superDogEvents;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        //Explain how array filtering works-
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }
    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    //display total attendance
    for (var i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}