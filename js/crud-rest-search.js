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
	
	doCall('GET', path, undefined, buildResultTable);
}

function buildResultTable(resultJson){
	// DA FINIRE ...
	console.table(resultJson); //TEST
	clearResultTable();
	var resultTable = $("#resultTableId");
	
	resultTable.append(buildTableHead());
	
	console.log(resultTable);
	
	for (var i = 0; i < resultJson.length; i++) {
		resultTable.append(buildTableRow(resultJson[i]));
	}


}

function buildTableHead(){
	var tableHead = "<th>";
	tableHead += " <td>Nome</td>";
	
	tableHead += "</th>";
	return tableHead;
	
}

function buildTableRow(jsonRisorsa){
	id = jsonRisorsa.id;
	nome = jsonRisorsa.nome;
	cognome = jsonRisorsa.cognome;
	//settore = jsonRisorsa["album"]["artista"].nome + " " + jsonRisorsa["album"]["artista"].cognome;

	var tableRow ="<tr>";

	tableRow += "<td>"+nome+"</td>";
	tableRow += "<td>"+cognome+"</td>";
	
	tableRow += "</tr>";
	

		
	return tableRow;
}

function clearResultTable(){
	$("#songsTableId").empty();
}