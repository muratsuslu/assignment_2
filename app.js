(function () {
  "use strict";
  angular
    .module("ShoppingListApp", [])
    .controller("ToBuyController", ToBuyController)
    .controller("BoughtController", BoughtController)
    .provider(
      "ShoppingListCheckOffService",
      ShoppingListCheckOffServiceProvider
    );
  //   .config(Config);

  // Config.$inject = ["ShoppingListCheckOffServiceProvider"];

  // function Config(ShoppingListCheckOffServiceProvider) {
  //   ShoppingListCheckOffServiceProvider.defaults = {
  //     emptyToBuyMessage: "Everything is bought!",
  //     emptyBoughtMessage: "Nothing bought yet.",
  //   };
  // }

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;
    this.toBuyList = ShoppingListCheckOffService.getToBuyItems();
    this.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    this.markAsBought = function (index) {
      this.boughtItems.push(this.toBuyList[index]);
      this.toBuyList.splice(index, 1);
      list.isEverythingBought = function () {
        return ShoppingListCheckOffService.isEverythingBought();
      };
      // console.log(list.items);
    };
  }
  BoughtController.$inject = ["ShoppingListCheckOffService"];
  function BoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
    bought.message = false;

    bought.isNothingBought = function () {
      return ShoppingListCheckOffService.isNothingBought();
    };
  }
  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: "Cookies", quantity: 10 },
      { name: "Chips", quantity: 7 },
      { name: "Orange", quantity: 2 },
      { name: "Apple", quantity: 6 },
      { name: "Ananas", quantity: 8 },
      { name: "Cookies", quantity: 3 },
    ];
    var boughtItems = [];

    service.getToBuyItems = function () {
      return itemsToBuy;
    };
    service.getBoughtItems = function () {
      return boughtItems;
    };
    service.isEverythingBought = function () {
      return itemsToBuy.length === 0;
    };

    service.isNothingBought = function () {
      return boughtItems.length === 0;
    };
  }

  function ShoppingListCheckOffServiceProvider() {
    var provider = this;

    provider.$get = function () {
      var shoppingList = new ShoppingListCheckOffService();
      return shoppingList;
    };
  }
})();
