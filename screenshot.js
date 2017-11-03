// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setScreenshotUrl(url) {
  document.getElementById('target').src = url;
}

function setTabsTitle(title, link, description) {

  var dd = document.createElement('h2');
  dd.innerHTML=title;
  document.body.appendChild(dd);

  var pp = document.createElement('p');
  var dd = document.createElement('a');
  dd.innerHTML=description;
  dd.setAttribute('href',link);
  pp.appendChild(dd);
  document.getElementById('markup').appendChild(pp);

}
