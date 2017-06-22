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




















