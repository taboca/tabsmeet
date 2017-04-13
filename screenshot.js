// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setScreenshotUrl(url) {
  document.getElementById('target').src = url;
}

function setTabsTitle(title) { 
 
  var dd = document.createElement('h2');
  dd.innerHTML=title;
  document.body.appendChild(dd);
}
