const ALL = document.querySelector("#btn-all");
const INLINE = document.querySelector("#btn-inline");
const BLOCK = document.querySelector("#btn-block");
const SEMANTIC = document.querySelector("#btn-semantic");
const ITEMS = document.querySelector("#warp-items");

const TAG_DATA = [
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
    ITEMS.innerHTML = "";
    const fragment = document.createDocumentFragment();
    arr.forEach(({ tag, clsArr }) => {
      if (!cls || clsArr.includes(cls)) {
        let item = document.createElement("li");
        let text = document.createTextNode(tag);
        item.appendChild(text);
        fragment.appendChild(item);
      }
    });
    ITEMS.appendChild(fragment);
  };
};

ALL.addEventListener("click", randerTags(TAG_DATA));
INLINE.addEventListener("click", randerTags(TAG_DATA, "inline"));
BLOCK.addEventListener("click", randerTags(TAG_DATA, "block"));
SEMANTIC.addEventListener("click", randerTags(TAG_DATA, "semantic"));

randerTags(TAG_DATA)();
