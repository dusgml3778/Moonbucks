const $ = (selector) => document.querySelector(selector);
//->document.queryselector replace

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  }
}

function App() {

  this.menu = []; // 어떤 데이터가 들어올 지 초기화 해줌 배열데이터로 초기화하지 않으면 push데이터를 쓸 수 없다

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
    this.menu.push({
      name: espressomenuName
    });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((item, index) => {

        return `<li data-menu-id = "${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;
    //$("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressomenuName));

    updateMenuCount();
    $("#espresso-menu-name").value = "";


  };

  // update function
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name")
    const newName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = newName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = newName;

  }

  const removeMenuName = (e) => {
    if (confirm("本当に削除するの?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
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

const app = new App();