//Function takes an array of ints, floats and strings, and parses out the ints into a new array.  returns the new array. 

function filter_list(array) {
    let newArray = [];
    array.forEach((x) => {
        if (Number.isInteger(x)) {
            newArray.push(x);
        }
    })
    return newArray;
  }