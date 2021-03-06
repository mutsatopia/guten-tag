const grid = {
  elem: document.createElement("div"),
  size: 24,
  color: "rgba(0, 0, 0, 0.15)",
  
  // grid 초기화
  // grid가 정의된 시점에서 아직 board가 정의되지 않아 참조할 수 없음
  // 그래서 board.init()할 때 grid.init()도 같이 해 주고,
  // board를 전역 변수로 참조하는게 아니라 이 시점에서 grid.board에 board를 할당한다.

  // 격자를 표현하는 선들을 담을 DOM 요소 생성한다.
  init(board) {
    this.board = board;
    this.elem.classList.add("board-grid");
    setElemPos(this.elem, 0, 0);
  },

  // 격자 선 그리기
  getLine(index, isColumn = false) {
    const line = document.createElement("div");
    line.style.borderColor = this.color;
    
    if (isColumn) {
      line.classList.add("line-column");
      setElemSize(line, 1, this.board.height);
      setElemPos(line, index * this.size + this.marginX, 0);
    } else {
      line.classList.add("line-row");
      setElemSize(line, this.board.width, 1);
      setElemPos(line, 0, index * this.size + this.marginY);
    }
    return line;
  },

  // 격자 전체 그리기
  // 1. 보드의 크기가 size로 딱 나눠 떨어지지 않으므로 양 옆에 줄 간격(margin) 설정
  // 2. size와 margin을 기준으로 일정 간격으로 가로 세로 선 생성
  // 3. 격자를 담고 있는 DOM 요소를 보드 DOM 요소에 추가하여 화면에 표시
  paint() {
    while (this.elem.hasChildNodes()) {
      this.elem.removeChild(this.elem.firstChild);
    }
    const { width, height } = this.board;
    this.marginX = (width % this.size) / 2;
    this.marginY = (height % this.size) / 2;
    this.colCount = parseInt(width / this.size) + 1;
    this.rowCount = parseInt(height / this.size) + 1;

    this.cols = [...Array(this.colCount)]
      .map((_, i) => this.getLine(i, true))
      .forEach(line => this.elem.appendChild(line));
    this.rows = [...Array(this.rowCount)]
      .map((_, i) => this.getLine(i))
      .forEach(line => this.elem.appendChild(line));

    setElemSize(this.elem, width, height);
    this.board.elem.appendChild(this.elem);
  },

  // 화면 크기가 변할 때 격자 위치를 재조정 하기 위한 메서드 (아직 사용 안함)
  setPos(x = 0, y = 0) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.elem.style.left = `${this.x}px`;
    this.elem.style.top = `${this.y}px`;
  },

  setSize(size) {
    const { body, width, height } = this.board;
    this.size = size;
    this.paint();
    this.board.forEach((tag) => {
      tag.setSize(trim(tag.width, size) + 1, trim(tag.height, size) + 1);
      tag.setPos(tag.x, tag.y);
    });
    body.setPos((width - body.width) / 2, null);
    this.board.forEach((tag) => {
      tag.setState("located");
    });
  }
};

const checked = document.querySelector('#grid-check');
const sizeInput = document.querySelector('#grid-size');
sizeInput.value = grid.size;

checked.addEventListener("click", () => {
  const boardLine = document.querySelector(".board-grid");
  boardLine.style.display = checked.checked ?  "" : "none";
});

sizeInput.addEventListener("focusout", () => {
  let size = +sizeInput.value;
  if (Number.isNaN(size)) {
    size = 32;
    sizeInput.value = 32;
  } else if (size <= 9) {
    size = 10;
    sizeInput.value = 10;
  } else if (size > 100) {
    size = 100;
    sizeInput.value = 100;
  }
  grid.setSize(size);
});