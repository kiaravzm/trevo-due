"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/stripe/webhook/route";
exports.ids = ["app/api/stripe/webhook/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_kiaramartins_Documents_projetos_pessoais_agency_docs_app_api_stripe_webhook_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stripe/webhook/route.ts */ \"(rsc)/./app/api/stripe/webhook/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stripe/webhook/route\",\n        pathname: \"/api/stripe/webhook\",\n        filename: \"route\",\n        bundlePath: \"app/api/stripe/webhook/route\"\n    },\n    resolvedPagePath: \"/Users/kiaramartins/Documents/projetos-pessoais/agency-docs/app/api/stripe/webhook/route.ts\",\n    nextConfigOutput,\n    userland: _Users_kiaramartins_Documents_projetos_pessoais_agency_docs_app_api_stripe_webhook_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/stripe/webhook/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzdHJpcGUlMkZ3ZWJob29rJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzdHJpcGUlMkZ3ZWJob29rJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc3RyaXBlJTJGd2ViaG9vayUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmtpYXJhbWFydGlucyUyRkRvY3VtZW50cyUyRnByb2pldG9zLXBlc3NvYWlzJTJGYWdlbmN5LWRvY3MlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGa2lhcmFtYXJ0aW5zJTJGRG9jdW1lbnRzJTJGcHJvamV0b3MtcGVzc29haXMlMkZhZ2VuY3ktZG9jcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMkM7QUFDeEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2VuY3ktZG9jcy8/MmY3NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMva2lhcmFtYXJ0aW5zL0RvY3VtZW50cy9wcm9qZXRvcy1wZXNzb2Fpcy9hZ2VuY3ktZG9jcy9hcHAvYXBpL3N0cmlwZS93ZWJob29rL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdHJpcGUvd2ViaG9vay9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3N0cmlwZS93ZWJob29rXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zdHJpcGUvd2ViaG9vay9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9raWFyYW1hcnRpbnMvRG9jdW1lbnRzL3Byb2pldG9zLXBlc3NvYWlzL2FnZW5jeS1kb2NzL2FwcC9hcGkvc3RyaXBlL3dlYmhvb2svcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3N0cmlwZS93ZWJob29rL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/stripe/webhook/route.ts":
/*!*****************************************!*\
  !*** ./app/api/stripe/webhook/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_stripe_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/stripe/server */ \"(rsc)/./lib/stripe/server.ts\");\n/* harmony import */ var _lib_supabase_admin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/supabase/admin */ \"(rsc)/./lib/supabase/admin.ts\");\n\n\n\n\nfunction mapSubscriptionPayload(event) {\n    if (event.type !== \"checkout.session.completed\" && event.type !== \"customer.subscription.updated\" && event.type !== \"customer.subscription.created\" && event.type !== \"customer.subscription.deleted\") {\n        return null;\n    }\n    if (event.type === \"checkout.session.completed\") {\n        const session = event.data.object;\n        const userId = session.metadata?.user_id;\n        if (!userId) return null;\n        return {\n            userId,\n            stripeCustomerId: typeof session.customer === \"string\" ? session.customer : null,\n            stripeSubscriptionId: typeof session.subscription === \"string\" ? session.subscription : null,\n            status: \"active\",\n            currentPeriodEnd: null,\n            trialEndsAt: null\n        };\n    }\n    const subscription = event.data.object;\n    const userId = subscription.metadata?.user_id;\n    if (!userId) return null;\n    return {\n        userId,\n        stripeCustomerId: typeof subscription.customer === \"string\" ? subscription.customer : null,\n        stripeSubscriptionId: subscription.id,\n        status: subscription.status,\n        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,\n        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null\n    };\n}\nasync function POST(request) {\n    const stripe = (0,_lib_stripe_server__WEBPACK_IMPORTED_MODULE_2__.getStripeServerClient)();\n    const signature = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.headers)().get(\"stripe-signature\");\n    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;\n    if (!signature || !webhookSecret) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Missing webhook configuration.\"\n        }, {\n            status: 400\n        });\n    }\n    const rawBody = await request.text();\n    let event;\n    try {\n        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Invalid signature.\"\n        }, {\n            status: 400\n        });\n    }\n    const payload = mapSubscriptionPayload(event);\n    if (!payload) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            received: true\n        });\n    }\n    const admin = (0,_lib_supabase_admin__WEBPACK_IMPORTED_MODULE_3__.createSupabaseAdminClient)();\n    await admin.from(\"subscriptions\").upsert({\n        user_id: payload.userId,\n        stripe_customer_id: payload.stripeCustomerId,\n        stripe_subscription_id: payload.stripeSubscriptionId,\n        status: payload.status,\n        current_period_end: payload.currentPeriodEnd,\n        trial_ends_at: payload.trialEndsAt\n    }, {\n        onConflict: \"user_id\"\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n        received: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MUIsT0FBT2hELHFEQUFZQSxDQUFDaUMsSUFBSSxDQUFDO1FBQUVRLFVBQVU7SUFBSztBQUM1QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5jeS1kb2NzLy4vYXBwL2FwaS9zdHJpcGUvd2ViaG9vay9yb3V0ZS50cz9jNTk0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpcGUgZnJvbSBcInN0cmlwZVwiO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5pbXBvcnQgeyBnZXRTdHJpcGVTZXJ2ZXJDbGllbnQgfSBmcm9tIFwiQC9saWIvc3RyaXBlL3NlcnZlclwiO1xuaW1wb3J0IHsgY3JlYXRlU3VwYWJhc2VBZG1pbkNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9hZG1pblwiO1xuXG50eXBlIFN1YnNjcmlwdGlvblBheWxvYWQgPSB7XG4gIHVzZXJJZDogc3RyaW5nO1xuICBzdHJpcGVDdXN0b21lcklkOiBzdHJpbmcgfCBudWxsO1xuICBzdHJpcGVTdWJzY3JpcHRpb25JZDogc3RyaW5nIHwgbnVsbDtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGN1cnJlbnRQZXJpb2RFbmQ6IHN0cmluZyB8IG51bGw7XG4gIHRyaWFsRW5kc0F0OiBzdHJpbmcgfCBudWxsO1xufTtcblxuZnVuY3Rpb24gbWFwU3Vic2NyaXB0aW9uUGF5bG9hZChldmVudDogU3RyaXBlLkV2ZW50KTogU3Vic2NyaXB0aW9uUGF5bG9hZCB8IG51bGwge1xuICBpZiAoXG4gICAgZXZlbnQudHlwZSAhPT0gXCJjaGVja291dC5zZXNzaW9uLmNvbXBsZXRlZFwiICYmXG4gICAgZXZlbnQudHlwZSAhPT0gXCJjdXN0b21lci5zdWJzY3JpcHRpb24udXBkYXRlZFwiICYmXG4gICAgZXZlbnQudHlwZSAhPT0gXCJjdXN0b21lci5zdWJzY3JpcHRpb24uY3JlYXRlZFwiICYmXG4gICAgZXZlbnQudHlwZSAhPT0gXCJjdXN0b21lci5zdWJzY3JpcHRpb24uZGVsZXRlZFwiXG4gICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGV2ZW50LnR5cGUgPT09IFwiY2hlY2tvdXQuc2Vzc2lvbi5jb21wbGV0ZWRcIikge1xuICAgIGNvbnN0IHNlc3Npb24gPSBldmVudC5kYXRhLm9iamVjdCBhcyBTdHJpcGUuQ2hlY2tvdXQuU2Vzc2lvbjtcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLm1ldGFkYXRhPy51c2VyX2lkO1xuICAgIGlmICghdXNlcklkKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICB1c2VySWQsXG4gICAgICBzdHJpcGVDdXN0b21lcklkOiB0eXBlb2Ygc2Vzc2lvbi5jdXN0b21lciA9PT0gXCJzdHJpbmdcIiA/IHNlc3Npb24uY3VzdG9tZXIgOiBudWxsLFxuICAgICAgc3RyaXBlU3Vic2NyaXB0aW9uSWQ6IHR5cGVvZiBzZXNzaW9uLnN1YnNjcmlwdGlvbiA9PT0gXCJzdHJpbmdcIiA/IHNlc3Npb24uc3Vic2NyaXB0aW9uIDogbnVsbCxcbiAgICAgIHN0YXR1czogXCJhY3RpdmVcIixcbiAgICAgIGN1cnJlbnRQZXJpb2RFbmQ6IG51bGwsXG4gICAgICB0cmlhbEVuZHNBdDogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9uID0gZXZlbnQuZGF0YS5vYmplY3QgYXMgU3RyaXBlLlN1YnNjcmlwdGlvbjtcbiAgY29uc3QgdXNlcklkID0gc3Vic2NyaXB0aW9uLm1ldGFkYXRhPy51c2VyX2lkO1xuICBpZiAoIXVzZXJJZCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICB1c2VySWQsXG4gICAgc3RyaXBlQ3VzdG9tZXJJZDogdHlwZW9mIHN1YnNjcmlwdGlvbi5jdXN0b21lciA9PT0gXCJzdHJpbmdcIiA/IHN1YnNjcmlwdGlvbi5jdXN0b21lciA6IG51bGwsXG4gICAgc3RyaXBlU3Vic2NyaXB0aW9uSWQ6IHN1YnNjcmlwdGlvbi5pZCxcbiAgICBzdGF0dXM6IHN1YnNjcmlwdGlvbi5zdGF0dXMsXG4gICAgY3VycmVudFBlcmlvZEVuZDogc3Vic2NyaXB0aW9uLmN1cnJlbnRfcGVyaW9kX2VuZFxuICAgICAgPyBuZXcgRGF0ZShzdWJzY3JpcHRpb24uY3VycmVudF9wZXJpb2RfZW5kICogMTAwMCkudG9JU09TdHJpbmcoKVxuICAgICAgOiBudWxsLFxuICAgIHRyaWFsRW5kc0F0OiBzdWJzY3JpcHRpb24udHJpYWxfZW5kXG4gICAgICA/IG5ldyBEYXRlKHN1YnNjcmlwdGlvbi50cmlhbF9lbmQgKiAxMDAwKS50b0lTT1N0cmluZygpXG4gICAgICA6IG51bGwsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgY29uc3Qgc3RyaXBlID0gZ2V0U3RyaXBlU2VydmVyQ2xpZW50KCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGhlYWRlcnMoKS5nZXQoXCJzdHJpcGUtc2lnbmF0dXJlXCIpO1xuICBjb25zdCB3ZWJob29rU2VjcmV0ID0gcHJvY2Vzcy5lbnYuU1RSSVBFX1dFQkhPT0tfU0VDUkVUO1xuXG4gIGlmICghc2lnbmF0dXJlIHx8ICF3ZWJob29rU2VjcmV0KSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyB3ZWJob29rIGNvbmZpZ3VyYXRpb24uXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgfVxuXG4gIGNvbnN0IHJhd0JvZHkgPSBhd2FpdCByZXF1ZXN0LnRleHQoKTtcbiAgbGV0IGV2ZW50OiBTdHJpcGUuRXZlbnQ7XG5cbiAgdHJ5IHtcbiAgICBldmVudCA9IHN0cmlwZS53ZWJob29rcy5jb25zdHJ1Y3RFdmVudChyYXdCb2R5LCBzaWduYXR1cmUsIHdlYmhvb2tTZWNyZXQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIHNpZ25hdHVyZS5cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgY29uc3QgcGF5bG9hZCA9IG1hcFN1YnNjcmlwdGlvblBheWxvYWQoZXZlbnQpO1xuICBpZiAoIXBheWxvYWQpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZWNlaXZlZDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0IGFkbWluID0gY3JlYXRlU3VwYWJhc2VBZG1pbkNsaWVudCgpO1xuICBhd2FpdCBhZG1pbi5mcm9tKFwic3Vic2NyaXB0aW9uc1wiKS51cHNlcnQoXG4gICAge1xuICAgICAgdXNlcl9pZDogcGF5bG9hZC51c2VySWQsXG4gICAgICBzdHJpcGVfY3VzdG9tZXJfaWQ6IHBheWxvYWQuc3RyaXBlQ3VzdG9tZXJJZCxcbiAgICAgIHN0cmlwZV9zdWJzY3JpcHRpb25faWQ6IHBheWxvYWQuc3RyaXBlU3Vic2NyaXB0aW9uSWQsXG4gICAgICBzdGF0dXM6IHBheWxvYWQuc3RhdHVzLFxuICAgICAgY3VycmVudF9wZXJpb2RfZW5kOiBwYXlsb2FkLmN1cnJlbnRQZXJpb2RFbmQsXG4gICAgICB0cmlhbF9lbmRzX2F0OiBwYXlsb2FkLnRyaWFsRW5kc0F0LFxuICAgIH0sXG4gICAgeyBvbkNvbmZsaWN0OiBcInVzZXJfaWRcIiB9XG4gICk7XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcmVjZWl2ZWQ6IHRydWUgfSk7XG59XG4iXSwibmFtZXMiOlsiaGVhZGVycyIsIk5leHRSZXNwb25zZSIsImdldFN0cmlwZVNlcnZlckNsaWVudCIsImNyZWF0ZVN1cGFiYXNlQWRtaW5DbGllbnQiLCJtYXBTdWJzY3JpcHRpb25QYXlsb2FkIiwiZXZlbnQiLCJ0eXBlIiwic2Vzc2lvbiIsImRhdGEiLCJvYmplY3QiLCJ1c2VySWQiLCJtZXRhZGF0YSIsInVzZXJfaWQiLCJzdHJpcGVDdXN0b21lcklkIiwiY3VzdG9tZXIiLCJzdHJpcGVTdWJzY3JpcHRpb25JZCIsInN1YnNjcmlwdGlvbiIsInN0YXR1cyIsImN1cnJlbnRQZXJpb2RFbmQiLCJ0cmlhbEVuZHNBdCIsImlkIiwiY3VycmVudF9wZXJpb2RfZW5kIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHJpYWxfZW5kIiwiUE9TVCIsInJlcXVlc3QiLCJzdHJpcGUiLCJzaWduYXR1cmUiLCJnZXQiLCJ3ZWJob29rU2VjcmV0IiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9XRUJIT09LX1NFQ1JFVCIsImpzb24iLCJlcnJvciIsInJhd0JvZHkiLCJ0ZXh0Iiwid2ViaG9va3MiLCJjb25zdHJ1Y3RFdmVudCIsImVyciIsInBheWxvYWQiLCJyZWNlaXZlZCIsImFkbWluIiwiZnJvbSIsInVwc2VydCIsInN0cmlwZV9jdXN0b21lcl9pZCIsInN0cmlwZV9zdWJzY3JpcHRpb25faWQiLCJ0cmlhbF9lbmRzX2F0Iiwib25Db25mbGljdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stripe/webhook/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/stripe/server.ts":
/*!******************************!*\
  !*** ./lib/stripe/server.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getStripeServerClient: () => (/* binding */ getStripeServerClient)\n/* harmony export */ });\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\nfunction getStripeServerClient() {\n    const secretKey = process.env.STRIPE_SECRET_KEY;\n    if (!secretKey) {\n        throw new Error(\"Missing STRIPE_SECRET_KEY environment variable.\");\n    }\n    return new stripe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](secretKey, {\n        apiVersion: \"2024-06-20\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3RyaXBlL3NlcnZlci50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUE0QjtBQUVyQixTQUFTQztJQUNkLE1BQU1DLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO0lBQy9DLElBQUksQ0FBQ0gsV0FBVztRQUNkLE1BQU0sSUFBSUksTUFBTTtJQUNsQjtJQUVBLE9BQU8sSUFBSU4sOENBQU1BLENBQUNFLFdBQVc7UUFDM0JLLFlBQVk7SUFDZDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdlbmN5LWRvY3MvLi9saWIvc3RyaXBlL3NlcnZlci50cz8xZGRjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpcGUgZnJvbSBcInN0cmlwZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaXBlU2VydmVyQ2xpZW50KCkge1xuICBjb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5TVFJJUEVfU0VDUkVUX0tFWTtcbiAgaWYgKCFzZWNyZXRLZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFNUUklQRV9TRUNSRVRfS0VZIGVudmlyb25tZW50IHZhcmlhYmxlLlwiKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU3RyaXBlKHNlY3JldEtleSwge1xuICAgIGFwaVZlcnNpb246IFwiMjAyNC0wNi0yMFwiLFxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJTdHJpcGUiLCJnZXRTdHJpcGVTZXJ2ZXJDbGllbnQiLCJzZWNyZXRLZXkiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJFcnJvciIsImFwaVZlcnNpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/stripe/server.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase/admin.ts":
/*!*******************************!*\
  !*** ./lib/supabase/admin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSupabaseAdminClient: () => (/* binding */ createSupabaseAdminClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nfunction createSupabaseAdminClient() {\n    const url = \"https://acllhyiknnjtuxseksru.supabase.co\";\n    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n    if (!url || !serviceRoleKey) {\n        throw new Error(\"Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL.\");\n    }\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(url, serviceRoleKey, {\n        auth: {\n            persistSession: false,\n            autoRefreshToken: false\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UvYWRtaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUQ7QUFFOUMsU0FBU0M7SUFDZCxNQUFNQyxNQUFNQywwQ0FBb0M7SUFDaEQsTUFBTUcsaUJBQWlCSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtJQUU1RCxJQUFJLENBQUNMLE9BQU8sQ0FBQ0ksZ0JBQWdCO1FBQzNCLE1BQU0sSUFBSUUsTUFBTTtJQUNsQjtJQUVBLE9BQU9SLG1FQUFZQSxDQUFDRSxLQUFLSSxnQkFBZ0I7UUFDdkNHLE1BQU07WUFBRUMsZ0JBQWdCO1lBQU9DLGtCQUFrQjtRQUFNO0lBQ3pEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2VuY3ktZG9jcy8uL2xpYi9zdXBhYmFzZS9hZG1pbi50cz84MTZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN1cGFiYXNlQWRtaW5DbGllbnQoKSB7XG4gIGNvbnN0IHVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTDtcbiAgY29uc3Qgc2VydmljZVJvbGVLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZO1xuXG4gIGlmICghdXJsIHx8ICFzZXJ2aWNlUm9sZUtleSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSBvciBORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZUNsaWVudCh1cmwsIHNlcnZpY2VSb2xlS2V5LCB7XG4gICAgYXV0aDogeyBwZXJzaXN0U2Vzc2lvbjogZmFsc2UsIGF1dG9SZWZyZXNoVG9rZW46IGZhbHNlIH0sXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsImNyZWF0ZVN1cGFiYXNlQWRtaW5DbGllbnQiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic2VydmljZVJvbGVLZXkiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwiRXJyb3IiLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iLCJhdXRvUmVmcmVzaFRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase/admin.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/stripe"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstripe%2Fwebhook%2Froute&page=%2Fapi%2Fstripe%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstripe%2Fwebhook%2Froute.ts&appDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkiaramartins%2FDocuments%2Fprojetos-pessoais%2Fagency-docs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();