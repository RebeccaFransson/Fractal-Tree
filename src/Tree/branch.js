function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false
  this.mul = random(0.55, 0.75)

  this.jitter = function() {
    this.end.x += random(-0.5, 0.5);
    this.end.y += random(-0.5, 0.5);
  }

  this.show = function() {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
  this.hide = function() {
    stroke(51);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }


  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 5);
    dir.mult(this.mul);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }
  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 5);
    dir.mult(this.mul);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }



}
