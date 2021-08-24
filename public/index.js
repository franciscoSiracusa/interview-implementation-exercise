const getItems = () => {
  fetch("/getItem")
  	.then((res) => res.json())
    .then((data) => {
			const itemContainer = document.getElementById('item-container');
			const list = document.createElement('ul');
			const fragment = document.createDocumentFragment();
			data.forEach(item => {
				const itemlist = document.createElement('li');
				itemlist.textContent = item.description;
				fragment.appendChild(itemlist);
			});
			list.appendChild(fragment);
			itemContainer.appendChild(list);
		});
};

const getFolders = () => {
  fetch("/getFolder")
  	.then((res) => res.json())
    .then((data) => {
			const folderContainer = document.getElementById('folder-container');
			const list = document.createElement('ul');
			const fragment = document.createDocumentFragment();
			data.forEach(item => {
				const itemlist = document.createElement('li');
				itemlist.textContent = item.description;
				fragment.appendChild(itemlist);
			});
			list.appendChild(fragment);
			folderContainer.appendChild(list);
		});
};

const createItem = () =>{
	const form = document.createElement('form');
  form.id = 'form';
  const formContainer = document.getElementById('form-container');
	formContainer.appendChild(form);
  const input = document.createElement('input');
  const btn = document.createElement('button');
	input.id = 'description';
  input.name = 'description';
  input.placeholder = 'Insertar Tarea';
  input.pattern = '^[a-zA-Z ñÑ]*$';
  input.required = true;
  input.maxLength = 50;
	btn.textContent = 'crear';
	form.appendChild(input);
  form.appendChild(btn);
	btn.addEventListener('click', (e) =>{
		e.preventDefault();
		console.log(input.value);
		fetch(`/createItem?description=${input.value}`,{
			method: 'POST',
		})
	})
}

window.addEventListener("load", () => {
	getItems();
	getFolders();
	createItem();
});
