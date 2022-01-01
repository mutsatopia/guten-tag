const btnAll = document.querySelector("#btn-all");
const btnInline = document.querySelector("#btn-inline");
const btnBlock = document.querySelector("#btn-block");
const btnSemantic = document.querySelector("#btn-semantic");
const wrapTag = document.querySelector(".wrap-tag");

const pinkTheme = document.querySelector(".theme-one");
const greenTheme = document.querySelector(".theme-two");
const blueTheme = document.querySelector(".theme-three");
const yellowTheme = document.querySelector(".theme-four");
const customTheme = document.querySelector(".inp-color");
let isFirst = true;

const btnFilters = document.querySelectorAll(".btn-filter-tag");
//버튼 터치 시 볼드
btnFilters.forEach((targetBtn)=>{
  targetBtn.addEventListener("click",()=>{
    targetBtn.classList.add("selected");

    btnFilters.forEach((btn)=>{
      if(btn!==targetBtn){
        btn.classList.remove("selected");
      }
    });
  });
})

// 태그 선택 바에서 태그 버튼을 클릭할 때 이벤트 핸들러
const tagClickHandler = (data) => {
  return (event) => {
    const { target } = event;
    const tags = document.querySelectorAll(".wrap-tag > li");
    tags.forEach((el) => {
      el.classList.remove("click-tag");
    });
    target.classList.toggle("click-tag");
    if (target.textContent === board.ready?.tagName) {
      board.clearReady();
    } else {
      board.add(data);
    }
  };
};

const renderTags = function (arr, cls) {
  return function () {
    wrapTag.innerHTML = "";
    const fragment = document.createDocumentFragment();
    arr.forEach((data,index) => {
      const { tagName, keyword } = data;
      if (!cls || keyword.includes(cls)) {
        let item = document.createElement("li");
        let text = document.createTextNode(tagName);
        item.appendChild(text);
        if (isFirst) {
          let { redColor, greenColor, blueColor } = theme;
          const rgb = [redColor, greenColor, blueColor]
            .map(color => color + Math.floor(Math.random()*(70-1+1)) + 1);
          arr[index].color = rgb;
        }
        item.style.backgroundColor = `rgb(${tagData[index].color.join(',')})`;
        item.addEventListener("click", tagClickHandler(data))
        fragment.appendChild(item);
      }
    });
    wrapTag.appendChild(fragment);
    if(isFirst){
      isFirst=false;
    }
  };
};

const changeTheme = function(r,g,b){
  return function(){
    theme.setColor(r, g, b);
    isFirst=true;
    btnFilters.forEach((check)=>{
      if(check.id!=="btn-all"){
        check.classList.remove("selected");
      }else{
        check.classList.add("selected");
      }
    })
    renderTags(tagData)();
  }
} 

customTheme.addEventListener("input", watchColor, false);

function watchColor(event){
  let colorCode = event.target.value;
  console.log(colorCode);
  const r = parseInt(colorCode.substr(1,2),16);
  const g = parseInt(colorCode.substr(3,2),16);
  const b = parseInt(colorCode.substr(5,2),16);
  
  return changeTheme(r,g,b)();
    
}



btnAll.addEventListener("click", renderTags(tagData));
btnInline.addEventListener("click", renderTags(tagData, "inline"));
btnBlock.addEventListener("click", renderTags(tagData, "block"));
btnSemantic.addEventListener("click", renderTags(tagData, "semantic"));

pinkTheme.addEventListener("click", changeTheme(212,154,219));
greenTheme.addEventListener("click", changeTheme(163,219,140));
blueTheme.addEventListener("click", changeTheme(90,219,196));
yellowTheme.addEventListener("click",changeTheme(218,213,139));

renderTags(tagData)();
