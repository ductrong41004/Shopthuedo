(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[m]=c(s?{["@keyframes "+m]:t}:t,r?"":"."+m)}let h=r&&d.g;return r&&(d.g=d[m]),i=d[m],h?t.data=t.data.replace(h,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,h,f,x=p.bind({k:1});function g(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:h&&h()},n),r.o=/go\d/.test(l),n.className=p.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),f&&c[0]&&f(n),m(c,n)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=w)=>{C[t]=j(C[t]||N,e),k.forEach(([e,r])=>{e===t&&r(C[t])})},$=e=>Object.keys(C).forEach(t=>E(e,t)),z=(e=w)=>t=>{E(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return z(s.toasterId||(a=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},S=(e,t)=>I("blank")(e,t);S.error=I("error"),S.success=I("success"),S.loading=I("loading"),S.custom=I("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?z(t)(r):$(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?z(t)(r):$(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var A=1e3,P=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,O=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=g("div")`
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
    animation: ${T} 0.15s ease-out forwards;
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
    animation: ${O} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,R=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=x`
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
}`,B=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
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
`,H=g("div")`
  position: absolute;
`,q=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,F=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(U,{...a}),"loading"!==r&&s.createElement(H,null,"error"===r?s.createElement(L,{...a}):s.createElement(B,{...a})))},Y=g("div")`
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
`,Z=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${x(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(X,{toast:e}),n=s.createElement(Z,{...e.ariaProps},b(e.message,e));return s.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,c.p=void 0,m=a,h=void 0,f=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=w)=>{let[r,a]=(0,s.useState)(C[t]||N),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&a(C[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(z(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(J,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):s.createElement(G,{toast:r,position:l}))}))},"default",0,S],5766)},86425,e=>{"use strict";var t=e.i(59141);e.i(36180);var r=e.i(28719),a=e.i(17689),s=e.i(63802);e.i(61086);var i=e.i(27215);async function o(){try{let e=(0,r.collection)(t.db,"products"),a=(0,s.query)(e,(0,s.orderBy)("code","asc"));return(await (0,s.getDocs)(a)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy danh sách sản phẩm:",e),[]}}async function n(e){try{let a=(0,r.collection)(t.db,"products");return(await (0,s.addDoc)(a,{...e,createdAt:new Date().toISOString()})).id}catch(e){throw console.error("Lỗi khi thêm sản phẩm:",e),e}}async function l(e,r){try{let i=(0,a.doc)(t.db,"products",e);await (0,s.updateDoc)(i,r)}catch(e){throw console.error("Lỗi khi cập nhật sản phẩm:",e),e}}async function c(e){try{let r=(0,a.doc)(t.db,"products",e);await (0,s.deleteDoc)(r)}catch(e){throw console.error("Lỗi khi xóa sản phẩm:",e),e}}async function d(e){try{let r=e.name.split(".").pop(),a=`${Date.now()}_${Math.random().toString(36).substr(2,9)}.${r}`,s=(0,i.ref)(t.storage,`products/${a}`),o=await (0,i.uploadBytes)(s,e);return await (0,i.getDownloadURL)(o.ref)}catch(e){throw console.error("Lỗi khi tải ảnh lên Storage:",e),e}}e.s(["createProduct",0,n,"deleteProduct",0,c,"getProducts",0,o,"updateProduct",0,l,"uploadProductImage",0,d])},67927,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["ChevronRight",0,t],67927)},24071,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["ChevronLeft",0,t],24071)},70990,e=>{"use strict";var t=e.i(75849);e.s(["ImageIcon",()=>t.default])},80799,e=>{"use strict";let t=(0,e.i(56420).default)("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);e.s(["Tag",0,t],80799)},64624,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(86425),s=e.i(56420);let i=(0,s.default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);var o=e.i(63676),n=e.i(24071),l=e.i(67927),c=e.i(70990),d=e.i(80799);let u=(0,s.default)("maximize-2",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]);var p=e.i(5766);e.s(["default",0,function(){let[e,s]=(0,r.useState)([]),[m,h]=(0,r.useState)([]),[f,x]=(0,r.useState)([]),[g,b]=(0,r.useState)("Tất cả"),[y,v]=(0,r.useState)(["Tất cả"]),[w,j]=(0,r.useState)(!0),[k,N]=(0,r.useState)(null),C=async()=>{j(!0);try{let e=await (0,a.getProducts)();s(e);let t=Array.from(new Set(e.map(e=>e.category).filter(Boolean))).sort();v(["Tất cả",...t]);let r=[];e.forEach(e=>{e.images&&e.images.length>0&&e.images.forEach((t,a)=>{r.push({id:e.id,code:e.code,name:e.name,category:e.category,url:t,videoUrl:e.videoUrl,imageIndex:a})})}),h(r),x(r)}catch(e){p.default.error("Không thể tải danh sách ảnh từ kho sản phẩm.")}finally{j(!1)}};return(0,r.useEffect)(()=>{C()},[]),(0,r.useEffect)(()=>{"Tất cả"===g?x(m):x(m.filter(e=>e.category===g)),N(null)},[g,m]),(0,t.jsxs)("div",{className:"space-y-6 animate-in fade-in duration-300",children:[(0,t.jsx)(p.Toaster,{position:"top-right"}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 pb-2 justify-center sm:justify-start border-b border-brand-pink-pastel/60",children:y.map(e=>(0,t.jsx)("button",{onClick:()=>b(e),className:`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${g===e?"bg-primary text-white shadow-sm":"bg-brand-white text-text-muted hover:bg-brand-pink hover:text-primary border border-brand-pink-pastel"}`,children:e},e))}),w?(0,t.jsx)("div",{className:"h-96 flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"})}):f.length>0?(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:f.map((e,r)=>(0,t.jsxs)("div",{onClick:()=>N(r),className:"glass-card overflow-hidden group cursor-pointer border relative aspect-[3/4]",children:[(0,t.jsx)("img",{src:e.url,alt:e.name,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"}),(0,t.jsxs)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/90 text-white text-[9px] font-bold",children:[(0,t.jsx)(d.Tag,{className:"w-2.5 h-2.5"}),e.category]}),(0,t.jsx)("h4",{className:"text-white text-sm font-bold truncate",children:e.name}),(0,t.jsxs)("p",{className:"text-brand-pink text-xs font-semibold",children:["Mã: ",e.code]})]}),(0,t.jsxs)("div",{className:"absolute top-4 right-4 flex gap-2",children:[e.videoUrl&&(0,t.jsx)("div",{className:"w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md",children:(0,t.jsx)(i,{className:"w-4 h-4 fill-white"})}),(0,t.jsx)("div",{className:"w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors",children:(0,t.jsx)(u,{className:"w-4 h-4"})})]})]})]},`${e.id}_${e.imageIndex}`))}):(0,t.jsxs)("div",{className:"bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux",children:[(0,t.jsx)(c.ImageIcon,{className:"w-12 h-12 text-brand-pink-pastel mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-sm text-text-muted font-medium",children:"Chưa có ảnh nào trong kho danh mục này."})]}),null!==k&&f[k]&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4",children:[(0,t.jsx)("button",{onClick:()=>N(null),className:"absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer",children:(0,t.jsx)(o.X,{className:"w-6 h-6"})}),(0,t.jsx)("button",{onClick:e=>{e.stopPropagation(),null!==k&&N(e=>0===e?f.length-1:e-1)},className:"absolute left-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer",children:(0,t.jsx)(n.ChevronLeft,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"max-w-4xl max-h-[80vh] w-full flex flex-col md:flex-row gap-6 bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6 border border-zinc-800",children:[(0,t.jsx)("div",{className:"flex-1 bg-black flex items-center justify-center rounded-xl overflow-hidden relative aspect-square md:aspect-auto md:h-[60vh]",children:f[k].videoUrl?(0,t.jsx)("div",{className:"w-full h-full flex flex-col items-center justify-center gap-2",children:(0,t.jsx)("video",{src:f[k].videoUrl,controls:!0,className:"max-w-full max-h-full",poster:f[k].url})}):(0,t.jsx)("img",{src:f[k].url,alt:f[k].name,className:"max-w-full max-h-full object-contain"})}),(0,t.jsxs)("div",{className:"w-full md:w-80 flex flex-col justify-between text-left text-zinc-300",children:[(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-primary tracking-wider uppercase bg-pink-950/40 text-pink-400 px-2 py-0.5 rounded border border-pink-900/50",children:f[k].category}),(0,t.jsx)("h3",{className:"text-xl font-bold text-white heading-serif mt-2",children:f[k].name}),(0,t.jsxs)("p",{className:"text-sm font-semibold text-zinc-400 mt-1",children:["Mã sản phẩm: ",(0,t.jsx)("span",{className:"text-white",children:f[k].code})]})]}),(0,t.jsx)("div",{className:"h-px bg-zinc-800"}),(0,t.jsxs)("div",{className:"text-xs space-y-2",children:[(0,t.jsx)("p",{children:"• Album đồ này tự động đồng bộ hóa với ảnh kho hàng."}),(0,t.jsx)("p",{children:"• Bạn có thể sửa sản phẩm tại mục 👗 Sản phẩm để cập nhật hoặc thêm ảnh mới."})]})]}),(0,t.jsx)("div",{className:"pt-6",children:(0,t.jsx)("button",{onClick:()=>N(null),className:"w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer",children:"Đóng thư viện"})})]})]}),(0,t.jsx)("button",{onClick:e=>{e.stopPropagation(),null!==k&&N(e=>e===f.length-1?0:e+1)},className:"absolute right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer",children:(0,t.jsx)(l.ChevronRight,{className:"w-6 h-6"})})]})]})}],64624)}]);