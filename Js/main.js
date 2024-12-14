$(document).ready(function () {
  const loadedScripts = {};
  let currentPage = null;

  const menuItems = document.querySelectorAll(".menu li");

  const pageScripts = {
    "Overview.html": "../Js/overview.js",
    "village-management.html": "../Js/village-management.js",
    "Chat.html": "../Js/chat.js",
    "Gallery.html": "../Js/gallery.js",
  };

  function addCssFile(page) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    const pageName = page.split('.')[0];
    link.href = `../StyleCss/${pageName}.css`; 
    link.type = 'text/css';
    document.head.appendChild(link);
  }

  function loadPage(page) {
    if (page && page !== currentPage) {
      currentPage = page;

      $('#content').off().empty();

      $.ajax({
        url: `../Page/${page}`,
        method: "GET",
        success: function (response) {
          $('#content').html(response).fadeIn();
          
          addCssFile(page);

          const scriptPath = pageScripts[page];
          if (scriptPath && !loadedScripts[scriptPath]) {
            const scriptTag = document.createElement('script');
            scriptTag.type = 'module';
            scriptTag.src = scriptPath;
            scriptTag.onload = () => {
              console.log(`${page} script loaded successfully.`);
              loadedScripts[scriptPath] = true;
              activatePageEvents(page);
            };
            scriptTag.onerror = () => {
              console.error("Error loading script:", scriptPath);
            };

            document.body.appendChild(scriptTag);
          } else {
            activatePageEvents(page);
          }
        },
        error: function () {
          $('#content').html('<p>حدث خطأ أثناء تحميل الصفحة.</p>').fadeIn();
        },
      });
    }
  }

  // استدعاء الصفحة الافتراضية عند التحميل
  const defaultPage = "Overview.html";
  loadPage(defaultPage);

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", function () {
      const page = menuItem.getAttribute("data-page");
      loadPage(page);
    });
  });
});

function activatePageEvents(page) {
  switch (page) {
    case "village-management.html":
      import("../Js/village-management.js")
        .then((module) => {
          module.activateVillageManagementEvents();
        })
        .catch((err) => console.error("Error loading village-management.js", err));
      break;

    case "Overview.html":
      import("../Js/overview.js")
        .then((module) => {
          module.activateOverviewEvents();
        })
        .catch((err) => console.error("Error loading overview.js", err));
      break;

    case "Chat.html":
      import("../Js/chat.js")
        .then((module) => {
          module.activateChatEvents();
        })
        .catch((err) => console.error("Error loading chat.js", err));
      break;

    case "Gallery.html":
      import("../Js/gallery.js")
        .then((module) => {
          module.activateGalleryEvents();
        })
        .catch((err) => console.error("Error loading gallery.js", err));
      break;

    default:
      break;
  }
}
