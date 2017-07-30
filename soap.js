// Javascript for Tricia Gray's Soap Recipe Resource

(function() {
  var app = angular.module('soapApp', []);

  app.controller('recipeController', function($scope) {
    this.q1 = "naoh";
    this.q2 = "unitWeight";
    this.displayedWeightOfOils = 32;
    this.unitOfMeasure = "Ounces";
    this.q3 = "waterAsPercentOfOils";
    this.waterPercent = 38;
    this.lyePercent = 30;
    this.waterRatio = 3;
    this.lyeRatio = 1;
    this.waterDiscount = 0;
    this.superfatPercent = 5;
    this.q5 = "fragranceOilPercentage";
    this.fragrancePercent = 3;
    this.fragranceWeight = 30;
    this.selectedOil = null;
    this.currentTotalOfOils = 0;
    this.lyeAmountInOunces = 0;
    this.weightOfOilsInOunces = 0;


    this.selectedOilsArray = [];
    this.selectOil = function(clickedOil) {
      if (!this.selectedOilsArray.includes(clickedOil)) {
        //clickedOil.oilAmount = 0;
        this.selectedOilsArray.push(clickedOil);
      }
    };

    this.removeOil = function(removedOil) {
      var index = this.selectedOilsArray.indexOf(removedOil);
      this.selectedOilsArray.splice(index, 1);
    };

    this.showQualities = function(clickedOil) {
      this.selectedOil = clickedOil
    };

    this.calculateRecipe = function() {

      this.currentTotalOfOils = this.selectedOilsArray.reduce(function(sum, oil) {
        if (oil.oilAmount == undefined) {
          return sum;
        } else {
          return sum + oil.oilAmount;
        };
      }, 0);
      this.weightOfOilsInOunces = this.convertToOunces(this.currentTotalOfOils);

      var recipe = this;
      var lyeAmount = this.selectedOilsArray.reduce(function(sum, oil) {
        if (oil.oilAmount == undefined) {
          return sum;
        }
        else {
          if (recipe.q1 == "naoh") {
            return sum + (oil.oilAmount * oil.sapNaOH);
          }
          else {
            return sum + (oil.oilAmount * oil.sapKOH);
          }
        }
      }, 0);
      this.lyeAmountInOunces = this.convertToOunces(lyeAmount);
    };

    this.convertToOunces = function(from) {
      var to = 0;
      if (this.unitOfMeasure == "Grams") {
        to = from / 28.3495;
      }
      if (this.unitOfMeasure == "Ounces") {
        to = from;
      }
      if (this.unitOfMeasure == "Pounds") {
        to = from * 16;
      }
      if (this.unitOfMeasure == "Kilograms") {
        to = from * 35.274;
      }
      return to;
    };
  });

  app.controller('oilsController', function() {
    this.oilsArray = [{
        name: 'Coconut Oil',
        sapNaOH: 0.183,
        sapKOH: 0.257,
        hardness: 79,
        cleansing: 67,
        condition: 10,
        bubbly: 67,
        creamy: 12,
        iodine: 10,
        ins: 258,
      },
      {
        name: 'Olive Oil',
        sapNaOH: 0.135,
        sapKOH: 0.19,
        hardness: 17,
        cleansing: 0,
        condition: 82,
        bubbly: 0,
        creamy: 17,
        iodine: 85,
        ins: 105,
      },
      {
        name: 'Palm Oil',
        sapNaOH: 0.142,
        sapKOH: 0.199,
        hardness: 50,
        cleansing: 1,
        condition: 49,
        bubbly: 1,
        creamy: 49,
        iodine: 53,
        ins: 145,
      },
      {
        name: 'Shea Butter',
        sapNaOH: 0.128,
        sapKOH: 0.179,
        hardness: 45,
        cleansing: 0,
        condition: 54,
        bubbly: 0,
        creamy: 45,
        iodine: 59,
        ins: 116,
      }
    ];
    this.orderList = "name";
  });
})();
