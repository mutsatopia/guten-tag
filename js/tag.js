class Tag {
  constructor(tagData, { state, parent, children }) {
    for (const key in tagData) {
      this[key] = tagData[key];
    }
    this.state = state ?? "none";
    this.parent = parent ?? null;
    this.children = children ?? [];
    this.initElem();
  }

  initElem() {
    this.elem = document.createElement("div");
    this.elem.style.position = "absolute";
    // this.elem.classList.add("");
  }

  setElemPos(x, y) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.elem.style.left = `${this.x}px`;
    this.elem.style.top = `${this.y}px`;
  }

  setElemSize(width, height) {
    this.width = width ?? this.width;
    this.height = height ?? this.height;
  }

  setState(state) {
    if (this.state === state) return;
    this.state = state;
    switch (state) {
      case "ready":
        this.elem.style.position = "fixed";
        break;
      case "none":
        const children = this.parent.children;
        children.splice(children.indexOf(this.elem), 1);
        break;
      case "display":
        this.elem.style.position = "absolute";
        break;
      case "selected":
        // 태그 선택 바를 어트리뷰트 편집 바로 변경
    }
  }
}