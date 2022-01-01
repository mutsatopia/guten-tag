const board = {
  elem: document.querySelector(".board"),
  body: new Tag({ tagName: "body", keyword: [], attr: [] }, { state: "located" }),
  ready: null, // 태그 선택 창에서 선택한 요소
  selected: null,
  prevInfo: new Map(),
  isWhiteBorder: false,

  // board 초기화
  // 1. body 생성 및 초기화
  // 2. grid 초기화
  // 3. body 화면에 표시
  init(width, height) {
    cursor.init(this);
    this.elem.appendChild(this.body.elem);
    grid.init(this);
    const { size } = grid;
    [ width, height ] = [ trim(width, size), trim(height, size) ];
    this.body.setSize(width + 1, height + 1);
    this.body.show();
    grid.paintGrid();
    this.body.setPos((this.width - width) / 2, (this.height - height) / 2);
  },

  // 현재 시점에서의 보드 DOM 요소의 width, height를 반환
  get width() {
    return this.elem.scrollWidth;
  },
  get height() {
    return this.elem.scrollHeight;
  },

  // 너비 우선 탐색으로 body에서부터 children을 통해 조건에 맞는 Tag 객체를 찾아서 반환
  getTag(condition, start = this.body) {
    const visited = new Map();
    const queue = [ start ];
    const params = { finalReturnValue: null };

    while (queue.length) {
      params.tag = queue.shift();
      condition(params);
      if (params.isReturn) {
        return params.returnValue;
      } else {
        params.setParams();
      }
      if (!visited.has(params.tag)) {
        visited.set(params.tag, null);
        queue.push(...params.tag.children);
      }
    }
    return params.finalReturnValue;
  },

  // event.target으로 그 DOM 요소에 해당하는 Tag 객체 반환
  searchByElem(event) {
    const { target } = event;
    const condition = (params) => {
      if (params.tag.elem === target) {
        params.returnValue = params.tag;
        params.isReturn = true;
      } else {
        params.isReturn = false;
      }
    };
    return this.getTag(condition);
  },

  // 현재 마우스가 어떤 태그 DOM 요소 위에 있는지 찾아서 해당하는 Tag 객체 반환
  searchByLocation(event) {
    const condition = (params) => {
      if (this.isInside(params.tag, this.getOffset(event))) {
        params.setParams = () => params.finalReturnValue = params.tag;
      } else {
        params.setParams = () => {};
      }
    };
    return this.getTag(condition);
  },

  // 현재 마우스가 위치한 좌표를 포함하는 모든 DOM 요소 배열 반환
  searchAllTagsByLocation(event) {
    const condition = (params) => {
      if (this.isInside(params.tag, this.getOffset(event))) {
        params.setParams = () => {
          if (params.finalReturnValue) params.finalReturnValue.push(params.tag);
          else params.finalReturnValue = [ params.tag ];
        };
      } else {
        params.setParams = () => {};
      }
    };
    return this.getTag(condition);
  },

  // 모든 DOM 요소 순회하며 callback 실행
  forEach(callback, start = this.body) {
    const condition = (params) => {
      params.setParams = () => {};
      callback(params.tag);
    }
    this.getTag(condition, start);
  },

  // 보드의 좌상단을 x = 0, y = 0으로 하고 스크롤까지 고려한 현재 마우스 좌표 반환
  getOffset(event) {
    const { clientX, clientY } = event;
    const { x, y } = board.elem.getBoundingClientRect();
    const { scrollLeft, scrollTop } = board.elem;
    return [ clientX - x + scrollLeft, clientY - y + scrollTop ];
  },

  // 주어진 좌표(offset)가 해당 DOM 요소(tag) 안에 포함되는지 여부
  isInside(tag, offset) {
    const { width, height, x, y } = tag;
    const [ cx, cy ] = offset;
    return x <= cx && cx <= x + width && y <= cy && cy <= y + height;
  },

  // 두 DOM 요소의 충돌 여부
  isCollision(tag1, tag2) {
    return [
      [tag1.x, tag1.y],
      [tag1.x + tag1.width, tag1.y],
      [tag1.x, tag1.y + tag1.height],
      [tag1.x + tag1.width, tag1.y + tag1.height]
    ].some(([x, y]) => (tag2.x <= x && x <= tag2.x + tag2.width)
      && (tag2.y <= y && y <= tag2.y + tag2.height));
  },

  // tagData의 태그 data를 인자로 받아서 Tag 객체를 생성하고,
  // board의 ready에 할당함
  add(data, state = "ready") {
    const tag = new Tag(data, {});
    const { size } = grid;
    if (this[state]) this.delete(this[state]);
    tag.setSize(size * 6 + 1, size * 3 + 1);
    tag.setPos(0, 0);
    tag.setState(state);
    this.elem.appendChild(tag.elem);
    this[state] = tag;
  },

  // Tag 객체에 해당되는 DOM 요소 삭제
  // Tag 객체의 부모가 children 배열에서 참조하고 있는 값을 삭제하여 메모리에서 제거
  delete(tag) {
    if (tag.tagName === "body") return;
    this.forEach((curTag) => {
      this.elem.removeChild(curTag.elem);
    }, tag);
    this.deleteFromTree(tag);
  },

  deleteFromTree(tag) {
    const { parent } = tag;
    if (parent) parent.remove(tag);
  },

  // ready 상태의 Tag 객체를 located 상태로 변경
  locate(event, tag = this.ready, type = "ready") {
    tag.setState("located");
    if (type === "ready") {
      const parent = this.searchByLocation(event);
      parent.push(tag);
      this.clearReady(false, false);
    }
    // 태그의 depth 순서 갱신 (selected 태그가 더 앞으로 나오도록 함)
    if (type === "selected") {
      if (tag === this.selected) {
        const parent = this.searchByLocation(event);
        parent.push(tag);
      }
      this.elem.removeChild(tag.elem);
      this.elem.appendChild(tag.elem);
    }
    this.forEach(tag => {
      if (tag.state === "modified") {
        tag.setState("located");
        tag.rearrangeChildren();
      }
    });
  },

  clearSelected() {
    this.selected?.setState("located");
    this.selected?.elem?.classList?.remove('selected-tag');
    this.selected = null;
  },

  select(event) {
    const nextSelected = this.searchByLocation(event);
    
    if (nextSelected === this.selected || !nextSelected) {
      this.clearSelected();
      this.showTagBar();

      attrBtn.style.display = "none";
      tagBtn.classList.remove('btn-checked')

    } else if (this.selected) {
      this.selected.setState("located");
      this.selected.elem.classList.remove('selected-tag');
      this.selected = nextSelected;
      this.selected?.setState("selected");
      this.showAttrBar();
      changeBtnColor();
    } else {
      this.selected = nextSelected;
      this.selected?.setState("selected");
      this.showAttrBar();
      changeBtnColor();
    }
  },

  // ready 태그를 해제
  // 1. ready 태그 삭제
  // 2. 태그 선택 바에서 선택된 태그 해제
  clearReady(del = true, restore = true) {
    if (!this.ready) return;
    if (del) this.delete(this.ready);
    const tags = document.querySelectorAll(".wrap-tag > li");
    [...tags]
      .find(tag => tag.textContent === this.ready.tagName)
      .classList.remove("click-tag");
    if (restore) this.restore();
    this.ready = null;
  },

  // modified 상태인 모든 태그를 located 상태로 복원
  // 매개변수가 있으면 현재 마우스가 위치한 태그들은 located 상태로 복원하지 않음
  restore(event, type = "ready") {
    if (event) {
      board.forEach(tag => {
        if (tag.state === "modified") {
          // 마우스 좌표가 해당 태그 위에 없을 때
          if (!this.isCollision(this[type], tag)) {
            // ready 태그에 의해 밀리고 있는 요소의 자식 요소들도 같은 길이만큼 밀림
            if (tag?.parent?.diff && this.getOffset(event)[1] < tag.parent.y) return;
            // 형제 요소에 의해 밀리고 있는 경우 제외
            if (tag?.pushingSibling?.state === "modified") return;
            tag.setState("located");
            tag.restoreSize();
            tag.restorePos();
            tag.rearrangeChildren();
          } else {
            const tagArr = this.searchAllTagsByLocation(event);
            if (tagArr) {
              if (!tagArr.includes(tag)) {
                tag.restoreSize();
                tag.rearrangeChildren();
              }
            }
          }
        }
      });
    } else {
      board.forEach(tag => {
        if (tag.state === "modified") {
          tag.setState("located");
          tag.restoreSize();
          tag.restorePos();
          tag.rearrangeChildren();
        }
      });
    }
  },

  // 어떤 한 DOM 요소의 크기 변경으로 인해 다른 요소의 크기가 변동되는 경우를 모두 여기서 처리
  resize(child) {
    const { size } = grid;
    let { parent } = child;
    let children;
    while (parent) {
      children = parent.children;
      const bottomY = Math.max(...children.map(tag => tag.y + tag.height));
      if (bottomY + size !== parent.y + parent.height) {
        parent.setState("modified");
        parent.setSize(null, bottomY + size - parent.y);
      }
      child = parent;
      parent = parent.parent;
      children = parent?.children;
    }
  },

  // 어떤 한 DOM 요소의 크기 및 위치 변경으로 인해 다른 요소의 위치가 변동되는 경우를 모두 여기서 처리
  relocate(child) {
    const { parent } = child;
    if (!parent) return;
    const siblings = parent.children;
    siblings.forEach(sibling => {
      if (sibling !== child && this.isCollision(child, sibling) && child.tempY <= sibling.tempY) {
        sibling.setState("modified", child);
        sibling.setPos(null,
          sibling.tempY
          + child.y - child.tempY
          + child.height - child.tempHeight
          - (parent?.diff ?? 0)
        );
      }
    });
  },

  savePrevInfo() {
    this.forEach((tag) => {
      const { parent, x, y, width, height } = tag;
      this.prevInfo.set(tag, { parent, x, y, width, height });
    }, this.selected);
  },

  dragStart(event) {
    if (this.selected.tagName === "body") return;
    if (this.searchByLocation(event) !== this.selected) return;
    this.isMouseDown = true;
    this.savePrevInfo();
    this.deleteFromTree(this.selected);
    this.selected.setState("draggable");
  },

  drag(event) {
    const parent = this.searchByLocation(event);
    const [ x, y ] = this.getOffset(event);
    this.selected.setPos(x, y);
    this.forEach((tag) => {
      const prevX = this.prevInfo.get(this.selected).x;
      const prevY = this.prevInfo.get(this.selected).y;
      const curX = this.selected.x;
      const curY = this.selected.y;
      const { x, y } = this.prevInfo.get(tag);
      tag.setPos(x - prevX + curX, y - prevY + curY);
    }, this.selected);
    if (parent) {
      this.selected.modifyParentSize(parent);
      this.selected.modifyChildrenPos(parent);
    }
    this.restore(event, "selected");
  },

  dragEnd(event) {
    this.isMouseDown = false;
    const { clientX, clientY } = event;
    const parent = this.searchByLocation(event);
    if (parent) {
      this.forEach((tag) => {
        const prevX = this.prevInfo.get(this.selected).x;
        const prevY = this.prevInfo.get(this.selected).y;
        const { x, y } = this.prevInfo.get(tag);
        this.locate({ clientX: x - prevX + clientX, clientY: y - prevY + clientY }, tag, "selected");
      }, this.selected);
    } else {
      const { parent } = this.prevInfo.get(this.selected);
      this.forEach((tag) => {
        const { x, y, width, height } = this.prevInfo.get(tag);
        tag.setSize(width, height);
        tag.setPos(x, y);
      }, this.selected);
      parent.push(this.selected);
      this.restore();
    }
    this.forEach((tag) => tag.setState("located"));
    this.selected.setState("selected");
  },

  showAttrBar() {
    attrList.classList.add("side-list-on");
    tagList.classList.remove("side-list-on");
    const tagTitle = document.querySelector(".text-select-tag-name");
    tagTitle.textContent = this.selected.tagName;
    attrRender(this.selected.attr);
  },

  showTagBar() {
    tagList.classList.add("side-list-on");
    attrList.classList.remove("side-list-on");
  },

  paint() {
    this.forEach((tag) => {
      tag.paint();
    });
  }
};

