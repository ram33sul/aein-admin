"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[367],{4367:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var o=t(9439),s=t(7155),a="Messages_container__2eHe6",i=t(4377),r=t(7689),l=t(9143),d=t(184);var u=function(){var e,n,t,u,c=(0,r.s0)(),v=(0,s.Z)({url:"/messagesCount"}),h=(0,o.Z)(v,3),g=h[0],f=h[1],x=h[2];return(0,d.jsxs)("div",{className:a,children:[(0,d.jsx)(i.Z,{loading:x,heading:"Total messages count",count:null!==(e=null===g||void 0===g?void 0:g.totalMessages)&&void 0!==e?e:0,subHeading:"Total messages today",subCount:null!==(n=null===g||void 0===g?void 0:g.totalMessagesToday)&&void 0!==n?n:0,width:"100%",error:!!f}),(0,d.jsx)(i.Z,{loading:x,heading:"Count of online users",count:null!==(t=null===g||void 0===g?void 0:g.onlineUsers)&&void 0!==t?t:0,subHeading:"Users who used messaging",subCount:null!==(u=null===g||void 0===g?void 0:g.messagedUsersToday)&&void 0!==u?u:0,width:"100%",error:!!f}),(0,d.jsx)(l.Z,{text:"Moods details",onClick:function(){return c("/messages/moods")},width:"100%",borderRadius:"20px",height:"100px"})]})}},4377:function(e,n,t){t.d(n,{Z:function(){return h}});var o="CountedData_container__5gzN8",s="CountedData_heading__YtOL8",a="CountedData_count__A3eFJ",i="CountedData_sub-heading__q2wla",r="CountedData_view__dvvrN",l="CountedData_loading__T9e1f",d={view:"ViewText_view__BfL6q"},u=t(184);var c=function(){return(0,u.jsx)("div",{className:d.container,children:"view \u2192"})},v=t(9186);var h=function(e){var n=e.heading,t=e.count,d=e.subHeading,h=e.subCount,g=e.theme,f=void 0===g?"light":g,x=e.width,_=e.loading,m=e.error,C=void 0!==m&&m,Z=e.height,j=void 0===Z?"":Z,w=e.onClick;return(0,u.jsx)("div",{onClick:w,className:o,style:"light"===f?{color:"black",backgroundColor:"var(--silver-color-light)",width:x,height:j}:{color:"white",backgroundColor:"var(--blue-color-dark)",width:x,height:j},children:_?(0,u.jsx)("div",{className:l}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:s,children:n}),(0,u.jsx)("div",{className:a,style:C?{color:"red"}:{},children:C?(0,u.jsx)(v.Z,{}):t}),(0,u.jsxs)("div",{className:i,children:[d," - ",(0,u.jsx)("strong",{style:C?{color:"red"}:{},children:C?(0,u.jsx)(v.Z,{size:"15px"}):h})]}),(0,u.jsx)("div",{className:r,children:(0,u.jsx)(c,{})})]})})}},9186:function(e,n,t){t.d(n,{Z:function(){return a}});var o={container:"ErrorMessage_container__9e608"},s=(t(2791),t(184));var a=function(e){var n=e.size,a=void 0===n?"20px":n,i=e.text,r=void 0===i?"Try again":i,l=t(573);return(0,s.jsxs)("div",{className:o.container,children:[(0,s.jsx)("img",{src:l,alt:"error",style:{maxWidth:a,maxHeight:a}}),(0,s.jsx)("div",{className:o.text,style:{fontSize:a},children:r})]})}},7155:function(e,n,t){var o=t(8683),s=t(9439),a=t(2791),i=t(1243);n.Z=function(e){var n=e.url,t=e.options,r=void 0===t?{method:"GET"}:t,l=e.fetch,d=void 0===l||l,u=(0,a.useState)(null),c=(0,s.Z)(u,2),v=c[0],h=c[1],g=(0,a.useState)(null),f=(0,s.Z)(g,2),x=f[0],_=f[1],m=(0,a.useState)(d),C=(0,s.Z)(m,2),Z=C[0],j=C[1],w=(0,a.useState)(null),b=(0,s.Z)(w,2),k=b[0],N=b[1],T=(0,a.useState)(d),p=(0,s.Z)(T,2),y=p[0],S=p[1],D=(0,a.useState)(!1),H=(0,s.Z)(D,2),M=H[0],z=H[1],q=(0,a.useCallback)((function(){S(!0),j(!0),z((function(e){return!e}))}),[]);return(0,a.useEffect)((function(){var e=i.Z.CancelToken.source();return N(e),y&&(0,i.Z)("/api".concat(n),(0,o.Z)((0,o.Z)({},r),{},{cancelToken:e.token})).then((function(e){h(e.data),j(!1)})).catch((function(e){i.Z.isCancel(e)||(_(e),j(!1))})),function(){e.cancel("API Request was cancelled!")}}),[y,M]),[v,x,Z,q,null===k||void 0===k?void 0:k.cancel]}}}]);
//# sourceMappingURL=367.8f065eb3.chunk.js.map