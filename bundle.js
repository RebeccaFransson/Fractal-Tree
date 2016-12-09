/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tree = __webpack_require__(5);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	  var tree = new _tree2.default();
	  var count = 0;
	
	  var interval = setInterval(function () {
	    var promise = tree.addBranches();
	    promise.then(count++);
	    if (count > 5) {
	      clearInterval(interval);
	    }
	  }, 100);
	};

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//Branch = begin and end point
	var Branch = function () {
	  function Branch(start, end) {
	    _classCallCheck(this, Branch);
	
	    this.begin = start;
	    this.end = end;
	    this.finished = false;
	  }
	
	  _createClass(Branch, [{
	    key: "jitter",
	    value: function jitter() {
	      this.end.x += random(-1, 1);
	      this.end.y += random(-1, 1);
	    }
	  }, {
	    key: "show",
	    value: function show() {
	      stroke(255);
	      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	    }
	  }, {
	    key: "split",
	    value: function split() {
	      //SKapar ny vector vid samma beg och end,
	      //roterar den och flyttar upp den till förra branch end
	      var direction = p5.Vector.sub(this.end, this.begin);
	      direction.rotate(PI / 5);
	      direction.mult(0.7);
	      var newEnd = p5.Vector.add(this.end, direction);
	      var right = new Branch(this.end, newEnd); //right
	
	      var direction2 = p5.Vector.sub(this.end, this.begin);
	      direction2.rotate(-PI / 5);
	      direction2.mult(0.7);
	      var newEnd2 = p5.Vector.add(this.end, direction2);
	      var left = new Branch(this.end, newEnd2); //right
	
	      return { left: left, right: right };
	    }
	  }]);
	
	  return Branch;
	}();
	
	exports.default = Branch;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _branch = __webpack_require__(3);
	
	var _branch2 = _interopRequireDefault(_branch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tree = function () {
	  function Tree() {
	    _classCallCheck(this, Tree);
	
	    createCanvas(500, 600); //ÖVer hela sen
	    this.tree = [];
	    this.leaves = [];
	
	    var start = createVector(width / 2, height);
	    var end = createVector(width / 2, height - 90);
	
	    var root = new _branch2.default(start, end);
	    this.tree.push(root);
	    this.countBranches = 0;
	  }
	
	  _createClass(Tree, [{
	    key: 'addBranches',
	    value: function addBranches() {
	      var that = this;
	      return new Promise(function (resolve, reject) {
	        var tree = that.tree;
	        for (var i = tree.length - 1; i >= 0; i--) {
	          if (!tree[i].finished) {
	            var next = tree[i].split();
	            tree.push(next.left);
	            tree.push(next.right);
	            tree[i].finished = true;
	          }
	        }
	        that.countBranches++;
	        console.log(that.countBranches);
	        if (that.countBranches > 2) {
	          for (var i = 0; i < that.tree.length; i++) {
	            console.log('lägg till');
	            if (!that.tree[i].finished) {
	              that.leaves.push(that.tree[i].end.copy());
	            }
	          }
	        }
	        that.draw();
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      background(200);
	      this.tree.map(function (b) {
	        b.show();
	        b.jitter();
	      });
	      this.leaves.map(function (l) {
	        noStroke();
	        fill('rgba(0,255,0, 0.25)');
	        ellipse(l.x, l.y, 15, random(12, 18));
	        l.y += 10;
	        //l.show()
	      });
	    }
	  }]);
	
	  return Tree;
	}();
	
	exports.default = Tree;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map