(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,a,t){e.exports=t(68)},36:function(e,a,t){},37:function(e,a,t){},67:function(e,a,t){},68:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(23),o=t.n(s),c=(t(36),t(8)),l=t(7);t(37);var i=function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-success"},r.a.createElement(c.b,{className:"navbarText navbar-brand",to:"/"},"PodHub"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNavAltMarkup"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.b,{to:"/profile",className:"/profile"===window.location.pathname?"nav-link active":"nav-link"},"Profile")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.b,{to:"/",className:"/"===window.location.pathname||"/home"===window.location.pathname?"nav-link active":"nav-link"},"Home"))),r.a.createElement("form",{className:"form-inline my-2 my-lg-0 searchUserForm"},r.a.createElement("input",{className:"form-control mr-sm-2 searchUserInput",type:"search",placeholder:"Search for an user","aria-label":"Search"})),r.a.createElement("form",{className:"form-inline my-2 my-lg-0 searchPodcastForm"},r.a.createElement("input",{className:"form-control mr-sm-2 searchPodcastInput",type:"search",placeholder:"Search for a podcast","aria-label":"Search"}))))},m=t(26),d=t(27),p=t(29),u=t(28),h=t(30);var v=function(e){return r.a.createElement("div",{className:"container"},e.children)};var E=function(e){return r.a.createElement("div",{className:"row"},e.children)};var g=t(13),f=t.n(g),N={getPosts:function(e){return f.a.get("/home",e)},getEpisodes:function(e){return f.a.get("/api/getEpisodes",e)}};t(67);var b=function(e){var a=e.photo,t=e.name,n=e.date,s=e.message,o=e.icon,c=e.title,l=e.description,i=e.link,m=e.likes,d=e.comments;return r.a.createElement("div",{className:"container rounded-0 border-top-0 border-left-0 border-right-0 card"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-2"},r.a.createElement("img",{src:a})),r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},t," \xa0|\xa0 ",n),r.a.createElement("div",{className:"row"},s),r.a.createElement("div",{className:"row border rounded"},r.a.createElement("div",{className:"col-2 p-0"},r.a.createElement("img",{src:o})),r.a.createElement("div",{className:"col p-0"},r.a.createElement("p",null,c),r.a.createElement("p",null,l),r.a.createElement("a",{href:i},i))),r.a.createElement("div",{className:"row pb-1"},r.a.createElement("a",{className:"likes"},"Likes:\xa0",m,"\xa0"),r.a.createElement("a",{className:"comments"}," Comments:\xa0",d)))))},w=function(e){function a(){var e,t;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(t=Object(p.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(r)))).state={posts:[{userProfileImage:"<image>",userName:"Vahe Minasyan",date:"03/20/2019",message:"Checkout this awesome podcast",podcastIcon:"<image>",podcastEpisode:"Very Bad Wizards Episode 159: You have the right...",episodeDescription:"Description",link:"link",likes:10,comments:10},{userProfileImage:"<image>",userName:"John Smith",date:"03/21/2019",message:"Checkout this awesome podcast",podcastIcon:"<image>",podcastEpisode:"Very Bad Wizards Episode 159: You have the right...",episodeDescription:"Description",link:"link",likes:10,comments:10}],userId:""},t.refreshPosts=function(){t.getPosts()},t.getPosts=function(){N.getPosts(t.state.userId).then(function(e){return t.setState({posts:e.data})}).catch(function(){return t.setState({posts:[],message:"Please follow someone or post something to see posts"})})},t}return Object(h.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement(v,null,r.a.createElement(E,null,this.state.posts.length?r.a.createElement(v,null,this.state.posts.map(function(e){return r.a.createElement(b,{key:e.id,photo:e.userProfileImage,name:e.userName,date:e.date,message:e.message,icon:e.podcastIcon,title:e.podcastEpisode,description:e.episodeDescription,link:e.link,likes:e.likes,comments:e.comments})})):r.a.createElement("h2",{className:"text-center"},this.state.message)))}}]),a}(n.Component);var k=function(){return r.a.createElement(c.a,null,r.a.createElement("div",{className:"wrapper"},r.a.createElement(i,null),r.a.createElement(v,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:w}),r.a.createElement(l.a,{exact:!0,path:"/home",component:w})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.2cb8cf8f.chunk.js.map