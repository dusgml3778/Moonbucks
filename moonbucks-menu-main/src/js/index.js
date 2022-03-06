const $ = (selector) => document.querySelector(selector);
//->document.queryselector replace

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringfy(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  }
}

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  // 재사용 함수 START//

  //Adjust count
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
    $(".menu-count").innerText = `총 ${menuCount}개`
  }

  // 1.insert
  const AddMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요");
      return;
    }

    const espressomenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressomenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressomenuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`
    };

    $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressomenuName));
    updateMenuCount();
    $("#espresso-menu-name").value = "";


  };

  // update function
  const updateMenuName = (e) => {

    const $menuName = e.target.closest("li").querySelector(".menu-name")
    const newName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = newName;

  }

  const removeMenuName = (e) => {
    if (confirm("本当に削除するの?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  }

  // 재사용 함수 END//

  // 2.update
  $("#espresso-menu-list").addEventListener("click", (e) => {

    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 3.delete
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  })

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault()
  })

  $("#espresso-menu-submit-button").addEventListener("click", AddMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    AddMenuName();
  })
}

App();