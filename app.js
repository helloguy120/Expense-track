import { db, storage } from "./firebase.js";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ----- LOGIN -----
const PASSWORD = "yourpassword"; // change here
function login() {
    const input = document.getElementById("passwordInput").value;
    if(input === PASSWORD) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadProducts();
        loadExpenses();
        renderCharts();
    } else alert("Wrong password!");
}

// ----- PRODUCTS -----
async function loadProducts() {
    const prodCol = collection(db, "products");
    const snapshot = await getDocs(query(prodCol, orderBy("createdAt","desc")));
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    snapshot.forEach(docu => {
        const data = docu.data();
        const card = document.createElement("div");
        card.className = "productCard";
        card.innerHTML = `
            <strong>${data.name}</strong><br>ID: ${data.productId}<br>Category: ${data.category || 'General'}
            <button class="optionsBtn" onclick="editProduct('${docu.id}')">✎</button>
            <button class="optionsBtn" onclick="deleteProduct('${docu.id}')">🗑</button>
            <button onclick="openSaleModal('${docu.id}')">+ Sale</button>
        `;
        productList.appendChild(card);
    });
}

// Add/Edit/Delete products (functions similar to modals, saveProduct, closeProductModal...)

// ----- EXPENSES -----
async function loadExpenses() {
    const expCol = collection(db,"expenses");
    const snapshot = await getDocs(query(expCol,orderBy("date","desc")));
    // Build monthly folders & playlist UI here
}

// Add expenses modal functions (saveExpense, closeExpenseModal)

// ----- SALES -----
function openSaleModal(productDocId) {
    // Fill modal info, then show modal
}
async function saveSale() {
    // Record sale to Firestore with all calculations (fees, shipping, refunds)
}

// ----- PROFIT CALCULATION -----
async function calculateTotals() {
    // Total income = sum(sales revenue)
    // Total expenses = sum(expenses + fees)
    // Net Profit = income - expenses
    // Update DOM
}

// ----- CHARTS -----
function renderCharts() {
    // Category sales, best-selling product, high-return products
}

// ----- BACKUP / EXPORT -----
function backupData() {
    // Export all Firestore collections as JSON to Firebase Storage
}
function exportExcel() {
    // Convert all data to Excel using XLSX
}

// ----- SEARCH & FILTER -----
function searchProducts() {
    // Filter product list based on name/id input
}

// ----- MODAL OPEN/CLOSE -----
function openAddProductModal() { /* show modal */ }
function closeProductModal() { /* hide modal */ }
function openAddExpenseModal() { /* show modal */ }
function closeExpenseModal() { /* hide modal */ }
function closeSaleModal() { /* hide modal */ }