// 마우스 클릭 이벤트 핸들러
// board의 ready값이 존재 -> 태그 선택 바에서 태그를 선택한 상태
// 그렇지 않은 경우 -> 보드에 표시된 태그를 선택한 상태
const clickHandler = (event) => {
  const parent = board.searchByLocation(event);
  const { ready } = board;
  if (ready) {
    if (!parent) return;
    board.locate(event);
  } else {
    board.select(event);
  }
};

// 마우스가 보드 밖에서 보드 안으로 들어갈 때 이벤트 핸들러
const mouseoverHandler = (event) => {
  cursor.show();
  cursor.setPos(event);
  const { ready } = board;
  if (!ready) return;
  ready.show();
};

// 마우스가 보드 안에서 움직일 때 이벤트 핸들러
const mousemoveHandler = (event) => {
  cursor.setPos(event);
  const { ready, selected, isMouseDown } = board;
  const parent = board.searchByLocation(event);
  const [ x, y ] = board.getOffset(event);
  if (ready) {
    ready.setReadyStyle(parent, x, y);
    board.restore(event);
  } else if (selected && isMouseDown) {
    board.drag(event);
  }
};

// 마우스가 보드 안에서 바깥으로 나갈 때 이벤트 핸들러
const mouseoutHandler = () => {
  cursor.hide();
  const { ready } = board; 
  if (ready) {
    ready.hide();
    ready.setState("none");
  }
};

