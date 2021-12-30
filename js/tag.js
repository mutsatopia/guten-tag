class Tag {
  constructor(tagData, { state, parent, children } = {}) {
    for (const key in tagData) {
      this[key] = tagData[key];
    }
    this.state = state ?? "none";
    this.parent = parent ?? null;
    this.children = children ?? [];
    this.initElem();
  }

  // DOM 요소를 생성하고 elem 프로퍼티에 할당
  initElem() {
    this.elem = document.createElement("div");
    this.setFontSize();
    this.elem.textContent = this.tagName;
    this.elem.classList.add("tag");
    this.hide();
  }

  // DOM 요소의 글자 크기를 크기에 비례해서 지정
  setFontSize() {
    const fontSize = (this.height ?? 100) / 4;
    this.elem.style.fontSize = `${fontSize > 40 ? 40 : fontSize}px`;
  }

  // DOM 요소의 width, height 스타일 및 글자 크기 설정
  setSize(width, height) {
    this.width = width ?? this.width;
    this.height = height ?? this.height;
    setElemSize(this.elem, this.width, this.height);
    this.setFontSize();
    if (this.state === "modified") {
      board.resize(this);
      board.relocate(this);
    }
  }

  // DOM 요소의 위치 설정 (transform 스타일 설정)
  setPos(x, y) {
    const { size, marginX, marginY, colCount, rowCount } = grid;
    this.x = typeof x === "number" ? (trim(x, size) + marginX) : this.x;
    this.y = typeof y === "number" ? (trim(y, size) + marginY) : this.y;
    if (this.x + this.width > colCount * size + marginX) {
      this.x = (colCount - parseInt(this.width / size) - 1) * size + marginX;
    }
    if (this.y + this.height > rowCount * size + marginY) {
      this.y = (rowCount - parseInt(this.height / size) - 1) * size + marginY;
    }
    this.elem.style.transform = `translate(${this.x}px, ${this.y}px)`;
   
    if (this.tagName === "body") return;
    const prevY = this.tempY ?? 0;
    this.diff = this.y - prevY;
    if (this.diff < 0) this.diff = 0;
    this.children.forEach(tag => {
      tag.setState("modified");
      tag.setPos(null, tag.tempY + this.diff);
    });
    if (this.state === "modified") board.relocate(this);
  }

  // Tag 객체의 state 프로퍼티 설정 및 state에 따른 스타일 변경
  // none: 초기값. 또는 ready 상태에서 보드 바깥으로 마우스를 이동했을 때
  // ready: 태그 선택 창에서 눌러서 잔상이 보이는 상태
  // located: 잔상인 상태에서 클릭해서 보드에 표시된 상태
  // modified: located 상태에서 주변 태그의 추가나 크기 변화로 인해 영향을 받는 상태
  // selected: 보드에 표시된 태그를 클릭해서 해당 태그에 대한 어트리뷰트 편집 창이 보이는 상태
  setState(state, ...args) {
    if (this.state === state) return;
    this.state = state;
    switch (state) {
      case "ready":
        this.elem.style.opacity = 0.4;
        break;
      case "located":
        this.elem.style.opacity = 1;
        break;
      case "modified":
        this.elem.style.opacity = 0.4;
        this.tempWidth = this.width ?? 0;
        this.tempHeight = this.height ?? 0;
        this.tempX = this.x ?? 0;
        this.tempY = this.y ?? 0;
        // 자신을 밀어낸 형제 요소 기억
        if (args) this.pushingSibling = args[0];
        break;
      case "selected":
    }
  }

  restoreSize() {
    this.setSize(this.tempWidth, this.tempHeight);
  }

  restorePos() {
    this.setPos(this.tempX, this.tempY);
    if (this.diff) this.diff = 0;
    if (this.pushingSibling) this.pushingSibling = null;
  }

  show() {
    this.elem.style.display = "flex";
  }

  hide() {
    this.elem.style.display = "none";
  }

  setReadyStyle(parent, x, y) {
    const { size } = grid;
    if (parent && this.keyword.includes("block")) {
      this.setSize(trim(parent.width, size) - size * 2 + 1, size * 3 + 1);
      this.setPos(parent.x + size, y);
    } else {
      this.setSize(size * 6 + 1, size * 3 + 1);
      this.setPos(x, y);
    }
    if (parent) {
      const { children } = parent;
      const bottomY = children
        ? Math.max(this.y + this.height, ...children.map(tag => tag.y + tag.height))
        : this.y + this.height;
      // 자식 크기에 따라 부모 크기 조절
      if (bottomY + size !== parent.y + parent.height) {
        parent.setState("modified");
        parent.setSize(null, bottomY + size - parent.y);
      }

      // 부모 위치 변경에 따라 자식 위치도 조절
      if (children.length) {
        children.forEach(tag => {
          if (this.y < tag.y && this.y + this.height > tag.y) {
            tag.setState("modified");
            tag.setPos(null, this.y + this.height - 1);
          }
        });
      }
    }
  }
}