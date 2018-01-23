var url = "https://google.com/search?q=~query~";

$(window).on('load', initializeWindow);

function initializeWindow() {

	if (localStorage.getItem('saved-urls') === null) { initializeURLs(); }

	$('#list-tab-to-be-selected').on('click', function() { $('#list-tab-to-be-selected').hide(); $('#list-tab-already-selected').show(); $('#table-tab-already-selected').hide(); $('#table-tab-to-be-selected').show(); $('#list-panel').show(); $('#table-panel').hide(); $('#extension-window').css("width", "500px")});
	$('#table-tab-to-be-selected').on('click', function() { $('#list-tab-to-be-selected').show(); $('#list-tab-already-selected').hide(); $('#table-tab-already-selected').show(); $('#table-tab-to-be-selected').hide(); $('#list-panel').hide(); $('#table-panel').show(); $('#extension-window').css("width", "800px")});
	$('#list-tab-to-be-selected').click();

	$('#list-advanced-button').on('click', function() { $('#list-advanced-panel').toggle(); });
	$('#list-add-url-button').on('click', function() { $('#list-advanced-panel .light-gray-panel .toggleable:not(#list-add-url-panel)').hide(); $('#list-add-url-panel').toggle(); addURL('list'); });
	$('#list-set-url-button').on('click', function() { $('#list-advanced-panel .light-gray-panel .toggleable:not(#list-set-url-panel)').hide(); $('#list-set-url-panel').toggle(); });
	$('#list-format-search-open-panel-button').on('click', function() { $('#list-format-search-panel').toggle(); });
	$('#list-format-search-button').on('click', function() { $('#list-format-search-dropdown-content').toggle(); });
	$('#list-load-list-button').on('click', function() { $('#list-list-of-saved-lists-container').toggle(); });

	$('#table-search-all-button').on('click', function() { $('#table-search-all-dropdown-content').toggle(); });
	$('#table-advanced-button').on('click', function() { $('#table-advanced-panel').toggle(); });
	$('#table-add-url-button').on('click', function() { $('#table-advanced-panel .light-gray-panel .toggleable:not(#table-add-url-panel)').hide(); $('#table-add-url-panel').toggle(); addURL('table'); });
	$('#table-set-url-button').on('click', function() { $('#table-advanced-panel .light-gray-panel .toggleable:not(#table-set-url-panel)').hide(); $('#table-set-url-panel').toggle(); });
	$('#table-invert-checked-button').on('click', function() { $('#table-advanced-panel .light-gray-panel .toggleable:not(#table-invert-checked-panel)').hide(); $('#table-invert-checked-panel').toggle(); });
	$('#table-sort-button').on('click', function() { $('#table-advanced-panel .light-gray-panel .toggleable:not(#table-sort-panel)').hide(); $('#table-sort-panel').toggle(); });
	$('#table-reverse-button').on('click', function() { $('#table-advanced-panel .light-gray-panel .toggleable:not(#table-reverse-panel)').hide(); $('#table-reverse-panel').toggle(); });
	$('#table-format-search-open-panel-button').on('click', function() { $('#table-advanced-panel .light-green-panel .toggleable:not(#table-format-search-panel)').hide(); $('#table-format-search-panel').toggle(); });
	$('#table-format-search-button').on('click', function() { $('#table-format-search-dropdown-content').toggle(); });
	$('#table-search-checked-button').on('click', function() { $('#table-advanced-panel .light-green-panel .toggleable:not(#table-search-checked-panel)').hide(); $('#table-search-checked-panel').toggle(); });
	$('#table-search-unchecked-button').on('click', function() { $('#table-advanced-panel .light-green-panel .toggleable:not(#table-search-unchecked-panel)').hide(); $('#table-search-unchecked-panel').toggle(); });
	$('#table-clear-checked-button').on('click', function() { $('#table-advanced-panel .light-yellow-panel .toggleable:not(#table-clear-checked-panel)').hide(); $('#table-clear-checked-panel').toggle(); });
	$('#table-clear-unchecked-button').on('click', function() { $('#table-advanced-panel .light-yellow-panel .toggleable:not(#table-clear-unchecked-panel)').hide(); $('#table-clear-unchecked-panel').toggle(); });
	$('#table-delete-checked-button').on('click', function() { $('#table-advanced-panel .light-red-panel .toggleable:not(#table-delete-checked-panel)').hide(); $('#table-delete-checked-panel').toggle(); });
	$('#table-delete-unchecked-button').on('click', function() { $('#table-advanced-panel .light-red-panel .toggleable:not(#table-delete-unchecked-panel)').hide(); $('#table-delete-unchecked-panel').toggle(); });
	$('#table-load-table-button').on('click', function() { $('#table-saved-tables-container').toggle(); });

	refreshSavedURLs();

}

