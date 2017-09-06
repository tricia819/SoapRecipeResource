// Javascript for Tricia Gray's Soap Recipe Resource

(function() {
  var app = angular.module('soapApp', []);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5Yz4e3ec6FZzJIvhK9vU2l-cMg31yd38",
    authDomain: "soap-recipe-resource.firebaseapp.com",
    databaseURL: "https://soap-recipe-resource.firebaseio.com",
    projectId: "soap-recipe-resource",
    storageBucket: "",
    messagingSenderId: "113740003193"
  };
  firebase.initializeApp(config);
  console.log(firebase);
  var database = firebase.database();


//Initiating variables
  app.controller('recipeController', function($scope) {
    this.database = firebase.database();
    this.ref = database.ref('users');

    this.userData = {
      username: "Tricia",
      password: "abcd1234"
    }
    this.ref.push(this.userData);

    this.q1 = "naoh";
    this.q2 = "unitWeight";
    this.displayedWeightOfOils = 32;
    this.unitOfMeasure = "Ounces";
    this.q3 = "waterAsPercentOfOils";
    this.waterPercent = 38;
    this.lyeConcentrationPercent = 30;
    this.waterRatio = 3;
    this.lyeRatio = 1;
    this.waterDiscount = 0;
    this.superfatPercent = 5;
    this.q5 = "fragranceOilPercentage";
    this.fragrancePercent = 3;
    this.fragranceOuncesPerPound = .5;
    this.fragranceWeightInOuncesInOunces = 0;
    this.selectedOil = null;
    this.currentTotalOfOils = 0;
    this.lyeAmountInOunces = 0;
    this.weightOfOilsInOunces = 0;
    this.lyeWaterInOunces = 0;
    this.waterInOunces = 0;
    this.totalBatchWeight = 0;

//Selecting, displaying and removing oils from recipe
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

//Recipe Calculator
    this.calculateRecipe = function() {

        if (this.q2 == "unitPercentage"){
          //REMOVE THE "SHOULD BE 100 % ERROR"
        }

//Oil Calculations
        this.currentTotalOfOils = this.selectedOilsArray.reduce(function(sum, oil) {
          if (oil.oilAmount == undefined) {
            return sum;
          } else {
            return sum + oil.oilAmount;
          };
        }, 0);
        this.weightOfOilsInOunces = this.convertToOunces(this.currentTotalOfOils);
        var oilWeightAfterSuperfatRemoval = this.weightOfOilsInOunces * (1 - (this.superfatPercent / 100));

//Lye Calculations
        var recipe = this;
        var lyeAmount = this.selectedOilsArray.reduce(function(sum, oil) {
          if (oil.oilAmount == undefined) {
            return sum;
          }
          else {
            if (recipe.q1 == "naoh") {
              return sum + (oil.oilAmount * (1 - (recipe.superfatPercent / 100)) * oil.sapNaOH);
            }
            else {
              return sum + (oil.oilAmount* (1 - (recipe.superfatPercent / 100)) * oil.sapKOH);
            }
          }
        }, 0);
        this.lyeAmountInOunces = this.convertToOunces(lyeAmount);

//Water Calculations
        if (recipe.q3 == "waterAsPercentOfOils"){
          this.waterInOunces = this.weightOfOilsInOunces * (this.waterPercent  / 100);
        }

        else if (recipe.q3 == "lyeConcentration"){
          this.lyeWaterInOunces = this.lyeAmountInOunces / (this.lyeConcentrationPercent / 100);
          this.waterInOunces = this.lyeWaterInOunces - this.lyeAmountInOunces;
        }

        else {
          this.waterInOunces = (this.waterRatio / this.lyeRatio) * this.lyeAmountInOunces;
        }

//Fragrance Oil Calculations
        if (recipe.q5 == "fragranceOilPercentage"){
          this.fragranceWeightInOunces = this.fragrancePercent;
        }

        else {
          this.fragranceWeightInOunces = ((this.weightOfOilsInOunces / 16) * this.fragranceOuncesPerPound);
        }

//Total Batch Weight Calculations
      this.totalBatchWeight = this.weightOfOilsInOunces + this.lyeAmountInOunces + this.waterInOunces + this.fragranceWeightInOunces

    };


//Converting all weights to ounces
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

//Oil data (mini-database for testing purposes)
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
