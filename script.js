document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');

    // Fetch data from API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            tabs.forEach((tab, index) => {
                tab.addEventListener('change', () => {
                    const selectedCategory = data.categories[index].category_products;
                    displayProducts(selectedCategory);
                });
            });

            // Display products of initial selected tab (Men)
            displayProducts(data.categories[0].category_products);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = ''; // Clear previous products

        // Iterate through products in the selected category
        products.forEach(product => {
            // Create HTML elements for each product
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const image = document.createElement('img');
            image.classList.add('frame-inner');
            image.src = product.image;
            image.alt = product.title;

            const titleVendorContainer = document.createElement('div'); // Container for title and vendor
            titleVendorContainer.classList.add('title-vendor-container');

            const title = document.createElement('h2');
            title.textContent = product.title;

            const separator = document.createElement('span');
            separator.classList.add('separator');
            separator.textContent = '•';

            const vendor = document.createElement('h3');
            vendor.textContent = product.vendor;

            titleVendorContainer.appendChild(title);
            titleVendorContainer.appendChild(separator);
            titleVendorContainer.appendChild(vendor);

            const price = document.createElement('h4');
            price.textContent = 'Rs ' + product.price+'.00';

            const comparePrice = document.createElement('h5');
            comparePrice.textContent =  product.compare_at_price + '.00';

            const discount = document.createElement('h6');
            discount.textContent = '50% off';

            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('btn');
            addToCartBtn.textContent = 'Add to Cart';

            // Append elements to grid item
            gridItem.appendChild(image);
            gridItem.appendChild(titleVendorContainer);
            gridItem.appendChild(price);
            gridItem.appendChild(comparePrice);
            gridItem.appendChild(discount);
            gridItem.appendChild(addToCartBtn);

            // Append grid item to product grid
            productGrid.appendChild(gridItem);
        });
    }
});
