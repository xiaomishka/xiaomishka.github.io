(function () {
  'use strict';

  Lampa.Platform.tv();

  let isMutationActive = 0;

  function initToggleListener() {
    Lampa.Controller.listener.follow('toggle', function (event) {
      if (event.name === 'select') {
        setTimeout(() => {
          if (Lampa.Activity.active().component === "full" && document.querySelector(".ad-server")) {
            $(".ad-server").remove();
          }
          if (Lampa.Activity.active().component === "modss_online") {
            $(".selectbox-item--icon").remove();
          }
        }, 20);
      }
    });
  }

  function hideElements() {
    setTimeout(() => {
      $(".selectbox-item__lock").parent().hide();
      if (!$("[data-name=\"account_use\"]").length) {
        $("div > span:contains(\"Статус\")").parent().remove();
      }
    }, 10);
  }

  function observeDOMChanges() {
    const observer = new MutationObserver(function (mutations) {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && document.getElementsByClassName("card").length > 0) {
          if (!isMutationActive) {
            isMutationActive = 1;
            hideElements();
            setTimeout(() => {
              isMutationActive = 0;
            }, 500);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function cleanUpUI() {
    const style = document.createElement("style");
    style.innerHTML = ".button--subscribe { display: none; }";
    document.body.appendChild(style);

    Lampa.Listener.follow("full", function (event) {
      if (event.type === 'build' && event.name === "discuss") {
        setTimeout(() => {
          $(".full-reviews").closest("div").remove();
        }, 100);
      }
    });

    $(document).ready(function () {
      localStorage.setItem('region', JSON.stringify({ code: "uk", time: Date.now() }));
    });

    $("[data-action=\"tv\"]").on("hover:enter hover:click hover:touch", function () {
      const adCleaner = setInterval(() => {
        if (document.querySelector(".ad-bot")) {
          $(".ad-bot").remove();
          clearInterval(adCleaner);
          setTimeout(() => Lampa.Controller.toggle("content"), 0);
        }
      }, 50);

      const cardTextCleaner = setInterval(() => {
        if (document.querySelector(".card__textbox")) {
          $(".card__textbox").closest("div").remove();
          clearInterval(cardTextCleaner);
        }
      }, 50);
    });

    setTimeout(() => {
      $(".open--feed, .open--premium, .open--notice, .icon--blink, .black-friday__button, .christmas__button").remove();
    }, 1000);

    Lampa.Settings.listener.follow('open', function (event) {
      if (event.name === "account") {
        setTimeout(() => {
          $(".settings--account-premium, div > span:contains(\"CUB Premium\")").remove();
        }, 0);
      }
      if (event.name === "server" && document.querySelector(".ad-server")) {
        $(".ad-server").remove();
      }
    });

    Lampa.Listener.follow("full", function (event) {
      if (event.type === "complite") {
        $(".button--book").on("hover:enter", hideElements);
      }
    });

    Lampa.Storage.listener.follow("change", function (event) {
      if (event.name === "activity" && Lampa.Activity.active().component === "bookmarks") {
        $(".register:nth-child(n+4)").hide();
      }
      setTimeout(observeDOMChanges, 200);
    });
  }

  if (window.appready) {
    cleanUpUI();
    observeDOMChanges();
    initToggleListener();
  } else {
    Lampa.Listener.follow("app", function (event) {
      if (event.type === "ready") {
        cleanUpUI();
        observeDOMChanges();
        initToggleListener();
        $("[data-action=feed], [data-action=subscribes], [data-action=myperson]").eq(0).remove();
      }
    });
  }
})();
