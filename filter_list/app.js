function filter_list(array) {
    let newArray = [];
    array.forEach((x) => {
        if (parseFloat(x)) {
            newArray.push(parseFloat(x));
        }
    })
    console.log(newArray);
  }

  var array = [1,2,'a','b'];
  filter_list(array);
/* 
iterate through array
check each index for integers
  IF index is int
    remove index and push to new array
return new array
*/
