"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(protected)/dashboard/clients/page",{

/***/ "(app-pages-browser)/./app/(protected)/dashboard/actions.ts":
/*!**********************************************!*\
  !*** ./app/(protected)/dashboard/actions.ts ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClientAction: function() { return /* binding */ createClientAction; },
/* harmony export */   createContractAction: function() { return /* binding */ createContractAction; },
/* harmony export */   createInvoiceAction: function() { return /* binding */ createInvoiceAction; },
/* harmony export */   deleteClientAction: function() { return /* binding */ deleteClientAction; },
/* harmony export */   deleteContractAction: function() { return /* binding */ deleteContractAction; },
/* harmony export */   deleteInvoiceAction: function() { return /* binding */ deleteInvoiceAction; },
/* harmony export */   sendInvoiceReminderAction: function() { return /* binding */ sendInvoiceReminderAction; },
/* harmony export */   updateClientAction: function() { return /* binding */ updateClientAction; },
/* harmony export */   updateContractAction: function() { return /* binding */ updateContractAction; },
/* harmony export */   updateInvoiceAction: function() { return /* binding */ updateInvoiceAction; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"1ae61a3f869d3343761fb5b27e83b7833bd78748":"deleteInvoiceAction","2429a68ae1eee33e40ba5a211aaa520777097682":"updateInvoiceAction","48dcaeb79abd2a518097fcbfa59c50d215900415":"createInvoiceAction","54b85dd8246afd916399172ded4c1a7f715944dc":"sendInvoiceReminderAction","6bb6a2d16055b534ac0c422e09a3982dc7fbe854":"updateClientAction","6df00aa7b6b47bdfa2a25b9cf859c4cea1c94d3d":"createClientAction","9987c2cdad74cd41d4f189311466cdffd26991d7":"createContractAction","e9175c5ddf902fcd88d6cd733abc69f9917572f5":"updateContractAction","f05737c92dee5a5785e9c793564d0b1ffdbc017e":"deleteContractAction","f0cafa4a7fddd075799318306a61a2104909e40d":"deleteClientAction"} */ var deleteContractAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("f05737c92dee5a5785e9c793564d0b1ffdbc017e");

var createClientAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("6df00aa7b6b47bdfa2a25b9cf859c4cea1c94d3d");
var updateClientAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("6bb6a2d16055b534ac0c422e09a3982dc7fbe854");
var deleteClientAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("f0cafa4a7fddd075799318306a61a2104909e40d");
var createInvoiceAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("48dcaeb79abd2a518097fcbfa59c50d215900415");
var updateInvoiceAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("2429a68ae1eee33e40ba5a211aaa520777097682");
var deleteInvoiceAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("1ae61a3f869d3343761fb5b27e83b7833bd78748");
var sendInvoiceReminderAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("54b85dd8246afd916399172ded4c1a7f715944dc");
var createContractAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("9987c2cdad74cd41d4f189311466cdffd26991d7");
var updateContractAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("e9175c5ddf902fcd88d6cd733abc69f9917572f5");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});