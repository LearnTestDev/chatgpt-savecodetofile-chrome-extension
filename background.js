chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'downloadFile') {
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            saveAs: true,
            conflictAction: 'overwrite',
        });
    }
});
