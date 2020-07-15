(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{273:function(module,exports,__webpack_require__){__webpack_require__(274),__webpack_require__(424),module.exports=__webpack_require__(425)},340:function(module,exports){},425:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(269);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(616)],module)}.call(this,__webpack_require__(426)(module))},616:function(module,exports,__webpack_require__){var map={"./stories/import.stories.tsx":617};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=616},617:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Test",(function(){return import_stories_Test}));var react=__webpack_require__(13),react_default=__webpack_require__.n(react),react_dom=__webpack_require__(109),react_dom_default=__webpack_require__.n(react_dom),classCallCheck=__webpack_require__(270),createClass=__webpack_require__(271),bundles={"react-i18next":{dependencies:["i18next"],resources:[{tag:"script",name:"react-i18next",version:"10.11.4",path:"/react-i18next.min.js",var:"ReactI18next"}]},i18next:{dependencies:[],resources:[{tag:"script",name:"i18next",version:"15.1.3",path:"/dist/umd/i18next.min.js",var:"i18next"}]},react:{dependencies:[],resources:[{tag:"script",name:"react",version:"16.12.0",path:"/umd/react.development.js",var:"React"},{tag:"script",name:"react-dom",version:"16.12.0",path:"/umd/react-dom.development.js",var:"ReactDOM"}]},jquery:{dependencies:[],resources:[{tag:"script",name:"jquery",version:"3.5.1",path:"/dist/jquery.js",var:"jQuery"}]}};function testResource(resource,cb){var loaded=!1;return resource.var?loaded=!!window[resource.var]:(console.error("no way to test if load happens on ",resource),loaded=!0),loaded?cb&&cb():cb&&setTimeout((function(){testResource(resource,cb)}),500),loaded}var resource_ResourceService=function(){function ResourceService(){var _this=this,options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(classCallCheck.a)(this,ResourceService),this._bundles=void 0,this._getURL=void 0,this.loaded=void 0,this._bundles=new Map,this.loaded={},this._getURL=options.getURL,Object.keys(bundles||{}).forEach((function(k){_this._bundles.set(k,bundles[k])})),(null==options?void 0:options.bundles)&&Object.keys(options.bundles||{}).forEach((function(k){_this._bundles.set(k,options.bundles[k])}))}return Object(createClass.a)(ResourceService,[{key:"getURL",value:function getURL(resource){var url;if(this._getURL&&(url=this._getURL(resource)),!url)return function defaultGetURL(resource){if(resource){if(resource.url)return resource.url;if(resource.name&&resource.version&&resource.path)return"https://unpkg.com/".concat(resource.name,"@").concat(resource.version).concat(resource.path);throw new Error("resource is missing either url or name/version/path, ".concat(JSON.stringify(resource)))}}(resource)}},{key:"getBundle",value:function getBundle(id){return this._bundles.get(id)}},{key:"getVar",value:function getVar(id){var bundle=this.getBundle(id),found=Array.from(bundle.resources).reduce((function(acc,value){return value.var&&acc.push(window[value.var]),acc}),[]);if(0!==found.length)return 1===found.length?found[0]:found}},{key:"getResources",value:function getResources(id){var _this2=this,bundle=this.getBundle(id);if(!bundle)return console.log("### no bundle found for",id,this._bundles.get(id)),[];var buff=Array.from(bundle.resources),deps=[];return bundle.dependencies&&(deps=bundle.dependencies.reduce((function(acc,bundleId){return _this2.getResources(bundleId).forEach((function(r){acc.push(r)})),acc}),[])),deps.concat(buff)}},{key:"import",value:function _import(id){var resources=this.getResources(id);return console.log("####",resources,id),this.addLink(resources.filter((function(r){return"link"===r.tag}))),this.addScripts(resources.filter((function(r){return"script"===r.tag})))}},{key:"addScripts",value:function addScripts(resources){var _this3=this;return new Promise((function(resolve,reject){var resource=resources.shift(),onFinish=function onFinish(){return resources.length>0?resolve(_this3.addScripts(resources)):resolve()},uri=_this3.getURL(resource);if(uri&&!_this3.loaded[uri]){if("script"!==resource.tag)return onFinish();if(_this3.loaded[uri]=!0,testResource(resource))return onFinish();var script=document.createElement("script");resource.nomodule&&script.setAttribute("nomodule",resource.nomodule),script.setAttribute("type",resource.type?resource.type:"text/javascript"),function onLoad(scriptElement,resource,callback){scriptElement.addEventListener("load",(function(){testResource(resource,callback)}))}(script,resource,onFinish),script.setAttribute("src",uri),script.onerror=function(e){console.error(e),reject()},document.head.appendChild(script)}else{if(!uri)return onFinish();if(testResource(resource,onFinish))return onFinish()}}))}},{key:"addLink",value:function addLink(resources){var _this4=this;console.log("### addLink",resources),resources.length>0&&resources.forEach((function(resource){var link=document.createElement("link");link.setAttribute("rel","stylesheet"),link.setAttribute("href",_this4.getURL(resource)),link.onload=function(){console.log("link loaded",resource)},console.log("add <link href=",_this4.getURL(resource)),document.head.appendChild(link)}))}}]),ResourceService}(),CDNContext=react_default.a.createContext(new resource_ResourceService),slicedToArray=__webpack_require__(272);function Import(_ref){var name=_ref.name,children=_ref.children,cdn=Object(react.useContext)(CDNContext),_useState=Object(react.useState)({id:name,mod:void 0}),_useState2=Object(slicedToArray.a)(_useState,2),state=_useState2[0],setModule=_useState2[1];if(Object(react.useEffect)((function(){cdn.import(name).then((function(){console.log("#### Import loaded"),setModule({id:name,mod:cdn.getVar(name)})})).catch((function(e){console.error(e)}))}),[name,cdn]),"function"!=typeof children)throw new Error("children must be a function");return state.id===name&&state.mod?children(state.mod):react_default.a.createElement("p",null,"Loading")}Import.__docgenInfo={description:"",methods:[],displayName:"Import"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Import.tsx"]={name:"Import",docgenInfo:Import.__docgenInfo,path:"src/Import.tsx"});try{Import.displayName="Import",Import.__docgenInfo={description:"",displayName:"Import",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Import.tsx#Import"]={docgenInfo:Import.__docgenInfo,name:"Import",path:"src/Import.tsx#Import"})}catch(__react_docgen_typescript_loader_error){}window.React=react_default.a,window.ReactDOM=react_dom_default.a;var import_stories_bundles={"@material-ui/core":{dependencies:[],resources:[{tag:"script",name:"@material-ui/core",version:"4.10.0",path:"/umd/material-ui.production.min.js",var:"MaterialUI"},{tag:"link",url:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}]}},import_stories_Test=function Test(){return react_default.a.createElement(CDNContext.Provider,{value:new resource_ResourceService({bundles:import_stories_bundles})},react_default.a.createElement(Import,{name:"@material-ui/core"},(function(MaterialUI){return react_default.a.createElement(MaterialUI.Button,null,"Loaded")})))};import_stories_Test.__docgenInfo={description:"",methods:[],displayName:"Test"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/import.stories.tsx"]={name:"Test",docgenInfo:import_stories_Test.__docgenInfo,path:"src/stories/import.stories.tsx"})}},[[273,1,2]]]);
//# sourceMappingURL=main.0ee3f3c6e281d15d9e95.bundle.js.map