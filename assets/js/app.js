/* Медленная прокрутка */
function slowScroll(id) {
  var offset = 0;
  $('html, body').animate({
      scrollTop: $(id).offset().top - offset
  }, 1000);
  return false;
};

/* 2 ползунка */
$(".js-range-slider").ionRangeSlider({
    skin: "big"
});

// Управление слайдерами

var promoSlider = document.querySelector(".promo__slider");
var servicesSlider = document.querySelector(".services");

if (promoSlider !== null || servicesSlider !== null) {

  var sliderControls = document.getElementsByClassName("slider__controls");
  for (var i = 0; i < sliderControls.length; i++) {
    sliderControls[i].classList.remove("no-js");
  };

  var slideIndex = 1;
  var promoSlide = "promoSlide";
  var servicesItem = "servicesItem";

  showSlides(slideIndex, promoSlide);
  showSlides(slideIndex, servicesItem);

  function currentSlide(n, x) {
    showSlides(slideIndex = n, x);
  };

  function showSlides(n, x) {
    var slides;
    var controls;

    if (x == "promoSlide") {
      slides = document.getElementsByClassName("promo__slide");
      controls = document.getElementsByClassName("promo__slider-control");
    } else {
      slides = document.getElementsByClassName("services__item");
      controls = document.getElementsByClassName("services__control");
    };

    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("no-js");
      controls[i].classList.remove("active")
    };

    slides[slideIndex - 1].classList.add("active");
    controls[slideIndex - 1].classList.add("active");
  };

};

/* кнопки открытия модальных окон */

var feedbackBtn = document.querySelector(".feedback__btn");
var mapOverlay = document.querySelector(".map__overlay");

if (feedbackBtn !== null || mapOverlay !== null) {

  // Кнопки закрытия модальных окон

  var modalFeedbackCloseBtn = document.querySelector(".modal__feedback-btn-close");
  var modalMapCloseBtn = document.querySelector(".modal__map-btn-close");

  // Модальное окно фидбека и его элементы

  var modalFeedback = document.querySelector(".modal__feedback");
  var feedbackForm = modalFeedback.querySelector("form");
  var nameInput = modalFeedback.querySelector("[name=name]");
  var emailInput = modalFeedback.querySelector("[name=email]");
  var textInput = modalFeedback.querySelector("[name=mailtext]");

  var modalMap = document.querySelector(".modal__map"); // Модальное окно карты

  var modalOverlay = document.querySelector(".modal__overlay");

  // localStorage

  var isStorageSupport = true;
  var nameStorage;
  var emailStorage;

  // Проверка доступности localStorage

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  };

  if (isStorageSupport) {
    nameStorage = localStorage.getItem("name");
    emailStorage = localStorage.getItem("email");
  };

  // Открытие модального окна фидбека

  feedbackBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalFeedback.classList.add("modal__show");
    modalOverlay.classList.add("modal__overlay-show");
    nameInput.focus();

    if (nameStorage) {
      nameInput.value = nameStorage;
      emailInput.focus();
    };

    if (emailStorage) {
      emailInput.value = emailStorage;
      textInput.focus();
    };
  });

  // Открытие модальной карты

  mapOverlay.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalMap.classList.add("modal__show");
    modalOverlay.classList.add("modal__overlay-show");
  });

  //Закрытие модальных окон по клику на оверлей

  modalOverlay.addEventListener("click", function (evt) {
    modalOverlay.classList.remove("modal__overlay-show");
    modalFeedback.classList.remove("modal__show");
    modalFeedback.classList.remove("modal__feedback-error");
    modalMap.classList.remove("modal__show");
  });

  // Закрытие модальных окна фидбека по клику на кнопку закрытия

  modalFeedbackCloseBtn.addEventListener("click", function (evt) {
    modalOverlay.classList.remove("modal__overlay-show");
    modalFeedback.classList.remove("modal__show");
  });

  // Закрытие модальной карты по клику на кнопку закрытия

  modalMapCloseBtn.addEventListener("click", function (evt) {
    modalOverlay.classList.remove("modal__overlay-show");
    modalMap.classList.remove("modal__show");
  });

  // Убирает атрибут "required" и полей формы фидбека

  nameInput.removeAttribute("required");
  emailInput.removeAttribute("required");
  textInput.removeAttribute("required");

  // Проверка значений формы

  feedbackForm.addEventListener("submit", function (evt) {
    if (!nameInput.value || !emailInput.value || !textInput.value) {
      evt.preventDefault();

      nameInput.classList.remove("modal__feedback-input-err");
      emailInput.classList.remove("modal__feedback-input-err");
      textInput.classList.remove("modal__feedback-input-err");
      modalFeedback.classList.remove("modal__feedback-error");
      modalFeedback.offsetWidth = modalFeedback.offsetWidth;
      modalFeedback.classList.add("modal__feedback-error");

      if (!nameInput.value) {
        nameInput.classList.add("modal__feedback-input-err");
      };

      if (!emailInput.value) {
        emailInput.classList.add("modal__feedback-input-err");
      };

      if (!textInput.value) {
        textInput.classList.add("modal__feedback-input-err");
      };

    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("email", emailInput.value);
      };
    };
  });

  // Удаление класса modal__feedback-input-err с элементов формы при фокусе

  textInput.addEventListener("focus", function (evt) {
    textInput.classList.remove("modal__feedback-input-err");
  });

  emailInput.addEventListener("focus", function (evt) {
    emailInput.classList.remove("modal__feedback-input-err");
  });

  textInput.addEventListener("focus", function (evt) {
    textInput.classList.remove("modal__feedback-input-err");
  });

  // Закрытие модальных окон по ESC

  window.addEventListener("keydown", function (evt) {
    if(evt.keyCode === 27) {
      if (modalFeedback.classList.contains("modal__show") || modalMap.classList.contains("modal__show")) {
        evt.preventDefault();
        modalFeedback.classList.remove("modal__show");
        modalFeedback.classList.remove("modal__feedback-error");
        modalMap.classList.remove("modal__show");
        modalOverlay.classList.remove("modal__overlay-show");
      };
    };
  });

};

// localStorage

var isStorageSupport = true;
var nameStorage;
var emailStorage;

// Проверка доступности localStorage

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
};

if (isStorageSupport) {
  nameStorage = localStorage.getItem("name");
  emailStorage = localStorage.getItem("email");
};

/* Выпадающие меню */

// var catalogLink = document.querySelector(".header__catalog-link");
// var dropdown = document.querySelector(".header__categories-list");
// var test = document.querySelector(".header__catalog");

// dropdown.classList.remove("hidden");
// dropdown.classList.add("visually-hidden");

// catalogLink.addEventListener("mouseenter", function () {
//   dropdown.classList.remove("visually-hidden");
// });

// catalogLink.addEventListener("focus", function () {
//   dropdown.classList.remove("visually-hidden");
// });

// test.addEventListener("mouseleave", function () {
//   dropdown.classList.add("visually-hidden");
// });