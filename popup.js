async function getHistoryAndBookmarks() {
    return new Promise((resolve) => {
      chrome.history.search({ text: '', maxResults: 500 }, function(historyItems) {
        chrome.bookmarks.getTree(function(bookmarkItems) {
          resolve({
            history: historyItems,
            bookmarks: bookmarkItems
          });
        });
      });
    });
  }
  
  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('exportBtn');
    btn.addEventListener('click', async () => {
      const data = await getHistoryAndBookmarks();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      downloadJSON(data, `history_bookmarks_${timestamp}.json`);
    });
  });