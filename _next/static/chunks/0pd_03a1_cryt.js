(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,a;var r,o=e.i(71645);let i={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let a="",r="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+s+";":r+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?r+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return a+(t&&o?t+"{"+o+"}":o)+r},d={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function p(e){let t,a,r=this||{},o=e.call?e(r.p):e;return((e,t,a,r,o)=>{var i;let p=u(e),m=d[p]||(d[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=s.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(a=t[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);d[m]=c(o?{["@keyframes "+m]:t}:t,a?"":"."+m)}let f=a&&d.g;return a&&(d.g=d[m]),i=d[m],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(o.unshift?o.raw?(t=[].slice.call(arguments,1),a=r.p,o.reduce((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let m,f,h,g=p.bind({k:1});function y(e,t){let a=this||{};return function(){let r=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;a.p=Object.assign({theme:f&&f()},n),a.o=/go\d/.test(l),n.className=p.apply(a,r)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),m(c,n)}return t?t(o):o}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),x=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},w="default",D=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return D(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},C=(e,t=w)=>{O[t]=D(O[t]||k,e),E.forEach(([e,a])=>{e===t&&a(O[t])})},I=e=>Object.keys(O).forEach(t=>C(e,t)),T=(e=w)=>t=>{C(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=e=>(t,a)=>{let r,o=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||v()}))(t,e,a);return T(o.toasterId||(r=o.id,Object.keys(O).find(e=>O[e].toasts.some(e=>e.id===r))))({type:2,toast:o}),o.id},N=(e,t)=>R("blank")(e,t);N.error=R("error"),N.success=R("success"),N.loading=R("loading"),N.custom=R("custom"),N.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):I(a)},N.dismissAll=e=>N.dismiss(void 0,e),N.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):I(a)},N.removeAll=e=>N.remove(void 0,e),N.promise=(e,t,a)=>{let r=N.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?b(t.success,e):void 0;return o?N.success(o,{id:r,...a,...null==a?void 0:a.success}):N.dismiss(r),e}).catch(e=>{let o=t.error?b(t.error,e):void 0;o?N.error(o,{id:r,...a,...null==a?void 0:a.error}):N.dismiss(r)}),e};var S=1e3,j=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${j} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${A} 0.15s ease-out forwards;
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
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,_=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,z=g`
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
}`,U=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${z} 0.2s ease-out forwards;
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
`,H=y("div")`
  position: absolute;
`,W=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?o.createElement(G,null,t):t:"blank"===a?null:o.createElement(W,null,o.createElement(P,{...r}),"loading"!==a&&o.createElement(H,null,"error"===a?o.createElement(F,{...r}):o.createElement(U,{...r})))},V=y("div")`
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
`,K=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=o.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,o]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(q,{toast:e}),n=o.createElement(K,{...e.ariaProps},b(e.message,e));return o.createElement(V,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});r=o.createElement,c.p=void 0,m=r,f=void 0,h=void 0;var Z=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let s=o.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return o.createElement("div",{ref:s,className:t,style:a},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:s,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=w)=>{let[a,r]=(0,o.useState)(O[t]||k),i=(0,o.useRef)(O[t]);(0,o.useEffect)(()=>(i.current!==O[t]&&r(O[t]),E.push([t,r]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let s=a.toasts.map(t=>{var a,r,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...a,toasts:s}})(e,t),i=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=S)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),o=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&N.dismiss(a.id);return}return setTimeout(()=>N.dismiss(a.id,t),r)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let n=(0,o.useCallback)(T(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:o=8,defaultPosition:i}=t||{},s=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,s]),{toasts:a,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(a,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(a=>{let s,n,l=a.position||t,c=d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(s=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...n});return o.createElement(Z,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?J:"",style:u},"custom"===a.type?b(a.message,a):i?i(a):o.createElement(Y,{toast:a,position:l}))}))},"default",0,N],5766)},7219,e=>{"use strict";let t=(0,e.i(56420).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);e.s(["TrendingUp",0,t],7219)},70187,e=>{"use strict";var t=e.i(59141);e.i(36180);var a=e.i(28719),r=e.i(17689),o=e.i(63802);async function i(){try{let e=(0,a.collection)(t.db,"financial_records"),r=(0,o.query)(e,(0,o.orderBy)("date","desc"),(0,o.orderBy)("createdAt","desc"));return(await (0,o.getDocs)(r)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy sổ quỹ thu chi:",e),[]}}async function s(e){try{let r=(0,a.collection)(t.db,"financial_records");return(await (0,o.addDoc)(r,{...e,createdAt:new Date().toISOString()})).id}catch(e){throw console.error("Lỗi khi thêm ghi chép thu chi:",e),e}}async function n(e){try{let a=(0,r.doc)(t.db,"financial_records",e);await (0,o.deleteDoc)(a)}catch(e){throw console.error("Lỗi khi xóa ghi chép thu chi:",e),e}}async function l(){try{let e=new Date().toISOString().split("T")[0],r=e.substring(0,7),i=(0,a.collection)(t.db,"products"),s=(await (0,o.getDocs)(i)).docs.map(e=>({id:e.id,...e.data()})).length,n=(0,a.collection)(t.db,"orders"),l=(await (0,o.getDocs)(n)).docs.map(e=>({id:e.id,...e.data()})),c=new Set(l.filter(e=>"RENTING"===e.status||"OVERDUE"===e.status).map(e=>e.productId)).size,d=Math.max(0,s-c),u=(0,a.collection)(t.db,"financial_records"),p=(await (0,o.getDocs)(u)).docs.map(e=>e.data()),m=0,f=0;p.forEach(t=>{"INFLOW"===t.type&&"Tiền cọc"!==t.category&&(t.date===e&&(m+=t.amount),t.date.startsWith(r)&&(f+=t.amount))});let h=l.filter(t=>"OVERDUE"===t.status||"RENTING"===t.status&&t.endDate<e),g=l.filter(t=>{if("RENTING"!==t.status)return!1;let a=new Date(t.endDate).getTime()-new Date(e).getTime(),r=Math.ceil(a/864e5);return r>=0&&r<=3}).length,y=l.filter(e=>"RENTING"===e.status||"RESERVED"===e.status).sort((e,t)=>e.endDate.localeCompare(t.endDate)).slice(0,5),b=l.sort((e,t)=>t.createdAt.localeCompare(e.createdAt)).slice(0,5);return{totalProducts:s,rentingCount:c,availableCount:d,upcomingReturnCount:g,todayRevenue:Math.max(0,m),monthRevenue:Math.max(0,f),upcomingDueOrders:y,overdueOrders:h,recentRents:b}}catch(e){return console.error("Lỗi khi tính toán thống kê dashboard:",e),{totalProducts:0,rentingCount:0,availableCount:0,upcomingReturnCount:0,todayRevenue:0,monthRevenue:0,upcomingDueOrders:[],overdueOrders:[],recentRents:[]}}}async function c(e=new Date().getFullYear()){try{let r=(0,a.collection)(t.db,"financial_records"),i=(await (0,o.getDocs)(r)).docs.map(e=>e.data()),s={};for(let t=1;t<=12;t++)s[`${e}-${String(t).padStart(2,"0")}`]={revenue:0,expense:0};i.forEach(t=>{let a=t.date.substring(0,7);a.startsWith(String(e))&&s[a]&&("INFLOW"===t.type?"Tiền cọc"!==t.category&&(s[a].revenue+=t.amount):"OUTFLOW"===t.type&&"Tiền cọc"!==t.category&&(s[a].expense+=t.amount))});let n=Object.keys(s).sort().map(e=>{let t=parseInt(e.split("-")[1]);return{month:`Th\xe1ng ${t}`,revenue:s[e].revenue,expense:s[e].expense}}),l=(0,a.collection)(t.db,"orders"),c=(await (0,o.getDocs)(l)).docs.map(e=>e.data()),d={};for(let t=1;t<=12;t++)d[`${e}-${String(t).padStart(2,"0")}`]=0;c.forEach(t=>{let a=t.startDate.substring(0,7);a.startsWith(String(e))&&void 0!==d[a]&&d[a]++});let u=Object.keys(d).sort().map(e=>{let t=parseInt(e.split("-")[1]);return{month:`T${t}`,count:d[e]}}),p={};c.forEach(e=>{p[e.productId]||(p[e.productId]={code:e.productCode,name:e.productName,count:0,revenue:0}),p[e.productId].count++,p[e.productId].revenue+=e.rentalFee});let m=Object.values(p).sort((e,t)=>t.count-e.count).slice(0,5),f=(0,a.collection)(t.db,"customers"),h=(await (0,o.getDocs)(f)).docs.map(e=>e.data()).map(e=>({name:e.name,phone:e.phone,count:e.totalOrders||0,spent:e.totalSpent||0})).sort((e,t)=>t.spent-e.spent).slice(0,5);return{revenueChartData:n,rentalChartData:u,topProducts:m,vipCustomers:h}}catch(e){return console.error("Lỗi khi thống kê báo cáo:",e),{revenueChartData:[],rentalChartData:[],topProducts:[],vipCustomers:[]}}}e.s(["createFinancialRecord",0,s,"deleteFinancialRecord",0,n,"getDashboardStats",0,l,"getFinancialRecords",0,i,"getReportStats",0,c])},68109,e=>{"use strict";let t=(0,e.i(56420).default)("heart",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]]);e.s(["Heart",0,t],68109)}]);