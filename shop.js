const apiUrl = 'https://crudcrud.com/api/c0b84f33c95941329bda38b96328213c';
const apiUrlGet = 'https://crudcrud.com/api/c0b84f33c95941329bda38b96328213c/veg';
const shopList = document.getElementById('shop-list');
const totalCount = document.getElementById('total-count');
let shopData = [];

document.getElementById('add-btn').addEventListener('click', () => {
  const veggieInput = document.getElementById('veggie-input');
  const quantityInput = document.getElementById('quantity-input');

  const shopItem = {
    vegetable: veggieInput.value,
    quantity: parseInt(quantityInput.value, 10)
  };

  axios.post(apiUrl, shopItem)
    .then((response) => {
      shopData.push(response.data);
      renderShopList();
      updateTotalCount();
    })
    .catch((error) => {
      console.error(error);
    });
});

shopList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const itemId = event.target.parentNode.dataset.id;
    axios.delete(`${apiUrl}/${itemId}`)
      .then(() => {
        shopData = shopData.filter((item) => item._id !== itemId);
        renderShopList();
        updateTotalCount();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

function renderShopList() {
  shopList.innerHTML = '';
  shopData.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.dataset.id = item._id;

    const veggieSpan = document.createElement('span');
    veggieSpan.textContent = item.vegetable;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;

    const buyBtn = document.createElement('button');
    buyBtn.className = 'btn buy-btn';
    buyBtn.textContent = 'Buy';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn delete-btn';
    deleteBtn.textContent = 'Delete';

    listItem.appendChild(veggieSpan);
    listItem.appendChild(quantityInput);
    listItem.appendChild(buyBtn);
    listItem.appendChild(deleteBtn);

    shopList.appendChild(listItem);
  });
}

function updateTotalCount() {
  const total = shopData.reduce((acc, curr) => acc + curr.quantity, 0);
  totalCount.textContent = `Total: ${total}`;
}

axios.get(apiUrlGet)
  .then((response) => {
    shopData = response.data;
    console.log(response.data)
    renderShopList();
    updateTotalCount();
  })
  .catch((error) => {
    console.error(error);
  });