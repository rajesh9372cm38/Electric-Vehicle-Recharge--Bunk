import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Admin Login
window.adminLogin = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Admin Login Successful!");
    window.location.href = "admin-dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// Admin Logout
window.adminLogout = async function () {
  await signOut(auth);
  alert("Admin Logged out!");
  window.location.href = "../index.html";
};

// Add Bunk
window.addBunk = async function () {
  let bunkName = document.getElementById("bunkName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let pincode = document.getElementById("pincode").value;
  let phone = document.getElementById("phone").value;
  let mapLocation = document.getElementById("mapLocation").value;
  let totalSlots = document.getElementById("totalSlots").value;

  try {
    await addDoc(collection(db, "bunks"), {
      bunkName,
      address,
      city,
      pincode,
      phone,
      mapLocation,
      totalSlots: Number(totalSlots),
      availableSlots: Number(totalSlots),
      createdAt: new Date(),
    });

    alert("EV Bunk Added Successfully!");
  } catch (error) {
    alert(error.message);
  }
};
