document.querySelector(".form-card").addEventListener("submit", function (e) {
  e.preventDefault(); //to prevent default reloading

  //taking inputs (name,age,state) into variables
  const name = document.querySelector('input[name="name"]').value;
  const age = parseInt(document.querySelector('input[name="age"]').value);
  const location = document.querySelector('select[name="state"]').value;

  console.log("Submitting:", { name, age, location });

  //checking if either one of the inputs is not present
  if (!name || !age || !location) {
    alert("Please fill in name, age, and state.");
    return;
  }

  //to fetch schemes and display them
  fetch("http://localhost:5000/api/schemes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, location })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("scheme-results");
      container.innerHTML = ""; // clear previous

      if (data.schemes && data.schemes.length > 0) {
        data.schemes.forEach(renderSchemeCard);
      } else {
        container.innerHTML = "<p style='text-align:center;color:#555;'>No matching schemes found.</p>";
      }
    })
    .catch(() => {
      alert("Error fetching schemes. Please try again.");
    });
});

//making card for each scheme
function renderSchemeCard(scheme) {
  const container = document.getElementById("scheme-results");

  const card = document.createElement("div");
  card.className = "scheme-card";

  const img = document.createElement("img");
  img.src =  "assets/girl.png"; // Use your local image as fallback
  img.alt = scheme.name;

  const content = document.createElement("div");
  content.className = "scheme-card-content";
  content.innerHTML = `
    <h3>${scheme.name}</h3>
    <p>${scheme.description}</p>
    <a href="${scheme.applyUrl}" target="_blank" class="apply-btn">Apply Now</a>
  `;

  card.appendChild(img);
  card.appendChild(content);
  container.appendChild(card);
}


