(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{188:function(e,t,n){e.exports=n.p+"static/media/home_white.a4cfe33e.svg"},210:function(e,t,n){e.exports=n(465)},216:function(e,t,n){},217:function(e,t,n){},220:function(e,t,n){},221:function(e,t,n){},465:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(43),i=n.n(r),l=(n(215),n(216),n(14)),c=n(15),s=n(18),u=n(16),d=n(17),h=n(472),p=n(35),m=Object(p.a)({}),f=(n(217),n(13)),b=(o.a.Component,o.a.Component,n(25)),y=n.n(b),g=n(44),v="safe%20injection%20site",k=function(){this.post=function(e,t,n){var a=new XMLHttpRequest;a.onreadystatechange=function(){4==a.readyState&&200==a.status&&n(a.responseText)};var o={queryPath:t};a.open("POST",e,!1),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a.send(JSON.stringify(o))}},C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={text:"Go click the button!"},n.handleClick=n.handleClick.bind(Object(f.a)(n)),n.handleIndividualPlaceClick=n.handleIndividualPlaceClick.bind(Object(f.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(){var e=Object(g.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({text:t}),e.next=3,x.handleGetPlacesQuery(49.26794,-123.24736,v);case 3:return n=e.sent,console.log("Response: "+n),e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleIndividualPlaceClick",value:function(){var e=Object(g.a)(y.a.mark(function e(t){var n;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.handleGetPlaceDetails(t);case 2:return n=e.sent,console.log("Response: "+n),e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("h1",null,"Maps Page"),o.a.createElement("button",{onClick:function(){return e.handleClick("You clicked the button!")}},"Get list of nearby places"),o.a.createElement("button",{onClick:function(){return e.handleIndividualPlaceClick("ChIJv1Ta5shyhlQR_6flUsZ9Vok")}},"Get detailed info for one place"),o.a.createElement("p",null,"Text: ",this.state.text))}}]),t}(o.a.Component),j=function e(){Object(l.a)(this,e)};j.MAPS_API_KEY="AIzaSyAsvCrLqQVzefCIIPgvWoVsx_PBpYi8l2c";var x=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"handleGetPlacesQuery",value:function(){var e=Object(g.a)(y.a.mark(function e(t,n,a){var o,r,i;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=this.buildGetPlacesQuery(t,n,a),console.log(o),r=new k,this.response=null,i=this,e.next=7,r.post("".concat("","/placesRequest"),o,function(e){console.log("Returning result handleGetPlacesQuery()"),i.response=e});case 7:return e.abrupt("return",i.response);case 8:case"end":return e.stop()}},e,this)}));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"buildGetPlacesQuery",value:function(e,t,n){return"https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword="+n+"&inputtype=textquery&language=en&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,plus_code,types,user_ratings_total,price_level,rating,opening_hours&location="+e.toString()+","+t.toString()+"&key="+j.MAPS_API_KEY+"&radius=12000"}},{key:"handleGetPlaceDetails",value:function(){var e=Object(g.a)(y.a.mark(function e(t){var n,a,o;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.buildGetPlaceDetailsQuery(t),console.log(n),a=new k,this.response=null,o=this,e.next=7,a.post("".concat("","/placeDetailsRequest"),n,function(e){console.log("Returning result handleGetPlaceDetails()"),o.response=e});case 7:return e.abrupt("return",o.response);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"buildGetPlaceDetailsQuery",value:function(e){return"https://maps.googleapis.com/maps/api/place/details/json?key="+j.MAPS_API_KEY+"&placeid="+e+"&language=en&fields=formatted_phone_number,international_phone_number,opening_hours,website"}}]),e}(),O=(n(220),n(188)),E=n.n(O),w={container:{display:"flex",width:"100%",height:"min-content",backgroundColor:"#428ec1",padding:"0.5rem",fill:"#FFF"},title:{color:"#FFFFFF"},logo:{marginRight:"1rem",marginLeft:"0.5rem",height:"1.5rem",color:"#FFFFFF",fill:"#FFF",path:{fill:"#FFF"}}},F=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={text:"Go click the button!"},n.handleClick=n.handleClick.bind(Object(f.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(e){this.setState({text:e})}},{key:"render",value:function(){return o.a.createElement("div",{style:w.container},o.a.createElement("img",{style:w.logo,src:E.a,alt:"logo",className:"home-logo"}),o.a.createElement("h1",{style:w.title},"Haven App"),o.a.createElement("button",{style:{height:"2rem"},onClick:function(){return m.push("/")}},"main"),o.a.createElement("button",{style:{height:"2rem"},onClick:function(){return m.push("/admin")}},"admin"))}}]),t}(o.a.Component),P=(n(221),n(471)),S={container:{display:"flex",height:"min-content",width:"100%",backgroundColor:"#FFFFFF",padding:"0.5rem"},innerContainer:{display:"flex",flexFlow:"column",width:"100%"},optionsBar:{display:"flex",width:"100%",justifyContent:"flex-end"}},_=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleClick=n.handleClick.bind(Object(f.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(e){this.setState({text:e})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:S.container},o.a.createElement("div",{style:S.innerContainer},o.a.createElement("h1",null,"Resource Details/ schedule"),o.a.createElement("p",null,"Details text, schedule etc..."),o.a.createElement("div",{style:S.optionsBar},o.a.createElement("button",{onClick:function(){return e.handleClick("You clicked the button!")}},"Admin Panel!"))))}}]),t}(o.a.Component),A=n(189),I=n.n(A),L=n(191),M=Object(L.withStyles)(function(e){return{chip:{marginRight:4,border:"1px solid #4b96f1",backgroundColor:"transparent",color:"#3d7ac4",height:"1.5rem"}}})(function(e){var t=e.text,n=e.classes;return o.a.createElement(I.a,{label:t,className:n.chip})}),G={container:function(e,t){return{display:"flex",flexFlow:"column",width:"100%",height:t?"16rem":"8rem",backgroundColor:e?"#eceef9":"#FFFFFF",transition:"all 0.05s ease-in-out"}},thumbnail:{width:"8rem",height:"100%",backgroundColor:"#c1c1c1"},innerContainer:{display:"flex",width:"100%",height:"100%"},body:{display:"flex",flexFlow:"column",height:"100%",width:"100%",padding:"0.5rem"},title:{fontSize:"12pt",marginBottom:4},types:{fontStyle:"italic",fontSize:"10pt",marginBottom:4},description:{fontSize:"10pt",fontStyle:"italic",marginBottom:4},bodyControlBar:{display:"flex",height:"1rem",justifyContent:"flex-end"},vacancy:function(e){return{display:"flex",flexFlow:"row",color:"FULL"===e?"red":"green"}},label:{fontSize:"10pt"}},R=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={isExpanded:!1,phone:"(604) 827-2584",schedule:["Monday: 9:00 AM \u2013 4:00 PM","Tuesday: 9:00 AM \u2013 4:00 PM","Wednesday: 9:00 AM \u2013 4:00 PM","Thursday: 9:00 AM \u2013 4:00 PM","Friday: 9:00 AM \u2013 4:00 PM","Saturday: Closed","Sunday: Closed"],website:"http://pharmsci.ubc.ca/pharmacists-clinic"},n.getLabel=n.getLabel.bind(Object(f.a)(n)),n.handleExpand=n.handleExpand.bind(Object(f.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleExpand",value:function(e){this.setState({isExpanded:!e})}},{key:"getLabel",value:function(){var e=this.props.infoTag;return{VACANCY:o.a.createElement("span",{style:G.vacancy(e.label)},o.a.createElement("p",{style:G.label},e.label," ",e.value))}[e.type]}},{key:"render",value:function(){var e=this,t=this.props,n=t.index,a=t.name,r=(t.icon,t.address),i=(t.openingHours,t.types);t.infoTag;return o.a.createElement("div",{style:G.container(n%2,this.state.isExpanded),onClick:function(){return e.handleExpand(e.state.isExpanded)}},o.a.createElement("div",{style:G.innerContainer},o.a.createElement("div",{style:G.thumbnail},"logo goes here"),o.a.createElement("div",{style:G.body},o.a.createElement("h3",{style:G.title},a),o.a.createElement("div",{style:G.types},i.slice(0,3).map(function(e,t){return o.a.createElement(M,{key:t,text:e})})),o.a.createElement("p",{style:G.description},r),o.a.createElement("div",{style:G.bodyControlBar},this.getLabel()))),this.state.isExpanded&&o.a.createElement(_,{index:n}))}}]),t}(o.a.Component),T={container:{display:"flex",flexFlow:"column",flex:"none",width:"100%",height:"100%"},scrollContainer:{display:"flex",flexFlow:"column",width:"100%",height:"min-content"},listItem:{padding:0}},B="safe%20injection%20site",D={type:"VACANCY",label:"VACANT",value:"132/200"},q={name:"Shoppers Drug Mart",icon:"https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",formatted_address:"Dentistry Bldg, 5940 University Blvd, Vancouver, BC V6T 1Z3, Canada",opening_hours:{open_now:!0},types:["pharmacy","store","health","point_of_interest","establishment"],infoTag:D},N=[q,q,q,q],Q=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={lat:49.26794,lon:-123.24736,data:[]},n.queryNearbyResources=n.queryNearbyResources.bind(Object(f.a)(n)),n.setLocation=n.setLocation.bind(Object(f.a)(n)),n.getLocation=n.getLocation.bind(Object(f.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getLocation",value:function(){return new Promise(function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){e(t)},function(){console.log("error1"),t("Geolocation is not supported by this browser.")}):(console.log("error2"),t("Geolocation is not supported by this browser."))})}},{key:"setLocation",value:function(e){var t=e.coords.latitude,n=e.coords.longitude;this.setState({lat:t,lon:n})}},{key:"queryNearbyResources",value:function(){var e=Object(g.a)(y.a.mark(function e(){var t;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.handleGetPlacesQuery(this.state.lat,this.state.lon,B);case 2:return t=e.sent,console.log("resources are ",t),this.setState({data:t}),e.abrupt("return",t);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){console.log("mounted"),this.getLocation().then(this.setLocation).then(this.queryNearbyResources)}},{key:"render",value:function(){return o.a.createElement("div",{style:T.container},o.a.createElement("div",{style:T.scrollContainer},o.a.createElement(P.a,{celled:!0},N.map(function(e,t){return o.a.createElement(P.a.Item,{key:t,style:T.listItem},o.a.createElement(P.a.Content,null,o.a.createElement(R,{index:t,name:e.name,icon:e.icon,address:e.formatted_address,openingHours:e.opening_hours,types:e.types,infoTag:e.infoTag})))}))))}}]),t}(o.a.Component),z={container:{display:"flex",flexFlow:"column"}},V=function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{style:z.container},o.a.createElement(F,null),o.a.createElement(Q,null))}}]),t}(o.a.Component),Y=n(410);n(457);var H={container:{display:"flex",flexFlow:"column",width:"100%",height:"100%"}},J=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleClick=n.handleClick.bind(Object(f.a)(n));return Y.initializeApp({apiKey:"AIzaSyCNmaSPCktKr5T-Stq6mL3wlnIuJ9xD-Ss",authDomain:"bcs-hackathon-2019.firebaseapp.com",databaseURL:"https://bcs-hackathon-2019.firebaseio.com",projectId:"bcs-hackathon-2019",storageBucket:"bcs-hackathon-2019.appspot.com",messagingSenderId:"473934570743"}),n.firebase=Y,n.db=Y.database(),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(e){this.setState({text:e}),this.firebase.database().ref("/Shelters/Shelter1").once("value").then(function(e){console.log("Shelter name:",e.name),console.log("Shelter location:",e.location),console.log("Shelter capacity:",e.capacity),console.log("Current number of occupants:",e.occupants)})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:H.container},o.a.createElement(F,null),o.a.createElement("h1",null,"Admin Page"),o.a.createElement("button",{onClick:function(){return e.handleClick()}},"Click me!"))}}]),t}(o.a.Component),K=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h.b,{history:m},o.a.createElement(h.a,{exact:!0,path:"/",component:V}),o.a.createElement(h.a,{exact:!0,path:"/admin",component:J})),o.a.createElement(C,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[210,1,2]]]);
//# sourceMappingURL=main.4de89d21.chunk.js.map