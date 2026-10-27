function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=t=>new r("string"==typeof t?t:t+"",void 0,s),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return n(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,g=globalThis,_=g.trustedTypes,f=_?_.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,k=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+M,U=`<${P}>`,O=document,T=()=>O.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,L=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,I=/"/g,q=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,X=O.createTreeWalker(O,129);function Z(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=D:void 0!==c[1]?n=L:void 0!==c[2]?(q.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=o??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?I:B):n===I||n===B?n=j:n===D||n===L?n=N:(n=j,o=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+U:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+M+h):i+M+(-2===l?e:h)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=G(t,e);if(this.el=J.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=s.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),X.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)a.push({type:7,index:o}),t+=M.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=z(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);X.currentNode=s;let o=X.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=X.nextNode(),r++)}return X.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),z(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!z(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===F)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(J,tt),(A.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let ct=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},pt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return ut({...t,state:!0,attribute:!1})}const gt=1,_t=t=>(...e)=>({_$litDirective$:t,values:e});let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const vt=_t(class extends ft{constructor(t){if(super(t),t.type!==gt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return F}}),bt={},$t=_t(class extends ft{constructor(){super(...arguments),this.key=W}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=bt)=>{t._$AH=e})(t),this.key=e),i}}),yt="important",xt=" !"+yt,wt=_t(class extends ft{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(xt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?yt:""):i[t]=s}}return F}});var At="0.1.0";const kt="compact-thermostat-card",Et="compact-thermostat-card-editor",St=1e4,Ct="var(--state-inactive-color, var(--disabled-color, #bdbdbd))",Mt={off:Ct,heat:"var(--state-climate-heat-color, #ff8100)",cool:"var(--state-climate-cool-color, #2b9af9)",heat_cool:"var(--state-climate-heat_cool-color, #ffc107)",auto:"var(--state-climate-auto-color, #4caf50)",dry:"var(--state-climate-dry-color, #ff9800)",fan_only:"var(--state-climate-fan_only-color, #00bcd4)"},Pt={heating:Mt.heat,preheating:Mt.heat,defrosting:Mt.heat,cooling:Mt.cool,drying:Mt.dry,fan:Mt.fan_only,idle:Ct,off:Ct},Ut=Ct,Ot=new Set(["heating","preheating","cooling","drying"]),Tt={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan"},zt={heating:"mdi:fire",preheating:"mdi:heat-wave",defrosting:"mdi:snowflake-melt",cooling:"mdi:snowflake",drying:"mdi:water-percent",fan:"mdi:fan",idle:"mdi:clock-outline",off:"mdi:power"},Rt={none:"mdi:circle-medium",eco:"mdi:leaf",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",home:"mdi:home",sleep:"mdi:bed",activity:"mdi:motion-sensor"},Ht={off:"Spento",heat:"Riscaldamento",cool:"Raffrescamento",heat_cool:"Caldo/Freddo",auto:"Automatico",dry:"Deumidifica",fan_only:"Ventilazione",heating:"Scalda",preheating:"Preriscaldamento",defrosting:"Sbrinamento",cooling:"Raffresca",drying:"Deumidifica",fan:"Ventila",idle:"Inattivo",unavailable:"Non disponibile",unknown:"Sconosciuto"},Nt={title:"Titolo (opzionale)",show_mode_button:"Pulsante modo",show_setpoint_buttons:"Pulsanti − / +",compact:"Modalità compatta",entity:"Termostato",name:"Nome",icon:"Icona",current_sensor:"Sensore temperatura attuale (opzionale)",bar_min:"Barra: minimo °",bar_max:"Barra: massimo °",add:"Aggiungi termostato"},Dt=[{name:"title",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_mode_button",selector:{boolean:{}}},{name:"show_setpoint_buttons",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}],Lt=[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"current_sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{type:"grid",name:"",schema:[{name:"bar_min",selector:{number:{mode:"box",step:.5}}},{name:"bar_max",selector:{number:{mode:"box",step:.5}}}]}],jt=[{name:"add",selector:{entity:{domain:"climate"}}}];let Bt=class extends ct{constructor(){super(...arguments),this._open=-1,this._label=t=>Nt[t.name]??t.name}setConfig(t){const e=(t.entities??[]).map(t=>"string"==typeof t?{entity:t}:t);this._config={...t,entities:e}}connectedCallback(){super.connectedCallback(),customElements.get("ha-form")||customElements.get("hui-tile-card")?.getConfigElement?.()}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_globalChanged(t){const e=t.detail.value,i={...this._config,...e};i.title||delete i.title,!1!==i.show_mode_button&&delete i.show_mode_button,!1!==i.show_setpoint_buttons&&delete i.show_setpoint_buttons,i.compact||delete i.compact,this._emit(i)}_entityChanged(t,e){const i=[...this._config.entities];var s;i[t]=(s=e.detail.value,Object.fromEntries(Object.entries(s).filter(([,t])=>null!=t&&""!==t))),this._emit({...this._config,entities:i})}_add(t){const e=t.detail.value?.add;if(!e)return;const i=[...this._config.entities,{entity:e}];this._emit({...this._config,entities:i}),this.requestUpdate()}_move(t,e){const i=[...this._config.entities],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._open===t&&(this._open=s),this._emit({...this._config,entities:i}))}_remove(t){const e=this._config.entities.filter((e,i)=>i!==t);this._open=-1,this._emit({...this._config,entities:e})}render(){if(!this._config||!this.hass)return W;const t=this._config,e={title:t.title??"",show_mode_button:!1!==t.show_mode_button,show_setpoint_buttons:!1!==t.show_setpoint_buttons,compact:!!t.compact};return V`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${Dt}
        .computeLabel=${this._label}
        @value-changed=${this._globalChanged}
      ></ha-form>

      <div class="heading">Termostati</div>
      <div class="list">
        ${t.entities.map((e,i)=>{const s=this.hass.states[e.entity],o=e.name??s?.attributes.friendly_name??e.entity,r=this._open===i;return V`
            <div class="item">
              <div class="head">
                <button class="expand" @click=${()=>this._open=r?-1:i}>
                  <ha-icon .icon=${r?"mdi:chevron-down":"mdi:chevron-right"}></ha-icon>
                  <span class="t">${o}</span>
                  <span class="id">${e.entity}</span>
                </button>
                <button class="ib" title="Su" ?disabled=${0===i} @click=${()=>this._move(i,-1)}>
                  <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
                </button>
                <button class="ib" title="Giù" ?disabled=${i===t.entities.length-1} @click=${()=>this._move(i,1)}>
                  <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
                </button>
                <button class="ib" title="Rimuovi" @click=${()=>this._remove(i)}>
                  <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
                </button>
              </div>
              ${r?V`<div class="body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${Lt}
                      .computeLabel=${this._label}
                      @value-changed=${t=>this._entityChanged(i,t)}
                    ></ha-form>
                  </div>`:W}
            </div>
          `})}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{add:""}}
        .schema=${jt}
        .computeLabel=${this._label}
        @value-changed=${this._add}
      ></ha-form>
    `}};Bt.styles=a`
    :host {
      display: block;
    }
    .heading {
      margin: 20px 0 8px;
      font-weight: 500;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 2px;
      padding-right: 4px;
    }
    button {
      border: 0;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
    }
    .expand {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 8px;
      text-align: left;
    }
    .t {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .id {
      color: var(--secondary-text-color);
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ib {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      --mdc-icon-size: 20px;
    }
    .ib:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .ib:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .body {
      padding: 4px 12px 12px;
      border-top: 1px solid var(--divider-color);
    }
  `,t([ut({attribute:!1})],Bt.prototype,"hass",void 0),t([mt()],Bt.prototype,"_config",void 0),t([mt()],Bt.prototype,"_open",void 0),Bt=t([dt(Et)],Bt);const It=(t,e)=>void 0!==t&&void 0!==e&&Math.abs(t-e)<.01,qt=t=>{if(null==t||""===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0};let Vt=class extends ct{constructor(){super(...arguments),this._sel={},this._pending=new Map,this._modePending=new Map,this._formatters=new Map,this._onDocumentClick=t=>{if(!this._menu)return;const e=t.composedPath().some(t=>t instanceof HTMLElement&&(t.classList.contains("menu")||t.classList.contains("mode")));e||(this._menu=void 0)}}static getConfigElement(){return document.createElement(Et)}static getStubConfig(t){return{entities:Object.keys(t.states).filter(t=>t.startsWith("climate.")).slice(0,3).map(t=>({entity:t}))}}setConfig(t){if(!t||!Array.isArray(t.entities)||0===t.entities.length)throw new Error('Specifica almeno un\'entità in "entities"');const e=t.entities.map(t=>"string"==typeof t?{entity:t}:{...t});for(const t of e)if(!t.entity||!t.entity.startsWith("climate."))throw new Error(`Entità non valida: ${t.entity??"(vuota)"} — serve un'entità climate.*`);this._config={...t,entities:e}}get _height(){const t=this._config;return t?(t.title?40:0)+t.entities.length*(t.compact?68:92):92}getCardSize(){return Math.ceil(this._height/50)}getGridOptions(){const t=Math.ceil((this._height+8)/64);return{columns:12,rows:t,min_columns:6,min_rows:t}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocumentClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocumentClick,!0);for(const t of this._pending.values())clearTimeout(t.timer)}willUpdate(t){t.has("hass")&&this.hass&&this._reconcile()}_reconcile(){const t=Date.now();for(const[e,i]of this._pending){if(i.timer||void 0===i.sentAt||this._drag?.entity===e)continue;const s=this.hass.states[e]?.attributes??{},o=Object.entries(i.values).every(([t,e])=>It(qt(s[t]),e));(o||t-i.sentAt>St)&&this._pending.delete(e)}for(const[e,i]of this._modePending){const s=this.hass.states[e];(("hvac_mode"===i.kind?s?.state===i.value:s?.attributes.preset_mode===i.value)||t-i.at>St)&&this._modePending.delete(e)}}get _lang(){return this.hass?.locale?.language??this.hass?.language??"it"}get _unit(){return this.hass?.config?.unit_system?.temperature??"°C"}_fmt(t,e){const i=`${this._lang}|${e}`;let s=this._formatters.get(i);return s||(s=new Intl.NumberFormat(this._lang,{minimumFractionDigits:e,maximumFractionDigits:e}),this._formatters.set(i,s)),s.format(t)}_label(t,e){if(this._lang.startsWith("it")&&Ht[t])return Ht[t];try{const i=e();if(i&&i!==t)return i}catch{}return Ht[t]??t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}_modeLabel(t,e){return this._label(e,()=>this.hass.formatEntityState?.(t,e))}_presetLabel(t,e){try{const i=this.hass.formatEntityAttributeValue?.(t,"preset_mode",e);if(i&&i!==e)return i}catch{}return e.charAt(0).toUpperCase()+e.slice(1).replace(/_/g," ")}_statusLabel(t){if(t.unavailable)return Ht.unavailable;const e=t.stateObj;let i=t.action?this._label(t.action,()=>this.hass.formatEntityAttributeValue?.(e,"hvac_action",t.action)):this._modeLabel(e,t.mode);const s=e.attributes.preset_mode;return s&&"none"!==s&&(i+=` · ${this._presetLabel(e,s)}`),i}_model(t){const e=t.entity,i=this.hass.states[e],s=i?.attributes??{},o=!i||"unavailable"===i.state||"unknown"===i.state,r=this._pending.get(e),n=this._modePending.get(e),a=i?.state??"unavailable",c=o?void 0:s.hvac_action??void 0;let l=qt(s.current_temperature);if(t.current_sensor){const e=qt(this.hass.states[t.current_sensor]?.state);void 0!==e&&(l=e)}const d=t=>r?.values[t]??qt(s[t]),h=d("target_temp_low"),p=d("target_temp_high"),u=d("temperature"),m=void 0!==h&&void 0!==p&&("heat_cool"===a||void 0===u),g=qt(s.min_temp)??7,_=qt(s.max_temp)??35;let f=t.bar_min??g,v=t.bar_max??_;v<=f&&([f,v]=[g,_]);let b=Ut;return o||(b=c&&Pt[c]||Mt[a]||Ut),{id:e,conf:t,stateObj:i,name:t.name??s.friendly_name??e,icon:t.icon??s.icon??"mdi:thermostat",unavailable:o,locked:o||"off"===a,mode:a,action:c,color:b,current:l,dual:m,hasSetpoint:!o&&(m||void 0!==u),target:u,low:h,high:p,step:qt(s.target_temp_step)??("°F"===this._unit?1:.5),min:g,max:_,barMin:f,barMax:v,pending:r,modePending:n}}_keyFor(t){return t.dual?this._sel[t.id]??"target_temp_low":"temperature"}_setValue(t,e,i){let s=Math.round(i/t.step)*t.step;s=Math.min(t.max,Math.max(t.min,Math.round(100*s)/100)),"target_temp_low"===e&&void 0!==t.high&&(s=Math.min(s,t.high-t.step)),"target_temp_high"===e&&void 0!==t.low&&(s=Math.max(s,t.low+t.step));let o=this._pending.get(t.id);o||(o={values:{}},this._pending.set(t.id,o)),o.values[e]=s,t.dual&&(o.values.target_temp_low??=t.low,o.values.target_temp_high??=t.high)}_schedule(t){const e=this._pending.get(t);e&&(clearTimeout(e.timer),e.sentAt=void 0,e.timer=window.setTimeout(()=>this._send(t),1500),this.requestUpdate())}_send(t){const e=this._pending.get(t);if(!e||!this.hass)return;e.timer=void 0,e.sentAt=Date.now();const i={entity_id:t};void 0!==e.values.temperature&&(i.temperature=e.values.temperature),void 0!==e.values.target_temp_low&&(i.target_temp_low=e.values.target_temp_low),void 0!==e.values.target_temp_high&&(i.target_temp_high=e.values.target_temp_high),this.hass.callService("climate","set_temperature",i).catch(e=>{console.error(`${kt}: set_temperature fallito`,e),this._pending.delete(t),this.requestUpdate()}),window.setTimeout(()=>{this._pending.get(t)===e&&void 0!==e.sentAt&&(this._pending.delete(t),this.requestUpdate())},St),this.requestUpdate()}_step(t,e){const i=this._model(t.conf);if(i.locked||!i.hasSetpoint)return;const s=this._keyFor(i),o="temperature"===s?i.target:"target_temp_low"===s?i.low:i.high;void 0!==o&&(this._setValue(i,s,o+e*i.step),this._schedule(i.id))}_valueAt(t,e,i){const s=t.getBoundingClientRect(),o=s.width>0?Math.min(1,Math.max(0,(e-s.left)/s.width)):0;return i.barMin+o*(i.barMax-i.barMin)}_onBarDown(t,e){if(e.locked||!e.hasSetpoint||t.button>0)return;t.preventDefault();const i=t.currentTarget,s=this._valueAt(i,t.clientX,e);let o="temperature";e.dual&&(o=Math.abs(s-e.low)<=Math.abs(s-e.high)?"target_temp_low":"target_temp_high",this._sel={...this._sel,[e.id]:o});const r=this._pending.get(e.id);r&&clearTimeout(r.timer),r&&(r.timer=void 0),i.setPointerCapture(t.pointerId),this._drag={entity:e.id,key:o},this._setValue(e,o,s),this.requestUpdate()}_onBarMove(t,e){this._drag?.entity===e.id&&(this._setValue(this._model(e.conf),this._drag.key,this._valueAt(t.currentTarget,t.clientX,e)),this.requestUpdate())}_onBarUp(t){this._drag?.entity===t.id&&(this._drag=void 0,this._schedule(t.id))}_onBarKey(t,e){const i="ArrowRight"===t.key||"ArrowUp"===t.key?1:"ArrowLeft"===t.key||"ArrowDown"===t.key?-1:0;i&&(t.preventDefault(),this._step(e,i))}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_toggleMenu(t){t.unavailable||t.modePending||(this._menu=this._menu===t.id?void 0:t.id)}_choose(t,e,i){this._menu=void 0;const s=t.stateObj;if("hvac_mode"===e&&s.state===i||"preset_mode"===e&&s.attributes.preset_mode===i)return;const o={kind:e,value:i,at:Date.now()};this._modePending.set(t.id,o);const r="hvac_mode"===e?"set_hvac_mode":"set_preset_mode";this.hass.callService("climate",r,{entity_id:t.id,[e]:i}).catch(e=>{console.error(`${kt}: ${r} fallito`,e),this._modePending.delete(t.id),this.requestUpdate()}),window.setTimeout(()=>{this._modePending.get(t.id)===o&&(this._modePending.delete(t.id),this.requestUpdate())},St),this.requestUpdate()}render(){if(!this._config||!this.hass)return W;const t=this._config,e=t.entities.map(t=>this._model(t));return V`
      <ha-card class=${vt({compact:!!t.compact})}>
        ${t.title?V`<div class="title">${t.title}</div>`:W}
        <div class="rows">${e.map((t,i)=>this._renderRow(t,i===e.length-1&&e.length>1))}</div>
      </ha-card>
    `}_renderRow(t,e){const i=!1!==this._config.show_mode_button,s="hvac_mode"===t.modePending?.kind?t.modePending.value:t.mode,o=t.unavailable?Ut:Mt[s]??Ut,r=void 0===t.current||t.unavailable?"—":this._fmt(t.current,1);return V`
      <div
        class=${vt({row:!0,unavailable:t.unavailable,"no-mode":!i})}
        style=${wt({"--row-color":t.color,"--mode-color":o})}
      >
        <button class="badge" @click=${()=>this._moreInfo(t.id)} aria-label=${t.name}>
          <ha-icon .icon=${t.icon}></ha-icon>
        </button>
        <div class="info" @click=${()=>this._moreInfo(t.id)}>
          <div class="name">${t.name}</div>
          <div class="status">
            <ha-icon .icon=${t.unavailable?"mdi:alert-circle-outline":t.action&&zt[t.action]||Tt[t.mode]||"mdi:thermostat"}></ha-icon>
            <span>${this._statusLabel(t)}</span>
          </div>
        </div>
        <div class="cur">${r}<sup>${this._unit}</sup></div>
        ${this._renderSetpoint(t)} ${i?this._renderModeButton(t,s,e):W}
        ${this._renderBar(t)}
      </div>
    `}_renderSetpoint(t){if(!t.hasSetpoint&&!t.unavailable)return V`<div class="sp"></div>`;const e=!1!==this._config.show_setpoint_buttons,i=t.step<1?1:0,s=this._drag?.entity===t.id,o=!!t.pending?.timer,r={tv:!0,dim:t.locked,pending:o||s},n=o?$t(t.pending.timer,V`<span class="deb"></span>`):W;let a;if(t.unavailable)a=V`<div class="tv dim">—</div>`;else if(t.dual){const e=this._keyFor(t),s=e=>{this._sel={...this._sel,[t.id]:e}};a=V`<div class=${vt({...r,dual:!0})}>
        <span class=${vt({hi:!0,on:"target_temp_high"===e})} @click=${()=>s("target_temp_high")}
          >${this._fmt(t.high,i)}°</span
        >
        <span class=${vt({lo:!0,on:"target_temp_low"===e})} @click=${()=>s("target_temp_low")}
          >${this._fmt(t.low,i)}°</span
        >
        ${n}
      </div>`}else a=V`<div class=${vt(r)}>${this._fmt(t.target,i)}°${n}</div>`;return e?V`<div class="sp">
      <button class="pm" ?disabled=${t.locked} @click=${()=>this._step(t,-1)} aria-label="−">−</button>
      ${a}
      <button class="pm" ?disabled=${t.locked} @click=${()=>this._step(t,1)} aria-label="+">+</button>
    </div>`:V`<div class="sp">${a}</div>`}_renderModeButton(t,e,i){const s=this._menu===t.id;return V`
      <button
        class=${vt({mode:!0,pending:!!t.modePending})}
        ?disabled=${t.unavailable}
        aria-haspopup="menu"
        aria-expanded=${s?"true":"false"}
        @click=${()=>this._toggleMenu(t)}
      >
        <ha-icon .icon=${Tt[e]??"mdi:thermostat"}></ha-icon>
      </button>
      ${s?this._renderMenu(t,i):W}
    `}_renderMenu(t,e){const i=t.stateObj,s=i.attributes.hvac_modes??[],o=16&(i.attributes.supported_features??0)?i.attributes.preset_modes??[]:[],r=(e,i,s,o,r,n)=>V`
      <button
        role="menuitemradio"
        aria-checked=${n?"true":"false"}
        class=${vt({on:n})}
        style=${wt({"--c":r})}
        @click=${()=>this._choose(t,e,i)}
      >
        <ha-icon .icon=${o}></ha-icon><span>${s}</span>
        ${n?V`<ha-icon class="chk" .icon=${"mdi:check"}></ha-icon>`:W}
      </button>
    `;return V`<div class=${vt({menu:!0,up:e})} role="menu">
      ${s.map(t=>r("hvac_mode",t,this._modeLabel(i,t),Tt[t]??"mdi:thermostat",Mt[t]??Ut,i.state===t))}
      ${o.length?V`<div class="sep"></div>
            ${o.map(t=>r("preset_mode",t,this._presetLabel(i,t),Rt[t]??"mdi:tune-variant","var(--primary-color)",i.attributes.preset_mode===t))}`:W}
    </div>`}_renderBar(t){const e=e=>`${(100*Math.min(1,Math.max(0,(e-t.barMin)/(t.barMax-t.barMin)))).toFixed(2)}%`,i=(t,i,s)=>{const o=Math.min(t,i),r=Math.max(t,i);return V`<div class=${s} style=${wt({left:e(o),width:`calc(${e(r)} - ${e(o)})`})}></div>`},s=this._drag?.entity===t.id?this._drag.key:void 0,o=t.step<1?1:0,r=(t,i,o)=>V`<div
        class=${vt({dot:!0,t:!0,active:s===t})}
        style=${wt({left:e(i),"--dot":o??null})}
      ></div>`,n=!!t.action&&Ot.has(t.action),a=[];if(!t.unavailable&&(t.dual?(a.push(i(t.low,t.high,"range")),n&&void 0!==t.current&&a.push(i("cooling"===t.action?t.high:t.low,t.current,"fill"))):n&&void 0!==t.current&&void 0!==t.target&&a.push(i(t.target,t.current,"fill")),void 0!==t.current&&a.push(V`<div class="dot c" style=${wt({left:e(t.current)})}></div>`),t.dual?a.push(r("target_temp_low",t.low,Mt.heat),r("target_temp_high",t.high,Mt.cool)):void 0!==t.target&&a.push(r("temperature",t.target)),s)){const i="target_temp_low"===s?t.low:"target_temp_high"===s?t.high:t.target;a.push(V`<div class="bubble" style=${wt({left:e(i)})}>${this._fmt(i,o)}°</div>`)}const c=!t.locked&&t.hasSetpoint,l="temperature"===this._keyFor(t)?t.target:"target_temp_low"===this._keyFor(t)?t.low:t.high;return V`<div class="scale">
      <span>${this._fmt(t.barMin,0)}°</span>
      <div
        class=${vt({bar:!0,locked:!c})}
        role="slider"
        tabindex=${c?0:-1}
        aria-label=${t.name}
        aria-valuemin=${t.min}
        aria-valuemax=${t.max}
        aria-valuenow=${l??W}
        aria-disabled=${c?"false":"true"}
        @pointerdown=${e=>this._onBarDown(e,t)}
        @pointermove=${e=>this._onBarMove(e,t)}
        @pointerup=${()=>this._onBarUp(t)}
        @pointercancel=${()=>this._onBarUp(t)}
        @keydown=${e=>this._onBarKey(e,t)}
      >
        <div class="track"></div>
        ${a}
      </div>
      <span>${this._fmt(t.barMax,0)}°</span>
    </div>`}};Vt.styles=a`
    :host {
      --ctc-disabled: var(--state-inactive-color, var(--disabled-color, #bdbdbd));
    }
    ha-card {
      height: 100%;
      overflow: visible;
      display: flex;
      flex-direction: column;
      container-type: inline-size;
    }
    .title {
      height: ${40}px;
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      padding: 0 16px 4px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .rows {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .row {
      position: relative;
      flex: 1 0 auto;
      box-sizing: border-box;
      min-height: ${92}px;
      display: grid;
      padding: 12px 12px 8px;
      grid-template-columns: 40px minmax(0, 1fr) auto auto 36px;
      grid-template-areas: 'icon info cur sp mode' 'scale scale scale scale scale';
      column-gap: 10px;
      row-gap: 4px;
      align-content: center;
      align-items: center;
      color: var(--primary-text-color);
    }
    .row.no-mode {
      grid-template-columns: 40px minmax(0, 1fr) auto auto;
      grid-template-areas: 'icon info cur sp' 'scale scale scale scale';
    }
    .row + .row {
      border-top: 1px solid var(--divider-color);
    }
    .compact .row {
      min-height: ${68}px;
      padding: 6px 12px 2px;
      row-gap: 0;
    }
    .compact .status {
      display: none;
    }
    button {
      font: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .badge {
      grid-area: icon;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 0;
      padding: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--row-color);
      background: color-mix(in srgb, var(--row-color) 18%, transparent);
      --mdc-icon-size: 22px;
    }
    .compact .badge {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 19px;
    }
    .info {
      grid-area: info;
      min-width: 0;
      cursor: pointer;
    }
    .name {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
      font-size: 12.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      --mdc-icon-size: 14px;
    }
    .status ha-icon {
      color: var(--row-color);
      display: flex;
      flex: none;
    }
    .status span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cur {
      grid-area: cur;
      font-size: 26px;
      line-height: 1;
      letter-spacing: -0.5px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .cur sup {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-left: 1px;
    }
    .compact .cur {
      font-size: 21px;
    }
    .sp {
      grid-area: sp;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .pm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      padding: 0;
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
      color: var(--primary-text-color);
      font-size: 18px;
      line-height: 1;
    }
    .pm:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .tv {
      position: relative;
      min-width: 48px;
      text-align: center;
      font-size: 17px;
      font-weight: 500;
      color: var(--row-color);
      font-variant-numeric: tabular-nums;
    }
    .tv.dim {
      color: var(--ctc-disabled);
    }
    .tv.pending {
      color: var(--primary-color);
    }
    .deb {
      position: absolute;
      left: 6px;
      bottom: -5px;
      height: 2px;
      border-radius: 2px;
      background: var(--primary-color);
      animation: deb ${1500}ms linear forwards;
    }
    @keyframes deb {
      from {
        width: 0;
      }
      to {
        width: calc(100% - 12px);
      }
    }
    .tv.dual {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 14px;
      line-height: 1.15;
    }
    .tv.dual span {
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      opacity: 0.55;
    }
    .tv.dual span.on {
      opacity: 1;
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    .tv.dual .lo {
      color: ${n(Mt.heat)};
    }
    .tv.dual .hi {
      color: ${n(Mt.cool)};
    }
    .tv.dual.pending span {
      color: var(--primary-color);
    }
    .tv.dual .deb {
      opacity: 1;
      padding: 0;
    }
    .mode {
      grid-area: mode;
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 0;
      padding: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--mode-color) 18%, transparent);
      color: var(--mode-color);
      --mdc-icon-size: 19px;
    }
    .mode ha-icon {
      display: flex;
    }
    .mode.pending {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .mode.pending::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--primary-color);
      border-right-color: var(--primary-color);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .menu {
      position: absolute;
      z-index: 5;
      right: 8px;
      top: calc(12px + 40px);
      min-width: 200px;
      padding: 6px;
      border-radius: 12px;
      background: var(--card-background-color, var(--ha-card-background, #fff));
      border: 1px solid var(--divider-color);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    .menu.up {
      top: auto;
      bottom: calc(100% - 8px);
    }
    .menu button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 9px 10px;
      border: 0;
      border-radius: 8px;
      background: none;
      color: var(--primary-text-color);
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      --mdc-icon-size: 20px;
    }
    .menu button:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .menu button.on {
      background: color-mix(in srgb, var(--c) 16%, transparent);
    }
    .menu button ha-icon {
      color: var(--c);
      display: flex;
    }
    .menu button .chk {
      margin-left: auto;
      color: var(--primary-text-color);
      --mdc-icon-size: 16px;
    }
    .menu .sep {
      height: 1px;
      margin: 4px 6px;
      background: var(--divider-color);
    }
    .scale {
      grid-area: scale;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .scale > span {
      flex: none;
      min-width: 22px;
    }
    .scale > span:last-child {
      text-align: right;
    }
    .bar {
      position: relative;
      flex: 1;
      height: 28px;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      outline: none;
    }
    .compact .bar {
      height: 24px;
    }
    .bar.locked {
      cursor: default;
    }
    .bar:focus-visible .dot.t {
      box-shadow:
        0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff)),
        0 0 0 5px var(--primary-color);
    }
    .track,
    .fill,
    .range {
      position: absolute;
      top: 50%;
      height: 6px;
      margin-top: -3px;
      border-radius: 3px;
    }
    .track {
      left: 0;
      right: 0;
      background: var(--row-color);
      opacity: 0.22;
    }
    .range {
      background: var(--secondary-text-color);
      opacity: 0.35;
    }
    .fill {
      background: var(--row-color);
    }
    .dot {
      position: absolute;
      top: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition:
        width 0.12s,
        height 0.12s;
    }
    .dot.t {
      width: 18px;
      height: 18px;
      background: var(--dot, var(--row-color));
      box-shadow: 0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff));
    }
    .dot.t.active {
      width: 24px;
      height: 24px;
      box-shadow:
        0 0 0 3px var(--card-background-color, var(--ha-card-background, #fff)),
        0 0 0 9px color-mix(in srgb, var(--dot, var(--row-color)) 25%, transparent);
    }
    .bar.locked .dot.t {
      background: var(--ctc-disabled);
    }
    .dot.c {
      width: 8px;
      height: 8px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px var(--card-background-color, var(--ha-card-background, #fff));
    }
    .bubble {
      position: absolute;
      bottom: calc(100% + 4px);
      transform: translateX(-50%);
      padding: 2px 7px;
      border-radius: 6px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      pointer-events: none;
      z-index: 2;
    }
    .unavailable {
      opacity: 0.5;
    }
    .unavailable .info,
    .unavailable .badge {
      cursor: default;
    }
    .unavailable button {
      cursor: not-allowed;
    }
    @container (max-width: 420px) {
      .row {
        column-gap: 6px;
        padding-left: 10px;
        padding-right: 8px;
        grid-template-columns: 34px minmax(0, 1fr) auto auto 32px;
      }
      .row.no-mode {
        grid-template-columns: 34px minmax(0, 1fr) auto auto;
      }
      .badge,
      .compact .badge {
        width: 34px;
        height: 34px;
        --mdc-icon-size: 19px;
      }
      .cur,
      .compact .cur {
        font-size: 20px;
      }
      .pm {
        width: 28px;
        height: 28px;
      }
      .tv {
        min-width: 42px;
        font-size: 15px;
      }
      .mode {
        width: 32px;
        height: 32px;
      }
    }
  `,t([ut({attribute:!1})],Vt.prototype,"hass",void 0),t([mt()],Vt.prototype,"_config",void 0),t([mt()],Vt.prototype,"_menu",void 0),t([mt()],Vt.prototype,"_drag",void 0),t([mt()],Vt.prototype,"_sel",void 0),Vt=t([dt(kt)],Vt),window.customCards=window.customCards??[],window.customCards.some(t=>t.type===kt)||window.customCards.push({type:kt,name:"Compact Thermostat Card",description:"Più termostati in righe compatte con barra del setpoint trascinabile.",preview:!0,documentationURL:"https://github.com/arozoire/compact-thermostat-card"}),console.info(`%c COMPACT-THERMOSTAT-CARD %c ${At} `,"color:#fff;background:#fe640b;font-weight:600","color:#fe640b;background:transparent");export{Vt as CompactThermostatCard};
