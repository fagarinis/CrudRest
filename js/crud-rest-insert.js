function executeInsert(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = parseFloat($("#stipendioInputId").val());
	
	var settoreSelected = $('#codiceSettoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	var regioneSelected = $('#regioneInputId').find(":selected");
	var provinciaSelected = $('#provinciaInputId').find(":selected");
	var comuneSelected = $('#comuneInputId').find(":selected");
	
	var residenza = {
		"regione": {"codice": regioneSelected.data("codice") ,"descrizione": regioneSelected.text()}, 
		"provincia": {"codice": provinciaSelected.data("codice") ,"descrizione": provinciaSelected.text()}, 
		"comune":{"codice": comuneSelected.data("codice") ,"descrizione": comuneSelected.text()}
	}
	
	var param = {
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": settore,
		"stipendioRAL": stipendio,
		"residenza": residenza
		};

	
	 doCall('POST', HOST +'/risorsa', param, function(resultJson){
		console.log("inserimento avvenuto con successo");
	}, function(error){
		console.log("inserimento fallito: ");
	}); 
	
}

