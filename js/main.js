var numQueries = 0;

// When the page loads,
window.addEventListener("load", function() {
	initializeEventListeners();
});

//window.setInterval(saveState, 100);

function initializeEventListeners() {
	if (localStorage.getItem('queries') === null) {
		initializeLocalStorage();
		addSearchQuery();
	} else {
		var queries = JSON.parse(localStorage.getItem('queries'));
		numQueries = queries.length;
		testInitialize();
	}
	document.getElementById('addSearchButton').addEventListener("click", addSearchQuery);
	document.getElementById('searchAllButton').addEventListener("click", searchAll);
	document.getElementById('clearAllButton').addEventListener("click", clearAll);
	document.getElementById('deleteAllButton').addEventListener("click", deleteAll);
	document.getElementById('addNumMoreSearchesButton').addEventListener("click", addNumMoreSearchQueries);	
}

function initializeLocalStorage() {
	var queries = [];
	localStorage.setItem('queries', JSON.stringify(queries));
}

function saveState() {
	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));
}

function addSearchQuery() {

	var queries = getLocalStorage();
	queries.push("");
	localStorage.setItem('queries', JSON.stringify(queries));

	numQueries++;
	testInitialize();
}

function getLocalStorage() {

	var retVal = [];

	for (var i = 0; i < numQueries; i++) {
		retVal.push(document.getElementById('search' + i).value);
	}

	return retVal;
}

function searchAll() {
	for (var i = 0; i <= numQueries; i++) {
		searchQuery(i);
	}
}

function clearAll() {
	for (var i = 0; i < numQueries; i++) {
		clearQuery(i);
	}
}

function deleteAll() {
	initializeLocalStorage();
	numQueries = 0;
	addSearchQuery();
}

function addNumMoreSearchQueries() {
	var num = parseInt(document.getElementById('numMoreQuries').value);
	document.getElementById('numMoreQuries').value = "";
	for (var i = 0; i < num; i++) {
		addSearchQuery();
	}
	//numQueries += num;
	testInitialize();
}

function testInitialize() {

	var queries = JSON.parse(localStorage.getItem('queries'));

	allForms.innerHTML = "";

	for (var i = 0; i < numQueries; i++) {
		allForms.innerHTML +=	'<div id="well"><h5>Search ' + (i+1) + ':</h5>' + 
								'<input type="text" id="search' + i + '" placeholder="Search" tabindex=' + (i+1) + '>' + 
								'<a id="searchButton' + i + '" class="btn btn-success" href="#">Search</a>' + 
								'<a id="clearButton' + i + '" class="btn btn-warning" href="#">Clear</a>' + 
								'<a id="deleteButton' + i + '" class="btn btn-danger" href="#">Delete</a>' + 
								'</div>';


	}


	for (var j = 0; j < numQueries; j++) {
		setInputs(j);
		addEvents(j);
	}

}

function setInputs(num) {
	var queries = JSON.parse(localStorage.getItem('queries'));
	if (queries[num] != "") {
		document.getElementById('search' + num).value = queries[num];
	}
}

function addEvents(num) {

	document.getElementById('search' + num).addEventListener("input", saveState);

	document.getElementById('searchButton' + num).addEventListener("click", function() {
		searchQuery(num);
	});

	document.getElementById('clearButton' + num).addEventListener("click", function() {
		clearQuery(num);
	});

	document.getElementById('deleteButton' + num).addEventListener("click", function() {
		deleteQuery(num);
	});
}

function searchQuery(num) {
	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));

	var query = document.getElementById('search' + num).value;
	if (query == "") {
		return false;
	}
	var url = 'https://google.com/search?q=' + query;
	window.open(url, '_blank');
}

function clearQuery(num) {
	document.getElementById('search' + num).value = "";

	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));
}

function deleteQuery(num) {
	console.log("Deleting " + num);

	var queries = [];
	for (var i = 0; i < numQueries; i++) {
		if (i != num) {
			queries.push(document.getElementById('search' + i).value);
		}
	}
	localStorage.setItem('queries', JSON.stringify(queries));

	numQueries--;
	if (numQueries == 0) {
		numQueries = 1;
		testInitialize();
	}
	testInitialize();
}
