const HOST = 'http://212.237.32.76:3000';


function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError, isSpinnerShown) {
	
	const AJAX_TIMEOUT = 5000;
	
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: JSON.stringify(parametri),
		contentType: "application/json",
		dataType: "json",
		beforeSend: function(){
			if(isSpinnerShown){
				showSpinner();
				}
			},
		success: callbackOnSuccess,
		error: callbackOnError,
		complete: function(jqXHR, textStatus){
			if(isSpinnerShown && textStatus !="pending"){
				stopSpinner();
				}
			},
		timeout: AJAX_TIMEOUT
	});
}

function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}

function showSpinner(){
	var spinnerDiv = getSpinnerDiv();
	spinnerDiv.show();
	
	$.fakeLoader({
                    bgColor: '#3498db',
                    spinner:"spinner4",
					timeToHide: 999999999
                });
}

function getSpinnerDiv(){
	if($("#fakeLoaderId").length === 0){
		$("<div id='fakeLoaderId' class='fakeLoader'></div>").appendTo(document.body);
	}
	return $("#fakeLoaderId");
}

function stopSpinner(){
	var fadeOutDelay = 0;
	var fadeOutTime = 1000;
	
	setTimeout(function(){ 
		$("#fakeLoaderId").fadeOut(fadeOutTime);
	}, fadeOutDelay);
    
}