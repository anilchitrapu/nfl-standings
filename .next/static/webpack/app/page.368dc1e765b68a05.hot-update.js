"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HomePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr */ \"(app-pages-browser)/./node_modules/swr/dist/core/index.mjs\");\n/* harmony import */ var _src_components_RankingsChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/src/components/RankingsChart */ \"(app-pages-browser)/./src/components/RankingsChart.tsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n// Move fetcher outside component\nconst fetcher = (url)=>fetch(url).then((res)=>res.json());\n// Move NFL week calculation outside component\nconst getCurrentNFLWeek = ()=>{\n    const now = new Date();\n    const currentYear = now.getFullYear();\n    const seasonStart = new Date(currentYear, 8, 7); // September 7th\n    if (now < seasonStart) {\n        return 18; // Return last week of previous season\n    }\n    const weeksPassed = Math.floor((now.getTime() - seasonStart.getTime()) / (7 * 24 * 60 * 60 * 1000));\n    return Math.max(1, Math.min(18, weeksPassed + 1));\n};\n// Loading component\nfunction LoadingState(param) {\n    let { message = \"Loading...\" } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center justify-center min-h-screen\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"text-center p-4\",\n            children: message\n        }, void 0, false, {\n            fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n            lineNumber: 32,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, this);\n}\n_c = LoadingState;\nfunction HomePage() {\n    _s();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useSearchParams)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();\n    // Fetch data with optimized SWR config\n    const { data: rankings, error } = (0,swr__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"/api/nfl-rankings\", fetcher, {\n        revalidateOnFocus: false,\n        revalidateOnReconnect: false,\n        refreshInterval: 300000,\n        keepPreviousData: true,\n        dedupingInterval: 60000\n    });\n    // Early return for error state\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex items-center justify-center min-h-screen\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-center p-4 text-red-500\",\n                children: \"Failed to load rankings\"\n            }, void 0, false, {\n                fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n                lineNumber: 58,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n            lineNumber: 57,\n            columnNumber: 7\n        }, this);\n    }\n    // Show loading state if no data\n    if (!rankings) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LoadingState, {\n            message: \"Loading rankings data...\"\n        }, void 0, false, {\n            fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n            lineNumber: 67,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen p-2 sm:p-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_components_RankingsChart__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            teamsData: rankings,\n            initialQuery: searchParams.toString(),\n            pathname: pathname\n        }, void 0, false, {\n            fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n            lineNumber: 72,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/anilchitrapu/Library/CloudStorage/GoogleDrive-anilchitrapu@gmail.com/My Drive/1 Projects/2024-12 NFL standings application/nfl-standings/app/page.tsx\",\n        lineNumber: 71,\n        columnNumber: 5\n    }, this);\n}\n_s(HomePage, \"OGh6RLZgA1myI+mnjZCtG2GQcRE=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname,\n        swr__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    ];\n});\n_c1 = HomePage;\nvar _c, _c1;\n$RefreshReg$(_c, \"LoadingState\");\n$RefreshReg$(_c1, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRXlCO0FBQ2tDO0FBRUk7QUFFL0QsaUNBQWlDO0FBQ2pDLE1BQU1JLFVBQVUsQ0FBQ0MsTUFBZ0JDLE1BQU1ELEtBQUtFLElBQUksQ0FBQyxDQUFDQyxNQUFRQSxJQUFJQyxJQUFJO0FBRWxFLDhDQUE4QztBQUM5QyxNQUFNQyxvQkFBb0I7SUFDeEIsTUFBTUMsTUFBTSxJQUFJQztJQUNoQixNQUFNQyxjQUFjRixJQUFJRyxXQUFXO0lBQ25DLE1BQU1DLGNBQWMsSUFBSUgsS0FBS0MsYUFBYSxHQUFHLElBQUksZ0JBQWdCO0lBRWpFLElBQUlGLE1BQU1JLGFBQWE7UUFDckIsT0FBTyxJQUFJLHNDQUFzQztJQUNuRDtJQUVBLE1BQU1DLGNBQWNDLEtBQUtDLEtBQUssQ0FDNUIsQ0FBQ1AsSUFBSVEsT0FBTyxLQUFLSixZQUFZSSxPQUFPLEVBQUMsSUFBTSxLQUFJLEtBQUssS0FBSyxLQUFLLElBQUc7SUFHbkUsT0FBT0YsS0FBS0csR0FBRyxDQUFDLEdBQUdILEtBQUtJLEdBQUcsQ0FBQyxJQUFJTCxjQUFjO0FBQ2hEO0FBRUEsb0JBQW9CO0FBQ3BCLFNBQVNNLGFBQWEsS0FBZ0Q7UUFBaEQsRUFBRUMsVUFBVSxZQUFZLEVBQXdCLEdBQWhEO0lBQ3BCLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVO2tCQUNiLDRFQUFDRDtZQUFJQyxXQUFVO3NCQUFtQkY7Ozs7Ozs7Ozs7O0FBR3hDO0tBTlNEO0FBUU0sU0FBU0k7O0lBQ3RCLE1BQU1DLGVBQWV6QixnRUFBZUE7SUFDcEMsTUFBTTBCLFdBQVd6Qiw0REFBV0E7SUFFNUIsdUNBQXVDO0lBQ3ZDLE1BQU0sRUFBRTBCLE1BQU1DLFFBQVEsRUFBRUMsS0FBSyxFQUFFLEdBQUcvQiwrQ0FBTUEsQ0FDdEMscUJBQ0FJLFNBQ0E7UUFDRTRCLG1CQUFtQjtRQUNuQkMsdUJBQXVCO1FBQ3ZCQyxpQkFBaUI7UUFDakJDLGtCQUFrQjtRQUNsQkMsa0JBQWtCO0lBQ3BCO0lBR0YsK0JBQStCO0lBQy9CLElBQUlMLE9BQU87UUFDVCxxQkFDRSw4REFBQ1A7WUFBSUMsV0FBVTtzQkFDYiw0RUFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQStCOzs7Ozs7Ozs7OztJQUtwRDtJQUVBLGdDQUFnQztJQUNoQyxJQUFJLENBQUNLLFVBQVU7UUFDYixxQkFBTyw4REFBQ1I7WUFBYUMsU0FBUTs7Ozs7O0lBQy9CO0lBRUEscUJBQ0UsOERBQUNjO1FBQUtaLFdBQVU7a0JBQ2QsNEVBQUN4QixxRUFBYUE7WUFDWnFDLFdBQVdSO1lBQ1hTLGNBQWNaLGFBQWFhLFFBQVE7WUFDbkNaLFVBQVVBOzs7Ozs7Ozs7OztBQUlsQjtHQTFDd0JGOztRQUNEeEIsNERBQWVBO1FBQ25CQyx3REFBV0E7UUFHTUgsMkNBQU1BOzs7TUFMbEIwQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvcGFnZS50c3g/NzYwMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHVzZVNXUiBmcm9tICdzd3InO1xuaW1wb3J0IFJhbmtpbmdzQ2hhcnQgZnJvbSAnQC9zcmMvY29tcG9uZW50cy9SYW5raW5nc0NoYXJ0JztcbmltcG9ydCB7IE5GTFBvd2VyUmFua2luZyB9IGZyb20gJ0Avc3JjL2xpYi9wcm9jZXNzLXJhbmtpbmdzJztcbmltcG9ydCB7IHVzZVNlYXJjaFBhcmFtcywgdXNlUGF0aG5hbWUgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG4vLyBNb3ZlIGZldGNoZXIgb3V0c2lkZSBjb21wb25lbnRcbmNvbnN0IGZldGNoZXIgPSAodXJsOiBzdHJpbmcpID0+IGZldGNoKHVybCkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcblxuLy8gTW92ZSBORkwgd2VlayBjYWxjdWxhdGlvbiBvdXRzaWRlIGNvbXBvbmVudFxuY29uc3QgZ2V0Q3VycmVudE5GTFdlZWsgPSAoKSA9PiB7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGN1cnJlbnRZZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IHNlYXNvblN0YXJ0ID0gbmV3IERhdGUoY3VycmVudFllYXIsIDgsIDcpOyAvLyBTZXB0ZW1iZXIgN3RoXG4gIFxuICBpZiAobm93IDwgc2Vhc29uU3RhcnQpIHtcbiAgICByZXR1cm4gMTg7IC8vIFJldHVybiBsYXN0IHdlZWsgb2YgcHJldmlvdXMgc2Vhc29uXG4gIH1cbiAgXG4gIGNvbnN0IHdlZWtzUGFzc2VkID0gTWF0aC5mbG9vcihcbiAgICAobm93LmdldFRpbWUoKSAtIHNlYXNvblN0YXJ0LmdldFRpbWUoKSkgLyAoNyAqIDI0ICogNjAgKiA2MCAqIDEwMDApXG4gICk7XG4gIFxuICByZXR1cm4gTWF0aC5tYXgoMSwgTWF0aC5taW4oMTgsIHdlZWtzUGFzc2VkICsgMSkpO1xufTtcblxuLy8gTG9hZGluZyBjb21wb25lbnRcbmZ1bmN0aW9uIExvYWRpbmdTdGF0ZSh7IG1lc3NhZ2UgPSBcIkxvYWRpbmcuLi5cIiB9OiB7IG1lc3NhZ2U/OiBzdHJpbmcgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLWgtc2NyZWVuXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHAtNFwiPnttZXNzYWdlfTwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lUGFnZSgpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdXNlU2VhcmNoUGFyYW1zKCk7XG4gIGNvbnN0IHBhdGhuYW1lID0gdXNlUGF0aG5hbWUoKTtcblxuICAvLyBGZXRjaCBkYXRhIHdpdGggb3B0aW1pemVkIFNXUiBjb25maWdcbiAgY29uc3QgeyBkYXRhOiByYW5raW5ncywgZXJyb3IgfSA9IHVzZVNXUjxORkxQb3dlclJhbmtpbmdbXT4oXG4gICAgJy9hcGkvbmZsLXJhbmtpbmdzJyxcbiAgICBmZXRjaGVyLFxuICAgIHtcbiAgICAgIHJldmFsaWRhdGVPbkZvY3VzOiBmYWxzZSxcbiAgICAgIHJldmFsaWRhdGVPblJlY29ubmVjdDogZmFsc2UsXG4gICAgICByZWZyZXNoSW50ZXJ2YWw6IDMwMDAwMCwgLy8gNSBtaW51dGVzXG4gICAgICBrZWVwUHJldmlvdXNEYXRhOiB0cnVlLFxuICAgICAgZGVkdXBpbmdJbnRlcnZhbDogNjAwMDAsXG4gICAgfVxuICApO1xuXG4gIC8vIEVhcmx5IHJldHVybiBmb3IgZXJyb3Igc3RhdGVcbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLWgtc2NyZWVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcC00IHRleHQtcmVkLTUwMFwiPlxuICAgICAgICAgIEZhaWxlZCB0byBsb2FkIHJhbmtpbmdzXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFNob3cgbG9hZGluZyBzdGF0ZSBpZiBubyBkYXRhXG4gIGlmICghcmFua2luZ3MpIHtcbiAgICByZXR1cm4gPExvYWRpbmdTdGF0ZSBtZXNzYWdlPVwiTG9hZGluZyByYW5raW5ncyBkYXRhLi4uXCIgLz47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBwLTIgc206cC00XCI+XG4gICAgICA8UmFua2luZ3NDaGFydFxuICAgICAgICB0ZWFtc0RhdGE9e3JhbmtpbmdzfVxuICAgICAgICBpbml0aWFsUXVlcnk9e3NlYXJjaFBhcmFtcy50b1N0cmluZygpfVxuICAgICAgICBwYXRobmFtZT17cGF0aG5hbWV9XG4gICAgICAvPlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTV1IiLCJSYW5raW5nc0NoYXJ0IiwidXNlU2VhcmNoUGFyYW1zIiwidXNlUGF0aG5hbWUiLCJmZXRjaGVyIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsImdldEN1cnJlbnRORkxXZWVrIiwibm93IiwiRGF0ZSIsImN1cnJlbnRZZWFyIiwiZ2V0RnVsbFllYXIiLCJzZWFzb25TdGFydCIsIndlZWtzUGFzc2VkIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsIm1heCIsIm1pbiIsIkxvYWRpbmdTdGF0ZSIsIm1lc3NhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJIb21lUGFnZSIsInNlYXJjaFBhcmFtcyIsInBhdGhuYW1lIiwiZGF0YSIsInJhbmtpbmdzIiwiZXJyb3IiLCJyZXZhbGlkYXRlT25Gb2N1cyIsInJldmFsaWRhdGVPblJlY29ubmVjdCIsInJlZnJlc2hJbnRlcnZhbCIsImtlZXBQcmV2aW91c0RhdGEiLCJkZWR1cGluZ0ludGVydmFsIiwibWFpbiIsInRlYW1zRGF0YSIsImluaXRpYWxRdWVyeSIsInRvU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});