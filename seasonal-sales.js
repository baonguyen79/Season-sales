var dlProduct = document.getElementById("product");
var select = document.getElementById("select");
var productData;
var categoryData;

var dtElem;
var ddId;
var ddPriceElem;
var ddCatElem;
var ddLabel;


function createProductDom (proData, catData, discId){
	var catDn;
  var discountPercent;
  var seasonDiscount;

 	for (var i = 0;i<proData.products.length; i++){
      discountPercent = 0;
      for (var c=0; c<catData.categories.length; c++){
         if(proData.products[i].category_id === catData.categories[c].id){
            catDn = catData.categories[c].name;
            if (catData.categories[c].id == discId){
               discountPercent = catData.categories[c].discount; 
               seasonDiscount = catData.categories[c].season_discount;
             }
            break;
         }
      }
 		dtElem = document.createElement('dt');
  	dtElem.innerHTML = `${proData.products[i].name}`;

    ddCatElem = document.createElement('dd');
    ddCatElem.innerHTML = `Caregory: ${catDn}`;
    dtElem.append(ddCatElem);

    ddPriceElem = document.createElement('dd');
    ddPriceElem.innerHTML = `Price: ${proData.products[i].price}`;
    dtElem.append(ddPriceElem);

    if (discountPercent > 0){
        discoutPrice = proData.products[i].price * (1 - parseFloat(discountPercent));
        ddPriceElem = document.createElement('dd');
        ddPriceElem.innerHTML = `${seasonDiscount} discount price: ${discoutPrice.toFixed(2)}`;
        ddPriceElem.style.color = "red";
        dtElem.append(ddPriceElem);

    }

  	dlProduct.append(dtElem);
 	}	
}	


function createSelectDom (catData){
  var selOption;

  for (var c=0; c<catData.categories.length; c++){
      selOption = document.createElement('option');
      selOption.text = `${catData.categories[c].season_discount} discount: ${catData.categories[c].discount}`;
      selOption.id = `${catData.categories[c].id}`;
      select.add(selOption);
    }

  select.addEventListener("change", doDiscount);
     
 	
};

function doDiscount (e){

  while (dlProduct.hasChildNodes()) {
        dlProduct.removeChild(dlProduct.firstChild);
    }
    var options = select.options;
    var id      = options[options.selectedIndex].id;
    createProductDom (productData, categoryData, id);
   }
//     e.preventDefault();
// //   var discoutPrice;
//   var options = select.options;
//   var id      = options[options.selectedIndex].className;
//   var disElem = divProduct.getElementsByClassName(id);
//   var discountPercent;
//   console.log(id);
//   for (var d = 0; d<categoryData.categories.length; d++)
//   { console.log(categoryData.categories[d].id);
//     if (categoryData.categories[d].id == id)
//       {console.log(categoryData.categories[d].discount);
//       discountPercent = categoryData.categories[d].discount;
//     break;}
//   } 

//   for (var i = 0;i<disElem.length; i++){
//     console.log(parseFloat(disElem[i].innerText) , ' ' , parseFloat(discountPercent));
//     discoutPrice = parseFloat(disElem[i].innerText) * (1 - parseFloat(discountPercent));
//     console.log(discoutPrice);
//     disElem[i].innerHTML = discoutPrice.toFixed(2);
// console.log('--' , discoutPrice);
//       // console.log(productData.products[id].price);
//   }
// }


//******************************************
// parse JSON data
//******************************************
function executeThisCodeAfterFileLoad(){
  var data = JSON.parse(this.responseText);
  

  if (Object.keys(data)[0] === "products"){
       productData = data;
   } else {
       categoryData = data;
   }

   if (productData != null && categoryData != null)
      {createProductDom (productData, categoryData, " ");
       createSelectDom (categoryData);
     }
   
}

//******************************************
// error if fail JSON data
//******************************************
function executeThisCodeAfterFileFails(){
  console.log("boooo");
}


//******************************************
// create requests
//******************************************
var myRequest2 = new XMLHttpRequest();  //make request
myRequest2.addEventListener("load", executeThisCodeAfterFileLoad); //Add eventListener
myRequest2.addEventListener("error", executeThisCodeAfterFileFails);
myRequest2.open("GET","categories.json")  
myRequest2.send();  //execute reques

var myRequest1 = new XMLHttpRequest();  //make request
myRequest1.addEventListener("load", executeThisCodeAfterFileLoad); //Add eventListener
myRequest1.addEventListener("error", executeThisCodeAfterFileFails);
myRequest1.open("GET","product.json")  
myRequest1.send();  //execute request

