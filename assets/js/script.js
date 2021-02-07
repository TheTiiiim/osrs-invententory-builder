$(function () {

	let inventory = new OsrsInventory($(".osrsInventory"));
	// get item data
	getItems()
		// create a table with it
		.then(function (data) {
			// lowercase (d)ataTable returns jquery object
			let table = $("#dataTable").DataTable({
				"data": data,
				"iDisplayLength": 50,
				"order": [[2, "asc"]],
				"rowCallback": function (row, data) {
					$('td:eq(0)', row).html(`<img src=${getIconSrc(data["id"])}>`);
					return row;
				},
				"columns": [
					{
						title: "Icon",
						data: "id",
						render: () => { return "" }
					},
					{
						title: "Name",
						data: "name"
					},
					{
						title: "Id",
						data: "id"
					},
					{
						title: "Type",
						data: "type"
					}
				]
			});

			// let table be resizable
			$(table.table().node()).css("width", "");

			return table;
		})
		// add event listener to table rows
		.then(function (table) {
			table.rows().nodes().to$().on("click", function (e) {
				inventory.addItem(table.row(this).data());
			});
		})

	function getItem(name) {
		name = name.toLowerCase();
		name = name.charAt(0).toUpperCase() + name.slice(1);
		const queryString = `https://api.osrsbox.com/items?where={"name":"${escape(name)}"}`;
		return $.get(queryString);
	}

	function getItems() {
		const queryString = `https://www.osrsbox.com/osrsbox-db/items-search.json`;
		return $.get(queryString).then(data => {
			// format object to array
			var array = [];
			Object.keys(data).forEach(function (key) {
				array.push(data[key]);
			});
			return array;
		});;
	}
});

function getIconSrc(id) {
	return `https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`;
}