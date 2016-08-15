var CLIENT_ID = '603736822733-56f5asr612kpnore5ajomjtln78rjh49.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		loadCalendarApi();
	}
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
	gapi.auth.authorize(
		{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
		handleAuthResult);
	return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
	gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
	var request = gapi.client.calendar.events.list({
		'calendarId': 'primary',
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': 5,
		'orderBy': 'startTime'
	});

	request.execute(function(resp) {
		var events = resp.items;
		var ul = $('#appointments')[0];
		ul.innerHTML = "";

		if (events.length > 0) {
			for (i = 0; i < events.length; i++) {
				var event = events[i];
				var when = new Date(event.start.dateTime);
				var now = new Date();
				var timeDiff = Math.abs(when.getTime() - now.getTime());
				when = Math.round(timeDiff / (1000 * 3600 * 24)); 
				if (!when) {
					when = event.start.date;
				}
				if(typeof when == 'undefined') {
					appendPre(event.summary + ' (vandaag)');	
				} else if(when == 1) {
					appendPre(event.summary + ' (morgen)');	
				} else{
					appendPre(event.summary + ' (over ' + when + ' dagen)');	
				}
			}
		} else {
			appendPre('No upcoming events found.');
		}

	});
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
	var ul = $('#appointments')[0];
	var textContent = '<li>' + message + '</li>';
	ul.innerHTML += textContent;

	setTimeout(checkAuth, 1000 * 60 * 60);
}

//mzi0fcPHxygoLMX7kbkNDKeqFW1DqWfd