// listNumQueries corresponds with the current number of queries in the list panel.
var listNumQueries = 0;

// numTableQueries corresponds with the current number of rows and columns in the table panel.
var tableNumQueries = {
	rows: 0,
	cols: 0
}

var url = 'https://google.com/search?q=~query~';

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

		// Set the state of the check all checkbox
		listSetCheckAllState();

	}
	
	// STARTING STATE: If our local storage does not contain a JSON array called table-queries, initialize it.
	if (localStorage.getItem('table-queries') === null) {

		// Initialize our table for local storage.
		tableResetLocalStorage();

		tableInitialize();

		tableRefresh();

	} else {

		// Retrieve our JSON array table-queries.
		var tableQueries = JSON.parse(localStorage.getItem('table-queries'));

		tableNumQueries.rows = tableQueries.length;
		tableNumQueries.cols = tableQueries[0].length;

		tableRefresh();

		// Set the states of the check-all checkboxes
		tableSetCheckAllState();
		tableSetCheckRowOrColState('table-row-checkboxes');
		tableSetCheckRowOrColState('table-col-checkboxes');

	}

	// Create toggle functionality between the two panels of list and table. Always start at list.
	document.getElementById('list-tab-to-be-selected').addEventListener("click", function() { toggle(0); });
	document.getElementById('table-tab-to-be-selected').addEventListener("click", function() { toggle(1); });
	toggle(0);


	// Add functionality for the list's 'Search All', 'Clear All', and 'Delete All' buttons
	document.getElementById('list-search-all-button').addEventListener("click", listSearchAll);
	document.getElementById('list-clear-all-button').addEventListener("click", listClearAll);
	document.getElementById('list-delete-all-button').addEventListener("click", listDeleteAll);
	document.getElementById('list-advanced-button').addEventListener("click", function() {
		togglePanel('#list-advanced-panel');
	});
	document.getElementById('list-add-url-button').addEventListener("click", function() {
		togglePanel('#list-add-url-panel');
	});
	document.getElementById('list-set-url-button').addEventListener("click", function() {
		if (document.getElementById('list-add-url-panel').style.display == 'block') {
			togglePanel(('#list-add-url-panel'));
		}
		togglePanel('#list-set-url-panel');
	});
	document.getElementById('list-invert-checked-button').addEventListener("click", listInvertChecked);
	document.getElementById('list-search-checked-button').addEventListener("click", function() {
		listSearchCheckedOrUnchecked(1);
	});
	document.getElementById('list-search-unchecked-button').addEventListener("click", function() {
		listSearchCheckedOrUnchecked(0);
	});
	
	document.getElementById('list-format-search-open-panel-button').addEventListener("click", function() {
		togglePanel('#list-format-search-panel');
	});
	document.getElementById('list-format-search-button').addEventListener("click", function() {
		togglePanel('#list-format-search-dropdown-content');
	});
	document.getElementById('list-format-search-checked').addEventListener("click", function() {
		listFormatSearchCheckedOrUnchecked(1);
	});
	document.getElementById('list-format-search-unchecked').addEventListener("click", function() {
		listFormatSearchCheckedOrUnchecked(0);
	});
	document.getElementById('list-format-search-all').addEventListener("click", function() {
		listFormatSearch();
	});

	document.getElementById('list-clear-checked-button').addEventListener("click", function() {
		listClearCheckedOrUnchecked(1);
	});
	document.getElementById('list-clear-unchecked-button').addEventListener("click", function() {
		listClearCheckedOrUnchecked(0);
	});

	document.getElementById('list-delete-checked-button').addEventListener("click", function() {
		listDeleteCheckedOrUnchecked(1);
	});
	document.getElementById('list-delete-unchecked-button').addEventListener("click", function() {
		listDeleteCheckedOrUnchecked(0);
	});
	document.getElementById('list-delete-empty-cells-button').addEventListener("click", function() {
		listDeleteEmptyCells();
	});
	document.getElementById('list-save-list-button').addEventListener("click", listSaveList);
	document.getElementById('list-load-list-button').addEventListener("click", function() {
		togglePanel('#list-list-of-saved-lists-container');
	});





	document.getElementById('table-add-num-more-rows-button').addEventListener("click", function() {
		tableAddNumMoreSearches(0);
	});
	document.getElementById('table-add-num-more-cols-button').addEventListener("click", function() {
		tableAddNumMoreSearches(1);
	});

	document.getElementById('table-search-all-button').addEventListener("click", function() {
		togglePanel('#table-search-all-dropdown-content');
	});
	document.getElementById('table-search-all-row-by-row-button').addEventListener("click", function() {
		tableSearchAll(0);
	});
	document.getElementById('table-search-all-col-by-col-button').addEventListener("click", function() {
		tableSearchAll(1);
	});

	document.getElementById('table-clear-all-button').addEventListener("click", tableClearAll);
	document.getElementById('table-delete-all-button').addEventListener("click", tableInitialize);
	document.getElementById('table-advanced-button').addEventListener("click", function() {
		togglePanel('#table-advanced-panel');
	});

	refreshSavedURLs();
	listRefreshSavedLists();

}

function refreshSavedURLs() {
	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	document.getElementById('list-set-url-panel').innerHTML = "";
	for (var i = 0; i < savedURLs.length; i++) {
		document.getElementById('list-set-url-panel').innerHTML += '<div class="list-saved-url-container"><div class="panel-content"><a id="list-saved-url-' + i + '-button" class="alignleft" href="#">' + savedURLs[i].name +'</a><a id="list-delete-saved-list-' + i + '" class="list-delete-saved-list alignright" href="#">Delete</a><div class="clear"></div></div></div>';
	}
	for (var i = 0; i < savedURLs.length; i++) {
		setURLEventListeners(i);
	}
}

function setURLEventListeners(i) {
	document.getElementById('list-saved-url-' + i + '-button').addEventListener("click", function() {
		setURL(i);
	});
}

function setURL(i) {
	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	url = savedURLs[i].url;
}

function listInvertChecked() {
	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i] = (-1) * (checkboxes[i] - 1);
	}
	localStorage.setItem('list-checkboxes', JSON.stringify(checkboxes));
	listRefresh();
	listSetCheckAllState();
}

