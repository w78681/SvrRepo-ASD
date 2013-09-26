function(doc) {
  if (doc.type.substr(0, 4) === "Prod") {
  	emit(doc._id, {
  		"name": doc.name,
  		"cost": doc.cost,
  		"amount": doc.amount,
  		"description": doc.description
  	});
  }
};