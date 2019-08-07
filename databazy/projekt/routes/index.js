var express = require("express");
var router = express.Router();
var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres@localhost:5432/projekt-PDT');
var bodyParser = require("body-parser");
var GeoJSON = require('geojson');



router.get("/", function(req, res){
	res.render("landing");
});

router.post("/clicked_nearest", function(req, res){
	console.log("DOstal som post req");
	console.log(req.body);
	var point = 'ST_Point(' + req.body.marker_lng + ',' + req.body.marker_lat + ')';
	var distance = req.body.min_distance;
	var limit_roads = req.body.number;
	console.log(point);
	var query = "SELECT ST_AsGeoJSON(ST_Transform(routes.way,4326)) as lines, routes.name, routes.crossing_area, \
	ST_distance(ST_Transform(routes.way,3857),ST_Transform(ST_SetSRID(" + point + ",4326), 3857)) as distance \
	FROM planet_osm_line as routes \
	where(routes.route='bicycle' or routes.bicycle='yes') \
	and ST_Intersects( ST_Transform(way,3857), ST_Buffer(ST_Transform(ST_SetSRID(" + point + ",4326), 3857), "+distance+")) \
	ORDER BY distance asc Limit "+limit_roads;
	console.log(query);
	db.any(query)
	.then(function(result){
		console.log("Success");
		//json_data = GeoJSON.parse(result);
		//console.log(result);
		var roads = [];
		for (var i in result){
			roads.push(
			{
				track: GeoJSON.parse(JSON.parse(result[i].lines), {'LineString': 'coordinates'}),
				crossing_area: result[i].crossing_area 
			}
			);
		}
		console.log(roads);
		//console.log(Object.keys(result[0]['data']));
		//console.log(result[0]['data']['coordinates']);
		res.send({roads: roads})
	})
	.catch(function(err){
		console.log("Error");
		console.log(err.message);
	});
});

router.post("/nearest_amenities", function(req, res){
	console.log("DOstal som post req");
	console.log(req.body);
	var distance_part = " and ST_Dwithin(ST_Transform(p.way,3857),cesta.way," +String(req.body.min_distance)+")";
	var where_part = "WHERE (";
		for (var i in req.body.choices){
			where_part += "p.amenity = '"+ req.body.choices[i]+"'";
			if(i != req.body.choices.length - 1){
				where_part += " or ";
			}else{
				where_part += ")";
}
}
var query = "with cesta as ( \
	SELECT ST_Transform(way,3857) as way, crossing_area as crossing_area \
	from planet_osm_line \
	where (route='bicycle' or bicycle='yes') \
	) \
SELECT distinct ST_AsGeoJSON(ST_Transform(p.way,4326)) as point_data, ST_AsGeoJSON(ST_Transform(cesta.way,4326)) as track_data, p.amenity, cesta.crossing_area \
from cesta \
cross join planet_osm_point p " + where_part + distance_part + " Limit 1000";
console.log(query);
db.any(query)
.then(function(result){
	console.log("Success");
	roads = [];
	for (var i in result){
		roads.push(
		{
			track: GeoJSON.parse(JSON.parse(result[i].track_data), {'LineString': 'coordinates'}),
			point: GeoJSON.parse(JSON.parse(result[i].point_data), {'LineString': 'coordinates'}),
			crossing_area: result[i].crossing_area,
			type: result[i].amenity
		}
		);
	}
	console.log(roads);
	res.send({roads: roads})
})
.catch(function(err){
	console.log("Error");
	console.log(err.message);
});
});

router.post("/clicked_length", function(req, res){
	console.log("DOstal som post req");
	console.log(req.body);
	var query = "SELECT ST_AsGeoJSON(ST_Transform(roads.way,4326)) as track_data, roads.name, ST_Length(ST_Transform(roads.way, 4326)::geography)/1000 AS roads_length, roads.crossing_area \
	from planet_osm_line as roads \
	where(roads.route='bicycle' or roads.bicycle='yes')  and (ST_Length(ST_Transform(roads.way, 4326)::geography) < "+req.body.min_length+")\
	Order by roads_length desc Limit " + req.body.number
	db.any(query)
	.then(function(result){
		console.log("Success");
		roads = [];
		for (var i in result){
			roads.push(
			{
				track: GeoJSON.parse(JSON.parse(result[i].track_data), {'LineString': 'coordinates'}),
				roads_length: result[i].roads_length,
				crossing_area: result[i].crossing_area
			}
			);
		}
		res.send({roads: roads})
	})
	.catch(function(err){
		console.log("Error");
		console.log(err.message);
	});
});

router.post("/clicked_length", function(req, res){
	console.log("DOstal som post req");
	console.log(req.body);
	var query = "SELECT ST_AsGeoJSON(ST_Transform(roads.way,4326)) as track_data, roads.name, ST_Length(ST_Transform(roads.way, 4326)::geography)/1000 AS roads_length, roads.crossing_area \
	from planet_osm_line as roads \
	where(roads.route='bicycle' or roads.bicycle='yes')  and (ST_Length(ST_Transform(roads.way, 4326)::geography) < "+req.body.min_length+")\
	Order by roads_length desc Limit " + req.body.number
	db.any(query)
	.then(function(result){
		console.log("Success");
		roads = [];
		for (var i in result){
			roads.push(
			{
				track: GeoJSON.parse(JSON.parse(result[i].track_data), {'LineString': 'coordinates'}),
				roads_length: result[i].roads_length,
				crossing_area: result[i].crossing_area
			}
			);
		}
		res.send({roads: roads})
	})
	.catch(function(err){
		console.log("Error");
		console.log(err.message);
	});
});

router.get("/clicked_zones", function(req, res){
	console.log("DOstal som post req");
	var query = "SELECT ST_AsGeoJSON(ST_Transform(parks.way,4326)) as park_data, parks.name as park_name, st_area(parks.way) as park_zone  from planet_osm_polygon as parks where parks.boundary='national_park'"
	db.any(query)
	.then(function(result){
		console.log("Success");
		parks = [];
		for (var i in result){
			parks.push(
			{
				park: GeoJSON.parse(JSON.parse(result[i].park_data), {'Polygon': 'coordinates'}),
				park_name: result[i].park_name,
				park_area: result[i].park_zone
			}
			);
		}
		res.send({parks: parks})
	})
	.catch(function(err){
		console.log("Error");
		console.log(err.message);
	});
});

module.exports = router;