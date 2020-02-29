class KeyHandler {
	constructor(keys) {
		this.keys = keys;
		this.currentPos = 0;
		this.handlers = [];
		this.bound = new Map();
	}

	on(handler) {
		this.handlers.push(handler);
	}
	emit() {
		this.handlers.forEach(f => f());
	}

	handle(key) {
		if(this.keys[this.currentPos] == key) {
			this.currentPos++;
			if(this.currentPos >= this.keys.length) {
				this.currentPos = 0;
				this.emit();
			}
		} else if(this.keys[this.currentPos - 1] == key) {
			// Probably repeating
		} else if(this.keys[0] == key) {
			// Start with the beginning
			this.currentPos = 1;
			if(this.currentPos >= this.keys.length) {
				this.currentPos = 0;
				this.emit();
			}
		} else {
			this.currentPos = 0;
		}
	}

	bind(object) {
		if(this.bound.has(object)) {
			// Don't bind twice
			return;
		}

		let handler = e => {
			this.handle(e.key);
		};
		this.bound.set(object, handler);
		object.addEventListener("keypress", handler);
	}
	unbind(object) {
		if(!this.bound.has(object)) {
			return;
		}

		object.removeEventListener("keypress", this.bound.get(object));
		this.bound.delete(object);
	}
	unbindAll() {
		for(let object of this.bound) {
			this.unbind(object);
		}
	}
};