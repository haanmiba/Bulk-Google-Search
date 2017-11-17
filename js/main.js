// listNumQueries corresponds with the current number of queries in the list panel.
var listNumQueries = 0;

// numTableQueries corresponds with the current number of rows and columns in the table panel.
var tableNumQueries = {
	rows: 0,
	cols: 0
}

// When the page loads, initialize the event handlers for our buttons at the bottom of the popup window.
window.addEventListener("load", initializeProgram);

// Initialize event handlers and initialize local storage.
function initializeProgram() {

	// STARTING STATE: If our local storage does not contain a JSON array called list-queries, initialize it.
	if (localStorage.getItem('list-queries') === null) {

		// Initialize our list for local storage.
		listResetLocalStorage();

		// Add a single search query.
		listAddSearchQuery();

	} else { // Else, a JSON array called list-queries already exists.
		
		// Retrieve our JSON array list-queries.
		var listQueries = JSON.parse(localStorage.getItem('list-queries'));

		// listNumQueries is assigned to the number of entries in our JSON array most recently saved to our local storage.
		listNumQueries = listQueries.length;

		// Refresh the list.
		listRefresh();

	}

	/*
	// STARTING STATE: If our local storage does not contain a JSON array called table-queries, initialize it.
	if (localStorage.getItem('table-queries') === null) {

		// Initialize our table for local storage.
		tableResetLocalStorage();

		tableAddRow();

	} else {

		// Retrieve our JSON array table-queries.
		var tableQueries = JSON.parse(localStorage.getItem('table-queries'));

		tableNumQueries.rows = tableQueries.length;
		tableNumQueries.cols = tableQueries[0].length;
	}*/

	document.getElementById('list-tab-to-be-selected').addEventListener("click", function() { toggle(0); });
	document.getElementById('table-tab-to-be-selected').addEventListener("click", function() { toggle(1); });

	toggle(0);

	document.getElementById('list-search-all-button').addEventListener("click", listSearchAll);
	document.getElementById('list-clear-all-button').addEventListener("click", listClearAll);
	document.getElementById('list-delete-all-button').addEventListener("click", listDeleteAll);
}

// Create an empty array and set it to our local storage for list-queries.
function listResetLocalStorage() {
	var listQueries = [];
	localStorage.setItem('list-queries', JSON.stringify(listQueries));
	var listCheckboxes = [];
	localStorage.setItem('list-checkboxes', JSON.stringify(listCheckboxes));
}

// Create an empty array and set it to our local storage for table-queries.
function tableResetLocalStorage() {
	var tableQueries = [];
	localStorage.setItem('table-queries', JSON.stringify(tableQueries));
}

// Toggles between the two panels being displayed.
function toggle(num) {
	var lta = document.getElementById('list-tab-already-selected');
	var lts = document.getElementById('list-tab-to-be-selected');
	var tta = document.getElementById('table-tab-already-selected');
	var tts = document.getElementById('table-tab-to-be-selected');
	var lp = document.getElementById('list-panel');
	var tp = document.getElementById('table-panel');

	if (num == 0) {
		lta.style.display = 'inline-block';
		lts.style.display = 'none';
		tta.style.display = 'none';
		tts.style.display = 'inline-block';
		lp.style.display = 'block';
		tp.style.display = 'none';
	} else {
		lta.style.display = 'none';
		lts.style.display = 'inline-block';
		tta.style.display = 'inline-block';
		tts.style.display = 'none';
		lp.style.display = 'none';
		tp.style.display = 'block';

	}
}

// Saves the current state of the list based upon any text on the page.
function listSaveState() {
	var listQueries = listGetLocalStorage();
	localStorage.setItem('list-queries', JSON.stringify(listQueries));
	var listCheckboxes = listGetCheckboxes();
	localStorage.setItem('list-checkboxes', JSON.stringify(listCheckboxes));
}

function listGetLocalStorage() {

	// Create an empty array.
	var retVal = [];

	// Add to that array all of the values from the text inputs.
	for (var i = 0; i < listNumQueries; i++) {
		retVal.push(document.getElementById('list-cell-' + i).textContent);
	}
	// Return the array.
	return retVal;
}

function listGetCheckboxes() {

	var retVal = [];

	var checkboxes = document.getElementsByClassName('list-checkboxes');

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			retVal.push(1);
		} else {
			retVal.push(0);
		}
	}

	return retVal;

}

