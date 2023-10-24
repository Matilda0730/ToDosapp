const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener("click", createNewToDo);

function createNewToDo() {
  const item = {
    id : new Date().getTime(),
    text : '',
    complete:false, 
  }

  //배열 처음에 새로운 아이템을 추가
  todos.unshift(item);

  //요소 자체를 생성하기
  const {itemEl, inputEl, editBtnEl, removeBtnEl} = createToDoElement(item);

  //리스트 요소 안에 방금 생성한 아이템 요소 추가
  list.prepend(itemEl);

  inputEl.removeAttribute('disabled');

  inputEl.focus();

  saveToLocalStorage();

}

function createToDoElement(item) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';

  if(item.complete) {
    itemEl.classList.add('complete');
  }

  const inputEl = document.createElement('input');;
  inputEl.type = 'text';
  inputEl.value = item.text;
  inputEl.setAttribute('disabled', '');

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('actions');

  const editBtnEl = document.createElement('button');
  editBtnEl.classList.add('material-icons');
  editBtnEl.innerText ='edit';

  const removeBtnEl = document.createElement('button');
  removeBtnEl.classList.add('material-icons', 'remove-btn');
  removeBtnEl.innerText ='remove_circles';

  checkboxEl.addEventListener('change', ()=>{
    item.complete = checkboxEl.checked;
    if(item.complete) {
      itemEl.classList.add('complete');
    } else {
      itemEl.classList.remove('complete');
    }
  })

  inputEl.addEventListener('blur', ()=>{ 
    inputEl.setAttribute('disabled', '');
  })
  
  inputEl.addEventListener('input', () => {
    item.text = inputEl.value
  })

  editBtnEl.addEventListener('click',() => {
    inputEl.removeAttribute('disabled');
    inputEl.focus();
  })

  removeBtnEl.addEventListener('click', ()=>{
    todos.filter(t=> t.id !== item.id)
    itemEl.remove();
  })


  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);


  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveToLocalStorage() {
  //항상 string타입으로 넣어야 한다.
  const data = JSON.stringify(todos);
  localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('my_todos')
  if(data) {
    todos = JSON.parse(data);
  }
}