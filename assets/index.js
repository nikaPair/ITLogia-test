document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popupClose");
  const nameInput = form.querySelector('input[name="name"]');
  nameInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\./g, "");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    fakeAjaxRequest(data)
      .then((response) => {
        console.log("Сервер ответил:", response);
        openPopup();
        form.reset();
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
      });
  });

  function fakeAjaxRequest(data) {
    return new Promise((resolve) => {
      console.log("Отправка данных на сервер:", data);
      setTimeout(() => {
        resolve({ status: "success", message: "Данные получены" });
      }, 1500);
    });
  }

  function openPopup() {
    popup.style.display = "flex";
  }

  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});
