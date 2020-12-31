//This function just loads the navbar onto the page
$(function(){
    $("#navBar").load("../navBar.html");
});

var newItem = null
var scanItem = null
function popNewItemModal(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    scanItem = null
    if(newItem === null){
        document.getElementById("newItem").style.display = "block";
        var barcode = document.getElementById("barcode").value;
        console.log(barcode);
        var quantity = document.getElementById("quantity").value;
        console.log(quantity);
        // request.open("POST", "http://localhost:8080/newBarcode", true);
        // request.send(inputVal);
        // request.onload = () => {
        //     console.log(request);
        //     if (request.status === 200){
        //         console.log("SUCCESS!")
        //     }
        // }
        newItem = true
    } else {
        document.getElementById("newItem").style.display = "none";
        newItem = null
    }
}


function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        // var inputVal = document.getElementById("comment").value;
        // console.log(inputVal);
        // request.open("POST", "http://localhost:8080/newBarcode", true);
        // request.send(inputVal);
        // request.onload = () => {
        //     console.log(request);
        //     if (request.status === 200){
        //         console.log("SUCCESS!")
        //     }
        // }
        scanItem = true
    } else {
        document.getElementById("scanItem").style.display = "none";
        scanItem = null
    }

}


$(function () {
    $('#pantrytable').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": false,
      "autoWidth": true
      });
});

function exportCSV(elem){
    var table = document.getElementById("pantrytable");
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    elem.setAttribute("href", url);
    elem.setAttribute("download", "pantrystock.xls"); // Choose the file name
    return false;
}


function loadPantryItems(items){
    const table = document.getElementById("pantryStock");
    items.forEach(item => {
        let row = table.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = item.name;
        let quantity = row.insertCell(1);
        quantity.innerHTML = item.quantity;
        let type =  row.insertCell(2);
        type.innerHTML = item.type;
        let brand = row.insertCell(3);
        brand.innerHTML = item.brand;
        let vegOrVeg =  row.insertCell(4);
        vegOrVeg.innerHTML = item.vegOrVeg;
        let bestBuy =  row.insertCell(5);
        bestBuy.innerHTML = item.bestBuy;
        let expiration = row.insertCell(6);
        expiration.innerHTML = item.expiration;
    });
}
const items = [
    {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegOrVeg: "Vegetarian", bestBuy:"11/09/2020", expiration:"11/09/2020"},
    {name: "Tomatos", quantity: 20, type:"Vegtable", brand: "Walmart", vegOrVeg: "Vegan", bestBuy:"11/10/2020", expiration:"11/10/2020"}
];
loadPantryItems(items);