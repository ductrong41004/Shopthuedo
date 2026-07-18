(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,a;var s,r=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",s="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,o):i+":"+o+";")}return a+(t&&r?t+"{"+r+"}":r)+s},c={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e};function u(e){let t,a,s=this||{},r=e.call?e(s.p):e;return((e,t,a,s,r)=>{var i;let u=h(e),p=c[u]||(c[u]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(u));if(!c[p]){let t=u!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(a=t[3].replace(l," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);c[p]=d(r?{["@keyframes "+p]:t}:t,a?"":"."+p)}let m=a&&c.g;return a&&(c.g=c[p]),i=c[p],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),p})(r.unshift?r.raw?(t=[].slice.call(arguments,1),a=s.p,r.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):r.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):r,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}u.bind({g:1});let p,m,x,f=u.bind({k:1});function g(e,t){let a=this||{};return function(){let s=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;a.p=Object.assign({theme:m&&m()},n),a.o=/go\d/.test(l),n.className=u.apply(a,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),x&&d[0]&&x(n),p(d,n)}return t?t(r):r}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},k="default",w=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=k)=>{C[t]=w(C[t]||N,e),j.forEach(([e,a])=>{e===t&&a(C[t])})},T=e=>Object.keys(C).forEach(t=>S(e,t)),D=(e=k)=>t=>{S(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let s,r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return D(r.toasterId||(s=r.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:r}),r.id},M=(e,t)=>O("blank")(e,t);M.error=O("error"),M.success=O("success"),M.loading=O("loading"),M.custom=O("custom"),M.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):T(a)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):T(a)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,a)=>{let s=M.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?b(t.success,e):void 0;return r?M.success(r,{id:s,...a,...null==a?void 0:a.success}):M.dismiss(s),e}).catch(e=>{let r=t.error?b(t.error,e):void 0;r?M.error(r,{id:s,...a,...null==a?void 0:a.error}):M.dismiss(s)}),e};var A=1e3,I=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,F=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=f`
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
}`,H=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,R=g("div")`
  position: absolute;
`,K=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Q=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?r.createElement(_,null,t):t:"blank"===a?null:r.createElement(K,null,r.createElement(P,{...s}),"loading"!==a&&r.createElement(R,null,"error"===a?r.createElement($,{...s}):r.createElement(H,{...s})))},W=g("div")`
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
`,X=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,q=r.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,r]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=r.createElement(Q,{toast:e}),n=r.createElement(X,{...e.ariaProps},b(e.message,e));return r.createElement(W,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:o,message:n}):r.createElement(r.Fragment,null,o,n))});s=r.createElement,d.p=void 0,p=s,m=void 0,x=void 0;var G=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=r.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return r.createElement("div",{ref:o,className:t,style:a},i)},J=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:s}=((e={},t=k)=>{let[a,s]=(0,r.useState)(C[t]||N),i=(0,r.useRef)(C[t]);(0,r.useEffect)(()=>(i.current!==C[t]&&s(C[t]),j.push([t,s]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:o}})(e,t),i=(0,r.useRef)(new Map).current,o=(0,r.useCallback)((e,t=A)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,r.useEffect)(()=>{if(s)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&M.dismiss(a.id);return}return setTimeout(()=>M.dismiss(a.id,t),s)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let n=(0,r.useCallback)(D(t),[t]),l=(0,r.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,r.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,r.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),h=(0,r.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,r.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:h}}})(a,o);return r.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let o,n,l=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}),h=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return r.createElement(G,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?J:"",style:h},"custom"===a.type?b(a.message,a):i?i(a):r.createElement(q,{toast:a,position:l}))}))},"default",0,M],5766)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},9822,e=>{"use strict";e.i(36180);var t=e.i(28719),a=e.i(63802),s=e.i(17689),r=e.i(59141);let i="categories";async function o(){try{let e=(0,a.query)((0,t.collection)(r.db,i),(0,a.orderBy)("name","asc"));return(await (0,a.getDocs)(e)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy danh mục:",e),[]}}async function n(e){await (0,a.addDoc)((0,t.collection)(r.db,i),{name:e.trim(),createdAt:new Date().toISOString()})}async function l(e){await (0,a.deleteDoc)((0,s.doc)(r.db,i,e))}async function d(){if(!((await o()).length>0))for(let e of["Đầm dạ hội","Váy cưới","Áo dài","Váy Boho/Dạo phố","Phụ kiện","Khác"])await (0,a.addDoc)((0,t.collection)(r.db,i),{name:e,createdAt:new Date().toISOString()})}e.s(["createCategory",0,n,"deleteCategory",0,l,"getCategories",0,o,"seedDefaultCategories",0,d])},80799,e=>{"use strict";let t=(0,e.i(56420).default)("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);e.s(["Tag",0,t],80799)},58925,72382,80860,e=>{"use strict";var t=e.i(56420);let a=(0,t.default)("key-round",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);e.s(["KeyRound",0,a],58925);let s=(0,t.default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);e.s(["Eye",0,s],72382);let r=(0,t.default)("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);e.s(["EyeOff",0,r],80860)},44208,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(59141);e.i(36180);var r=e.i(28719),i=e.i(63802),o=e.i(17689),n=e.i(66794),l=e.i(56420);let d=(0,l.default)("database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]),c=(0,l.default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);var h=e.i(73474),u=e.i(28623),p=e.i(77071),m=e.i(80799),x=e.i(58925),f=e.i(72382),g=e.i(80860);let b=(0,l.default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);var y=e.i(5766),v=e.i(9822);e.i(51718);var k=e.i(54716),k=k,w=k,j=k;e.s(["default",0,function(){let[e,l]=(0,a.useState)(!1),[N,C]=(0,a.useState)("categories"),[S,T]=(0,a.useState)([]),[D,E]=(0,a.useState)(""),[O,M]=(0,a.useState)(!1),[A,I]=(0,a.useState)(""),[L,V]=(0,a.useState)(""),[$,z]=(0,a.useState)(""),[P,F]=(0,a.useState)(!1),[B,H]=(0,a.useState)(!1),[R,K]=(0,a.useState)(!1),[U,_]=(0,a.useState)(!1),Q=async()=>{M(!0);try{let e=await (0,v.getCategories)();T(e)}finally{M(!1)}};(0,a.useEffect)(()=>{Q()},[]);let W=async e=>{if(e.preventDefault(),D.trim()){if(S.some(e=>e.name.toLowerCase()===D.trim().toLowerCase()))return void y.default.error("Danh mục này đã tồn tại!");M(!0);try{await (0,v.createCategory)(D),y.default.success(`Đ\xe3 th\xeam danh mục "${D.trim()}"`),E(""),Q()}catch{y.default.error("Không thể thêm danh mục.")}finally{M(!1)}}},X=async e=>{if(confirm(`X\xf3a danh mục "${e.name}"? Sản phẩm đang d\xf9ng danh mục n\xe0y sẽ kh\xf4ng bị ảnh hưởng.`)){M(!0);try{await (0,v.deleteCategory)(e.id),y.default.success(`Đ\xe3 x\xf3a danh mục "${e.name}"`),Q()}catch{y.default.error("Không thể xóa danh mục.")}finally{M(!1)}}},q=async()=>{M(!0);try{await (0,v.seedDefaultCategories)(),y.default.success("Đã nạp danh mục mặc định!"),Q()}catch{y.default.error("Lỗi khi nạp danh mục.")}finally{M(!1)}},G=async e=>{if(e.preventDefault(),!A||!L||!$)return void y.default.error("Vui lòng điền đầy đủ tất cả các ô.");if(L.length<6)return void y.default.error("Mật khẩu mới phải có ít nhất 6 ký tự.");if(L!==$)return void y.default.error("Mật khẩu xác nhận không khớp!");if(L===A)return void y.default.error("Mật khẩu mới phải khác mật khẩu hiện tại.");_(!0);try{let e=s.auth.currentUser;if(!e||!e.email)throw Error("Chưa đăng nhập.");let t=j.W.credential(e.email,A);await (0,w.a4)(e,t),await (0,k.an)(e,L),y.default.success("✅ Đổi mật khẩu thành công!"),I(""),V(""),z("")}catch(e){"auth/wrong-password"===e.code||"auth/invalid-credential"===e.code?y.default.error("Mật khẩu hiện tại không đúng!"):"auth/too-many-requests"===e.code?y.default.error("Quá nhiều lần thử. Vui lòng thử lại sau."):y.default.error("Lỗi: "+e.message)}finally{_(!1)}},J=async()=>{if(confirm("Bạn có muốn nạp dữ liệu mẫu chạy thử không? Thao tác này sẽ thêm các sản phẩm, khách hàng, đơn thuê và giao dịch mẫu vào Firebase.")){l(!0);try{let e=(0,i.writeBatch)(s.db),t=new Date().toISOString().split("T")[0],a=[{code:"D001",name:"Váy Boho Họa Tiết Đi Biển",category:"Váy Boho/Dạo phố",size:"Free size",color:"Be họa tiết",rentalPrice:2e5,deposit:3e5,description:"Đầm dáng dài bay bổng thích hợp chụp ảnh hoàng hôn.",images:["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop"],videoUrl:"",status:"RENTING"},{code:"D002",name:"Váy Cưới Lụa Satin Trễ Vai",category:"Váy cưới",size:"M",color:"Trắng tinh khôi",rentalPrice:8e5,deposit:15e5,description:"Váy cưới satin lụa thiết kế cao cấp.",images:["https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=500&auto=format&fit=crop"],videoUrl:"",status:"AVAILABLE"},{code:"D003",name:"Đầm Dạ Hội Kim Sa Ngọc Trai",category:"Đầm dạ hội",size:"S",color:"Hồng pastel lấp lánh",rentalPrice:45e4,deposit:8e5,description:"Đầm đính đá ngọc trai sang trọng.",images:["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop"],videoUrl:"",status:"RESERVED"},{code:"D004",name:"Áo Dài Gấm Hoa Mai Đỏ",category:"Áo dài",size:"L",color:"Đỏ hồng",rentalPrice:25e4,deposit:4e5,description:"Áo dài gấm thêu mai vàng.",images:["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop"],videoUrl:"",status:"AVAILABLE"},{code:"D005",name:"Mũ Rộng Vành Đi Biển Cao Cấp",category:"Phụ kiện",size:"Free size",color:"Be sữa",rentalPrice:5e4,deposit:1e5,description:"Mũ cói đi biển thời trang.",images:["https://images.unsplash.com/photo-1572426473040-7e486447e3ee?w=500&auto=format&fit=crop"],videoUrl:"",status:"AVAILABLE"}],n=[],l=(0,r.collection)(s.db,"products");for(let t of a){let a=(0,o.doc)(l);e.set(a,{...t,createdAt:new Date().toISOString()}),n.push(a.id)}let d=[{name:"Nguyễn Thị Phương Vy",phone:"0912445678",facebook:"",zalo:"0912445678",address:"Resort Pullman Phú Quốc",notes:"Khách du lịch Hà Nội",totalOrders:2,totalSpent:4e5},{name:"Trần Mai Chi",phone:"0987654321",facebook:"",zalo:"0987654321",address:"Khách sạn Novotel Phú Quốc",notes:"Khách VIP, chụp pre-wedding",totalOrders:1,totalSpent:8e5},{name:"Lê Minh Thư",phone:"0934112233",facebook:"",zalo:"",address:"Homestay Dương Đông",notes:"Thường thuê áo dài",totalOrders:1,totalSpent:25e4}],c=[],h=(0,r.collection)(s.db,"customers");for(let t of d){let a=(0,o.doc)(h);e.set(a,{...t,createdAt:new Date().toISOString()}),c.push(a.id)}let u=(0,r.collection)(s.db,"orders"),p=(0,o.doc)(u);e.set(p,{customerId:c[0],customerName:d[0].name,customerPhone:d[0].phone,productId:n[0],productCode:a[0].code,productName:a[0].name,productImage:a[0].images[0],startDate:t,endDate:new Date(Date.now()+1728e5).toISOString().split("T")[0],rentalFee:4e5,depositFee:3e5,totalPrice:4e5,status:"RENTING",notes:"Giao đồ tại quầy lễ tân.",createdAt:new Date().toISOString()});let m=(0,r.collection)(s.db,"financial_records");for(let a of[{type:"INFLOW",category:"Tiền thuê",amount:4e5,date:t,notes:"Thu tiền thuê váy D001 - KH Vy"},{type:"INFLOW",category:"Tiền cọc",amount:3e5,date:t,notes:"Thu cọc đơn Vy"},{type:"OUTFLOW",category:"Giặt ủi",amount:15e4,date:t,notes:"Chi tiền giặt khô đầm tiệc cưới"},{type:"OUTFLOW",category:"Marketing",amount:5e5,date:t,notes:"Chi quảng cáo Facebook tháng này"},{type:"OUTFLOW",category:"Nhập hàng",amount:2e6,date:t,notes:"Chi phí nhập thêm váy mới"}]){let t=(0,o.doc)(m);e.set(t,{...a,createdAt:new Date().toISOString()})}await e.commit(),y.default.success("Nạp dữ liệu demo thành công! Vui lòng tải lại trang."),setTimeout(()=>window.location.reload(),1500)}catch(e){y.default.error("Lỗi nạp dữ liệu: "+e.message)}finally{l(!1)}}},Y=async()=>{l(!0);try{let e={};for(let t of["products","customers","orders","financial_records","categories"]){let a=await (0,i.getDocs)((0,r.collection)(s.db,t));e[t]=a.docs.map(e=>({id:e.id,...e.data()}))}let t=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(e,null,2))}`,a=document.createElement("a");a.setAttribute("href",t),a.setAttribute("download",`thueodoquytnho_backup_${new Date().toISOString().split("T")[0]}.json`),document.body.appendChild(a),a.click(),a.remove(),y.default.success("Tải xuống bản sao lưu thành công!")}catch(e){y.default.error("Lỗi xuất sao lưu: "+e.message)}finally{l(!1)}},Z=async()=>{if(confirm("CẢNH BÁO: Thao tác này sẽ XÓA TOÀN BỘ dữ liệu. Không thể khôi phục. Tiếp tục?")){l(!0);try{let e=0;for(let t of["products","customers","orders","financial_records","categories"]){let a=await (0,i.getDocs)((0,r.collection)(s.db,t)),o=(0,i.writeBatch)(s.db);a.docs.forEach(t=>{o.delete(t.ref),e++}),a.docs.length>0&&await o.commit()}y.default.success(`Đ\xe3 x\xf3a ${e} t\xe0i liệu!`),setTimeout(()=>window.location.reload(),1500)}catch(e){y.default.error("Lỗi: "+e.message)}finally{l(!1)}}};return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6 text-left animate-in fade-in duration-300",children:[(0,t.jsx)(y.Toaster,{position:"top-right"}),(0,t.jsxs)("div",{className:"flex gap-2 bg-brand-pink/30 p-1 rounded-2xl border border-brand-pink-pastel w-fit flex-wrap",children:[(0,t.jsxs)("button",{onClick:()=>C("categories"),className:`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${"categories"===N?"bg-white text-primary shadow-sm":"text-text-muted hover:text-text-dark"}`,children:[(0,t.jsx)(m.Tag,{className:"w-3.5 h-3.5"})," Danh mục sản phẩm"]}),(0,t.jsxs)("button",{onClick:()=>C("database"),className:`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${"database"===N?"bg-white text-primary shadow-sm":"text-text-muted hover:text-text-dark"}`,children:[(0,t.jsx)(d,{className:"w-3.5 h-3.5"})," Quản lý dữ liệu"]}),(0,t.jsxs)("button",{onClick:()=>C("account"),className:`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${"account"===N?"bg-white text-primary shadow-sm":"text-text-muted hover:text-text-dark"}`,children:[(0,t.jsx)(b,{className:"w-3.5 h-3.5"})," Tài khoản"]})]}),"categories"===N&&(0,t.jsxs)("div",{className:"glass-card p-6 border space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between pb-4 border-b border-brand-pink-pastel/60",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(m.Tag,{className:"w-5 h-5 text-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"heading-serif font-bold text-lg text-text-dark",children:"Danh mục sản phẩm"}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted",children:"Quản lý các danh mục hiển thị khi thêm sản phẩm"})]})]}),(0,t.jsxs)("button",{onClick:q,disabled:O,className:"btn-secondary text-xs py-2 px-4 cursor-pointer",children:[(0,t.jsx)(u.Sparkles,{className:"w-3.5 h-3.5"}),"Nạp mặc định"]})]}),(0,t.jsxs)("form",{onSubmit:W,className:"flex gap-3",children:[(0,t.jsx)("input",{type:"text",value:D,onChange:e=>E(e.target.value),placeholder:"Tên danh mục mới... (VD: Vest & Blazer)",className:"flex-1 px-4 py-2.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"}),(0,t.jsxs)("button",{type:"submit",disabled:O||!D.trim(),className:"btn-primary text-xs py-2 px-5 cursor-pointer disabled:opacity-50",children:[(0,t.jsx)(p.Plus,{className:"w-4 h-4"}),"Thêm"]})]}),O?(0,t.jsx)("div",{className:"h-32 flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-6 h-6 border-4 border-brand-pink border-t-primary rounded-full animate-spin"})}):0===S.length?(0,t.jsxs)("div",{className:"text-center py-10 text-xs text-text-muted space-y-3",children:[(0,t.jsx)(m.Tag,{className:"w-10 h-10 text-brand-pink-pastel mx-auto"}),(0,t.jsxs)("p",{children:["Chưa có danh mục nào. Nhấn ",(0,t.jsx)("strong",{children:'"Nạp mặc định"'})," để thêm nhanh!"]})]}):(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:S.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 bg-brand-pink/10 border border-brand-pink-pastel/50 rounded-xl group",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-2 h-2 rounded-full bg-primary shrink-0"}),(0,t.jsx)("span",{className:"text-sm font-semibold text-text-dark",children:e.name})]}),(0,t.jsx)("button",{onClick:()=>X(e),className:"p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100",title:"Xóa danh mục",children:(0,t.jsx)(h.Trash2,{className:"w-3.5 h-3.5"})})]},e.id))}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted pt-2 border-t border-brand-pink-pastel/40",children:"💡 Danh mục này sẽ hiển thị trong form thêm/sửa sản phẩm và bộ lọc trang Sản phẩm, Lịch thuê và Website khách hàng."})]}),"database"===N&&(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"glass-card p-6 border space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60",children:[(0,t.jsx)(d,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h3",{className:"heading-serif font-bold text-lg text-text-dark",children:"Quản lý cơ sở dữ liệu"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"border border-brand-pink-pastel rounded-xl p-5 bg-brand-pink/5 flex flex-col justify-between",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("h4",{className:"font-bold text-text-dark text-sm flex items-center gap-1.5",children:[(0,t.jsx)(u.Sparkles,{className:"w-4 h-4 text-primary"})," Nạp dữ liệu chạy thử"]}),(0,t.jsx)("p",{className:"text-xs text-text-muted leading-relaxed",children:"Tự động thêm sản phẩm, khách hàng, đơn thuê và giao dịch mẫu để xem thử giao diện."})]}),(0,t.jsx)("button",{onClick:J,disabled:e,className:"btn-primary w-full justify-center mt-6 cursor-pointer text-xs",children:"Khởi tạo dữ liệu mẫu"})]}),(0,t.jsxs)("div",{className:"border border-brand-pink-pastel rounded-xl p-5 bg-brand-beige/25 flex flex-col justify-between",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("h4",{className:"font-bold text-text-dark text-sm flex items-center gap-1.5",children:[(0,t.jsx)(c,{className:"w-4 h-4 text-accent-gold"})," Sao lưu dữ liệu về máy"]}),(0,t.jsx)("p",{className:"text-xs text-text-muted leading-relaxed",children:"Xuất toàn bộ dữ liệu dưới dạng file JSON về máy tính để sao lưu dự phòng."})]}),(0,t.jsx)("button",{onClick:Y,disabled:e,className:"btn-secondary w-full justify-center mt-6 cursor-pointer text-xs",children:"Tải bản sao lưu (.json)"})]})]}),(0,t.jsx)("div",{className:"pt-4 border-t border-brand-pink-pastel",children:(0,t.jsxs)("div",{className:"bg-red-50/50 border border-red-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",children:[(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsxs)("h4",{className:"font-bold text-red-700 text-sm flex items-center gap-1.5",children:[(0,t.jsx)(h.Trash2,{className:"w-4 h-4"})," Vùng nguy hiểm: Xóa sạch dữ liệu"]}),(0,t.jsx)("p",{className:"text-xs text-red-600 leading-relaxed max-w-lg",children:"Xóa tất cả dữ liệu trong Firebase. Hãy sao lưu trước khi thực hiện."})]}),(0,t.jsx)("button",{onClick:Z,disabled:e,className:"py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full cursor-pointer shrink-0 transition-colors",children:"Xóa sạch database"})]})})]}),(0,t.jsxs)("div",{className:"glass-card p-6 border space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60",children:[(0,t.jsx)(n.Settings,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h3",{className:"heading-serif font-bold text-lg text-text-dark",children:"Thông tin hệ thống"})]}),(0,t.jsxs)("div",{className:"text-xs space-y-2 text-text-muted leading-relaxed",children:[(0,t.jsxs)("p",{children:["• ",(0,t.jsx)("strong",{children:"Ứng dụng:"})," Website Quản Lý Thuê Đồ Quýt Nhỏ — v1.0.0"]}),(0,t.jsxs)("p",{children:["• ",(0,t.jsx)("strong",{children:"Kiến trúc:"})," Next.js App Router + Firebase (Auth, Firestore, Storage, Hosting)"]}),(0,t.jsxs)("p",{children:["• ",(0,t.jsx)("strong",{children:"Sao lưu:"})," Firebase tự động đa khu vực + xuất JSON thủ công"]})]})]})]}),"account"===N&&(0,t.jsxs)("div",{className:"glass-card p-6 border space-y-6 max-w-lg",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60",children:[(0,t.jsx)(b,{className:"w-5 h-5 text-primary"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"heading-serif font-bold text-lg text-text-dark",children:"Bảo mật tài khoản"}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted",children:"Đổi mật khẩu đăng nhập admin"})]})]}),(0,t.jsxs)("form",{onSubmit:G,className:"space-y-5",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider",children:"Mật khẩu hiện tại"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted",children:(0,t.jsx)(x.KeyRound,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:P?"text":"password",placeholder:"Nhập mật khẩu hiện tại",value:A,onChange:e=>I(e.target.value),className:"w-full pl-10 pr-12 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all"}),(0,t.jsx)("button",{type:"button",onClick:()=>F(e=>!e),className:"absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors",children:P?(0,t.jsx)(g.EyeOff,{className:"w-4 h-4"}):(0,t.jsx)(f.Eye,{className:"w-4 h-4"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider",children:"Mật khẩu mới"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted",children:(0,t.jsx)(x.KeyRound,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:B?"text":"password",placeholder:"Ít nhất 6 ký tự",value:L,onChange:e=>V(e.target.value),className:"w-full pl-10 pr-12 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all"}),(0,t.jsx)("button",{type:"button",onClick:()=>H(e=>!e),className:"absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors",children:B?(0,t.jsx)(g.EyeOff,{className:"w-4 h-4"}):(0,t.jsx)(f.Eye,{className:"w-4 h-4"})})]}),L.length>0&&L.length<6&&(0,t.jsx)("p",{className:"text-[10px] text-red-500 mt-1 pl-3",children:"Mật khẩu phải có ít nhất 6 ký tự"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider",children:"Xác nhận mật khẩu mới"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted",children:(0,t.jsx)(x.KeyRound,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:R?"text":"password",placeholder:"Nhập lại mật khẩu mới",value:$,onChange:e=>z(e.target.value),className:`w-full pl-10 pr-12 py-3 bg-brand-white border rounded-full text-sm focus:outline-none focus:ring-2 transition-all ${$&&$!==L?"border-red-400 focus:border-red-400 focus:ring-red-100":$&&$===L?"border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100":"border-brand-pink-pastel focus:border-primary focus:ring-brand-pink-pastel"}`}),(0,t.jsx)("button",{type:"button",onClick:()=>K(e=>!e),className:"absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors",children:R?(0,t.jsx)(g.EyeOff,{className:"w-4 h-4"}):(0,t.jsx)(f.Eye,{className:"w-4 h-4"})})]}),$&&$!==L&&(0,t.jsx)("p",{className:"text-[10px] text-red-500 mt-1 pl-3",children:"Mật khẩu không khớp"}),$&&$===L&&L.length>=6&&(0,t.jsx)("p",{className:"text-[10px] text-emerald-600 mt-1 pl-3",children:"✓ Mật khẩu khớp"})]}),(0,t.jsx)("button",{type:"submit",disabled:U||!A||!L||!$||L!==$||L.length<6,className:"w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-semibold transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2",children:U?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{className:"w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"})," Đang xử lý..."]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(b,{className:"w-4 h-4"})," Đổi mật khẩu"]})})]}),(0,t.jsxs)("p",{className:"text-[10px] text-text-muted border-t border-brand-pink-pastel/40 pt-3",children:["💡 Sau khi đổi mật khẩu, lần đăng nhập tiếp theo dùng mật khẩu mới. Tên đăng nhập vẫn là ",(0,t.jsx)("strong",{children:"admin"}),"."]})]})]})}],44208)}]);