export function activateGalleryEvents() {
    console.log("test gallery");
  
// وظيفة لإضافة صورة جديدة إلى المعرض
function addImageHandler() {
  const gallery = document.getElementById("gallery");
  const newImage = document.createElement("div");
  newImage.classList.add("gallery-item");
  newImage.innerHTML = `
      <img src="https://via.placeholder.com/150" alt="Village Image">
      <p class="description">Description of the village image.</p>
    `;
  gallery.appendChild(newImage);
}

// التأكد من أن المستمع يضاف مرة واحدة فقط
// document.addEventListener("DOMContentLoaded", () => {

//   const addImageBtn = document.getElementById("addImageBtn");
//   addImageBtn.addEventListener("click", addImageHandler);
// });
$("#addImageBtn").click(function () {
    addImageHandler();
  });
}