function refreshSavedURLs() {

	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	$('#list-set-url-panel').html('');
	$('#table-set-url-panel').html('');
	for (var i = 0; i < savedURLs.length; i++) {
		var listRow = '<div class="list-saved-url-container"><a id="list-saved-url-' + i + '-button" class="alignleft" href="#">' + savedURLs[i].name +'</a><a id="list-delete-saved-url-' + i + '-button" class="list-delete-saved-list alignright" href="#">Delete</a><div class="clear"></div></div>';
		var tableRow = '<div class="table-saved-url-container"><a id="table-saved-url-' + i + '-button" class="alignleft" href="#">' + savedURLs[i].name +'</a><a id="table-delete-saved-url-' + i + '-button" class="table-delete-saved-table alignright" href="#">Delete</a><div class="clear"></div></div>';
		$('#list-set-url-panel').append(listRow);
		$('#table-set-url-panel').append(tableRow);
	}
	for (var i = 0; i < 4; i++) {
		$('#list-delete-saved-url-' + i + '-button').hide();
		$('#table-delete-saved-url-' + i + '-button').hide();
	}
	for (var i = 0; i < savedURLs.length; i++) {
		setURLEventListeners(i);
	}
}

function setURLEventListeners(i) {

	$('#list-saved-url-' + i + '-button').on('click', function() { setURL(i) });
	$('#list-delete-saved-url-' + i + '-button').on('click', function() { deleteSavedURL(i) });
	$('#table-saved-url-' + i + '-button').on('click', function() { setURL(i) });
	$('#table-delete-saved-url-' + i + '-button').on('click', function() { deleteSavedURL(i) });

}

function deleteSavedURL(i) {
	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	if (savedURLS.length !== 1) {
		savedURLs.splice(i, 1);		
	}
	localStorage.setItem('saved-urls', JSON.stringify(savedURLs));
	refreshSavedURLs();
}

function addURL(listOrTable) {

	var addingURL = {
		name: document.getElementById(listOrTable + '-add-url-name-input').value,
		url: document.getElementById(listOrTable + '-add-url-input').value
	}

	console.log(addingURL);

	if (addingURL.url.indexOf('~query~') === -1 || !addingURL.name || !addingURL.url) {
		if (addingURL.url.indexOf('~query~') === -1) { console.log("No query"); }
		if (!addingURL.name) { console.log("No name"); }
		if (!addingURL.url) { console.log("No url"); }
		return false;
	}

	console.log("Adding")

	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	savedURLs.push(addingURL);
	localStorage.setItem('saved-urls', JSON.stringify(savedURLs));

	refreshSavedURLs();

}

function setURL(i) {
	var savedURLs = JSON.parse(localStorage.getItem('saved-urls'));
	url = savedURLs[i].url;
}

function initializeURLs() {

	var names = ["Google", "YouTube", "Amazon", "Reddit"];

	var urls = ["https://google.com/search?q=~query~", 
	"https://www.youtube.com/results?search_query=~query~",
	"https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=~query~", 
	'https://www.reddit.com/search?q=~query~&sort=relevance&t=all'];

	var savedURLs = [];

	for (var i = 0; i < urls.length; i++) {

		var entry = {
			name: names[i],
			url: urls[i]
		}

		savedURLs.push(entry);

	}

	localStorage.setItem('saved-urls', JSON.stringify(savedURLs));

}

function performSearchBackground(q) {
	var data = {
		queries: q,
		website: url
	};
	chrome.runtime.sendMessage(JSON.stringify(data));
}


function getSum(total, num) {
	return total + num;
}
