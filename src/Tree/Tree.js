
  var tree = []
  var leaves = []
  var leavesAlive
  const maxLayers = 5
  var fullBuild = false
  var fullBreakDown = false

  var count = 0

  function setup() {
    leavesAlive = false
    createCanvas(displayWidth-200, displayHeight-200)

    var a = createVector(width/2, height)
    var b = createVector(width/2, height-200)
    var root = new Branch(a, b)

    tree.push(root)
    buildUp()
  }


  function draw() {

    background(51)
    for (var i = 0;  i < tree.length;  i++) {
      tree[i].show()
      tree[i].jitter()
    }

    if(!fullBuild){
      buildUpLeaves()
    }else{
      breakDown()
    }

  }
function buildUp(){
  const interval = setInterval(function(){
    count++
    for (var i = tree.length - 1;  i >= 0;  i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA())
        tree.push(tree[i].branchB())
      }
      tree[i].finished = true
    }

    if (count === maxLayers) {
      for (var i = 0;  i < tree.length;  i++) {
        if (!tree[i].finished) {
          var leaf = tree[i].end.copy()
          leaves.push(leaf)
        }
      }
    }
    if(count >= maxLayers){
      clearInterval(interval)
    }
  }, 200)
}

function buildUpLeaves(){
    for (var i = 0;  i < leaves.length;  i++) {
      fill('rgba(127, 191, 63, 0.8)')
      noStroke()
      ellipse(leaves[i].x, leaves[i].y, 20, random(18, 22))
    }

  setTimeout(function(){
    for (var i = 0; i < leaves.length; i++) {
      var ran = random(5,8)
      var ran2 = random(3,7)
      if (leaves[i].y < displayHeight) {
        leaves[i].y += (i % 2 == 0) ? ran : ran2
      }
      setTimeout(function(){
        leaves = []
        fullBuild = true
      },3000)
    }
  }, 1000)


}
var p = false
function breakDown(){
    var time = 200
    var promises = [];
    if(!p){
      console.log('break');
      p = true
      for (var i = tree.length-1;  i >= 0;  i--) {
      //for (var i = 0; i < tree.length; i++) {
        console.log(i);
        doSetTimeout(i)
      }

    }
    fullBuild = null
}
function doSetTimeout(i) {
  setTimeout(function() {
    console.log(tree.length-i);
    tree.splice(tree.length-i, 5)
  }, i*100);
}
