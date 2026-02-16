import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const bunkId = urlParams.get("id");

// Load Bunk Details
async function loadBunkDetails() {
  if (!bunkId) return;

  const bunkRef = doc(db, "bunks", bunkId);
  const bunkSnap = await getDoc(bunkRef);

  if (bunkSnap.exists()) {
    const bunk = bunkSnap.data();

    document.getElementById("bunkInfo").innerHTML = `
      <h3>${bunk.bunkName}</h3>
      <p><b>Address:</b> ${bunk.address}</p>
      <p><b>City:</b> ${bunk.city}</p>
      <p><b>Phone:</b> ${bunk.phone}</p>
      <p><b>Slots:</b> ${bunk.availableSlots}/${bunk.totalSlots}</p>
      <a href="${bunk.mapLocation}" target="_blank">📍 View Location</a>
    `;
  }
}

// Load Slots
async function loadSlots() {
  const slotList = document.getElementById("slotList");
  if (!slotList) return;

  slotList.innerHTML = "";

  const slotsSnapshot = await getDocs(collection(db, "bunks", bunkId, "slots"));

  slotsSnapshot.forEach((slotDoc) => {
    const slot = slotDoc.data();

    slotList.innerHTML += `
      <div class="result-card">
        <p><b>Slot Time:</b> ${slot.slotTime}</p>
        <p><b>Status:</b> ${slot.status}</p>
        <p><b>Price:</b> ₹${slot.price}</p>
        ${
          slot.status === "Available"
            ? `<a href="booking.html?id=${bunkId}&slot=${slotDoc.id}">Book Now</a>`
            : `<p style="color:red;">Booked</p>`
        }
      </div>
    `;
  });
}

loadBunkDetails();
loadSlots();
