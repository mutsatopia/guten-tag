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

    while (queue.length) {
      tag = queue.shift();
      if (tag.elem === target) break;
      if (!visited.has(tag)) {
        visited.set(tag, null);
        queue.push(...tag.children);
      }
    }
    return tag;
  }
};

const clickHandler = (event) => {
  const { ready } = board;
  if (ready) {
    const { offsetX, offsetY } = event;
    board.setPosByGrid(ready, offsetX, offsetY);
    ready.setState("display");
  } else {
    const { target } = event;
    board.selected = board.searchElem(target);
    board.selected.setState("selected");
  }
};

const mouseoverHandler = ({ offsetX, offsetY }) => {
  const { ready } = board;
  if (!ready) return;
  body.setPosByGrid(ready, offsetX, offsetY);
};

const mousemoveHandler = () => {
  const { ready } = board;
  if (!ready) return;
  board.setPosByGrid(ready, offsetX, offsetY);
};

const mouseoutHandler = () => {
  const { ready } = board;
  if (!ready) return;
  ready.setState("none");
};

board.elem.addEventListener("click", clickHandler);
board.elem.addEventListener("mouseover", mouseoverHandler);
board.elem.addEventListener("mousemove", mousemoveHandler);
board.elem.addEventListener("mouseout", mouseoutHandler);