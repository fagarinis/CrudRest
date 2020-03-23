function executeUpdate(){
	var id = $("#inputId").val();
	
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = parseFloat($("#stipendioInputId").val());
	
	var settoreSelected = $('#codiceSettoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	var param = {
		"_id" : id,
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": settore,
		"stipendioRAL": stipendio
		};
	
	console.log(param);
	
	 doCall('PUT', HOST +'/risorsa', param, function(resultJson){
		console.log("modifica avvenuta con successo");
	}, function(error){
		console.log("modifica fallita");
	}); 
}

function prepareUpdate(){
	var id = $("#inputId").val();
	if(isBlank(id)){
		return;
	}
	
	doCall('GET', HOST +'/risorsa/'+id, {}, function(resultJson){		
		populateUpdateInput(resultJson);
	},function(error){
		console.log("errore nel prepareUpdate: "+error);
	}
	);
	
}

function populateUpdateInput(resultJson){
	$("#nomeInputId").val(resultJson["nome"]);
	$("#cognomeInputId").val(resultJson["cognome"]);
	$("#dataNascitaInputId").val(resultJson["dataNascita"]);
	$("#stipendioInputId").val(resultJson["stipendioRAL"]);
	selectSettoreByCodice(resultJson["settore"]["codice"]);
}