
class OsrsInventory {
	constructor(jquery) {
		if (!jquery.hasClass("osrsInventory")) {
			throw Error("Jquery object must have class 'osrsInventory'");
		}
		if (jquery.length != 1) {
			throw Error("must select one jquery object");
		}
		this.$ = jquery;
	}

	addItem(item) {
		this.$.append($("<img>").attr("src", getIconSrc(item.id)));
		return this;
	}
}