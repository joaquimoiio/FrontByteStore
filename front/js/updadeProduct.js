window.addEventListener('load', function() {
    if (typeof displayProductDetails === 'function') {
        const originalDisplayProductDetails = displayProductDetails;
        
        displayProductDetails = function(product) {
            const productName = document.querySelector('.produto-nome');
            if (productName) {
                productName.textContent = product.nome;
            }

            const productImage = document.querySelector('.produto-imagem img');
            if (productImage && product.imagemPrincipal) {
                productImage.src = product.imagemPrincipal;
                productImage.alt = product.nome;
            }
            
            const productDescription = document.querySelector('.produto-descricao');
            if (productDescription && product.descricao) {
                productDescription.textContent = product.descricao;
            }
            
            const oldPrice = document.querySelector('.preco-antigo');
            if (oldPrice) {
                oldPrice.textContent = `R$${formatPrice(product.precoAntigo)}`;
            }
            
            const promoPrice = document.querySelector('.preco-promocao');
            if (promoPrice) {
                promoPrice.textContent = `R$${formatPrice(product.precoAtual)}`;
            }
            
            const parceladoPrices = document.querySelectorAll('.preco-parcelado p');
            if (parceladoPrices.length > 0) {
                parceladoPrices[0].textContent = `R$${formatPrice(product.precoAtual)}`;
            }
            
            const addToCartBtn = document.querySelector('.btn-carrinho');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    const quantity = parseInt(document.getElementById('quantidade').value) || 1;
                    addToCart(product, quantity);
                });
            }
            
            const buyNowBtn = document.querySelector('.btn-comprar');
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', function() {
                    const quantity = parseInt(document.getElementById('quantidade').value) || 1;
                    addToCart(product, quantity);
                    window.location.href = 'carrinho.html';
                });
            }
        };
    }
});