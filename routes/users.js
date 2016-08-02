var express = require('express');
var router = express.Router();
var auth = require('./auth');
var db = require('seraph')({
	user: process.env.DB_USER,
	pass: process.env.DB_PASS
});

router.route('/')

	// return all users
	.get(auth.ensureAuthenticated, auth.ensureSuperAdmin, function(req, res){
		
		var query = [
			'MATCH (u:user) WITH u',
			'OPTIONAL MATCH (u)-[c:CREATED]->(p) WITH u, collect({id: id(p), contributionTypes: p.contributionTypes}) AS contributions',
			'OPTIONAL MATCH (u)-[v:VIEWED]->(e) WITH u, contributions, collect({count: v.count, id: id(e)}) AS views',
			'OPTIONAL MATCH (u)-[r:UPLOADED]->(f) WITH u, contributions, views, collect({id: id(f), type:f.type}) AS uploads',
			'OPTIONAL MATCH (m)-[z:MEMBER]->(u) WITH u, contributions, views, uploads, collect({role: z.role, id: id(m)}) AS modules',
			'RETURN {id: id(u), year: u.year, nusOpenId: u.nusOpenId, canEdit: u.canEdit, name: u.name, lastLoggedIn: u.lastLoggedIn, avatar: u.avatar, superAdmin: u.superAdmin, contributions: contributions, views: views, uploads: uploads, modules: modules}'
		].join('\n');

		db.query(query, function(error, result){
			if (error)
				console.log('Error retrieving all users: ', error);
			else
				res.send(result);
		});

	})

	// add a new user
	.post(auth.ensureAuthenticated, auth.ensureSuperAdmin, function(req, res){
		
		var query = [
			'CREATE (u:user {name: {nameParam}, nusOpenId: {nusOpenIdParam}, canEdit: {canEditParam}, year: {yearParam}, lastLoggedIn: {lastLoggedInParam}, superAdmin: {superAdminParam}})',
			'RETURN u'
		].join('\n');

		var params = {
			nameParam: req.body.name,
			nusOpenIdParam: req.body.nusOpenId,
			canEditParam: req.body.canEdit,
			yearParam: req.body.year,
			lastLoggedInParam: Date.now(),
			superAdminParam: false
		};

		db.query(query, params, function(error, result){
			if (error)
				console.log('Error creating new user: ', error);
			else
				res.send(result[0]);
		});

	});

router.route('/:id')

	// return a user
	.get(auth.ensureAuthenticated, auth.ensureSuperAdmin, function(req, res){
			var query = [
				'MATCH (u:user) WHERE ID(u)='+req.params.id+ ' WITH u',
				'OPTIONAL MATCH (u)-[c:CREATED]->(p) WITH u, collect({id: id(p), contributionTypes: p.contributionTypes}) AS contributions',
				'OPTIONAL MATCH (u)-[v:VIEWED]->(e) WITH u, contributions, collect({count: v.count, id: id(e)}) AS views',
				'OPTIONAL MATCH (u)-[r:UPLOADED]->(f) WITH u, contributions, views, collect({id: id(f), type:f.type}) AS uploads',
				'OPTIONAL MATCH (m)-[z:MEMBER]->(u) WITH u, contributions, views, uploads, collect({role: z.role, id: id(m)}) AS modules',
				'RETURN {id: id(u), year: u.year, nusOpenId: u.nusOpenId, canEdit: u.canEdit, name: u.name, lastLoggedIn: u.lastLoggedIn, avatar: u.avatar, superAdmin: u.superAdmin, contributions: contributions, views: views, uploads: uploads, modules: modules}'
			].join('\n');

			db.query(query, function(error,result){
				if (error)
					console.log('Error getting user of id ' + req.params.id + ' : ' + error);
				else
					res.send(result[0]);
			});	
	})

	// update a user
	.put(auth.ensureAuthenticated, auth.ensureSuperAdmin, function(req, res){

	})

	// delete a user
	.delete(auth.ensureAuthenticated, auth.ensureSuperAdmin, function(req, res){

	});


module.exports = router;
