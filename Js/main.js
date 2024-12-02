document.addEventListener("DOMContentLoaded", () => {
    const addVillageButton = document.querySelector(".add-btn");
  
    addVillageButton.addEventListener("click", () => {
      alert("Add new village functionality coming soon!");
    });
  });
  const menuItems = document.querySelectorAll('.menu li');
  const contentDiv = document.getElementById('content');  
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      menuItems.forEach((menuItem) => menuItem.classList.remove('active'));

      item.classList.add('active');
      const page = item.getAttribute('data-page');
    loadPage(page);
    });
  });
  function loadPage(page) {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load page');
        }
        return response.text();
      })
      .then(data => {
        contentDiv.innerHTML = data;
      })
      .catch(error => {
        contentDiv.innerHTML = `<p style="color: red;">Error loading content: ${error.message}</p>`;
      });
  }
  