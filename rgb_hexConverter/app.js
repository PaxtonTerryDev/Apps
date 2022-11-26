//RGB - Hex Converter: takes 3 rgb inputs and converts them to their respective hexadecimal value

//hex table object
const hex = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
}

//converts rgb values to respective hex value based on the hex object
// built in handling for values < 0 and > 255;
function convert(x) {
    if (x <= 0) {
        return '00';
    } else if (x >= 255){
      return 'FF';
    } else {
        let whole = 0;
        let remain = 0;
        let col = x / 16;
            if (col < 1) {
                whole = 0;
                remain = Math.floor(col * 16);           
            }else {
        whole = Math.floor(col);
        remain = Math.floor(col % whole * 16);
            } 
        let val1 = hex[whole];
        let val2 = hex[remain];
        let endVal = `${val1}${val2}`;
    return endVal;
    }
}

//rgb calls the convert function for each value, then concats them into the final hex value.
function rgb(r, g, b){
    r = convert(r);
    g = convert(g);
    b = convert(b);
    let hex = r + g + b;
    return hex;
  }


  /*
  for each value: 

  divide each value by 16
  take whole number, convert to hex using switch statement
  take decimal, multiply by 16, convert to hex using switch statement

  concat string r+g+b

  */