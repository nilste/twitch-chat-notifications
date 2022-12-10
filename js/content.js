new MutationObserver(mutations => {
	for(const mutation of mutations) {
		if (!mutation.addedNodes.length) { continue; }

		for(const addedNode of mutation.addedNodes) {
			if (addedNode.nodeName !== "DIV") { continue; }
			if (!addedNode.classList.contains("chat-line__message")) { continue; }

			const message = addedNode.querySelector(".message");
			if (!message) { continue; }

			chrome.storage.sync.get(["phrases"], result => {
				if (!Array.isArray(result.phrases)) { return; }

				for (const phrase of result.phrases) {
					if (message.innerText.includes(phrase)) {
						chrome.runtime.sendMessage("Found: " + phrase);
						break;
					}
				}
			});
		}
	}
 }).observe(document, { childList: true, subtree: true });