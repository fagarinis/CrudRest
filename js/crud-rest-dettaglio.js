function buildDettaglioFromJson(json){
	var id = json._id;
	var nome = json.nome;
	var cognome = json.cognome;
	var dataNascita = json.dataNascita;
	if(json.settore != null){
		var settore = {codice: json.settore.codice,descrizione: json.settore.descrizione};
	}
	var stipendio = json.stipendioRAL;
	if(json.residenza != null){
		var {regione, provincia, comune} = {regione : json.residenza.regione.descrizione, provincia: json.residenza.provincia.descrizione , comune: json.residenza.comune.descrizione }
	}
	
	$("#id").html(id);
	$("#nomeId").html(nome);
	$("#cognomeId").html(cognome);
	$("#dataNascitaId").html(dataNascita);
	$("#settoreId").html(settore.descrizione +" ("+settore.codice+")");
	$("#stipendioId").html(stipendio);
	$("#residenzaId").html(comune+", "+provincia+", "+regione);
}

function executeDettaglio(){
	clearDettaglio()
	var id = $("#idInput").val();
	
	if(isBlank(id)){
		return;
	}
	
	doCall('GET', HOST+'/risorsa/'+ id, undefined, function(resultJson){
		buildDettaglioFromJson(resultJson);
	},undefined, true);
}

function clearDettaglio(){
	$("dd").empty();
}