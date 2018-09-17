// GENERAL GUNCTION
function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '', i;
	for (i = 0; i < 10; i++) {
	  str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

// CREATING NEW COLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// ADD COLUMN TO BOARD
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// CREATING NEW CARD
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// ADD CARD TO COLUMN
todoColumn.createCard(card1);
doingColumn.createCard(card2);