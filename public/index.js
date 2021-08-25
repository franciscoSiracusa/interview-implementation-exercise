const deleteItem = (id) => {
	fetch(`/deleteItem?id=${id}`,{
		method: "DELETE"
	})
		.then(res => {
			let div = document.querySelector(`[data-id="${id}"]`);
			div.innerHTML = '';
			div.remove();
		});
}

const editItem = (id) => {
	const formContainer = document.getElementById("form-container");
	formContainer.innerHTML = '';
	const form = document.createElement("form");
  form.id = "form";
  formContainer.appendChild(form);
  const input = document.createElement("input");
  const btn = document.createElement("button");
	const cancelBtn = document.createElement("button");
  input.id = "description";
  input.name = "description";
  input.placeholder = "Editar Tarea";
  input.pattern = "^[a-zA-Z ñÑ]*$";
  input.required = true;
  input.maxLength = 50;
  btn.textContent = "Editar";
	btn.id='btn';
	cancelBtn.textContent = "Cancelar";
	cancelBtn.id= 'btn';
  form.appendChild(input);
  form.appendChild(btn);
	form.appendChild(cancelBtn);
	cancelBtn.addEventListener("click", ()=>{
		formContainer.innerHTML = '';
		getItems();
		createItem();
	})
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/editItem?description=${input.value}&id=${id}`, {
      method: "PUT",
    }).then((res) => {
			formContainer.innerHTML = '';
			getItems();
			createItem();
		});
  });
};

const checkItem = (id,input) =>{
	if (input.checked) {
		let checked = 1;
		fetch(`/checkItem?id=${id}&checked=${checked}`,{
			method:'PUT'
		}).then()
	} else {
		let checked = 0;
		fetch(`/checkItem?id=${id}&checked=${checked}`,{
			method:'PUT'
		}).then()
	}
}

const getItems = () => {
  fetch("/getItem")
    .then((res) => res.json())
    .then((data) => {
      const itemContainer = document.getElementById("item-container");
			itemContainer.innerHTML = '';
      const fragment = document.createDocumentFragment();
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "item";
        div.setAttribute("data-id", item.item_id);
        const p = document.createElement("p");
        const deletebtn = document.createElement("button");
        const editbtn = document.createElement("button");
				const input = document.createElement("input");
        deletebtn.textContent = "Borrar";
        editbtn.textContent = "Editar";
        p.textContent = item.description;
				input.type = 'checkbox'
        input.checked = item.checked ? true : false;
        deletebtn.addEventListener("click", () => deleteItem(div.dataset.id));
				editbtn.addEventListener("click", () => editItem(div.dataset.id));
				input.addEventListener("change", ()=> checkItem(div.dataset.id,input));
        div.appendChild(p);
        div.appendChild(deletebtn);
        div.appendChild(editbtn);
				div.appendChild(input);
        fragment.appendChild(div);
      });
      itemContainer.appendChild(fragment);
    });
};


const createItem = () => {
  const form = document.createElement("form");
  form.id = "form";
  const formContainer = document.getElementById("form-container");
  formContainer.appendChild(form);
  const input = document.createElement("input");
  const btn = document.createElement("button");
  input.id = "description";
  input.name = "description";
  input.placeholder = "Insertar Tarea";
  input.pattern = "^[a-zA-Z ñÑ]*$";
  input.required = true;
  input.maxLength = 50;
  btn.textContent = "Crear";
	btn.id='btn'
  form.appendChild(input);
  form.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/createItem?description=${input.value}`, {
      method: "POST",
    }).then((res) => {
			getItems();
			input.value = '';
		});
  });
};

/*
const getFolders = () => {
  fetch("/getFolder")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("folder-list");
      if (list.hasChildNodes()) {
        const folderlist = document.createElement("li");
        folderlist.textContent = data[data.length - 1].name;
        list.appendChild(folderlist);
      } else {
        const fragment = document.createDocumentFragment();
        data.forEach((item) => {
          const folderlist = document.createElement("li");
          folderlist.textContent = item.name;
          fragment.appendChild(folderlist);
        });
        list.appendChild(fragment);
      }
    });
};*/

/*
const createFolder = () => {
  const form = document.createElement("form");
  form.id = "form";
  const formContainer = document.getElementById("form-container");
  formContainer.appendChild(form);
  const input = document.createElement("input");
  const btn = document.createElement("button");
  input.id = "name";
  input.name = "name";
  input.placeholder = "Insertar Nombre de Carpeta";
  input.pattern = "^[a-zA-Z ñÑ]*$";
  input.required = true;
  input.maxLength = 50;
  btn.textContent = "crear";
  form.appendChild(input);
  form.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/createItem?name=${input.value}`, {
      method: "POST",
    }).then((res) => getFolders());
  });
};*/

window.addEventListener("load", () => {
  const btnItem = document.createElement("button");
  const btnFolder = document.createElement("button");
  const folderCotainer = document.getElementById("folder-container");
  const itemContainer = document.getElementById("item-container");
	const nav = document.getElementById("nav");
  btnFolder.textContent = "Desplegar Carpetas";
  btnItem.textContent = "Desplegar Items";
  nav.appendChild(btnFolder);
  nav.appendChild(btnItem);
  btnItem.addEventListener("click", () => {
		const formContainer = document.getElementById("form-container");
		formContainer.innerHTML = '';
		getItems();
		createItem();
	});
  btnFolder.addEventListener("click", () => getFolders());
});
