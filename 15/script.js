const addItems = document.querySelector('.add-items');
const manageItems = document.querySelectorAll('.manage-list input');
let itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

function setLocalStorage(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

function addItem(e) {
  e.preventDefault();
  console.log(addItems);
  const text = this.querySelector('[name=item]').value;
  const item = {
    text: text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  setLocalStorage(items);
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      } />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  setLocalStorage(items);
  populateList(items, itemsList);
}

function manageList(e) {
  switch (e.target.name) {
    case 'clear':
      items = new Array();
      populateList(items, itemsList);
      setLocalStorage(items);
      break;
    case 'check':
      items = items.map((item) => ({ ...item, done: true }));
      populateList(items, itemsList);
      setLocalStorage(items);
      break;
    case 'uncheck':
      items = items.map((item) => ({ ...item, done: false }));
      populateList(items, itemsList);
      setLocalStorage(items);
      break;
    default:
      console.log('Empty action received.');
      break;
  }
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

manageItems.forEach((item) => item.addEventListener('click', manageList));

populateList(items, itemsList);
