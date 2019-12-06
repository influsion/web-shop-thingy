function productCartListViewComponents() {
    return (`
        <div class="list__view col-12">
            <div class="thumb">
                <a class="first__img" href="single-product.html"><img src="images/product/1.jpg" alt="product images"></a>
                <a class="second__img animation1" href="single-product.html"><img src="images/product/2.jpg" alt="product images"></a>
            </div>
            <div class="content">
                <h2><a href="single-product.html">Ali Smith</a></h2>
                <ul class="rating d-flex">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                </ul>
                <ul class="prize__box">
                    <li>$111.00</li>
                    <li class="old__prize">$220.00</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
                <ul class="cart__action d-flex">
                    <li class="cart"><a href="cart.html">Add to cart</a></li>
                    <li class="wishlist"><a href="cart.html"></a></li>
                    <li class="compare"><a href="cart.html"></a></li>
                </ul>
            </div>
        </div>
    `);
}