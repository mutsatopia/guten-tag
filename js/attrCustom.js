const addBtn = document.querySelector(".btn-attr-add");
const attrContainer = document.querySelector(".attr-item-containers");
const attrInput = document.querySelector(".input-attr-user-custom");
const show = document.querySelector(".wrap-attr-menu");
const sectionAdd = document.querySelector(".sect-attr-add");

attrInput.addEventListener("focusout", addAttr);

const attrArr = [
  {
    id:1,
    title:"href",
    attr:"www.hihi.com"
  },
  {
    id:2,
    title:"type",
    attr:"button"
  }
];

function addAttr() {
  const elName = document.querySelector(".input-attr-name");
  const attr = document.querySelector(".input-attr-user-custom");

  if(elName.value.length > 0 & attr.value.length > 0) {
    if(attrArr.length === 0){
      attrArr.push({
        id: 1,
        title: elName.value,
        attr: attr.value
      });  
    } else {
      attrArr.push({
        id: attrArr[attrArr.length-1].id + 1,
        title: elName.value,
        attr: attr.value
      });
    };
  };

  while(attrContainer.hasChildNodes()){
    attrContainer.removeChild(attrContainer.firstChild);
  };

  attrRender(attrArr);

  attrArr.forEach((el)=> {
    const btn = document.querySelector("#" + el.title);
    btn.addEventListener("click", deleteAttr);
  });

  elName.value = null;
  attr.value = null;
  sectionAdd.classList.remove("on");
  show.classList.remove("on");
};

function attrRender(arr) {
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
  });
  const attrItem = document.querySelectorAll(".attr-list-container");
  attrItem.forEach((el)=> {
    el.addEventListener("click", modifiyAttr);
  });
};


function giveId(){
  attrArr.forEach((el)=> {
    const btn = document.querySelector("#" + el.title);
    btn.addEventListener("click", deleteAttr);
  });
};

function deleteAttr(e) {
  const removeTarget = e.target.parentElement;
  for(let i = attrArr.length-1; i >= 0; i--){
      if(attrArr[i].title === e.target.id){
        attrArr.splice( i , 1);
    };
  };
  removeTarget.remove();
};

function modifiyAttr(e){
  const eTag = e.target;
  if(eTag.className === "attr-list-title"){
    let value = e.target;
    value.classList.add("input-attr-name");
  };

  if(eTag.className === "attr-list-desc"){
    let value = e.target;
    value.classList.add("input-attr-user-custom")
  };

  attrArr.forEach((el) => {
    if(el.title.includes(e.target.value)){
      e.target.addEventListener("focusout", () => {
        el.title = e.target.value;
        while(attrContainer.hasChildNodes()){
          attrContainer.removeChild(attrContainer.firstChild);
        };
        attrRender(attrArr);
        attrArr.forEach((el)=> {
          const btn = document.querySelector("#" + el.title);
          btn.addEventListener("click", deleteAttr);
        });
      });
    };

    if(el.attr.includes(e.target.value)){
      e.target.addEventListener("focusout", () => {
        el.attr = e.target.value;
        while(attrContainer.hasChildNodes()){
          attrContainer.removeChild(attrContainer.firstChild);
        };
        attrRender(attrArr);
        attrArr.forEach((el)=> {
          const btn = document.querySelector("#" + el.title);
          btn.addEventListener("click", deleteAttr);
        });
      });
    };
  });
};

attrRender(attrArr);
giveId();





