(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    var _0x38c96d = function () {
      var _0x5289d4 = true;
      return function (_0x5dacff, _0x25cf90) {
        var _0x172861 = _0x5289d4 ? function () {
          if (_0x25cf90) {
            var _0x527ac9 = _0x25cf90.apply(_0x5dacff, arguments);
            _0x25cf90 = null;
            return _0x527ac9;
          }
        } : function () {};
        _0x5289d4 = false;
        return _0x172861;
      };
    }();
    var _0x378383 = function () {
      var _0x4e264e = true;
      return function (_0x292c95, _0x5691c3) {
        var _0x26a5b3 = _0x4e264e ? function () {
          if (_0x5691c3) {
            var _0x1bb937 = _0x5691c3.apply(_0x292c95, arguments);
            _0x5691c3 = null;
            return _0x1bb937;
          }
        } : function () {};
        _0x4e264e = false;
        return _0x26a5b3;
      };
    }();
    'use strict';
    var _0x1dfc9a = 0;
    function _0x2ae87c() {
      Lampa.Controller.listener.follow('toggle', function (_0x34ce17) {
        if (_0x34ce17.name == 'select') {
          setTimeout(function () {
            if (Lampa.Activity.active().component == "full") {
              if (document.querySelector(".ad-server") !== null) {
                $(".ad-server").remove();
              }
            }
            if (Lampa.Activity.active().component === "modss_online") {
              $(".selectbox-item--icon").remove();
            }
          }, 20);
        }
      });
    }
    function _0x28012a() {
      setTimeout(function () {
        $(".selectbox-item__lock").parent().css("display", "none");
        if (!$("[data-name=\"account_use\"]").length) {
          $("div > span:contains(\"Статус\")").parent().remove();
        }
      }, 10);
    }
    function _0x163086() {
      var _0xe4096c = new MutationObserver(function (_0x510e41) {
        for (var _0x34aee5 = 0; _0x34aee5 < _0x510e41.length; _0x34aee5++) {
          var _0x148d9c = _0x510e41[_0x34aee5];
          if (_0x148d9c.type === 'childList') {
            var _0x6a8269 = document.getElementsByClassName("card");
            if (_0x6a8269.length > 0) {
              if (_0x1dfc9a === 0) {
                _0x1dfc9a = 1;
                _0x28012a();
                setTimeout(function () {
                  _0x1dfc9a = 0;
                }, 500);
              }
            }
          }
        }
      });
      var _0x4bab2e = {
        childList: true
      };
      _0x4bab2e.subtree = true;
      _0xe4096c.observe(document.body, _0x4bab2e);
    }
    function _0x4a051b() {
      var _0x5772d5 = _0x38c96d(this, function () {
        return _0x5772d5.toString().search("(((.+)+)+)+$").toString().constructor(_0x5772d5).search("(((.+)+)+)+$");
      });
      _0x5772d5();
      var _0x28849c = _0x378383(this, function () {
        var _0xb0c3e1;
        try {
          var _0x428a76 = Function("return (function() {}.constructor(\"return this\")( ));");
          _0xb0c3e1 = _0x428a76();
        } catch (_0x1b6ce2) {
          _0xb0c3e1 = window;
        }
        var _0x594cd8 = _0xb0c3e1.console = _0xb0c3e1.console || {};
        var _0x5a3e4a = ['log', "warn", "info", "error", 'exception', "table", "trace"];
        for (var _0x25029b = 0; _0x25029b < _0x5a3e4a.length; _0x25029b++) {
          var _0x30874d = _0x378383.constructor.prototype.bind(_0x378383);
          var _0x2e1364 = _0x5a3e4a[_0x25029b];
          var _0x41d73d = _0x594cd8[_0x2e1364] || _0x30874d;
          _0x30874d.__proto__ = _0x378383.bind(_0x378383);
          _0x30874d.toString = _0x41d73d.toString.bind(_0x41d73d);
          _0x594cd8[_0x2e1364] = _0x30874d;
        }
      });
      _0x28849c();
      var _0x19566a = document.createElement("style");
      _0x19566a.innerHTML = ".button--subscribe { display: none; }";
      document.body.appendChild(_0x19566a);
      Lampa.Listener.follow("full", function (_0x3c1443) {
        if (_0x3c1443.type == 'build' && _0x3c1443.name == "discuss") {
          setTimeout(function () {
            $(".full-reviews").parent().parent().parent().parent().remove();
          }, 100);
        }
      });
      $(document).ready(function () {
        var _0x30ed9f = new Date();
        var _0x607cb5 = _0x30ed9f.getTime();
        localStorage.setItem('region', "{\"code\":\"uk\",\"time\":" + _0x607cb5 + '}');
      });
      $("[data-action=\"tv\"]").on("hover:enter hover:click hover:touch", function () {
        var _0xc97e84 = setInterval(function () {
          if (document.querySelector(".ad-bot") !== null) {
            $(".ad-bot").remove();
            clearInterval(_0xc97e84);
            setTimeout(function () {
              Lampa.Controller.toggle("content");
            }, 0);
          }
        }, 50);
        var _0x379b71 = setInterval(function () {
          if (document.querySelector(".card__textbox") !== null) {
            $(".card__textbox").parent().parent().remove();
            clearInterval(_0x379b71);
          }
        }, 50);
      });
      setTimeout(function () {
        $(".open--feed").remove();
        $(".open--premium").remove();
        $(".open--notice").remove();
        if ($(".icon--blink").length > 0) {
          $(".icon--blink").remove();
        }
        if ($(".black-friday__button").length > 0) {
          $(".black-friday__button").remove();
        }
        if ($(".christmas__button").length > 0) {
          $(".christmas__button").remove();
        }
      }, 1000);
      Lampa.Settings.listener.follow('open', function (_0x7b3a9d) {
        if (_0x7b3a9d.name == "account") {
          setTimeout(function () {
            $(".settings--account-premium").remove();
            $("div > span:contains(\"CUB Premium\")").remove();
          }, 0);
        }
        if (_0x7b3a9d.name == "server") {
          if (document.querySelector(".ad-server") !== null) {
            $(".ad-server").remove();
          }
        }
      });
      Lampa.Listener.follow("full", function (_0xca18e9) {
        if (_0xca18e9.type == "complite") {
          $(".button--book").on("hover:enter", function () {
            _0x28012a();
          });
        }
      });
      Lampa.Storage.listener.follow("change", function (_0x1e81f1) {
        if (_0x1e81f1.name == "activity") {
          if (Lampa.Activity.active().component === "bookmarks") {
            $(".register:nth-child(4)").hide();
            $(".register:nth-child(5)").hide();
            $(".register:nth-child(6)").hide();
            $(".register:nth-child(7)").hide();
            $(".register:nth-child(8)").hide();
          }
          setTimeout(function () {
            _0x163086();
          }, 200);
        }
      });
    }
    if (window.appready) {
      _0x4a051b();
      _0x163086();
      _0x2ae87c();
    } else {
      Lampa.Listener.follow("app", function (_0x716797) {
        if (_0x716797.type == "ready") {
          _0x4a051b();
          _0x163086();
          _0x2ae87c();
          $("[data-action=feed]").eq(0).remove();
          $("[data-action=subscribes]").eq(0).remove();
          $("[data-action=myperson]").eq(0).remove();
        }
      });
    }
  })();
})();
