export function activateVillageManagementEvents() {
  const addVillageModal = document.getElementById("addVillageModal");
  const updateVillageModal = document.getElementById("updateVillageModal");
  const viewVillageModal = document.getElementById("viewVillage");
  const closeButtons = document.querySelectorAll(".close-button");
  const villageListElement = document.getElementById("village-list");
  const uploadImageInput = document.getElementById("uploadImage");
  const UpdateDemography = document.getElementById("UpdateDemography");
  const searchInput = document.querySelector("input[placeholder='Search villages...']");
  const prev=document.getElementById("prev");
  const next=document.getElementById("next");

  let currentPage = 1;
  const itemsPerPage = 5;
  let allVillages = [];

  let filteredVillages = [];


  loadVillages();

   searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();
    filterVillages(searchText);
  });

  function filterVillages(searchText) {
    filteredVillages = allVillages.filter((village) =>
      village.querySelector("span").textContent.toLowerCase().includes(searchText)
    );
    currentPage = 1; 
    paginateVillages();
  }

  function paginateVillages() {
    const villagesToShow = filteredVillages.length > 0 ? filteredVillages : allVillages;
    const totalItems = villagesToShow.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    allVillages.forEach((village) => (village.style.display = "none"));
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    villagesToShow.slice(startIndex, endIndex).forEach((village) => {
      village.style.display = "";
    });
  
    renderPaginationButtons(totalPages);
  }
  

  function renderPaginationButtons(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; 
  
    if (currentPage > 1) {
      prev.style.display = "inline-block"; 
      prev.disabled = false; 
      prev.removeEventListener("click", handlePrevClick);
      prev.addEventListener("click", handlePrevClick);
    } else {
      prev.style.display = "inline-block"; 
      prev.disabled = true; 
    }
  
    if (currentPage < totalPages) {
      next.style.display = "inline-block"; 
      next.disabled = false; 
      next.removeEventListener("click", handleNextClick);
      next.addEventListener("click", handleNextClick);
    } else {
      next.style.display = "inline-block"; 
      next.disabled = true; 
    }
  }
  
  
  function handlePrevClick() {
    console.log("befored:", currentPage);
    currentPage--;
    console.log("afterd:", currentPage);
    paginateVillages();
  }
  
  function handleNextClick() {
    console.log("beforei:", currentPage);
    currentPage++;
    console.log("afteri:", currentPage);
    paginateVillages();
  }
 

  $("#addVillageButton").click(function () {
    if (addVillageModal) {
      addVillageModal.style.display = "flex";
    }
  });

  closeButtons.forEach((button) => {
    $(button).click(function () {
      closeAllModals();
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === addVillageModal) addVillageModal.style.display = "none";
    if (e.target === viewVillageModal) viewVillageModal.style.display = "none";
    if (e.target === updateVillageModal) updateVillageModal.style.display = "none";
    if (e.target === UpdateDemography) UpdateDemography.style.display = "none";
  });

  document.getElementById("addVillageForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const villageName = document.getElementById("villageName").value.trim();
    const regionDistrict = document.getElementById("regionDistrict").value.trim();
    const landArea = document.getElementById("landArea").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const categories = document.getElementById("categories").value.trim();
    const uploadImage = uploadImageInput.files[0];

    if (!villageName || !regionDistrict) {
      alert("Please fill in all required fields!");
      return;
    }

    const imagePath = uploadImage ? URL.createObjectURL(uploadImage) : null;

    const newVillage = {
      index: getNextIndex(), 
      name: villageName,
      region: regionDistrict,
      landArea: landArea,
      latitude: latitude,
      longitude: longitude,
      categories: categories,
      image: imagePath,
    };

    addVillageToDOM(newVillage);
    saveVillage(newVillage);
    closeAllModals();
    this.reset();
  });

  function addVillageToDOM(village) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${village.name} - ${village.region}</span>
      <div class="list-button">
        <button class="view">View</button>
        <button class="update">Update Village</button>
        <button class="delete">Delete Village</button>
        <button class="demographic">Update Demography</button>

      </div>
    `;
    listItem.querySelector(".view").addEventListener("click", () => {
      const storedData = localStorage.getItem('demographicData');
      openViewVillageModal(village);

    });

    listItem.querySelector(".update").addEventListener("click", () => {
      openUpdateVillageModal(village, listItem);
    });

    listItem.querySelector(".delete").addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${village.name}?`)) {
        villageListElement.removeChild(listItem);
        deleteVillage(village);
      }
    });
    listItem.querySelector(".demographic").addEventListener("click", () => {
      openUpdateDemographyModal(village, listItem);
    });

    villageListElement.appendChild(listItem);
  }

  function openViewVillageModal(village) {
    document.getElementById("villageNameLabel").textContent = village.name;
    document.getElementById("regionDistrictLabel").textContent = village.region;
    document.getElementById("landAreaLabel").textContent = village.landArea;
    document.getElementById("latitudeLabel").textContent = village.latitude;
    document.getElementById("longitudeLabel").textContent = village.longitude;
    document.getElementById("categoriesLabel").textContent = village.categories;
  
    const demographicsLabel = document.getElementById("demographicsLabel");
    if (demographicsLabel) {
      const storedDemographics = localStorage.getItem(`demographicData-${village.index}`);
      if (storedDemographics) {
        const demographics = JSON.parse(storedDemographics);
        demographicsLabel.textContent = `
          Population Size: ${demographics.populationSize}, 
          Age Distribution: ${demographics.ageDistribution}, 
          Gender Ratios: ${demographics.genderRatios}, 
          Growth Rate: ${demographics.growthRate}
        `;
      } else {
        demographicsLabel.textContent = "No demographic data available.";
      }
    }
  
    if (village.image) {
      document.getElementById("uploadImageLabel").src = village.image;
    }
  
    viewVillageModal.style.display = "flex";
  }
  
  
  

  function openUpdateVillageModal(village, listItem) {
    document.getElementById("updateVillageIndex").value = village.index; 
    document.getElementById("updateVillageName").value = village.name;
    document.getElementById("updateRegionDistrict").value = village.region;
    document.getElementById("updateLandArea").value = village.landArea;
    document.getElementById("updateLatitude").value = village.latitude;
    document.getElementById("updateLongitude").value = village.longitude;
    document.getElementById("updateCategories").value = village.categories;

    updateVillageModal.style.display = "flex";

   
    document.getElementById("updateVillageForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const updatedVillage = {
        index: village.index,
        name: document.getElementById("updateVillageName").value,
        region: document.getElementById("updateRegionDistrict").value,
        landArea: document.getElementById("updateLandArea").value,
        latitude: document.getElementById("updateLatitude").value,
        longitude: document.getElementById("updateLongitude").value,
        categories: document.getElementById("updateCategories").value,
        image: document.getElementById("updateUploadImage").files[0]
          ? URL.createObjectURL(document.getElementById("updateUploadImage").files[0])
          : village.image,
      };

      listItem.querySelector("span").textContent = `${updatedVillage.name} - ${updatedVillage.region}`;

      updateVillageInStorage(updatedVillage);

      closeAllModals();
    });
  }

  function updateVillageInStorage(updatedVillage) {
    let villages = JSON.parse(localStorage.getItem("villages")) || [];
    const index = updatedVillage.index;

    villages[index] = updatedVillage;
    localStorage.setItem("villages", JSON.stringify(villages));
  }

