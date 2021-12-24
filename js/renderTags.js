const btnAll = document.querySelector("#btn-all");
const btnInline = document.querySelector("#btn-inline");
const btnBlock = document.querySelector("#btn-block");
const btnSemantic = document.querySelector("#btn-semantic");
const wrapTag = document.querySelector(".wrap-tag");

// 태그 선택 바에서 태그 버튼을 클릭할 때 이벤트 핸들러
const tagClickHandler = (data) => {
  return () => board.add(data);
};

const randerTags = function (arr, cls) {
  return function () {
    wrapTag.innerHTML = "";
    const fragment = document.createDocumentFragment();
    arr.forEach((data) => {
      const { tagName, keyword } = data;
      if (!cls || keyword.includes(cls)) {
        let item = document.createElement("li");
        let text = document.createTextNode(tagName);
        item.appendChild(text);
        item.addEventListener('click', tagClickHandler(data))
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
