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


const getItems = () => {
  fetch("/getItem")
    .then((res) => res.json())
    .then((data) => {
      const itemContainer = document.getElementById("item-container");
			itemContainer.innerHTML = '';
      const fragment = document.createDocumentFragment();
      data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.setAttribute("data-id", item.item_id);
        const p = document.createElement("p");
        const deletebtn = document.createElement("button");
        const editbtn = document.createElement("button");
        deletebtn.textContent = "Borrar";
        editbtn.textContent = "Editar";
        p.textContent = item.description;
        deletebtn.addEventListener("click", () => deleteItem(div.dataset.id));
        div.appendChild(p);
        div.appendChild(deletebtn);
        div.appendChild(editbtn);
        fragment.appendChild(div);
      });
      itemContainer.appendChild(fragment);
    });
};

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
  btn.textContent = "crear";
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
};

window.addEventListener("load", () => {
  const btnItem = document.createElement("button");
  const btnFolder = document.createElement("button");
  const folderCotainer = document.getElementById("folder-container");
  const itemContainer = document.getElementById("item-container");
  btnFolder.textContent = "Desplegar Carpetas";
  btnItem.textContent = "Desplegar Items";
  document.body.appendChild(btnFolder);
  document.body.appendChild(btnItem);
  btnItem.addEventListener("click", () => {
		getItems();
		createItem();
	});
  btnFolder.addEventListener("click", () => getFolders());
});
