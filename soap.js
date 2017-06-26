// Javascript for Tricia Gray's Soap Recipe Resource

(function(){
  var app = angular.module('soapApp', []);

  app.controller('recipeController', function($scope){
    this.q1 = "naoh";
    this.q2 = "unitPercentage";
    this.totalWeightOfOils = 32;
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

    this.selectedOilsArray = [];
    this.selectOil = function(clickedOil) {
      if (!this.selectedOilsArray.includes(clickedOil)){
      this.selectedOilsArray.push(clickedOil);
      }
    };

    this.showQualities = function(clickedOil) {
      this.selectedOil = clickedOil
    };

     this.currentTotalOfOils = 0;
     this.getSum = function (){
       this.currentTotalOfOils = this.selectedOilsArray.reduce(
        ( accumulator, current ) => accumulator + current.oilAmount,
        0);
      };
  });

  app.controller('oilsController', function(){
    this.oilsArray = [
      {
      name: 'Coconut Oil',
      sapNaOH: 0.191,
      sapKOH: 0.269,
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
      sapNaOH: 0.1353,
      sapKOH: 0.1906,
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
      sapNaOH: 0.176,
      sapKOH: 0.247,
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
      sapNaOH: 0.1296,
      sapKOH: 0.1825,
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
