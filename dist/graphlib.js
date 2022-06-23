this.graphlib=function(e){"use strict";var t="\0";class r{constructor(t={}){this._nodes={},this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={},this._nodeCount=0,this._edgeCount=0,this._isDirected=!e.has(t,"directed")||t.directed,this._isMultigraph=!!e.has(t,"multigraph")&&t.multigraph,this._isCompound=!!e.has(t,"compound")&&t.compound,this._isCompound&&(this._parent={},this._children={},this._children["\0"]={})}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(t){return e.isFunction(t)||(t=e.constant(t)),this._defaultNodeLabelFn=t,this}nodeCount(){return this._nodeCount}nodes(){return e.keys(this._nodes)}sources(){var t=this;return e.filter(this.nodes(),(function(r){return e.isEmpty(t._in[r])}))}sinks(){var t=this;return e.filter(this.nodes(),(function(r){return e.isEmpty(t._out[r])}))}setNodes(t,r){var i=arguments,s=this;return e.each(t,(function(e){i.length>1?s.setNode(e,r):s.setNode(e)})),this}setNode(r,i){return e.has(this._nodes,r)?(arguments.length>1&&(this._nodes[r]=i),this):(this._nodes[r]=arguments.length>1?i:this._defaultNodeLabelFn(r),this._isCompound&&(this._parent[r]=t,this._children[r]={},this._children["\0"][r]=!0),this._in[r]={},this._preds[r]={},this._out[r]={},this._sucs[r]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(t){return e.has(this._nodes,t)}removeNode(t){var r=this;if(e.has(this._nodes,t)){var i=function(e){r.removeEdge(r._edgeObjs[e])};delete this._nodes[t],this._isCompound&&(this._removeFromParentsChildList(t),delete this._parent[t],e.each(this.children(t),(function(e){r.setParent(e)})),delete this._children[t]),e.each(e.keys(this._in[t]),i),delete this._in[t],delete this._preds[t],e.each(e.keys(this._out[t]),i),delete this._out[t],delete this._sucs[t],--this._nodeCount}return this}setParent(r,i){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(e.isUndefined(i))i=t;else{for(var s=i+="";!e.isUndefined(s);s=this.parent(s))if(s===r)throw new Error("Setting "+i+" as parent of "+r+" would create a cycle");this.setNode(i)}return this.setNode(r),this._removeFromParentsChildList(r),this._parent[r]=i,this._children[i][r]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var r=this._parent[e];if(r!==t)return r}}children(r){if(e.isUndefined(r)&&(r=t),this._isCompound){var i=this._children[r];if(i)return e.keys(i)}else{if(r===t)return this.nodes();if(this.hasNode(r))return[]}return[]}predecessors(t){var r=this._preds[t];return r?e.keys(r):[]}successors(t){var r=this._sucs[t];return r?e.keys(r):[]}neighbors(t){var r=this.predecessors(t);if(r)return e.union(r,this.successors(t))}isLeaf(e){return 0===(this.isDirected()?this.successors(e):this.neighbors(e)).length}filterNodes(t){var i=new r({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});i.setGraph(this.graph());var s=this;e.each(this._nodes,(function(e,r){t(r)&&i.setNode(r,e)})),e.each(this._edgeObjs,(function(e){i.hasNode(e.v)&&i.hasNode(e.w)&&i.setEdge(e,s.edge(e))}));var n={};function o(e){var t=s.parent(e);return void 0===t||i.hasNode(t)?(n[e]=t,t):t in n?n[t]:o(t)}return this._isCompound&&e.each(i.nodes(),(function(e){i.setParent(e,o(e))})),i}setDefaultEdgeLabel(t){return e.isFunction(t)||(t=e.constant(t)),this._defaultEdgeLabelFn=t,this}edgeCount(){return this._edgeCount}edges(){return e.values(this._edgeObjs)}setPath(t,r){var i=this,s=arguments;return e.reduce(t,(function(e,t){return s.length>1?i.setEdge(e,t,r):i.setEdge(e,t),t})),this}setEdge(t,r,s,o){var h,a,d,u,c=!1,f=arguments[0];"object"==typeof f&&null!==f&&"v"in f?(h=f.v,a=f.w,d=f.name,2===arguments.length&&(u=arguments[1],c=!0)):(h=f,a=arguments[1],d=arguments[3],arguments.length>2&&(u=arguments[2],c=!0)),h=""+h,a=""+a,e.isUndefined(d)||(d=""+d);var _=n(this._isDirected,h,a,d);if(e.has(this._edgeLabels,_))return c&&(this._edgeLabels[_]=u),this;if(!e.isUndefined(d)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(h),this.setNode(a),this._edgeLabels[_]=c?u:this._defaultEdgeLabelFn(h,a,d);var l=function(e,t,r,i){var s=""+t,n=""+r;if(!e&&s>n){var o=s;s=n,n=o}var h={v:s,w:n};i&&(h.name=i);return h}(this._isDirected,h,a,d);return h=l.v,a=l.w,Object.freeze(l),this._edgeObjs[_]=l,i(this._preds[a],h),i(this._sucs[h],a),this._in[a][_]=l,this._out[h][_]=l,this._edgeCount++,this}edge(e,t,r){var i=1===arguments.length?o(this._isDirected,arguments[0]):n(this._isDirected,e,t,r);return this._edgeLabels[i]}hasEdge(t,r,i){var s=1===arguments.length?o(this._isDirected,arguments[0]):n(this._isDirected,t,r,i);return e.has(this._edgeLabels,s)}removeEdge(e,t,r){var i=1===arguments.length?o(this._isDirected,arguments[0]):n(this._isDirected,e,t,r),h=this._edgeObjs[i];if(h){const e=h.v,t=h.w;delete this._edgeLabels[i],delete this._edgeObjs[i],s(this._preds[t],e),s(this._sucs[e],t),delete this._in[t][i],delete this._out[e][i],this._edgeCount--}return this}inEdges(t,r){var i=this._in[t];if(i){var s=e.values(i);return r?e.filter(s,(function(e){return e.v===r})):s}}outEdges(t,r){var i=this._out[t];if(i){var s=e.values(i);return r?e.filter(s,(function(e){return e.w===r})):s}}nodeEdges(e,t){var r=this.inEdges(e,t);if(r)return r.concat(this.outEdges(e,t))}}function i(e,t){e[t]?e[t]++:e[t]=1}function s(e,t){--e[t]||delete e[t]}function n(t,r,i,s){var n=""+r,o=""+i;if(!t&&n>o){var h=n;n=o,o=h}return n+""+o+""+(e.isUndefined(s)?"\0":s)}function o(e,t){return n(e,t.v,t.w,t.name)}var h={Graph:r};class a{constructor(){this._arr=[],this._keyIndices={}}size(){return this._arr.length}keys(){return this._arr.map((function(e){return e.key}))}has(t){return e.has(this._keyIndices,t)}priority(e){var t=this._keyIndices[e];if(void 0!==t)return this._arr[t].priority}min(){if(0===this.size())throw new Error("Queue underflow");return this._arr[0].key}add(t,r){var i=this._keyIndices;if(t=String(t),!e.has(i,t)){var s=this._arr,n=s.length;return i[t]=n,s.push({key:t,priority:r}),this._decrease(n),!0}return!1}removeMin(){this._swap(0,this._arr.length-1);var e=this._arr.pop();return delete this._keyIndices[e.key],this._heapify(0),e.key}decrease(e,t){var r=this._keyIndices[e];if(t>this._arr[r].priority)throw new Error("New priority is greater than current priority. Key: "+e+" Old: "+this._arr[r].priority+" New: "+t);this._arr[r].priority=t,this._decrease(r)}_heapify(e){var t=this._arr,r=2*e,i=r+1,s=e;r<t.length&&(s=t[r].priority<t[s].priority?r:s,i<t.length&&(s=t[i].priority<t[s].priority?i:s),s!==e&&(this._swap(e,s),this._heapify(s)))}_decrease(e){for(var t,r=this._arr,i=r[e].priority;0!==e&&!(r[t=e>>1].priority<i);)this._swap(e,t),e=t}_swap(e,t){var r=this._arr,i=this._keyIndices,s=r[e],n=r[t];r[e]=n,r[t]=s,i[n.key]=e,i[s.key]=t}}var d=e.constant(1);function u(e,t,r,i){return function(e,t,r,i){var s,n,o={},h=new a,d=function(e){var t=e.v!==s?e.v:e.w,i=o[t],a=r(e),d=n.distance+a;if(a<0)throw new Error("dijkstra does not allow negative edge weights. Bad edge: "+e+" Weight: "+a);d<i.distance&&(i.distance=d,i.predecessor=s,h.decrease(t,d))};e.nodes().forEach((function(e){var r=e===t?0:Number.POSITIVE_INFINITY;o[e]={distance:r},h.add(e,r)}));for(;h.size()>0&&(s=h.removeMin(),(n=o[s]).distance!==Number.POSITIVE_INFINITY);)i(s).forEach(d);return o}(e,String(t),r||d,i||function(t){return e.outEdges(t)})}function c(t){var r=0,i=[],s={},n=[];function o(h){var a=s[h]={onStack:!0,lowlink:r,index:r++};if(i.push(h),t.successors(h).forEach((function(t){e.has(s,t)?s[t].onStack&&(a.lowlink=Math.min(a.lowlink,s[t].index)):(o(t),a.lowlink=Math.min(a.lowlink,s[t].lowlink))})),a.lowlink===a.index){var d,u=[];do{d=i.pop(),s[d].onStack=!1,u.push(d)}while(h!==d);n.push(u)}}return t.nodes().forEach((function(t){e.has(s,t)||o(t)})),n}var f=e.constant(1);function _(t){var r={},i={},s=[];if(e.each(t.sinks(),(function n(o){if(e.has(i,o))throw new l;e.has(r,o)||(i[o]=!0,r[o]=!0,e.each(t.predecessors(o),n),delete i[o],s.push(o))})),e.size(r)!==t.nodeCount())throw new l;return s}function l(){}function p(t,r,i){e.isArray(r)||(r=[r]);var s=(t.isDirected()?t.successors:t.neighbors).bind(t),n=[],o={};return e.each(r,(function(e){if(!t.hasNode(e))throw new Error("Graph does not have node: "+e);v(t,e,"post"===i,o,s,n)})),n}function v(t,r,i,s,n,o){e.has(s,r)||(s[r]=!0,i||o.push(r),e.each(n(r),(function(e){v(t,e,i,s,n,o)})),i&&o.push(r))}_.CycleException=l,l.prototype=new Error;var g={components:function(t){var r,i={},s=[];function n(s){e.has(i,s)||(i[s]=!0,r.push(s),e.each(t.successors(s),n),e.each(t.predecessors(s),n))}return e.each(t.nodes(),(function(e){r=[],n(e),r.length&&s.push(r)})),s},dijkstra:u,dijkstraAll:function(t,r,i){return e.transform(t.nodes(),(function(e,s){e[s]=u(t,s,r,i)}),{})},findCycles:function(t){return e.filter(c(t),(function(e){return e.length>1||1===e.length&&t.hasEdge(e[0],e[0])}))},isAcyclic:function(e){try{_(e)}catch(e){if(e instanceof _.CycleException)return!1;throw e}return!0},floydWarshall:function(e,t,r){return function(e,t,r){var i={},s=e.nodes();return s.forEach((function(e){i[e]={},i[e][e]={distance:0},s.forEach((function(t){e!==t&&(i[e][t]={distance:Number.POSITIVE_INFINITY})})),r(e).forEach((function(r){var s=r.v===e?r.w:r.v,n=t(r);i[e][s]={distance:n,predecessor:e}}))})),s.forEach((function(e){var t=i[e];s.forEach((function(r){var n=i[r];s.forEach((function(r){var i=n[e],s=t[r],o=n[r],h=i.distance+s.distance;h<o.distance&&(o.distance=h,o.predecessor=s.predecessor)}))}))})),i}(e,t||f,r||function(t){return e.outEdges(t)})},postorder:function(e,t){return p(e,t,"post")},preorder:function(e,t){return p(e,t,"pre")},prim:function(t,i){var s,n=new r,o={},h=new a;function d(e){var t=e.v===s?e.w:e.v,r=h.priority(t);if(void 0!==r){var n=i(e);n<r&&(o[t]=s,h.decrease(t,n))}}if(0===t.nodeCount())return n;e.each(t.nodes(),(function(e){h.add(e,Number.POSITIVE_INFINITY),n.setNode(e)})),h.decrease(t.nodes()[0],0);for(var u=!1;h.size()>0;){if(s=h.removeMin(),e.has(o,s))n.setEdge(s,o[s]);else{if(u)throw new Error("Input graph is not connected: "+t);u=!0}t.nodeEdges(s).forEach(d)}return n},tarjan:c,topsort:_};function w(t){return e.map(t.nodes(),(function(r){var i=t.node(r),s=t.parent(r),n={v:r};return e.isUndefined(i)||(n.value=i),e.isUndefined(s)||(n.parent=s),n}))}function m(t){return e.map(t.edges(),(function(r){var i=t.edge(r),s={v:r.v,w:r.w};return e.isUndefined(r.name)||(s.name=r.name),e.isUndefined(i)||(s.value=i),s}))}return{Graph:h.Graph,json:{read:function(t){var i=new r(t.options).setGraph(t.value);return e.each(t.nodes,(function(e){i.setNode(e.v,e.value),e.parent&&i.setParent(e.v,e.parent)})),e.each(t.edges,(function(e){i.setEdge({v:e.v,w:e.w,name:e.name},e.value)})),i},write:function(t){var r={options:{directed:t.isDirected(),multigraph:t.isMultigraph(),compound:t.isCompound()},nodes:w(t),edges:m(t)};return e.isUndefined(t.graph())||(r.value=e.clone(t.graph())),r}},alg:g,version:h.version}}(_);
