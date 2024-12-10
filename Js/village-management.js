export function activateVillageManagementEvents() {
  const addVillageModal = document.getElementById("addVillageModal");
  const viewVillageModal = document.getElementById("viewVillage");
  const updateVillageModal=document.getElementById("UpdateVillage");
  const UpdateDemography=document.getElementById("UpdateDemography");
  const closeButtons = document.querySelectorAll(".close-button");

  $("#addVillageButton").click(function () {
    if (addVillageModal) {
      addVillageModal.style.display = "flex";
    }
  });
  $("#view-btn").click(function () {
    if (viewVillageModal) {
      viewVillageModal.style.display = "flex";
    }
  });
  $("#update-btn").click(function () {
    if (updateVillageModal) {
      updateVillageModal.style.display = "flex";
    }
  });
  $("#delete-btn").click(function () {
   
  });
  $("#UpdateDemography-btn").click(function () {
    if (UpdateDemography) {
      UpdateDemography.style.display = "flex";
    }
  });

  closeButtons.forEach((button) => {
    $(button).click(function () {
      if (addVillageModal) addVillageModal.style.display = "none";
      if (viewVillageModal) viewVillageModal.style.display = "none";
      if (updateVillageModal) updateVillageModal.style.display = "none";
      if (UpdateDemography) UpdateDemography.style.display = "none";
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target === addVillageModal) {
      addVillageModal.style.display = "none";
    }
    if (e.target === viewVillageModal) {
      viewVillageModal.style.display = "none";
    }
    if (e.target === updateVillageModal) {
      updateVillageModal.style.display = "none";
    }
    if (e.target === UpdateDemography) {
      UpdateDemography.style.display = "none";
    }

  });
}
