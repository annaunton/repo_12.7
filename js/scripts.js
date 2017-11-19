// scripts.js
$(function() {
	var span = $('span');
	span.each(function(index, element) {
		if (index % 2 == 0) {
			$(element).css('color', 'red');
		}

	});

	var paragraph = $('p');
	paragraph.each(function(index, element) { 
		$(element).append('<br><button class="btn" data-tmp="' + index + '">Click me!</button>');
	});

	$('button').click(function() {
		alert($(this).attr('data-tmp'));

	});
});

