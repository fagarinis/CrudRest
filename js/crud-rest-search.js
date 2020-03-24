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
	
	
	for (var i = 0; i < resultJson.length; i++) {
		resultTable.append(buildTableRow(resultJson[i]));
	}


}

function buildTableHead(){
	var tableHead = "<thead><tr>";
	tableHead += " <th>Id</th>";
	tableHead += " <th>Nome</th>";
	tableHead += " <th>Cognome</th>";
	tableHead += " <th>Data di nascita</th>";
	tableHead += " <th>Settore</th>";
	tableHead += " <th>Stipendio</th>";
	tableHead += "</tr></thead>";
	
	return tableHead;
	
}

function buildTableRow(jsonRisorsa){
	id = jsonRisorsa._id;
	nome = jsonRisorsa.nome;
	cognome = jsonRisorsa.cognome;
	dataNascita = jsonRisorsa.dataNascita;
	settore = jsonRisorsa.settore.descrizione + " " + jsonRisorsa.settore.codice;
	stipendioRAL = jsonRisorsa.stipendioRAL;

	var tableRow ="<tr>";

	tableRow += "<td>"+id+"</td>";
	tableRow += "<td>"+nome+"</td>";
	tableRow += "<td>"+cognome+"</td>";
	tableRow += "<td>"+dataNascita+"</td>";
	tableRow += "<td>"+settore+"</td>";
	tableRow += "<td>"+stipendioRAL+"</td>";
	
	tableRow += "</tr>";
	

		
	return tableRow;
}

function clearResultTable(){
	$("#resultTableId").empty();
}