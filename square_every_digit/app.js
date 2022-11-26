// Function squares every digit in a provided integer and concatenates them. For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.

// Note: The function accepts an integer and returns an integer

function squareDigits(num){
    if (num == 0){
      return 0;
    }else {
    let array = [];
    //use modulus operator to get the first number in the provided integer, then squares the number.  once number is squared, new number is pushed to an array. repeats until the number is 0.
    while (num >= 1){
      let x = num % 10;
      let squared = x * x;
      num = Math.floor(num/10);
      array.unshift(squared); 
    }
    //converts array to a string of numbers 
    let toString = array.toString();
    //removes commas and whitespaces
    let toInt = toString.replace(/,/g, '');
    //converts string to int 
    return parseInt(toInt);
      }
  }