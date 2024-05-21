(this["webpackJsonpproject-funding-frontend"]=this["webpackJsonpproject-funding-frontend"]||[]).push([[0],{42:function(e,t,a){e.exports=a(74)},48:function(e,t,a){},50:function(e,t){},59:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(34),c=a.n(o),l=(a(48),a(38)),s=a(5),i=a(10);const u=new i.a.providers.Web3Provider(window.ethereum),p=u.getSigner(),m=new i.a.Contract("0x5F71A58F00d8530C4df07c04Ac0836F32baD026c",[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"message",type:"string"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Debug",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"FundsWithdrawn",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"milestoneId",type:"uint256"}],name:"MilestoneApproved",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"}],name:"ProjectApproved",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"}],name:"ProjectCancelled",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"fundingGoal",type:"uint256"},{indexed:!1,internalType:"uint256",name:"deadline",type:"uint256"}],name:"ProjectCreated",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"projectId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"ProjectFunded",type:"event"},{inputs:[],name:"FUNDING_TIMEOUT",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"MILESTONE_TIMEOUT",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"},{internalType:"uint256",name:"_milestoneId",type:"uint256"}],name:"approveMilestone",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"}],name:"approveProject",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"}],name:"cancelProject",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_fundingGoal",type:"uint256"},{internalType:"uint256[]",name:"_milestoneGoals",type:"uint256[]"},{internalType:"uint256[]",name:"_milestoneDeadlines",type:"uint256[]"},{internalType:"uint256",name:"_Fundingtimeout",type:"uint256"}],name:"createProject",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"}],name:"fundProject",outputs:[],stateMutability:"payable",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"projectCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"projects",outputs:[{internalType:"address payable",name:"creator",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"uint256",name:"milestoneDeadline",type:"uint256"},{internalType:"uint256",name:"fundingGoal",type:"uint256"},{internalType:"uint256",name:"amountRaised",type:"uint256"},{internalType:"enum ProjectFunding.ProjectStatus",name:"status",type:"uint8"},{internalType:"uint256",name:"milestonePayouts",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"}],name:"timeoutRefund",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_projectId",type:"uint256"}],name:"withdrawFunds",outputs:[],stateMutability:"nonpayable",type:"function"}],p);var d=a(76);a(59);var j=function(){const[e,t]=Object(n.useState)(""),[a,o]=Object(n.useState)("Education"),[c,l]=Object(n.useState)(""),[s,p]=Object(n.useState)(""),[j,E]=Object(n.useState)([""]),[y,g]=Object(n.useState)([""]),[b,v]=Object(n.useState)("0"),[f,h]=Object(n.useState)("0"),[w,N]=Object(n.useState)(!1),C=()=>{t(""),o("Education"),l(""),p(""),E([""]),g([""]),v("0"),h("0")};return r.a.createElement("div",{className:"create-project-container"},r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Create Project"),r.a.createElement("form",{onSubmit:async t=>{t.preventDefault(),N(!0);try{await u.send("eth_requestAccounts",[]);const t=u.getSigner(),n=i.a.utils.parseEther(s),r=j.map(e=>i.a.utils.parseEther(e)),o=y.map(e=>86400*parseInt(e,10)),l=3600*parseInt(b,10)+60*parseInt(f,10),p=await m.connect(t).createProject(n,r,o,l),E=(await p.wait()).events.find(e=>"ProjectCreated"===e.event);if(!E)throw new Error("ProjectCreated event not found");const g=E.args.projectId,v=new Date(Date.now()+1e3*l),h=y.map((t,a)=>({projectId:g.toNumber(),milestoneId:a,projectName:e,milestoneDDL:new Date(v.getTime()+86400*parseInt(t,10)*1e3),goal:i.a.utils.parseEther(j[a]).toString()})),w={projectId:g.toNumber(),projectName:e,projectType:a,projectDescription:c,creator:p.from,fundingGoal:i.a.utils.parseEther(s).toString(),amountRaised:"0",status:"Pending",contributors:[],createdAt:new Date,projectDDL:v,milestones:h};await d.a.post("http://localhost:3001/api/projects",w);const P={type:"Create Project",projectId:g.toNumber(),user:p.from,details:w};await d.a.post("http://localhost:3001/api/activities",P),alert("Project created successfully"),C()}catch(n){console.error("Error creating project:",n),alert("Error creating project: ".concat(n.message))}finally{N(!1)}}},r.a.createElement("div",null,r.a.createElement("label",null,"Project Name: "),r.a.createElement("input",{type:"text",value:e,onChange:e=>t(e.target.value),required:!0,disabled:w})),r.a.createElement("div",null,r.a.createElement("label",null,"Project Type: "),r.a.createElement("select",{value:a,onChange:e=>o(e.target.value),required:!0,disabled:w},r.a.createElement("option",{value:"Education"},"Education"),r.a.createElement("option",{value:"Finance"},"Finance"),r.a.createElement("option",{value:"AI"},"AI"),r.a.createElement("option",{value:"Medical"},"Medical"),r.a.createElement("option",{value:"Others"},"Others"))),r.a.createElement("div",null,r.a.createElement("label",null,"Project Description: "),r.a.createElement("textarea",{value:c,onChange:e=>l(e.target.value),required:!0,disabled:w})),r.a.createElement("div",null,r.a.createElement("label",null,"Funding Goal (in Ether): "),r.a.createElement("input",{type:"text",value:s,onChange:e=>p(e.target.value),required:!0,disabled:w})),r.a.createElement("div",null,r.a.createElement("label",null,"Milestone Goals (in Ether): "),j.map((e,t)=>r.a.createElement("input",{key:t,type:"text",value:e,onChange:e=>((e,t)=>{const a=[...j];a[e]=t,E(a)})(t,e.target.value),required:!0,disabled:w})),r.a.createElement("div",{className:"button-group"},r.a.createElement("button",{type:"button",onClick:()=>{E([...j,""]),g([...y,""])},disabled:w},"Add Milestone"),r.a.createElement("button",{type:"button",onClick:()=>{j.length>1&&(E(j.slice(0,-1)),g(y.slice(0,-1)))},disabled:w||j.length<=1,className:j.length<=1?"disabled":""},"Delete Milestone"))),r.a.createElement("div",null,r.a.createElement("label",null,"Milestone Deadlines (in days): "),y.map((e,t)=>r.a.createElement("input",{key:t,type:"text",value:e,onChange:e=>((e,t)=>{const a=[...y];a[e]=t,g(a)})(t,e.target.value),required:!0,disabled:w}))),r.a.createElement("div",null,r.a.createElement("label",null,"Funding Timeout: "),r.a.createElement("div",{className:"timeout-inputs"},r.a.createElement("input",{type:"number",value:b,onChange:e=>v(e.target.value),min:"0",required:!0,disabled:w}),r.a.createElement("span",null,"Hours"),r.a.createElement("input",{type:"number",value:f,onChange:e=>h(e.target.value),min:"0",max:"60",required:!0,disabled:w}),r.a.createElement("span",null,"Minutes"))),r.a.createElement("button",{type:"submit",disabled:w},w?"Creating...":"Create Project"))))};a(64);var E=e=>{let{onAddressChange:t}=e;const[a,o]=Object(n.useState)(""),[c,l]=Object(n.useState)(""),s=async()=>{try{await window.ethereum.request({method:"eth_requestAccounts"});const e=new i.a.providers.Web3Provider(window.ethereum).getSigner(),a=await e.getAddress();o(a);const n=await e.getBalance();l(parseFloat(i.a.utils.formatEther(n)).toFixed(4)),t&&t(a)}catch(e){console.error("Error getting user address or balance:",e)}};Object(n.useEffect)(()=>{s();const e=e=>{e.length>0&&s()};return window.ethereum.on("accountsChanged",e),()=>{window.ethereum.removeListener("accountsChanged",e)}},[]);return r.a.createElement("div",{className:"metamask-info"},r.a.createElement("div",{className:"info-item"},r.a.createElement("span",{className:"label"},"Address:"),r.a.createElement("span",{className:"value"},"".concat((u=a).slice(0,5),"...").concat(u.slice(-5)))),r.a.createElement("div",{className:"info-item"},r.a.createElement("span",{className:"label"},"ETH:"),r.a.createElement("span",{className:"value"},c)));var u},y=a(39);a(65);var g=function(e){let{onCreateProject:t,onShowAllProjects:a,onShowMyProjects:o,onShowFundedProjects:c,onSearch:l,activePage:s,onAddressChange:i}=e;const[u,p]=Object(n.useState)("");return r.a.createElement("nav",{className:"navbar"},r.a.createElement("div",{className:"navbar-top"},r.a.createElement("div",{className:"navbar-left"},r.a.createElement("img",{src:"/logo.png",alt:"Logo",className:"navbar-logo"}),r.a.createElement("span",{className:"navbar-title"},"InnoFund")),r.a.createElement("div",{className:"navbar-right"},"createProject"!==s&&r.a.createElement("div",{className:"search-container"},r.a.createElement("input",{type:"text",placeholder:"Search...",value:u,onChange:e=>{p(e.target.value),l(e.target.value)}}),r.a.createElement(y.a,{className:"search-icon"})),r.a.createElement(E,{onAddressChange:i}))),r.a.createElement("div",{className:"navbar-bottom"},r.a.createElement("button",{className:"allProjects"===s?"active":"",onClick:a},"All Projects"),r.a.createElement("button",{className:"myProjects"===s?"active":"",onClick:o},"My Projects"),r.a.createElement("button",{className:"fundedProjects"===s?"active":"",onClick:c},"Funded Projects"),r.a.createElement("button",{className:"createProject"===s?"active":"",onClick:t},"Create Project")))};a(67);var b=function(e){let{id:t,name:a,category:o,description:c,projectDDL:l,status:s,fundingGoal:i,amountRaised:u,onClick:p,activePage:m,creator:j}=e;const[E,y]=Object(n.useState)([]),[g,b]=Object(n.useState)("");Object(n.useEffect)(()=>{(async()=>{var e;const t=await window.ethereum.request({method:"eth_requestAccounts"});b((null===(e=t[0])||void 0===e?void 0:e.toLowerCase())||"")})()},[]),Object(n.useEffect)(()=>{"funded"===s.toLowerCase()&&v(t)},[t,s]);const v=async e=>{try{const t=(await d.a.get("/api/milestones",{params:{projectId:e}})).data.filter(t=>t.projectId===e);y(t)}catch(t){console.error("Error fetching milestones:",t)}},f=(new Date(l)-new Date)/864e5<=6,h=(w=c).length>100?w.substring(0,97)+"...":w;var w;const N=(e=>e.length>30?e.substring(0,27)+"...":e)(a),C=(i/10**18).toString(),P=parseFloat(u).toString(),I=parseFloat(P)/parseFloat(C)*100,S=(null===j||void 0===j?void 0:j.toLowerCase())===g,D="deleted"===s.toLowerCase()?"gray":S?"orange":"";return r.a.createElement("div",{className:"project-card ".concat(D),onClick:p},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",{className:"project-name"},N),r.a.createElement("p",{className:"project-id"},r.a.createElement("strong",null,"ID:")," ",t),r.a.createElement("p",{className:"project-category"},r.a.createElement("strong",null,"Category:")," ",o)),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"project-description"},r.a.createElement("strong",null,"Description:")," ",h),r.a.createElement("p",{className:"project-ddl"},r.a.createElement("strong",null,"Deadline: "),r.a.createElement("span",{className:"deadline-date ".concat(f?"soon":"")},new Date(l).toLocaleDateString()))),r.a.createElement("div",{className:"card-footer"},"active"===s.toLowerCase()?r.a.createElement("div",{className:"status-section"},r.a.createElement("p",{className:"project-status"},"Crowdfunding Project - Raised: ",P," / ",C," ETH"),r.a.createElement("div",{className:"progress-bar"},r.a.createElement("div",{className:"progress",style:{width:"".concat(I,"%")}}))):null,"funded"===s.toLowerCase()&&E.length>0?r.a.createElement("div",{className:"milestone-section"},r.a.createElement("p",{className:"project-status"},"Milestone Progress - ",E.filter(e=>"approved"===e.milestonestatus).length," of ",E.length," approved"),r.a.createElement("div",{className:"milestone-progress-container"},E.map((e,a)=>{const n=e.milestonestatus,o="approved"===n,c="pending"===n;return r.a.createElement("div",{key:"".concat(t,"-").concat(e.milestoneId),className:"milestone-progress ".concat(o?"approved":c?"pending":"upcoming")})}))):null))};a(68);var v=function(e){let{projects:t,onProjectClick:a,activePage:n,currentUser:o}=e;return t.length?([...t].sort((e,t)=>t.projectId-e.projectId),r.a.createElement("div",{className:"project-list"},t.map(e=>r.a.createElement(b,{key:e.projectId,id:e.projectId,name:e.projectName,category:e.projectType,description:e.projectDescription,projectDDL:e.projectDDL,status:e.status,fundingGoal:e.fundingGoal,amountRaised:e.amountRaised,onClick:()=>a(e),activePage:n,creator:e.creator})))):r.a.createElement("div",{className:"no-projects"},"No project yet!")};a(69);var f=function(e){let{projectId:t}=e;const[a,o]=Object(n.useState)(""),[c,l]=Object(n.useState)(""),[s,p]=Object(n.useState)(!1),[j,E]=Object(n.useState)(!1);return Object(n.useEffect)(()=>{s?localStorage.setItem("funding-".concat(t),!0):localStorage.removeItem("funding-".concat(t))},[s,t]),Object(n.useEffect)(()=>{const e="true"===localStorage.getItem("funding-".concat(t));E(e)},[t]),r.a.createElement("div",{className:"fund-project-container"},r.a.createElement("h2",null,"Fund Project"),r.a.createElement("form",{onSubmit:async e=>{if(e.preventDefault(),parseFloat(a)<=0||isNaN(a))l("Amount must be a positive number");else try{p(!0),await u.send("eth_requestAccounts",[]);const e=u.getSigner(),n=await e.getAddress(),r=(e=>Math.round(100*e)/100)(parseFloat(a)),l=i.a.utils.parseEther(r.toString()),s=await m.fundProject(parseInt(t,10),{value:l});await s.wait();try{(await d.a.post("http://localhost:3001/api/projects/fund",{projectId:parseInt(t,10),amount:r,contributor:n})).data?(alert("Project funded successfully and database updated"),o("")):alert("Failed to update database")}catch(c){console.error("Error updating database:",c.message),alert("Error updating database")}}catch(c){console.error("Error funding project:",c.message),l("Error funding project")}finally{p(!1),E(!1)}}},r.a.createElement("div",{className:"input-group"},r.a.createElement("label",null,"Amount (in Ether): "),r.a.createElement("input",{type:"number",step:"0.01",value:a,onChange:e=>{const t=e.target.value;""===t||!isNaN(t)&&parseFloat(t)>=0?(o(t),l("")):l("Please enter a valid amount")},className:"fund-input",disabled:s||j})),c&&r.a.createElement("p",{className:"error"},c),r.a.createElement("button",{type:"submit",className:"fund-button",disabled:s||j},s?"Submitting...":"Fund Project")))};a(70);var h=function(e){let{projectId:t}=e;const[a,o]=Object(n.useState)(""),[c,l]=Object(n.useState)(null),[s,i]=Object(n.useState)(""),[p,m]=Object(n.useState)(""),[j,E]=Object(n.useState)(null),[y,g]=Object(n.useState)(!1),[b,v]=Object(n.useState)("");return Object(n.useEffect)(()=>{(async()=>{const e=await u.send("eth_requestAccounts",[]);m(e[0].toLowerCase())})()},[]),Object(n.useEffect)(()=>{(async()=>{try{const e=await d.a.get("http://localhost:3001/api/milestones?projectId=".concat(t,"&status=pending"));if(e.data.length>0){const t=e.data,a=Math.min(...t.map(e=>e.milestoneId));E(a)}else alert("No pending milestones found for this project.")}catch(b){console.error("Error fetching pending milestones:",b)}})()},[t]),r.a.createElement("div",{className:"upload-proof-container"},r.a.createElement("h2",null,"Upload Milestone Proof"),r.a.createElement("form",{onSubmit:async e=>{if(e.preventDefault(),c)if(null!==j)try{g(!0),await d.a.post("/api/milestones/upload-status",{projectId:t,isSubmitting:!0});const e=new FormData;e.append("projectId",t),e.append("milestoneDescription",a),e.append("milestoneId",j),e.append("otherDocument",c),e.append("currentUser",p);await d.a.post("http://localhost:3001/api/userApproveMilestones",e,{headers:{"Content-Type":"multipart/form-data"}});alert("Milestone proof uploaded successfully"),o(""),l(null),i(""),v("")}catch(b){console.error("Error uploading milestone proof:",b),v("Error: ".concat(b.message))}finally{g(!1),await d.a.post("/api/milestones/upload-status",{projectId:t,isSubmitting:!1})}else v("No pending milestone ID found.");else v("Please select a file.")}},r.a.createElement("div",null,r.a.createElement("label",null,"Milestone Description: "),r.a.createElement("textarea",{value:a,onChange:e=>o(e.target.value),required:!0,disabled:y})),r.a.createElement("div",{className:"file-input-container"},r.a.createElement("label",{className:"file-input-label",htmlFor:"file-input"},"Choose File",s&&r.a.createElement("span",{className:"file-name"},s)),r.a.createElement("input",{id:"file-input",type:"file",onChange:e=>{const t=e.target.files[0],a=t.name.split(".").pop().toLowerCase();["jpeg","jpg","png","gif"].includes(a)?(v(""),l(t),i(t.name)):(v("Only jpeg, jpg, png, gif files are allowed"),l(null),i(""))},disabled:y,className:"file-input"})),b&&r.a.createElement("p",{className:"error"},b),r.a.createElement("button",{type:"submit",disabled:y},y?"Submitting...":"Upload")))};a(71);var w=function(e){let{project:t,onClose:a,activePage:o}=e;const[c,l]=Object(n.useState)([]),[s,i]=Object(n.useState)(""),u=Object(n.useCallback)(async e=>{try{const t=(await d.a.get("/api/milestones",{params:{projectId:e}})).data.filter(t=>t.projectId===e);l(t)}catch(t){console.error("Error fetching milestones:",t)}},[]);Object(n.useEffect)(()=>{(async()=>{try{const e=await window.ethereum.request({method:"eth_requestAccounts"});i(e[0].toLowerCase())}catch(e){console.error("Error fetching current user:",e)}})(),u(t.projectId)},[u,t]);const p=parseFloat(t.amountRaised),m=t.fundingGoal/10**18;return r.a.createElement("div",{className:"project-details-container"},r.a.createElement("div",{className:"project-details"},r.a.createElement("button",{onClick:()=>{a(o)},className:"back-button"},"Back"),r.a.createElement("h2",null,t.projectName),r.a.createElement("p",null,r.a.createElement("strong",null,"ID:")," ",t.projectId),r.a.createElement("p",null,r.a.createElement("strong",null,"Type:")," ",t.projectType),r.a.createElement("p",null,r.a.createElement("strong",null,"Description:")," ",t.projectDescription),r.a.createElement("p",null,r.a.createElement("strong",null,"Project Deadline:")," ",new Date(t.projectDDL).toLocaleDateString()),"active"===t.status.toLowerCase()?r.a.createElement("div",{className:"status-section"},r.a.createElement("p",{className:"project-status"},"Crowdfunding Project - Raised: ",p," / ",m," ETH"),r.a.createElement("div",{className:"progress-bar"},r.a.createElement("div",{className:"progress",style:{width:"".concat(p/m*100,"%")}}))):r.a.createElement("div",{className:"milestone-section"},r.a.createElement("h3",null,"Milestones"),r.a.createElement("ul",null,c.map((e,a)=>r.a.createElement("li",{key:"".concat(t.projectId,"-").concat(e.milestoneId,"-").concat(a)},r.a.createElement("p",null,r.a.createElement("strong",null,"Milestone ID:")," ",e.milestoneId+1),r.a.createElement("p",null,r.a.createElement("strong",null,"Description:")," ",e.milestoneDescription),r.a.createElement("p",null,r.a.createElement("strong",null,"Document:")," ",r.a.createElement("a",{href:e.documentURL,target:"_blank",rel:"noopener noreferrer"},"View Document"))))),r.a.createElement("div",{className:"milestone-progress-container"},c.map((e,a)=>{const n=e.milestonestatus,o="approved"===n,c="pending"===n;return r.a.createElement("div",{key:"".concat(t.projectId,"-").concat(e.milestoneId,"-").concat(a),className:"milestone-progress ".concat(o?"approved":c?"pending":"upcoming")})})),r.a.createElement("p",{className:"project-status"},"Milestone Progress - ",c.filter(e=>"approved"===e.milestonestatus).length," of ",c.length," approved")),"active"===t.status.toLowerCase()&&t.creator.toLowerCase()!==s&&r.a.createElement(f,{projectId:t.projectId}),"funded"===t.status.toLowerCase()&&t.creator.toLowerCase()===s&&r.a.createElement(h,{projectId:t.projectId})))};a(72);var N=function(){const[e,t]=Object(n.useState)([]),[a,o]=Object(n.useState)([]),[c,l]=Object(n.useState)(""),[s,u]=Object(n.useState)(null),[p,m]=Object(n.useState)("allProjects");Object(n.useEffect)(()=>{(async()=>{try{const e=await d.a.get("/api/projects");t(e.data)}catch(e){console.error("Error fetching projects:",e)}})(),(async()=>{try{await window.ethereum.request({method:"eth_requestAccounts"});const e=new i.a.providers.Web3Provider(window.ethereum).getSigner(),t=await e.getAddress();l(t.toLowerCase())}catch(e){console.error("Error getting user address:",e)}})()},[]);const E=Object(n.useCallback)(()=>e.filter(e=>e.creator.toLowerCase()===c),[e,c]),y=Object(n.useCallback)(()=>e.filter(e=>("active"===e.status.toLowerCase()||"funded"===e.status.toLowerCase())&&e.contributors.some(e=>e.toLowerCase()===c)),[e,c]),b=Object(n.useCallback)(()=>e.filter(e=>"active"===e.status.toLowerCase()||"funded"===e.status.toLowerCase()),[e]);return Object(n.useEffect)(()=>{"allProjects"===p?o(b()):"fundedProjects"===p?o(y()):"myProjects"===p&&o(E())},[e,p,c,b,y,E]),r.a.createElement("div",{className:"home-container"},r.a.createElement(g,{onCreateProject:()=>{m("createProject"),u(null)},onShowAllProjects:()=>{m("allProjects"),u(null)},onShowMyProjects:()=>{m("myProjects"),u(null)},onShowFundedProjects:()=>{m("fundedProjects"),u(null)},onSearch:t=>{let a=e;if("myProjects"===p?a=E():"fundedProjects"===p?a=y():"allProjects"===p&&(a=b()),t){const e=t.toLowerCase(),n=a.filter(a=>a.projectName.toLowerCase().includes(e)||a.projectId.toString()===t);o(n)}else o(a)},activePage:p}),r.a.createElement("div",{className:"content ".concat("createProject"===p?"centered":"")},s?r.a.createElement(w,{project:s,onClose:e=>{u(null),m(e)},activePage:p}):"createProject"===p?r.a.createElement(j,null):r.a.createElement(v,{projects:a,onProjectClick:e=>{u({...e,isCreator:e.creator.toLowerCase()===c}),m("projectDetails")},activePage:p})))};a(73);var C=function(){return r.a.createElement(l.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/create-project",element:r.a.createElement(j,null)}),r.a.createElement(s.a,{path:"/",element:r.a.createElement(N,null)}))))};var P=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,77)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:o,getTTFB:c}=t;a(e),n(e),r(e),o(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null))),P()}},[[42,1,2]]]);
//# sourceMappingURL=main.bf13c879.chunk.js.map