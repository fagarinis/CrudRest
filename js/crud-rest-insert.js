// crud-rest-ajax.js - HOST 

function executeInsert(){
	var param = buildJsonFromInput();
	
	 doCall('POST', HOST +'/risorsa', param, function(resultJson){
		console.log("inserimento avvenuto con successo");
	}, function(error){
		console.log("inserimento fallito");
	}); 
}

function buildJsonFromInput(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = parseFloat($("#stipendioInputId").val());
	
	return {
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": buildSettoreJsonFromInput(),
		"stipendioRAL": stipendio,
		"residenza": buildResidenzaJsonFromInput()
		};
}
	
function buildResidenzaJsonFromInput(){
	var regioneSelected = $('#regioneInputId').find(":selected");
	var provinciaSelected = $('#provinciaInputId').find(":selected");
	var comuneSelected = $('#comuneInputId').find(":selected");
	
	var residenza = {
		"regione": {"codice": regioneSelected.data("codice") ,"descrizione": regioneSelected.text()}, 
		"provincia": {"codice": provinciaSelected.data("codice") ,"descrizione": provinciaSelected.text()}, 
		"comune":{"codice": comuneSelected.data("codice") ,"descrizione": comuneSelected.text()}
	};

	return residenza;
}

function buildSettoreJsonFromInput(){
	var settoreSelected = $('#codiceSettoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	return settore;
}


