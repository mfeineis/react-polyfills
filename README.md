# react-polyfills
A minimal set of polyfills for using [Facebook's React](https://facebook.github.io/react/) with IE8.

## Motivation
If you need to support IE8 and want to use React you need some polyfills. Although 
these are listed [in the React Docs](http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers)
I haven't found a minimal collection to drop into a project; so I created one.

## Usage
Just include the `dist/react-polyfills{.debug|.min}.js` file in a script tag before React
is loaded and you're ready to go. 

### Notes:
* I am fond of naming the debug build `.debug.js` and keeping the minified
  name as small as possible but I figured that a `.min.js` could be useful
  for batch bundling

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>IE8 welcomes React</title>
</head>
<body>
  <script src="path/to/react-polyfills.js"></script>
  <script src="bundle/that/uses/react.js"></script>
</body>
</html>
```

## Contributing
If you encounter any issues, please send me a pull request or open an issue (in that order ;-)).

## Acknowledgements
* Most of the polyfills here are taken from the awesome [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
* Some are taken from [es5-shims.js](https://github.com/es-shims/es5-shim)

## License
See the LICENSE file for the license information.