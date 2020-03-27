// crud-rest-ajax.js - HOST 
// crud-rest-tendina_residenza.js - selectResidenza
// crud-rest-tendina_settori.js - selectSettoreByCodice

$(document).ready(function(){
		toggleUpdateInput(false);
});

function executeUpdate(){
	var id = $("#inputId").val();
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = parseFloat($("#stipendioInputId").val());
	
	var param = {
		"_id" : id,
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": buildSettoreJsonFromInput(),
		"stipendioRAL": stipendio,
		"residenza": buildResidenzaJsonFromInput()
		};
	
	 doCall('PUT', HOST +'/risorsa', param, function(resultJson){
		  $("#idParagrafo").html("modifica avvenuta con successo");
	}, function(error){
		 $("#idParagrafo").html("modifica fallita");
	}, true); 
}

function prepareUpdate(){
	toggleUpdateInput(false);
	
	$("#idParagrafo").html("");
	var id = $("#inputId").val();
	if(isBlank(id)){
		return;
	}
	
	doCall('GET', HOST +'/risorsa/'+id, undefined, function(resultJson){
		populateUpdateInput(resultJson);
		toggleUpdateInput(true);
	} ,function(error){
		$("#idParagrafoPrepareUpdate").html("Id errato o errore nella preparazione della modifica");
	}, true
	);
	
}

function populateUpdateInput(resultJson){	
	$("#idParagrafoPrepareUpdate").html("");
	
	$("#nomeInputId").val(resultJson["nome"]);
	$("#cognomeInputId").val(resultJson["cognome"]);
	$("#dataNascitaInputId").val(resultJson["dataNascita"]);
	$("#stipendioInputId").val(resultJson["stipendioRAL"]);
	selectSettoreByCodice(resultJson["settore"]["codice"]);
	selectResidenza(resultJson["residenza"]);
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

function toggleUpdateInput(enable){
	if(enable){
		$("#nomeInputId").removeAttr('disabled');
		$("#cognomeInputId").removeAttr('disabled');
		$("#dataNascitaInputId").removeAttr('disabled');
		$("#stipendioInputId").removeAttr('disabled');
		$('#codiceSettoreInputId').removeAttr('disabled');
		$('#regioneInputId').removeAttr('disabled');
		$('#provinciaInputId').removeAttr('disabled');
		$('#comuneInputId').removeAttr('disabled');
	}
	else{
		$("#nomeInputId").attr("disabled", "disabled").val("");
		$("#cognomeInputId").attr("disabled", "disabled").val("");
		$("#dataNascitaInputId").attr("disabled", "disabled").val("");
		$("#stipendioInputId").attr("disabled", "disabled").val("");
		$('#codiceSettoreInputId').attr("disabled", "disabled");
		$('#regioneInputId').attr("disabled", "disabled");
		$('#provinciaInputId').attr("disabled", "disabled");
		$('#comuneInputId').attr("disabled", "disabled");
		selectResidenza(null);
	}
	
}