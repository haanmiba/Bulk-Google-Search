$(window).on('load', initializeListEventListeners);

function initializeListEventListeners() {

	if (localStorage.getItem('list-state') === null) { listInitialize(); } else { listRefresh(); listSetCheckAllState(); }

	$('#list-search-all-button').on('click', listSearchAll);
	$('#list-clear-all-button').on('click', listClearAll);
	$('#list-delete-all-button').on('click', listDeleteAll);

	$('#list-invert-checked-button').on('click', listInvertCheckboxes);
	$('#list-sort-button').on('click', listSort);
	$('#list-reverse-button').on('click', listReverse);
	$('#list-search-checked-button').on('click', function() { listSearchCheckedOrUnchecked(1); });
	$('#list-search-unchecked-button').on('click', function() { listSearchCheckedOrUnchecked(0); });
	$('#list-clear-checked-button').on('click', function() { listClearCheckedOrUnchecked(1); });
	$('#list-clear-unchecked-button').on('click', function() { listClearCheckedOrUnchecked(0); });
	$('#list-delete-checked-button').on('click', function() { listDeleteCheckedOrUncheckedOrEmpty(1); });
	$('#list-delete-unchecked-button').on('click', function() { listDeleteCheckedOrUncheckedOrEmpty(0); });
	$('#list-delete-empty-cells-button').on('click', function() { listDeleteCheckedOrUncheckedOrEmpty(2); });
	$('#list-save-list-button').on('click', listSaveList);

	listRefreshSavedLists();

}

function listInitialize() {

	var listQueries = [""];

	var listCheckboxes = [0];

	var listName = "List Name";

	var savedLists = [];

	var state = {
		queries: listQueries,
		checkboxes: listCheckboxes,
		name: listName,
		saved_lists: savedLists
	}

	localStorage.setItem('list-state', JSON.stringify(state));

	listRefresh();

}

function listRefresh() {

	var listState = JSON.parse(localStorage.getItem('list-state'));
	var listNumQueries = listState.queries.length;

	$("#list-body").html("");

	var topRow = $('<tr><th class="list-cell-checkbox"><input id="list-check-all-checkbox" type="checkbox"></th><th id="list-name-cell" contenteditable></th><th></th></tr>');

	$("#list-body").append(topRow);

	for (var i = 0; i < listNumQueries; i++) {

		var row = '<tr><td class="list-cell-checkbox"><input class="list-checkboxes" id="list-checkbox-' + i + '" type="checkbox"></td><td class="list-input-cell" id="list-cell-' + i + '" tabindex=' + (i+1) + ' contenteditable></td>' + 
						'<td>' + 
							'<span class="icon-buttons">' + 
							'<a id="list-add-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/add-button-image.png"></a>' + 
							'<a id="list-search-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/search-button-image.png"></a>' + 
							'<a id="list-clear-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/clear-button-image.png"></a>' + 
							'<a id="list-delete-button-' + i + '" class="icon-buttons" href="#"><img class="icon-image" src="images/delete-button-image.png"></a>' + 
							'</span>' + 
						'</td>' + 
						'</tr>';

		$("#list-body").append(row);

	}

	var bottomRow = $('<tr><td colspan="3"><input type="number" id="list-num-more-searches" placeholder="Add # more rows"><span class="divider"></span><a id="list-add-num-more-searches-button" class="btn btn-primary" href="#">Submit</a></td></tr>');
	$('#list-body').append(bottomRow);

	$('#list-name-cell').text(listState.name);
	$('#list-name-cell').on('input', listSaveName);

	for (var i = 0; i < listNumQueries; i++) {
		listSetInput(i);
		listAddEventListeners(i);
	}

	$('#list-check-all-checkbox').on('click', listCheckAll);

}

function listCheckAll() {

	var checkboxes = $('.list-checkboxes').toArray();

	if($('#list-check-all-checkbox').is(':checked') || $('#list-check-all-checkbox').is(':indeterminate')) {

		for (var i = 0; i < checkboxes.length; i++) { $(checkboxes[i]).prop('checked', true); }

	} else {

		for (var i = 0; i < checkboxes.length; i++) { $(checkboxes[i]).prop('checked', false); }

	}

}

function listSearchAll() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	performSearchBackground(listState.queries);

}

function listClearAll() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	for (var i = 0; i < listState.queries.length; i++) {
		listState.queries[i] = "";
		listState.checkboxes[i] = 0;
	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();

}

