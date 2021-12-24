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
  }

  // DOM 요소의 위치 설정 (transform 스타일 설정)
  setPos(x, y, grid) {
    if (grid) {
      const { size, marginX, marginY, colCount, rowCount } = grid;
      this.x = (trim(x, size) + marginX) ?? this.x;
      this.y = (trim(y, size) + marginY) ?? this.x;
      if (this.x + this.width > colCount * size + marginX) {
        this.x = (colCount - parseInt(this.width / size) - 1) * size + marginX;
      }
      if (this.y + this.height > rowCount * size + marginY) {
        this.y = (rowCount - parseInt(this.height / size) - 1) * size + marginY;
      }
    } else {
      this.x = x ?? this.x;
      this.y = y ?? this.y;
    }

    this.elem.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  // Tag 객체의 state 프로퍼티 설정 및 state에 따른 스타일 변경
  // none: 초기값. 또는 ready 상태에서 보드 바깥으로 마우스를 이동했을 때
  // ready: 태그 선택 창에서 눌러서 잔상이 보이는 상태
  // located: 잔상인 상태에서 클릭해서 보드에 표시된 상태
  // selected: 보드에 표시된 태그를 클릭해서 해당 태그에 대한 어트리뷰트 편집 창이 보이는 상태
  setState(state) {
    if (this.state === state) return;
    this.state = state;
    switch (state) {
      case "ready":
        this.elem.style.opacity = "0.4";
        break;
      case "located":
      case "selected":
    }
  }

  show() {
    this.elem.style.display = 'flex';
  }

  hide() {
    this.elem.style.display = 'none';
  }
}