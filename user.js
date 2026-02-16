import { db } from "./firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.searchBunks = async function () {
  let city = document.getElementById("searchCity").value.toLowerCase();
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "bunks"));

  querySnapshot.forEach((doc) => {
    const bunk = doc.data();

    if (bunk.city.toLowerCase() === city) {
      resultsDiv.innerHTML += `
        <div class="result-card">
          <h3>${bunk.bunkName}</h3>
          <p><b>Address:</b> ${bunk.address}</p>
          <p><b>Phone:</b> ${bunk.phone}</p>
          <p><b>Available Slots:</b> ${bunk.availableSlots}/${bunk.totalSlots}</p>
          <a href="bunk-details.html?id=${doc.id}">View Details</a>
        </div>
      `;
    }
  });

  if (resultsDiv.innerHTML === "") {
    resultsDiv.innerHTML = "<p>No EV Bunks Found in this City.</p>";
  }
};
