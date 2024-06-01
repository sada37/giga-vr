"use strict";

{
  //ハンバーガーメニュー周り
  const gnavList = document.querySelector(".gnav__list");
  const gnavButton = document.querySelector(".gnav__button");

  const lineTop = document.querySelector(".icon-line__top");
  const lineMiddle = document.querySelector(".icon-line__middle");
  const lineBottom = document.querySelector(".icon-line__bottom");

  const body = document.querySelector("body");

  // ナビリストと背景にtransitionを設定する関数を宣言
  function transitionIn() {
    gnavList.style.transitionDuration = "0.5s";
  }
  //ナビリストと背景からtransitionを外す関数を宣言
  function transitionOut() {
    gnavList.style.transitionDuration = "0s";
  }

  /* ボタンを押すたび、背景とナビリストの出現切り替え */
  gnavButton.addEventListener("click", () => {
    // transitionを設定
    transitionIn();
    // 背景とナビリストの出現する動きと背景のスクロール固定の切り替え
    gnavList.classList.toggle("gnav__list--active");
    body.classList.toggle("scroll-stop");
    // ボタンの三本線をバツと切り替え
    lineTop.classList.toggle("icon-line__top--active");
    lineMiddle.classList.toggle("icon-line__middle--active");
    lineBottom.classList.toggle("icon-line__bottom--active");

    // gnavListのtransitionが終わったらtransitionを0sにする
    gnavList.addEventListener("transitionend", () => {
      transitionOut();
    });
    
    // tab操作で開いたあとにリストから抜けたタイミングで閉じるように指定
    window.addEventListener("keyup", (event) => {
      function includeText(text) {
        return document.activeElement.classList.contains(text);
      }
      if (
        !includeText("gnav__button") &&
        !includeText("gnav__touch__button") &&
        !includeText("gnav__under__link") &&
        !includeText("c-button")
      ) {
        removeClass();
      }
    });
  });

  // 画面幅が変わった時とスマホのフリック操作で閉じるように各クラスを除外する関数の宣言
  function removeClass() {
    gnavList.classList.remove("gnav__list--active");
    lineTop.classList.remove("icon-line__top--active");
    lineMiddle.classList.remove("icon-line__middle--active");
    lineBottom.classList.remove("icon-line__bottom--active");
  }

  /* 画面幅が変わったときにも閉じれるようにする */
  window.addEventListener("resize", () => {
    removeClass();
    transitionOut();
    body.classList.remove("scroll-stop");
  });

  // ハンバーガーメニュー実装終わり

  //tab移動でgnav__under__list__wrapがフォーカス時にenterキーを押したときにリストが開くように実行。また、開いていない時はリストにフォーカスが行かないようにする。
  const gnavTouchButtons = document.querySelectorAll(".gnav__touch__button");
  const gnavUnderLinks = document.querySelectorAll(".gnav__under__link");
  const gnavUnderListWraps = document.querySelectorAll(".gnav__under__list__wrap");

  //一旦すべてのgnav__under__linkにフォーカスが当たらないようにする
  gnavUnderLinks.forEach((link) => {
    link.setAttribute("tabindex", -1);
  });

  //gnav__touch__buttonをenterで押したとき、リストが開くように指定
  gnavTouchButtons.forEach((button) => {
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.currentTarget.nextElementSibling.classList.add("gnav__under__list__wrap--active");
        e.currentTarget.children[0].classList.add("gnav__list__icon--active");

        gnavUnderLinks.forEach((link) => {
          link.setAttribute("tabindex", 0);
        });

        window.addEventListener("keyup", (event) => {
          if (event.key === "Tab") {
            if (document.activeElement.classList.contains("gnav__under__link") === false) {
              gnavUnderListWraps.forEach((wrap) => {
                wrap.classList.remove("gnav__under__list__wrap--active");
                wrap.previousElementSibling.children[0].classList.remove("gnav__list__icon--active");
              });
              gnavUnderLinks.forEach((link) => {
                link.setAttribute("tabindex", -1);
              });
            }
          }
        });
      }
    });
  });
}

{
  const touchButton = document.querySelectorAll(".js-touch");
  const gnavUnderListWrap = document.querySelectorAll(".gnav__under__list__wrap");
  const gnavListIcon = document.querySelectorAll(".gnav__list__icon");

  touchButton.forEach((item, index) => {
    item.addEventListener("touchstart", () => {
      const style = getComputedStyle(gnavUnderListWrap[index]).gridTemplateRows;

      gnavUnderListWrap.forEach((wrap) => {
        wrap.classList.remove("gnav__under__list__wrap--active");
      });

      gnavListIcon.forEach((icon) => {
        icon.classList.remove("gnav__list__icon--active");
      });

      if (style === "0px") {
        gnavUnderListWrap[index].classList.add("gnav__under__list__wrap--active");
        gnavListIcon[index].classList.add("gnav__list__icon--active");
      }
    });
  });
}

{
  //questionのアコーディオン
  const details = document.querySelectorAll(".details");
  const detailsTitle = document.querySelectorAll(".details-title");
  const detailsContent = document.querySelectorAll(".details-content");
  const questionIcon = document.querySelectorAll(".question-icon");

  let detailsContentHeight = 0;

  /* heightアニメーションの流れ
    open時    auto → 0 → animation → detailsContentHeight → auto
    close時   auto → detailsContentHeight →animation → 0 → auto
  */

  function showAnime(index) {
    detailsContentHeight = detailsContent[index].getBoundingClientRect().height;
    detailsContent[index].animate(
      {
        height: [0, `${detailsContentHeight}px`],
      },
      {
        duration: 300,
        easing: "cubic-bezier(.01,.61,.38,1)", //強めのease-out
      }
    );
  }

  function closeAnime(index) {
    detailsContentHeight = detailsContent[index].getBoundingClientRect().height;
    return detailsContent[index].animate(
      {
        height: [`${detailsContentHeight}px`, 0],
      },
      {
        duration: 300,
        easing: "cubic-bezier(.01,.61,.38,1)", //強めのease-out
      }
    );
  }

  detailsTitle.forEach((detailTitle, index) => {
    detailTitle.addEventListener("click", (e) => {
      e.preventDefault();
      if (details[index].open === false) {
        questionIcon[index].style.transform = "rotate(135deg)";
        details[index].setAttribute("open", "true");
        showAnime(index);
      } else if (details[index].open === true) {
        questionIcon[index].style.transform = "rotate(0deg)";
        closeAnime(index).onfinish = () => {
          details[index].removeAttribute("open");
        };
      }
    });
  });
}
