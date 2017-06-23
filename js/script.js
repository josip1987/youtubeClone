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
			}
	);
};


// prevent submission
$('#search-form').submit(function(e) {
	e.preventDefault();
});


















