$(document).ready(function(){
		populateTendinaSettori();
});

function populateTendinaSettori(){
	doCall('GET', HOST +'/settore/', undefined, buildTendinaSettoriFromJson);
}

function buildTendinaSettoriFromJson(resultJson){
	var tendina = $("#codiceSettoreInputId");
	var settori = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		settori += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(settori);
}

function getSettoreSelected(){
	return $('#codiceSettoreInputId').find(":selected");
}

function getCodiceSettoreSelected(){
	return getSettoreSelected.val();
}

function getDescrizioneSettoreSelected(){
	return getSettoreSelected.text();
}

function selectSettoreByCodice(codiceSettore){
	$("#codiceSettoreInputId option[value='"+codiceSettore+"']").prop('selected', true);
}