

// to the api we go ...

export function getList() {
	return fetch("http://localhost:9000/states")
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

export async function updateLocation(item) {
	return await fetch("http://localhost:9000/states", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ name: item })
	})
		.then(data => data.json())
		.then(data => {
			console.log(data);
		})
		.catch(console.err);
		// .then(data => data.json())
}







