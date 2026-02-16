import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Register User
window.registerUser = async function () {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let phone = document.getElementById("phone").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      phone: phone,
      role: "user",
      createdAt: new Date(),
    });

    alert("Registration Successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};

// Login User
window.loginUser = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// Logout
window.logoutUser = async function () {
  await signOut(auth);
  alert("Logged out!");
  window.location.href = "index.html";
};
