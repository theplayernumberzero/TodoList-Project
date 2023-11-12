// todo yu eklemek için formu seçmeliyiz
const form = document.querySelector("#todo-form");
//inputları eklemek için input seçme
const todoInput = document.querySelector("#todo");
//todo ul elementi içine eklenecek
const todoList = document.querySelector(".list-group");
//alert eklemek için
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

//filter input
const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");

eventListeners();   // Sayfa açıldığında element seçimine göre çalışır

function eventListeners(){ // Tüm event Listenerlar
    form.addEventListener("submit",addTodo);    //todo ekleme
}

function addTodo(e){
    const newTodo = todoInput.value.trim();     //trim baştaki ve sonraki boşlukları siler

    addTodoToUI(newTodo);
    //tekrardan syfaya yönlenmesin diye default özelliği yıkma
    e.preventDefault();
}

function addTodoToUI(newTodo){  //String değeri list item olarak ekler
    //List item oluşturma
    const newListItem = document.createElement("li");       
    newListItem.className = "list-group-item d-flex justify-content-between";
    //Link oluşturma
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.className = "delete-item";
    newLink.innerHTML = "<i class = 'fa fa-remove'></i>";

    newListItem.appendChild(document.createTextNode(newTodo));  //text node olarak ekleme
    newListItem.appendChild(newLink);

    //List itemi todoList e ekleme
    todoList.appendChild(newListItem);
    //Input boşaltma
    todoInput.value="";
}