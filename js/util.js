const trim = (value, unit) => value - (value % unit);

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

const setElemStyle = (elem, width, height, x, y) => {
  setElemSize(elem, width, height);
  setElemPos(elem, x, y);
};