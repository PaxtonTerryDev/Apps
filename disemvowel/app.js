//function uses regex to remove all vowels from a provided string 

function disemvowel(str) {
    const reg = /[aeiou]/gi;
    let newStr = str.replace(reg, '');
    return newStr;
  }