Zodiac
=================
The short term goal of Zodiac is to become a personal time reporting tool that will help you with your daily time reporting tasks. The long term goal is for Zodiac to export to a variety of time reporting systems making your time reporting seamlessly integrate with various time reporting tools. To achive this contributions to the project are going to be needed. Any one interested in contributing may email me on Pablo.Karlsson@gmail.com

###Requirements
* Chrome browser.
* Chrome synchronization needs to be enabled.
* Localstorage needs to be enabled.

###Getting started
* Install the plugin from [Chrome webstore] (https://chrome.google.com/webstore/) 
* Click The quick button next to the chrome settings dropdown
* Click the settings button for the app
* Add the accounts you need to time report on
* Set up your default start and stop times
* Start your daily time reports

###Disclaimer
This software is provided as is any one is free to use it. Copies of this software fetched from un official sources like for instance this git repository are not concidered functional. All releases are found on chrome webstore.

The author of this extension can not be held liable for any harm caused by the useage of this software.


###Development setup
To install this software as a developer do the following.

* git clone https://github.com/PabloK/Zodiac.git
* Open chrome go to chrome://extensions
* Check the "development mode" checkbox.
* Press "Load unpacked extension".
* Browse to the folder where you cloned the extension and select it.
* Activate the extension by ticking the checkbox.

###Limitations
Because of chrome sync limitations the app can maximally store 92 days of entries and maximally 20 time-boxes per day. After 92 days data the oldest day data will start being removed.

###License
The MIT License (MIT)

Copyright (c) 2014 Pablo Karlsson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.