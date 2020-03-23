$(document).ready(function(){
		populateTendinaSettori();
});

function populateTendinaSettori(){
	doCall('GET', HOST +'/settore/', {}, function(resultJson){
		buildTendinaSettoriFromJson(resultJson);
	});
}

function buildTendinaSettoriFromJson(resultJson){
	var tendina = $("#codiceSettoreInputId");
	var settori = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		settori += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(settori);
}