function listSearchAll() {
	for (var i = 0; i < listNumQueries; i++) {
		listPerformSearch(i);
	}
}

function listClearAll() {
	for (var i = 0; i < listNumQueries; i++) {
		listClearSearch(i);
	}
}

function listDeleteAll() {
	listResetLocalStorage();
	listClearAll();
	listNumQueries = 0;
	listAddSearchQuery();
}

function listAddSearchQuery() {

	// Retrieves our list stored in local storage, appends "" to the end, and then sets it in local storage.
	var listQueries = listGetLocalStorage();
	listQueries.push("");
	localStorage.setItem('list-queries', JSON.stringify(listQueries));

	var listCheckboxes = listGetCheckboxes();
	listCheckboxes.push(0);
	localStorage.setItem('list-checkboxes', JSON.stringify(listCheckboxes));

	listNumQueries++;
	listRefresh();
}

function listAddSearchQuery(num) {
	var listQueries = listGetLocalStorage();
	listQueries.splice(num+1, 0, "");
	localStorage.setItem('list-queries', JSON.stringify(listQueries));

	var listCheckboxes = listGetCheckboxes();
	listCheckboxes.splice(num+1, 0, 0);
	localStorage.setItem('list-checkboxes', JSON.stringify(listCheckboxes));	

	listNumQueries++;
	listRefresh();
}

function listRefresh() {

	var lb = document.getElementById('list-body');
	lb.innerHTML = "";
	lb.innerHTML += '<tr><th class="list-cell-checkbox"><input id="list-check-all-checkbox" type="checkbox"></th><th>Search term</th><th></th></tr>';

	for (var i = 0; i < listNumQueries; i++) {

		lb.innerHTML += '<tr><td class="list-cell-checkbox"><input class="list-checkboxes" type="checkbox"></td><td id="list-cell-' + i + '" tabindex=' + (i+1) + ' contenteditable></td>' + 
						'<td>' + 
							'<span class="icon-buttons">' + 
							'<a id="list-add-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/add-button-image.png"></a>' + 
							'<a id="list-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/search-button-image.png"></a>' + 
							'<a id="list-clear-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/clear-button-image.png"></a>' + 
							'<a id="list-delete-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/delete-button-image.png"></a>' + 
							'</span>' + 
						'</td>' + 
						'</tr>';

	}

	lb.innerHTML += '<tr><td colspan="3"><input type="number" id="list-num-more-searches" placeholder="Add # more rows"><a id="list-add-num-more-searches-button" class="btn btn-primary" href="#">Submit</a></td></tr>';

	listInitializeCheckboxes();

	document.getElementById('list-add-num-more-searches-button').addEventListener('click', listAddNumMoreSearches);

	for (var i = 0; i < listNumQueries; i++) {
		listSetInput(i);
		listAddEventListeners(i);
	}

}

function listAddNumMoreSearches() {

	var num = parseInt(document.getElementById('list-num-more-searches').value);

	document.getElementById('list-num-more-searches').value = "";

	for (var i = 0; i < num; i++) {
		listAddSearchQuery();
	}

}

function listSetInput(num) {

	var listQueries = JSON.parse(localStorage.getItem('list-queries'));
	if (listQueries[num] != "") {
		document.getElementById('list-cell-' + num).textContent = listQueries[num];
	}

	var checkboxesBinary = JSON.parse(localStorage.getItem('list-checkboxes'));
	var checkboxes = document.getElementsByClassName('list-checkboxes');
	if (checkboxesBinary[num] == 1) {
		checkboxes[num].checked = true;
	}

}

function listAddEventListeners(num) {

	document.getElementById('list-check-all-checkbox').addEventListener("click", listCheckAll);

	document.getElementById('list-cell-' + num).addEventListener("input", function() {
		listSaveState();
		listSetCheck(num);
	});

	document.getElementById('list-add-search-button-' + num).addEventListener("click", function() {
		listAddSearchQuery(num);
	});

	document.getElementById('list-search-button-' + num).addEventListener("click", function() {
		listPerformSearch(num);
	});

	document.getElementById('list-clear-button-' + num).addEventListener("click", function() {
		listClearSearch(num);
	});

	document.getElementById('list-delete-button-' + num).addEventListener("click", function() {
		listDeleteSearch(num);
	});

}

