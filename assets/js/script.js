$(function () {
	// let search = prompt("item name")
	// getItem(search).then(console.log);

	getItems().then(data => {
		$("#dataTable").DataTable({
			"data": data,
			"iDisplayLength": 50,
			"order": [[2, "asc"]],
			"fnRowCallback": function (nRow, aData, iDisplayIndex) {
				$('td:eq(0)', nRow).html(`<img src=${getIconSrc(aData["id"])}>`);
				return nRow;
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
	});

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

	function getIconSrc(id) {
		return `https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`;
	}
});