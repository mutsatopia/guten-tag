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

document.addEventListener("click",(event)=>{
    
  console.log(event.target.classList.value);
  if(event.target.classList.value!=="btn-menu-open" 
  && event.target.classList.value!=="btn-theme theme-one"
  && event.target.classList.value!=="btn-theme theme-two"
  && event.target.classList.value!=="btn-theme theme-three"
  && event.target.classList.value!=="btn-theme theme-four"
  && event.target.classList.value!=="btn-theme-user-custom"
  && event.target.classList.value!=="txt-grid-Whether"
  && event.target.classList.value!=="inp-grid-check"
  && event.target.classList.value!=="txt-grid-size"
  && event.target.classList.value!=="inp-grid-size"
  && event.target.classList.value!=="list-theme-container"
  && event.target.classList.value!=="list-grid-container"){
    gridPlace.classList.remove("open");
    palette.classList.remove("open");
  }
});