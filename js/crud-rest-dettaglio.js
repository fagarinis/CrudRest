function buildDettaglioFromJson(json){
	var id = json["_id"];
	var nome = json["nome"];
	var cognome = json["cognome"];
	var dataNascita = json["dataNascita"];
	var settore = {codice: json["settore"]["codice"],descrizione: json["settore"]["descrizione"]};
	var stipendio = json["stipendioRAL"];
	
	$("#id").html(id);
	$("#nomeId").html(nome);
	$("#cognomeId").html(cognome);
	$("#dataNascitaId").html(dataNascita);
	$("#settoreId").html(settore.descrizione +" ("+settore.codice+")");
	$("#stipendioId").html(stipendio);
}


function executeDettaglio(){
	var id = $("#idInput").val();
	
	if(isBlank(id)){
		return;
	}
	
	doCall('GET', HOST+'/risorsa/'+ id, undefined, function(resultJson){
		buildDettaglioFromJson(resultJson);
	});
}