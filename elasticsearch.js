var { Client } = require('@elastic/elasticsearch');
var elasticClient = new Client({
	node: 'http://localhost:9200'
});

module.exports = {
	ping: function (req, res) {
		elasticClient.ping({
			requestTimeout: 30000,
		}, function (error) {
			if (error) {
				res.status(500)
				return res.json({ status: false, msg: 'Elasticsearch cluster is down!' })
			} else {
				res.status(200);
				return res.json({ status: true, msg: 'Success! Elasticsearch cluster is up!' })
			}
		});
	},

	// 1. Create index
	initIndex: function (req, res, indexName) {

		elasticClient.indices.create({
			index: indexName
		}).then(function (resp) {
			// console.log(resp);
			res.status(200)
			return res.json(resp)
		}, function (err) {
			// console.log(err.message);
			res.status(500)
			return res.json(err)
		});
	},

	// 2. Check if index exists
	indexExists: function (req, res, indexName) {
		elasticClient.indices.exists({
			index: indexName
		}).then(function (resp) {
			// console.log(resp);
			res.status(200);
			return res.json(resp)
		}, function (err) {
			// console.log(err.message);
			res.status(500)
			return res.json(err)
		});
	},

	// 3.  Preparing index and its mapping
	initMapping: function (req, res, indexName, docType, payload) {

		elasticClient.indices.putMapping({
			index: indexName,
			type: "document",
			include_type_name: true,
			body: {
				properties: payload
			}
		}).then(function (resp) {
			res.status(200);
			return res.json(resp)
		}, function (err) {
			res.status(500)
			return res.json(err)
		});
	},

	// 4. Add/Update a document
	addDocument: function (req, res, indexName, _id, docType, payload) {
		elasticClient.index({
			index: indexName,
			type: docType,
			id: _id,
			body: payload
		}).then(function (resp) {
			// console.log(resp);
			res.status(200);
			return res.json(resp)
		}, function (err) {
			// console.log(err.message);
			res.status(500)
			return res.json(err)
		});
	},



	// 5. Update a document
	updateDocument: async function(req, res, indexName, _id, docType, payload){
		try {
			const result = await elasticClient.update({
				index: indexName,
				type: docType,
				id: _id,
				doc: payload
			  })
			  res.status(200);
			  res.json(result);
		} catch (e) {
			res.status(500);
			res.json(e.message);
		}
	},

	// 6. Search
	search: function (req, res, indexName, docType, payload) {
		elasticClient.search({
			index: indexName,
			type: docType,
			body: payload
		}).then(function (resp) {
			console.log(resp);
			return res.json(resp)
		}, function (err) {
			console.log(err.message);
			return res.json(err.message)
		});
	},


	/*
	 *	[xxxxxxxxxxxxxxxxx=-----  DANGER AREA [RESTRICTED USE] -----=xxxxxxxxxxxxxxxxxxxxx]
	 */

	// Delete a document from an index
	deleteDocument: async function (req, res, index, _id, docType) {
		try {
			const result = await elasticClient.delete({
				index: index,
				type: docType,
				id: _id,
			})
			res.status(200);
			res.json(result);
		} catch (e) {
			res.status(500);
			res.json(e.message);
		}
	},

	// Delete all
	deleteIndex: async function (req, res, index) {
		try {
			const result = await elasticClient.indices.delete({
				index
			})
			res.status(200);
			res.json(result);
		} catch (e) {
			console.log(e)
			res.status(500);
			res.json(e.message);
		}
	},

	// [xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]
};
