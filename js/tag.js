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

  initElem() {
    this.elem = document.createElement("div");
    this.setFontSize();
    this.elem.textContent = this.tagName;
    this.elem.classList.add("tag");
    this.hide();
  }

  setStyle(width, height, x, y, grid) {
    this.setSize(width, height);
    if (x) this.setPos(x, y, grid);
  }

  setFontSize() {
    const fontSize = (this.height ?? 100) / 4;
    this.elem.style.fontSize = `${fontSize > 40 ? 40 : fontSize}px`;
  }

  setPos(x, y, grid) {
    if (grid) {
      const { size, margin } = grid;
      this.x = (margin + x - x % size) ?? this.x;
      this.y = (margin + y - y % size) ?? this.x;
    } else {
      this.x = x ?? this.x;
      this.y = y ?? this.y;
    }
    this.elem.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  setSize(width, height) {
    this.width = width ?? this.width;
    this.height = height ?? this.height;
    this.elem.style.width = `${this.width}px`;
    this.elem.style.height = `${this.height}px`;
    this.setFontSize();
  }

  setState(state) {
    if (this.state === state) return;
    this.state = state;
    switch (state) {
      case "ready":
        this.elem.style.opacity = "0.4";
        break;
      case "located":
      case "selected":
        // 태그 선택 바를 어트리뷰트 편집 바로 변경
    }
  }

  show() {
    this.elem.style.display = 'flex';
  }

  hide() {
    this.elem.style.display = 'none';
  }
}