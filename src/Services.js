

// to the api we go ...

export function getList() {
	return fetch("http://localhost:9000/items")
		.then(data => data.json())
}

export function setItem(item) {
	return fetch("http://localhost:9000/items", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ name: item })
	})
		.then(data => data.json())
}

export function updateLocation(item) {
	return fetch("http://localhost:9000/states", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ name: item })
	})
		.then(data => data.json())
		.then(data => {
			console.log(data)
		})
		.catch(console.err);
		// .then(data => data.json())
}







