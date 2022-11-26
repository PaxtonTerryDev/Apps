//function determines if an integer is a perfect square by utilizing the math.sqrt method.  
//if a number returns as a whole integer, it is a perfect square. 

var isSquare = function(n){
    if (Number.isInteger(Math.sqrt(n))){
      return true;
    } else {
      return false;
    }
  }