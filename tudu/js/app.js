const listContainer = document.getElementById('list-container');
const inputText = document.querySelector('input[name=add]')

// button 
const add = document.querySelector('.add');
const edit = document.querySelector('.edit');
const remove = document.querySelector('.remove');

const list = ['reset'];

const showList = function() {
    listContainer.innerHTML = ``;
    for(let i = 1; i < list.length; i++){
        listContainer.innerHTML += `<li class="list"><span class="number">${i}. </span><div class="text">${list[i]}</div><button class="edit" onClick="editMethod()">Edit</button><button class="remove">Remove</button></li>`
    }
}

// add 
add.addEventListener('click',function(){
    list.push(inputText.value);
    showList();
});

// edit
function editMethod(i){
    inputText.innerHTML = list[i];
};


// delete















showList();