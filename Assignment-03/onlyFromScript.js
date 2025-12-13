const mainStoreInventory = [
    { name: "Laptop", price: 1200, stock: 5 },
    { name: "Mouse", price: 25, stock: 0 },
    { name: "Keyboard", price: 100, stock: 12 }
];
const acquiredStoreInventory = [
    { name: "Monitor", price: 300, stock: 8 },
    { name: "Headphones", price: 50, stock: 0 },
    { name: "Webcam", price: 75, stock: 20 }
];

const unifiedInventory = [...mainStoreInventory, ...acquiredStoreInventory]
// console.log(unifiedInventory);  

const inStockItems = unifiedInventory.filter((element ) => {
    return element.stock !== 0
});
console.log("inStockItem",inStockItems);

const discountedInventory = inStockItems.map((items,index,array) => {
        const tenPercent = (items.price / 100) * 10;
        const discountedPrice = items.price - tenPercent ;
            const discountedItem = {
                ...items,
                price: discountedPrice
            };

  return discountedItem;
});
console.log('After Discount',discountedInventory);

const totalValue = discountedInventory.reduce((sum, item) => {
  console.log(item);  
    return sum + (item.price * item.stock);
}, 0);

console.log("Total Inventory Value: $", totalValue);