function listDeleteAll() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	listState.queries = [""];
	listState.checkboxes = [0];

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();

}

function listInvertCheckboxes() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	for (var i = 0; i < listState.checkboxes.length; i++) {

		listState.checkboxes[i] = Math.abs(listState.checkboxes[i] - 1);

	}

	localStorage.setItem('list-state', JSON.stringify(listState))

	listRefresh();

	listSetCheckAllState();

}

function listSort() {

	var listState = JSON.parse(localStorage.getItem('list-state'));
	var indexes = [];
	for (var i = 0; i < listState.queries.length; i++) {
		var pair = {
			query: listState.queries[i],
			oldIndex: i
		};
		indexes.push(pair);
	}
	listState.queries.sort(function(a,b) {
		if (a.toLowerCase() < b.toLowerCase()) return -1;
		if (a.toLowerCase() > b.toLowerCase()) return 1;
		return 0;
	});
	var newCheckboxes = [listState.checkboxes.length];
	for (var i = 0; i < listState.queries.length; i++) {
		for (var j = 0; j < indexes.length; j++) {
			if (listState.queries[i] === indexes[j].query) {
				newCheckboxes[i] = listState.checkboxes[indexes[j].oldIndex];
				break;
			}
		}
	}

	listState.checkboxes = newCheckboxes;

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();
	listSetCheckAllState();

}

function listReverse() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	listState.queries.reverse();
	listState.checkboxes.reverse();

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();

	listSetCheckAllState();

}

function listSearchCheckedOrUnchecked(checkedOrUnchecked) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	var queries = [];

	for (var i = 0; i < listState.checkboxes.length; i++) {

		if (listState.checkboxes[i] === checkedOrUnchecked) {
			queries.push($('#list-cell-' + i).text());
		}

	}

	performSearchBackground(queries);

}

function listClearCheckedOrUnchecked(checkedOrUnchecked) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	for (var i = 0; i < listState.queries.length; i++) {

		if (listState.checkboxes[i] === checkedOrUnchecked) {
			listState.queries[i] = "";
			listState.checkboxes[i] = 0;
		}

	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();
	listSetCheckAllState();

}

function listDeleteCheckedOrUncheckedOrEmpty(checkedOrUncheckedOrEmpty) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	for (var i = listState.queries.length-1; i >= 0; i--) {

		if (listState.checkboxes[i] === checkedOrUncheckedOrEmpty && listState.queries.length !== 1 && checkedOrUncheckedOrEmpty <= 1) {
			listState.queries.splice(i, 1);
			listState.checkboxes.splice(i, 1);
		} else if (checkedOrUncheckedOrEmpty === 2 && listState.queries[i] === "" && listState.queries.length !== 1) {
			listState.queries.splice(i, 1);
			listState.checkboxes.splice(i, 1);
		}

	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();
	listSetCheckAllState();

}

function listAddEventListeners(i) {

	$('#list-checkbox-' + i).on('click', function() { listSaveCheckboxes(); listSetCheckAllState(); });
	$('#list-cell-' + i).on('input', function() { listSaveQueries(); listSetCheck(i); listSetCheckAllState(); });
	$('#list-add-search-button-' + i).on('click', function() { listAddSearchQueryAtIndex(i); listSetCheckAllState(); });
	$('#list-search-button-' + i).on('click', function() { listPerformSearch(i); });
	$('#list-clear-button-' + i).on('click', function() { listClearSearch(i); listSetCheckAllState(); });
	$('#list-delete-button-' + i).on('click', function() { listDeleteSearch(i); listSetCheckAllState(); });

}

function listSetCheck(i) {

	if ($('#list-cell-' + i).text() !== "") {
		$('#list-checkbox-' + i).prop('checked', true);
	} else {
		$('#list-checkbox-' + i).prop('checked', false);
	}

	listSaveCheckboxes();

}

function listAddSearchQueryAtIndex(i) {

	var listState = JSON.parse(localStorage.getItem('list-state'));
	listState.queries.splice(i+1, 0, "");
	listState.checkboxes.splice(i+1, 0, 0);
	localStorage.setItem('list-state', JSON.stringify(listState));
	listRefresh();

}

function listPerformSearch(i) {

	var arr = [];

	if ($('#list-cell-' + i).text() !== "") {
		arr.push($('#list-cell-' + i).text());		
	}

	performSearchBackground(arr);

}

