$(document).ready(function() {
  const menuItems = document.querySelectorAll(".menu li");
  const contentArea = document.getElementById("content");
  const pageScripts = {
    "Overview.html": "../Js/Overview.js",
    "village-management.html": "../Js/village-management.js",
    "Chat.html": "../Js/chat.js",
    "Gallery.html": "../Js/gallery.js",
  };

  function loadPage(page) {
    if (page) {
      $.ajax({
        url: `../Page/${page}`, 
        method: "GET",
        success: function(response) {
          $('#content').html(response).fadeIn();
          
          contentArea.setAttribute("data-page", page);

          const scriptPath = pageScripts[page];
          
          if (scriptPath) {
            $.getScript(scriptPath, function() {
              console.log(`${page} script loaded successfully.`);
            }).fail(function() {
              console.error("Error loading script:", scriptPath);
            });
          }
        },
        error: function() {
          $('#content').html('<p>حدث خطأ أثناء تحميل الصفحة.</p>').fadeIn();
        }
      });
    }
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const page = menuItem.getAttribute("data-page");
      if (page) {
        loadPage(page);
      }
    });
  });

  // if resize the browser window in Overview page refetch it so the charts will not bugged
  $(window).resize(function() {
    const currentPage = contentArea.getAttribute("data-page");
    if (currentPage === "Overview.html") {
      loadPage("Overview.html"); // Refetch Overview page
    }
  });

  
});
