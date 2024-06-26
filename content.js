function saveTextToFile(text,fileName) {
  var blob = new Blob([text], { type: "application/octet-stream" });

  var url = window.URL.createObjectURL(blob);

  chrome.runtime.sendMessage({
    action: 'downloadFile',
    url: url,
    filename: fileName
  },
  (response)=>{
    window.URL.revokeObjectURL(url);
  });
}

function deleteNodeAndChild(node){
  while(node.firstChild){
    node.removeChild(node.firstChild);
  }
  node.parentNode.removeChild(node);
}

FILE_PATH = ""; 
function showFileSaveWindow(openButton, textToSave){

  let floatingWindow = document.createElement('div');
  let fileNameField = document.createElement('input');
  let applyButton = document.createElement('button');
  let closeButton = document.createElement('button');

  floatingWindow.id = "floatingWindow";

  fileNameField.id = "floatingWindowInput";
  fileNameField.type = "text";
  fileNameField.placeholder = "File Path";
  fileNameField.value = FILE_PATH;

  applyButton.id = "floatingWindowApplyButton";
  applyButton.textContent = "Ok";
  applyButton.addEventListener("click",()=>{
    FILE_PATH = fileNameField.value;
    saveTextToFile(textToSave, fileNameField.value);
    floatingWindow.style.display = "none";
    deleteNodeAndChild(floatingWindow);
  });

  closeButton.id = "floatingWindowCloseButton";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click",()=>{
    floatingWindow.style.display = "none";
    deleteNodeAndChild(floatingWindow);
  });

  floatingWindow.appendChild(fileNameField);
  floatingWindow.appendChild(applyButton);
  floatingWindow.appendChild(closeButton);
  document.body.appendChild(floatingWindow);

  let buttonRect = openButton.getBoundingClientRect();

  floatingWindow.style.top = buttonRect.bottom + "px";
  floatingWindow.style.left = buttonRect.left + "px";
  floatingWindow.style.display = "grid";

}

function addButton() {
  const codeElement = document.getElementsByTagName("pre");
  for(let element of codeElement){
    if (element.getElementsByClassName("custom-button").length === 0){
      let button = document.createElement('button');
      button.textContent = "Download";
      button.classList.add("custom-button");
      button.addEventListener("click",()=>{
        showFileSaveWindow(button, element.querySelector("code").innerText);
      });
      element.appendChild(button);
    }
  }
}

function main(){
  addButton();
}

setInterval(main,1000);