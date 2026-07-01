// Expense Tracker

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Update UI
function updateUI() {

    const history = document.getElementById("history");
    const balance = document.getElementById("balance");
    const income = document.getElementById("income");
    const expense = document.getElementById("expense");

    history.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {

        if (transaction.type === "Income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        history.innerHTML += `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.desc}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type}</td>
            <td>₹${transaction.amount}</td>
            <td>
                <button onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    income.innerText = "₹" + totalIncome;
    expense.innerText = "₹" + totalExpense;
    balance.innerText = "₹" + (totalIncome - totalExpense);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add Transaction
function addTransaction() {

    const date = document.getElementById("date").value;
    const desc = document.getElementById("desc").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    if (date === "" || desc === "" || amount <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    transactions.push({
        date,
        desc,
        amount,
        category,
        type
    });

    document.getElementById("date").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}
// Delete Transaction
function deleteTransaction(index) {

    if (confirm("Are you sure you want to delete this transaction?")) {
        transactions.splice(index, 1);
        updateUI();
    }

}

// Search Transaction
function searchTransaction() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#history tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(search)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

// Reset Form
function resetForm() {

    document.getElementById("date").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("type").selectedIndex = 0;

}

// Dark Mode
function toggleDarkMode() {

    document.body.classList.toggle("dark");

}

// Print Report
function printResult() {

    window.print();

}

// Initialize App
updateUI();
