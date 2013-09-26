$(document).on('pageinit', '#pageMain', function(){
	//code needed for home page goes here
});

$(document).on('pageinit', '#pageAddItemForm', function(){
	var storeData = function(data){
	var data		= {};
		data.name	= $('#itemName').val();
		data.type	= $('#itemType').val();
		data.cost	= $('#itemCost').val();
		data.amount	= $('#itemAmount').val();
		if ($('#itemDescription').val() == "A brief description of the item if needed."){
			data.description = "None";
		} else {
			data.description = $('#itemDescription').val();
		};
		$.couch.db("asdproject").saveDoc(data, function(){});
		alert("Data has been saved.");	
		window.location.href = '#pageMain';
	};

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
});

$(document).on('pageinit', '#pageEditItemForm', function(){

});

var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	console.log(urlData);
	var urlParts = urlData.split("?");
	console.log(urlParts);
	var urlPairs = urlParts[1].split("&");
	console.log(urlPairs);
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
}

$(document).on('pageinit', '#pageItemDetails', function(){
	var program = urlVars()["programs"]
	console.log(program);
});
	

$(document).on('pageinit', '#pageInventory', function(){
	//$('#clearLocal').on('click', clearLocal)
	
	$.ajax({
		"url": '/asdproject/_all_docs?include_docs=true',
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, program){
				var itemid = program.doc._id;
				var itemname = program.doc.name;
				var itemtype = program.doc.type;
				var itemcost = program.doc.cost;
				var itemamount = program.doc.amount;
				var itemdescription = program.doc.description;
				
				$('#itemList').append
					($('<li>').append
						($('<a>')
							.attr("id", "#" + itemid)
							.attr("href", "#")
							.attr("data-icon", "delete")
							.text(itemname)));
							
//				$(itemid).on('click', function(){
//					var id = $(this).data('id');
//					var rev = $(this).data('rev');
//					var key = {}
//					key._id = id;
//					key._rev = rev;
//				})
			});			
			$('#itemList').listview('refresh');
			
			
			$.couch.db('asdproject').removeDoc(key, function(){})	
		}	
	});

	
//	$.couch.db("asdproject").view("_views/programs", {
//		success: function(data) {
//			$('#itemList').empty();
//			$.each(data.rows, function(index, value) {
//				var item = (value.value || value.doc);
//				$('#itemList').append(
//					$('<li>').append(
//						$('<a>')
//							.attr("href", "itemDetails.html?_id=")
//							.text(itemname)
//					)
//				);
//			});
//			$('#itemList').listview('refresh');
//		}
//	});
	
	//function makeEditItemLinks(key, linksli){ 
	//	var editItemLink = document.createElement('a');
	//	editItemLink.href = "#pageEditItemForm";
	//	editItemLink.key = key;
	//	var editItemText = "Edit ";
	//	editItemLink.addEventListener("click", editMyItem);
	//	editItemLink.innerHTML = editItemText;
	//	linksli.appendChild(editItemLink);
	//}
	//function makeDeleteItemLinks(key, linksli){
	//	var deleteItemLink = document.createElement('a');
	//	deleteItemLink.href = "#";
	//	deleteItemLink.key = key;
	//	var deleteItemText = " Delete";
	//	deleteItemLink.addEventListener("click", deleteMyItem);
	//	deleteItemLink.innerHTML = deleteItemText
	//	linksli.appendChild(deleteItemLink);
	//}
	
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
	
				alert("Data Saved! my edit code?");
				console("This is from the storeEditData function.");
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
					itemid = program.doc._id,
					itemrev = program.doc._rev,
					itemtype = program.doc.type,
					itemcost = program.doc.cost,
					itemamount = program.doc.amount,
					itemdescription = program.doc.description;
				$('#programlist').append($('li').append($('<a>').attr("href", "itemEdit=").text(itemname)));
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