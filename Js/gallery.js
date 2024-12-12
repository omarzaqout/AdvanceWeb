document.getElementById("addImageBtn").addEventListener("click", function () {
    const gallery = document.getElementById("gallery");
    const newImage = document.createElement("div");
    newImage.classList.add("gallery-item");
    newImage.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="Village Image">
        <p class="description">Description of the village image.</p>
    `;
    gallery.appendChild(newImage);
});
