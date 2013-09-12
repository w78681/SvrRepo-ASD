//  Jeremy "Jay" Sweet
//  Mobile Interfaces and Usability 1307
//  Project 1 - 10 July 2013

//shortcut getElementById function 
function getelement(x){
	var element = document.getElementById(x);
	return element;
}

function checkBoxValue(){
	if (getelement('itemspoil').checked){
		spoilValue = getelement('itemspoil').value;
	} else {
		spoilValue = "No";
	}
}

function toggleControls(n){
	switch(n){
		case "on":
			getelement('itemForm').style.display = "none";
			getelement('clearData').style.display = "inline";
			getelement('displayData').style.display = "none";
			getelement('addNewItem').style.display = "inline";
			break;
		case "off":
			getelement('itemForm').style.display = "block";
			getelement('clearData').style.display = "inline";
			getelement('displayData').style.display = "inline";
			getelement('addNewItem').style.display = "none";
			getelement('items').style.display = "none";
			break;
		default:
			return false;
	}
}

//submitMyData function
function submitData(key){
	//if there is no key, this if statement sets a new key and stores data
	if (!key){
		var id = Math.floor(Math.random()*102363265439);
	}else{
		id = key;
	}
	checkBoxValue();
	var item				= {};
		item.name			= ["Name: ", getelement('itemname').value];
		item.category		= ["Category: ", getelement('itemcategory').value];
		item.cost			= ["Cost: ", getelement('itemcost').value];
		item.ammount		= ["Ammount: ", getelement('itemammount').value];
		item.spoil			= ["Spoil: ", spoilValue];
		item.removedate 	= ["Remove Date: ", getelement('itemremovedate').value];
		item.description	= ["Description: ", getelement('itemdescription').value];
		item.username		= ["Username: ", getelement('username').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");

}
// gets my data from Local Storage
function getData(){
	toggleControls("on");
	if (localStorage.length === 0) {
		alert("No Data stored.  Default data add.");
		autoFillData();
	}
	var divider = document.createElement('div');
	divider.setAttribute("id", "items");
	var myList = document.createElement('ul');
	divider.appendChild(myList);
	document.body.appendChild(divider);	
	getelement('items').style.display = "block";
	for(var i = 0, len=localStorage.length; i < len; i++){
		var myli = document.createElement('li');
		var linksli = document.createElement('li');
		myList.appendChild(myli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myObject = JSON.parse(value);
		var mySubLi = document.createElement('ul');
		myli.appendChild(mySubLi);
		getIcon(mySubLi, myObject.category[1]);
		for (var n in myObject){
			var makeSubli = document.createElement('li');
			mySubLi.appendChild(makeSubli);
			var optionSubText = myObject[n][0]+" "+myObject[n][1];
			makeSubli.innerHTML = optionSubText;
			mySubLi.appendChild(linksli); 
		}
		makeItemLinks(localStorage.key(i), linksli)  //create edit and delete links for local storage items.
	}		
}

// get icon based on localstorage category field
function getIcon(mySubLi, iconCategory){
	var iconLi = document.createElement('li');
	mySubLi.appendChild(iconLi);
	var newIcon = document.createElement('img');
	var newIconSrc = newIcon.setAttribute("src", "img/" + iconCategory + ".jpg");
	iconLi.appendChild(newIcon);
}

// Auto fill data if none is Local Storage
function autoFillData(){
	for (var n in json){
		var id = Math.floor(Math.random()*102363265439);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}

function makeItemLinks(key, linksli){ //create edit and delete nav for displayed items
	//edit item link
	var editItemLink = document.createElement('a');
	editItemLink.href = "#";
	editItemLink.key = key;
	var editItemText = "Edit ";
	editItemLink.addEventListener("click", editMyItem);
	editItemLink.innerHTML = editItemText;
	linksli.appendChild(editItemLink);
	
	//delete item link
	var deleteItemLink = document.createElement('a');
	deleteItemLink.href = "#";
	deleteItemLink.key = key;
	var deleteItemText = " Delete";
	deleteItemLink.addEventListener("click", deleteMyItem);
	deleteItemLink.innerHTML = deleteItemText
	linksli.appendChild(deleteItemLink);
}

function editMyItem(){
	//grab data from item from local storage
	var keyvalue = localStorage.getItem(this.key);
	var item = JSON.parse(keyvalue);
	
	//Show the form
	toggleControls("off");

	//populate the form fields with current localStorage values
	getelement('itemname').value 		= item.name[1];
	getelement('itemcategory').value 	= item.category[1];
	getelement('itemcost').value 		= item.cost[1];
	getelement('itemammount').value 		= item.ammount[1];
	if(item.spoil[1] == "Yes"){
		getelement('itemspoil').setAttribute("checked", "checked");
	}
	getelement('itemremovedate').value 	= item.removedate[1];
	getelement('itemdescription').value 	= item.description[1];
	
	//remove the initial listener from input 'save item' button.
	submitButton.removeEventListener("click", submitData);
	
	//change submitButton value to Edit Item
	getelement('itemSubmit').value = "Edit Item";
	var editSubmitButton = getelement('itemSubmit');
	
	//save the key value established in this function as a property of the editSubmitButton
	editSubmitButton.addEventListener("click", validateItem);
	editSubmitButton.key = this.key;
}

function deleteMyItem(){
	var asktoDelete = confirm("Are your sure you want to delete this item?");
	if(asktoDelete){
		localStorage.removeItem(this.key);
		alert("Item Deleted.");
		window.location.reload();
	}else{
		alert("Item was not deleted.");
	}
}

function clearTheData (){
	if(localStorage.length === 0){
		alert("No data to clear.");
	}else{
		localStorage.clear();
		alert("All data deleted.");
		window.location.reload();
		return false;
	}
}

function validateItem(eventData){
	var getItemName = getelement('itemname');
	var getItemCost = getelement('itemcost');
	var getItemAmmount = getelement('itemammount');
	//reset error messages
	myValidiationErrorMsg.innerHTML = "";
	getItemName.style.border = "1px solid black";
	getItemCost.style.border = "1px solid black";
	
	//get error messages
	var errorMsgArray = [];
	// first name validation
	if(getItemName.value === ""){
		var itemNameError = "Please add an item name."
		getItemName.style.border = "1px solid red";
		errorMsgArray.push(itemNameError);		
	}
	if(getItemCost.value === ""){
		var itemCostError = "Please add an item cost."
		getItemCost.style.border = "1px solid red";
		errorMsgArray.push(itemCostError);		
	}
	if(getItemAmmount.value === ""){
		var itemAmmountError = "Please add an item ammount."
		getItemAmmount.style.border = "1px solid red";
		errorMsgArray.push(itemAmmountError);		
	}
	//Valid numbers
	var regexNumber = /^(([0-9]*)|(([0-9]*).([0-9]*)))$/;
	if(!(regexNumber.exec(getItemCost.value))){
		var itemCostError = "Please use numbers for cost."
		getItemCost.style.border = "1px solid red";
		errorMsgArray.push(itemCostError);		
	}
	
	//if errors are found, display
	if(errorMsgArray.length >= 1){
		for(var i=0, j=errorMsgArray.length; i < j; i++){
			var errorText = document.createElement('li');
			errorText.innerHTML = errorMsgArray[i];
			myValidiationErrorMsg.appendChild(errorText);
		}
		eventData.preventDefault();
		return false;
	}else{
		//if all is ok, save the data, and send the key value from 'editdata' function.
		submitData(this.key);
	}
}


var spoilValue = "No",
	myValidiationErrorMsg = getelement('validationErrors')


//set link and submit event
var displayLink = getelement('displayData');
displayLink.addEventListener("click", getData);

var clearLink = getelement('clearData');
clearLink.addEventListener("click", clearTheData);

var submitButton = getelement('itemSubmit');
submitButton.addEventListener("click", validateItem);  //submitData