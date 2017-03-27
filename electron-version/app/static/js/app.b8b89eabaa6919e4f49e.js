webpackJsonp([1,2],Array(25).concat([function(t,e,a){"use strict";var n=a(15),o=a(113),i=a(103),c=a.n(i),r=a(100),s=a.n(r),u=a(99),d=a.n(u),l=a(102),f=a.n(l),h=a(104),v=a.n(h);n.a.use(o.a),e.a=new o.a({routes:[{path:"/",name:"Splash",component:c.a},{path:"/home",name:"Home",component:s.a},{path:"/game-board",name:"Game Board",component:d.a},{path:"/settings",name:"Settings",component:f.a},{path:"/styles",name:"Styles",component:v.a}]})},,,,,,,,,,,,,,,,function(t,e,a){"use strict";var n=a(3),o=a.n(n),i=a(15),c=a(7),r=a(45),s=a(44),u=a(46);i.a.use(c.c);var d={cards:[{faceId:0,faceUp:!1,matchFound:!1,face:"https://unsplash.it/100/120"},{faceId:1,faceUp:!1,matchFound:!1,face:"https://unsplash.it/100/121"},{faceId:2,faceUp:!1,matchFound:!1,face:"https://unsplash.it/101/120"},{faceId:3,faceUp:!1,matchFound:!1,face:"https://unsplash.it/100/119"},{faceId:4,faceUp:!1,matchFound:!1,face:"https://unsplash.it/99/120"}]},l={},f={},h=new c.c.Store({state:d,mutations:l,actions:f,modules:{home:o()({namespaced:!0},r.a),gameboard:o()({namespaced:!0},s.a),notification:o()({namespaced:!0},u.a)}});e.a=h},function(t,e){},function(t,e,a){a(96);var n=a(2)(a(47),a(111),"data-v-993753fc",null);t.exports=n.exports},function(t,e,a){"use strict";var n=a(27),o=a.n(n),i={currentSelection:[],notification:{message:null,type:null},lockGameBoard:!1,deck:[]},c={deck:function(t){return t.deck},gameIsActive:function(t){return t.deck.length>0},cardsMatch:function(t){return 2===t.currentSelection.length&&t.currentSelection[0].faceId===t.currentSelection[1].faceId},matchCount:function(t){return t.deck.filter(function(t){return t.matchFound===!0}).reduce(function(t,e){return t+1},0)},matchesLeftToFind:function(t,e){return t.deck.length-e.matchCount},faceUpCount:function(t){return t.deck.filter(function(t){return t.faceUp===!0}).reduce(function(t,e){return t+1},0)},allCardsHaveBeenMatched:function(t){return!(t.deck.filter(function(t){return t.matchFound===!1}).length>0)}},r={flip:function(t,e){if(t.state.currentSelection.length>1&&t.dispatch("clearSelectionStack"),t.commit("flipCard",e),t.commit("pushCardOntoSelectionStack",e),!(i.currentSelection.length<=1)){if(!t.getters.cardsMatch){var a=function(){t.state.currentSelection.forEach(function(e){return t.commit("flipCard",e)}),t.commit("clearSelectionStack")};return void t.dispatch("notification/triggerNotification",{callback:a,message:"These cards do not match :/",type:"info",selfDismissing:!0},{root:!0})}t.dispatch("handleMatchSelection").then(function(){if(t.getters.allCardsHaveBeenMatched){t.dispatch("notification/triggerNotification",{callback:function(){},message:"You won!!",type:"success"},{root:!0})}else{var e=function(){t.commit("clearSelectionStack")};t.dispatch("notification/triggerNotification",{callback:e,message:"Match found :D",type:"success",selfDismissing:!0},{root:!0})}})}},clearSelectionStack:function(t){return new o.a(function(e,a){t.state.currentSelection.forEach(function(e){return t.commit("flipCard",e)}),t.commit("clearSelectionStack"),e()})},handleMatchSelection:function(t){return new o.a(function(e,a){t.state.currentSelection.forEach(function(e){return t.commit("markAsMatchFound",e)}),e()})}},s={startNewGame:function(t,e){t.deck=e},flipCard:function(t,e){e.faceUp=!e.faceUp},markAsMatchFound:function(t,e){e.matchFound=!0},pushCardOntoSelectionStack:function(t,e){t.currentSelection.push(e)},clearSelectionStack:function(t){t.currentSelection=[]},lockGameBoard:function(t,e){t.lockGameBoard=e}};e.a={state:i,getters:c,mutations:s,actions:r}},function(t,e,a){"use strict";function n(t){for(var e=t.length,a=void 0,n=void 0;e;)n=Math.floor(Math.random()*e--),a=t[e],t[e]=t[n],t[n]=a;return t}function o(t,e){for(var a=[],n=t/2,o=0,i=0;o<n;o++)i===e.length&&(i=0),a.push(e[i]),i+=1;return a}var i=a(26),c=a.n(i),r=a(25),s={boardSize:{width:null,height:null},showKickoffButtons:!0,showBoardSizeSelector:!1,showSavedStates:!1,savedStates:[{id:1,label:"almost got it"},{id:2,label:"my 50 by 50 board"},{id:3,label:"the one with goofey pics"}]},u={getMoreInformation:function(t){return t.showBoardSizeSelector||t.showSavedStates},totalTiles:function(t){return t.boardSize.width*t.boardSize.height},validBoardSize:function(t,e){return 0!==e.totalTiles&&e.totalTiles%2==0}},d={setBoardWidth:function(t,e){t.boardSize.width=e},setBoardHeight:function(t,e){t.boardSize.height=e},getBoardSize:function(t){t.showKickoffButtons=!1,t.showBoardSizeSelector=!0},pickFromSavedGame:function(t){t.showKickoffButtons=!1,t.showSavedStates=!0},backToKickoff:function(t){t.showSavedStates=!1,t.showBoardSizeSelector=!1,t.showKickoffButtons=!0},loadSavedState:function(t,e){console.log("loading saved state: "+e),r.a.push("game-board")}},l={startNewGame:function(t){var e=t.commit,a=t.getters,i=(t.state,t.rootGetters,t.rootState),s=o(a.totalTiles,i.cards),u=s.map(function(t){return[c()({},t),c()({},t)]}).reduce(function(t,e){return t.concat(e)}).map(function(t,e){return t.id=e,t});r.a.push("game-board"),e("gameboard/startNewGame",n(u),{root:!0})},saveAndQuit:function(t,e){console.log("store saved state"),console.log("reset home state"),r.a.push("home")}};e.a={state:s,getters:u,mutations:d,actions:l}},function(t,e,a){"use strict";var n=a(27),o=a.n(n),i={message:null,type:null,timeoutId:null},c={showNotification:function(t){return null!==t.message}},r={setData:function(t,e){t.message=e.message,t.type=e.type,t.timeoutId=e.timeoutId},clearNotificationTimeout:function(t){clearTimeout(t.timeoutId)}},s={triggerNotification:function(t,e){var a=(t.state,t.commit),n=(t.dispatch,arguments.length>2&&void 0!==arguments[2]&&arguments[2],null);e.hasOwnProperty("selfDismissing")&&(a("clearNotificationTimeout"),n=setTimeout(function(){a("setData",{message:null,type:null,timeoutId:null}),e.hasOwnProperty("callback")&&e.callback()},3e3)),a("setData",{message:e.message,type:e.type,timeoutId:n})},clearNotification:function(t){var e=t.commit;return new o.a(function(t,a){e("clearNotificationTimeout"),e("setData",{message:null,type:null,timeoutId:null}),t()})}};e.a={state:i,getters:c,mutations:r,actions:s}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),o=a.n(n),i=a(7),c=a(101),r=a.n(c);e.default={name:"app",components:{Notification:r.a},computed:o()({},a.i(i.a)("notification",["showNotification"]),a.i(i.a)("gameboard",["gameIsActive","cardsMatch"])),methods:{clearNotification:function(){var t=this;this.gameIsActive&&!this.cardsMatch&&this.$store.dispatch("gameboard/clearSelectionStack").then(function(){t.$store.dispatch("notification/clearNotification")}),this.$store.dispatch("notification/clearNotification")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),o=a.n(n),i=a(7);e.default={props:["card"],data:function(){return{}},computed:o()({},a.i(i.b)("gameboard",{lockGameBoard:"lockGameBoard"}),{cardBackground:function(){return{"background-image":'url("'+this.card.face+'")'}}}),methods:{flip:function(){this.$store.commit("notification/clearNotificationTimeout"),this.$store.commit("notification/setData",{message:null,type:null,timeoutId:null}),this.$store.dispatch("gameboard/flip",this.card)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),o=a.n(n),i=a(7),c=a(98),r=a.n(c);e.default={components:{Card:r.a},data:function(){return{}},computed:o()({},a.i(i.b)("gameboard",{currentSelection:function(t){return t.currentSelection}}),a.i(i.a)("gameboard",{deck:"deck",matchCount:"matchCount",matchesLeft:"matchesLeftToFind",faceUpCount:"faceUpCount"})),methods:o()({restart:function(){}},a.i(i.d)("home",["saveAndQuit"])),created:function(){0===this.deck.length&&this.$router.push("home")}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),o=a.n(n),i=a(7);e.default={data:function(){return{}},computed:o()({height:{get:function(){return this.$store.state.home.boardSize.height},set:function(t){this.$store.commit("home/setBoardHeight",t)}},width:{get:function(){return this.$store.state.home.boardSize.width},set:function(t){this.$store.commit("home/setBoardWidth",t)}}},a.i(i.b)("home",{boardSize:function(t){return t.boardSize},showKickoffButtons:function(t){return t.showKickoffButtons},showBoardSizeSelector:function(t){return t.showBoardSizeSelector},showSavedStates:function(t){return t.showSavedStates},savedStates:function(t){return t.savedStates}}),a.i(i.a)("home",{getMoreInformation:"getMoreInformation",totalTiles:"totalTiles",validBoardSize:"validBoardSize"})),methods:o()({numsOnlyPlz:function(t){"key"in t&&null!==t.key.match(/[0-9]+/)||t.preventDefault()},loadSavedState:function(t){this.$store.commit("home/loadSavedState",t)},startGame:function(){this.validBoardSize&&this.$store.dispatch("home/startNewGame")}},a.i(i.e)("home",["getBoardSize","pickFromSavedGame","backToKickoff","loadSavedState"]))}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),o=a.n(n),i=a(7);e.default={data:function(){return{}},computed:o()({},a.i(i.b)("notification",{message:"message",type:"type"}),{typeStyle:function(){return{success:"success"===this.type,info:"info"===this.type,warning:"warning"===this.type,error:"error"===this.type}}})}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"splash",data:function(){return{}},created:function(){var t=this;setTimeout(function(){t.$router.push("home")},3e3)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"splash",data:function(){return{}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,a){a(95);var n=a(2)(a(48),a(110),"data-v-7d05750a",null);t.exports=n.exports},function(t,e,a){a(91);var n=a(2)(a(49),a(106),"data-v-1404e08a",null);t.exports=n.exports},function(t,e,a){a(93);var n=a(2)(a(50),a(108),"data-v-60886f59",null);t.exports=n.exports},function(t,e,a){a(92);var n=a(2)(a(51),a(107),"data-v-2bf6c936",null);t.exports=n.exports},function(t,e,a){a(90);var n=a(2)(a(52),a(105),"data-v-1202739d",null);t.exports=n.exports},function(t,e,a){a(97);var n=a(2)(a(53),a(112),"data-v-a6155f3e",null);t.exports=n.exports},function(t,e,a){a(94);var n=a(2)(a(54),a(109),"data-v-7312095c",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"settings-container"},[t._v("\n    settings\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"game-board-container"},[a("h1",[t._v("Let's Match!")]),t._v(" "),a("section",[a("div",{staticClass:"board"},t._l(t.deck,function(t){return a("card",{attrs:{card:t}})})),t._v(" "),a("div",{staticClass:"side-bar"},[a("div",{staticClass:"match-status"},[a("div",[a("span",[t._v("Cards matched:")]),a("span",[t._v(t._s(t.matchCount))])]),t._v(" "),a("div",[a("span",[t._v("Cards left:")]),a("span",[t._v(t._s(t.matchesLeft))])]),t._v(" "),a("div",[a("span",[t._v("Face up count:")]),a("span",[t._v(t._s(t.faceUpCount))])])]),t._v(" "),a("div",{staticClass:"current-match"},[a("h3",[t._v("Current Match")]),t._v(" "),a("div",[a("div",[void 0!==t.currentSelection[0]?a("card",{attrs:{card:t.currentSelection[0]}}):a("div",{staticClass:"card"})],1),t._v(" "),a("div",[void 0!==t.currentSelection[1]?a("card",{attrs:{card:t.currentSelection[1]}}):a("div",{staticClass:"card"})],1)])]),t._v(" "),a("div",{staticClass:"actions"},[a("button",{on:{click:t.restart}},[t._v("Restart")]),t._v(" "),a("button",{on:{click:t.saveAndQuit}},[t._v("Save & Quit")])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"notification-container",class:t.typeStyle},[a("h2",{domProps:{textContent:t._s(t.message)}}),t._v(" "),t._t("closeButton")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-container"},[a("h1",[t._v("The Matching Game")]),t._v(" "),t.showKickoffButtons?a("div",{staticClass:"kickoff-buttons"},[a("button",{on:{click:t.getBoardSize}},[t._v("New Game")]),t._v(" "),a("button",{on:{click:t.pickFromSavedGame}},[t._v("Continue")])]):t._e(),t._v(" "),t.getMoreInformation?a("div",{staticClass:"get-more-detail"},[t.showBoardSizeSelector?a("div",{staticClass:"get-board-size"},[a("table",[t._m(0),a("tr",[a("td",[t._v("Width:")]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.width,expression:"width"}],attrs:{placeholder:"10"},domProps:{value:t.width},on:{keypress:t.numsOnlyPlz,input:function(e){e.target.composing||(t.width=e.target.value)}}})])]),t._v(" "),a("tr",[a("td",[t._v("Height:")]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.height,expression:"height"}],attrs:{placeholder:"5"},domProps:{value:t.height},on:{keypress:t.numsOnlyPlz,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.startGame(e)},input:function(e){e.target.composing||(t.height=e.target.value)}}})])]),t._v(" "),a("tr",[a("td",[t._v("Total Tiles:")]),a("td",[a("span",{domProps:{textContent:t._s(t.totalTiles)}})])]),t._v(" "),a("td",[t._v("Even number of tiles:")]),a("td",[t._v(t._s(t.validBoardSize))]),t._v(" "),a("tr",[a("td",{attrs:{colspan:"2"}},[a("div",{staticClass:"start-button-container"},[a("button",{class:{disabled:!t.validBoardSize},attrs:{disabled:!t.validBoardSize},on:{click:t.startGame}},[t._v("Start!")])])])])])]):t._e(),t._v(" "),t.showSavedStates?a("div",{staticClass:"saved-games"},[a("table",[t._m(1),t._v(" "),t._l(t.savedStates,function(e){return a("tr",[a("td",[a("button",{domProps:{textContent:t._s(e.label)},on:{click:function(a){t.loadSavedState(e.id)}}})])])})],2)]):t._e(),t._v(" "),a("button",{on:{click:t.backToKickoff}},[t._v("Back")])]):t._e()])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",{attrs:{colspan:"2"}},[a("p",[t._v("Board with size")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[a("p",[t._v("Saved Games")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"style-container"},[a("h1",[t._v("h1 The Matching Game")]),t._v(" "),a("h2",[t._v("h2 The Matching Game")]),t._v(" "),a("h3",[t._v("h3 The Matching Game")]),t._v(" "),a("h4",[t._v("h4 The Matching Game")]),t._v(" "),a("h5",[t._v("h5 The Matching Game")]),t._v(" "),a("h6",[t._v("h6 The Matching Game")]),t._v(" "),a("ul",[a("li",[t._v("one")]),t._v(" "),a("li",[t._v("two")]),t._v(" "),a("li",[t._v("three")])]),t._v(" "),a("ol",[a("li",[t._v("A")]),t._v(" "),a("li",[t._v("B")]),t._v(" "),a("li",[t._v("C")])]),t._v(" "),a("a",[t._v("a link looks like this")]),t._v(" "),a("p",[t._v("this is a paragraph.")]),t._v(" "),a("p",[t._v("These are cards on a board:")]),t._v(" "),a("div",{staticClass:"board"},[a("div",{staticClass:"card"}),t._v(" "),a("div",{staticClass:"card"})])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.card.faceUp,expression:"!card.faceUp"}],staticClass:"card back",on:{click:t.flip}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.card.faceUp,expression:"card.faceUp"}],staticClass:"front",style:t.cardBackground})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("notification",{directives:[{name:"show",rawName:"v-show",value:t.showNotification,expression:"showNotification"}]},[a("button",{on:{click:t.clearNotification},slot:"closeButton"},[t._v("X")])]),t._v(" "),a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"splash-container"},[a("h1",[t._v("The Matching Game")]),t._v(" "),a("div",{staticClass:"board"},[a("div",[a("div",{staticClass:"card"}),t._v(" "),a("div",{staticClass:"card"})]),t._v(" "),a("div",[a("div",{staticClass:"card"}),t._v(" "),a("div",{staticClass:"card"})])]),t._v(" "),a("h3",[t._v("come back and add animation to cards")])])}]}},,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(15),o=a(43),i=a.n(o),c=a(25),r=a(41);a(42),n.a.config.productionTip=!1,new n.a({el:"#app",router:c.a,store:r.a,template:"<App/>",components:{App:i.a}})}]),[116]);
//# sourceMappingURL=app.b8b89eabaa6919e4f49e.js.map