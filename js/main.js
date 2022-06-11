/* Burger */

const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("active");
});

const items = [
  {
    skirt: [
      {
        id: 1,
        name: "Футболка USA",
        price: "$229",
        sale: true,
        salePrice: "$129",
        img: "css/img/collection-item1.png",
      },
    ],
  },
  {
    swimsuit: [
      {
        id: 2,
        name: "Купальник Glow",
        price: "$129",
        sale: false,
        salePrice: "$0",
        img: "css/img/collection-item2.png",
      },
    ],
  },
  {
    sweetshot: [
      {
        id: 3,
        name: "Свитшот Sweet Shot",
        price: "$129",
        sale: false,
        salePrice: "$0",
        img: "css/img/collection-item3.png",
      },
    ],
  },

  { pagination: 9 },
  { total: 15 },
];

const collection = document.querySelector(".collection-items");
const pagination = document.querySelector(".collection-pagination");
const nesting = document.querySelector(".shop-item-nesting");

function showCollection(item) {
  if (item.sale) {
    collection.innerHTML += `
      <div class="collection-item">
        <div class="collection-img">
          <img src="${item.img}" alt="" class="img" />
            <a href="shop-item.html" id="${item.id}" class="item-colletion-id">
              <img src="css/img/right.svg" alt="" class="img-right" />
            </a>
          </div>
          <h4 class="collection-name">${item.name}</h4>
          <div class="collection-price">
          <span>${item.salePrice}</span>
             ${item.price}</div>
        </div>
      `;
  } else {
    collection.innerHTML += `
      <div class="collection-item">
        <div class="collection-img">
          <img src="${item.img}" alt="" class="img" />
            <a href="shop-item.html" id="${item.id} " class="item-colletion-id">
              <img src="css/img/right.svg" alt="" class="img-right" />
            </a>
          </div>
          <h4 class="collection-name">${item.name}</h4>
          <div class="collection-price">
             ${item.price}</div>
        </div>
      `;
  }
}

function showCollectionPagination(p = items[3].pagination) {
  collection.innerHTML = "";
  for (let i = 0; i < p; i++) {
    if (i % 3 === 0) {
      showCollection(items[0].skirt[0]);
    } else if (i % 3 === 1) {
      showCollection(items[1].swimsuit[0]);
    } else {
      showCollection(items[2].sweetshot[0]);
    }
  }
}

function showPagination(numberPagination) {
  for (let i = 0; i < numberPagination; i++) {
    if (!i) {
      pagination.innerHTML += `
      <div class="collection-btn">
          <a href="#" class="btn btn-collection active">${i + 1}</a>
      </div>`;
    } else {
      pagination.innerHTML += `
      <div class="collection-btn">
          <a href="#" class="btn btn-collection">${i + 1}</a>
      </div>`;
    }
  }
  pagination.innerHTML += `
    <div class="collection-btn">
      <a href="#" class="btn-next">
        <svg>
        <use xlink:href="#next"></use>
        </svg>
      </a>
    </div>
  `;
}

function searchBtnActive(btns) {
  let btnText, btnItem;
  btns.forEach((e) => {
    if (e.children[0].classList[2] == "active") {
      btnItem = e.children[0];
      btnText = e.children[0].text;
    }
  });
  return [btnText, btnItem];
}

function collectionItem(item) {
  const img = document.querySelector(".shop-item-img");
  const price = document.querySelector(".shop-item-price");
  if (item.sale) {
    img.innerHTML = `<img src="${item.img}" alt="" class="img-item" />`;
    price.innerHTML = `${item.salePrice} <span>${item.price}</span>`;
  } else {
    img.innerHTML = `<img src="${item.img}" alt="" class="img-item" />`;
    price.innerHTML = `${item.price}`;
  }
}

function showCollectionItem(id) {
  for (let i = 0; i < id; i++) {
    if (items[0].skirt[0].id === +id) {
      nesting.children[2].innerHTML = `${items[0].skirt[0].name}`;
      collectionItem(items[0].skirt[0]);
    } else if (items[1].swimsuit[0].id === +id) {
      nesting.children[2].innerHTML = `${items[1].swimsuit[0].name}`;
      collectionItem(items[1].swimsuit[0]);
    } else {
      nesting.children[2].innerHTML = `${items[2].sweetshot[0].name}`;
      collectionItem(items[2].sweetshot[0]);
    }
  }
}

let url = document.location.pathname;
let paginationPage = document.querySelectorAll(".collection-btn");

if (url === "/index.html" || url === "/") {
  showCollectionPagination(3);
} else if (url === "/shop.html") {
  showCollectionPagination();
  let paginationNumberPage = Math.ceil(items[4].total / items[3].pagination);

  showPagination(paginationNumberPage);
  paginationPage = document.querySelectorAll(".collection-btn");

  paginationPage.forEach((e) => {
    e.addEventListener("click", (event) => {
      let paginationItem;
      let [btn, item] = searchBtnActive(paginationPage);
      event.preventDefault();

      if (event.path[0].localName == "svg") {
        if (paginationNumberPage > +btn && paginationNumberPage != +btn) {
          paginationPage.forEach((element, index) => {
            if (index === +btn) {
              item.classList.toggle("active");
              element.children[0].classList.toggle("active");

              if (index + 1 === paginationNumberPage) {
                paginationItem = items[4].total - index * items[3].pagination;
                showCollectionPagination(paginationItem);
              } else {
                showCollectionPagination();
              }
            }
          });
        }
      } else if (
        event.path[0].classList[2] != "active" &&
        event.path[1].nodeName != "svg"
      ) {
        item.classList.toggle("active");
        event.path[0].classList.toggle("active");
        if (+event.path[0].text === paginationNumberPage) {
          paginationItem =
            items[4].total - (event.path[0].text - 1) * items[3].pagination;
          showCollectionPagination(paginationItem);
        } else {
          showCollectionPagination();
        }
      }
    });
  });
} else if (url === "/shop-item.html") {
  let idItem = localStorage.getItem("id");
  showCollectionItem(idItem);
}

const itemCollectionClick = document.querySelectorAll(".item-colletion-id");

itemCollectionClick.forEach((item) => {
  item.addEventListener("click", (event) => {
    localStorage.setItem("id", event.path[1].id);
  });
});

console.log(localStorage.getItem("id"));
