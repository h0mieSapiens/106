var serverUrl = "http://restclass.azurewebsites.net/API2/Todos";

var Todos = [];

function createNew() {
  //var text = document.getElementById("txtTEST").value;(forma de js)

  var text = $('#txtTEST').val(); //forma jquery

  var list = $("#todo"); //append es para añadir al html

  list.append('<li class="list-group-item">' + text + '</li>');

  $("#txtTEST").val('').focus();

  var todo = {
    text: text,
    user: "Miguelito",
    state: 0
  };


  $.ajax({
    url: serverUrl,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(todo),
    success: function (res) {
      console.log("server says", res);
    },
    error: function (error) {
      console.error("error", error);
      for (let i = 0; todo.length; i++) {
        if (Todos[i].id == id) {
          Todos[i].state = 1;
          displayTodo(Todos[i]);
        }
      }

    }

  });

}

function displayTodo(todo) {
  //recive y enseña la lista de todos
  var list; //append es para añadir al html
  if (todo.state == 0) {
    // create an item on the pending list
    var list = $("#todo");
    list.append(`<li id="${todo.id}" class="list-group-item">${todo.text} <button class="btn btn-outline-primary btn-sm float-right" onclick="markDone(${todo.id});"> Done </button>  </li>`);

  } else {
    // create an item on the done list
    var list = $("#donetodo");
    list.append('<li class="list-group-item">' + todo.text + '</li>');
  }

}

function markDone(id) {
  console.log("kwamas", id);
  $("#" + id).remove();
  // find on the todos array the one with the id = id
  for (let i = 0; i < Todos.length; i++) {
    if (Todos[i].id == id) {
      Todos[i].state = 1;
      displayTodo(Todos[i]);
    }
  }


}

function loadData() {
  $.ajax({
    url: serverUrl,
    type: "GET",

    success: function (res) {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user == "Miguelito") {
          Todos.push(res[i]);
          displayTodo(res[i]);
        }
      }

    },
    error: function (error) {
      console.error("error", error)
    }

  });

}

function init() {
  var txt = document.getElementById('txtTEST');
  console.log(txt.value);
  txt.value = 'last';

  var btn = document.getElementById("btnadd");
  btn.onclick = createNew;
}

function init2() {
  $("#txtTEST").val("LAST");
  $("#btnadd").click(createNew);
  $("#txtTEST").keypress(function (args) {

    if (args.key == "Enter") {
      createNew();
    }
  });

  loadData();

}
$(document).ready(init2);