function executeSearch(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var codiceSettore = $("#codiceSettoreInputId").val();
	
	//console.log("nome: "+ nome);
	//console.log("cognome: "+ cognome);
	//console.log("codiceSettore: "+ codiceSettore);
	
	var path = HOST +'/risorsa?';
	
	if(!isBlank(nome)){
		path += '&nome='+nome;
	}
	if(!isBlank(cognome)){
		path += '&cognome='+cognome;
	}
	if(!isBlank(codiceSettore)){
		path += '&codiceSettore='+codiceSettore;
	}
	
	doCall('GET', path, {}, function(resultJson){
		console.table(resultJson);
		
		//...
		buildResultTable(resultJson);
	});
	
}

function buildResultTable(resultJson){
	//...
	
	
}