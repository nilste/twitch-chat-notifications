
document.addEventListener("DOMContentLoaded", () => {
	// Fill data from storage
	chrome.storage.sync.get(["phrases"], function(result) {
		if (result.phrases) {
			document.querySelector("#phrases").value = result.phrases.join("\n");
		}
	});
});

document.querySelector('#save-button').addEventListener("click", () => {
	// Save new settings
	let phrases = document.querySelector("#phrases").value.split("\n");

	chrome.storage.sync.set({ phrases: phrases }, function() {
		const status = document.querySelector("#status");
		status.textContent = "Settings saved!";
		setTimeout(function() {
			status.textContent = "";
		}, 1250);
	});
});