function listRefreshSavedLists() {
	var savedLists = JSON.parse(localStorage.getItem('list-saved-lists'));
	document.getElementById('list-list-of-saved-lists-container').innerHTML = "";
	for (var i = 0; i < savedLists.length; i++) {
		document.getElementById('list-list-of-saved-lists-container').innerHTML += '<div class="list-saved-list-container"><div class="panel-content"><a id="list-delete-saved-list-' + i + '" class="list-delete-saved-list alignright" href="#">Delete</a><a id="list-saved-list-' + i + '-button" class="alignleft" href="#">' + savedLists[i].name +'</a></div><div class="clear"></div></div>';
	}
	for (var i = 0; i < savedLists.length; i++) {
		listSavedListEventListeners(i);
	}
}

function listSavedListEventListeners(i) {

	document.getElementById('list-saved-list-' + i + '-button').addEventListener("click", function() {
		listLoadList(i);
	});
	document.getElementById('list-delete-saved-list-' + i).addEventListener("click", function() {
		listDeleteSavedList(i);
	});
}

function listDeleteSavedList(i) {

	console.log('test');

	var savedLists = JSON.parse(localStorage.getItem('list-saved-lists'));

	savedLists.splice(i, 1);

	localStorage.setItem('list-saved-lists', JSON.stringify(savedLists));

	listRefreshSavedLists();

}

function listSaveList() {
	var listSave = {
		name: document.getElementById('list-name-cell').textContent,
		queries: JSON.parse(localStorage.getItem('list-queries'))
	}

	console.log(listSave);

	var savedLists = JSON.parse(localStorage.getItem('list-saved-lists'));
	var listAlreadyExists = false;
	for (var i = 0; i < savedLists.length; i++) {
		if (savedLists[i].name == listSave.name) {
			savedLists[i] = listSave;
			listAlreadyExists = true;
			break;
		}
	}

	if (!listAlreadyExists) {
		savedLists.push(listSave);		
	}

	localStorage.setItem('list-saved-lists', JSON.stringify(savedLists));

	listRefreshSavedLists();

}


function listLoadList(num) {

	var savedLists = JSON.parse(localStorage.getItem('list-saved-lists'));

	localStorage.setItem('list-name', savedLists[num].name);
	localStorage.setItem('list-queries', JSON.stringify(savedLists[num].queries));
	listNumQueries = savedLists[num].queries.length;

	listRefresh();

	for (var i = 0; i < listNumQueries; i++) {
		listSetCheck(i);
	}

	listSetCheckAllState();

}

function listFormatSearch() {
	var queries = [];
	var textContent = document.getElementById('list-search-textarea').value;
	var listNameUsed = '~' + document.getElementById('list-name-cell').textContent + '~';

	if (textContent.indexOf(listNameUsed) !== -1) {
		var textSplit = textContent.split(listNameUsed).join("«");
		for (var i = 0; i < listNumQueries; i++) {
			var str = textSplit;
			var cellContent = document.getElementById('list-cell-'+i).textContent;
			if (cellContent != "") {
				str = str.replace("«", document.getElementById('list-cell-'+i).textContent);
				queries.push(str);
			}
		}
		var data = {
			data: queries,
			url
		}
		performSearchBackground(queries);

		//chrome.runtime.sendMessage(queries);
		return true;
	}

	queries.push(textContent);

	if (textContent != "") {
		performSearchBackground(queries);
		//chrome.runtime.sendMessage(queries);		
	}

}

function listFormatSearchCheckedOrUnchecked(checkedOrUnchecked) {
	var queries = [];
	var textContent = document.getElementById('list-search-textarea').value;
	var listNameUsed = '~' + document.getElementById('list-name-cell').textContent + '~';
	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));
	if (textContent.indexOf(listNameUsed) !== -1) {
		var textSplit = textContent.split(listNameUsed).join("«");
		console.log(checkboxes[0]);
		for (var i = 0; i < listNumQueries; i++) {
			if (checkboxes[i] == checkedOrUnchecked) {
				var str = textSplit;
				var cellContent = document.getElementById('list-cell-'+i).textContent;
				if (cellContent != "") {
					str = str.replace("«", document.getElementById('list-cell-'+i).textContent);
					queries.push(str);
				}
			}
		}
		performSearchBackground(queries);
		//chrome.runtime.sendMessage(queries);
		return true;
	}

	queries.push(textContent);

	if (textContent != "") {
		performSearchBackground(queries);
		//chrome.runtime.sendMessage(queries);		
	}

}

// Create an empty array and set it to our local storage for list-queries.
function listResetLocalStorage() {

	// Create an empty array and set 'list-queries' in local storage to that empty array.
	var listQueries = [];
	localStorage.setItem('list-queries', JSON.stringify(listQueries));

	// Create an empty array and set 'list-checkboxes' in local storage to that empty array.
	var listCheckboxes = [];
	localStorage.setItem('list-checkboxes', JSON.stringify(listCheckboxes));

	var listName = 'List Name';
	localStorage.setItem('list-name', listName);

	var savedLists = [];
	if (localStorage.getItem('list-saved-lists') === null) {
		localStorage.setItem('list-saved-lists', JSON.stringify(savedLists));		
	}

	var savedURLs = [];
	if (localStorage.getItem('saved-urls') === null) {
		var names = ["Google", "YouTube", "Amazon"];
		var urls = ["https://google.com/search?q=~query~", "https://www.youtube.com/results?search_query=~query~","https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=~query~"];
		for (var i = 0; i < urls.length; i++) {
			var entry = {
				name: names[i],
				url: urls[i]
			}
			savedURLs.push(entry);
		}
		localStorage.setItem('saved-urls', JSON.stringify(savedURLs));
	}

}

// Create an empty array and set it to our local storage for table-queries.
function tableResetLocalStorage() {

	var tableRow = [];
	var tableQueries = [];
	tableQueries.push(tableRow);
	localStorage.setItem('table-queries', JSON.stringify(tableQueries));

	var tableRowCheckboxes = [];
	localStorage.setItem('table-row-checkboxes', JSON.stringify(tableRowCheckboxes));

	var tableColCheckboxes = [];
	localStorage.setItem('table-col-checkboxes', JSON.stringify(tableColCheckboxes));

	var tableHeaders = [];
	localStorage.setItem('table-headers', JSON.stringify(tableHeaders));

}

