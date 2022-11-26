//Narcissistic Number - Function determines if a number is narcissistic (the sum of its digits squared by the power of each digit). Function returns true if number is narcissistic. 

function narcissistic(value) {
  //convert int to iterable array
    let array = Array.from(String(value), Number);
    let power = array.length;
    //loop through array and raise each value to the power(length of array).
    for (let i = 0; i <= array.length - 1; i++){
        let num = array[i];
        num = num**power;
        array[i] = num;
    }
    //sum the new array
    let total = 0;
    for (let i= 0; i <= array.length - 1; i++){
        total += array[i];
    }
    //compare total to original value
    if (total == value){
        return true;
    }else {
        return false;
    }
  }

console.log(narcissistic(371));

  /*Convert num to string
  create array from string 
  map array into integer
  foreach through array to raise each number to the power of the length of the array
  sum the array
  if sum = original number
    return true
  else 
    return false*/