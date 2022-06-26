class Item {
  #id = new Date().getTime();
  #itemName = "";
  #price = 0;
  #stock = 0;

  constructor(id, itemName, price, stock) {
    this.#id = id || this.#id;
    this.#itemName = itemName;
    this.#price = price;
    this.#stock = stock;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#itemName;
  }

  setName(newName) {
    this.#itemName = newName;
    return this;
  }

  getPrice() {
    return this.#price;
  }

  setPrice(newPrice) {
    this.#price = newPrice;
    return this;
  }

  setStock(newStock) {
    this.#stock = newStock;
    return this;
  }

  getStock() {
    return this.#stock;
  }
}

class Vending {
  #priceList = [new Item()];
  constructor(priceList) {
    this.id = new Date().getTime();
    this.#priceList = priceList;
  }

  getPriceList() {
    return this.#priceList;
  }

  setPriceList(priceList) {
    if (!priceList) return false;
    this.#priceList = priceList;
    console.table(this.getPriceList());
    return this;
  }

  addPriceList(list = new Item()) {
    this.#priceList = [...this.#priceList, list];
    console.table(this.getPriceList());
    return this;
  }

  changeList(id, newList = new Item()) {
    if (!id) return "mohon masukan id item";
    const list = this.#priceList.map((ls) =>
      ls.getId() === id ? newList : ls
    );
    this.#priceList = list;
      console.table(this.getPriceList());
      return this;
  }

  deleteItem(id) {
    if (!id) return "mohon masukan id item";
    const list = this.#priceList.filter((ls) => ls.getId() !== id);
    this.#priceList = list;
      console.table(this.getPriceList());
      return this;
  }

  getItem(id) {
    if (!id) return "mohon masukan id item";
    return this.#priceList.find((ls) => ls.getId() === id);
  }

  addStock(id, amount = 0) {
    if (!id) return "mohon masukan id item";
    const item = this.getItem(id);
    item.setStock(item.getStock() + amount);
      console.table(this.getPriceList());
      return;
  }

  setStock(id, amount = this.getItem(id).getStock()) {
    if (!id) return "mohon masukan id item";
    const item = this.getItem(id);
    item.setStock(amount);
      console.table(this.getPriceList());
      return;
  }

  buyItem(id, moneyIn) {
    if (!id || !moneyIn) return "mohon masukan id item";
    if (!this.#moneyInValidation(moneyIn)) return false;
    const item = this.getItem(id);
    const stock = item.getStock();
    const price = item.getPrice();
    if (stock <= 0) return "stok tidak tersedia";
    if (price > moneyIn) return "maaf uang anda kurang"
    if (stock > 0 && price <= moneyIn) {
      const newStock = stock - 1;
      item.setStock(newStock);
      console.table(this.getPriceList());
      return `${moneyIn - price} money back`;
    }
  }

  #moneyInValidation(money) {
    let isValid = false;
    if (
      money % 2000 == 0 ||
      money % 5000 == 0 ||
      money % 10000 == 0 ||
      money % 20000 == 0 ||
      money % 50000 == 0
    ) {
      isValid = true;
    }

    return isValid;
  }
}

const items = [
  new Item(0, "Biskuit", 6000, 2),
  new Item(1, "Chips", 8000, 2),
  new Item(2, "Oreo", 10000, 2),
  new Item(3, "Tango", 12000, 2),
  new Item(4, "Cokelat", 15000, 2),
];
const vendingJs = new Vending(items);

console.log("vendingJs", vendingJs);
console.table(vendingJs.getPriceList());
