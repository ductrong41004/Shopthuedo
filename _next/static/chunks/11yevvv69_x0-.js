(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7219,e=>{"use strict";let t=(0,e.i(56420).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);e.s(["TrendingUp",0,t],7219)},24071,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["ChevronLeft",0,t],24071)},1279,e=>{"use strict";let t=(0,e.i(56420).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);e.s(["User",0,t],1279)},32149,e=>{"use strict";var t=e.i(59141);e.i(36180);var s=e.i(28719),r=e.i(17689),a=e.i(63802);async function i(){try{let e=(0,s.collection)(t.db,"customers"),r=(0,a.query)(e,(0,a.orderBy)("name","asc"));return(await (0,a.getDocs)(r)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy danh sách khách hàng:",e),[]}}async function n(e){try{let r=(0,s.collection)(t.db,"customers");return(await (0,a.addDoc)(r,{...e,totalOrders:0,totalSpent:0,createdAt:new Date().toISOString()})).id}catch(e){throw console.error("Lỗi khi thêm khách hàng:",e),e}}async function l(e,s){try{let i=(0,r.doc)(t.db,"customers",e);await (0,a.updateDoc)(i,s)}catch(e){throw console.error("Lỗi khi cập nhật khách hàng:",e),e}}async function o(e){try{let s=(0,r.doc)(t.db,"customers",e);await (0,a.deleteDoc)(s)}catch(e){throw console.error("Lỗi khi xóa khách hàng:",e),e}}async function d(e){try{let r=(0,s.collection)(t.db,"orders"),i=(0,a.query)(r,(0,a.where)("customerId","==",e),(0,a.orderBy)("startDate","desc"));return(await (0,a.getDocs)(i)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy lịch sử thuê của khách hàng:",e),[]}}e.s(["createCustomer",0,n,"deleteCustomer",0,o,"getCustomerOrders",0,d,"getCustomers",0,i,"updateCustomer",0,l])},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,d=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},c={},h=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+h(e[s]);return t}return e};function p(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let p=h(e),x=c[p]||(c[p]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(p));if(!c[x]){let t=p!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(o," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);c[x]=d(a?{["@keyframes "+x]:t}:t,s?"":"."+x)}let u=s&&c.g;return s&&(c.g=c[x]),i=c[x],u?t.data=t.data.replace(u,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let x,u,m,f=p.bind({k:1});function b(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let l=Object.assign({},i),o=l.className||a.className;s.p=Object.assign({theme:u&&u()},l),s.o=/go\d/.test(o),l.className=p.apply(s,r)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),m&&d[0]&&m(l),x(d,l)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},k="default",j=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],w={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=k)=>{C[t]=j(C[t]||w,e),N.forEach(([e,s])=>{e===t&&s(C[t])})},S=e=>Object.keys(C).forEach(t=>E(e,t)),T=(e=k)=>t=>{E(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return T(a.toasterId||(r=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},L=(e,t)=>$("blank")(e,t);L.error=$("error"),L.success=$("success"),L.loading=$("loading"),L.custom=$("custom"),L.dismiss=(e,t)=>{let s={type:3,toastId:e};t?T(t)(s):S(s)},L.dismissAll=e=>L.dismiss(void 0,e),L.remove=(e,t)=>{let s={type:4,toastId:e};t?T(t)(s):S(s)},L.removeAll=e=>L.remove(void 0,e),L.promise=(e,t,s)=>{let r=L.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?L.success(a,{id:r,...s,...null==s?void 0:s.success}):L.dismiss(r),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?L.error(a,{id:r,...s,...null==s?void 0:s.error}):L.dismiss(r)}),e};var O=1e3,z=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,U=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=b("div")`
  position: absolute;
`,V=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,_=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${_} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,B=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(q,null,t):t:"blank"===s?null:a.createElement(V,null,a.createElement(R,{...r}),"loading"!==s&&a.createElement(H,null,"error"===s?a.createElement(I,{...r}):a.createElement(K,{...r})))},G=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,X=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[r,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(B,{toast:e}),l=a.createElement(X,{...e.ariaProps},g(e.message,e));return a.createElement(G,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:n,message:l}):a.createElement(a.Fragment,null,n,l))});r=a.createElement,d.p=void 0,x=r,u=void 0,m=void 0;var Q=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let n=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:n,className:t,style:s},i)},Y=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:s,pausedAt:r}=((e={},t=k)=>{let[s,r]=(0,a.useState)(C[t]||w),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&r(C[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let n=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:n}})(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=O)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&L.dismiss(s.id);return}return setTimeout(()=>L.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let l=(0,a.useCallback)(T(t),[t]),o=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),h=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,n]),{toasts:s,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:h}}})(s,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let n,l,o=s.position||t,d=c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}),h=(n=o.includes("top"),l=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...l});return a.createElement(Q,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?Y:"",style:h},"custom"===s.type?g(s.message,s):i?i(s):a.createElement(Z,{toast:s,position:o}))}))},"default",0,L],5766)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},38769,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(32149),a=e.i(77071),i=e.i(66595),n=e.i(1279),l=e.i(56420);let o=(0,l.default)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);var d=e.i(91511);let c=(0,l.default)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]),h=(0,l.default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var p=e.i(26091),x=e.i(26441),u=e.i(73474),m=e.i(63676),f=e.i(24071),b=e.i(7219),g=e.i(28623),y=e.i(5766);e.s(["default",0,function(){let[e,l]=(0,s.useState)([]),[v,k]=(0,s.useState)([]),[j,N]=(0,s.useState)(null),[w,C]=(0,s.useState)([]),[E,S]=(0,s.useState)(!0),[T,D]=(0,s.useState)(!1),[$,L]=(0,s.useState)(!1),[O,z]=(0,s.useState)(""),[M,A]=(0,s.useState)(!1),[I,P]=(0,s.useState)(null),[R,U]=(0,s.useState)(""),[F,K]=(0,s.useState)(""),[H,V]=(0,s.useState)(""),[_,q]=(0,s.useState)(""),[B,G]=(0,s.useState)(""),[X,Z]=(0,s.useState)(""),Q=async()=>{S(!0);try{let e=await (0,r.getCustomers)();if(l(e),k(e),j){let t=e.find(e=>e.id===j.id);t&&N(t)}else e.length>0&&N(e[0])}catch(e){y.default.error("Không thể tải danh sách khách hàng.")}finally{S(!1)}};(0,s.useEffect)(()=>{Q()},[]),(0,s.useEffect)(()=>{j&&j.id?(async()=>{D(!0);try{let e=await (0,r.getCustomerOrders)(j.id);C(e)}catch(e){console.error("Lỗi khi tải lịch sử thuê:",e)}finally{D(!1)}})():C([])},[j]),(0,s.useEffect)(()=>{if(""===O.trim())k(e);else{let t=O.toLowerCase();k(e.filter(e=>e.name.toLowerCase().includes(t)||e.phone.includes(t)))}},[O,e]);let Y=async e=>{if(e.preventDefault(),!R||!F)return void y.default.error("Vui lòng điền tên và số điện thoại.");let t={name:R.trim(),phone:F.trim(),facebook:H.trim(),zalo:_.trim(),address:B.trim(),notes:X.trim()};S(!0);try{I&&I.id?(await (0,r.updateCustomer)(I.id,t),y.default.success("Cập nhật thông tin khách hàng thành công!")):(await (0,r.createCustomer)(t),y.default.success("Thêm khách hàng thành công!")),A(!1),Q()}catch(e){y.default.error("Lỗi khi lưu thông tin khách hàng.")}finally{S(!1)}},J=async e=>{if(confirm("Bạn có chắc chắn muốn xóa khách hàng này? Tất cả lịch sử mua hàng sẽ không hiển thị gắn liền nữa.")){S(!0);try{await (0,r.deleteCustomer)(e),y.default.success("Xóa khách hàng thành công!"),N(null),Q()}catch(e){y.default.error("Lỗi khi xóa khách hàng.")}finally{S(!1)}}},W=e=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e);return(0,t.jsxs)("div",{className:"h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 overflow-hidden animate-in fade-in duration-300",children:[(0,t.jsx)(y.Toaster,{position:"top-right"}),(0,t.jsxs)("div",{className:`w-full md:w-80 lg:w-96 flex flex-col bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden ${$?"hidden md:flex":"flex"}`,children:[(0,t.jsxs)("div",{className:"p-4 border-b border-brand-pink-pastel space-y-3",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h3",{className:"heading-serif font-bold text-text-dark text-base",children:"Khách hàng"}),(0,t.jsxs)("button",{onClick:()=>{P(null),U(""),K(""),V(""),q(""),G(""),Z(""),A(!0)},className:"btn-primary py-1.5 px-3 text-xs font-semibold cursor-pointer",children:[(0,t.jsx)(a.Plus,{className:"w-3.5 h-3.5"})," Thêm mới"]})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray",children:(0,t.jsx)(i.Search,{className:"w-3.5 h-3.5"})}),(0,t.jsx)("input",{type:"text",placeholder:"Tìm theo tên, SĐT...",value:O,onChange:e=>z(e.target.value),className:"w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"})]})]}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto divide-y divide-brand-pink-pastel/40",children:E?(0,t.jsx)("div",{className:"p-8 text-center text-xs text-text-gray",children:"Đang tải..."}):v.length>0?v.map(e=>(0,t.jsxs)("div",{onClick:()=>{N(e),L(!0)},className:`p-4 flex items-center justify-between cursor-pointer transition-colors text-left ${j?.id===e.id?"bg-brand-pink/45 border-l-4 border-primary":"hover:bg-brand-beige/30"}`,children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("h4",{className:"font-semibold text-text-dark text-sm",children:e.name}),(0,t.jsxs)("p",{className:"text-xs text-text-gray inline-flex items-center gap-1",children:[(0,t.jsx)(o,{className:"w-3 h-3"})," ",e.phone]})]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold uppercase tracking-wider",children:"Tổng chi tiêu"}),(0,t.jsx)("p",{className:"text-xs font-bold text-primary",children:W(e.totalSpent||0)})]})]},e.id)):(0,t.jsx)("div",{className:"p-8 text-center text-xs text-text-gray",children:"Không tìm thấy khách hàng."})})]}),(0,t.jsx)("div",{className:`flex-1 bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden flex flex-col ${$?"flex":"hidden md:flex"}`,children:j?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"p-6 border-b border-brand-pink-pastel flex items-center justify-between bg-brand-beige/20",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("button",{onClick:()=>L(!1),className:"md:hidden p-1.5 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer",children:(0,t.jsx)(f.ChevronLeft,{className:"w-5 h-5"})}),(0,t.jsx)("div",{className:"w-12 h-12 rounded-full bg-brand-pink text-primary flex items-center justify-center font-bold text-lg",children:(0,t.jsx)(n.User,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"heading-serif font-bold text-lg text-text-dark",children:j.name}),(0,t.jsxs)("p",{className:"text-xs text-text-muted",children:["Đăng ký ngày: ",j.createdAt?.substring(0,10)||"N/A"]})]})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>{P(j),U(j.name),K(j.phone),V(j.facebook||""),q(j.zalo||""),G(j.address||""),Z(j.notes||""),A(!0)},className:"p-2 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer",title:"Sửa thông tin",children:(0,t.jsx)(x.Edit,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>J(j.id),className:"p-2 border border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer",title:"Xóa khách hàng",children:(0,t.jsx)(u.Trash2,{className:"w-4 h-4"})})]})]}),(0,t.jsxs)("div",{className:"flex-1 overflow-y-auto p-6 space-y-6 text-left",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsxs)("div",{className:"bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3",children:[(0,t.jsx)(o,{className:"w-5 h-5 text-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold uppercase",children:"Số điện thoại"}),(0,t.jsx)("a",{href:`tel:${j.phone}`,className:"text-xs font-bold hover:underline text-text-dark",children:j.phone})]})]}),(0,t.jsxs)("div",{className:"bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3",children:[(0,t.jsx)(d.Globe,{className:"w-5 h-5 text-blue-600"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold uppercase",children:"Facebook"}),j.facebook?(0,t.jsx)("a",{href:j.facebook,target:"_blank",rel:"noopener noreferrer",className:"text-xs font-bold hover:underline text-text-dark truncate block max-w-[140px]",children:"Link cá nhân"}):(0,t.jsx)("span",{className:"text-xs text-text-gray font-medium",children:"Chưa có"})]})]}),(0,t.jsxs)("div",{className:"bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3",children:[(0,t.jsx)(c,{className:"w-5 h-5 text-teal-600"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold uppercase",children:"Zalo"}),j.zalo?(0,t.jsx)("a",{href:`https://zalo.me/${j.zalo}`,target:"_blank",rel:"noopener noreferrer",className:"text-xs font-bold hover:underline text-text-dark",children:j.zalo}):(0,t.jsx)("span",{className:"text-xs text-text-gray font-medium",children:"Chưa có"})]})]}),(0,t.jsxs)("div",{className:"bg-brand-beige border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3",children:[(0,t.jsx)(b.TrendingUp,{className:"w-5 h-5 text-accent-gold"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold uppercase",children:"Lượt thuê / Chi tiêu"}),(0,t.jsxs)("p",{className:"text-xs font-bold text-text-dark",children:[j.totalOrders," lần / ",(0,t.jsx)("span",{className:"text-primary",children:W(j.totalSpent)})]})]})]})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex gap-2.5 items-start",children:[(0,t.jsx)(h,{className:"w-5 h-5 text-primary mt-0.5 flex-shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"text-xs font-semibold text-text-dark",children:"Địa chỉ khách hàng"}),(0,t.jsx)("p",{className:"text-xs text-text-muted mt-1",children:j.address||"Chưa cập nhật địa chỉ."})]})]}),(0,t.jsxs)("div",{className:"flex gap-2.5 items-start",children:[(0,t.jsx)(p.FileText,{className:"w-5 h-5 text-primary mt-0.5 flex-shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"text-xs font-semibold text-text-dark",children:"Ghi chú cá nhân"}),(0,t.jsx)("p",{className:"text-xs text-text-muted mt-1 italic",children:j.notes||"Không có ghi chú nào."})]})]})]}),(0,t.jsx)("div",{className:"h-px bg-brand-pink-pastel"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("h4",{className:"heading-serif font-bold text-base text-text-dark flex items-center gap-2",children:[(0,t.jsx)(g.Sparkles,{className:"w-4 h-4 text-primary"}),"Lịch sử thuê trang phục"]}),T?(0,t.jsx)("div",{className:"py-6 text-center text-xs text-text-gray",children:"Đang tải lịch sử..."}):w.length>0?(0,t.jsx)("div",{className:"border border-brand-pink-pastel rounded-xl overflow-hidden divide-y divide-brand-pink-pastel/40",children:w.map(e=>(0,t.jsxs)("div",{className:"p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-brand-beige/10",children:[(0,t.jsxs)("div",{className:"text-left space-y-1",children:[(0,t.jsxs)("p",{className:"font-semibold text-text-dark text-xs sm:text-sm",children:[e.productName," (",e.productCode,")"]}),(0,t.jsxs)("p",{className:"text-[11px] text-text-gray",children:["Thời gian: ",(0,t.jsx)("span",{className:"font-semibold text-text-dark",children:e.startDate})," đến ",(0,t.jsx)("span",{className:"font-semibold text-text-dark",children:e.endDate})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between sm:justify-end gap-4",children:[(0,t.jsxs)("div",{className:"text-left sm:text-right",children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray font-semibold",children:"Tiền thuê"}),(0,t.jsx)("p",{className:"text-xs font-bold text-primary",children:W(e.rentalFee)})]}),(0,t.jsx)("span",{className:`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${"RETURNED"===e.status?"bg-emerald-50 text-emerald-700 border-emerald-200":"RENTING"===e.status?"bg-pink-50 text-primary border-brand-pink-pastel":"OVERDUE"===e.status?"bg-red-50 text-red-700 border-red-200":"bg-amber-50 text-amber-700 border-amber-200"}`,children:"RETURNED"===e.status?"Đã trả":"RENTING"===e.status?"Đang thuê":"OVERDUE"===e.status?"Quá hạn":"Đặt trước"})]})]},e.id))}):(0,t.jsx)("div",{className:"bg-brand-beige/10 border border-dashed border-brand-pink-pastel rounded-xl p-8 text-center text-xs text-text-gray",children:"Khách hàng này chưa từng phát sinh đơn thuê đồ."})]})]})]}):(0,t.jsxs)("div",{className:"flex-1 flex flex-col items-center justify-center p-12 text-text-muted",children:[(0,t.jsx)(n.User,{className:"w-16 h-16 text-brand-pink-pastel mb-4"}),(0,t.jsx)("p",{className:"text-sm font-semibold",children:"Vui lòng chọn khách hàng để xem chi tiết."})]})}),M&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-black/40 backdrop-blur-xs",onClick:()=>A(!1)}),(0,t.jsxs)("div",{className:"relative bg-brand-white w-full max-w-lg overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left",children:[(0,t.jsx)("button",{onClick:()=>A(!1),className:"absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer",children:(0,t.jsx)(m.X,{className:"w-5 h-5"})}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-6",children:[(0,t.jsx)(g.Sparkles,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"heading-serif text-xl font-bold text-text-dark",children:I?"Cập nhật khách hàng":"Thêm khách hàng mới"})]}),(0,t.jsxs)("form",{onSubmit:Y,className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Tên khách hàng *"}),(0,t.jsx)("input",{type:"text",required:!0,value:R,onChange:e=>U(e.target.value),placeholder:"Nguyễn Thị Kim Anh",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Số điện thoại *"}),(0,t.jsx)("input",{type:"tel",required:!0,value:F,onChange:e=>K(e.target.value),placeholder:"0912345678",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Facebook Link"}),(0,t.jsx)("input",{type:"url",value:H,onChange:e=>V(e.target.value),placeholder:"https://facebook.com/...",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Zalo (SĐT)"}),(0,t.jsx)("input",{type:"text",value:_,onChange:e=>q(e.target.value),placeholder:"0912345678",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Địa chỉ khách hàng"}),(0,t.jsx)("input",{type:"text",value:B,onChange:e=>G(e.target.value),placeholder:"Khách sạn Novotel Phú Quốc, Dương Tơ...",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Ghi chú"}),(0,t.jsx)("textarea",{rows:2,value:X,onChange:e=>Z(e.target.value),placeholder:"Khách VIP, thường thích đầm phong cách Boho đi biển, giữ đồ cẩn thận...",className:"w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white resize-none"})]}),(0,t.jsxs)("div",{className:"pt-4 border-t border-brand-pink-pastel flex justify-end gap-3",children:[(0,t.jsx)("button",{type:"button",onClick:()=>A(!1),className:"btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Hủy"}),(0,t.jsx)("button",{type:"submit",disabled:E,className:"btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Lưu khách hàng"})]})]})]})]})]})}],38769)}]);