// Toggles between the two panels being displayed.
function toggle(num) {

	console.log('switched');

	var lta = document.getElementById('list-tab-already-selected');
	var lts = document.getElementById('list-tab-to-be-selected');
	var tta = document.getElementById('table-tab-already-selected');
	var tts = document.getElementById('table-tab-to-be-selected');
	var lp = document.getElementById('list-panel');
	var tp = document.getElementById('table-panel');
	var extensionWindow = document.getElementById('extension-window');

	if (num == 0) {
		lta.style.display = 'inline-block';
		lts.style.display = 'none';
		tta.style.display = 'none';
		tts.style.display = 'inline-block';
		lp.style.display = 'block';
		tp.style.display = 'none';
		extensionWindow.style.width = "500px";
	} else {
		lta.style.display = 'none';
		lts.style.display = 'inline-block';
		tta.style.display = 'inline-block';
		tts.style.display = 'none';
		lp.style.display = 'none';
		tp.style.display = 'block';
		extensionWindow.style.width = "800px";
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

	var queries = [];
	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));
	for (var i = 0; i < listNumQueries; i++) {
		if (document.getElementById('list-cell-' + i).textContent != "") {
			queries.push(document.getElementById('list-cell-' + i).textContent);
		}
		/*
		if (checkboxes[i] == 1 && document.getElementById('list-cell-' + i).textContent != "") {
			queries.push(document.getElementById('list-cell-' + i).textContent);
		}*/
	}

	performSearchBackground(queries);
	//chrome.runtime.sendMessage(queries);

}

function listSearchCheckedOrUnchecked(checkedOrUnchecked) {
	var queries = []
	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));
	for (var i = 0; i < listNumQueries; i++) {
		if (checkboxes[i] == checkedOrUnchecked && document.getElementById('list-cell-' + i).textContent != "") {
			queries.push(document.getElementById('list-cell-' + i).textContent);
		}
	}

	//performSearchBackground(queries);
	chrome.runtime.sendMessage(queries);

}

function listClearAll() {
	for (var i = 0; i < listNumQueries; i++) {
		listClearSearch(i);
	}
}

function listClearCheckedOrUnchecked(checkedOrUnchecked) {
	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));
	for (var i = 0; i < listNumQueries; i++) {
		if (checkboxes[i] == checkedOrUnchecked) {
			listClearSearch(i);
		}
	}	
}

function listDeleteAll() {
	listResetLocalStorage();
	listClearAll();
	listNumQueries = 0;
	listAddSearchQuery();
}

function listDeleteCheckedOrUnchecked(checkedOrUnchecked) {

	var checkboxes = JSON.parse(localStorage.getItem('list-checkboxes'));

	for (var i = (listNumQueries-1); i >= 0; i--) {
		if (checkboxes[i] == checkedOrUnchecked) {
			listDeleteSearch(i);
		}
	}

}

function listDeleteEmptyCells() {
	for (var i = (listNumQueries-1); i >= 0; i--) {
		if (document.getElementById('list-cell-' + i).textContent === "") {
			listDeleteSearch(i);
		}
	}
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


function listAddSearchQueryAtIndex(num) {
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
	lb.innerHTML += '<tr><th class="list-cell-checkbox"><input id="list-check-all-checkbox" type="checkbox"></th><th id="list-name-cell" contenteditable></th><th></th></tr>';

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

	lb.innerHTML += '<tr><td colspan="3"><input type="number" id="list-num-more-searches" placeholder="Add # more rows"><span class="divider"></span><a id="list-add-num-more-searches-button" class="btn btn-primary" href="#">Submit</a></td></tr>';

	listInitializeCheckboxes();

	document.getElementById('list-name-cell').textContent = localStorage.getItem('list-name');
	document.getElementById('list-name-cell').addEventListener("input", listSaveName);
	document.getElementById('list-name-text-button').innerHTML = '<a id="list-name-text-to-text-area-button" href="#" class="btn btn-info">' + document.getElementById('list-name-cell').textContent +'</a>';
	document.getElementById('list-name-text-to-text-area-button').outerHTML = document.getElementById('list-name-text-to-text-area-button').outerHTML;
	document.getElementById('list-name-text-to-text-area-button').addEventListener("click", function() {
		document.getElementById('list-search-textarea').value += '~' + document.getElementById('list-name-text-to-text-area-button').textContent + '~';
	});
	document.getElementById('list-add-num-more-searches-button').addEventListener('click', listAddNumMoreSearches);

	for (var i = 0; i < listNumQueries; i++) {
		listSetInput(i);
		listAddEventListeners(i);
	}

	listSaveState();

}

function listSaveName() {
	var name = document.getElementById('list-name-cell').textContent;
	localStorage.setItem('list-name', name);

	document.getElementById('list-name-text-button').innerHTML = '<a id="list-name-text-to-text-area-button" href="#" class="btn btn-info">' + name +'</a>';
	document.getElementById('list-name-text-to-text-area-button').outerHTML = document.getElementById('list-name-text-to-text-area-button').outerHTML;
	document.getElementById('list-name-text-to-text-area-button').addEventListener("click", function() {
		document.getElementById('list-search-textarea').value += '~' + document.getElementById('list-name-text-button').textContent + '~';
	});

}

function listAddNumMoreSearches() {

	var num = parseInt(document.getElementById('list-num-more-searches').value);

	document.getElementById('list-num-more-searches').value = "";

	for (var i = 0; i < num; i++) {
		listAddSearchQuery();
	}

	listSetCheckAllState();

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
		listSetCheckAllState();
	});

	document.getElementById('list-add-search-button-' + num).addEventListener("click", function() {
		listAddSearchQueryAtIndex(num);
		listSetCheckAllState();
	});

	document.getElementById('list-search-button-' + num).addEventListener("click", function() {
		listPerformSearch(num);
	});

	document.getElementById('list-clear-button-' + num).addEventListener("click", function() {
		listClearSearch(num);
		listSetCheckAllState();
	});

	document.getElementById('list-delete-button-' + num).addEventListener("click", function() {
		listDeleteSearch(num);
		listSetCheckAllState();
	});

}

