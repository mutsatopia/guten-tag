const btnExportModal = document.querySelector(".btn-headmenu.file");
const dimed = document.querySelector(".modal-dimed");
const btnClose = document.querySelector(".btn-close");
const codePreview = document.querySelector(".preview-code");
const btnCopy = document.querySelector(".btn-copy");
const inputTitle = document.querySelector(".input-title");
const radioIndent = document.querySelectorAll("input[type='radio']");

const toggleModalOn = () => {
  document.querySelector(".modal").classList.toggle("on");
  btnCopy.innerHTML = "클립보드에 복사";
  codePreview.value = getHTML();
};

btnExportModal.addEventListener("click", toggleModalOn);
btnExportModal.addEventListener("click", ()=>{
  board.clearReady();
});
dimed.addEventListener("click", toggleModalOn);
btnClose.addEventListener("click", toggleModalOn);

for (i = 0; i < radioIndent.length; i++) {
  radioIndent[i].addEventListener("click", function() {
    codePreview.value = getHTML();
    btnCopy.innerHTML = "클립보드에 복사";
  });
}

const onCopied = () => {
  codePreview.select();
  document.execCommand("copy");
  codePreview.setSelectionRange(0, 0);
  btnCopy.innerHTML = "<i class='bi bi-check-lg'></i> Copied :)";
};

btnCopy.addEventListener("click", onCopied);

const getHTML = (start = board.body) => {
  const stack = [start];
  const output = [];
  let indentCount = 1;
  let indent = "  ";

  if (radioIndent[0].checked) {
    indent = "  ";
  } else if(radioIndent[1].checked) {
    indent = "    ";
  }

  while (stack.length) {
    tag = stack.pop();
    if (tag instanceof Tag) {
      const attributes = tag.attr.reduce((acc, {
        title,
        attr
      }) => acc + ` ${title}="${attr}"`, "");
      output.push(`${indent.repeat(indentCount)}<${tag.tagName}${attributes}>`);
      const children = tag.children.concat(`</${tag.tagName}>`).reverse();
      stack.push(...children);
      indentCount++;
    } else {
      indentCount--;
      output.push(indent.repeat(indentCount) + tag);
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
${indent}<head>
${indent.repeat(2)}<meta charset="UTF-8">
${indent.repeat(2)}<meta http-equiv="X-UA-Compatible" content="IE=edge">
${indent.repeat(2)}<meta name="viewport" content="width=device-width, initial-scale=1.0">
${indent.repeat(2)}<title>${inputTitle.value}</title>
${indent}</head>`;
  const bottom = "</html>";
  return [top, ...output, bottom].join('\n');
};