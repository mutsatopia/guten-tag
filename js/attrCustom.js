const addBtn = document.querySelector(".btn-attr-add");
const attrContainer = document.querySelector(".attr-item-containers");
const attrInput = document.querySelector(".input-attr-user-custom");
const show = document.querySelector(".wrap-attr-menu");

addBtn.addEventListener("click", customInput);
attrInput.addEventListener("focusout", addAttr);


const attrArr = [
  {
    title: "href",
    attr: "www.gutentag.com"
  },
  {
    title: "type",
    attr: "button"
  }
];

function customInput(){
  show.style.display="flex"
};

function addAttr() {
  const elName = document.querySelector(".input-attr-name");
  const attr = document.querySelector(".input-attr-user-custom");
  attrArr.push({
    title: elName.value,
    attr: attr.value
  });

  while(attrContainer.hasChildNodes()){
    attrContainer.removeChild(attrContainer.firstChild);
  };

  attrRender(attrArr);

  attrArr.forEach((el)=> {
    const btn = document.querySelector('#' + el.title);
    btn.addEventListener("click", deleteAttr);
  });

  elName.value = null;
  attr.value = null;
  show.style.display="none";
};

function attrRender(arr) {
  arr.forEach((el) => {
    const container = document.createElement("div");
    container.className = "attr-list-container";

    const title = document.createElement("span");
    title.textContent = el.title;
    title.className = "attr-list-title";

    const remove = document.createElement("div")
    remove.className = "btn-attr-delete";
    remove.id = el.title

    const desc = document.createElement("span");
    desc.textContent = el.attr;
    desc.className = "attr-list-desc";

    container.appendChild(remove)
    container.appendChild(title);
    container.appendChild(desc);
    attrContainer.appendChild(container);
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
  attrArr.forEach((el) => {
    if(el.title === e.target.id){
      attrArr.splice(el, 1)
    };
  });
  removeTarget.remove();
};

attrRender(attrArr);
giveId();



