//function counts the number of vowels in a provided string. 

function getCount(str) {
    str = str.replace(/\s+/g, '');
    //convert string to array
    let newStr = Array.from(str);
    let count = 0;
    //iterate through array.  if value is equal to vowel, increase count by one.
    for (let x = 0; x < newStr.length; x++){
      if (newStr[x] == 'a' ||newStr[x] == 'e' ||newStr[x] == 'i' ||newStr[x] == 'o' ||newStr[x] == 'u'){
        count++;
      } else {
        count += 0;
      }
      }
    return count;
    }