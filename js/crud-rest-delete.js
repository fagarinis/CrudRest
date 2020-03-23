function executeDelete(){
	var id = $("#inputId").val();
	
	if(isBlank(id)){
		return;
	}
	
	 doCall('DELETE', HOST +'/risorsa/'+ id, undefined, function(resultJson){
		console.log("cancellazione avvenuta con successo");
	}, function(error){
		console.log("cancellazione fallita");
	}); 
}
