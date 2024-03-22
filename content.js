function saveTextToFile(text,fileName) {
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  var a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

function getFileName(element) {
  let fileNameElement = element.previousElementSibling.querySelector("code");
  if (fileNameElement === null){
    return "undefined.txt";
  }
  return fileNameElement.innerText;
}

function addButton() {
  const codeElement = document.getElementsByTagName("pre");
  for(let element of codeElement){
    if (element.getElementsByClassName("custom-button").length === 0){
      let button = document.createElement('button');
      button.textContent = "Save";
      button.classList.add("custom-button");
      button.addEventListener("click",()=>{
        saveTextToFile(element.querySelector("code").innerText, getFileName(element));
      });
      element.appendChild(button);
    }
  }
}

setInterval(addButton,1000);