function listCheckAll() {

	var checkboxes = document.getElementsByClassName('list-checkboxes');
	var checkAllCheckbox = document.getElementById('list-check-all-checkbox');

	if (checkAllCheckbox.checked == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = true;
		}

		checkAllCheckbox.checked = true;
		checkAllCheckbox.indeterminate = false;

	} else if (checkAllCheckbox.checked == false || checkAllCheckbox.indeterminate == true) {

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

function getSum(total, num) {
	return total + num;
}

function listSetCheckAllState() {

	var checkboxes = listGetCheckboxes();
	var sum = checkboxes.reduce(getSum);

	var allChecked = false;
	var atLeastOneChecked = false;
	var noneChecked = false;

	if (sum == listNumQueries) {
		allChecked = true;
	} else if (sum == 0) {
		noneChecked = true;
	} else if (sum != 0) {
		atLeastOneChecked = true;
	}

	if (allChecked) {
		document.getElementById('list-check-all-checkbox').checked = true;
		document.getElementById('list-check-all-checkbox').indeterminate = false;
	} 

	if (atLeastOneChecked) {
		document.getElementById('list-check-all-checkbox').indeterminate = true;
	} 

	if (noneChecked) {
		document.getElementById('list-check-all-checkbox').checked = false;
		document.getElementById('list-check-all-checkbox').indeterminate = false;
	}

	listSaveState();

}

function listPerformSearch(num) {

	listSaveState();

	var checkboxes = document.getElementsByClassName('list-checkboxes');

	var query = document.getElementById('list-cell-' + num).textContent;

	if (query == "" || !checkboxes[num].checked) {
		return false;
	}

	var openURL = url.split('~query~').join(encodeHTML(query));

	if (checkboxes[num].checked) {
		window.open(openURL, '_blank');
	}

}

function listClearSearch(num) {
	document.getElementById('list-cell-' + num).textContent = "";
	var checkboxes = document.getElementsByClassName('list-checkboxes');
	checkboxes[num].checked = false;
	listSetCheckAllState();
	listSaveState();
}

function listDeleteSearch(num) {

	var listQueries = JSON.parse(localStorage.getItem('list-queries'));
	var checkboxesBinary = JSON.parse(localStorage.getItem('list-checkboxes'));

	listQueries.splice(num, 1);
	checkboxesBinary.splice(num, 1);

	localStorage.setItem('list-queries', JSON.stringify(listQueries));
	localStorage.setItem('list-checkboxes', JSON.stringify(checkboxesBinary));

	listNumQueries--;

	if (listNumQueries == 0) {
		listAddSearchQuery();
		return true;
	}

	listRefresh();

	listSetCheckAllState();

}

function tableSaveState() {
	var tableQueries = tableGetLocalStorage();
	localStorage.setItem('table-queries', JSON.stringify(tableQueries));

	var tableRowCheckboxes = tableGetCheckboxes('table-row-checkboxes');
	localStorage.setItem('table-row-checkboxes', JSON.stringify(tableRowCheckboxes));

	var tableColCheckboxes = tableGetCheckboxes('table-col-checkboxes');
	localStorage.setItem('table-col-checkboxes', JSON.stringify(tableColCheckboxes));

}

function tableGetLocalStorage() {

	var retVal = [];

	for (var i = 0; i < tableNumQueries.rows; i++) {

		var retValRows = [];

		for (var j = 0; j < tableNumQueries.cols; j++) {
			retValRows.push(document.getElementById('table-cell-' + i + '-' + j).textContent);
		}

		retVal.push(retValRows);

	}

	return retVal;

}

function tableGetCheckboxes(className) {

	var retVal = [];

	var checkboxes = document.getElementsByClassName(className);

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			retVal.push(1);
		} else {
			retVal.push(0);
		}
	}

	return retVal;

}

function tableGetHeaders() {
	var retVal = [];

	for (var i = 0; i < tableNumQueries.cols; i++) {
		retVal.push(document.getElementById('table-header-' + i).textContent);
	}

	return retVal;

}

function tableInitialize() {

	var tableRow = [];
	tableRow.push("");

	var tableQueries = [];
	tableQueries.push(tableRow);
	localStorage.setItem('table-queries', JSON.stringify(tableQueries));

	var tableRowCheckboxes = [];
	tableRowCheckboxes.push(0);
	localStorage.setItem('table-row-checkboxes', JSON.stringify(tableRowCheckboxes));

	var tableColCheckboxes = [];
	tableColCheckboxes.push(0);
	localStorage.setItem('table-col-checkboxes', JSON.stringify(tableColCheckboxes));	

	var tableHeaders = [];
	tableHeaders.push('Search term');
	localStorage.setItem('table-headers', JSON.stringify(tableHeaders));

	tableNumQueries.rows = 1;
	tableNumQueries.cols = 1;

	tableRefresh();

}

function tableAddRow() {

	var tableQueries = tableGetLocalStorage();
	var tableNewRow = [];

	for (var i = 0; i < tableNumQueries.cols; i++) {
		tableNewRow.push("");
	}

	tableQueries.push(tableNewRow);
	localStorage.setItem('table-queries', JSON.stringify(tableQueries));

	tableNumQueries.rows++;

	tableRefresh();

}

function tableAddColumn() {

	var tableQueries = tableGetLocalStorage();

	for (var i = 0; i < tableNumQueries.rows; i++) {
		tableQueries[i].push("");
	}

	localStorage.setItem('table-queries', JSON.stringify(tableQueries));

	tableNumQueries.cols++;


	var tableHeaders = JSON.parse(localStorage.getItem('table-headers'));
	tableHeaders.push('Search term ' + tableNumQueries.cols);
	localStorage.setItem('table-headers', JSON.stringify(tableHeaders));

	tableRefresh();

}

