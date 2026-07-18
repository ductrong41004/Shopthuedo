(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7219,e=>{"use strict";let t=(0,e.i(56420).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);e.s(["TrendingUp",0,t],7219)},70187,e=>{"use strict";var t=e.i(59141);e.i(36180);var a=e.i(28719),r=e.i(17689),s=e.i(63802);async function i(){try{let e=(0,a.collection)(t.db,"financial_records"),r=(0,s.query)(e,(0,s.orderBy)("date","desc"),(0,s.orderBy)("createdAt","desc"));return(await (0,s.getDocs)(r)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error("Lỗi khi lấy sổ quỹ thu chi:",e),[]}}async function n(e){try{let r=(0,a.collection)(t.db,"financial_records");return(await (0,s.addDoc)(r,{...e,createdAt:new Date().toISOString()})).id}catch(e){throw console.error("Lỗi khi thêm ghi chép thu chi:",e),e}}async function o(e){try{let a=(0,r.doc)(t.db,"financial_records",e);await (0,s.deleteDoc)(a)}catch(e){throw console.error("Lỗi khi xóa ghi chép thu chi:",e),e}}async function l(){try{let e=new Date().toISOString().split("T")[0],r=e.substring(0,7),i=(0,a.collection)(t.db,"products"),n=(await (0,s.getDocs)(i)).docs.map(e=>({id:e.id,...e.data()})).length,o=(0,a.collection)(t.db,"orders"),l=(await (0,s.getDocs)(o)).docs.map(e=>({id:e.id,...e.data()})),d=new Set(l.filter(e=>"RENTING"===e.status||"OVERDUE"===e.status).map(e=>e.productId)).size,c=Math.max(0,n-d),u=(0,a.collection)(t.db,"financial_records"),p=(await (0,s.getDocs)(u)).docs.map(e=>e.data()),h=0,m=0;p.forEach(t=>{"INFLOW"===t.type&&"Tiền cọc"!==t.category&&(t.date===e&&(h+=t.amount),t.date.startsWith(r)&&(m+=t.amount))});let x=l.filter(t=>"OVERDUE"===t.status||"RENTING"===t.status&&t.endDate<e),f=l.filter(t=>{if("RENTING"!==t.status)return!1;let a=new Date(t.endDate).getTime()-new Date(e).getTime(),r=Math.ceil(a/864e5);return r>=0&&r<=3}).length,b=l.filter(e=>"RENTING"===e.status||"RESERVED"===e.status).sort((e,t)=>e.endDate.localeCompare(t.endDate)).slice(0,5),g=l.sort((e,t)=>t.createdAt.localeCompare(e.createdAt)).slice(0,5);return{totalProducts:n,rentingCount:d,availableCount:c,upcomingReturnCount:f,todayRevenue:Math.max(0,h),monthRevenue:Math.max(0,m),upcomingDueOrders:b,overdueOrders:x,recentRents:g}}catch(e){return console.error("Lỗi khi tính toán thống kê dashboard:",e),{totalProducts:0,rentingCount:0,availableCount:0,upcomingReturnCount:0,todayRevenue:0,monthRevenue:0,upcomingDueOrders:[],overdueOrders:[],recentRents:[]}}}async function d(e=new Date().getFullYear()){try{let r=(0,a.collection)(t.db,"financial_records"),i=(await (0,s.getDocs)(r)).docs.map(e=>e.data()),n={};for(let t=1;t<=12;t++)n[`${e}-${String(t).padStart(2,"0")}`]={revenue:0,expense:0};i.forEach(t=>{let a=t.date.substring(0,7);a.startsWith(String(e))&&n[a]&&("INFLOW"===t.type?"Tiền cọc"!==t.category&&(n[a].revenue+=t.amount):"OUTFLOW"===t.type&&"Tiền cọc"!==t.category&&(n[a].expense+=t.amount))});let o=Object.keys(n).sort().map(e=>{let t=parseInt(e.split("-")[1]);return{month:`Th\xe1ng ${t}`,revenue:n[e].revenue,expense:n[e].expense}}),l=(0,a.collection)(t.db,"orders"),d=(await (0,s.getDocs)(l)).docs.map(e=>e.data()),c={};for(let t=1;t<=12;t++)c[`${e}-${String(t).padStart(2,"0")}`]=0;d.forEach(t=>{let a=t.startDate.substring(0,7);a.startsWith(String(e))&&void 0!==c[a]&&c[a]++});let u=Object.keys(c).sort().map(e=>{let t=parseInt(e.split("-")[1]);return{month:`T${t}`,count:c[e]}}),p={};d.forEach(e=>{p[e.productId]||(p[e.productId]={code:e.productCode,name:e.productName,count:0,revenue:0}),p[e.productId].count++,p[e.productId].revenue+=e.rentalFee});let h=Object.values(p).sort((e,t)=>t.count-e.count).slice(0,5),m=(0,a.collection)(t.db,"customers"),x=(await (0,s.getDocs)(m)).docs.map(e=>e.data()).map(e=>({name:e.name,phone:e.phone,count:e.totalOrders||0,spent:e.totalSpent||0})).sort((e,t)=>t.spent-e.spent).slice(0,5);return{revenueChartData:o,rentalChartData:u,topProducts:h,vipCustomers:x}}catch(e){return console.error("Lỗi khi thống kê báo cáo:",e),{revenueChartData:[],rentalChartData:[],topProducts:[],vipCustomers:[]}}}e.s(["createFinancialRecord",0,n,"deleteFinancialRecord",0,o,"getDashboardStats",0,l,"getFinancialRecords",0,i,"getReportStats",0,d])},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},28719,17689,e=>{"use strict";var t=e.i(35506);e.s(["collection",()=>t.aR],28719),e.s(["doc",()=>t.a9],17689)},5766,e=>{"use strict";let t,a;var r,s=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function p(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let p=u(e),h=c[p]||(c[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!c[h]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(a=t[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);c[h]=d(s?{["@keyframes "+h]:t}:t,a?"":"."+h)}let m=a&&c.g;return a&&(c.g=c[h]),i=c[h],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),h})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let h,m,x,f=p.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;a.p=Object.assign({theme:m&&m()},o),a.o=/go\d/.test(l),o.className=p.apply(a,r)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),x&&d[0]&&x(o),h(d,o)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},N="default",j=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},O=(e,t=N)=>{L[t]=j(L[t]||k,e),w.forEach(([e,a])=>{e===t&&a(L[t])})},C=e=>Object.keys(L).forEach(t=>O(e,t)),D=(e=N)=>t=>{O(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return D(s.toasterId||(r=s.id,Object.keys(L).find(e=>L[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},E=(e,t)=>T("blank")(e,t);E.error=T("error"),E.success=T("success"),E.loading=T("loading"),E.custom=T("custom"),E.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):C(a)},E.dismissAll=e=>E.dismiss(void 0,e),E.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):C(a)},E.removeAll=e=>E.remove(void 0,e),E.promise=(e,t,a)=>{let r=E.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?E.success(s,{id:r,...a,...null==a?void 0:a.success}):E.dismiss(r),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?E.error(s,{id:r,...a,...null==a?void 0:a.error}):E.dismiss(r)}),e};var I=1e3,F=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=f`
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
}`,R=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
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
`,W=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,P=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,z=f`
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
}`,U=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,_=b("div")`
  position: absolute;
