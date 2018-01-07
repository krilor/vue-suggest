(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vue-suggest", [], factory);
	else if(typeof exports === 'object')
		exports["vue-suggest"] = factory();
	else
		root["vue-suggest"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'suggest-search',
  props: {
    options: {
      type: Array,
      required: true
    },
    debounce: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: function data() {
    return {
      isOpen: false,
      highlightedPosition: NaN,
      keyword: '',
      timeout: undefined
    };
  },

  methods: {
    /**
     * Used to provide a default value-string in the slot for the options.
     * This method is not used when the scoped slot is used
     */
    defaultValue: function defaultValue(option) {
      if (typeof option === 'string') {
        return option;
      } else if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
        return String(option[Object.keys(option)[0]]); // returns one (random) string value
      } else {
        return '';
      }
    },
    moveDown: function moveDown() {
      if (!this.isOpen) {
        return;
      }
      if (isNaN(this.highlightedPosition)) {
        this.highlightedPosition = 0;
      } else {
        this.highlightedPosition = (this.highlightedPosition + 1) % this.options.length;
      }
    },
    moveUp: function moveUp() {
      if (!this.isOpen) {
        return;
      }
      this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.options.length - 1 : this.highlightedPosition - 1;
    },
    select: function select() {
      var selectedOption = this.options[this.highlightedPosition];
      this.isOpen = false;
      this.$emit('select', selectedOption);
    },
    settle: function settle() {
      if (this.isOpen && !isNaN(this.highlightedPosition)) {
        this.select();
      } else {
        this.$emit('search', this.keyword);
      }
    }
  },
  watch: {
    /**
    * Method bound to the input event
    * $emits the current keyword types in autocomplete event
    */
    keyword: function keyword() {
      var _this = this;

      this.isOpen = !!this.keyword;
      this.highlightedPosition = NaN;

      if (this.keyword) {
        this.$emit('change', this.keyword);
      }

      if (this.timeout !== undefined) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(function () {
        // need fat arrow function to preserve "this"
        _this.$emit('autocomplete', _this.keyword);
        _this.timeout = undefined;
      }, this.debounce);
    }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a3f159b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Suggest_vue__ = __webpack_require__(3);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Suggest_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a3f159b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Suggest_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/Suggest.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a3f159b", Component.options)
  } else {
    hotAPI.reload("data-v-5a3f159b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "suggest-search" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.keyword,
          expression: "keyword"
        }
      ],
      staticClass: "input is-large",
      attrs: { placeholder: "Search..." },
      domProps: { value: _vm.keyword },
      on: {
        keyup: function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "esc", 27, $event.key)
          ) {
            return null
          }
          _vm.isOpen = false
        },
        keydown: [
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "down", 40, $event.key)
            ) {
              return null
            }
            _vm.moveDown($event)
          },
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "up", 38, $event.key)
            ) {
              return null
            }
            _vm.moveUp($event)
          },
          function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "enter", 13, $event.key)
            ) {
              return null
            }
            _vm.settle($event)
          }
        ],
        blur: function($event) {
          _vm.isOpen = false
        },
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.keyword = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c(
      "ul",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.isOpen,
            expression: "isOpen"
          }
        ],
        staticClass: "options-list"
      },
      _vm._l(_vm.options, function(option, index) {
        return _c(
          "li",
          {
            key: index,
            class: { highlighted: index === _vm.highlightedPosition },
            on: {
              mouseenter: function($event) {
                _vm.highlightedPosition = index
              },
              mousedown: _vm.select
            }
          },
          [
            _vm._t(
              "item",
              [_vm._v(" " + _vm._s(_vm.defaultValue(option)) + " ")],
              { data: option }
            )
          ],
          2
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5a3f159b", esExports)
  }
}

/***/ })
/******/ ]);
});