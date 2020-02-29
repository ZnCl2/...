// TODO: call this library zeroquery?

class DbQuery {
	constructor(tableName, modelType) {
		this.query = "";
		this.tableName = tableName;
		this.modelType = modelType;
		this.isLimited = false;
		//console.log(this.modelType);
	}

	select() {
		this.query = "SELECT ";

		if (arguments.length > 0) {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] == null) continue;
				if (i != arguments.length - 1) this.query += arguments[i] + ", ";
				else this.query += arguments[i] + " ";
			}
		} else {
			this.query += "*";
		}

		return this.from();
	}

	from() {
		this.query += " FROM " + this.tableName;
		return this;
	}

	// TOOD: In Laravel, this returns a collection
	all() {
		return this.select();
	}

	limit(i) {
		if (this.query == "") {
			this.select();
		}

		this.query += " LIMIT " + i;
		this.isLimited = true;
		return this;
	}

	where(column, value) { // Make this add AND or OR when multiple ones
		if (this.query == "") {
			this.select();
		}

		this.query += " WHERE " + column + "=";
		if (typeof value == 'string') {
			this.query += "'" + value + "'";
		} else {
			this.query += value;
		}
		return this;
	}

	andWhere(column, value) {
		if (this.query == "") {
			this.select();
		}

		this.query += " AND " + column + "=";
		if (typeof value == 'string') {
			this.query += "'" + value + "'";
		} else {
			this.query += value;
		}
		return this;
	}

	orderBy(column, direction) {
		if (this.query == "") {
			this.select();
		}

		this.query += " ORDER BY " + column;
		if (direction == 'desc' || 'DESC') {
			this.query += " DESC";
		} else {
			this.query += " ASC";
		}
		return this;
	}

	// take(i) { } // TODO: Does this exist?

	// TODO: find(1) and first()
	// Also allow find([1, 2, 3])

	// TODO: count(), max(), and sum()

	leftJoinWhere(tableName, column, column2) {
		// TODO
	}

	leftJoinUsing(tableName, column) {
		if (this.query == "") {
			this.select();
		}

		this.query += " LEFT JOIN " + tableName + " USING (" + column + ")";
		return this;
	}

	leftJoinJson() {
		return this.leftJoinUsing('json', 'json_id');
	}

	log(prefix = null) {
		console.log((prefix || "") + this.query);
		return this;
	}

	// TODO: newOnEmpty - creates new model if a model wasn't found

	// TODO: Not sure if this will work with a limit of 1.
	mapRowsToModel(rows) {
		var newRows = []
		for (var i = 0; i < rows.length; i++) {
			let row = rows[i];
			// Allows you to use the model's methods (for example, save)
			let newRow = new (this.modelType);

			for (var property in row) {
				if (row.hasOwnProperty(property)) {
					// Used so you can limit that columns that go
					// into the model, and used to make the saving
					// function work.
					if (newRow.columnsDefaults.hasOwnProperty(property)) {
						newRow[property] = row[property];

						//if (property == "directory") {
							// TODO: Add setting to automatically get auth address from the directory field
						//}
					}
				}
			}

			newRows.push(newRow);
		}

		return Promise.resolve(newRows);
	}

	// TOOD: In Laravel, this returns a collection
	get(zeroframe) {
		if (this.query == "") return Promise.reject("Empty query.");
		return zeroframe.cmdp('dbQuery', [this.query])
			.then(this.mapRowsToModel.bind(this));
	}

	// TODO: Delete on a query - on a set of models
	delete() {

	}
}

class Model {
	static get tableName() { return "" }
	static get zeroFrame() { return null; }

	constructor(columnsDefaults) {
		this.columnsDefaults = columnsDefaults;
	}

	static all() {
		//return this.zeroframe.cmdp('dbQuery', ["SELECT * FROM " + this.tableName]);
		return new DbQuery(this.tableName, this).all();
	}

	static select() {
		return new DbQuery(this.tableName, this).select(...arguments);
	}

	// Inserts new model into database, or updates existing model.
	save() {
		// TODO
	}

	delete() {

	}

	// Delete by key
	static destroy() {

	}
}
Model.tableName = "";

module.exports = { Model, DbQuery };