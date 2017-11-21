// scripts.js
$(function(){

	var carouselList = $("#carousel ul");
	var interval = setInterval(changeSlide, 3000);
	
	
	var i = 0;
	var buttons = $('.slider');
		buttons.eq(i).addClass('active');

	function changeSlide () {
		carouselList.animate({'marginLeft':-400}, 1000, moveFirstSlide);
		
		changeButtonsForward ();
	};

	function moveFirstSlide () {

		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	};

	function changeButtonsForward () {
		i++;
		buttons.eq(i).addClass('active');
		buttons.eq(i-1).removeClass('active');
		if (i==4) {
			i = -1;
		};	
	};

	$('[id="forward"]').click(changeSlide);

	$('[id="back"]').click(moveLastSlide);

	function moveLastSlide () {

		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-400});
		carouselList.animate({'marginLeft':0}, 1000, function() {});

		changeButtonsBack ()
	};

	function changeButtonsBack () {
		i--;
		buttons.eq(i).addClass('active');
		buttons.eq(i+1).removeClass('active');
		if (i==-5) {
			i = 0;
		};
	}
    
});

