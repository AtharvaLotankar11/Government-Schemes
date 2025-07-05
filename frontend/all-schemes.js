//making card for each scheme
function renderSchemes(schemes) {
  const container = document.getElementById("scheme-container");
  container.innerHTML = "";
  
  schemes.forEach(scheme => {
    const card = document.createElement("div");
    card.className = "scheme-card";

    card.innerHTML = `
      <img src="assets/girl.png" alt="Female Icon">
      <div class="scheme-info">
        <h3>${scheme.name}</h3>
        <p>${scheme.description}</p>
        <a href="${scheme.applyUrl}" target="_blank" class="apply-btn">Apply Now</a>
      </div>
    `;

    container.appendChild(card);
  });
}

fetch("http://localhost:5000/api/schemes/all")
  .then(res => res.json())
  .then(renderSchemes)
  .catch(err => console.error("Failed to load schemes", err));