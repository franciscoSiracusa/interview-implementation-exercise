const getItems = () => {
  fetch("/getItem")
  	.then((res) => res.json())
    .then((data) => {
			const list = document.getElementById('item-list');
			if (list.hasChildNodes()) {
				const itemlist = document.createElement('li');
				const deletebtn = document.createElement('button');
				const editbtn = document.createElement('button');
				deletebtn.textContent = 'Borrar';
				editbtn.textContent = 'Editar'
				itemlist.textContent = data[data.length-1].description;
				itemlist.appendChild(deletebtn);
				itemlist.appendChild(editbtn);
				list.appendChild(itemlist);
			} else {
				const fragment = document.createDocumentFragment();
				data.forEach(item => {
					const itemlist = document.createElement('li');
					itemlist.textContent = item.description;
					fragment.appendChild(itemlist);
				});
				list.appendChild(fragment);
			}
		});
};

const getFolders = () => {
  fetch("/getFolder")
  	.then((res) => res.json())
    .then((data) => {
			const list = document.getElementById('folder-list');
			if (list.hasChildNodes()) {
				const folderlist = document.createElement('li');
				folderlist.textContent = data[data.length-1].name;
				list.appendChild(folderlist);
			} else {
				const fragment = document.createDocumentFragment();
				data.forEach(item => {
					const folderlist = document.createElement('li');
					folderlist.textContent = item.name;
					fragment.appendChild(folderlist);
				});
				list.appendChild(fragment);
			}
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
		fetch(`/createItem?description=${input.value}`,{
			method: 'POST',
		})
			.then(res => getItems())
	})
}

const createFolder = () =>{
	const form = document.createElement('form');
  form.id = 'form';
  const formContainer = document.getElementById('form-container');
	formContainer.appendChild(form);
  const input = document.createElement('input');
  const btn = document.createElement('button');
	input.id = 'name';
  input.name = 'name';
  input.placeholder = 'Insertar Nombre de Carpeta';
  input.pattern = '^[a-zA-Z ñÑ]*$';
  input.required = true;
  input.maxLength = 50;
	btn.textContent = 'crear';
	form.appendChild(input);
  form.appendChild(btn);
	btn.addEventListener('click', (e) =>{
		e.preventDefault();
		fetch(`/createItem?name=${input.value}`,{
			method: 'POST',
		})
			.then(res => getFolders())
	})
}

window.addEventListener("load", () => {
	const btnItem = document.createElement('button');
	const btnFolder = document.createElement('button');
	const folderCotainer = document.getElementById('folder-container');
	const itemContainer = document.getElementById('item-container');
	btnFolder.textContent = 'Desplegar Carpetas'
	btnItem.textContent = 'Desplegar Items'
	folderCotainer.appendChild(btnFolder);
	itemContainer.appendChild(btnItem);
	btnItem.addEventListener('click' , () => getItems());
	btnFolder.addEventListener('click', () => getFolders());
	createItem();
});
