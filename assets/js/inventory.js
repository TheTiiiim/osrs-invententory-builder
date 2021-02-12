
class OsrsInventory {
	#grid;
	#isInitilized;

	constructor(jquery) {
		this.#isInitilized = false;
		if (!jquery.hasClass("osrsInventory")) {
			throw Error("Jquery object must have class 'osrsInventory'");
		}
		if (jquery.length != 1) {
			throw Error("must select one jquery object");
		}
		this.$ = jquery;
	}

	init() {
		this.#grid = $("<div>").addClass("inventoryGrid");
		this.$.empty().append(this.#grid);
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 7; y++) {
				this.#grid.append($("<div>").addClass("inventorySlot"))
			}
		}
		this.#isInitilized = true;
	}

	addItem(item) {

		if (!this.#isInitilized) throw Error("Inventory not initilized")

		// find earliest empty div.inventorySlot
		let target;
		this.#grid.children().each(function (index) {
			if ($(this).children().length === 0) {
				target = $(this);
				return false;
			}
		});

		// append it 
		if (target) {
			target.append($("<img>").attr("src", getIconSrc(item.id)));
		} else {
			throw Error("inventory is full");
		}
		return this;
	}
}