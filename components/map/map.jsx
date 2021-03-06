var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return {}
	},
	componentDidMount : function(){
		var that = this;
		this.state.grouponLoc = new google.maps.LatLng(-33.4123142, -70.5817503);
		this.state.metroLoc = new google.maps.LatLng(-33.4123142, -70.5817503,17);

		var options = {
			zoom: 16,
			center: this.state.grouponLoc,
		    disableDefaultUI: true,
		    scrollwheel: false
		};
		this.state.directionsService = new google.maps.DirectionsService;
		this.state.directionsDisplay = new google.maps.DirectionsRenderer;

		var map = new google.maps.Map(document.getElementById('map_canvas'), options);
		this.state.map = map;
		this.setState(this.state);
		this.state.directionsDisplay.setMap(this.state.map);

		this.state.directionsService.route({
			origin: that.state.metroLoc,
			destination: that.state.grouponLoc,
			travelMode: google.maps.TravelMode['WALKING']
			}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				that.state.directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});

	},
	render: function() {
		return(
			<div className="g-maps col-xs-12 no-padding-v" id="venue">
        		<div className="map" id="map_canvas"></div>
			</div>
		);
	}
});
