const alphabet = {
    0:'a',
    1:'b',
    2:'c',
    3:'d',
    4:'e',
    5:'f',
    6:'g',
    7:'h',
    8:'i',
    9:'j',
    10:'k',
    11:'l',
    12:'m',
    13:'n',
    14:'o',
    15:'p',
    16:'q',
    17:'r',
    18:'s',
    19:'t',
    20:'u',
    21:'v',
    22:'w',
    23:'x',
    24:'y',
    25:'z'
}

function isPangram(string){
    //convert string to lowercase array, remove whitespace
    let lowerString = string.toLowerCase();
    lowerString = lowerString.replace(/\s/g, "");
    let array = Array.from(lowerString);
    console.log(array);
    
    //iterate through array, evaluate to each value
    for (let i=0; i <= 25; i++){
        //if array includes the alphabet value
        if(array.includes(alphabet[i])){
            //if i reaches the end of the alphabet, return true. 
            if(i==25){
                return true;
            }
            //if it does not contain alphabet value, return false. 
        }else {
            return false;
        }
    }
}
let userInput = 'Hello there';
console.log(isPangram(userInput));


/*
Detects if a provided string is a pangram
make object associating alphabet to respective numbers
convert string to array
iterate through array,
  if it contains the letter, continue to the next letter (eval a-z)
else if it does not contain the letter, return false. 
*/