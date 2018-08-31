//https://pluginarchive.com/wordpress/quiz-master-next/v/5-0-7/0-5


//XMLRequest to get question information
function getQuestion() {
	client=new XMLRequest();
	
	client.open('GET','http://developer.cege.ucl.ac.uk:30287/getGeoJSON');
	client.onreadystatechange=questionResponse;
	client.send();
}
function questionResponse() {
	if(client.readyState==4) {
		var questiondata =client.responseText;
		loadquestionlayer(questiondata);
	}
}
//array for proximity
var app_array=[];
//Conver to json
function loadquestionlayer(questiondata) {
	var questionjson = JSON.parse(questiondata);
	var questionlayer = L.geoJson(questionjson,
	{
		//holds makers for question and answer- for application use only
		onEachFeature:function (feature,layer) {
			layer.bindPopup(feature.properties.question+'<div> <form id="Qform" style="text-allign:centre"> <input type="radio" name="answer" id=check1 value="one" checked>'+feature.properties.answerone+ '<br> <input type="radio" name="answer" id=check2 value="two">'+feature.properties.answertwo+ '<br> <input type ="radio" name="answer" id=check3 value="three">'+feature.properties.answerthree+ '<br> <input type="radio" name="answer" id=check4 value="four">'+ feature.properties.answerfour +<br> </form></div>				
		},
		
		//point-to-layer to create points
		pointToLayer: function (feature, latlng)
		{
			quiz_marker=L.marker(latlng, {icon:testMarkerGray});
			app_array.push(quiz_marker);
			return quiz_marker
		},
	}). addTo(mymap);
	mymap.fitBounds(questionlayer.getBounds());
}
// check answer and provide answer
function answered() {
	var chosen = document.querySelector('input[name="answer"]:checked').value;
	var correct = document.getElementById("hidden").value
	if(chosen==correct){
		alert('Yay! Correct! :) ');
		return true;
	}
	else{
		alert('Sorry, Wrong answer, Try again :( ');
		return true;
	}
}
//upload answer to the database
function startAnswerUpload() {
	var question = document.getElementById("question").value;
	var answer = document.querySelector('input[name="answer"]:checked').value;
	var correct = document.getElementById("hidden").value;
	var postString = "question="+question+"&answer="+answer+"&correct="+correct;
	processAnswer(postString);
}
var client;
function processAnswer(postString) {
	client = new XMLRequest();
	client.open('POST','http://developer.cege.ucl.ac.uk:30287/uploadAnswer',true);
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = answerUploaded;
	client.send(postString);
}

//wait for th response from the server and process response on recipet
function answerUploaded() {
	if(client.readyState==4) {
		alert ("Answer Uploaded");
	}
}






