// scripts.js
$(function () {  

	var url = 'https://restcountries.eu/rest/v1/name/';
	var $countriesList = $('#countries');

	$('#search').click(searchCountries);

	function searchCountries() {
		var countryName = $('#country-name').val();

		if(!countryName.length) {
			countryName = 'Poland';
		};

		$.ajax ({
			url: url + countryName,
			method: 'GET',
			success: showCountriesList
		});

	};

	function showCountriesList(response) {
  		$countriesList.empty();
  		response.forEach(function(item) {
        	$('<h3>').text(item.name).appendTo($countriesList);
        	$('<li>').text('Capital: ' + item.capital).appendTo($countriesList);
        	$('<li>').text('Timezones: ' + item.timezones).appendTo($countriesList);
        	$('<li>').text('Domain: ' + item.topLevelDomain).appendTo($countriesList);

    	});
	}

});



