const tags = document.querySelectorAll('li');

tags.forEach((el)=>{
  el.addEventListener("click", tagToggle);
});

function tagToggle(e) {
  tags.forEach((el) => {
    el.classList.remove('click-tag');
      });
    e.target.classList.toggle('click-tag');
}


