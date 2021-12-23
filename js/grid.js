const grid = {
  size: 32,
  color: "rgba(0, 0, 0, 0.15)",
  
  init(board) {
    this.board = board;
    const { x, y, right, bottom } = board.elem.getBoundingClientRect();
    const [ width, height ] = [ right - x, bottom - y ];
    this.margin = (width % this.size) / 2;

    this.elem = document.createElement('div');
    this.elem.classList.add('board-grid');
    setElemStyle(this.elem, width, height, 0, 0);
    
    this.cols = [...Array(parseInt(width / this.size) + 1)]
      .map((_, i) => this.getLine(i, true))
      .forEach(line => this.elem.appendChild(line));
    this.rows = [...Array(parseInt(height / this.size) + 1)]
      .map((_, i) => this.getLine(i))
      .forEach(line => this.elem.appendChild(line));
    this.board.elem.appendChild(this.elem);
  },

  getLine(index, isColumn = false) {
    const line = document.createElement('div');
    line.style.borderColor = this.color;
    
    if (isColumn) {
      line.classList.add('line-column');
      setElemStyle(line, 1, "100%", index * this.size + this.margin, 0);
    } else {
      line.classList.add('line-row');
      setElemStyle(line, "100%", 1, 0, index * this.size + this.margin);
    }
    return line;
  },

  setPos(x = 0, y = 0) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.elem.style.left = `${this.x}px`;
    this.elem.style.top = `${this.y}px`;
  }
};