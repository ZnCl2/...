function process_array (table, array, ref_table, ref_id) {
    var database = {}
    for (let row of array) {
	for (let key of Object.keys(row)) {
	    if (Array.isArray(row[key])) {
		let destructured = process_array(key, row[key], table, row.id)
		for (let k of Object.keys(destructured))
		     for (let v of destructured[k]) {
			 database[k] = database[k] ? database[k] : []
			 database[k].push(v)
		     }
		delete row[key]
	    }
	}
	if (ref_table != undefined && ref_id != undefined)
	    row[ref_table + "_id"] = ref_id

	database[table] = database[table] ? database[table] : []
	database[table].push(row)
    }
    return database
}

function db_separate (global) {
    var database = {}
    for (let key of Object.keys(global)) {
	if (Array.isArray(global[key])) {
	    let subdb = process_array(key, global[key])
	    for (let table of Object.keys(subdb))
		for (let row of subdb[table]) {
		    database[table] = database[table] ? database[table] : []
		    database[table].push(row)
		}
	} else {
	    database.keyvalue = database.keyvalue ? database.keyvalue : []
	    database.keyvalue.push({ "key": key, "value": global[key] })
	}
    }
    return database
}


function db_join (database) {
    console.log("db_join call with: " + JSON.stringify(database, null, 2))
    var databaselinks = {} // For each table is a map id --> object
    for (let table of Object.keys(database)) {
	databaselinks[table] = {}
	for (let row of database[table])
	    databaselinks[table][row.id] = row
    }

    var global = {}
    for (let table of Object.keys(databaselinks)) {
	if (table == "keyvalue") {
	    for (let table_object of database[table])
		global[table_object.key] = table_object.value
	} else {
	    for (let table_id of Object.keys(databaselinks[table])) {
		// We check each key of the object and if it is of the form something_id we create the linking
		let table_object = databaselinks[table][table_id]
		let hadkeymatch = false
		for (let key of Object.keys(table_object)) {
		    let match = key.match(/^(?<table>[a-zA-Z0-9\_\-]+?)_id$/)
		    if (match && databaselinks[match.groups.table] != undefined) {
			hadkeymatch = true
			let linkfrom = databaselinks[match.groups.table][table_object[key]]
			linkfrom[table] = linkfrom[table] ? linkfrom[table] : []
			linkfrom[table].push(table_object)
			delete table_object[key]
		    }
		}
		if (!hadkeymatch) {
		    global[table] = global[table] ? global[table] : []
		    global[table].push(table_object)
		}
	    }
	}
    }
    return global
}
