<template>
    <header id="navbar-spy" class="header header-topbar header-transparent header-fixed">
	<div id="top-bar" class="top-bar">
	<div class="container">
		<div class="bottom-bar-border">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 top--contact hidden-xs">
					<ul class="list-inline mb-0 ">
						<li>
							<i class="lnr lnr-clock"></i><span>Пн - пт  9.00 : 17.00</span>
						</li>
						<li>
							<i class="lnr lnr-phone-handset"></i> <span>(093) 111 888 888</span>
						</li>
					</ul>
				</div><!-- .col-md-6 end -->
				<div class="col-xs-12 col-sm-6 col-md-6 top--info text-right text-center-xs">
					<span class="top--login"><i class="lnr lnr-exit"></i><router-link to="/Authorization">Login</router-link> / <a href="#">Register</a></span>
                    <span class="top--social">
						<a class="facebook" href="#"><i class="fa fa-facebook"></i></a>
						<a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
						<a class="gplus" href="#"><i class="fa fa-google-plus"></i></a>
					<a class="instagram" href="#"><i class="fa fa-instagram"></i></a>
					</span>
				</div><!-- .col-md-6 end -->
			</div>
		</div>
	</div>
</div>
	<nav id="primary-menu" class="navbar navbar-fixed-top">
		<div class="container">
			<div class="">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				</button>
				<a class="logo" href="index.html">
					<img class="logo-light" src="assets/images/logo/logo-light.png" alt="Hairy Logo">
					<img class="logo-dark" src="assets/images/logo/logo-light.png" alt="Hairy Logo">
				</a>
			</div>
			
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse pull-right" id="navbar-collapse-1">
                <ul class="nav navbar-nav nav-pos-right nav-bordered-right snavbar-left">
                    <!-- Home Menu -->
                                 <li>
                                    <li><router-link to="/">ГЛАВНАЯ</router-link></li>
                                </li>
                                <li>
                                    <li><router-link to="/AboutUs">О НАС</router-link></li>
                                </li>
                                <li>
                                    <li><router-link to="/OurStaff">НАШ СОСТАВ</router-link></li>
                                </li>
                                <li>
                                    <li><router-link to="/GAllery">ГАЛЛЕРЕЯ</router-link></li>
                                </li>
                
                </ul>
                
                
				<!-- Module Cart -->
        <div class="module module-cart pull-left">
            
            <div class="module-content module-box cart-box">
                <div class="cart-overview">
                    <ul class="list-unstyled">
                        <li>
                            <a href="#">
                                <img class="img-responsive" src="assets/images/shop/thumb/1.jpg" alt="product"/>
                            </a>
                            <div class="product-meta">
                                <h5 class="product-title"><a href="#">Gel Cream</a></h5>
                                <p class="product-price">1 × $7.50</p>
                            </div>
                            <a class="cart-cancel" href="#">cancel</a>
                        </li>
                        <li>
                            <a href="#">
                                <img class="img-responsive" src="assets/images/shop/thumb/2.jpg" alt="product"/>
                            </a>
                            <div class="product-meta">
                                <h5 class="product-title"><a href="#">Hair Dryer</a></h5>
                                <p class="product-price">2 × $35.00</p>
                            </div>
                            <a class="cart-cancel" href="#">cancel</a>
                        </li>
                        <li>
                            <a href="#">
                                <img class="img-responsive" src="assets/images/shop/thumb/3.jpg" alt="product"/>
                            </a>
                            <div class="product-meta">
                                <h5 class="product-title"><a href="#">Beard Razor</a></h5>
                                <p class="product-price">1 × $39.00</p>
                            </div>
                            <a class="cart-cancel" href="#">cancel</a>
                        </li>
                    </ul>
                </div>
                <div class="cart-total">
                    <div class="total-desc">
                        Subtotal:
                    </div>
                    <div class="total-price">
                        $100.50
                    </div>
                </div>
                <div class="clearfix">
                </div>
                <div class="cart--control">
                    <a class="btn btn--primary btn--bordered btn--rounded btn--block" href="#">View Cart & Checkout</a>
                </div>
            </div>
        </div>
        <!-- .module-cart end -->
                        
                        <!-- Module Cart -->
                        <div class="module module-cart pull-left">
                            <div class="module-icon">
                                <a class="btn btn--white btn--bordered btn--rounded" href="#">Онлайн-запись</a>
                            </div>
                        </div>
                        <!-- .module-cart end -->
                    </div>
                    <!-- /.navbar-collapse -->
                    </div>
                </div>
                <!-- /.container-fluid -->
            </nav>

        </header>
</template>