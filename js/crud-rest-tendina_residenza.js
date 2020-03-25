$(document).ready(function(){
	populateTendinaRegioni();
	toggleProvince(false);
});

$("#regioneInputId").change(function() {
	populateTendinaProvince(getRegioneSelected().data("codice"));
});

$("#provinciaInputId").change(function() {
	populateTendinaComuni(getProvinciaSelected().data("codice"));
});

function populateTendinaRegioni(){
	doCall('GET', HOST +'/geo/regioni', undefined, buildTendinaRegioniFromJson);
}

function populateTendinaProvince(codiceRegione, preselectedProvinciaCodice){
	if(codiceRegione == null){
		toggleProvince(false);
		return;
	}
	
	toggleProvince(true);
	doCall('GET', HOST +'/geo/province/'+codiceRegione, undefined, function(resultJson){
		buildTendinaProvinceFromJson(resultJson);
		selectProvincia(preselectedProvinciaCodice);
	});
}

function populateTendinaComuni(codiceProvincia, preselectedComuneCodice){
	if(codiceProvincia == null){
		toggleComuni(false);
		return;
	}
	
	toggleComuni(true);
	doCall('GET', HOST +'/geo/comuni/'+codiceProvincia, undefined, function(resultJson){
		buildTendinaComuniFromJson(resultJson);
		selectComune(preselectedComuneCodice);
	});
}

function getRegioneSelected(){
	return $('#regioneInputId').find(":selected");
}

function getProvinciaSelected(){
	return $('#provinciaInputId').find(":selected");
}

function getComuneSelected(){
	return $('#comuneInputId').find(":selected");
}

function toggleProvince(enable){
	if(enable){
		$('#provinciaInputId').removeAttr('disabled');
	}
	else{
		$('#provinciaInputId').attr("disabled", "disabled");
		$('#provinciaInputId').empty()
	}
	
	toggleComuni(false)
}

function toggleComuni(enable){
	if(enable){
		$('#comuneInputId').removeAttr('disabled');
	}
	else{
		$('#comuneInputId').attr("disabled", "disabled");
		$('#comuneInputId').empty();
	}
}

function buildTendinaRegioniFromJson(resultJson){	
	var tendina = $("#regioneInputId");
	var result = "<option value = ''>Seleziona Regione </option>";
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		result += '<option data-codice='+item.codice+' value='+item._id+'>'+item.descrizione+'</option>';
	});
	tendina.append(result);
}

function buildTendinaProvinceFromJson(resultJson){
	$("#provinciaInputId").empty();
	$('#comuneInputId').empty();
	
	var tendina = $("#provinciaInputId");
	var result = "<option value = ''>Seleziona Provincia </option>";
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		result += '<option data-codice='+item.codice+' value='+item._id+'>'+item.descrizione+'</option>';
	});
	tendina.append(result);
}

function buildTendinaComuniFromJson(resultJson){
	$("#comuneInputId").empty();
	var tendina = $("#comuneInputId");
	var result = "<option value = ''>Seleziona Comune </option>";
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		result += '<option data-codice='+item.codice+' value='+item._id+'>'+item.descrizione+'</option>';
	});
	tendina.append(result);
}


function selectResidenza(residenzaJson){
	if(residenzaJson == null){
		selectRegione(null);
		return null;
	}
	var codiceRegione = residenzaJson["regione"]["codice"];
	var codiceProvincia = residenzaJson["provincia"]["codice"];
	var codiceComune = residenzaJson["comune"]["codice"];
	
	selectRegione(codiceRegione);
	populateTendinaProvince(codiceRegione, codiceProvincia);
	populateTendinaComuni(codiceProvincia, codiceComune);
}

function selectRegione(codiceRegione){
	if(codiceRegione == null){
		$("#regioneInputId option[value='']").prop('selected', true);
		$("#provinciaInputId").empty();
		$("#comuneInputId").empty();
	}
	$("#regioneInputId option[data-codice='"+codiceRegione+"']").prop('selected', true);
}

function selectProvincia(codiceProvincia){
	$("#provinciaInputId option[data-codice='"+codiceProvincia+"']").prop('selected', true);
}

function selectComune(codiceComune){
	$("#comuneInputId option[data-codice='"+codiceComune+"']").prop('selected', true);
}
