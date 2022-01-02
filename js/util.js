// DOM 요소의 width와 height 스타일 지정
const setElemSize = (elem, width, height) => {
  if (typeof width === "string") {
    elem.style.width = width;
  } else {
    elem.style.width = `${width}px`;
  }
  
  if (typeof height === "string") {
    elem.style.height = height;
  } else {
    elem.style.height = `${height}px`;
  }
};

// DOM 요소의 left와 top 스타일 지정
const setElemPos = (elem, x, y) => {
  if (typeof x === "string") {
    elem.style.left = x;
  } else {
    elem.style.left = `${x}px`;
  }

  if (typeof y === "string") {
    elem.style.top= y;
  } else {
    elem.style.top = `${y}px`;
  }
};

// 격자 칸의 크기 단위로 이동할 때 좌표 값을 격자 선에 맞추기 위해 사용
const trim = (value, unit) => value - (value % unit);