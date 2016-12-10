import Tree from './tree'

window.onload = function() {
  const tree = new Tree()
  let count = 0

  const interval = setInterval(function(){
    const promise = tree.addBranches()
    promise.then(count++)
    if(count > 5){
      clearInterval(interval)
    }
  }, 100);



};
