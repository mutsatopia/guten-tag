const palette = document.querySelector("#btn-palette");
const gridPlace = document.querySelector("#btn-grid");

const openMenuBtn = document.querySelectorAll(".btn-menu-open");

openMenuBtn.forEach((target)=>{
  target.addEventListener("click",()=>{
    if(target.id==="btn-open-theme"){
      palette.classList.toggle("open");
      gridPlace.classList.remove("open");
      } else {
        gridPlace.classList.toggle("open");
        palette.classList.remove("open");
      }
  });
});

document.addEventListener("click", (event) => {
  [palette, gridPlace].forEach(btn => {
    if (event.target !== btn && ![...btn.childNodes].includes(event.target)) {
      btn.classList.remove("open");
    }
  });
});