(()=>{"use strict";const t=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];class e{constructor(t,e,o){this.width=t,this.height=e,this.pixels=o}static empty(t,o,i){let n=new Array(t*o).fill(i);return new e(t,o,n)}pixel(t,e){return this.pixels[t+e*this.width]}draw(t){let o=this.pixels.slice();for(let{x:e,y:i,color:n}of t)o[e+i*this.width]=n;return new e(this.width,this.height,o)}}function o(t,e,o){e.width=t.width*o,e.height=t.height*o;let i=e.getContext("2d");for(let e=0;e<t.height;e++)for(let n=0;n<t.width;n++)i.fillStyle=t.pixel(n,e),i.fillRect(n*o,e*o,o,o)}function i(t,e,...o){let i=document.createElement(t);e&&Object.assign(i,e);for(let t of o)"string"!=typeof t?i.appendChild(t):i.appendChild(document.createTextNode(t));return i}function n(t){return t.toString(16).padStart(2,"0")}function s(t){let o=Math.min(100,t.width),s=Math.min(100,t.height),c=i("canvas",{width:o,height:s}).getContext("2d");c.drawImage(t,0,0);let l=[],{data:r}=c.getImageData(0,0,o,s);for(let t=0;t<r.length;t+=4){let[e,o,i]=r.slice(t,t+3);l.push("#"+n(e)+n(o)+n(i))}return new e(o,s,l)}class c{constructor(t,e){this.dom=i("canvas",{onmousedown:t=>this.mouse(t,e),ontouchstart:t=>this.touch(t,e)}),this.syncState(t)}syncState(t){this.picture!=t&&(this.picture=t,o(this.picture,this.dom,10))}}function l(t,e){let o=e.getBoundingClientRect();return{x:Math.floor((t.clientX-o.left)/10),y:Math.floor((t.clientY-o.top)/10)}}c.prototype.mouse=function(t,e){if(0!=t.button)return;let o=l(t,this.dom),i=e(o);if(!i)return;let n=t=>{if(0==t.buttons)this.dom.removeEventListener("mousemove",n);else{let e=l(t,this.dom);if(e.x==o.x&&e.y==o.y)return;i(e)}};this.dom.addEventListener("mousemove",n)},c.prototype.touch=function(t,e){let o=l(t.touches[0],this.dom),i=e(o);if(t.preventDefault(),!i)return;let n=t=>{let e=l(t.touches[0],this.dom);e.x==o.x&&e.y==o.y||(o=e,i(e))};this.dom.addEventListener("touchmove",n),this.dom.addEventListener("touchend",(()=>{this.dom.removeEventListener("touchmove",n),this.dom.removeEventListener("touchend",n)}))};class r{constructor(t,e){let{tools:o,controls:n,dispatch:s}=e;this.state=t,this.canvas=new c(t.picture,(t=>{let e=(0,o[this.state.tool])(t,this.state,s);if(e)return t=>e(t,this.state)})),this.controls=n.map((o=>new o(t,e))),this.dom=i("div",{},this.canvas.dom,i("br"),...this.controls.reduce(((t,e)=>t.concat(" ",e.dom)),[]))}syncState(t){this.state=t,this.canvas.syncState(t.picture);for(let e of this.controls)e.syncState(t)}}const h={tool:"draw",color:"#000000",picture:e.empty(60,30,"#f0f0f0"),done:[],doneAt:0},a={draw:function(t,e,o){function i({x:t,y:e},i){let n={x:t,y:e,color:i.color};o({picture:i.picture.draw([n])})}return i(t,e),i},fill:function({x:e,y:o},i,n){let s=i.picture.pixel(e,o),c=[{x:e,y:o,color:i.color}];for(let e=0;e<c.length;e++)for(let{dx:o,dy:n}of t){let t=c[e].x+o,l=c[e].y+n;t>=0&&t<i.picture.width&&l>=0&&l<i.picture.height&&i.picture.pixel(t,l)==s&&!c.some((e=>e.x==t&&e.y==l))&&c.push({x:t,y:l,color:i.color})}n({picture:i.picture.draw(c)})},rectangle:function(t,e,o){function i(i){let n=Math.min(t.x,i.x),s=Math.min(t.y,i.y),c=Math.max(t.x,i.x),l=Math.max(t.y,i.y),r=[];for(let t=s;t<=l;t++)for(let o=n;o<=c;o++)r.push({x:o,y:t,color:e.color});o({picture:e.picture.draw(r)})}return i(t),i},pick:function(t,e,o){o({color:e.picture.pixel(t.x,t.y)})}},d=[class{constructor(t,{tools:e,dispatch:o}){this.select=i("select",{onchange:()=>o({tool:this.select.value})},...Object.keys(e).map((e=>i("option",{selected:e==t.tool},e)))),this.dom=i("label",null,"Tool: ",this.select)}syncState(t){this.select.value=t.tool}},class{constructor(t,{dispatch:e}){this.input=i("input",{type:"color",value:t.color,onchange:()=>e({color:this.input.value})}),this.dom=i("label",null," Color: ",this.input)}syncState(t){this.input.value=t.color}},class{constructor(t){this.picture=t.picture,this.dom=i("button",{onclick:()=>this.save()},"💾 Save")}save(){let t=i("canvas");o(this.picture,t,10);let e=i("a",{href:t.toDataURL(),download:"pixel-art.png"});document.body.appendChild(e),e.click(),e.remove()}syncState(t){this.picture=t.picture}},class{constructor(t,{dispatch:e}){this.dom=i("button",{onclick:()=>function(t){let e=i("input",{type:"file",onchange:()=>function(t,e){if(null==t)return;let o=new FileReader;o.addEventListener("load",(()=>{let t=i("img",{onload:()=>e({picture:s(t)}),src:o.result})})),o.readAsDataURL(t)}(e.files[0],t)});document.body.appendChild(e),e.click(),e.remove()}(e)},"📁 Load")}syncState(){}},class{constructor(t,{dispatch:e}){this.dom=i("button",{onclick:()=>e({undo:!0}),disabled:0==t.done.length},"⃔ Undo")}syncState(t){this.dom.disabled=0==t.done.length}}];document.querySelector("div").appendChild(function({state:t=h,tools:e=a,controls:o=d}){let i=new r(t,{tools:e,controls:o,dispatch(e){t=function(t,e){return 1==e.undo?0==t.done.length?t:Object.assign({},t,{picture:t.done[0],done:t.done.slice(1),doneAt:0}):e.picture&&t.doneAt<Date.now()-1e3?Object.assign({},t,e,{done:[t.picture,...t.done],doneAt:Date.now()}):Object.assign({},t,e)}(t,e),i.syncState(t)}});return i.dom}({}))})();