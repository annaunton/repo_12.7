// scripts.js

$(function() {



/////////////////////////////////    COLUMN     ///////////////////////////////////////////////////////////////////////

	function Column(id, name) { ///////////////////
	    var self = this; 

	    this.id = id; /////////////////////////
	    this.name = name || 'Tasks'; ////////////////
	    this.$element = createColumn();

	    function createColumn() {
	    	// CREATING COMPONENTS OF COLUMNS
	    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

			// ADDING EVENTS
			$columnDelete.click(function() {
		        self.removeColumn();
			});


			 $columnAddCard.click(function(event) { ////////////////////////////////////////
				var cardName = prompt("Enter the name of the card");
				event.preventDefault();
				$.ajax({
        			url: baseUrl + '/card',
        			method: 'POST',
        			data: {
              			name: cardName,
    					bootcamp_kanban_column_id: self.id
        			},
        			success: function(response) {
            			var card = new Card(response.id, cardName);
        				self.createCard(card);
        			}
   				 });
			});

			 // CONSTRUCTION COLUMN ELEMENT
			 $column.append($columnTitle)
	        		.append($columnDelete)
	        		.append($columnAddCard)
	        		.append($columnCardList);

	        // RETURN OF CREATED COLUMN
			    return $column;
	    }
  	}

	Column.prototype = {
	    createCard: function(card) {
	      this.$element.children('ul').append(card.$element);
	    },

	    removeColumn: function() { ////////////////////////////////////////////////
    		var self = this;
    		$.ajax({
      			url: baseUrl + '/column/' + self.id,
      			method: 'DELETE',
      			success: function(response){
        			self.$element.remove();
      			}
    		});
 		}
	};


/////////////////////////////////     CARD     ///////////////////////////////////////////////////////////////////////

	function Card(id,name) { /////////////////
		var self = this;

	    this.id = id;/////////////////////
	    this.name = name || 'Task';//////////////////////////////
	    this.$element = createCard();

	    function createCard() {
	    	// CREATING COMPONENTS OF CARD
	    	var $card = $('<li>').addClass('card');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.name); //////////////////////
		    var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');

		    // ADDING EVENTS
		    $cardDelete.click(function(){
        		self.removeCard();
			});

		    // CONSTRUCTION OF CARD ELEMENT AND RETURNING THE CARD
			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
	    }
	}

	Card.prototype = {
		
		removeCard: function() { //////////////////////////////////////////
    		var self = this;
    		$.ajax({
      			url: baseUrl + '/card/' + self.id,
      			method: 'DELETE',
      			success: function(){
        			self.$element.remove();
      			}
    		});
		}
	}

/////////////////////////////////     BOARD    ///////////////////////////////////////////////////////////////////////

	var board = {
	    name: 'Kanban Board',
	    $element: $('#board .column-container'),
	    createColumn: function(column) {
	      this.$element.append(column.$element);
	      initSortable();
	    }
	   
	};

	function initSortable() {
	    $('.column-card-list').sortable({
	      connectWith: '.column-card-list',
	      placeholder: 'card-placeholder'
	    }).disableSelection();
  	}


  	$('.create-column') //////////////////////////////////////////////
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
	});

/////////////////////////////////     APP   ///////////////////////////////////////////////////////////////////////

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2556',
  'X-Auth-Token': 'd5929a08b8c4eaa04c774f8a5ea1ab78'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});


function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(cardObj);
  	})
}

var todoColumn = new Column('To do');
board.createColumn(todoColumn);
var card1 = new Card('Task 1');
todoColumn.createCard(card1);


/*
  	// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);


// CREATING CARDS
var card1 = new Card('Task 1');


// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
*/


});

