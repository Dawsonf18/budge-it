const incomeTable = document.getElementById("incomeTable")
const expenseTable = document.getElementById("expenseTable")

// Income Type Value
let incomeTypeVal

// Total Values
let incomeTotalVal = 0
let expenseTotalVal = 0

// Income Total
for (let i = 1; i < incomeTable.rows.length; i++) {
    incomeTypeVal = incomeTable.rows[i].cells[2].innerHTML
    let currentIncomeVal = parseFloat(incomeTable.rows[i].cells[1].innerHTML);
    switch(incomeTypeVal) {
        case 'Yearly':
            currentIncomeVal = currentIncomeVal
            break;
        case 'Monthly':
            currentIncomeVal = currentIncomeVal * 12
            break;
        case 'Weekly':
            currentIncomeVal = currentIncomeVal * 52.1429
            break;
        case 'Single':
            currentIncomeVal = currentIncomeVal
            break;
    }
    incomeTotalVal = incomeTotalVal + currentIncomeVal
  }

// Expense Total
for (let i = 1; i < expenseTable.rows.length; i++) {
    expenseTypeVal = expenseTable.rows[i].cells[3].innerHTML;
    let currentExpenseVal = parseFloat(expenseTable.rows[i].cells[1].innerHTML);
    switch(expenseTypeVal) {
        case 'Yearly': 
            currentExpenseVal = currentExpenseVal;
            break;
        case 'Monthly':
            currentExpenseVal = currentExpenseVal * 12;
            break;
        case 'Weekly':
            currentExpenseVal = currentExpenseVal * 52.1429;
            break;
        case 'Single': 
            currentExpenseVal = currentExpenseVal;
            break;
    }
    expenseTotalVal = expenseTotalVal + currentExpenseVal;
};

// Variables for Total Displays
const incomeTotalDisplay = document.getElementById("incomeTotal")
const expenseTotalDisplay = document.getElementById("expenseTotal")
const budgetStatusDisplay = document.getElementById("budgetStatus")

// Total Display Text
incomeTotalDisplay.innerHTML = "Total Income = $" + incomeTotalVal.toFixed(2);
expenseTotalDisplay.innerHTML = "Total Expenses = $" + expenseTotalVal.toFixed(2);

// Color Code Budget
if (incomeTotalVal < expenseTotalVal) {
    incomeTotalDisplay.classList.add("text-danger")
    expenseTotalDisplay.classList.add("text-danger")
    budgetStatusDisplay.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>'
} else {
    incomeTotalDisplay.classList.add("text-success")
    expenseTotalDisplay.classList.add("text-success")
    budgetStatusDisplay.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>'
}