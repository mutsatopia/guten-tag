const btnExportModal = document.querySelector(".btn-headmenu.file");
const dimed = document.querySelector(".modal-dimed");
const btnClose = document.querySelector(".btn-close");
const codePreview = document.querySelector(".preview-code");
const btnCopy = document.querySelector(".btn-copy");
const inputTitle = document.querySelector(".input-title");

const toggleModalOn = () => {
  document.querySelector(".modal").classList.toggle("on");
  btnCopy.innerHTML = "클립보드에 복사";
  codePreview.value = getHTML();
};

btnExportModal.addEventListener("click", toggleModalOn);
dimed.addEventListener("click", toggleModalOn);
btnClose.addEventListener("click", toggleModalOn);

const onCopied = () => {
  codePreview.select();
  document.execCommand("copy");
  codePreview.setSelectionRange(0, 0);
  btnCopy.innerHTML = "<i class='bi bi-check-lg'></i> Copied :)";
};

btnCopy.addEventListener("click", onCopied);

const getHTML = (start = board.body) => {
  const stack = [ start ];
  const output = [];
  let indentCount = 1;

  while (stack.length) {
    tag = stack.pop();
    if (tag instanceof Tag) {
      const attributes = tag.attr.reduce((acc, { title, attr }) => acc + ` ${title}="${attr}"`, "");
      output.push(`${"  ".repeat(indentCount)}<${tag.tagName}${attributes}>`);
      const children = tag.children.concat(`</${tag.tagName}>`).reverse();
      stack.push(...children);
      indentCount++;
    } else {
      indentCount--;
      output.push("  ".repeat(indentCount) + tag);
    }
  }
  for (let i = output.length - 1; i >= 1; i--) {
    if (output[i].trim().slice(1) === "/" + output[i - 1].trim().slice(1)) {
      output[i - 1] += output[i].trim();
      output.splice(i, 1);
    }
  }
  const top = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${inputTitle.value}</title>
  </head>`;
  const bottom = "</html>";
  return [ top, ...output, bottom ].join('\n');
};