function tableRefresh() {

	var tb = document.getElementById('table-body');
	tb.innerHTML = "";

	tb.innerHTML += '<tr id="table-top-row">' +
						'<td class="table-cell-checkbox">' + 
							'<input id="table-check-all-checkbox" type="checkbox">' + 
						'</td>' + 
						'<td class="table-cell-col-checkbox table-cell-checkbox">' + 
							'<input id="table-col-check-all-checkbox" type="checkbox">' + 
						'</td>';

	var ttr = document.getElementById('table-top-row');
	
	for (var i = 0; i < tableNumQueries.cols; i++) {
		ttr.innerHTML += '<td class="table-cell-checkbox"><input class="table-col-checkboxes table-checkboxes" type="checkbox"></td>';
	}

	ttr.innerHTML += '<td></td><td></td></tr>';

	tb.innerHTML += '<tr id="table-header-row">' + 
						'<td class="table-cell-checkbox">' + 
							'<input id="table-row-check-all-checkbox" type="checkbox">' + 
						'</td>' + 
						'<td></td>';

	var tableHeaders = JSON.parse(localStorage.getItem('table-headers'));

	var th = document.getElementById('table-header-row');

	for (var i = 0; i < tableNumQueries.cols; i++) {
		th.innerHTML += '<th id="table-header-' + i + '" class="table-headers" contenteditable>' + tableHeaders[i] + '</th>';
	}

	th.innerHTML += '<td></td><td></td></tr>';

	for (var i = 0; i < tableNumQueries.rows; i++) {
		tb.innerHTML += '<tr id="table-row-' + i + '"></tr>';
		var row = document.getElementById('table-row-' + i);

		row.innerHTML += 	'<td class="table-cell-checkbox">' + 
								'<input class="table-row-checkboxes table-checkboxes" type="checkbox">' + 
							'</td><td></td>';

		for (var j = 0; j < tableNumQueries.cols; j++) {
			row.innerHTML += '<td id="table-cell-' + i + '-' + j + '" contenteditable></td>';
		}


		row.innerHTML +=	'<td class="icon-buttons-cell">' + 
							'<span>' + 
							'<a id="table-row-add-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/add-button-image.png"></a>' + 
							'<a id="table-row-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/search-button-image.png"></a>' + 
							'<a id="table-row-clear-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/clear-button-image.png"></a>' + 
							'<a id="table-row-delete-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/delete-button-image.png"></a>' + 
							'</span>' + 
							'</td>' + 
							'<td class="table-smart-search-cell">' +
							'<a id="table-smart-search-button-' + i + '" class="btn btn-success dropdown-toggle">Format Search</a>' +
							'<div id="table-smart-search-panel-' + i + '" class="toggleable green-dropdown-panel">' +
							'</div>' +
							'</td>';

		var smartPanel = document.getElementById('table-smart-search-panel-' + i);
		smartPanel.innerHTML +=	'<form id="table-smart-search-form-' + i + '">' + 
								'</form>';

	}

	tb.innerHTML +=	'<tr id="table-bottom-row"><td></td><td></td></tr>';
	var tbr = document.getElementById('table-bottom-row');

	for (var i = 0; i < tableNumQueries.cols; i++) {
		tbr.innerHTML +=	'<td class="icon-buttons-cell">' + 
							'<span>' + 
							'<a id="table-col-add-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/add-button-image.png"></a>' + 
							'<a id="table-col-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/search-button-image.png"></a>' + 
							'<a id="table-col-clear-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/clear-button-image.png"></a>' + 
							'<a id="table-col-delete-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/delete-button-image.png"></a>' + 
							'</span>' + 
							'</td>';
	}

	tbr.innerHTML += '<td></td><td></td>';

	tableInitializeCheckboxes();

	for (var i = 0; i < tableNumQueries.rows; i++) {
		for (var j = 0; j < tableNumQueries.cols; j++) {
			tableSetInput(i, j);
			tableAddEventListeners(i, j);
		}
	}

	tableSetCheckboxes();

	for (var i = 0; i < tableNumQueries.rows; i++) {
		tableAddEventListenersToButtons(0, i);
		tableSetSmartSearch(i);
	}

	for (var j = 0; j < tableNumQueries.cols; j++) {
		tableAddEventListenersToButtons(1, j);
	}

	tableSaveState();

}

function tableSetSmartSearch(i) {

/*
	var checkboxes = document.getElementsByClassName('table-col-checkboxes');

	var smartPanelForm = document.getElementById('table-smart-search-form-' + i);
	var numOfCheckboxes = 0;
	smartPanelForm.innerHTML = "";
	for (var j = 0; j < tableNumQueries.cols; j++) {
		var tableCell = document.getElementById('table-cell-' + i + '-' + j);
		if (tableCell.textContent != "") {
			smartPanelForm.innerHTML += '<input id="checkbox-for-cell-' + i + '-' + j + '" value="' + tableCell.textContent +'" type="checkbox" checked><label for="checkbox-for-cell-' + i + '-' + j + '">' + tableCell.textContent + '</label><br>';
			numOfCheckboxes++;
		}
	}
	smartPanelForm.innerHTML += '<label>Delimeter: </label><input id="table-smart-search-delimeter-' + i + '" type="text" size="1" maxlength="1">' +
	'<br><input type="button" id="table-perform-smart-search-button-' + i + '" class="btn btn-primary" value="Smart Search"/>';
	document.getElementById('table-perform-smart-search-button-' + i).addEventListener("click", function() {
		tableSmartSearch(i, numOfCheckboxes);
	});*/

	var smartPanelForm = document.getElementById('table-smart-search-form-' + i);
	var numOfButtons = 0;

	smartPanelForm.innerHTML = "";

	for (var j = 0; j < tableNumQueries.cols; j++) {
		var tableCell = document.getElementById('table-cell-' + i + '-' + j);
		if (tableCell.textContent != "") {
			smartPanelForm.innerHTML += '<a href="#" class="btn btn-info table-smart-search-button" id="button-for-cell-' + i + '-' + j + '">' + tableCell.textContent +'</a><br>';
			numOfButtons++;
		}
	}

	smartPanelForm.innerHTML += '<div class="textarea-padding"><textarea id="table-smart-search-textarea-' + i + '"></textarea></div>' + 
								'<a id="table-perform-smart-search-button-' + i + '" class="btn btn-primary">Search</a>';

	for (var j = 0; j < tableNumQueries.cols; j++) {
		var tableCell = document.getElementById('table-cell-' + i + '-' + j);
		if (tableCell.textContent != "") {
			tableSmartSearchAddEventListener(i, j);
		}
	}


	document.getElementById('table-perform-smart-search-button-' + i).addEventListener("click", function() {
		searchByString(document.getElementById('table-smart-search-textarea-' + i).value);
	});

}

