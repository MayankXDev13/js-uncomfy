// IIFE => (Immediately Invoked Function Expression)
const KiranaStore = (function () {
  let itemCount = 0;
  const godown = [];

  return {
    add(name) {
      itemCount++;
      godown.push(name);
      return `Sharma ji stocked item: ${name}`;
    },
    count() {
      return itemCount;
    },
    list() {
      return godown.slice();
    },
  };
})();

/*

console.log(KiranaStore.add("Tea 10 packs"));
console.log(KiranaStore.add('ginger 10kgs'));
console.log(`Count: ${KiranaStore.count()}`);
console.log(`List: ${KiranaStore.list()}`);

console.log('Direct godown ?:', typeof KiranaStore.godown);
console.log('Direct count ?:', typeof KiranaStore.itemCount);

*/

const AccountBook = (function () {
  const records = [];
  let accesslog = [];

  function logAccess(action) {
    accesslog.push(`[${new Date().toISOString().slice(0, 10)}] - ${action}`);
  }
  function store(doc) {
    logAccess(`Stored: ${doc}`);
    records.push(doc);
  }
  function retrieve(index) {
    logAccess(`Retrieved: ${index}`);
    return records[index] || "Not found";
  }

  function recordsCount() {
    logAccess(`Counted: ${records.length}`);
    return records.length;
  }

  function getAccessLog() {
    return accesslog.slice();
  }

  return {
    store,
    retrieve,
    count: recordsCount,
    log: getAccessLog,
  };
})();

AccountBook.store("Sugar 2kg");
AccountBook.store("Rice 5kg");

/*
console.log(`Sharma ji retrive: ${AccountBook.retrieve(0)}`);
console.log(`Count: ${AccountBook.count()}`);
console.log(`Log Length: ${AccountBook.log().length}`);
console.log(`Show me type of log Access: ${typeof AccountBook.logAccess}`);
*/

// research about namespace object

// Simulation
// Simulation of module

const SharmaMart = {};

SharmaMart.Inventory = (function () {
  function unitPrice(totalPrice, quantity) {
    return totalPrice / quantity;
  }

  function totalWeight(weightPerItem, quantity) {
    return weightPerItem * quantity;
  }
  //    export {unitPrice, totalWeight}
  return {
    unitPrice,
    totalWeight,
  };
})();

// dependency injection

SharmaMart.BillngCalculator = (function (Inv) {
  function bulkDiscount(pricePerKg, Kgs) {
    const totalWeight = Inv.totalWeight(pricePerKg, Kgs);
    return `${(totalWeight * 0.95).toFixed(1)} after 5% bulk discount`;
  }
  return { bulkDiscount };
})(SharmaMart.Inventory);

console.log(SharmaMart.BillngCalculator.bulkDiscount(60, 10));

console.log(`Store module: ${Object.keys(SharmaMart)}`);
console.log(`Inventory API: ${Object.keys(SharmaMart.Inventory)}`);
