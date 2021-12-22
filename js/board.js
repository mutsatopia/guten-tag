const board = {
  elem: document.querySelector(".board"),
  body: new Tag(
    { tagName: "body", attr: [], clsArr: [] },
    { state: "none", parent: "null", children: [] }
  ),
  ready: null,
  selected: null,
  gridSize: 32,

  setPosByGrid(elem, x, y) {
    const gridX = x - gridX % this.gridSize;
    const gridY = y - gridY % this.gridSize;
    elem.setElemPos(x, y);
  },

  searchElem(target, start = this.body) {
    const visited = new Map();
    const queue = [start];
    let tag;

    while (stack.length) {
      tag = queue.shift();
      if (tag.elem === target) break;
      if (!visited.has(node)) {
        visited.set(elem, null);
        queue.push(...elem.children);
      }
    }
    return tag;
  },

  clickHandler(event) {
    if (this.ready) {
      const { offsetX, offsetY } = event;
      this.setPosByGrid(this.ready, offsetX, offsetY);
      this.ready.setState("display");
    } else {
      const { target } = event;
      this.selected = this.searchElem(target);
      this.selected.setState("selected");
    }
  },

  mouseoverHandler({ offsetX, offsetY }) {
    if (!this.ready) this.ready.setState("ready");
    this.setPosByGrid(this.ready, offsetX, offsetY);
  },

  mousemoveHandler() {
    if (!this.ready) return;
    this.setPosByGrid(this.ready, offsetX, offsetY);
  },

  mouseoutHandler() {
    if (!this.ready) return;
    this.ready.setState("none");
  }
};

board.elem.addEventListener("click", board.clickHandler);
board.elem.addEventListener("mouseover", board.mouseoverHandler);
board.elem.addEventListener("mousemove", board.mousemoveHandler);
board.elem.addEventListener("mouseout", board.mouseoutHandler);