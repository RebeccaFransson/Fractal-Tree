//Branch = begin and end point
export default class Branch {
  constructor(start, end){
    this.begin = start
    this.end = end
    this.finished = false
  }

  jitter() {
      this.end.x += random(-1, 1);
      this.end.y += random(-1, 1);
  }
  show(){
    stroke(255)
    line(this.begin.x, this.begin.y, this.end.x, this.end.y)
  }
  split(){
    //SKapar ny vector vid samma beg och end,
    //roterar den och flyttar upp den till förra branch end
    let direction = p5.Vector.sub(this.end, this.begin)
    direction.rotate(PI / 5)
    direction.mult(0.7)
    let newEnd = p5.Vector.add(this.end, direction)
    const right = new Branch(this.end, newEnd)//right

    let direction2 = p5.Vector.sub(this.end, this.begin)
    direction2.rotate(-PI / 5)
    direction2.mult(0.7)
    let newEnd2 = p5.Vector.add(this.end, direction2)
    const left = new Branch(this.end, newEnd2)//right

    return { left: left, right: right }
  }

}
