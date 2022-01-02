const cursor = {
  elem: document.createElement("div"),
  size: 15,

  // cursor 초기화
  // cursor가 정의된 시점에서 아직 board가 정의되지 않아 참조할 수 없음
  // 그래서 board.init()할 때 cursor.init()도 같이 해 주고,
  // cursor를 전역 변수로 참조하는게 아니라 이 시점에서 cursor.board에 board를 할당한다.
  init(board) {
    this.board = board;
    const { elem } = board;
    elem.style.cursor = "none";
    this.elem.classList.add("cursor");
    elem.appendChild(this.elem);
    this.hide();
  },

  show() {
    this.elem.style.display = "block";
  },

  setPos(event) {
    let [ x, y ] = this.board.getOffset(event);
    const { width, height } = this.board;
    if (x + this.size >= width) x = width - this.size;
    if (y + this.size >= height) y = height - this.size;
    if (this.elem.classList.contains("cursor-arrow-tb")) {
      this.elem.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      this.elem.style.transform = `translate(${x}px, ${y}px) rotate(-90deg)`;
    }
  },

  hide() {
    this.elem.style.display = "none";
  },

  showBasic() {
    this.elem.classList.remove("cursor-arrow-lr");
    this.elem.classList.remove("cursor-arrow-tb");
  },

  showArrow(isLeftRight = true) {
    if (isLeftRight) {
      this.elem.classList.add("cursor-arrow-lr");
      this.elem.classList.remove("cursor-arrow-tb");
    } else {
      this.elem.classList.remove("cursor-arrow-lr");
      this.elem.classList.add("cursor-arrow-tb");
    }
  }
};