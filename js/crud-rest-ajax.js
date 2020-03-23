function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error: callbackOnError
	});
}

function buildDettaglioFromJson(json){
	var id = json["_id"];
	var nome = json["nome"];
	var cognome = json["cognome"];
	var dataNascita = json["dataNascita"];
	var settore = {codice: json["settore"]["codice"],descrizione: json["settore"]["descrizione"]};
	var stipendio = json["stipendioRAL"];
	
	console.log("popolo dettaglio");
	$("#id").html(id);
	$("#nomeId").html(nome);
	$("#cognomeId").html(cognome);
	$("#dataNascitaId").html(dataNascita);
	$("#settoreId").html(settore.descrizione +" ("+settore.codice+")");
	$("#stipendioId").html(stipendio);
}


function executeDettaglio(){
	id = $("#idInput").val();
	doCall('GET', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(resultJson){
		buildDettaglioFromJson(resultJson);
	});
}