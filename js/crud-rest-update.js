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
	
	 doCall('PUT', HOST +'/risorsa', param, function(resultJson){
		  $("#idParagrafo").html("modifica avvenuta con successo");
	}, function(error){
		 $("#idParagrafo").html("modifica fallita");
	}); 
}

function prepareUpdate(){
	$("#idParagrafo").html("");
	var id = $("#inputId").val();
	if(isBlank(id)){
		return;
	}
	
	doCall('GET', HOST +'/risorsa/'+id, undefined, populateUpdateInput ,function(error){
		$("#idParagrafoPrepareUpdate").html("Id errato o errore nella preparazione della modifica");
	}
	);
	
}

function populateUpdateInput(resultJson){
	$("#idParagrafoPrepareUpdate").html("");
	
	$("#nomeInputId").val(resultJson["nome"]);
	$("#cognomeInputId").val(resultJson["cognome"]);
	$("#dataNascitaInputId").val(resultJson["dataNascita"]);
	$("#stipendioInputId").val(resultJson["stipendioRAL"]);
	selectSettoreByCodice(resultJson["settore"]["codice"]);
}