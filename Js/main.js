$(document).ready(function () {
  $(document).ready(function () {
    const menuItems = document.querySelectorAll(".menu li");
    const contentArea = document.getElementById("content");
    const pageScripts = {
      "Overview.html": "../Js/overview.js",
      "village-management.html": "../Js/village-management.js",
      "Chat.html": "../Js/chat.js",
      "Gallery.html": "../Js/gallery.js",
    };

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", () => {
        const page = menuItem.getAttribute("data-page");
        if (page) {
          $.ajax({
            url: `../Page/${page}`,
            method: "GET",
            success: function (response) {
              $("#content").html(response).fadeIn();
              const scriptPath = pageScripts[page];

              if (scriptPath) {
                $.getScript(scriptPath, function () {
                  console.log(`${page} script loaded successfully.`);
                }).fail(function () {
                  console.error("Error loading script:", scriptPath);
                });
              }
            },
            error: function () {
              $("#content").html("<p>حدث خطأ أثناء تحميل الصفحة.</p>").fadeIn();
            },
          });
        }
      });
    });
  });

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const page = menuItem.getAttribute("data-page");
      if (page) {
        $.ajax({
          url: `../Page/${page}`,
          method: "GET",
          success: function (response) {
            $("#content").html(response).fadeIn();
            const scriptPath = pageScripts[page];

            if (scriptPath) {
              $.getScript(scriptPath, function () {
                console.log(`${page} script loaded successfully.`);
              }).fail(function () {
                console.error("Error loading script:", scriptPath);
              });
            }
          },
          error: function () {
            $("#content").html("<p>حدث خطأ أثناء تحميل الصفحة.</p>").fadeIn();
          },
        });
      }
    });
  });
});