function tableSmartSearchAddEventListener(i, j) {

	var textarea = document.getElementById('table-smart-search-textarea-' + i);

	document.getElementById('button-for-cell-' + i + '-' + j).addEventListener("click", function() {
		textarea.value += document.getElementById('button-for-cell-' + i + '-' + j).textContent;
	});
}

function tableSmartSearch(i, numOfCheckboxes) {

	var str = "";

	for (var j = 0; j < numOfCheckboxes; j++) {
		if (document.getElementById('checkbox-for-cell-' + i + '-' + j).checked) {
			str += document.getElementById('checkbox-for-cell-' + i + '-' + j).value;
		}
		if (j != (numOfCheckboxes-1)) {
			str += document.getElementById('table-smart-search-delimeter-' + i).value;
		}
	}


	searchByString(str);

}

function tableSetInput(i, j) {

	var tableQueries = JSON.parse(localStorage.getItem('table-queries'));

	if (tableQueries[i][j] != "") {
		document.getElementById('table-cell-' + i + '-' + j).textContent = tableQueries[i][j];
	}

}

function tableSetCheckboxes() {

	var rowCheckboxesBinary = JSON.parse(localStorage.getItem('table-row-checkboxes'));
	var rowCheckboxes = document.getElementsByClassName('table-row-checkboxes');
	for (var i = 0; i < rowCheckboxesBinary.length; i++) {
		if (rowCheckboxesBinary[i] == 1) {
			rowCheckboxes[i].checked = true;
		}
	}

	var colCheckboxesBinary = JSON.parse(localStorage.getItem('table-col-checkboxes'));
	var colCheckboxes = document.getElementsByClassName('table-col-checkboxes');
	for (var i = 0; i < colCheckboxesBinary.length; i++) {
		if (colCheckboxesBinary[i] == 1) {
			colCheckboxes[i].checked = true;
		}
	}

}

function tableAddEventListeners(i, j) {

	document.getElementById('table-check-all-checkbox').addEventListener("click", tableCheckAll);
	document.getElementById('table-row-check-all-checkbox').addEventListener("click", function() {
		tableCheckRowOrCol('table-row-checkboxes', 'table-row-check-all-checkbox');
		tableSetCheckAllState();

	});
	document.getElementById('table-col-check-all-checkbox').addEventListener("click", function() {
		tableCheckRowOrCol('table-col-checkboxes', 'table-col-check-all-checkbox');
		tableSetCheckAllState();

	});

	document.getElementById('table-header-' + j).addEventListener("input", tableSaveHeaders);

	document.getElementById('table-cell-' + i + '-' + j).addEventListener("input", function() {
		tableSaveState();
		tableSetCheck(i, j);
		tableSetCheckRowOrColState('table-row-checkboxes');
		tableSetCheckRowOrColState('table-col-checkboxes');
		tableSetCheckAllState();
		tableSetSmartSearch(i);
	});

}

function tableAddEventListenersToButtons(rowOrCol, num) {

	var stringRC;

	if (rowOrCol == 0) {
		stringRC = 'row';
		document.getElementById('table-smart-search-button-' + num).addEventListener("click", function() {
			togglePanel('#table-smart-search-panel-' + num);
		});
	} else if (rowOrCol == 1) {
		stringRC = 'col';
	}


	document.getElementById('table-' + stringRC + '-add-search-button-' + num).addEventListener("click", function() {
		tableAddRowOrColAtIndex(rowOrCol, num);
		tableSetCheckAllState();
		tableSetCheckRowOrColState('table-row-checkboxes');
		tableSetCheckRowOrColState('table-col-checkboxes');

	});

	document.getElementById('table-' + stringRC + '-search-button-' + num).addEventListener("click", function() {
		tableSearchRowOrCol(rowOrCol, num);
	});

	document.getElementById('table-' + stringRC + '-clear-button-' + num).addEventListener("click", function() {
		tableClearRowOrCol(rowOrCol, num);
		tableSetCheckAllState();
		tableSetCheckRowOrColState('table-row-checkboxes');
		tableSetCheckRowOrColState('table-col-checkboxes');
	});

	document.getElementById('table-' + stringRC + '-delete-button-' + num).addEventListener("click", function() {
		tableDeleteRowOrCol(rowOrCol, num);
		tableSetCheckAllState();
		tableSetCheckRowOrColState('table-row-checkboxes');
		tableSetCheckRowOrColState('table-col-checkboxes');
	});

}

function tableAddRowOrColAtIndex(rowOrCol, num) {

	var tableQueries = tableGetLocalStorage();
	if (rowOrCol == 0) {

		var newEmptyRow = [];
		for (var i = 0; i < tableNumQueries.cols; i++) {
			newEmptyRow.push("");
		}
		tableQueries.splice(num+1, 0, newEmptyRow);
		tableNumQueries.rows++;

		var checkboxes = tableGetCheckboxes('table-row-checkboxes');
		checkboxes.splice(num+1, 0, 0);
		localStorage.setItem('table-row-checkboxes', JSON.stringify(checkboxes));

	} else if (rowOrCol == 1) {

		for (var i = 0; i < tableNumQueries.rows; i++) {
			tableQueries[i].splice(num+1, 0, "");
		}
		tableNumQueries.cols++;

		var checkboxes = tableGetCheckboxes('table-col-checkboxes');
		checkboxes.splice(num+1, 0, 0);
		localStorage.setItem('table-col-checkboxes', JSON.stringify(checkboxes));

		var headers = JSON.parse(localStorage.getItem('table-headers'))
		headers.splice(num+1, 0, 'Search term ' + (tableNumQueries.cols));
		localStorage.setItem('table-headers', JSON.stringify(headers));

	}

	localStorage.setItem('table-queries', JSON.stringify(tableQueries));
	tableRefresh();
}

