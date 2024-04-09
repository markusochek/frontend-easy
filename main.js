document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылки на элементы кнопок
  const requestImagesButton = document.getElementById("requestImages");
  const addImageButton = document.getElementById("addImageInput");
  const gallery = document.getElementById("gallery");

  // Обработчик события для кнопки "Запросить все картинки"
  requestImagesButton.addEventListener("click", function () {
    // Выполняем GET-запрос к серверу
    fetch("http://localhost:3000/images")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok")
        return response.json();
      })
      .then((data) => {
        // Добавляем полученные изображения к галерее
        data.forEach((image) => {
          const galleryItem = document.createElement("div")
          galleryItem.classList.add("gallery-item")
          const img = document.createElement("img")
          img.src = "data:image/png;base64,"+image
          img.alt = "image"
          galleryItem.appendChild(img)

          // Добавляем элемент галереи к контейнеру
          gallery.appendChild(galleryItem);
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });

  // Обработчик события для кнопки "Добавить картинку"
  addImageButton.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      // Создаем объект FormData и добавляем в него файл
      const formData = new FormData();
      formData.append("file", file);

      // // Получаем токен OAuth из куки, localStorage или любого другого места
      // const token = "YOUR_OAUTH_TOKEN_HERE"; // Замените на ваш токен OAuth
      //
      // // Формируем URL запроса для загрузки файла на Диск
      // const uploadUrl =
      //   "https://cloud-api.yandex.net/v1/disk/resources/upload?path=/photos/" +
      //   file.name;

      // Выполняем POST-запрос на загрузку файла
      fetch("http://localhost:3000/images", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((image) => {
          // Обрабатываем успешный ответ от сервера
          console.log("File uploaded successfully:", image);

          // Добавляем изображение в галерею
          const galleryItem = document.createElement("div");
          galleryItem.classList.add("gallery-item");

          const img = document.createElement("img")
          img.src = "data:image/png;base64,"+image
          img.alt = "image"
          galleryItem.appendChild(img)

          // Добавляем элемент галереи к контейнеру
          gallery.appendChild(galleryItem);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  });
    
  //Открытие картинки в новой вкладке
  const expandButtons = document.querySelectorAll(".expand-button");

  expandButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
          const img = this.closest(".gallery-item").querySelector("img");
          if (img) {
              window.open(img.src, "_blank");
          }
      });
  });
});
