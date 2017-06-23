// searchbar handler
$(function(){
	var searchField, icon;

	searchField = $('#query');
	icon = $('#search-btn');

	// focus event handler
	$(searchField).on('focus', function() {
		$(this).animate({
			width: '100%'
		}, 200);

		$(icon).animate({
			right: '10px'
		}, 200);
	});

	// blur event handler
	$(searchField).on('blur', function() {
		if(searchField.val() === '') {
			$(searchField).animate({
				width: '45%'
			}, 200, function() {});

			$(icon).animate({
				right: '360px'
			}, 200, function() {});
		}
	});
});

// search
function search() {
	// clear results
	$('#results').html('');
	$('#buttons').html('');

	// get form input
	var q = $('#query').val();

	// request
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyBiUCXGO1gc6vPl_luHhPIr0WSLKbb2JA8' },
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				console.log(data);

				$.each(data.items, function(i, item) {
					// build the output
					var output = getOutput(item);

					// display results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// display buttons
				$('#buttons').append(buttons);
			}
	);
};

// build output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// output string
	var output = '<li>' + 
		'<div class="list-left">' + 
		'<img src="'+thumb+'">' + 
		'</div>' + 
		'<div class="list-right">' + 
		'<h3>'+title+'</h3>' + 
		'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' + 
		'<p>'+description+'</p>' + 
		'</div>' + 
		'</li>' + 
		'<div class="clearfix"></div>' + 
		'';

		return output;
};

// build buttons
function getButtons(prevPageToken, nextPageToken, q) {
    if(!prevPageToken){
      var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
      'onclick="nextPage();">Next Page</button></div>';
    } else {
      var btnoutput = '<div class="button-container">'+
      '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
      'onclick="prevPage();">Previous Page</button>' +
      '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
      'onclick="nextPage();">Next Page</button></div>';
    }

	return btnoutput;
}



// prevent submission
$('#search-form').submit(function(e) {
	e.preventDefault();
});


















