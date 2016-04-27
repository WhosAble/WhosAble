!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},a={},r={},n={}.hasOwnProperty,s=/^\.\.?(\/|$)/,i=function(e,t){for(var a,r=[],n=(s.test(t)?e+"/"+t:t).split("/"),i=0,o=n.length;o>i;i++)a=n[i],".."===a?r.pop():"."!==a&&""!==a&&r.push(a);return r.join("/")},o=function(e){return e.split("/").slice(0,-1).join("/")},c=function(t){return function(a){var r=i(o(t),a);return e.require(r,t)}},l=function(e,t){var r=null;r=f&&f.createHot(e);var n={id:e,exports:{},hot:r};return a[e]=n,t(n.exports,c(e),n),n.exports},u=function(e){return r[e]?u(r[e]):e},p=function(e,t){return u(i(o(e),t))},d=function(e,r){null==r&&(r="/");var s=u(e);if(n.call(a,s))return a[s].exports;if(n.call(t,s))return l(s,t[s]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var m=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,g=function(e){if(m.test(e)){var t=e.replace(m,"");n.call(r,t)&&r[t].replace(m,"")!==t+"/index"||(r[t]=e)}if(h.test(e)){var a=e.replace(h,"");n.call(r,a)||(r[a]=e)}};d.register=d.define=function(e,r){if("object"==typeof e)for(var s in e)n.call(e,s)&&d.register(s,e[s]);else t[e]=r,delete a[e],g(e)},d.list=function(){var e=[];for(var a in t)n.call(t,a)&&e.push(a);return e};var f=e._hmr&&new e._hmr(p,d,t,a);d._cache=a,d.hmr=f&&f.wrap,d.brunch=!0,e.require=d}}(),function(){var e;window;require.register("web/static/js/app.js",function(e,t,a){"use strict";function r(){0==window.AuthStore.isLoggedIn()&&setTimeout(function(){s.browserHistory.push("/login")},100)}function n(){1==window.AuthStore.isLoggedIn()&&setTimeout(function(){s.browserHistory.push("/app")},100)}t("phoenix_html");var s=t("react-router");window.React=t("react"),window.ReactDOM=t("react-dom"),window.Dispatcher=t("./dispatcher"),window.AuthStore=t("./stores/auth-store"),window.AuthStore.connectSocket();var i=t("./react/pages/home-page"),o=t("./react/pages/login-page"),c=t("./react/pages/signup-page"),l=t("./react/pages/dashboard-page"),u=t("./react/pages/new-contact-page"),p=t("./react/pages/contacts-page"),d=t("./react/pages/new-job-page"),m=t("./react/pages/jobs-page"),h=t("./react/pages/not-found-page");ReactDOM.render(React.createElement(s.Router,{history:s.browserHistory},React.createElement(s.Route,{path:"/",component:i}),React.createElement(s.Route,{path:"/login",component:o,onEnter:n}),React.createElement(s.Route,{path:"/signup",component:c,onEnter:n}),React.createElement(s.Route,{path:"/app",component:l,onEnter:r}),React.createElement(s.Route,{path:"/app/contacts",component:p,onEnter:r}),React.createElement(s.Route,{path:"/app/contacts/new",component:u,onEnter:r}),React.createElement(s.Route,{path:"/app/jobs",component:m,onEnter:r}),React.createElement(s.Route,{path:"/app/jobs/new",component:d,onEnter:r}),React.createElement(s.Route,{path:"*",component:h})),document.getElementById("react-component"))}),require.register("web/static/js/dispatcher.js",function(e,t,a){"use strict";var r=t("react-router"),n={login:function(e,t){return $.ajax({method:"POST",url:"/api/login",data:{email:e,password:t}}).done(function(e){"success"==e.status&&(window.AuthStore.setSession(e),r.browserHistory.push("/app"))})},logout:function(){window.AuthStore.clearSession(),r.browserHistory.push("/login")},signup:function(e,t,a,r){return $.ajax({method:"POST",url:"/api/signup",data:{user:{first_name:e,last_name:t,email:a,password:r}}})}};a.exports=n}),require.register("web/static/js/react/create-btn.js",function(e,t,a){"use strict";var r=React.createClass({displayName:"CreateBtn",propTypes:{title:React.PropTypes.string.isRequired,onCreate:React.PropTypes.func.isRequired},render:function(){return React.createElement("div",{id:"createbutton",onClick:this.props.onCreate},React.createElement("i",{className:"fa fa-plus"}),React.createElement("div",{id:"button-label"},this.props.title))}});a.exports=r}),require.register("web/static/js/react/forms/login-form.js",function(e,t,a){"use strict";var r=t("./password-field"),n=t("./text-field"),s=t("../loading-ellipsis"),i=React.createClass({displayName:"LoginForm",getInitialState:function(){return{email:null,password:null,errors:[],loading:!1}},handleFieldChange:function(e,t){var a={};a[e]=t,this.setState(a)},login:function(e){e.preventDefault();var t=this;if(0==this.state.loading){this.setState({loading:!0});window.Dispatcher.login(this.state.email,this.state.password).done(function(e){"failure"==e.status&&t.setState({loading:!1,errors:[{message:"Authentication failed!",field:"password"}]})}).error(function(){t.setState({loading:!1,errors:[{message:"Authentication failed!",field:"password"}]})})}},parseErrors:function(e){return 0==this.state.errors.length?[]:this.state.errors.map(function(t){return t.field==e?t:void 0})},renderBtn:function(){return this.state.loading?React.createElement("button",{type:"submit",className:"btn"},React.createElement(s,null,"Logging In")):React.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.login},"Login")},render:function(){return React.createElement("form",{onSubmit:this.login},React.createElement("h1",null,"Login Form"),React.createElement(n,{label:"Email",value:this.state.email,errors:this.parseErrors("email"),onChange:this.handleFieldChange.bind(this,"email")}),React.createElement(r,{label:"Password",value:this.state.password,errors:this.parseErrors("password"),onChange:this.handleFieldChange.bind(this,"password")}),this.renderBtn())}});a.exports=i}),require.register("web/static/js/react/forms/password-field.js",function(e,t,a){"use strict";var r=React.createClass({displayName:"TextField",propTypes:{label:React.PropTypes.string.isRequired,value:React.PropTypes.string,errors:React.PropTypes.array,onChange:React.PropTypes.func.isRequired},handleChange:function(e){this.props.onChange(e.target.value)},renderErrors:function(){return this.props.errors?this.props.errors.map(function(e,t){return"undefined"!=typeof e?React.createElement("div",{key:t,className:"error"},e.message):void 0}):void 0},render:function(){return React.createElement("div",{className:"form-group"},React.createElement("label",{className:"control-label"},this.props.label),React.createElement("input",{type:"password",className:"form-control",value:this.props.value,onChange:this.handleChange}),React.createElement("div",{className:"errors"},this.renderErrors()))}});a.exports=r}),require.register("web/static/js/react/forms/signup-form.js",function(e,t,a){"use strict";var r=t("./password-field"),n=t("./text-field"),s=t("../loading-ellipsis"),i=React.createClass({displayName:"SignupForm",getInitialState:function(){return{firstName:null,lastName:null,email:null,password:null,confirmPassword:null,errors:[],loading:!1}},handleFieldChange:function(e,t){var a={};a[e]=t,this.setState(a)},parseErrors:function(e){return 0==this.state.errors.length?[]:this.state.errors.map(function(t){return t.field==e?t:void 0})},signup:function(e){e.preventDefault();var t=this;if(0==this.state.loading)if(this.setState({loading:!0}),this.state.password==this.state.confirmPassword){window.Dispatcher.signup(this.state.firstName,this.state.lastName,this.state.email,this.state.password).done(function(e){"failure"==e.status?t.setState({loading:!1,errors:e.errors}):"success"==e.status&&window.Dispatcher.login(t.state.email,t.state.password)}).error(function(){t.setState({loading:!1,errors:[{message:"Signup failed!",field:"email"}]})})}else this.setState({loading:!1,errors:[{message:"don't match",field:"password"}]})},renderBtn:function(){return this.state.loading?React.createElement("button",{type:"submit",className:"btn"},React.createElement(s,null,"Signing Up")):React.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.signup},"Submit")},render:function(){return React.createElement("form",{onSubmit:this.signup},React.createElement("h1",null,"Signup Form"),React.createElement(n,{label:"First Name",value:this.state.firstName,errors:this.parseErrors("first_name"),onChange:this.handleFieldChange.bind(this,"firstName")}),React.createElement(n,{label:"Last Name",value:this.state.lastName,errors:this.parseErrors("last_name"),onChange:this.handleFieldChange.bind(this,"lastName")}),React.createElement(n,{label:"Email",value:this.state.email,errors:this.parseErrors("email"),onChange:this.handleFieldChange.bind(this,"email")}),React.createElement(r,{label:"Password",value:this.state.password,errors:this.parseErrors("password"),onChange:this.handleFieldChange.bind(this,"password")}),React.createElement(r,{label:"Confirm Password",value:this.state.confirmPassword,errors:this.parseErrors("password"),onChange:this.handleFieldChange.bind(this,"confirmPassword")}),this.renderBtn())}});a.exports=i}),require.register("web/static/js/react/forms/text-field.js",function(e,t,a){"use strict";var r=React.createClass({displayName:"TextField",propTypes:{label:React.PropTypes.string.isRequired,value:React.PropTypes.string,errors:React.PropTypes.array,onChange:React.PropTypes.func.isRequired},handleChange:function(e){this.props.onChange(e.target.value)},renderErrors:function(){return this.props.errors?this.props.errors.map(function(e,t){return"undefined"!=typeof e?React.createElement("div",{key:t,className:"error"},e.message):void 0}):void 0},render:function(){return React.createElement("div",{className:"form-group"},React.createElement("label",{className:"control-label"},this.props.label),React.createElement("input",{type:"text",className:"form-control",value:this.props.value,onChange:this.handleChange}),React.createElement("div",{className:"errors"},this.renderErrors()))}});a.exports=r}),require.register("web/static/js/react/loading-ellipsis.js",function(e,t,a){"use strict";var r=React.createClass({displayName:"LoadingEllipsis",dotInterval:null,getInitialState:function(){return{dotCount:0,dots:""}},componentDidMount:function(){this.dotInterval=setInterval(this.updateDots,500)},componentWillUnmount:function(){clearInterval(this.dotInterval)},updateDots:function(){var e=this.state.dotCount+1;e>=4&&(e=0);var t=".".repeat(e);this.setState({dotCount:e,dots:t})},render:function(){return React.createElement("span",{className:"loading-ellipsis"},this.props.children||"loading",React.createElement("span",{className:"dot-holder"},React.createElement("span",{className:"invisi-dots"},"..."),React.createElement("span",{className:"dots"},this.state.dots)))}});a.exports=r}),require.register("web/static/js/react/nav-bar.js",function(e,t,a){"use strict";var r=t("react-router"),n=React.createClass({displayName:"NavBar",propTypes:{},getInitialState:function(){return{isLoggedIn:!1,menuOpen:!1}},componentDidMount:function(){window.AuthStore.subscribe(this.receiveState)},componentWillUnmount:function(){window.AuthStore.unsubscribe(this.receiveState)},receiveState:function(e,t,a){this.setState({isLoggedIn:e})},openMenu:function(){this.setState({menuOpen:!this.state.menuOpen})},handleLogout:function(){window.Dispatcher.logout()},renderLogo:function(){return React.createElement("li",null,React.createElement(r.Link,{to:"/"},React.createElement("img",{src:"/images/logo.png",alt:"WhosAble"})))},renderMenuBtn:function(){var e="";return this.state.menuOpen&&(e="open"),React.createElement("li",null,React.createElement("div",{id:"menu-btn",className:e,onClick:this.openMenu},React.createElement("span",null),React.createElement("span",null),React.createElement("span",null),React.createElement("span",null)))},renderMenu:function(){var e="";return this.state.menuOpen&&(e="open"),this.state.isLoggedIn&&(e+=" app-menu"),this.state.isLoggedIn?React.createElement("ul",{id:"menu",className:e},React.createElement("li",null,React.createElement(r.Link,{to:"/app"},React.createElement("i",{className:"fa fa-tachometer"}),"Dashboard")),React.createElement("li",null,React.createElement(r.Link,{to:"/app/jobs"},React.createElement("i",{className:"fa fa-briefcase"}),"Jobs")),React.createElement("li",null,React.createElement(r.Link,{to:"/app/contacts"},React.createElement("i",{className:"fa fa-users"}),"Contacts")),React.createElement("li",null,React.createElement("a",{href:"javascript:;",onClick:this.handleLogout},React.createElement("i",{className:"fa fa-sign-out"}),"Logout"))):React.createElement("ul",{id:"menu",className:e},React.createElement("li",null,React.createElement(r.Link,{to:"/signup"},React.createElement("i",{className:"fa fa-plus"}),"Signup")),React.createElement("li",null,React.createElement(r.Link,{to:"/login"},React.createElement("i",{className:"fa fa-sign-in"}),"Login")))},render:function(){return React.createElement("div",{id:"nav-bar"},React.createElement("ul",{id:"nav-bar-items"},this.renderLogo(),this.renderMenuBtn()),this.renderMenu())}});a.exports=n}),require.register("web/static/js/react/pages/contacts-page.js",function(e,t,a){"use strict";var r=t("react-router"),n=t("../create-btn"),s=t("../nav-bar"),i=React.createClass({displayName:"ContactsPage",handleCreate:function(){r.browserHistory.push("/app/contacts/new")},render:function(){return React.createElement("div",null,React.createElement(s,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement(n,{title:"Create a new Contact",onCreate:this.handleCreate}))))}});a.exports=i}),require.register("web/static/js/react/pages/dashboard-page.js",function(e,t,a){"use strict";var r=t("react-router"),n=t("../create-btn"),s=t("../nav-bar"),i=React.createClass({displayName:"DashboardPage",handleCreate:function(){r.browserHistory.push("/app/jobs/new")},render:function(){return React.createElement("div",null,React.createElement(s,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement(n,{title:"Create a new Job",onCreate:this.handleCreate}))))}});a.exports=i}),require.register("web/static/js/react/pages/home-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=t("../forms/signup-form"),s=React.createClass({displayName:"HomePage",propTypes:{},getInitialState:function(){return{isLoggedIn:!1}},componentDidMount:function(){window.AuthStore.subscribe(this.receiveState)},componentWillUnmount:function(){window.AuthStore.unsubscribe(this.receiveState)},receiveState:function(e,t,a){this.setState({isLoggedIn:e})},renderSignupForm:function(){return this.state.isLoggedIn?void 0:React.createElement(n,null)},render:function(){return React.createElement("div",null,React.createElement(r,{isLoggedIn:this.state.isLoggedIn}),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement("div",null,"Home Page Placeholder"),this.renderSignupForm())))}});a.exports=s}),require.register("web/static/js/react/pages/jobs-page.js",function(e,t,a){"use strict";var r=t("react-router"),n=t("../create-btn"),s=t("../nav-bar"),i=React.createClass({displayName:"JobsPage",handleCreate:function(){r.browserHistory.push("/app/jobs/new")},render:function(){return React.createElement("div",null,React.createElement(s,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement(n,{title:"Create a new Job",onCreate:this.handleCreate}))))}});a.exports=i}),require.register("web/static/js/react/pages/login-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=t("../forms/login-form"),s=React.createClass({displayName:"LoginPage",propTypes:{},render:function(){return React.createElement("div",null,React.createElement(r,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement(n,null))))}});a.exports=s}),require.register("web/static/js/react/pages/new-contact-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=React.createClass({displayName:"NewContactPage",render:function(){return React.createElement("div",null,React.createElement(r,null),"New Contact Form here")}});a.exports=n}),require.register("web/static/js/react/pages/new-job-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=React.createClass({displayName:"NewJobPage",render:function(){return React.createElement("div",null,React.createElement(r,null),"New Job Form here")}});a.exports=n}),require.register("web/static/js/react/pages/not-found-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=React.createClass({displayName:"NotFoundPage",propTypes:{},render:function(){return React.createElement("div",null,React.createElement(r,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement("h1",null,"404- Page Not Found"))))}});a.exports=n}),require.register("web/static/js/react/pages/signup-page.js",function(e,t,a){"use strict";var r=t("../nav-bar"),n=t("../forms/signup-form"),s=React.createClass({displayName:"SignupPage",propTypes:{},render:function(){return React.createElement("div",null,React.createElement(r,null),React.createElement("div",{className:"container"},React.createElement("main",{role:"main"},React.createElement(n,null))))}});a.exports=s}),require.register("web/static/js/socket.js",function(e,t,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("phoenix"),n=new r.Socket("/account_socket",{params:{token:window.userToken}});n.connect();var s=n.channel("topic:subtopic",{});s.join().receive("ok",function(e){console.log("Joined successfully",e)}).receive("error",function(e){console.log("Unable to join",e)}),e["default"]=n}),require.register("web/static/js/stores/auth-store.js",function(e,t,a){"use strict";var r=t("phoenix");a.exports={token:sessionStorage.getItem("token"),userID:sessionStorage.getItem("userID"),accountID:sessionStorage.getItem("accountID"),hashLocation:null,socket:null,channel:null,callBacks:[],subscribe:function(e){window.AuthStore.callBacks.push(e),window.AuthStore.sendCallBack(e)},unsubscribe:function(e){var t=window.AuthStore.callBacks.indexOf(e);-1!=t&&window.AuthStore.callBacks.splice(t,1)},sendCallBacks:function(){window.AuthStore.callBacks.forEach(function(e){e&&"function"==typeof e&&window.AuthStore.sendCallBack(e)})},sendCallBack:function(e){e(window.AuthStore.isLoggedIn(),window.AuthStore.userID,window.AuthStore.accountID)},isLoggedIn:function(){return!!window.AuthStore.token&&!!window.AuthStore.accountID&&!!window.AuthStore.userID},setSession:function(e){sessionStorage.setItem("token",e.token),sessionStorage.setItem("userID",e.user_id),sessionStorage.setItem("accountID",e.account_id),window.AuthStore.token=e.token,window.AuthStore.userID=e.user_id,window.AuthStore.accountID=e.account_id,window.AuthStore.sendCallBacks()},clearSession:function(){sessionStorage.clear(),window.AuthStore.token=null,window.AuthStore.userID=null,window.AuthStore.accountID=null,window.AuthStore.sendCallBacks()},connectSocket:function(){window.AuthStore.isLoggedIn()&&!window.AuthStore.socket&&(window.AuthStore.socket=new r.Socket("/account_socket",{params:{token:window.AuthStore.token}}),window.AuthStore.socket.connect(),window.AuthStore.channel=window.AuthStore.socket.channel("account:"+window.AuthStore.accountID,{token:window.AuthStore.token}),window.AuthStore.channel.join().receive("ok",function(e){console.log("Joined successfully",e)}).receive("error",function(e){console.log("Unable to join",e)}))}}}),require.alias("phoenix/priv/static/phoenix.js","phoenix"),require.alias("phoenix_html/priv/static/phoenix_html.js","phoenix_html"),require.alias("react-router/lib/index.js","react-router"),require.alias("react/react.js","react"),require.alias("invariant/browser.js","invariant"),require.alias("warning/browser.js","warning"),require.alias("history/lib/index.js","history"),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,a){})}(),require("___globals___"),require("web/static/js/app");