const btnAll = document.querySelector("#btn-all");
const btnInline = document.querySelector("#btn-inline");
const btnBlock = document.querySelector("#btn-block");
const btnSemantic = document.querySelector("#btn-semantic");
const wrapTag = document.querySelector(".warp-tag");

const tagData = [
  {
    tag: "div",
    clsArr: ["block"],
    attr: [],
  },

  {
    tag: "li",
    clsArr: ["inline"],
    attr: [],
  },

  {
    tag: "header",
    clsArr: ["block", "semantic"],
    attr: [],
  },
];

const randerTags = function (arr, cls) {
  return function () {
    wrapTag.innerHTML = "";
    const fragment = document.createDocumentFragment();
    arr.forEach(({ tag, clsArr }) => {
      if (!cls || clsArr.includes(cls)) {
        let item = document.createElement("li");
        let text = document.createTextNode(tag);
        item.appendChild(text);
        fragment.appendChild(item);
      }
    });
    wrapTag.appendChild(fragment);
  };
};

btnAll.addEventListener("click", randerTags(tagData));
btnInline.addEventListener("click", randerTags(tagData, "inline"));
btnBlock.addEventListener("click", randerTags(tagData, "block"));
btnSemantic.addEventListener("click", randerTags(tagData, "semantic"));

randerTags(tagData)();
