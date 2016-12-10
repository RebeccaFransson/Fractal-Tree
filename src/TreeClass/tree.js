import Branch from './branch'

export default class Tree {

  constructor() {
    createCanvas(500, 600)//ÖVer hela sen
    this.tree = []
    this.leaves = []

    const start = createVector(width/2, height)
    const end = createVector(width/2, height-90)

    const root = new Branch(start, end)
    this.tree.push(root)
    this.countBranches = 0


  }

  addBranches () {
    const that = this
    return new Promise(
      function(resolve, reject) {
        const tree = that.tree
        for (var i = tree.length-1; i >= 0; i--) {
          if (!tree[i].finished) {
            const next = tree[i].split()
            tree.push(next.left)
            tree.push(next.right)
            tree[i].finished = true;
          }
        }
        that.countBranches++
        console.log(that.countBranches);
        if(that.countBranches > 2){
          for (var i = 0; i < that.tree.length; i++) {
            console.log('lägg till');
            if(!that.tree[i].finished){
              that.leaves.push(that.tree[i].end.copy())
            }
          }
        }
        that.draw()
      }
    )
  }

  draw () {
    background(200)
    this.tree.map((b) => {
      b.show()
      b.jitter()
    })
    this.leaves.map((l => {
      noStroke()
      fill('rgba(0,255,0, 0.25)')
      ellipse(l.x, l.y, 15, random(12, 18))
      l.y += 10
      //l.show()
    }))
  }

}