function tableSearchRowOrCol(rowOrCol, num) {

	tableSaveState();

	var queries = [];
	var rowCheckboxes = JSON.parse(localStorage.getItem('table-row-checkboxes'));
	var colCheckboxes = JSON.parse(localStorage.getItem('table-col-checkboxes'));

	if (rowOrCol == 0) {
		for (var i = 0; i < tableNumQueries.cols; i++) {
			var query = document.getElementById('table-cell-' + num + '-' + i).textContent;
			if (colCheckboxes[i] == 1 && rowCheckboxes[num] == 1 && query != "") {
				queries.push(query);
			}
		}
	} else if (rowOrCol == 1) {
		for (var j = 0; j < tableNumQueries.rows; j++) {
			var query = document.getElementById('table-cell-' + j + '-' + num).textContent;
			if (rowCheckboxes[j] == 1 && colCheckboxes[num] == 1 && query != "") {
				queries.push(query);
			}
		}
	}

	performSearchBackground(queries);

	//chrome.runtime.sendMessage(queries);

}

function tableClearRowOrCol(rowOrCol, num) {

	if (rowOrCol == 0) {

		for (var i = 0; i < tableNumQueries.cols; i++) {
			document.getElementById('table-cell-' + num + '-' + i).textContent = "";
			var checkboxes = document.getElementsByClassName('table-row-checkboxes');
			checkboxes[num].checked = false;

			tableSetCheck(num, i);

			tableSetCheckRowOrColState('table-row-checkboxes');
			tableSetCheckAllState();
			tableSaveState();
		}

	} else if (rowOrCol == 1) {

		for (var j = 0; j < tableNumQueries.rows; j++) {
			document.getElementById('table-cell-' + j + '-' + num).textContent = "";
			var checkboxes = document.getElementsByClassName('table-col-checkboxes');
			checkboxes[num].checked = false;

			tableSetCheck(j, num);

			tableSetCheckRowOrColState('table-col-checkboxes');
			tableSetCheckAllState();
			tableSaveState();
		}

	}

}

function tableDeleteRowOrCol(rowOrCol, num) {

	var tableQueries = JSON.parse(localStorage.getItem('table-queries'));
	var rowCheckboxes = JSON.parse(localStorage.getItem('table-row-checkboxes'));
	var colCheckboxes = JSON.parse(localStorage.getItem('table-col-checkboxes'));	
	var headers = JSON.parse(localStorage.getItem('table-headers'));

	console.log("Row Checkboxes (before deletion): " + rowCheckboxes);
	console.log("Col Checkboxes (before deletion): " + colCheckboxes);

	if (rowOrCol == 0 && tableNumQueries.rows != 1) {
		tableQueries.splice(num, 1);
		rowCheckboxes.splice(num, 1);
		tableNumQueries.rows--;
	} else if (rowOrCol == 1 && tableNumQueries.cols != 1) {
		for (var i = 0; i < tableNumQueries.rows; i++) {
			tableQueries[i].splice(num, 1);
		}
		colCheckboxes.splice(num, 1);
		headers.splice(num, 1);
		tableNumQueries.cols--;
	}

	console.log("Row Checkboxes (after deletion): " + rowCheckboxes);
	console.log("Col Checkboxes (after deletion): " + colCheckboxes);

	localStorage.setItem('table-queries', JSON.stringify(tableQueries));
	localStorage.setItem('table-row-checkboxes', JSON.stringify(rowCheckboxes));
	localStorage.setItem('table-col-checkboxes', JSON.stringify(colCheckboxes));
	localStorage.setItem('table-headers', JSON.stringify(headers));

	tableRefresh();

}

function tableSaveHeaders() {

	var headers = document.getElementsByClassName('table-headers');

	var localStorageHeaders = [];

	for (var i = 0; i < headers.length; i++) {
		localStorageHeaders.push(headers[i].textContent);
	}

	localStorage.setItem('table-headers', JSON.stringify(localStorageHeaders));

}

function tableCheckAll() {
	var checkboxes = document.getElementsByClassName('table-checkboxes');
	var checkAllCheckbox = document.getElementById('table-check-all-checkbox');

	if (checkAllCheckbox.checked == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = true;
		}

		checkAllCheckbox.checked = true;
		checkAllCheckbox.indeterminate = false;

	} else if (checkAllCheckbox.checked == false || checkAllCheckbox.indeterminate == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false;
		}

		checkAllCheckbox.checked = false;
		checkAllCheckbox.indeterminate = false;

	}

	tableSetCheckRowOrColState('table-row-checkboxes');
	tableSetCheckRowOrColState('table-col-checkboxes');

	tableSaveState();

}

function tableCheckRowOrCol(className, idName) {

	var checkboxes = document.getElementsByClassName(className);
	var checkAllCheckbox = document.getElementById(idName);

	if (checkAllCheckbox.checked == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = true;
		}

		checkAllCheckbox.checked = true;
		checkAllCheckbox.indeterminate = false;

	} else if (checkAllCheckbox.checked == false || checkAllCheckbox.indeterminate == true) {

		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false;
		}

		checkAllCheckbox.checked = false;
		checkAllCheckbox.indeterminate = false;

	}

	tableSaveState();

}

function tableRowOrColHasContent(rowOrCol, num) {

	var hasContent = false;

	if (rowOrCol == 0) {
		for (var i = 0; i < tableNumQueries.cols; i++) {
			if (document.getElementById('table-cell-' + num + '-' + i).textContent != "") {
				hasContent = true;
				break;
			}
		}
	} else {
		for (var i = 0; i < tableNumQueries.rows; i++) {
			if (document.getElementById('table-cell-' + i + '-' + num).textContent != "") {
				hasContent = true;
				break;
			}
		}

	}

	return hasContent;

}

