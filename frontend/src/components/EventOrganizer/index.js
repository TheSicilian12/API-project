export function organizeEventsByDate(eventsObj) {
    //eventArray[0] is for past events
    //eventArray[1] is for future events
    //eventArray[2] is for ongoing events
    let eventsArray = [[], [], []]

    Object.values(eventsObj).map((e) => {
        let timelineCheck = timeline(e?.startDate, e?.endDate)
        if (timelineCheck === 'past') {
            eventsArray[0].push(e)
        } else if (timelineCheck === 'future')  {
            eventsArray[1].push(e)
        } else {
            eventsArray[2].push(e)
        }
    })

    //organize the event dates from earliest date to newest date
    for (let i = 0; eventsArray.length > i; i++) {
        if (eventsArray[i].length) {
            eventsArray[i].sort((a, b) => {
                const firstDate = Date.parse(a?.endDate);
                const secondDate = Date.parse(b?.endDate);
                //past
                if (i === 0) {
                    if (firstDate < secondDate) return +1;
                    if (firstDate > secondDate) return -1;
                }
                //future
                if (i === 1) {
                    if (firstDate < secondDate) return -1;
                    if (firstDate > secondDate) return +1;
                }
                //on going
                if (i === 2) {
                    if (firstDate < secondDate) return -1;
                    if (firstDate > secondDate) return +1;
                }

                return 0;
            })
        }

    }
    // console.log('return: ', eventsArray);
    return eventsArray;
}

//helper function
function timeline(eventStartDate, eventEndDate) {
    //returns 'ongoing', 'past', or 'future'
    const todayParse = Date.parse(new Date());

    const eventStartDateParse = Date.parse(eventStartDate);
    const eventEndDateParse = Date.parse(eventEndDate);

    let response;

    if ((todayParse >= eventStartDateParse) && (todayParse <= eventEndDateParse)) {
        response = 'ongoing';
    } else if (todayParse > eventEndDateParse) {
        response = 'past';
    } else {
        response = 'future';
    }


    return response;
}
