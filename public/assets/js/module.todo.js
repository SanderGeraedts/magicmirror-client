function module_todo_showTodo() {
	var config = JSON.parse(document.getElementById('config').innerHTML);

	module_todo_getTodo(config.serverUrl);
}

function module_todo_getTodo(baseUrl) {
	var url = baseUrl + 'todo?finished=0';

	$.getJSON(url, function(data) { 
		module_todo_showTodoContinued(data);
	});
}

function module_todo_showTodoContinued(data) {
	var li1 = '<li>';
	var li2 = '</li>';

	var ul = $('#todo')[0];
	ul.innerHTML = "";

	$.each(data, function(index, item) {
		ul.innerHTML += li1 + item.name + li2;
	});
	setTimeout(module_todo_showTodo, 600000)
}