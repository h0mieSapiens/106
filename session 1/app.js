function createNew(){
    //var text = document.getElementById("txtTEST").value;(forma de js)
  var text = $('#txtTEST').val();//forma jquery
    var list= $("#todo");//append es para añadir al html
    list.append('<li class="list-group-item">'+text+'</li>');
     $("txtTEST").focus();

}

function init(){
var txt = document.getElementById('txtTEST');
console.log(txt.value);
txt.value='last';

var btn= document.getElementById("btnadd");
btn.onclick= createNew;
 }

 function init2(){
$("#txtTEST").val("LAST");
$("#btnadd").click(createNew);
$("#txtTEST").keypress(function(args) {

    if(args.key=="Enter"){ 
    createNew(); }
});



 }
 $(document).ready(init2);