function tableSetCheck(r, c) {

	var rowCheckboxes = document.getElementsByClassName('table-row-checkboxes');
	var colCheckboxes = document.getElementsByClassName('table-col-checkboxes');

	if (document.getElementById('table-cell-' + r + '-' + c).textContent != "" && 
		(rowCheckboxes[r].checked == false || colCheckboxes[c].checked == false)) {
		rowCheckboxes[r].checked = true;
		colCheckboxes[c].checked = true;
	} 

	if (!tableRowOrColHasContent(0, r)) {
		rowCheckboxes[r].checked = false;
	}

	if (!tableRowOrColHasContent(1, c)) {
		colCheckboxes[c].checked = false;
	}	

	tableSaveState();

}

function tableInitializeCheckboxes() {

	var rowCheckboxes = document.getElementsByClassName('table-row-checkboxes');
	var colCheckboxes = document.getElementsByClassName('table-col-checkboxes');

	for (var i = 0; i < rowCheckboxes.length; i++) {
		rowCheckboxes[i].addEventListener("click", function() {
			tableSetCheckAllState();
			tableSetCheckRowOrColState('table-row-checkboxes');
		});
	}

	for (var i = 0; i < colCheckboxes.length; i++) {
		colCheckboxes[i].addEventListener("click", function() {
			tableSetCheckAllState();
			tableSetCheckRowOrColState('table-col-checkboxes');
		});
	}

}

function tableSetCheckAllState() {

	var rowCheckboxes = tableGetCheckboxes('table-row-checkboxes');
	var colCheckboxes = tableGetCheckboxes('table-col-checkboxes');

	var rowSum = rowCheckboxes.reduce(getSum);
	var colSum = colCheckboxes.reduce(getSum);
	var sum = rowSum + colSum;

	var numRow = tableNumQueries.rows;
	var numCol = tableNumQueries.cols;

	if (sum == numRow + numCol) {
		document.getElementById('table-check-all-checkbox').checked = true;
		document.getElementById('table-check-all-checkbox').indeterminate = false;
	} else if (sum != 0) {
		document.getElementById('table-check-all-checkbox').indeterminate = true;
	}

	if (sum == 0) {
		document.getElementById('table-check-all-checkbox').checked = false;
		document.getElementById('table-check-all-checkbox').indeterminate = false;		
	}

}

function tableSetCheckRowOrColState(className) {

	var checkboxes = tableGetCheckboxes(className);
	var sum = checkboxes.reduce(getSum);

	if (className == 'table-row-checkboxes') {

		if (sum == tableNumQueries.rows) {
			document.getElementById('table-row-check-all-checkbox').checked = true;
			document.getElementById('table-row-check-all-checkbox').indeterminate = false;
		} else if (sum != 0) {
			document.getElementById('table-row-check-all-checkbox').indeterminate = true;	
		}

		if (sum == 0) {
			document.getElementById('table-row-check-all-checkbox').checked = false;
			document.getElementById('table-row-check-all-checkbox').indeterminate = false;			
		}

	} else {

		if (sum == tableNumQueries.cols) {
			document.getElementById('table-col-check-all-checkbox').checked = true;
			document.getElementById('table-col-check-all-checkbox').indeterminate = false;
		} else if (sum != 0) {
			document.getElementById('table-col-check-all-checkbox').indeterminate = true;	
		}

		if (sum == 0) {
			document.getElementById('table-col-check-all-checkbox').checked = false;
			document.getElementById('table-col-check-all-checkbox').indeterminate = false;			
		}

	}

	tableSaveState();

}

function tableClearAll() {
	document.getElementById('table-row-check-all-checkbox').checked = false;
	document.getElementById('table-col-check-all-checkbox').checked = false;
	for (var i = 0; i < tableNumQueries.rows; i++) {
		tableClearRowOrCol(0, i);
	}
}

function tableAddNumMoreSearches(rowOrCol) {

	var str = "";

	if (rowOrCol == 0) {
		str = 'row';
	} else if (rowOrCol == 1) {
		str = 'col';
	}

	var num = parseInt(document.getElementById('table-add-num-more-' + str + 's-input').value);

	document.getElementById('table-add-num-more-' + str + 's-input').value = "";

	for (var i = 0; i < num; i++) {
		if (rowOrCol == 0) {
			tableAddRow();
		} else if (rowOrCol == 1) {
			tableAddColumn();
		}
	}

	tableSetCheckRowOrColState('table-row-checkboxes');
	tableSetCheckRowOrColState('table-col-checkboxes');
	tableSetCheckAllState();

}

function togglePanel(id) {
	console.log('Test');
	$(id).toggle();
}

function tableSearchAll(rowOrCol) {

	var queries = [];
	var rowCheckboxes = JSON.parse(localStorage.getItem('table-row-checkboxes'));
	var colCheckboxes = JSON.parse(localStorage.getItem('table-col-checkboxes'));

	if (rowOrCol == 0) {
		for (var i = 0; i < tableNumQueries.rows; i++) {
			for (var j = 0; j < tableNumQueries.cols; j++) {
				if (rowCheckboxes[i] == 1 && colCheckboxes[j] == 1 && 
					document.getElementById('table-cell-' + i + '-' + j).textContent != "") {
					queries.push(document.getElementById('table-cell-' + i + '-' + j).textContent);
				}
			}
		}
	} else if(rowOrCol == 1) {
		for (var i = 0; i < tableNumQueries.cols; i++) {
			for (var j = 0; j < tableNumQueries.rows; j++) {
				if (colCheckboxes[i] == 1 && rowCheckboxes[j] == 1 && 
					document.getElementById('table-cell-' + j + '-' + i).textContent != "") {
					queries.push(document.getElementById('table-cell-' + j + '-' + i).textContent);
				}
			}
		}
	}

	performSearchBackground(queries);
	//chrome.runtime.sendMessage(queries);

}

function searchByString(str) {
	var urlToOpen = url.split('~query').join(encodeHTML(str));
	window.open(urlToOpen, '_blank');
}

function performSearchBackground(q) {
	console.log('performing background search');
	var data = {
		queries: q,
		website: url
	};
	console.log(JSON.stringify(data));
	chrome.runtime.sendMessage(JSON.stringify(data));

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