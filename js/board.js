const board = {
  elem: document.querySelector(".board"),
  body: new Tag({ tagName: "body", keyword: [], attr: [] }, { state: "located" }),
  ready: null, // 태그 선택 창에서 선택한 요소
  selected: null,
  grid,

  // board 초기화
  // 1. body 생성 및 초기화
  // 2. grid 초기화
  // 3. body 화면에 표시
  init(width, height) {
    this.elem.appendChild(this.body.elem);
    this.grid.init(this);
    const { size } = this.grid;
    [ width, height ] = [ trim(width, size), trim(height, size) ];
    const [ boardWidth, boardHeight ] = this.getSize();
    this.body.setSize(width, height);
    this.body.setPos((boardWidth - width) / 2, (boardHeight - height) / 2, this.grid);
    this.body.show();
  },

  // 너비 우선 탐색으로 body에서부터 children을 통해 Tag 객체를 찾아서 반환
  getTag(condition, start = this.body) {
    const visited = new Map();
    const queue = [start];
    let tag;

    while (queue.length) {
      tag = queue.shift();
      if (condition(tag)) return tag;
      if (!visited.has(tag)) {
        visited.set(tag, null);
        queue.push(...tag.children);
      }
    }
    return null;
  },

  // event.target으로 그 DOM 요소에 해당하는 Tag 객체 반환
  searchByElem(event, start = this.body) {
    const { target } = event;
    const condition = (tag) => tag.elem === target;
    return this.getTag(condition, start);
  },

  // 현재 마우스가 어떤 태그 DOM 요소 위에 있는지 찾아서 해당하는 Tag 객체 반환
  searchByLocation(event, start = this.body) {
    const condition = (tag) => this.isInside(tag, this.getOffset(event));
    return this.getTag(condition, start);
  },

  // 현재 시점에서의 보드 DOM 요소의 width, height를 반환
  getSize() {
    const { width, height } = this.elem.getBoundingClientRect();
    return [ width, height ];
  },

  // 보드의 좌상단을 x = 0, y = 0으로 하고 스크롤까지 고려한 현재 마우스 좌표 반환
  getOffset(event) {
    const { clientX, clientY } = event;
    const { x, y } = board.elem.getBoundingClientRect();
    const { scrollLeft, scrollTop } = board.elem;
    return [ clientX - x + scrollLeft, clientY - y + scrollTop ];
  },

  isInside(tag, offset) {
    const { width, height, x, y } = tag;
    const [ cx, cy ] = offset;
    return x <= cx && cx <= x + width && y <= cy && cy <= y + height;
  },

  // tagData의 태그 data를 인자로 받아서 Tag 객체를 생성하고,
  // board의 ready에 할당함
  add(data) {
    const tag = new Tag(data, {});
    const { size } = grid;
    if (this.ready) this.delete(this.ready);
    tag.setSize(size * 6 + 1, size * 3 + 1);
    tag.setPos(0, 0, grid);
    tag.setState("ready");
    board.elem.appendChild(tag.elem);
    board.ready = tag;
  },

  // Tag 객체에 해당되는 DOM 요소 삭제
  // Tag 객체의 부모가 children 배열에서 참조하고 있는 값을 삭제하여 메모리에서 제거
  delete(tag) {
    const { elem, parent } = tag;
    const { children } = parent ?? {};
    board.elem.removeChild(elem);
    if (children) children.splice(children.indexOf(tag), 1);
  }
};

// 마우스 클릭 이벤트 핸들러
// board의 ready값이 존재 -> 태그 선택 바에서 태그를 선택한 상태
// 그렇지 않은 경우 -> 보드에 표시된 태그를 선택한 상태
const clickHandler = (event) => {
  const { target, currentTarget } = event;
  if (target === currentTarget) return;

  const { ready } = board;
  if (ready) {
    const [ x, y ] = board.getOffset(event);
    ready.setPos(x, y, grid);
    ready.setState("located");
  } else {
    board.selected = board.searchByElem(event);
    board.selected.setState("selected");
  }
};

// 마우스가 보드 밖에서 보드 안으로 들어갈 때 이벤트 핸들러
const mouseoverHandler = (event) => {
  const { ready } = board;
  if (!ready) return;
  const [ x, y ] = board.getOffset(event);
  ready.setPos(x, y, grid);
  ready.show();
};

// 마우스가 보드 안에서 움직일 때 이벤트 핸들러
const mousemoveHandler = (event) => {
  const { ready, body } = board;
  const { size } = grid;
  if (!ready) return;
  const parent = board.searchByLocation(event);
  if (parent === body && ready.keyword.includes("block")) {
    const [ _, y ] = board.getOffset(event);
    ready.setSize(body.width - size * 2 + 1, size * 3 + 1);
    ready.setPos(body.x + size, y, grid);
  } else {
    const [ x, y ] = board.getOffset(event);
    ready.setSize(size * 6 + 1, size * 3 + 1);
    ready.setPos(x, y, grid);
  }
};

// 마우스가 보드 안에서 바깥으로 나갈 때 이벤트 핸들러
const mouseoutHandler = () => {
  const { ready } = board;
  if (!ready) return;
  ready.hide();
  ready.setState("none");
};

board.elem.addEventListener("click", clickHandler);
board.elem.addEventListener("mouseover", mouseoverHandler);
board.elem.addEventListener("mousemove", mousemoveHandler);
board.elem.addEventListener("mouseout", mouseoutHandler);

board.init(1296, 800);