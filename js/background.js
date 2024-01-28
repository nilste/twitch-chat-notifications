
chrome.runtime.onInstalled.addListener(function() {
	// Set default phrases if none exist
	chrome.storage.sync.get("phrases", function(result) {
		if (!result.phrases) {
			chrome.storage.sync.set({
				phrases: ["!join"]
			});
		}
	});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// Create notification
	chrome.notifications.create({
		type: "basic",
		iconUrl: "../images/icon.png",
		title: "New match in Twitch chat",
		message: message,
	});

	// Go to the tab by clicking on the notification
	chrome.notifications.onClicked.addListener(function() {
		chrome.tabs.update(sender.tab.id, { active: true });
		chrome.windows.update(sender.tab.windowId, { focused: true });
	});

	// Draw attention to the status bar
	chrome.windows.update(sender.tab.windowId, { drawAttention: true });
});
