/*! React Polyfills v0.3.0 - visit https://github.com/mfeineis/react-polyfills */
(function (Array, Date, Function, Math, Object, RegExp, String, TypeError, CALL_STR, LENGTH_STR, PROTOTYPE_STR, UNDEFINED_STR) {
    'use strict';

    var ArrayPrototype = Array[PROTOTYPE_STR],
        FunctionPrototype = Function[PROTOTYPE_STR],
        ObjectPrototype = Object[PROTOTYPE_STR],
        StringPrototype = String[PROTOTYPE_STR];

    // React has a nice list of polyfills it needs
    // http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers

    // Polyfills included here are the ones needed to run
    // React in production mode in IE8. This means that
    // you need to provide the console.* shim as well
    // as shimming for unsupported HTML5 elements yourself.
    // Note that some functionality cannot be shimmed 
    // appropriately in an ES3 environment, so even though
    // these are provided here they are not completely
    // functional but merely act as a placeholder; they
    // are marked with (*).

    // Polyfills provided are:
    // * Array.isArray
    // * Array.prototype.every
    // * Array.prototype.forEach
    // * Array.prototype.indexOf
    // * Array.prototype.map
    // * Date.now
    // * Function.prototype.bind
    // * Object.create (*)
    // * Object.freeze (*)
    // * Object.keys
    // * String.prototype.split
    // * String.prototype.trim

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
    if (!Array.isArray) {
        Array.isArray = function shimmedArrayIsArray(arg) {
            return ObjectPrototype.toString[CALL_STR](arg) === '[object Array]';
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    if (!ArrayPrototype.every) {
        ArrayPrototype.every = function shimmedArrayEvery(callbackfn, thisArg) {
            'use strict';
            var T, k;

            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the this 
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method
            //    of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O[LENGTH_STR] >>> 0;

            // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
            if (typeof callbackfn !== 'function') {
                throw new TypeError();
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments[LENGTH_STR] > 1) {
                T = thisArg;
            }

            // 6. Let k be 0.
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal 
                //    method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method
                    //    of O with argument Pk.
                    kValue = O[k];

                    // ii. Let testResult be the result of calling the Call internal method
                    //     of callbackfn with T as the this value and argument list 
                    //     containing kValue, k, and O.
                    var testResult = callbackfn[CALL_STR](T, kValue, k, O);

                    // iii. If ToBoolean(testResult) is false, return false.
                    if (!testResult) {
                        return false;
                    }
                }
                k++;
            }
            return true;
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    if (!ArrayPrototype.forEach) {

        ArrayPrototype.forEach = function shimmedArrayForEach(callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O[LENGTH_STR] >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments[LENGTH_STR] > 1) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback[CALL_STR](T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
    // Production steps of ECMA-262, Edition 5, 15.4.4.14
    // Reference: http://es5.github.io/#x15.4.4.14
    if (!ArrayPrototype.indexOf) {
        ArrayPrototype.indexOf = function shimmedArrayIndexOf(searchElement, fromIndex) {

            var k;

            // 1. Let O be the result of calling ToObject passing
            //    the this value as the argument.
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get
            //    internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O[LENGTH_STR] >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
                return -1;
            }

            // 5. If argument fromIndex was passed let n be
            //    ToInteger(fromIndex); else let n be 0.
            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            // 6. If n >= len, return -1.
            if (n >= len) {
                return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            //    If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the
                //    HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                //    i.  Let elementK be the result of calling the Get
                //        internal method of O with the argument ToString(k).
                //   ii.  Let same be the result of applying the
                //        Strict Equality Comparison Algorithm to
                //        searchElement and elementK.
                //  iii.  If same is true, return k.
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill
    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.io/#x15.4.4.19
    if (!ArrayPrototype.map) {

        ArrayPrototype.map = function shimmedArrayMap(callback, thisArg) {

            var T, A, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the |this| 
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal 
            //    method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O[LENGTH_STR] >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments[LENGTH_STR] > 1) {
                T = thisArg;
            }

            // 6. Let A be a new array created as if by the expression new Array(len) 
            //    where Array is the standard built-in constructor with that name and 
            //    len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {

                var kValue, mappedValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal 
                //    method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal 
                    //    method of O with argument Pk.
                    kValue = O[k];

                    // ii. Let mappedValue be the result of calling the Call internal 
                    //     method of callback with T as the this value and argument 
                    //     list containing kValue, k, and O.
                    mappedValue = callback[CALL_STR](T, kValue, k, O);

                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor
                    // { Value: mappedValue,
                    //   Writable: true,
                    //   Enumerable: true,
                    //   Configurable: true },
                    // and false.

                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, k, {
                    //   value: mappedValue,
                    //   writable: true,
                    //   enumerable: true,
                    //   configurable: true
                    // });

                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }

            // 9. return A
            return A;
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Polyfill
    if (!Date.now) {
        Date.now = function shimmedDateNow() {
            return new Date().getTime();
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
    if (!FunctionPrototype.bind) {
        FunctionPrototype.bind = function shimmedFunctionBind(oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs = ArrayPrototype.slice[CALL_STR](arguments, 1),
                fToBind = this,
                fNOP = function () { },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP
                           ? this
                           : oThis,
                           aArgs.concat(ArrayPrototype.slice[CALL_STR](arguments)));
                };

            if (this[PROTOTYPE_STR]) {
                // native functions don't have a prototype
                fNOP[PROTOTYPE_STR] = this[PROTOTYPE_STR];
            }
            fBound[PROTOTYPE_STR] = new fNOP();

            return fBound;
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    if (typeof Object.create != 'function') {
        // Production steps of ECMA-262, Edition 5, 15.2.3.5
        // Reference: http://es5.github.io/#x15.2.3.5
        Object.create = (function () {
            // To save on memory, use a shared constructor
            function Temp() { }

            // make a safe reference to Object.prototype.hasOwnProperty
            var hasOwn = ObjectPrototype.hasOwnProperty;

            return function shimmedObjectCreate(O) {
                // 1. If Type(O) is not Object or Null throw a TypeError exception.
                if (typeof O != 'object') {
                    throw TypeError('Object prototype may only be an Object or null');
                }

                // 2. Let obj be the result of creating a new object as if by the
                //    expression new Object() where Object is the standard built-in
                //    constructor with that name
                // 3. Set the [[Prototype]] internal property of obj to O.
                Temp[PROTOTYPE_STR] = O;
                var obj = new Temp();
                Temp[PROTOTYPE_STR] = null; // Let's not keep a stray reference to O...

                // 4. If the argument Properties is present and not undefined, add
                //    own properties to obj as if by calling the standard built-in
                //    function Object.defineProperties with arguments obj and
                //    Properties.
                if (arguments[LENGTH_STR] > 1) {
                    // Object.defineProperties does ToObject on its first argument.
                    var Properties = Object(arguments[1]);
                    for (var prop in Properties) {
                        if (hasOwn[CALL_STR](Properties, prop)) {
                            obj[prop] = Properties[prop];
                        }
                    }
                }

                // 5. Return obj
                return obj;
            };
        })();
    }

    // From https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
    if (!Object.freeze) {
        Object.freeze = function freeze(object) {
            if (Object(object) !== object) {
                throw new TypeError('Object.freeze can only be called on Objects.');
            }
            // this is misleading and breaks feature-detection, but
            // allows "securable" code to "gracefully" degrade to working
            // but insecure code.
            return object;
        };
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            'use strict';
            var hasOwnProperty = ObjectPrototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                  'toString',
                  'toLocaleString',
                  'valueOf',
                  'hasOwnProperty',
                  'isPrototypeOf',
                  'propertyIsEnumerable',
                  'constructor'
                ],
                dontEnumsLength = dontEnums[LENGTH_STR];

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty[CALL_STR](obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty[CALL_STR](obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    // From https://github.com/es-shims/es5-shim
    var call = FunctionPrototype[CALL_STR];
    var array_push = ArrayPrototype.push;
    var array_slice = ArrayPrototype.slice;
    var strSlice = call.bind(StringPrototype.slice);
    var strSplit = call.bind(StringPrototype.split);
    var boxedString = Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
    var to_string = ObjectPrototype.toString;

    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp[PROTOTYPE_STR].exec, tryRegexExec = function tryRegexExec(value) { try { regexExec[CALL_STR](value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string[CALL_STR](value) === regexClass; };

    var ES = {
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
        ToUint32: function ToUint32(x) {
            return x >>> 0;
        }
    };

    if (
        'ab'.split(/(?:ab)*/)[LENGTH_STR] !== 2 ||
        '.'.split(/(.?)(.?)/)[LENGTH_STR] !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1)[LENGTH_STR] !== 4 ||
        ''.split(/.?/)[LENGTH_STR] ||
        '.'.split(/()()/)[LENGTH_STR] > 1
    ) {
        (function () {
            var compliantExecNpcg = typeof (/()??/).exec('')[1] === UNDEFINED_STR; // NPCG: nonparticipating capturing group
            var maxSafe32BitInt = Math.pow(2, 32) - 1;

            StringPrototype.split = function shimmedStringSplit(separator, limit) {
                var string = this;
                if (typeof separator === UNDEFINED_STR && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (!isRegex(separator)) {
                    return strSplit(this, separator, limit);
                }

                var output = [];
                var flags = (separator.ignoreCase ? 'i' : '') +
                            (separator.multiline ? 'm' : '') +
                            (separator.unicode ? 'u' : '') + // in ES6
                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                string += ''; // Type-convert
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit = typeof limit === UNDEFINED_STR ? maxSafe32BitInt : ES.ToUint32(limit);
                match = separatorCopy.exec(string);
                while (match) {
                    // `separatorCopy.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0][LENGTH_STR];
                    if (lastIndex > lastLastIndex) {
                        array_push[CALL_STR](output, strSlice(string, lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match[LENGTH_STR] > 1) {
                            /* eslint-disable no-loop-func */
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments[LENGTH_STR] - 2; i++) {
                                    if (typeof arguments[i] === UNDEFINED_STR) {
                                        match[i] = void 0;
                                    }
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                        if (match[LENGTH_STR] > 1 && match.index < string[LENGTH_STR]) {
                            array_push.apply(output, array_slice[CALL_STR](match, 1));
                        }
                        lastLength = match[0][LENGTH_STR];
                        lastLastIndex = lastIndex;
                        if (output[LENGTH_STR] >= splitLimit) {
                            break;
                        }
                    }
                    if (separatorCopy.lastIndex === match.index) {
                        separatorCopy.lastIndex++; // Avoid an infinite loop
                    }
                    match = separatorCopy.exec(string);
                }
                if (lastLastIndex === string[LENGTH_STR]) {
                    if (lastLength || !separatorCopy.test('')) {
                        array_push[CALL_STR](output, '');
                    }
                } else {
                    array_push[CALL_STR](output, strSlice(string, lastLastIndex));
                }
                return output[LENGTH_STR] > splitLimit ? strSlice(output, 0, splitLimit) : output;
            };
        }());

        // [bugfix, chrome]
        // If separator is undefined, then the result array contains just one String,
        // which is the this value (converted to a String). If limit is not undefined,
        // then the output array is truncated so that it contains no more than limit
        // elements.
        // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0)[LENGTH_STR]) {
        StringPrototype.split = function shimmedStringSplit(separator, limit) {
            if (typeof separator === UNDEFINED_STR && limit === 0) { return []; }
            return strSplit(this, separator, limit);
        };
    }

    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
        '\u2029\uFEFF';
    var zeroWidth = '\u200b';
    var wsRegexChars = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());

    if (hasTrimWhitespaceBug) {
        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
        // http://perfectionkills.com/whitespace-deviations/
        StringPrototype.trim = function shimmedStringTrim() {
            if (typeof this === UNDEFINED_STR || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
        }
    }

}(Array, Date, Function, Math, Object, RegExp, String, TypeError, 'call', 'length', 'prototype', 'undefined'));