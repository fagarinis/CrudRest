function executeDelete(){
	var id = $("#inputId").val();
	
	if(isBlank(id)){
		return;
	}
	
	 doCall('DELETE', HOST +'/risorsa/'+ id, undefined, function(resultJson){
		 $("#idParagrafo").html("cancellazione avvenuta con successo");
	}, function(error){
		$("#idParagrafo").html("cancellazione fallita");
	}, true); 
}
