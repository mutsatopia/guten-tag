const palette = document.querySelector("#btn-palette");
const gridPlace = document.querySelector("#btn-grid");
const paletteMenu = document.querySelectorAll(".palette-menu");
const gridMenu = document.querySelector(".list-grid-container");
const openMenuBtn = document.querySelectorAll(".btn-menu-open");

openMenuBtn.forEach((target)=>{
  target.addEventListener("click",()=>{
    board.clearReady();
    if(target.id==="btn-open-theme"){
      palette.classList.toggle("open");
      gridPlace.classList.remove("open");
      menuOpenCheck();
      } else {
        gridPlace.classList.toggle("open");
        palette.classList.remove("open");
        menuOpenCheck();
      }
  });
});

document.addEventListener("click", (event) => {
  [palette, gridPlace].forEach(btn => {
    const stack = [btn];
    const nodes = [];
    while (stack.length) {
      const node = stack.pop();
      nodes.push(node);
      stack.push(...node.childNodes);
    }
    if (!nodes.includes(event.target)) {
      btn.classList.remove("open");
      menuOpenCheck();
    }
  });
});


const menuOpenCheck = function(){
  if(palette.classList.value===`btn-headmenu open`){
    paletteMenu.forEach((btn)=>{
      btn.classList.add("open");
    })
  }else {
    paletteMenu.forEach((btn)=>{
      btn.classList.remove("open");
    })
  }

  if(gridPlace.classList.value===`btn-headmenu gird-menu open`){
    gridMenu.classList.add("open");
  }else {
    gridMenu.classList.remove("open");
  }
}