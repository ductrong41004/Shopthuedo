(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28719,17689,t=>{"use strict";var e=t.i(35506);t.s(["collection",()=>e.aR],28719),t.s(["doc",()=>e.a9],17689)},5766,t=>{"use strict";let e,r;var o,a=t.i(71645);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(t,e)=>{let r="",o="",a="";for(let i in t){let s=t[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":o+="f"==i[1]?d(s,i):i+"{"+d(s,"k"==i[1]?"":e)+"}":"object"==typeof s?o+=d(s,e?e.replace(/([^,])+/g,t=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)):i):null!=s&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,s):i+":"+s+";")}return r+(e&&a?e+"{"+a+"}":a)+o},l={},u=t=>{if("object"==typeof t){let e="";for(let r in t)e+=r+u(t[r]);return e}return t};function p(t){let e,r,o=this||{},a=t.call?t(o.p):t;return((t,e,r,o,a)=>{var i;let p=u(t),m=l[p]||(l[p]=(t=>{let e=0,r=11;for(;e<t.length;)r=101*r+t.charCodeAt(e++)>>>0;return"go"+r})(p));if(!l[m]){let e=p!==t?t:(t=>{let e,r,o=[{}];for(;e=s.exec(t.replace(n,""));)e[4]?o.shift():e[3]?(r=e[3].replace(c," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][e[1]]=e[2].replace(c," ").trim();return o[0]})(t);l[m]=d(a?{["@keyframes "+m]:e}:e,r?"":"."+m)}let f=r&&l.g;return r&&(l.g=l[m]),i=l[m],f?e.data=e.data.replace(f,i):-1===e.data.indexOf(i)&&(e.data=o?i+e.data:e.data+i),m})(a.unshift?a.raw?(e=[].slice.call(arguments,1),r=o.p,a.reduce((t,o,a)=>{let i=e[a];if(i&&i.call){let t=i(r),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;i=e?"."+e:t&&"object"==typeof t?t.props?"":d(t,""):!1===t?"":t}return t+o+(null==i?"":i)},"")):a.reduce((t,e)=>Object.assign(t,e&&e.call?e(o.p):e),{}):a,(t=>{if("object"==typeof window){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||i})(o.target),o.g,o.o,o.k)}p.bind({g:1});let m,f,h,y=p.bind({k:1});function g(t,e){let r=this||{};return function(){let o=arguments;function a(i,s){let n=Object.assign({},i),c=n.className||a.className;r.p=Object.assign({theme:f&&f()},n),r.o=/go\d/.test(c),n.className=p.apply(r,o)+(c?" "+c:""),e&&(n.ref=s);let d=t;return t[0]&&(d=n.as||t,delete n.as),h&&d[0]&&h(n),m(d,n)}return e?e(a):a}}var b=(t,e)=>"function"==typeof t?t(e):t,w=(e=0,()=>(++e).toString()),x=()=>{if(void 0===r&&"u">typeof window){let t=matchMedia("(prefers-reduced-motion: reduce)");r=!t||t.matches}return r},v="default",E=(t,e)=>{let{toastLimit:r}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,r)};case 1:return{...t,toasts:t.toasts.map(t=>t.id===e.toast.id?{...t,...e.toast}:t)};case 2:let{toast:o}=e;return E(t,{type:+!!t.toasts.find(t=>t.id===o.id),toast:o});case 3:let{toastId:a}=e;return{...t,toasts:t.toasts.map(t=>t.id===a||void 0===a?{...t,dismissed:!0,visible:!1}:t)};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(t=>t.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let i=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(t=>({...t,pauseDuration:t.pauseDuration+i}))}}},D=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},N=(t,e=v)=>{k[e]=E(k[e]||I,t),D.forEach(([t,r])=>{t===e&&r(k[e])})},O=t=>Object.keys(k).forEach(e=>N(t,e)),T=(t=v)=>e=>{N(e,t)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=t=>(e,r)=>{let o,a=((t,e="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(e,t,r);return T(a.toasterId||(o=a.id,Object.keys(k).find(t=>k[t].toasts.some(t=>t.id===o))))({type:2,toast:a}),a.id},L=(t,e)=>$("blank")(t,e);L.error=$("error"),L.success=$("success"),L.loading=$("loading"),L.custom=$("custom"),L.dismiss=(t,e)=>{let r={type:3,toastId:t};e?T(e)(r):O(r)},L.dismissAll=t=>L.dismiss(void 0,t),L.remove=(t,e)=>{let r={type:4,toastId:t};e?T(e)(r):O(r)},L.removeAll=t=>L.remove(void 0,t),L.promise=(t,e,r)=>{let o=L.loading(e.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof t&&(t=t()),t.then(t=>{let a=e.success?b(e.success,t):void 0;return a?L.success(a,{id:o,...r,...null==r?void 0:r.success}):L.dismiss(o),t}).catch(t=>{let a=e.error?b(e.error,t):void 0;a?L.error(a,{id:o,...r,...null==r?void 0:r.error}):L.dismiss(o)}),t};var S=1e3,A=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,C=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${C} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,j=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,V=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=y`
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
}`,U=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=g("div")`
  position: absolute;
`,M=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:t})=>{let{icon:e,type:r,iconTheme:o}=t;return void 0!==e?"string"==typeof e?a.createElement(z,null,e):e:"blank"===r?null:a.createElement(M,null,a.createElement(j,{...o}),"loading"!==r&&a.createElement(H,null,"error"===r?a.createElement(_,{...o}):a.createElement(U,{...o})))},K=g("div")`
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
`,W=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=a.memo(({toast:t,position:e,style:r,children:o})=>{let i=t.height?((t,e)=>{let r=t.includes("top")?1:-1,[o,a]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:e?`${y(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||e||"top-center",t.visible):{opacity:0},s=a.createElement(q,{toast:t}),n=a.createElement(W,{...t.ariaProps},b(t.message,t));return a.createElement(K,{className:t.className,style:{...i,...r,...t.style}},"function"==typeof o?o({icon:s,message:n}):a.createElement(a.Fragment,null,s,n))});o=a.createElement,d.p=void 0,m=o,f=void 0,h=void 0;var Z=({id:t,className:e,style:r,onHeightUpdate:o,children:i})=>{let s=a.useCallback(e=>{if(e){let r=()=>{o(t,e.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(e,{subtree:!0,childList:!0,characterData:!0})}},[t,o]);return a.createElement("div",{ref:s,className:e,style:r},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;t.s(["Toaster",0,({reverseOrder:t,position:e="top-center",toastOptions:r,gutter:o,children:i,toasterId:s,containerStyle:n,containerClassName:c})=>{let{toasts:d,handlers:l}=((t,e="default")=>{let{toasts:r,pausedAt:o}=((t={},e=v)=>{let[r,o]=(0,a.useState)(k[e]||I),i=(0,a.useRef)(k[e]);(0,a.useEffect)(()=>(i.current!==k[e]&&o(k[e]),D.push([e,o]),()=>{let t=D.findIndex(([t])=>t===e);t>-1&&D.splice(t,1)}),[e]);let s=r.toasts.map(e=>{var r,o,a;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(r=t[e.type])?void 0:r.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(o=t[e.type])?void 0:o.duration)||(null==t?void 0:t.duration)||R[e.type],style:{...t.style,...null==(a=t[e.type])?void 0:a.style,...e.style}}});return{...r,toasts:s}})(t,e),i=(0,a.useRef)(new Map).current,s=(0,a.useCallback)((t,e=S)=>{if(i.has(t))return;let r=setTimeout(()=>{i.delete(t),n({type:4,toastId:t})},e);i.set(t,r)},[]);(0,a.useEffect)(()=>{if(o)return;let t=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let o=(r.duration||0)+r.pauseDuration-(t-r.createdAt);if(o<0){r.visible&&L.dismiss(r.id);return}return setTimeout(()=>L.dismiss(r.id,e),o)});return()=>{a.forEach(t=>t&&clearTimeout(t))}},[r,o,e]);let n=(0,a.useCallback)(T(e),[e]),c=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((t,e)=>{n({type:1,toast:{id:t,height:e}})},[n]),l=(0,a.useCallback)(()=>{o&&n({type:6,time:Date.now()})},[o,n]),u=(0,a.useCallback)((t,e)=>{let{reverseOrder:o=!1,gutter:a=8,defaultPosition:i}=e||{},s=r.filter(e=>(e.position||i)===(t.position||i)&&e.height),n=s.findIndex(e=>e.id===t.id),c=s.filter((t,e)=>e<n&&t.visible).length;return s.filter(t=>t.visible).slice(...o?[c+1]:[0,c]).reduce((t,e)=>t+(e.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(t=>{if(t.dismissed)s(t.id,t.removeDelay);else{let e=i.get(t.id);e&&(clearTimeout(e),i.delete(t.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:d,startPause:c,endPause:l,calculateOffset:u}}})(r,s);return a.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:c,onMouseEnter:l.startPause,onMouseLeave:l.endPause},d.map(r=>{let s,n,c=r.position||e,d=l.calculateOffset(r,{reverseOrder:t,gutter:o,defaultPosition:e}),u=(s=c.includes("top"),n=c.includes("center")?{justifyContent:"center"}:c.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...n});return a.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:l.updateHeight,className:r.visible?J:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):a.createElement(Y,{toast:r,position:c}))}))},"default",0,L],5766)},86425,t=>{"use strict";var e=t.i(59141);t.i(36180);var r=t.i(28719),o=t.i(17689),a=t.i(63802);t.i(61086);var i=t.i(27215);async function s(){try{let t=(0,r.collection)(e.db,"products"),o=(0,a.query)(t,(0,a.orderBy)("code","asc"));return(await (0,a.getDocs)(o)).docs.map(t=>({id:t.id,...t.data()}))}catch(t){return console.error("Lỗi khi lấy danh sách sản phẩm:",t),[]}}async function n(t){try{let o=(0,r.collection)(e.db,"products");return(await (0,a.addDoc)(o,{...t,createdAt:new Date().toISOString()})).id}catch(t){throw console.error("Lỗi khi thêm sản phẩm:",t),t}}async function c(t,r){try{let i=(0,o.doc)(e.db,"products",t);await (0,a.updateDoc)(i,r)}catch(t){throw console.error("Lỗi khi cập nhật sản phẩm:",t),t}}async function d(t){try{let r=(0,o.doc)(e.db,"products",t);await (0,a.deleteDoc)(r)}catch(t){throw console.error("Lỗi khi xóa sản phẩm:",t),t}}async function l(t){try{let r=t.name.split(".").pop(),o=`${Date.now()}_${Math.random().toString(36).substr(2,9)}.${r}`,a=(0,i.ref)(e.storage,`products/${o}`),s=await (0,i.uploadBytes)(a,t);return await (0,i.getDownloadURL)(s.ref)}catch(t){throw console.error("Lỗi khi tải ảnh lên Storage:",t),t}}t.s(["createProduct",0,n,"deleteProduct",0,d,"getProducts",0,s,"updateProduct",0,c,"uploadProductImage",0,l])},74039,t=>{"use strict";var e=t.i(59141);t.i(36180);var r=t.i(28719),o=t.i(17689),a=t.i(63802);async function i(t,o,i,s){try{let n=(0,r.collection)(e.db,"orders"),c=(0,a.query)(n,(0,a.where)("productId","==",t),(0,a.where)("status","in",["RESERVED","RENTING","OVERDUE"]));for(let t of(await (0,a.getDocs)(c)).docs){let e=t.data();if((e.id=t.id,!s||e.id!==s)&&e.startDate<=i&&e.endDate>=o)return{available:!1,conflictingOrder:e}}return{available:!0}}catch(t){throw console.error("Lỗi khi kiểm tra lịch thuê:",t),t}}async function s(t){try{let i=(0,r.collection)(e.db,"orders"),s=(0,o.doc)(e.db,"products",t.productId);return await (0,a.runTransaction)(e.db,async n=>{let c=(0,a.query)(i,(0,a.where)("productId","==",t.productId),(0,a.where)("status","in",["RESERVED","RENTING","OVERDUE"]));if((await (0,a.getDocs)(c)).docs.some(e=>{let r=e.data();return r.startDate<=t.endDate&&r.endDate>=t.startDate}))throw Error("Sản phẩm đã có lịch thuê trùng lặp trong khoảng thời gian này!");let d=(0,o.doc)(e.db,"customers",t.customerId),l=null;t.customerId&&"public_customer"!==t.customerId&&(l=await n.get(d));let u=(0,o.doc)((0,r.collection)(e.db,"orders")),p=new Date().toISOString().split("T")[0];n.set(u,{...t,createdAt:new Date().toISOString()});let m="AVAILABLE";if("RENTING"===t.status?m="RENTING":p<t.startDate&&(m="RESERVED"),n.update(s,{status:m}),"RENTING"===t.status){if(l&&l.exists()){let e=l.data();n.update(d,{totalOrders:(e.totalOrders||0)+1,totalSpent:(e.totalSpent||0)+t.rentalFee})}let a=(0,o.doc)((0,r.collection)(e.db,"financial_records"));if(n.set(a,{type:"INFLOW",category:"Tiền thuê",amount:t.rentalFee,date:p,orderId:u.id,notes:`Thu tiền thu\xea đơn h\xe0ng ${u.id} - KH: ${t.customerName}`}),t.depositFee>0){let a=(0,o.doc)((0,r.collection)(e.db,"financial_records"));n.set(a,{type:"INFLOW",category:"Tiền cọc",amount:t.depositFee,date:p,orderId:u.id,notes:`Thu tiền cọc đơn h\xe0ng ${u.id} - KH: ${t.customerName}`})}}return u.id})}catch(t){throw console.error("Lỗi khi tạo đơn thuê:",t),t}}async function n(){try{let t=(0,r.collection)(e.db,"orders"),o=(0,a.query)(t,(0,a.orderBy)("createdAt","desc"));return(await (0,a.getDocs)(o)).docs.map(t=>({id:t.id,...t.data()}))}catch(t){return console.error("Lỗi khi lấy danh sách đơn thuê:",t),[]}}async function c(t,i,s){try{let n=(0,a.writeBatch)(e.db),c=(0,o.doc)(e.db,"orders",t),d=(0,o.doc)(e.db,"products",i),l=new Date().toISOString().split("T")[0];if(n.update(c,{status:"RETURNED",returnDetails:s}),n.update(d,{status:"AVAILABLE"}),s.extraFee>0){let a=(0,o.doc)((0,r.collection)(e.db,"financial_records"));n.set(a,{type:"INFLOW",category:"Tiền thuê",amount:s.extraFee,date:l,notes:`Phụ thu đơn h\xe0ng ${t} - L\xfd do: ${s.notes||"Trả trễ hạn"}`})}if(s.compensation>0){let a=(0,o.doc)((0,r.collection)(e.db,"financial_records"));n.set(a,{type:"INFLOW",category:"Bồi thường",amount:s.compensation,date:l,notes:`Tiền bồi thường đơn h\xe0ng ${t} - L\xfd do: ${s.notes||"Hỏng/mất phụ kiện"}`})}let u=await (0,a.getDoc)(c);if(u.exists()){let a=u.data();if(a.depositFee>0){let i=(0,o.doc)((0,r.collection)(e.db,"financial_records"));n.set(i,{type:"OUTFLOW",category:"Tiền cọc",amount:a.depositFee,date:l,notes:`Ho\xe0n tiền cọc đơn h\xe0ng ${t} - KH: ${a.customerName}`})}}await n.commit()}catch(t){throw console.error("Lỗi khi xử lý trả đồ:",t),t}}async function d(t){try{let i=(0,o.doc)(e.db,"orders",t),s=await (0,a.getDoc)(i);if(!s.exists())return;let n=s.data(),c=(0,a.writeBatch)(e.db);c.delete(i);let d=(0,o.doc)(e.db,"products",n.productId);if(c.update(d,{status:"AVAILABLE"}),"RENTING"===n.status||"OVERDUE"===n.status){let i=(0,a.query)((0,r.collection)(e.db,"financial_records"),(0,a.where)("orderId","==",t));if((await (0,a.getDocs)(i)).docs.forEach(t=>c.delete(t.ref)),n.customerId&&"public_customer"!==n.customerId){let t=(0,o.doc)(e.db,"customers",n.customerId),r=await (0,a.getDoc)(t);if(r.exists()){let e=r.data();c.update(t,{totalOrders:Math.max(0,(e.totalOrders||0)-1),totalSpent:Math.max(0,(e.totalSpent||0)-n.rentalFee)})}}}await c.commit()}catch(t){throw console.error("Lỗi khi xóa đơn thuê:",t),t}}async function l(){try{let t=new Date().toISOString().split("T")[0],i=(0,r.collection)(e.db,"orders"),s=(0,a.query)(i,(0,a.where)("status","in",["RESERVED","RENTING"])),n=await (0,a.getDocs)(s),c=(0,a.writeBatch)(e.db),d=0;for(let i of n.docs){let s=i.data(),n=i.id,l=(0,o.doc)(e.db,"products",s.productId),u=null,p=null;if("RESERVED"===s.status&&t>=s.startDate&&t<=s.endDate){u="RENTING",p="RENTING";let i=(0,o.doc)((0,r.collection)(e.db,"financial_records"));if(c.set(i,{type:"INFLOW",category:"Tiền thuê",amount:s.rentalFee,date:t,orderId:n,notes:`Thu tiền thu\xea đơn h\xe0ng ${n} - KH: ${s.customerName}`}),s.depositFee>0){let a=(0,o.doc)((0,r.collection)(e.db,"financial_records"));c.set(a,{type:"INFLOW",category:"Tiền cọc",amount:s.depositFee,date:t,orderId:n,notes:`Thu tiền cọc đơn h\xe0ng ${n} - KH: ${s.customerName}`})}if(s.customerId&&"public_customer"!==s.customerId){let t=(0,o.doc)(e.db,"customers",s.customerId),r=await (0,a.getDoc)(t);if(r.exists()){let e=r.data();c.update(t,{totalOrders:(e.totalOrders||0)+1,totalSpent:(e.totalSpent||0)+s.rentalFee})}}}else"RENTING"===s.status&&t>s.endDate?(u="OVERDUE",p="RENTING"):"RESERVED"===s.status&&t>s.endDate&&(u="OVERDUE",p="AVAILABLE");u&&(c.update((0,o.doc)(e.db,"orders",n),{status:u}),p&&c.update(l,{status:p}),d++)}d>0&&(await c.commit(),console.log(`Đ\xe3 tự động cập nhật ${d} đơn h\xe0ng.`))}catch(t){console.error("Lỗi tự động cập nhật trạng thái đơn hàng:",t)}}t.s(["autoUpdateOrderStatus",0,l,"checkProductAvailability",0,i,"createOrder",0,s,"deleteOrder",0,d,"getOrders",0,n,"returnOrder",0,c])},24071,t=>{"use strict";let e=(0,t.i(56420).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);t.s(["ChevronLeft",0,e],24071)},10818,t=>{"use strict";let e=(0,t.i(56420).default)("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);t.s(["Info",0,e],10818)},67927,t=>{"use strict";let e=(0,t.i(56420).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);t.s(["ChevronRight",0,e],67927)},74544,t=>{"use strict";let e=(0,t.i(56420).default)("clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]);t.s(["Clock",0,e],74544)}]);