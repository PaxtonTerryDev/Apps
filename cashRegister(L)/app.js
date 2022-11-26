function checkCashRegister(price, cash, cid) {
    //variables
    const value = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100,
    }
    let status;
    //functions
    //CONVERT CID TO OBJECT
    function arr2obj(arr) {
  
        // Create an empty object
        let obj = {};
    
        arr.forEach((v) => {
    
            // Extract the key and the value
            let key = v[0];
            let value = v[1];
    
            // Add the key and value to
            // the object
            obj[key] = value;
        });
    
        // Return the object
        return obj;
    }
    //FUNCTION TO DETERMINE CASH BACK
    function cashBack(x, y) {
        return (y - x).toFixed(2);
    }
    //WITHDRAW MONEY WHILE CHANGE REMAINS
    function changeBack(x) {
        let change = [];
        while (x > 0){
            if (x >= 100 && drawer['ONE HUNDRED'] > 0) {
                change.unshift("ONE HUNDRED")
                x = (x - 100).toFixed(2);
                drawer['ONE HUNDRED'] -= 100;
            }
            else if (x >= 20 && drawer['TWENTY'] > 0){
                change.unshift("TWENTY");
                x = (x - 20).toFixed(2);
                drawer['TWENTY'] -= 20;
            }
            else if (x >= 10 && drawer['TEN'] > 0){
                change.unshift("TEN");
                x = (x - 10).toFixed(2);
                drawer['TEN'] -= 10;
            }
            else if (x >= 5 && drawer['FIVE'] > 0){
                change.unshift("FIVE");
                x = (x - 5).toFixed(2);
                drawer['FIVE'] -= 5;
            }
            else if (x >= 1 && drawer['ONE'] > 0){
                change.unshift("ONE");
                x = (x - 1).toFixed(2);
                drawer['ONE'] -= 1;
            }
            else if (x >= 0.25 && drawer['QUARTER'] > 0){
                change.unshift("QUARTER");
                x = (x - 0.25).toFixed(2);
                drawer['QUARTER'] -= 0.25;
            }
            else if (x >= 0.10 && drawer['DIME'] > 0){
                change.unshift("DIME");
                x = (x - 0.10).toFixed(2);
                drawer['DIME'] -= 0.10;
            }
            else if (x >= 0.05 && drawer['NICKEL'] > 0){
                change.unshift("NICKEL");
                x = (x - 0.05).toFixed(2);
                drawer['NICKEL'] -= 0.05;
            }
            else if (x >= 0.01 && drawer['PENNY'] > 0){
                change.unshift("PENNY");
                x = (x - 0.01).toFixed(2);
                drawer['PENNY'] -= 0.01;
            }  else {
                return false;
            }
          }
          return change;
    }
    //COMPILE CHANGE RETURNED
    function changeDue(array){
        let obj = {};
        array.forEach(x => {
            if(obj.hasOwnProperty(x) == true){
                obj[x] += value[x];
            } else {
                obj[x] = value[x];
            }
        })
        return obj;
    }
    //CREATE RETURN OBJECT
    function returnObject(status, change){
        this.status = status;
        this.change = change;
    }
    //TOTAL DRAWER FUNDS
    function drawerFunds(arr) {
        let array = arr.slice();
        let total = 0.00;
        array.forEach(x => {
            total = (total + x[1]);
            return total;
        })
        return total.toFixed(2);
    }


    //operations
    let change = cashBack(price, cash);
    let drawer = arr2obj(cid);
    let drawerTotal = drawerFunds(cid);
    //CLOSED STATUS
    if (drawerTotal == change){
        status = "CLOSED";
        let obj = new returnObject(status, cid);
        console.log(obj);
        return obj;
    }
    change = changeBack(change);
    //INSUFFICIENT FUNDS STATUS
    if (change == false){
        status = "INSUFFICIENT_FUNDS";
        change = [];
        let obj = new returnObject(status, change);
        console.log(obj);
        return obj;
    }
    change = changeDue(change);
    change = Object.entries(change).reverse();
    //OPEN STATUS
    status = 'OPEN'
    let obj = new returnObject(status, change);
    console.log(obj);
    return obj;
 
  }
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])