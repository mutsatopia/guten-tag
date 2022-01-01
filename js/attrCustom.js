const addBtn = document.querySelector(".btn-attr-add");
const attrContainer = document.querySelector(".attr-item-containers");
const attrInput = document.querySelector(".input-attr-user-custom");
const show = document.querySelector(".wrap-attr-menu");
const sectionAdd = document.querySelector(".sect-attr-add");

attrInput.addEventListener("focusout", addAttr);

function addAttr() {
  const attrName = document.querySelector(".input-attr-name");
  const attrValue = document.querySelector(".input-attr-user-custom");
  const { attr } = board.selected;

  if (attrName.value.length > 0 & attrValue.value.length > 0) {
    if (attr.length === 0) {
      attr.push({
        id: 1,
        title: attrName.value,
        attr: attrValue.value
      });  
    } else {
      attr.push({
        id: attr[attr.length-1].id + 1,
        title: attrName.value,
        attr: attrValue.value
      });
    };
  };

  while (attrContainer.hasChildNodes()) {
    attrContainer.removeChild(attrContainer.firstChild);
  };

  attrRender(attr);

  attr.forEach((el)=> {
    const btn = document.querySelector("#" + el.title);
    btn.addEventListener("click", deleteAttr);
  });

  attrName.value = "";
  attrValue.value = "";
  sectionAdd.classList.remove("on");
  show.classList.remove("on");
};

function attrRender(arr) {
  while (attrContainer.hasChildNodes()) {
    attrContainer.removeChild(attrContainer.firstChild);
  };

  arr.forEach((el) => {
    const container = document.createElement("div");
    container.className = "attr-list-container";
    container.id = el.id;

    const title = document.createElement("input");
    title.value = el.title;
    title.className = "attr-list-title";
    title.setAttribute("spellcheck", "false")

    const remove = document.createElement("div");
    remove.className = "btn-attr-delete";
    remove.id = el.title;

    const desc = document.createElement("input");
    desc.value = el.attr;
    desc.className = "attr-list-desc";
    desc.setAttribute("spellcheck", "false")

    container.appendChild(remove);
    container.appendChild(title);
    container.appendChild(desc);
    attrContainer.appendChild(container);

    const btn = document.querySelector("#" + el.title);
    btn.addEventListener("click", deleteAttr);
  });
  const attrItem = document.querySelectorAll(".attr-list-container");
  attrItem.forEach((el)=> {
    el.addEventListener("click", modifiyAttr);
  });
};

function deleteAttr(e) {
  const { attr } = board.selected;
  const removeTarget = e.target.parentElement;
  for (let i = attr.length-1; i >= 0; i--) {
    if (attr[i].title === e.target.id) {
      attr.splice(i, 1);
    };
  };
  removeTarget.remove();
};

function modifiyAttr(e) {
  const { attr } = board.selected;
  const eTag = e.target;
  if (eTag.className === "attr-list-title") {
    let value = e.target;
    value.classList.add("input-attr-name");
  };

  if (eTag.className === "attr-list-desc") {
    let value = e.target;
    value.classList.add("input-attr-user-custom");
  };

  attr.forEach((el) => {
    if (el.title.includes(e.target.value)) {
      e.target.addEventListener("focusout", () => {
        el.title = e.target.value;
        while (attrContainer.hasChildNodes()) {
          attrContainer.removeChild(attrContainer.firstChild);
        };
        attrRender(attr);
        attr.forEach((el) => {
          const btn = document.querySelector("#" + el.title);
          btn.addEventListener("click", deleteAttr);
        });
      });
    };

    if (el.attr.includes(e.target.value)) {
      e.target.addEventListener("focusout", () => {
        el.attr = e.target.value;
        while (attrContainer.hasChildNodes()) {
          attrContainer.removeChild(attrContainer.firstChild);
        };
        attrRender(attr);
        attr.forEach((el) => {
          const btn = document.querySelector("#" + el.title);
          btn.addEventListener("click", deleteAttr);
        });
      });
    };
  });
};