// 마우스 우클릭 이벤트 핸들러
const mousedownHandler = (event) => {
  const { which, button } = event;
  const { ready, selected } = board;
  if (which === 3 || button === 2) {
    const curTag = board.searchByLocation(event);
    if (ready) {
      board.clearReady();
    } else if (selected && curTag === selected) {
      board.clearSelected();
      board.delete(selected);
    }
  } else {
    if (selected) {
      board.dragStart(event);
    }
  }
};

const mouseupHandler = (event) => {
  const { selected, isMouseDown } = board; 
  if (selected && isMouseDown) {
    board.dragEnd(event);
  }
};

board.elem.addEventListener("click", clickHandler);
board.elem.addEventListener("mouseover", mouseoverHandler);
board.elem.addEventListener("mousemove", mousemoveHandler);
board.elem.addEventListener("mouseout", mouseoutHandler);
board.elem.addEventListener("mousedown", mousedownHandler);
board.elem.addEventListener("mouseup", mouseupHandler);
board.elem.addEventListener("contextmenu", (event) => event.preventDefault());

// 키보드 이벤트 핸들러
const keydownHandler = ({ key }) => {
  switch (key) {
    case "Escape":
      board.clearReady();
      break;
    case "Delete":
      const { selected } = board;
      if (!selected) return;
      board.clearSelected();
      board.delete(selected);
  }
};

const changeBtnColor = () => {
  attrBtn.style.display = "block";
  attrBtn.classList.remove("btn-checked");
  tagBtn.classList.add("btn-checked");
};

const tagBtn = document.querySelector(".btn-tag-list");
const attrBtn = document.querySelector(".btn-attribute");

tagBtn.addEventListener("click", ()=>{
  if(tagBtn.classList.contains("btn-checked")){
  attrBtn.classList.add("btn-checked");
  tagBtn.classList.remove("btn-checked");
  };
});

attrBtn.addEventListener("click", ()=> {
    if(attrBtn.classList.contains("btn-checked")){
    tagBtn.classList.add("btn-checked");
    attrBtn.classList.remove("btn-checked");
  };
});


document.addEventListener("keydown", keydownHandler);

board.init(1420, 800);

