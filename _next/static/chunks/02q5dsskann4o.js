(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,86425,e=>{"use strict";var t=e.i(59141);e.i(36180);var r=e.i(28719),a=e.i(17689),s=e.i(63802);e.i(61086);var i=e.i(27215);async function n(){try{let e=(0,r.collection)(t.db,"products"),a=(0,s.query)(e,(0,s.orderBy)("code","asc"));return(await (0,s.getDocs)(a)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy danh sách sản phẩm:",e),[]}}async function o(e){try{let a=(0,r.collection)(t.db,"products");return(await (0,s.addDoc)(a,{...e,createdAt:new Date().toISOString()})).id}catch(e){throw console.error("Lỗi khi thêm sản phẩm:",e),e}}async function l(e,r){try{let i=(0,a.doc)(t.db,"products",e);await (0,s.updateDoc)(i,r)}catch(e){throw console.error("Lỗi khi cập nhật sản phẩm:",e),e}}async function d(e){try{let r=(0,a.doc)(t.db,"products",e);await (0,s.deleteDoc)(r)}catch(e){throw console.error("Lỗi khi xóa sản phẩm:",e),e}}async function c(e){try{let r=e.name.split(".").pop(),a=`${Date.now()}_${Math.random().toString(36).substr(2,9)}.${r}`,s=(0,i.ref)(t.storage,`products/${a}`),n=await (0,i.uploadBytes)(s,e);return await (0,i.getDownloadURL)(n.ref)}catch(e){throw console.error("Lỗi khi tải ảnh lên Storage:",e),e}}e.s(["createProduct",0,o,"deleteProduct",0,d,"getProducts",0,n,"updateProduct",0,l,"uploadProductImage",0,c])},9822,e=>{"use strict";e.i(36180);var t=e.i(28719),r=e.i(63802),a=e.i(17689),s=e.i(59141);let i="categories";async function n(){try{let e=(0,r.query)((0,t.collection)(s.db,i),(0,r.orderBy)("name","asc"));return(await (0,r.getDocs)(e)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy danh mục:",e),[]}}async function o(e){await (0,r.addDoc)((0,t.collection)(s.db,i),{name:e.trim(),createdAt:new Date().toISOString()})}async function l(e){await (0,r.deleteDoc)((0,a.doc)(s.db,i,e))}async function d(){if(!((await n()).length>0))for(let e of["Đầm dạ hội","Váy cưới","Áo dài","Váy Boho/Dạo phố","Phụ kiện","Khác"])await (0,r.addDoc)((0,t.collection)(s.db,i),{name:e,createdAt:new Date().toISOString()})}e.s(["createCategory",0,o,"deleteCategory",0,l,"getCategories",0,n,"seedDefaultCategories",0,d])},70990,e=>{"use strict";var t=e.i(75849);e.s(["ImageIcon",()=>t.default])},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[m]=d(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let h=r&&c.g;return r&&(c.g=c[m]),i=c[m],h?t.data=t.data.replace(h,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,h,x,b=p.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:h&&h()},o),r.o=/go\d/.test(l),o.className=p.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),x&&d[0]&&x(o),m(d,o)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=w)=>{C[t]=j(C[t]||N,e),k.forEach(([e,r])=>{e===t&&r(C[t])})},L=e=>Object.keys(C).forEach(t=>S(e,t)),D=(e=w)=>t=>{S(t,e)},E={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return D(s.toasterId||(a=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},I=(e,t)=>A("blank")(e,t);I.error=A("error"),I.success=A("success"),I.loading=A("loading"),I.custom=A("custom"),I.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):L(r)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):L(r)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,r)=>{let a=I.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?I.success(s,{id:a,...r,...null==r?void 0:r.success}):I.dismiss(a),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?I.error(s,{id:a,...r,...null==r?void 0:r.error}):I.dismiss(a)}),e};var T=1e3,P=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,O=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=b`
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
}`,U=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,H=f("div")`
  position: absolute;
`,R=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(_,null,t):t:"blank"===r?null:s.createElement(R,null,s.createElement(V,{...a}),"loading"!==r&&s.createElement(H,null,"error"===r?s.createElement(z,{...a}):s.createElement(U,{...a})))},X=f("div")`
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
`,G=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(K,{toast:e}),o=s.createElement(G,{...e.ariaProps},g(e.message,e));return s.createElement(X,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});a=s.createElement,d.p=void 0,m=a,h=void 0,x=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:n,className:t,style:r},i)},Z=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=w)=>{let[r,a]=(0,s.useState)(C[t]||N),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&a(C[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||E[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=T)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&I.dismiss(r.id);return}return setTimeout(()=>I.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,s.useCallback)(D(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Z:"",style:u},"custom"===r.type?g(r.message,r):i?i(r):s.createElement(W,{toast:r,position:l}))}))},"default",0,I],5766)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},2773,e=>{"use strict";let t=(0,e.i(56420).default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);e.s(["Filter",0,t],2773)},44302,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(86425),s=e.i(9822),i=e.i(77071),n=e.i(66595),o=e.i(2773),l=e.i(26441),d=e.i(73474),c=e.i(63676);let u=(0,e.i(56420).default)("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]);var p=e.i(70990),m=e.i(28623),h=e.i(5766);let x=["S","M","L","XL","Free size"],b=[{value:"AVAILABLE",label:"Có sẵn",color:"bg-emerald-50 text-emerald-700 border-emerald-200"},{value:"RESERVED",label:"Đã đặt trước",color:"bg-amber-50 text-amber-700 border-amber-200"},{value:"RENTING",label:"Đang thuê",color:"bg-pink-50 text-primary border-brand-pink-pastel"},{value:"MAINTENANCE",label:"Bảo trì",color:"bg-zinc-100 text-zinc-600 border-zinc-200"}];e.s(["default",0,function(){let[e,f]=(0,r.useState)([]),[g,y]=(0,r.useState)([]),[v,w]=(0,r.useState)(!0),[j,k]=(0,r.useState)([]),[N,C]=(0,r.useState)(""),[S,L]=(0,r.useState)("ALL"),[D,E]=(0,r.useState)("ALL"),[A,I]=(0,r.useState)(!1),[T,P]=(0,r.useState)(null),[M,$]=(0,r.useState)(""),[z,O]=(0,r.useState)(""),[V,B]=(0,r.useState)(""),[F,U]=(0,r.useState)(x[0]),[H,R]=(0,r.useState)(""),[q,_]=(0,r.useState)(0),[K,X]=(0,r.useState)(0),[G,W]=(0,r.useState)(""),[Y,Z]=(0,r.useState)([]),[J,Q]=(0,r.useState)(""),[ee,et]=(0,r.useState)("AVAILABLE"),[er,ea]=(0,r.useState)(!1),es=async()=>{w(!0);try{let e=await (0,a.getProducts)();f(e),y(e)}catch(e){h.default.error("Không thể tải danh sách sản phẩm.")}finally{w(!1)}},ei=async()=>{try{let e=(await (0,s.getCategories)()).map(e=>e.name);k(e),e.length>0&&B(e[0])}catch{let e=["Đầm dạ hội","Váy cưới","Áo dài","Váy Boho/Dạo phố","Phụ kiện","Khác"];k(e),B(e[0])}};(0,r.useEffect)(()=>{es(),ei()},[]),(0,r.useEffect)(()=>{let t=e;if(""!==N.trim()){let e=N.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.code.toLowerCase().includes(e))}"ALL"!==S&&(t=t.filter(e=>e.category===S)),"ALL"!==D&&(t=t.filter(e=>e.status===D)),y(t)},[N,S,D,e]);let en=async e=>{if(!e.target.files||0===e.target.files.length)return;ea(!0);let t=e.target.files[0];try{h.default.loading("Đang tối ưu dung lượng ảnh...",{id:"upload-status"});let e=await function(e,t=1024,r=.7){return new Promise((a,s)=>{if(!e.type.startsWith("image/"))return a(e);let i=new FileReader;i.readAsDataURL(e),i.onload=i=>{let n=new Image;n.src=i.target?.result,n.onload=()=>{let s=document.createElement("canvas"),i=n.width,o=n.height;i>t&&(o=o*t/i,i=t),s.width=i,s.height=o;let l=s.getContext("2d");if(!l)return a(e);l.drawImage(n,0,0,i,o),s.toBlob(t=>{t?a(new File([t],e.name.replace(/\.[^/.]+$/,"")+".jpg",{type:"image/jpeg",lastModified:Date.now()})):a(e)},"image/jpeg",r)},n.onerror=e=>s(e)},i.onerror=e=>s(e)})}(t,1200,.75);h.default.loading("Đang tải ảnh lên hệ thống...",{id:"upload-status"});let r=await (0,a.uploadProductImage)(e);Z(e=>[...e,r]),h.default.success("Tải ảnh lên thành công!",{id:"upload-status"})}catch(e){h.default.error("Lỗi khi tải ảnh lên.",{id:"upload-status"})}finally{ea(!1)}},eo=async t=>{if(t.preventDefault(),!M||!z||!H||q<=0)return void h.default.error("Vui lòng điền đầy đủ các trường bắt buộc.");let r={code:M.trim().toUpperCase(),name:z.trim(),category:V,size:F,color:H.trim(),rentalPrice:Number(q),deposit:Number(K),description:G.trim(),images:Y,videoUrl:J.trim(),status:ee};w(!0);try{if(T&&T.id)await (0,a.updateProduct)(T.id,r),h.default.success("Cập nhật sản phẩm thành công!");else{if(e.some(e=>e.code.toUpperCase()===M.trim().toUpperCase()&&e.id!==T?.id)){h.default.error("Mã sản phẩm này đã được sử dụng!"),w(!1);return}await (0,a.createProduct)(r),h.default.success("Thêm sản phẩm mới thành công!")}I(!1),es()}catch(e){h.default.error("Lỗi khi lưu sản phẩm.")}finally{w(!1)}},el=async e=>{if(confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")){w(!0);try{await (0,a.deleteProduct)(e),h.default.success("Xóa sản phẩm thành công!"),es()}catch(e){h.default.error("Lỗi khi xóa sản phẩm.")}finally{w(!1)}}},ed=e=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e);return(0,t.jsxs)("div",{className:"space-y-6 animate-in fade-in duration-300",children:[(0,t.jsx)(h.Toaster,{position:"top-right"}),(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3 w-full sm:w-auto",children:[(0,t.jsxs)("div",{className:"relative flex-1 sm:w-60",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray",children:(0,t.jsx)(n.Search,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:"text",placeholder:"Tìm tên, mã sản phẩm...",value:N,onChange:e=>C(e.target.value),className:"w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{value:S,onChange:e=>L(e.target.value),className:"pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer",children:[(0,t.jsx)("option",{value:"ALL",children:"Tất cả danh mục"}),j.map(e=>(0,t.jsx)("option",{value:e,children:e},e))]}),(0,t.jsx)(o.Filter,{className:"absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none"})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{value:D,onChange:e=>E(e.target.value),className:"pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer",children:[(0,t.jsx)("option",{value:"ALL",children:"Tất cả trạng thái"}),b.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsx)(o.Filter,{className:"absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none"})]})]}),(0,t.jsxs)("button",{onClick:()=>{P(null),$(""),O(""),B(j[0]||""),U(x[0]),R(""),_(0),X(0),W(""),Z([]),Q(""),et("AVAILABLE"),I(!0)},className:"btn-primary flex-shrink-0 cursor-pointer text-xs font-semibold py-2.5 px-5",children:[(0,t.jsx)(i.Plus,{className:"w-4 h-4"}),"Thêm sản phẩm"]})]}),v?(0,t.jsx)("div",{className:"h-96 flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"})}):g.length>0?(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6",children:g.map(e=>{var r;let a=(r=e.status,b.find(e=>e.value===r)||{label:r,color:"bg-gray-100 text-gray-700"});return(0,t.jsxs)("div",{className:"glass-card flex flex-col overflow-hidden text-left border",children:[(0,t.jsxs)("div",{className:"relative h-60 w-full bg-brand-beige flex items-center justify-center overflow-hidden border-b border-brand-pink-pastel",children:[e.images&&e.images.length>0?(0,t.jsx)("img",{src:e.images[0],alt:e.name,className:"w-full h-full object-cover transition-transform duration-300 hover:scale-105"}):(0,t.jsx)(p.ImageIcon,{className:"w-12 h-12 text-brand-pink-pastel"}),(0,t.jsx)("span",{className:`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${a.color}`,children:a.label}),(0,t.jsxs)("span",{className:"absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold",children:["Size: ",e.size]})]}),(0,t.jsxs)("div",{className:"p-4 flex-1 flex flex-col justify-between",children:[(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsx)("p",{className:"text-[10px] font-semibold text-primary tracking-wider uppercase",children:e.category}),(0,t.jsx)("h3",{className:"font-bold text-text-dark text-sm truncate",title:e.name,children:e.name}),(0,t.jsxs)("p",{className:"text-xs text-text-gray font-medium",children:["Mã: ",(0,t.jsx)("span",{className:"text-text-dark font-semibold",children:e.code})," | Màu: ",(0,t.jsx)("span",{className:"font-semibold",children:e.color})]}),(0,t.jsxs)("p",{className:"text-xs text-text-gray font-medium",children:["Cọc: ",(0,t.jsx)("span",{className:"text-text-muted font-semibold",children:ed(e.deposit)})]})]}),(0,t.jsxs)("div",{className:"mt-4 pt-3 border-t border-brand-pink-pastel/50 flex justify-between items-center",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[10px] text-text-gray uppercase tracking-wider font-semibold",children:"Giá thuê/ngày"}),(0,t.jsx)("p",{className:"text-sm font-bold text-primary heading-serif",children:ed(e.rentalPrice)})]}),(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("button",{onClick:()=>{P(e),$(e.code),O(e.name),B(e.category),U(e.size),R(e.color),_(e.rentalPrice),X(e.deposit),W(e.description||""),Z(e.images||[]),Q(e.videoUrl||""),et(e.status),I(!0)},className:"p-1.5 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer",title:"Sửa sản phẩm",children:(0,t.jsx)(l.Edit,{className:"w-3.5 h-3.5"})}),(0,t.jsx)("button",{onClick:()=>el(e.id),className:"p-1.5 border border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer",title:"Xóa sản phẩm",children:(0,t.jsx)(d.Trash2,{className:"w-3.5 h-3.5"})})]})]})]})]},e.id)})}):(0,t.jsxs)("div",{className:"bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux",children:[(0,t.jsx)(p.ImageIcon,{className:"w-12 h-12 text-brand-pink-pastel mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-sm text-text-muted font-medium",children:"Không tìm thấy sản phẩm nào khớp với bộ lọc."})]}),A&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-black/40 backdrop-blur-xs",onClick:()=>I(!1)}),(0,t.jsxs)("div",{className:"relative bg-brand-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left",children:[(0,t.jsx)("button",{onClick:()=>I(!1),className:"absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer",children:(0,t.jsx)(c.X,{className:"w-5 h-5"})}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-6",children:[(0,t.jsx)(m.Sparkles,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"heading-serif text-xl font-bold text-text-dark",children:T?"Cập nhật sản phẩm":"Thêm sản phẩm mới"})]}),(0,t.jsxs)("form",{onSubmit:eo,className:"space-y-6",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Tên sản phẩm *"}),(0,t.jsx)("input",{type:"text",required:!0,value:z,onChange:e=>O(e.target.value),placeholder:"Váy dạ hội đuôi cá kim sa",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Mã sản phẩm *"}),(0,t.jsx)("input",{type:"text",required:!0,disabled:!!T,value:M,onChange:e=>$(e.target.value),placeholder:"D001",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white disabled:bg-brand-beige"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Danh mục *"}),(0,t.jsx)("select",{value:V,onChange:e=>B(e.target.value),className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer",children:j.length>0?j.map(e=>(0,t.jsx)("option",{value:e,children:e},e)):(0,t.jsx)("option",{value:"",children:"Chưa có danh mục — vào Cài đặt để tạo"})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Size *"}),(0,t.jsx)("select",{value:F,onChange:e=>U(e.target.value),className:"w-full px-3 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer",children:x.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Màu sắc *"}),(0,t.jsx)("input",{type:"text",required:!0,value:H,onChange:e=>R(e.target.value),placeholder:"Trắng, Hồng pastel...",className:"w-full px-3 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Giá thuê/ngày (VND) *"}),(0,t.jsx)("input",{type:"number",required:!0,min:0,value:q||"",onChange:e=>_(Number(e.target.value)),placeholder:"300000",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Tiền cọc (VND)"}),(0,t.jsx)("input",{type:"number",min:0,value:K||"",onChange:e=>X(Number(e.target.value)),placeholder:"500000",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]}),T&&(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Trạng thái sản phẩm"}),(0,t.jsx)("select",{value:ee,onChange:e=>et(e.target.value),className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer",children:b.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Link Video (Tùy chọn)"}),(0,t.jsx)("input",{type:"url",value:J,onChange:e=>Q(e.target.value),placeholder:"https://youtube.com/shorts/...",className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Mô tả sản phẩm"}),(0,t.jsx)("textarea",{rows:2,value:G,onChange:e=>W(e.target.value),placeholder:"Váy chất liệu kim sa bóng, co giãn tốt, thích hợp chụp ảnh dạ hội...",className:"w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white resize-none"})]}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark uppercase",children:"Ảnh sản phẩm"}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-3 items-center",children:[Y.map((e,r)=>(0,t.jsxs)("div",{className:"relative w-16 h-16 rounded-lg border border-brand-pink-pastel overflow-hidden group",children:[(0,t.jsx)("img",{src:e,alt:"Product preview",className:"w-full h-full object-cover"}),(0,t.jsx)("button",{type:"button",onClick:()=>{Z(e=>e.filter((e,t)=>t!==r))},className:"absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer",title:"Xóa ảnh",children:(0,t.jsx)(c.X,{className:"w-4 h-4"})})]},r)),(0,t.jsxs)("label",{className:"w-16 h-16 border border-dashed border-brand-pink-pastel rounded-lg bg-brand-pink/20 hover:bg-brand-pink/30 flex flex-col items-center justify-center text-text-muted hover:text-primary cursor-pointer transition-all duration-200",children:[er?(0,t.jsx)("div",{className:"w-5 h-5 border-2 border-brand-pink border-t-primary rounded-full animate-spin"}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(u,{className:"w-5 h-5"}),(0,t.jsx)("span",{className:"text-[9px] font-bold mt-1",children:"Tải ảnh"})]}),(0,t.jsx)("input",{type:"file",accept:"image/*",onChange:en,disabled:er,className:"hidden"})]})]}),(0,t.jsxs)("div",{className:"flex gap-2 items-center pt-1",children:[(0,t.jsx)("input",{type:"url",id:"imageUrlInput",placeholder:"Hoặc dán link ảnh từ mạng (ví dụ: https://images.unsplash.com/...)",className:"flex-1 px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark",onKeyDown:e=>{if("Enter"===e.key){e.preventDefault();let t=e.target.value.trim();t&&(Z(e=>[...e,t]),e.target.value="",h.default.success("Đã thêm link ảnh!"))}}}),(0,t.jsx)("button",{type:"button",onClick:()=>{let e=document.getElementById("imageUrlInput"),t=e.value.trim();t?(Z(e=>[...e,t]),e.value="",h.default.success("Đã thêm link ảnh!")):h.default.error("Vui lòng nhập link ảnh trước.")},className:"btn-secondary py-1.5 px-4 text-xs font-semibold shrink-0 cursor-pointer",children:"Thêm link"})]})]}),(0,t.jsxs)("div",{className:"pt-4 border-t border-brand-pink-pastel flex justify-end gap-3",children:[(0,t.jsx)("button",{type:"button",onClick:()=>I(!1),className:"btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Hủy bỏ"}),(0,t.jsx)("button",{type:"submit",disabled:v,className:"btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Lưu sản phẩm"})]})]})]})]})]})}],44302)}]);