`,B=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=f`
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
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,H=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===a?null:s.createElement(B,null,s.createElement(M,{...r}),"loading"!==a&&s.createElement(_,null,"error"===a?s.createElement(R,{...r}):s.createElement(U,{...r})))},G=b("div")`
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
`,K=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(H,{toast:e}),o=s.createElement(K,{...e.ariaProps},g(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))});r=s.createElement,d.p=void 0,h=r,m=void 0,x=void 0;var Y=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let n=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:n,className:t,style:a},i)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=N)=>{let[a,r]=(0,s.useState)(L[t]||k),i=(0,s.useRef)(L[t]);(0,s.useEffect)(()=>(i.current!==L[t]&&r(L[t]),w.push([t,r]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=I)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&E.dismiss(a.id);return}return setTimeout(()=>E.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let o=(0,s.useCallback)(D(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(a,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let n,o,l=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(n=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?Q:"",style:u},"custom"===a.type?g(a.message,a):i?i(a):s.createElement(X,{toast:a,position:l}))}))},"default",0,E],5766)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},2773,e=>{"use strict";let t=(0,e.i(56420).default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);e.s(["Filter",0,t],2773)},3893,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(70187),s=e.i(77071),i=e.i(66595),n=e.i(7219);let o=(0,e.i(56420).default)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]]);var l=e.i(70904),d=e.i(73474),c=e.i(63676),u=e.i(28623),p=e.i(49882),h=e.i(2773),m=e.i(5766);let x=["Tiền thuê","Tiền cọc","Bán sản phẩm","Bồi thường"],f=["Nhập hàng","Giặt ủi","Sửa chữa","Marketing","Chi phí khác"];e.s(["default",0,function(){let[e,b]=(0,a.useState)([]),[g,y]=(0,a.useState)([]),[v,N]=(0,a.useState)(!0),[j,w]=(0,a.useState)(0),[k,L]=(0,a.useState)(0),[O,C]=(0,a.useState)("ALL"),[D,S]=(0,a.useState)("ALL"),[T,E]=(0,a.useState)(""),[I,F]=(0,a.useState)(!1),[$,A]=(0,a.useState)("INFLOW"),[R,W]=(0,a.useState)(x[0]),[M,P]=(0,a.useState)(0),[z,U]=(0,a.useState)(new Date().toISOString().split("T")[0]),[_,B]=(0,a.useState)(""),V=async()=>{N(!0);try{let e=await (0,r.getFinancialRecords)();b(e),y(e);let t=0,a=0;e.forEach(e=>{"INFLOW"===e.type?t+=e.amount:a+=e.amount}),w(t),L(a)}catch(e){m.default.error("Không thể tải sổ quỹ thu chi.")}finally{N(!1)}};(0,a.useEffect)(()=>{V()},[]),(0,a.useEffect)(()=>{"INFLOW"===$?W(x[0]):W(f[0])},[$]),(0,a.useEffect)(()=>{let t=e;if("ALL"!==O&&(t=t.filter(e=>e.type===O)),"ALL"!==D&&(t=t.filter(e=>e.category===D)),""!==T.trim()){let e=T.toLowerCase();t=t.filter(t=>t.notes?.toLowerCase().includes(e))}y(t)},[O,D,T,e]);let q=async e=>{if(e.preventDefault(),M<=0||!R||!z)return void m.default.error("Vui lòng nhập đầy đủ số tiền, danh mục và ngày lập.");let t={type:$,category:R,amount:Number(M),date:z,notes:_.trim()};N(!0);try{await (0,r.createFinancialRecord)(t),m.default.success("Lập phiếu thu/chi thành công!"),F(!1),P(0),B(""),U(new Date().toISOString().split("T")[0]),V()}catch(e){m.default.error("Không thể lưu phiếu thu/chi.")}finally{N(!1)}},H=async e=>{if(confirm("Bạn có chắc chắn muốn xóa phiếu thu/chi này không? Số dư quỹ sẽ được tính toán lại.")){N(!0);try{await (0,r.deleteFinancialRecord)(e),m.default.success("Đã xóa phiếu thu/chi."),V()}catch(e){m.default.error("Không thể xóa phiếu.")}finally{N(!1)}}},G=e=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e);return(0,t.jsxs)("div",{className:"space-y-6 animate-in fade-in duration-300",children:[(0,t.jsx)(m.Toaster,{position:"top-right"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"glass-card p-6 border flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"text-left space-y-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-text-gray tracking-wider uppercase",children:"Tổng thu nhập"}),(0,t.jsx)("h4",{className:"text-2xl font-bold text-emerald-600 heading-serif",children:G(j)}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted",children:"Bao gồm thuê đồ, cọc, bán sản phẩm"})]}),(0,t.jsx)("span",{className:"p-3 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100",children:(0,t.jsx)(n.TrendingUp,{className:"w-6 h-6"})})]}),(0,t.jsxs)("div",{className:"glass-card p-6 border flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"text-left space-y-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-text-gray tracking-wider uppercase",children:"Tổng chi ra"}),(0,t.jsx)("h4",{className:"text-2xl font-bold text-red-600 heading-serif",children:G(k)}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted",children:"Nhập đồ, giặt ủi, sửa váy, marketing"})]}),(0,t.jsx)("span",{className:"p-3 bg-red-50 rounded-full text-red-600 border border-red-100",children:(0,t.jsx)(o,{className:"w-6 h-6"})})]}),(0,t.jsxs)("div",{className:"glass-card p-6 border flex items-center justify-between bg-brand-pink/20",children:[(0,t.jsxs)("div",{className:"text-left space-y-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-primary tracking-wider uppercase",children:"Sổ quỹ tồn (Còn lại)"}),(0,t.jsx)("h4",{className:"text-2xl font-bold text-primary heading-serif",children:G(j-k)}),(0,t.jsx)("p",{className:"text-[10px] text-text-muted",children:"Quỹ tiền mặt khả dụng hiện tại"})]}),(0,t.jsx)("span",{className:"p-3 bg-primary text-white rounded-full shadow-md shadow-pink-100",children:(0,t.jsx)(l.Wallet,{className:"w-6 h-6"})})]})]}),(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3 w-full sm:w-auto",children:[(0,t.jsxs)("div",{className:"relative flex-1 sm:w-60",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray",children:(0,t.jsx)(i.Search,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:"text",placeholder:"Tìm theo ghi chú...",value:T,onChange:e=>E(e.target.value),className:"w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{value:O,onChange:e=>{C(e.target.value),S("ALL")},className:"pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer",children:[(0,t.jsx)("option",{value:"ALL",children:"Tất cả phiếu"}),(0,t.jsx)("option",{value:"INFLOW",children:"Phiếu Thu (+)"}),(0,t.jsx)("option",{value:"OUTFLOW",children:"Phiếu Chi (-)"})]}),(0,t.jsx)(h.Filter,{className:"absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none"})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("select",{value:D,onChange:e=>S(e.target.value),className:"pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer",children:[(0,t.jsx)("option",{value:"ALL",children:"Tất cả danh mục"}),"OUTFLOW"!==O&&x.map(e=>(0,t.jsx)("option",{value:e,children:e},e)),"INFLOW"!==O&&f.map(e=>(0,t.jsx)("option",{value:e,children:e},e))]}),(0,t.jsx)(h.Filter,{className:"absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none"})]})]}),(0,t.jsxs)("button",{onClick:()=>{A("INFLOW"),F(!0)},className:"btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5 shrink-0",children:[(0,t.jsx)(s.Plus,{className:"w-4 h-4"}),"Lập phiếu Thu / Chi"]})]}),v?(0,t.jsx)("div",{className:"h-96 flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"})}):g.length>0?(0,t.jsx)("div",{className:"bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden text-left",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm border-collapse",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"bg-brand-beige/20 border-b border-brand-pink-pastel text-xs font-bold text-text-dark",children:[(0,t.jsx)("th",{className:"px-6 py-4 text-left",children:"Ngày lập"}),(0,t.jsx)("th",{className:"px-6 py-4 text-left",children:"Loại phiếu"}),(0,t.jsx)("th",{className:"px-6 py-4 text-left",children:"Danh mục"}),(0,t.jsx)("th",{className:"px-6 py-4 text-left",children:"Số tiền"}),(0,t.jsx)("th",{className:"px-6 py-4 text-left",children:"Ghi chú"}),(0,t.jsx)("th",{className:"px-6 py-4 text-center",children:"Hành động"})]})}),(0,t.jsx)("tbody",{className:"divide-y divide-brand-pink-pastel/30",children:g.map(e=>(0,t.jsxs)("tr",{className:"hover:bg-brand-beige/5",children:[(0,t.jsx)("td",{className:"px-6 py-4 font-medium text-text-dark whitespace-nowrap",children:e.date}),(0,t.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,t.jsx)("span",{className:`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${"INFLOW"===e.type?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-red-50 text-red-700 border-red-200"}`,children:"INFLOW"===e.type?"Thu nhập (+)":"Chi ra (-)"})}),(0,t.jsx)("td",{className:"px-6 py-4 text-xs font-semibold text-text-dark whitespace-nowrap",children:e.category}),(0,t.jsxs)("td",{className:`px-6 py-4 font-bold whitespace-nowrap ${"INFLOW"===e.type?"text-emerald-600":"text-red-500"}`,children:["INFLOW"===e.type?"+":"-",G(e.amount)]}),(0,t.jsx)("td",{className:"px-6 py-4 text-text-muted text-xs max-w-xs truncate",title:e.notes,children:e.notes||"---"}),(0,t.jsx)("td",{className:"px-6 py-4 text-center whitespace-nowrap",children:(0,t.jsx)("button",{onClick:()=>H(e.id),className:"p-1.5 border border-red-50 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer",title:"Xóa phiếu",children:(0,t.jsx)(d.Trash2,{className:"w-3.5 h-3.5"})})})]},e.id))})]})})}):(0,t.jsxs)("div",{className:"bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux",children:[(0,t.jsx)(l.Wallet,{className:"w-12 h-12 text-brand-pink-pastel mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-sm text-text-muted font-medium",children:"Chưa có giao dịch thu chi nào."})]}),I&&(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-black/40 backdrop-blur-xs",onClick:()=>F(!1)}),(0,t.jsxs)("div",{className:"relative bg-brand-white w-full max-w-md overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left",children:[(0,t.jsx)("button",{onClick:()=>F(!1),className:"absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer",children:(0,t.jsx)(c.X,{className:"w-5 h-5"})}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-6",children:[(0,t.jsx)(u.Sparkles,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"heading-serif text-xl font-bold text-text-dark",children:"Lập phiếu thu / chi"})]}),(0,t.jsxs)("form",{onSubmit:q,className:"space-y-4",children:[(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark uppercase",children:"Loại giao dịch *"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2 p-1 bg-brand-pink/35 rounded-full border border-brand-pink-pastel/60",children:[(0,t.jsx)("button",{type:"button",onClick:()=>A("INFLOW"),className:`py-2 rounded-full text-xs font-semibold cursor-pointer ${"INFLOW"===$?"bg-emerald-600 text-white shadow-sm":"text-text-muted"}`,children:"Phiếu Thu (+)"}),(0,t.jsx)("button",{type:"button",onClick:()=>A("OUTFLOW"),className:`py-2 rounded-full text-xs font-semibold cursor-pointer ${"OUTFLOW"===$?"bg-red-600 text-white shadow-sm":"text-text-muted"}`,children:"Phiếu Chi (-)"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Danh mục nghiệp vụ *"}),(0,t.jsx)("select",{value:R,onChange:e=>W(e.target.value),className:"w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer",children:"INFLOW"===$?x.map(e=>(0,t.jsx)("option",{value:e,children:e},e)):f.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Số tiền giao dịch (VND) *"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray font-bold text-xs",children:"đ"}),(0,t.jsx)("input",{type:"number",required:!0,min:1,value:M||"",onChange:e=>P(Number(e.target.value)),placeholder:"250000",className:"w-full pl-8 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Ngày ghi nhận *"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray",children:(0,t.jsx)(p.Calendar,{className:"w-4 h-4"})}),(0,t.jsx)("input",{type:"date",required:!0,value:z,onChange:e=>U(e.target.value),className:"w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-text-dark mb-1.5 uppercase",children:"Ghi chú phiếu"}),(0,t.jsx)("textarea",{rows:2,value:_,onChange:e=>B(e.target.value),placeholder:"Ví dụ: Giặt ủi đầm tiệc D001 / Bán hoa sáp đi kèm...",className:"w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary bg-brand-white resize-none text-text-dark"})]}),(0,t.jsxs)("div",{className:"pt-4 border-t border-brand-pink-pastel flex justify-end gap-3",children:[(0,t.jsx)("button",{type:"button",onClick:()=>F(!1),className:"btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Hủy"}),(0,t.jsx)("button",{type:"submit",disabled:v,className:"btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5",children:"Tạo phiếu"})]})]})]})]})]})}],3893)}]);