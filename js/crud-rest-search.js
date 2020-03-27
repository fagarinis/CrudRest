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
	
	doCall('GET', path, undefined, buildResultTable, undefined, true);
}

function buildResultTable(resultJson){
	//console.table(resultJson); //TEST
	clearResultTable();
	var resultTable = $("#resultTableId");
	
	resultTable.append(buildTableHead());
	
	
	for (var i = 0; i < resultJson.length; i++) {
		resultTable.append(buildTableRow(resultJson[i]));
	}


}

function buildTableHead(){
	var nomiAttributi = ["Id","Nome","Cognome","Data di Nascita", "Settore", "Stipendio", "Residenza"];
	var tableHead = "<thead><tr>";
	
	for(let i = 0; i < nomiAttributi.length; i++){
		tableHead += " <th>"+nomiAttributi[i]+"</th>";
	}
	
	tableHead += "</tr></thead>";
	
	return tableHead;
	
}

function buildTableRow(jsonRisorsa){
	id = jsonRisorsa._id;
	nome = jsonRisorsa.nome;
	cognome = jsonRisorsa.cognome;
	dataNascita = jsonRisorsa.dataNascita;
	if(jsonRisorsa.settore){
		settore = jsonRisorsa.settore.descrizione + " " + jsonRisorsa.settore.codice;
	}
	stipendioRAL = jsonRisorsa.stipendioRAL;
	
	if(jsonRisorsa.residenza){
		var {regione, provincia, comune} = {regione : jsonRisorsa.residenza.regione.descrizione, provincia: jsonRisorsa.residenza.provincia.codice , comune: jsonRisorsa.residenza.comune.descrizione }
	}

	var tableRow ="<tr>";

	tableRow += "<td>"+id+"</td>";
	tableRow += "<td>"+nome+"</td>";
	tableRow += "<td>"+cognome+"</td>";
	tableRow += "<td>"+dataNascita+"</td>";
	tableRow += "<td>"+settore+"</td>";
	tableRow += "<td>"+stipendioRAL+"</td>";
	tableRow += "<td>"+comune+", "+provincia+", "+ regione+"</td>";
	
	tableRow += "</tr>";
	

		
	return tableRow;
}

function clearResultTable(){
	$("#resultTableId").empty();
}