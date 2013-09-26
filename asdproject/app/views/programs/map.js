function(doc) {
  if (doc.type === "Food") {
  	emit(
  		"name": doc.name,
  		"type": doc.type,
  		"cost": doc.cost,
  		"amount": doc.amount,
  		"description": doc.description
  	);
  }
};