## CallerJS

Provides Ruby stack trace experience to JS.

Given line 189 at /assets/app/common/services/BaseService.js inside the GET function

```javascript
caller.log()
```

When it is called from an angular application, and stack comes through some files whose paths are matched against `caller.config.appSources`
You get in your javascript console something like:

```
http://localhost/assets/app/common/services/BaseService.js:189:17 `ConfluenceService.BaseService.GET' called:
    from http://localhost/assets/app/common/services/RestService.js:24:21 in `ConfluenceService.RestService.get'
    from http://localhost/assets/app/common/services/RestService.js:32:21 in `ConfluenceService.RestService.search'
    from http://localhost/assets/app/common/ctrls/BaseSearchCtrl.js:35:14 in `{anonymous}() (k.BaseSearchCtrl.)$scope.search'
    from http://localhost/assets/app/confluence/ConfluenceSearchCtrl.js:72:12 in `new ConfluenceSearchCtrl'
```

## Install

### Bower

```
bower install caller-js --save
```
Include stacktrace.js and caller.js files on your page:

```html
<script src="/bower_components/stacktracejs/stacktrace.js"></script>
<script src="/bower_components/caller-js/caller.js"></script>
```
On Rails, add this to /app/assets/javascripts/application.js instead

```
= require stacktrace-js/stacktrace
= require caller-js/caller
```

### Standalone

Include stacktrace.js and caller.js files on your page:

```html
<script src="https://rawgit.com/stacktracejs/stacktrace.js/master/stacktrace.js"></script>
<script src="https://rawgit.com/tinbka/caller-js/master/caller.js"></script>
```

## Usage

Somewhere in a code you can log the current caller trace into the console with

```javascript
caller.log()
```
or get an array representing the current caller trace with

```javascript
caller.toArray()
```

To get a caller trace from your own code only, set a list of paths to your app's js sources:

```javascript
caller.config.appSources = ['/assets/app/', '/js/']
```
To get a full caller trace available for a browser, set it empty:

```javascript
caller.config.appSources = []
```

`['/assets/(app/|application-)']` is the default for a Rails app where `/assets/app/` directory stands for app-specific javascripts.

You can skip the path filter one-off by calling `caller.log(false)` or `caller.toArray(false)`.

## License

The MIT License (MIT)

Copyright (c) 2015 Sergey Baev, https://github.com/tinbka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
