﻿/*
 Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function h(a,b){var d=b.feed;this.caseSensitive=b.caseSensitive;this.marker=b.hasOwnProperty("marker")?b.marker:"@";this.minChars=null!==b.minChars&&void 0!==b.minChars?b.minChars:2;var c;if(!(c=b.pattern)){c=this.minChars;var g="\\"+this.marker+"[_a-zA-Z0-9À-ž]",g=(c?g+("{"+c+",}"):g+"*")+"$";c=new RegExp(g)}this.pattern=c;this.cache=void 0!==b.cache?b.cache:!0;this.throttle=void 0!==b.throttle?b.throttle:200;this._autocomplete=new CKEDITOR.plugins.autocomplete(a,{textTestCallback:k(this.marker,
this.minChars,this.pattern),dataCallback:m(d,this),itemTemplate:b.itemTemplate,outputTemplate:b.outputTemplate,throttle:this.throttle,itemsLimit:b.itemsLimit})}function k(a,b,d){function c(b,a){var c=b.slice(0,a).match(d);if(!c)return null;var e=b[c.index-1];return void 0===e||e.match(/\s+/)?{start:c.index,end:a}:null}return function(b){return b.collapsed?CKEDITOR.plugins.textMatch.match(b,c):null}}function m(a,b){return function(d,c){function g(){var c=h(a).filter(function(a){a=a.name;b.caseSensitive||
(a=a.toLowerCase(),f=f.toLowerCase());return 0===a.indexOf(f)});e(c)}function h(b){var a=1;return CKEDITOR.tools.array.reduce(b,function(b,c){b.push({name:c,id:a++});return b},[])}function k(){var c=(new CKEDITOR.template(a)).output({encodedQuery:encodeURIComponent(f)});if(b.cache&&l[c])return e(l[c]);CKEDITOR.ajax.load(c,function(a){a=JSON.parse(a);b.cache&&null!==a&&(l[c]=a);e(a)})}function e(a){a&&(a=CKEDITOR.tools.array.map(a,function(a){return CKEDITOR.tools.object.merge(a,{name:b.marker+a.name})}),
c(a))}var f=d.query;b.marker&&(f=f.substring(b.marker.length));CKEDITOR.tools.array.isArray(a)?g():"string"===typeof a?k():a({query:f,marker:b.marker},e)}}CKEDITOR._.mentions={cache:{}};var l=CKEDITOR._.mentions.cache;CKEDITOR.plugins.add("mentions",{requires:"autocomplete,textmatch,ajax",instances:[],init:function(a){var b=this;a.on("instanceReady",function(){CKEDITOR.tools.array.forEach(a.config.mentions||[],function(d){b.instances.push(new h(a,d))})})},isSupportedEnvironment:function(a){return a.plugins.autocomplete.isSupportedEnvironment(a)}});
h.prototype={destroy:function(){this._autocomplete.destroy()}};CKEDITOR.plugins.mentions=h})();