function openUpdateDemographyModal(village, listItem) {
  document.querySelector("#UpdateDemography h2").textContent = `Add Demographic Data for ${village.name}`;

  document.getElementById("Population-size").value = village.demographics ? village.demographics.populationSize : '';
  document.getElementById("Age-Distribution").value = village.demographics ? village.demographics.ageDistribution : '';
  document.getElementById("Gender-Ratios").value = village.demographics ? village.demographics.genderRatios : '';
  document.getElementById("Population-Growth-Rate").value = village.demographics ? village.demographics.growthRate : '';

  UpdateDemography.style.display = "flex";

  const updateDemographyForm = document.getElementById("updateDemographyForm");

  updateDemographyForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    const populationSize = document.getElementById("Population-size").value.trim();
    const ageDistribution = document.getElementById("Age-Distribution").value.trim();
    const genderRatios = document.getElementById("Gender-Ratios").value.trim();
    const growthRate = document.getElementById("Population-Growth-Rate").value.trim();

    if (!populationSize || !ageDistribution || !genderRatios || !growthRate) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedDemographics = {
      populationSize,
      ageDistribution,
      genderRatios,
      growthRate
    };

    console.log("Updated Demographic Data:", updatedDemographics);

    village.demographics = updatedDemographics;

    updateDemographicsInDOM(listItem, updatedDemographics, village);

    updateVillageInStorage(village);

    closeAllModals();
  });
}





function updateDemographicsInDOM(listItem, demographics, village) {
  const demographicData = `
   Population Size: ${demographics.populationSize}, 
   Age Distribution: ${demographics.ageDistribution}, 
   Gender Ratios: ${demographics.genderRatios}, 
   Growth Rate: ${demographics.growthRate}
 `;
 
  localStorage.setItem(`demographicData-${village.index}`, JSON.stringify(demographics));
}




  function saveVillage(village) {
    let villages = JSON.parse(localStorage.getItem("villages")) || [];
    villages.push(village);
    localStorage.setItem("villages", JSON.stringify(villages));
  }

  function deleteVillage(village) {
    let villages = JSON.parse(localStorage.getItem("villages")) || [];
    villages = villages.filter((v) => v.index !== village.index); 
    localStorage.setItem("villages", JSON.stringify(villages));
  }

  function loadVillages() {
    const villagesData = JSON.parse(localStorage.getItem("villages")) || [];
    villagesData.forEach(addVillageToDOM);
    allVillages = Array.from(villageListElement.children);
    filteredVillages = allVillages; 
    paginateVillages();
  }

  function getNextIndex() {
    let villages = JSON.parse(localStorage.getItem("villages")) || [];
    return villages.length;
  }
function sortVillagesAlphabetically() {
  const villageListElement = document.getElementById("village-list");
  const villages = Array.from(villageListElement.children); 

  villages.sort((a, b) => {
    const nameA = a.querySelector('span').textContent.toUpperCase(); 
        const nameB = b.querySelector('span').textContent.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  villages.forEach((village) => villageListElement.appendChild(village));
}

function sortVillagesDefault() {
  const villageListElement = document.getElementById("village-list");
  const villages = Array.from(villageListElement.children); 
  villages.forEach((village) => villageListElement.appendChild(village));
}

document.getElementById("sort").addEventListener("change", function() {
  const sortValue = this.value; 

  if (sortValue === "Alphabetical") {
    sortVillagesAlphabetically();
  } else if (sortValue === "default") {
    sortVillagesDefault();
  }
});
function closeAllModals() {
  addVillageModal.style.display = "none";
  updateVillageModal.style.display = "none";
  viewVillageModal.style.display = "none";
  UpdateDemography.style.display = "none";   
}

}
