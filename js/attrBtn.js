const btnAttrAdd = document.querySelector(".btn-attr-add");
const sectionAttrAdd = document.querySelector(".sect-attr-add");
const btnAttrDelete = document.querySelector(".btn-attr-delete.input-delete");
const showAttrMenu = document.querySelector(".wrap-attr-menu");
const btnTagDelete = document.querySelector(".btn-trash");

const addOn = () => {
  sectionAttrAdd.classList.add("on");
  showAttrMenu.classList.add("on");
};

const deleteOn = () => {
  sectionAttrAdd.classList.remove("on");
  showAttrMenu.classList.remove("on");
};

const deleteTag = () => {
  const { selected } = board;
  if (!selected) return;
  board.clearSelected();
  board.delete(selected);
};

btnAttrAdd.addEventListener("click", addOn);
btnAttrDelete.addEventListener("click", deleteOn);
btnTagDelete.addEventListener("click", deleteTag);