const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn')

let todos = [];

createBtn.addEventListener('click',createNewToDo)

function createNewToDo () {
 //새로운 아이템 객체 생성
 const item = {
  id:new Date().getTime(),
  text:'',
  complete:false,
 }

 //배열 처음에 새로운 아이템을 추가

 todos.unshift(item);

 //요소 생성하기
 const {itemEl, inputEl, editBtnEl, removeBtnEl} = createToDoElement(item)

 list.prepend(itemEl)
}

function createToDoElement(item) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item'); 

  const checkboxEl = document.createElement('input')
  checkboxEl.type = 'checkbox';

  if(item.complete) {
    itemEl.classList.add('complete');
  }

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = item.text;
  inputEl.setAttribute('disabled','');

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('actions');

  const editBtnEl = document.createElement('button');
  editBtnEl.classList.add('material-icons')
  editBtnEl.innerText = 'edit'

  const removeBtnEl = document.createElement('button');
  removeBtnEl.classList.add('material-icons', 'remove-btn')
  removeBtnEl.innerText = 'remove_circles'

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return {itemEl, inputEl, editBtnEl, removeBtnEl} //객체니까 {}를 쓰는 것
}