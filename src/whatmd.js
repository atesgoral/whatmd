exports.probeGlobal = function (src) {
    function probeTmpl() {
        /*splitmarker*/
        var window = {}, // @todo simulate window to help lib initialize
            __scope = {},
            __findings = {};

        try {
            (function (window, arguments, __scope, __findings) {
                /*splitmarker*/
            }).call(__scope, window, []);
        } catch (e) {
            __findings.exceptionThrown = e;
        }

        __findings.windowPropsAdded = Object.keys(window);

        return __findings;
        /*splitmarker*/
    }

    var parts = probeTmpl
        .toString()
        .split('/*splitmarker*/')
        .slice(1, 3);

    parts.splice(1, 0, src);

    var probe = new Function(parts.join('\n')),
        globalPropsBefore = Object.keys(global),
        findings = probe(),
        globalPropsAfter = Object.keys(global);

    findings.globalPropsAdded = globalPropsAfter.filter(function (key) {
        return globalPropsBefore.indexOf(key) === -1 && delete global[key];
    });

    return findings;
};

exports.probeCommonJs = function (src) {
    function probeTmpl() {
        /*splitmarker*/
        var exports = {},
            module = {
                exports: exports
            },
            require = function () {

            },
            __scope = {},
            __findings = {};

        try {
            (function (module, exports, require, arguments, __scope, __findings) {
                /*splitmarker*/
            }).call(__scope, module, exports, require, []);
        } catch (e) {
            __findings.exceptionThrown = e;
        }

        __findings.exportsReplaced = exports !== module.exports;

        if (typeof exports === 'object') {
            __findings.exportsProps = Object.keys(exports);
        }

        return __findings;
        /*splitmarker*/
    }

    var parts = probeTmpl
        .toString()
        .split('/*splitmarker*/')
        .slice(1, 3);

    parts.splice(1, 0, src);

    var probe = new Function(parts.join('\n')),
        globalPropsBefore = Object.keys(global),
        findings = probe(),
        globalPropsAfter = Object.keys(global);

    findings.globalPropsAdded = globalPropsAfter.filter(function (key) {
        return globalPropsBefore.indexOf(key) === -1 && delete global[key];
    });

    return findings;
};

exports.probeAmd = function (src) {
    function probeTmpl() {
        /*splitmarker*/
        var exports = {},
            module = {
                exports: exports
            },
            require = function () {

            },
            define = function () {
                __findings.defineCalled = true;

                var args = Array.prototype.slice.call(arguments, 0);

                __findings.explicitId = typeof args[0] === 'string';

                if (__findings.explicitId) {
                    args.shift();
                }

                __findings.dependencies = args[0] instanceof Array && args[0];

                if (__findings.dependencies) {
                    args.shift();
                }

                var factory = args[0];

                __findings.factoryType = typeof factory;

                // @todo should the factory even be called?
                if (__findings.factoryType === 'function') {
                    if (factory.length === 1) {
                        exports = factory.call(null, require)
                    } else if (factory.length >= 2) {
                        exports = factory.call(null, require, exports, module);
                    }
                }
            },
            __scope = {},
            __findings = {
                defineCalled: false
            };

        define.amd = {};

        try {
            (function (require, define, arguments, __scope, __findings) {
                /*splitmarker*/
            }).call(__scope, require, define, []);
        } catch (e) {
            __findings.exceptionThrown = e;
        }

        __findings.exportsReplaced = exports !== module.exports;

        if (typeof exports === 'object') {
            __findings.exportsProps = Object.keys(exports);
        }

        return __findings;
        /*splitmarker*/
    }

    var parts = probeTmpl
        .toString()
        .split('/*splitmarker*/')
        .slice(1, 3);

    parts.splice(1, 0, src);

    var probe = new Function(parts.join('\n')),
        globalPropsBefore = Object.keys(global),
        findings = probe(),
        globalPropsAfter = Object.keys(global);

    findings.globalPropsAdded = globalPropsAfter.filter(function (key) {
        return globalPropsBefore.indexOf(key) === -1 && delete global[key];
    });

    return findings;
};

exports.probe = function (src) {
	return {
        global: this.probeGlobal(src),
        commonJs: this.probeCommonJs(src),
        amd: this.probeAmd(src)
    };
};
