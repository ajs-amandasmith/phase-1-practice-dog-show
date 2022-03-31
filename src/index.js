document.addEventListener('DOMContentLoaded', () => {
  getDogData();
})

function getDogData() {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(data => {
    showDogData(data);
    editDog();
  })
}

function showDogData(dogObj) {
  console.log(dogObj);
  let table = document.querySelector('table');
  
  let tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  console.log('html', tableBody);
  
  dogObj.map(dog => {
    
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdBreed = document.createElement('td');
    const tdSex = document.createElement('td');
    const tdBtn = document.createElement('td');
    const btn = document.createElement('button');

    tdName.textContent = `${dog.name}`;
    tdName.dataset.id = dog.id;
    tdBreed.textContent = `${dog.breed}`;
    tdBreed.dataset.id = dog.id;
    tdSex.textContent = `${dog.sex}`;
    tdSex.dataset.id = dog.id;
    btn.className = 'edit-dog';
    btn.textContent = 'Edit Dog';
    btn.dataset.id = dog.id;

    tdBtn.append(btn);
    tr.append(tdName, tdBreed, tdSex, tdBtn);
    tableBody.append(tr);
    table.append(tableBody);
    
  })
  tableBody = document.createElement('tbody');
}

function editDog() {
  const editBtnCollection = document.getElementsByClassName('edit-dog');
  const editBtnArray = [...editBtnCollection];

  editBtnArray.map(button => {
    button.addEventListener('click', e => handleEditDog(e))
  })
  submitChanges();
}

function handleEditDog(e) {
  const nameField = document.getElementsByName('name')[0];
  const breedField = document.getElementsByName('breed')[0];
  const sexField = document.getElementsByName('sex')[0];

  let dogName = e.target.parentNode.parentNode.childNodes[0].textContent;
  let dogBreed = e.target.parentNode.parentNode.childNodes[1].textContent;
  let dogSex = e.target.parentNode.parentNode.childNodes[2].textContent;
  let id = e.target.parentNode.childNodes[0].dataset.id;

  nameField.id = id;
  nameField.value = dogName;
  breedField.id = id;
  breedField.value = dogBreed;
  sexField.id = id;
  sexField.value = dogSex;
}


function submitChanges() {
  const submitForm = document.getElementById('dog-form');
  const submitBtn = submitForm.childNodes[7];
  submitBtn.addEventListener('click', e => handleSubmitChanges(e));
}

function handleSubmitChanges(e) {
  e.preventDefault();
  console.log("Am I happening first?")
  e.target.parentNode.childNodes;
  const nameField = e.target.parentNode.childNodes[1];
  const breedField = e.target.parentNode.childNodes[3];
  const sexField = e.target.parentNode.childNodes[5];
  // console.log('name', nameField.value);
  // console.log('data', nameField);
  // console.log('breed', breedField.value);
  // console.log('sex', sexField.value);
  // console.log('id', nameField.id);
 
  patchDogChanges(nameField.id, nameField.value, breedField.value, sexField.value, e.target.parentNode);

  //e.target.parentNode.reset();
}

function patchDogChanges(id, dogName, dogBreed, dogSex, e) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: dogName,
      breed: dogBreed,
      sex: dogSex
    })
  })
  .then(response => response.json())
  .then(data => {
    // removeTableData();
    e.reset()
    getDogData()
  })
}

function removeTableData() {
  const tableBody = document.getElementById('table-body');
  // tableBody.innerHTML = '';
}

// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and re-rendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.