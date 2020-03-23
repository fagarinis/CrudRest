function executeInsert(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = parseFloat($("#stipendioInputId").val());
	
	var settoreSelected = $('#codiceSettoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	var param = {
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": settore,
		"stipendioRAL": stipendio
		};
	
	 doCall('POST', HOST +'/risorsa', param, function(resultJson){
		console.log("inserimento avvenuto con successo");
	}, function(error){
		console.log("inserimento fallito: "+error);
	}); 
	
}

