class DropDown {
	constructor(node, position) {
		this.node = document.createElement("div");
		this.node.className = node.className + " dropdown";
		this.node.id = node.id;

		this.icon = document.createElement("div");
		this.icon.className = "dropdown-icon";
		this.node.appendChild(this.icon);

		this.options = document.createElement("div");
		this.options.className = "dropdown-options";
		Array.prototype.slice.call(node.children).forEach(option => {
			let div = document.createElement("div");
			div.className = "dropdown-option " + option.className;
			div.innerHTML = option.innerHTML;
			div.setAttribute("value", option.getAttribute("value") || "");
			this.options.appendChild(div);
		});
		this.node.appendChild(this.options);

		node.parentNode.replaceChild(this.node, node);

		this.handlers = [];

		this.setValue(this.options.children[0]);

		this.position = position || "left";

		this.initMouse();
	}

	addEventListener(event, func) {
		if(event == "change") {
			this.handlers.push(func);
		}
	}
	removeEventListener(event, func) {
		if(event == "change") {
			if(this.handlers.indexOf(func) > -1) {
				this.handlers.splice(this.handlers.indexOf(func), 1);
			}
		}
	}
	emitChange() {
		let event;
		try {
			event = new CustomEvent("change");
		} catch(e) {
			event = document.createEvent("CustomEvent");
			event.initCustomEvent("change");
		}

		this.node.dispatchEvent(event);

		this.handlers.forEach(func => func(event));
	}

	open() {
		if(DropDown.openDropdown) {
			DropDown.openDropdown.close();
		}
		DropDown.openDropdown = this;

		this.options.style.display = "inline-block";

		let rect = this.node.getBoundingClientRect();
		let optionsRect = this.options.getBoundingClientRect();

		let x = 0;
		let y = rect.top + rect.height + 8;

		if(this.position == "right") {
			x = rect.left + rect.width - optionsRect.width;
		} else if(this.position == "left" || true) { // Not a typo, showing valid values
			x = rect.left;
		}

		this.options.style.left = x + "px";
		this.options.style.top = y + "px";
	}
	close() {
		this.options.style.display = "none";
	}

	initMouse() {
		let openClickHandler = e => {
			this.node.removeEventListener("click", openClickHandler);
			setTimeout(() => {
				document.body.addEventListener("click", closeClickHandler);
			}, 0);

			this.open();

			e.preventDefault();
			e.stopPropagation();
		};
		let closeClickHandler = () => {
			this.node.addEventListener("click", openClickHandler);
			document.body.removeEventListener("click", closeClickHandler);
			this.close();
		};

		this.node.addEventListener("click", openClickHandler);

		Array.prototype.slice.call(this.options.children).forEach(option => {
			option.onclick = e => {
				this.setValue(option);
				closeClickHandler();

				e.preventDefault();
				e.stopPropagation();
			};
		});
	}

	getOptionValue(option) {
		return option.getAttribute("value") === null ? option.innerHTML : option.getAttribute("value");
	}
	setValue(option) {
		let value = this.getOptionValue(option);

		this.value = value;
		this.node.value = value;
		this.node.setAttribute("value", value);
		this.emitChange();
	}
};

DropDown.openDropdown = null;