function listClearSearch(i) {
	$('#list-cell-' + i).text("");
	$('#list-checkbox-' + i).prop('checked', false);
	var listState = JSON.parse(localStorage.getItem('list-state'));
	listState.queries[i] = "";
	listState.checkboxes[i] = 0;
	localStorage.setItem('list-state', JSON.stringify(listState));
}

function listDeleteSearch(i) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	if (listState.queries.length !== 1) {

		listState.queries.splice(i, 1);
		listState.checkboxes.splice(i, 1);

	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();

}

function listSaveQueries() {

	var queries = listGetQueries();
	var listState = JSON.parse(localStorage.getItem('list-state'));
	listState.queries = queries;
	localStorage.setItem('list-state', JSON.stringify(listState));

}

function listGetQueries() {

	var retVal = [];
	var cells = $('.list-input-cell').toArray();

	for (var i = 0; i < cells.length; i++) {
		retVal.push($(cells[i]).text());
	}

	return retVal;

}

function listSetInput(i) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	if (listState.queries[i] !== "") {
		$('#list-cell-' + i).text(listState.queries[i]);
	}

	var checkboxes = $('.list-checkboxes').toArray();

	if (listState.checkboxes[i] === 1) {
		$(checkboxes[i]).attr('checked', true);
	}

}

function listSaveName() {

	var name = $('#list-name-cell').text();

	var listState = JSON.parse(localStorage.getItem('list-state'));

	listState.name = name;

	localStorage.setItem('list-state', JSON.stringify(listState));

}

function listGetCheckboxes() {

	var retVal = [];

	var checkboxes = $('.list-checkboxes').toArray();

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			retVal.push(1);
		} else {
			retVal.push(0);
		}
	}

	return retVal;

}

function listSaveCheckboxes() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	var arr = listGetCheckboxes();

	listState.checkboxes = arr;

	localStorage.setItem('list-state', JSON.stringify(listState));

}

function listSetCheckAllState() {

	var listState = JSON.parse(localStorage.getItem('list-state'));
	var checkboxes = listGetCheckboxes();
	var sum = checkboxes.reduce(getSum);

	if (sum === listState.queries.length) {
		$('#list-check-all-checkbox').prop('checked', true);
		$('#list-check-all-checkbox').prop('indeterminate', false);
	} else if (sum === 0) {
		$('#list-check-all-checkbox').prop('checked', false);
		$('#list-check-all-checkbox').prop('indeterminate', false);
	} else if (sum !== 0) {
		$('#list-check-all-checkbox').prop('indeterminate', true);
	}

}

function listSaveList() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	var listSave = {
		name: listState.name,
		queries: listState.queries
	}

	var listAlreadyExists = false;

	for (var i = 0; i < listState.saved_lists.length; i++) {
		if (listState.saved_lists[i].name === listSave.name) {
			listState.saved_lists[i] = listSave;
			listAlreadyExists = true;
			break;
		}
	}

	if (!listAlreadyExists) {
		listState.saved_lists.push(listSave);
	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefreshSavedLists();
}

function listRefreshSavedLists() {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	$('#list-list-of-saved-lists-container').html('');
	for (var i = 0; i < listState.saved_lists.length; i++) {
		var savedList = $('<div class="list-saved-list-container"><a id="list-delete-saved-list-' + i + '-button" class="list-delete-saved-list alignright" href="#">Delete</a><a id="list-saved-list-' + i + '-button" class="alignleft" href="#">' + listState.saved_lists[i].name +'</a><div class="clear"></div></div>');
		$('#list-list-of-saved-lists-container').append(savedList);
	}
	for (var i = 0; i < listState.saved_lists.length; i++) {
		listSavedListsEventListeners(i);
	}
}

function listSavedListsEventListeners(i) {
	$('#list-saved-list-' + i + '-button').on('click', function() { listLoadList(i) });
	$('#list-delete-saved-list-' + i + '-button').on('click', function() { listDeleteSavedList(i) });
}

function listLoadList(i) {

	console.log("TEST");

	var listState = JSON.parse(localStorage.getItem('list-state'));

	listState.name = listState.saved_lists[i].name;
	listState.queries = listState.saved_lists[i].queries;

	listRefresh();

	for (var i = 0; i < listState.queries.length; i++) {
		listSetCheck(i);
	}

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefresh();

	listSetCheckAllState();

}

function listDeleteSavedList(i) {

	var listState = JSON.parse(localStorage.getItem('list-state'));

	listState.saved_lists.splice(i, 1);

	localStorage.setItem('list-state', JSON.stringify(listState));

	listRefreshSavedLists();
}