function listCheckAll() {

	var checkboxes = document.getElementsByClassName('list-checkboxes');
	var checkAllCheckbox = document.getElementById('list-check-all-checkbox');

	if (checkAllCheckbox.checked == true || checkAllCheckbox.indeterminate == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = true;
		}

		checkAllCheckbox.checked = true;
		checkAllCheckbox.indeterminate = false;

	} else if (checkAllCheckbox.checked == false) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false;
		}

		checkAllCheckbox.checked = false;
		checkAllCheckbox.indeterminate = false;

	}

	listSaveState();

}

function listSetCheck(num) {
	var checkboxes = document.getElementsByClassName('list-checkboxes');
	if (document.getElementById('list-cell-' + num).textContent != "") {
		checkboxes[num].checked = true;
	} else {
		checkboxes[num].checked = false;		
	}

	listSaveState();

}

function listInitializeCheckboxes() {

	var checkboxes = document.getElementsByClassName('list-checkboxes');
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener("click", listSetCheckAllState);
	}

}

function listSetCheckAllState() {
	var checkboxes = document.getElementsByClassName('list-checkboxes');

	var allChecked = true;
	var atLeastOneChecked = false;
	var noneChecked = true;

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked == true) {
			atLeastOneChecked = true;
		} else {
			allChecked = false;
			break;
		}
	}

	if (allChecked) {
		document.getElementById('list-check-all-checkbox').checked = true;
		checkAllCheckbox.indeterminate = false;
	} else if (atLeastOneChecked) {
		document.getElementById('list-check-all-checkbox').indeterminate = true;
		document.getElementById('list-check-all-checkbox').checked = false;
	}

	listSaveState();

}

function listPerformSearch(num) {

	listSaveState();

	var checkboxes = document.getElementsByClassName('list-checkboxes');

	var query = document.getElementById('list-cell-' + num).textContent;

	if (query == "") {
		return false;
	}

	var url = 'https://google.com/search?q=' + encodeHTML(query);

	if (checkboxes[num].checked) {
		window.open(url, '_blank');
	}

}

function listClearSearch(num) {
	document.getElementById('list-cell-' + num).textContent = "";
	var checkboxes = document.getElementsByClassName('list-checkboxes');
	checkboxes[num].checked = false;
	listSaveState();
}

function listDeleteSearch(num) {

	var listQueries = JSON.parse(localStorage.getItem('list-queries'));
	var checkboxesBinary = JSON.parse(localStorage.getItem('list-checkboxes'));

	listQueries.splice(num, 1);
	checkboxesBinary.splice(num, 1);

/*

	var listQueries = [];
	var checkboxesBinary = [];

	
	var checkboxes = document.getElementsByClassName('list-checkboxes');


	for (var i = 0; i < listNumQueries; i++) {
		if (i != num) {
			listQueries.push(document.getElementById('list-cell-' + i).textContent);

			if (checkboxes[i].checked) {
				checkboxesBinary.push(1);
			} else {
				checkboxesBinary.push(0);
			}
		}
	}*/


	localStorage.setItem('list-queries', JSON.stringify(listQueries));
	localStorage.setItem('list-checkboxes', JSON.stringify(checkboxesBinary));

	listNumQueries--;

	if (listNumQueries == 0) {
		listAddSearchQuery();
		return true;
	}

	listRefresh();

}

function tableAddRow() {

	//

}

function tableAddColumn() {

	//

}

function refreshTable() {

}

// Converts str special characters (+, -, #, $, ...) to hex for searching. Example: 'C++' will become 'C%2B%2B'
function encodeHTML(str) {

	// Create an empty string we will be appending to
	var retVal = "";

	// Scan through the str
	for (var i = 0; i < str.length; i++) {

		// Get the decimal character code of every single character in str
		var dCharCode = str[i].charCodeAt();

		// If the decimal character code is a non-letter, non-number character (according to ASCII), convert it to hex
		if (dCharCode < 65 || dCharCode > 127 || (dCharCode > 90 && dCharCode < 97)) {
			retVal += ('%' + str[i].charCodeAt().toString(16));
		} else { // Else, just append the regular character to our retVal without modification
			retVal += str[i];
		}
	}

	// Return our retVal. A string now optimal for searching.
	return retVal;
}