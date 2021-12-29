const palette = document.querySelector("#btn-palette");
const paletteOpenBtn = document.querySelector(".btn-theme-open");

paletteOpenBtn.addEventListener("click",()=>{
    palette.classList.toggle("palette");
})