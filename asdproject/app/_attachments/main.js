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
	
var clearLink = document.getElementById('clearLocal');
clearLink.addEventListener("click", clearLocal);
	
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

	$.ajax({
		"url": '127.0.0.1:5984/asdcouch/_all_docs?include_docs=true',
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, program){
				var itemname = program.doc.name,
					itemcost = program.doc.cost,
					itemamount = program.doc.amount,
					itemdescription = program.doc.description;
				$('#programlist').append($('li').append($('<a>').attr("href", "#").text(itemname)));
			});
			$('#programlist').listview('refresh');
		}
	});

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