$('#pageMain').on('pageinit', function(){
	//code needed for home page goes here
});

$('#pageAddItemForm').on('pageinit', function(){
	var myForm = $('#addItemForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
	var data = myForm.serializeArray();
		storeData(data);
		}
	});	

	$('#itemName').val("Kraft Cheese");	
	$('#itemName').blur(function() {
		if ($('#itemName').val() === "") {
			$('#itemName').val("Kraft Cheese");
		}		
	});
	$('#itemName').focus(function() {
		if ($('#itemName').val() === "Kraft Cheese") {
			$('#itemName').val("");
		}		
	});

	$('#itemCost').val("2");
	$('#itemCost').blur(function() {
		if ($('#itemCost').val() === "") {
			$('#itemCost').val("2");
		}		
	});
	$('#itemCost').focus(function() {
		if ($('#itemCost').val() === "2") {
			$('#itemCost').val("");
		}		
	});
	
	var storeData = function(data){
	id = Math.floor(Math.random()*102363265439);

	var item		= {};
		item.name	= ["Name: ", $('#itemName').val()];
		item.cost	= ["Cost: ", $('#itemCost').val()];
		item.amount	= ["Amount: ", $('#itemAmount').val()];
		if ($('#itemDescription').val() == "A brief description of the item if needed."){
			item.description = ["Description: ", "None"];
		} else {
			item.description	= ["Description: ", $('#itemDescription').val()];
		};
		localStorage.setItem(id, JSON.stringify(item));

		alert("Data Saved!");
		window.location.href = '#pageMain';
	};	
});

$('#pageEditItemForm').on('pageinit', function(){

});	

$('#pageInventory').on('pageinit', function(){
	$.ajax({
		"url": '/asdproject/_all_docs?include_docs=true',
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, program){
				var itemname = program.doc.name;
				var itemcost = program.doc.cost;
				var itemamount = program.doc.amount;
				var itemdescription = program.doc.description;
				$('#programlist').append($('<li>').append($('<a>').attr("href", "#").text(itemname)));
			});
			$('#programlist').listview('refresh');
		}
	});

var clearLink = document.getElementById('clearLocal');
clearLink.addEventListener("click", clearLocal);

	if (localStorage.length === 0) {
	alert("No Data stored.  Default data add.");
	autoFillData();
	}
	var divider = document.createElement('div');
	divider.setAttribute("id", "items");
	var theInvDiv = document.getElementById('displayDataDiv');
	theInvDiv.appendChild(divider);
	var myList = document.createElement('ul');
	divider.appendChild(myList);
	document.getElementById('items').style.display = "block";
	for(var i = 0, len=localStorage.length; i < len; i++){
		var myli = document.createElement('li');
		var linksli = document.createElement('li');
		myList.appendChild(myli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myObject = JSON.parse(value);
		var mySubLi = document.createElement('ul');
			//mySubLi.setAttribute("data-role", "listview");
		myli.appendChild(mySubLi);
		//getIcon(mySubLi, myObject.category[1]);
		for (var n in myObject){
			var makeSubli = document.createElement('li');
			mySubLi.appendChild(makeSubli);
			var optionSubText = myObject[n][0]+" "+myObject[n][1];
			makeSubli.innerHTML = optionSubText;
			mySubLi.appendChild(linksli); 
		}
		makeEditItemLinks(localStorage.key(i), linksli)  //create edit and delete links for local storage items.
		makeDeleteItemLinks(localStorage.key(i), linksli)
	}

function makeEditItemLinks(key, linksli){ 
	var editItemLink = document.createElement('a');
	editItemLink.href = "#pageEditItemForm";
	editItemLink.key = key;
	var editItemText = "Edit ";
	editItemLink.addEventListener("click", editMyItem);
	editItemLink.innerHTML = editItemText;
	linksli.appendChild(editItemLink);
}
function makeDeleteItemLinks(key, linksli){
	var deleteItemLink = document.createElement('a');
	deleteItemLink.href = "#";
	deleteItemLink.key = key;
	var deleteItemText = " Delete";
	deleteItemLink.addEventListener("click", deleteMyItem);
	deleteItemLink.innerHTML = deleteItemText
	linksli.appendChild(deleteItemLink);
}

function editMyItem(){
	var keyvalue = localStorage.getItem(this.key);
	var item = JSON.parse(keyvalue);
	localStorage.removeItem(this.key);
	$('#itemEditName').val(item.name[1]);
	$('#itemEditCost').val(item.cost[1]);
	$('#itemEditAmount').val(item.amount[1]);
	$('#itemEditDescription').val(item.description[1]);

	var submitEdit = $('#itemEditSubmit');
	submitEdit.on("click", storeEditData);
}

	var myForm = $('#addItemForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
	var data = myForm.serializeArray();
		storeEditData(data);
		}
	});	
	
	var storeEditData = function(data){
	id = Math.floor(Math.random()*102363265439);

	var item		= {};
		item.name	= ["Name: ", $('#itemEditName').val()];
		item.cost	= ["Cost: ", $('#itemEditCost').val()];
		item.amount	= ["Amount: ", $('#itemEditAmount').val()];
		if ($('#itemEditDescription').val() == "A brief description of the item if needed."){
			item.description = ["Description: ", "None"];
		} else {
			item.description	= ["Description: ", $('#itemEditDescription').val()];
		};
		localStorage.setItem(id, JSON.stringify(item));

			alert("Data Saved!");
			window.location.reload();

	};

});	


var autoFillData = function(){
	for (var n in json){
		var id = Math.floor(Math.random()*102363265439);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}	 
};


function deleteMyItem(){
	var asktoDelete = confirm("Are your sure you want to delete this item?");
	if(asktoDelete){
		localStorage.removeItem(this.key);
		alert("Item Deleted.");
		window.location.reload();
	}else{
		alert("Item was not deleted.");
	}
};
								
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("No data to clear.");
	}else{
		localStorage.clear();
		alert("All data deleted.");
		//window.location.reload();
		window.location.href = '#pageMain';
		return false;
	}
};