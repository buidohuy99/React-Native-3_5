let convertButton = document.getElementById('convertButton');
let amountBox = document.getElementById('amountBox');

function convertButton_OnClick(){
  if(document.getElementById('USD').checked)
  	callApi('USD');
  else if (document.getElementById('EUR').checked)
  	callApi('EUR');
}

convertButton.addEventListener('click',convertButton_OnClick);

function callApi(currency) {
  var xhr = new XMLHttpRequest();
  let exchange = currency + '_VND';
  xhr.open('GET', 'https://free.currconv.com/api/v7/convert?q=' + exchange +'&compact=ultra&apiKey=ca1ffb58efd5716ceb4d');
  xhr.onload = function() {
      if (xhr.status === 200) {
      		updateChanges(JSON.parse(xhr.responseText)[exchange]);
      }
      else {
          alert('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
}

function updateChanges(response){
	if(amountBox.value == "") return;
	let result = document.getElementById('result'); 
	let vndAmount = amountBox.value * response;
	result.innerHTML = amountBox.value + " is " + vndAmount + " VND.";
}