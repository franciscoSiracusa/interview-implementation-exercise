const displayItem = (data,folderId,folderName) => {
  const itemContainer = document.getElementById("item-container");
  itemContainer.innerHTML = "";
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
    input.type = "checkbox";
    input.checked = item.checked ? true : false;
    deletebtn.addEventListener("click", () => deleteItem(div.dataset.id));
    editbtn.addEventListener("click", () => editItem(div.dataset.id,folderId,folderName));
    input.addEventListener("change", () => checkItem(div.dataset.id, input));
    div.appendChild(p);
    div.appendChild(editbtn);
    div.appendChild(deletebtn);
    div.appendChild(input);
    fragment.appendChild(div);
  });
  itemContainer.appendChild(fragment);
};

const deleteItem = (id) => {
  fetch(`/deleteItem?id=${id}`, {
    method: "DELETE",
  }).then((res) => {
    let div = document.querySelector(`[data-id="${id}"]`);
    div.innerHTML = "";
    div.remove();
  });
};

const editItem = (id,folderId,folderName) => {
  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = "";
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
  btn.className = "btn";
  cancelBtn.textContent = "Cancelar";
  cancelBtn.className = "btn";
  form.appendChild(input);
  form.appendChild(btn);
  form.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    formContainer.innerHTML = "";
    getItems();
    createItem();
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/editItem?description=${input.value}&id=${id}`, {
      method: "PUT",
    }).then((res) => {
      formContainer.innerHTML = "";
      if (folderId === undefined) {
        getItems();
        createItem();
      } else {
        getFolderItems(folderId,folderName);
        createFolderItems(folderId,folderName);
      }
    });
  });
};

const checkItem = (id, input) => {
  if (input.checked) {
    let checked = 1;
    fetch(`/checkItem?id=${id}&checked=${checked}`, {
      method: "PUT",
    }).then();
  } else {
    let checked = 0;
    fetch(`/checkItem?id=${id}&checked=${checked}`, {
      method: "PUT",
    }).then();
  }
};

const getItems = () => {
  fetch("/getItem")
    .then((res) => res.json())
    .then((data) => {
      displayItem(data);
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
  btn.id = "btn";
  form.appendChild(input);
  form.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/createItem?description=${input.value}`, {
      method: "POST",
    }).then((res) => {
      getItems();
      input.value = "";
    });
  });
};

const getFolderItems = (id, name) => {
  document.getElementById("folder-container").innerHTML = "";
  fetch(`/getFolderItem?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayItem(data,id,name);
      const p = document.createElement("p");
      p.textContent = name;
      const itemContainer = document.getElementById("item-container");
      itemContainer.appendChild(p);
    });
};

const createFolderItems = (id,name) =>{
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
  btn.textContent = "Add";
  btn.id = "btn";
  form.appendChild(input);
  form.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/createFolderItem?description=${input.value}&id=${id}`, {
      method: "POST",
    }).then((res) => {
      console.log(res);
      getFolderItems(id,name);
      input.value = "";
    });
  });
}

const deleteFolder = (id) => {
  fetch(`/deleteFolder?id=${id}`, {
    method: "DELETE",
  }).then((res) => {
    let div = document.querySelector(`[data-id="${id}"]`);
    div.innerHTML = "";
    div.remove();
  });
};

const editFolder = (id) => {
  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = "";
  const form = document.createElement("form");
  form.id = "form";
  formContainer.appendChild(form);
  const input = document.createElement("input");
  const btn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  input.id = "name";
  input.name = "name";
  input.placeholder = "Edit name folder";
  input.pattern = "^[a-zA-Z ñÑ]*$";
  input.required = true;
  input.maxLength = 30;
  btn.textContent = "Edit";
  btn.id = "btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.id = "btn";
  form.appendChild(input);
  form.appendChild(btn);
  form.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    formContainer.innerHTML = "";
    getFolders();
    createFolder();
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/editFolder?name=${input.value}&id=${id}`, {
      method: "PUT",
    }).then((res) => {
      formContainer.innerHTML = "";
      getFolders();
      createFolder();
    });
  });
};

const getFolders = () => {
  fetch("/getFolder")
    .then((res) => res.json())
    .then((data) => {
      const folderContainer = document.getElementById("folder-container");
      folderContainer.innerHTML = "";
      const fragment = document.createDocumentFragment();
      data.forEach((folder) => {
        const div = document.createElement("div");
        div.className = "folder";
        div.setAttribute("data-id", folder.folder_id);
        const p = document.createElement("p");
        const deletebtn = document.createElement("button");
        const editbtn = document.createElement("button");
        const viewbtn = document.createElement("button");
        deletebtn.textContent = "Remove";
        editbtn.textContent = "Edit";
        viewbtn.textContent = "View Items";
        p.textContent = folder.name;
        viewbtn.addEventListener("click", () =>{
          document.getElementById("form-container").innerHTML = "";
          getFolderItems(div.dataset.id, folder.name);
          createFolderItems(div.dataset.id,folder.name);
        });
        deletebtn.addEventListener("click", () => deleteFolder(div.dataset.id));
        editbtn.addEventListener("click", () => editFolder(div.dataset.id));
        div.appendChild(p);
        div.appendChild(viewbtn);
        div.appendChild(deletebtn);
        div.appendChild(editbtn);
        fragment.appendChild(div);
      });
      folderContainer.appendChild(fragment);
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
  input.placeholder = "Name of the Folder";
  input.pattern = "^[a-zA-Z ñÑ]*$";
  input.required = true;
  input.maxLength = 30;
  btn.textContent = "Add";
  btn.id = "btn";
  form.appendChild(input);
  form.appendChild(btn);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/createFolder?name=${input.value}`, {
      method: "POST",
    }).then((res) => {
      getFolders();
      input.value = "";
    });
  });
};

window.addEventListener("load", () => {
  const btnItem = document.createElement("button");
  const btnFolder = document.createElement("button");
  const folderCotainer = document.getElementById("folder-container");
  const itemContainer = document.getElementById("item-container");
  const formContainer = document.getElementById("form-container");
  const nav = document.getElementById("nav");
  btnFolder.textContent = "Desplegar Carpetas";
  btnItem.textContent = "Desplegar Items";
  nav.appendChild(btnFolder);
  nav.appendChild(btnItem);
  btnItem.addEventListener("click", () => {
    folderCotainer.innerHTML = "";
    formContainer.innerHTML = "";
    getItems();
    createItem();
  });
  btnFolder.addEventListener("click", () => {
    itemContainer.innerHTML = "";
    formContainer.innerHTML = "";
    getFolders();
    createFolder();
  });
});
