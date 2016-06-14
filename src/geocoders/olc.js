var L = require('leaflet'),
	Util = require('../util'),
	OpenLocationCode = require('./openlocationcode');

module.exports = {
	class: L.Class.extend({
		options: {
		},

		initialize: function() {
		},

		geocode: function(query, cb, context) {
			//convert a code to a location
			var results = [];
			var res = OpenLocationCode.decode(query);
			var latLngCenter = L.latLng(res.latitudeCenter,res.longitudeCenter);
			var latLngNE = L.latLng(res.latitudeHi,res.longitudeHi);
			var latLngSW = L.latLng(res.latitudeLo,res.longitudeLo);
			var latLngBounds = L.latLngBounds(latLngSW, latLngNE);
			results[0] = {
						name: query,
						bbox: latLngBounds,
						center: latLngCenter
					};
			cb.call(context, results);
		},

		suggest: function(query, cb, context) {
			return this.geocode(query, cb, context);
		},

		reverse: function(location, scale, cb, context) {
			//convert location to code
			var results = [];
			var res = OpenLocationCode.encode(location.lat,location.lng);
			var latLng = L.latLng(location.lat,location.lng);
			var latLngBounds = L.latLngBounds(latLng, latLng);
			results[0] = {
						name: res,
						bbox: latLngBounds,
						center: latLng
					};
			cb.call(context, results);
		}
	}),

	factory: function() {
		return new L.Control.Geocoder.OLC();
	}
};
