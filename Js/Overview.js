export function activateOverviewEvents() {
$(document).ready(function () {

  const map = L.map('map').setView([31.528315, 34.481299], 7); // Center and zoom level

  // OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // markers on the map
  const locations = [
      { lat: 31.528205, lng: 34.483131, popup: "Jabalia" },
      { lat: 31.549669, lng: 34.502813, popup: "Beit Lahia" },
      { lat: 31.776209, lng: 35.235622, popup: "Quds" },
      { lat: 31.500430, lng: 34.478241, popup: "Shejaiya" },
      { lat: 31.529621, lng: 35.097351, popup: "Hebron" },
      { lat: 32.221120, lng: 35.260770, popup: "Nablus" },
      { lat: 31.904931, lng: 35.204428, popup: "Ramallah" },
      { lat: 31.716214, lng: 35.187664, popup: "Beit Jala" }
  ];

  locations.forEach(location => {
      L.marker([location.lat, location.lng]).addTo(map)
          .bindPopup(location.popup);
  });


  // Statistics data stored (JSON object).
  const statsData = [
    { label: "Total Number of Villages", value: 8 },
    { label: "Total Number of Urban Areas", value: 3 },
    { label: "Total Population Size", value: 660000 },
    { label: "Average Land Area", value: "11.88 sq km" }
  ];

  // Populate the stats dynamically
  const statsContainer = $(".stats");
  statsContainer.empty(); // Clear existing static content (if there is )

  statsData.forEach((stat, index) => {
    const isLast = index === statsData.length - 1; // Check if its the last card
    const card = `
      <div class="stats-card ${isLast ? 'stats-right-card' : ''}">
        <h4 class="stats-card-text">${stat.label}</h4>
        <h4 class="stats-card-text stats-card-number">${stat.value.toString().replace(' sq km', '')}</h4>
        ${isLast ? '<p class="stats-card-text stats-card-number sq-km">sq km</p>' : ''}
      </div>
    `;
    statsContainer.append(card);
  });

  // colomn chart data 
  const columnChartData = {
    labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
    data: [50000, 35000, 20000, 43000, 250000, 150000, 100000, 20000],
    barColors: ["#3c5b66", "#3c5b66", "#3c5b66", "#3c5b66", "#3c5b66", "#3c5b66", "#3c5b66", "#3c5b66"],
    borderColors: ["#49b1b2", "#49b1b2", "#49b1b2", "#49b1b2", "#49b1b2", "#49b1b2", "#49b1b2", "#49b1b2"]
  };

  // Left pchart data (Age Distribution)
  const ageDistributionData = {
    labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
    data: [55, 90, 44, 24, 15],
    colors: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"]
  };

  // right pchart data (Gender Ratios)
  const genderRatiosData = {
    labels: ["Male", "Female"],
    data: [55, 40],
    colors: ["#2f71a3", "#a74c65"]
  };


  new Chart("colomnChart", {
    type: "bar",
    data: {
      labels: columnChartData.labels,
      datasets: [{
        label: "Population",
        backgroundColor: columnChartData.barColors,
        borderColor: columnChartData.borderColors,
        borderWidth: 1,
        data: columnChartData.data,
      }]
    },
    options: {
      responsive: true,
      legend: { display: true },
      title: { display: false }
    }
  });

  const vaa = new Chart("pieChartLeft", {
    type: "pie",
    data: {
      labels: ageDistributionData.labels,
      datasets: [{
        backgroundColor: ageDistributionData.colors,
        data: ageDistributionData.data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true, 
      title: {
        display: true,
        text: "Age Distribution"
      }
    }
  });

  new Chart("pieChartRight", {
    type: "pie",
    data: {
      labels: genderRatiosData.labels,
      datasets: [{
        backgroundColor: genderRatiosData.colors,
        data: genderRatiosData.data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Gender Ratios"
      }
    }
  });

});
}
