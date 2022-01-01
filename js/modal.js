const btnExportModal = document.querySelector(".btn-headmenu.file");
const dimed = document.querySelector(".modal-dimed");
const btnClose = document.querySelector(".btn-close");

const toggleModalOn = () => {
    document.querySelector(".modal").classList.toggle("on");
    btnCopy.innerHTML = "클립보드에 복사";
}

btnExportModal.addEventListener("click", toggleModalOn);
dimed.addEventListener("click", toggleModalOn);
btnClose.addEventListener("click", toggleModalOn);

const codePreview = document.querySelector(".preview-code");
const btnCopy = document.querySelector(".btn-copy");

const onCopied = () => {
    btnCopy.innerHTML = "<i class='bi bi-check-lg'></i> Copied :)";
}

btnCopy.addEventListener("click", onCopied);