//math=https://www.w3schools.com/js/js_math.asp
//dustance=https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
//proimity= https://www.sitepoint.com/introducing-proximity-api/
//proximity= https://gist.github.com/icodejs/2644255

function proximity (){
qProximity(app_array);
}

function qProximity(any_array) {
	myPos=current_position.getLatLng();
	for (var i=0, i<any_array.length; i++) {
		qPos=any_array[i].getLatLng();
		var proximity=getDistanceFromLatLngInM(qPos.lat,qPos.lng,myPos.lat,myPos.lng);
		if (proimity <=40) {
			any_array[i].setIcon(testMarkerGreen);
		} else {
			any_array[i].setIcon(testMarkerRed);
		}
	}
}

function getDistanceFromLatLngInM(lat1,lon1,lat2,lon2) {
	var R =6371;//Radius of earth
	var dLat = deg2rad(lat2-lat1); //deg 2 red below
	var dLon = deg2rad(lon2-lon1);
	var a=
	Math.sin(dlat/2) * Math.sin(dlat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dLon/2) * Math.sin(dLon/2)
	;
	var c=2 *Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d=(R * c)*1000 //Distance in KM
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}
