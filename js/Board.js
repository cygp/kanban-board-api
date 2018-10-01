var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
  var name = prompt('Enter a column name');
  var data = new FormData();

  data.append('name', name);

  fetch(baseUrl + '/column', {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true,
      onMove: function(event, originalEvent) {
        var bootcampKanbanColumnId = parseInt(event.to.getAttribute('id'));
        var cardName = event.dragged.querySelector('.card-description').innerText;
        var cardId = parseInt(event.dragged.querySelector('.card').getAttribute('id'));
        console.log('bootcampKanbanColumnId', typeof(bootcampKanbanColumnId));
        console.log('cardId', typeof(cardId));
        console.log('cardName', typeof(cardName));
        var data = new FormData();
        data.append('id', cardId);
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', bootcampKanbanColumnId);
        fetch(baseUrl + '/card/' + cardId, {
            method: 'PUT',
            headers: myHeaders,
            body: data,
          })
          .then(function(resp) {
            return resp.json();
          })
          .then(function(result) {
            console.log('request send')
          });
      },
    });
}
