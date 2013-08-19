	(function(){
		var btn = document.getElementById("btnOk");
		var inputUrlEvent = document.getElementById("search");
		btn.onclick = function(){
			if(inputUrlEvent.value ==""){

			}else{
				var idEvent = inputUrlEvent.value.split('/')[4];
				requestAttending(FB.getAccessToken(),idEvent);
			}

			
		}

	})();
	function requestAttending (token, eventoid) {
	var xhr = new XMLHttpRequest();
	//var eventoid ="295534817257363?";
	var url = "https://graph.facebook.com/"+eventoid
	xhr.open("POST",url,true);
	
	//var token ="CAAKA1AIR2B0BAD4piJu0TZBCGxPycln7RNSl1Pu6BCPHoeXAcZCx5cYlTAvAeooF7KPg2AFHMxeOwMRa2BgH7rnORxkM4kZBXYZCZBsWy6aMcPYKQVGD3lQuEgyRkZAWnHELMBDaZA5RdOuKt7HlKP1muTEgrkDhxAZD";
	var params="fields=name%2Cattending.fields(gender)%2Ccover&method=GET&format=json&access_token="+token;
	xhr.send(params);

	xhr.onload = function(){
		var json = JSON.parse(xhr.responseText);
		console.log(json.attending.data.length);

		var sexoMasc= 0; 
		var sexoFem = 0; 
		for(var i=0,len = json.attending.data.length; i<len;i++){
			if(json.attending.data[i].gender == "female"){
				sexoFem+=1;
			}else{
				sexoMasc+=1;
			}
		}
		apresentaValores(sexoMasc, sexoFem);
	}
	}

	function apresentaValores(sexoMasc, sexoFem){
		var total = sexoMasc + sexoFem;
		var percentMasc = (sexoMasc/total)*100; 
		var percentFem = (sexoFem/total)*100;

		var divFem = document.getElementById("mulheres");
		var divMasc = document.getElementById("homens");
		var percentF = document.getElementById("percentF");
		var percentM = document.getElementById("percentM");
		var qtdF = document.getElementById("qtdF");
		var qtdM = document.getElementById("qtdM");

		percentF.innerText = percentFem.toFixed()+"%";
		percentM.innerText = percentMasc.toFixed()+"%";


		
		qtdF.innerText = sexoFem;
		qtdM.innerText = sexoMasc;
		divFem.style.height=((sexoFem/total)*20)+"em";
		divMasc.style.height=((sexoMasc/total)*20)+"em";
		divFem.style.marginTop = ((sexoMasc/total)*20)+"em";
		divMasc.style.marginTop = ((sexoFem/total)*20)+"em";


	}


