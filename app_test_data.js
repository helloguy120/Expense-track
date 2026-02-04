import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

async function addTestData() {

    // ---- Products ----
    const products = [
        { id: "P001", name: "T-shirt Blue", category: "Clothes", supplier: "Supplier1", cost: 5 },
        { id: "P002", name: "Running Shoes", category: "Footwear", supplier: "Supplier2", cost: 20 },
        { id: "P003", name: "Wristband", category: "Accessories", supplier: "Supplier3", cost: 2 },
    ];

    for (let p of products) {
        await addDoc(collection(db, "products"), {
            productId: p.id,
            name: p.name,
            category: p.category,
            supplierLink: p.supplier,
            cost: p.cost,
            createdAt: serverTimestamp()
        });
    }

    // ---- Sales ----
    const sales = [
        { productId: "P001", category: "Clothes", revenue: 15, date: new Date() },
        { productId: "P002", category: "Footwear", revenue: 35, date: new Date() },
        { productId: "P003", category: "Accessories", revenue: 10, date: new Date() },
    ];

    for (let s of sales) {
        await addDoc(collection(db, "sales"), {
            productId: s.productId,
            category: s.category,
            revenue: s.revenue,
            createdAt: serverTimestamp()
        });
    }

    // ---- Expenses ----
    const expenses = [
        { name: "Facebook Ads", amount: 12, category: "Ads", createdAt: serverTimestamp() },
        { name: "Stripe Fees", amount: 5, category: "Platform Fees", createdAt: serverTimestamp() },
        { name: "Subscription X", amount: 8, category: "Subscription", createdAt: serverTimestamp() },
    ];

    for (let e of expenses) {
        await addDoc(collection(db, "expenses"), {
            name: e.name,
            amount: e.amount,
            category: e.category,
            createdAt: serverTimestamp()
        });
    }

    alert("Test data added! Reload dashboard to see charts & reports.");
}

// Run test data function
addTestData();
