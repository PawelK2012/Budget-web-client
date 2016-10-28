(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('budgetService', budgetService);

    function budgetService($rootScope, $firebase, $firebaseArray, $firebaseObject, $location) {
        var FIREBASE_URL = new Firebase('https://budget-db-app.firebaseio.com/');
        var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/budgets');
        var budgetsArray = $firebaseArray(ref);
        var budgetsObject = $firebaseObject(ref);
        var allBudgets = [];
        var totalExpenses = 0;
        var currentBalance = 0;
        var currentBudgetById = {};
        var currentBudgetByKey = [];

        var service = {
            setNewBudget: setNewBudget,
            updateBudgetTitle: updateBudgetTitle,
            addExpense: addExpense,
            getAllBudgets: getAllBudgets,
            getBudgetById: getBudgetById,
            getBudgetByKey: getBudgetByKey,
            deleteBudget: deleteBudget,
            deleteExpense: deleteExpense,
            calculateTotalExpenses: calculateTotalExpenses,
            calculateCurrentBalance: calculateCurrentBalance,
            addIncomeToCurrentBallance: addIncomeToCurrentBallance
        };

        return service;

        function setNewBudget(budgetTitle, startDate, endDate, startingBudget, expenses, monthlyExpenses, totalExpenses, totalMonthlyExpenses) {
            budgetsArray.$add({
                from: $rootScope.currentUser.firstname,
                title: budgetTitle,
                budgetStartDate: startDate.toDateString(),
                budgetEndDate: endDate.toDateString(),
                expenses: expenses,
                monthlyExpenses: monthlyExpenses,
                totalExpenses: totalExpenses,
                totalMonthlyExpenses: totalMonthlyExpenses,
                firstDayBalance: startingBudget,
                lastDayBalance: 0,
                currentBalance: startingBudget - totalExpenses - totalMonthlyExpenses,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                $location.path('/viewbudget/' + budgetsArray.$indexFor(id));
            });
        }

        function updateBudgetTitle(id, budgetTitle) {
            var udpdatedBudget = budgetsArray[id];
            udpdatedBudget.title = budgetTitle;
            budgetsArray.$save(udpdatedBudget).then(function(ref) {
                // Do something
            });
        }

        function addExpense(id, expenseName, expenseCategory, expenseCost, expenseType) {
            var udpdatedBudget = budgetsArray[id];
            var staBudget = udpdatedBudget.firstDayBalance;
            var totalMonExpe = udpdatedBudget.totalMonthlyExpenses;
            var totalExtraExpe = udpdatedBudget.totalExpenses;
            // We need to check what type of expense to be added
            if (expenseType === "monthly") {

                var expensesArray = udpdatedBudget.monthlyExpenses;
                // Check if monthlyExpenses[] exist in updadeBudget 
                if (!expensesArray) {
                    expensesArray = [];
                }
                var expense = {
                    name: expenseName,
                    category: expenseCategory,
                    cost: expenseCost
                };
                expensesArray.push(expense);
                var newTotalmonthlyExpenses = calculateTotalExpenses(expensesArray);
                var calcNewBallance = calculateCurrentBalance(staBudget, totalExtraExpe, newTotalmonthlyExpenses);
                // Edit values
                udpdatedBudget.totalMonthlyExpenses = newTotalmonthlyExpenses;
                udpdatedBudget.monthlyExpenses = expensesArray;
                udpdatedBudget.currentBalance = calcNewBallance;

            } else if (expenseType === "extra") {

                var expensesArray = udpdatedBudget.expenses;

                // Check if epxenses[] exist in updadeBudget 
                if (!expensesArray) {
                    expensesArray = [];
                }
                var expense = {
                    name: expenseName,
                    category: expenseCategory,
                    cost: expenseCost
                };
                expensesArray.push(expense);
                var newTotalExtraExpenses = calculateTotalExpenses(expensesArray);
                var newBallance = calculateCurrentBalance(staBudget, totalMonExpe, newTotalExtraExpenses);
                // Edit values
                udpdatedBudget.totalExpenses = newTotalExtraExpenses;
                udpdatedBudget.expenses = expensesArray;
                udpdatedBudget.currentBalance = newBallance;

            }

            budgetsArray.$save(udpdatedBudget).then(function(ref) {
                // Do something
            });
        }

        function addIncomeToCurrentBallance(incomeAmout, ballance, budgetId, incomeName){
            var budget = budgetsArray[budgetId];
            var extraIncomes = budget.extraIncomes;
            if (!extraIncomes) {
                extraIncomes = [];
            }
            var income = {
                name: incomeName,
                amount: incomeAmout
            }
            extraIncomes.push(income);
            budget.extraIncomes = extraIncomes;
            budget.currentBalance = incomeAmout + ballance;
            console.log(budget.currentBalance)
            budgetsArray.$save(budget).then(function(ref) {
                // Do something
            });
            //return newBallance;
        }

        function getAllBudgets() {
            // Download the data from a Firebase reference into a (pseudo read-only) array
            // all server changes are applied in realtime
            return allBudgets = $firebaseArray(ref);
        }

        function getBudgetById (id){
           // Returns firebaseObject of selected budget
           return currentBudgetById = budgetsObject[id];
        }

        function getBudgetByKey (id){
           // Returns an single item from $FirebaseArray
           return currentBudgetByKey = budgetsArray[id];
        }

        function deleteBudget(key) {
            budgetsArray.$remove(key);
        }

        function deleteExpense(key, expenseType, budgetId) {
            var budget = budgetsArray[budgetId];
            var currentBalance  = budget.currentBalance;

            // We need to check what type of expense to be deleted
            if (expenseType === "monthly") {

                var tmpExpenses = budgetsArray[budgetId].monthlyExpenses;
                var monthlyExpenseCost = budgetsArray[budgetId].monthlyExpenses[key].cost;
                tmpExpenses.splice(key, 1);
                var total = calculateTotalExpenses(tmpExpenses);
                budget.monthlyExpenses = tmpExpenses;
                budget.totalMonthlyExpenses = total;
                budget.currentBalance = currentBalance + monthlyExpenseCost;

            } else if (expenseType === "extra") {

                var tmpExpenses = budgetsArray[budgetId].expenses;
                var expenseCost = budgetsArray[budgetId].expenses[key].cost;
                tmpExpenses.splice(key, 1);
                var total = calculateTotalExpenses(tmpExpenses);
                budget.expenses = tmpExpenses;
                budget.totalExpenses = total;
                budget.currentBalance = currentBalance + expenseCost;

            }
            budgetsArray.$save(budget);
        }

        function calculateTotalExpenses(expensesArray) {
            totalExpenses = 0;
            for (var i = 0; i < expensesArray.length; i++) {
                var expense = expensesArray[i].cost;
                totalExpenses = totalExpenses + expense;
            }
            return totalExpenses;
        }

        function calculateCurrentBalance(staBudget, totalExtraExpen, totalMonExpe ){
            var expenses = totalExtraExpen + totalMonExpe;
            currentBalance = staBudget - expenses;
            return currentBalance;
        }
    }
})();
