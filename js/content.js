new MutationObserver(mutations => {
	for(const mutation of mutations) {
		if (!mutation.addedNodes.length) { continue; }

		for(const addedNode of mutation.addedNodes) {
			if (addedNode.nodeName !== "DIV") { continue; }
			if (!addedNode.classList.contains("chat-line__message")) { continue; }

			const messageNode = addedNode.querySelector(".message");
			if (!messageNode) { continue; }

			chrome.storage.sync.get(["phrases"], result => {
				if (!Array.isArray(result.phrases)) { return; }

				const message = messageNode.innerText;

				for (const phrase of result.phrases) {
					if (message.toLowerCase().includes(phrase.toLowerCase())) {
						chrome.runtime.sendMessage(message);
						messageNode.classList.add("reply-line--mentioned");
						break;
					}
				}
			});
		}
	}
 }).observe(document, { childList: true, subtree: true });