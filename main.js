$('#pageMain').on('pageinit', function(){

});	


$('#pageAddEdit').on('pageinit', function(){
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

	$('#itemAmount').val("2");
	$('#itemAmount').blur(function() {
		if ($('#itemAmount').val() === "") {
			$('#itemAmount').val("2");
		}		
	});
	$('#itemAmount').focus(function() {
		if ($('#itemAmount').val() === "2") {
			$('#itemAmount').val("");
		}		
	});

	$('#itemDescription').val("N/A");
	$('#itemDescription').blur(function() {
		if ($('#itemDescription').val() === "") {
			$('#itemDescription').val("N/A");
		}		
	});
	$('#itemDescription').focus(function() {
		if ($('#itemDescription').val() === "N/A") {
			$('#itemDescription').val("");
		}		
	});
});	


$('#pageInventory').on('pageinit', function(){
	if (localStorage.length === 0) {
		$('#pError').text('Nothing stored in inventory as of yet.');
	} else {
		//no action as of this week...
	};

});	


