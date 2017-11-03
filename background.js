// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var id = 100;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function(e) {

let list = [];
let cc=0;
chrome.tabs.query({highlighted: true}, function (tabs) {
 for(item in tabs) {
	cc++;
 	let tab = tabs[item];
	//list.push(tab.url + '['+cc+']');
	list.push({'markdown':'['+tab.title+']('+ tab.url + ')\n\n', 'link': tab.url, 'description':tab.title});
 }
});


  chrome.tabs.captureVisibleTab(function(screenshotUrl) {

    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
    var targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
      if (tabId != targetId || changedProps.status != "complete")
        return;

      // Passing the above test means this is the event we were waiting for.
      // There is nothing we need to do for future onUpdated events, so we
      // use removeListner to stop getting called when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listener);

      // Look through all views to find the window which will display
      // the screenshot.  The url of the tab which will display the
      // screenshot includes a query parameter with a unique id, which
      // ensures that exactly one view will have the matching URL.
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {


              chrome.tabs.getAllInWindow(null, function(tabs){
                  //for (var i = 0; i < tabs.length; i++) {
                  for (var i = 0; i < list.length; i++) {
                        //view.setTabsTitle(tabs[i].title + '/' + tabs[i].active);
                        var item = list[i];
                        view.setTabsTitle(item['markdown'], item['link'], item['description'] )

                  }
              });


              view.setScreenshotUrl(screenshotUrl);
              break;

        }
      }
    });

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      targetId = tab.id;
    });
  });
});
