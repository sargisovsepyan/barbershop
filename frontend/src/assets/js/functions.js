/*global jQuery */
/* Contents
// ------------------------------------------------>
	1.  LOADING SCREEN
	2.  BACKGROUND INSERT
	3.	NAV MODULE
	4.  MOBILE MENU
	5.  HEADER AFFIX
	6.  COUNTER UP
	7.  AJAX MAILCHIMP
	8.  AJAX CAMPAIGN MONITOR 
	9.  OWL CAROUSEL
	10. MAGNIFIC POPUP
	11. MAGNIFIC POPUP VIDEO
	12. GALLERY FLITER
	13. FOLLOW INSTAGRAM
	14. SCROLL TO
	15. PROGRESS BAR
	16. SLIDER RANGE

*/
(function ($) {
    "use strict";
    // /* ------------------  LOADING SCREEN ------------------ */
    // $(window).on("load", function () {
    //     $(".preloader").fadeOut(5000);
    //     $(".preloader").remove();
    // });

    // /* ------------------  Background INSERT ------------------ */
    // var $bgSection = $(".bg-section"),
    //     $bgPattern = $(".bg-pattern"),
    //     $colBg = $(".col-bg");

    // $bgSection.each(function () {
    //     var bgSrc = $(this).children("img").attr("src");
    //     var bgUrl = 'url(' + bgSrc + ')';
    //     $(this).parent().css("backgroundImage", bgUrl);
    //     $(this).parent().addClass("bg-section");
    //     $(this).remove();
    // });

    // $bgPattern.each(function () {
    //     var bgSrc = $(this).children("img").attr("src");
    //     var bgUrl = 'url(' + bgSrc + ')';
    //     $(this).parent().css("backgroundImage", bgUrl);
    //     $(this).parent().addClass("bg-pattern");
    //     $(this).remove();
    // });

    // $colBg.each(function () {
    //     var bgSrc = $(this).children("img").attr("src");
    //     var bgUrl = 'url(' + bgSrc + ')';
    //     $(this).parent().css("backgroundImage", bgUrl);
    //     $(this).parent().addClass("col-bg");
    //     $(this).remove();
    // });

    /* ------------------  NAV MODULE  ------------------ */
    var $moduleIcon = $(".module-icon"),
        $moduleCancel = $(".module-cancel");
    $moduleIcon.on("click", function (e) {
        $(this).parent().siblings().removeClass('module-active'); // Remove the class .active form any sibiling.
        $(this).parent(".module").toggleClass("module-active"); //Add the class .active to parent .module for this element.
        e.stopPropagation();
    });
    // If Click on [ Search-cancel ] Link
    $moduleCancel.on("click", function (e) {
        $(".module").removeClass("module-active");
        e.stopPropagation();
    });

    $(".side-nav-icon").on("click", function () {
        if ($(this).parent().hasClass('module-active')) {
            //$(".module-hamburger > .hamburger-panel").css;
            $(".wrapper").addClass("hamburger-active");
            $(this).addClass("module-hamburger-close");
        } else {
            //$(".module-hamburger").width(0);
            $(".wrapper").removeClass("hamburger-active");
            $(this).removeClass("module-hamburger-close");
        }

    });
    // If Click on [ Document ] and this click outside [ hamburger panel ]
    $(document).on("click", function (e) {
        if ($(e.target).is(".hamburger-panel,.hamburger-panel .list-links,.hamburger-panel .list-links a,.hamburger-panel .social-share,.hamburger-panel .social-share a i,.hamburger-panel .social-share a,.hamburger-panel .copywright") === false) {
            $(".wrapper").removeClass("page-transform"); // Remove the class .active form .module when click on outside the div.
            $(".module-side-nav").removeClass("module-active");
            e.stopPropagation();
        }
    });

    // If Click on [ Document ] and this click outside [ module ]
    $(document).on("click", function (e) {
        if ($(e.target).is(".module, .module-content, .search-form input,.cart-control .btn,.cart-overview a.cancel,.cart-box") === false) {
            $module.removeClass("module-active"); // Remove the class .active form .module when click on outside the div.
            e.stopPropagation();
        }
    });

    /* ------------------  MOBILE MENU ------------------ */
    var $dropToggle = $("ul.dropdown-menu [data-toggle=dropdown]"),
        $module = $(".module");
    $dropToggle.on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass("open");
        $(this).parent().toggleClass("open");
    });

    $module.on("click", function () {
        $(this).toggleClass("toggle-module");
    });
    $module.find("input.form-control", ".btn", ".module-cancel").click(function (e) {
        e.stopPropagation();
    });

    /* ------------------ HEADER AFFIX ------------------ */
    var $navAffix = $(".header-fixed .navbar-fixed-top");
    $navAffix.affix({
        offset: {
            top: 50
        }
    });

    /* ------------------  COUNTER UP ------------------ */
    $(".counting").counterUp({
        delay: 10,
        time: 1000
    });


    /* ------------------  AJAX MAILCHIMP ------------------ */
    $('.mailchimp').ajaxChimp({
        url: "http://wplly.us5.list-manage.com/subscribe/post?u=91b69df995c1c90e1de2f6497&id=aa0f2ab5fa", //Replace with your own mailchimp Campaigns URL.
        callback: chimpCallback

    });

    function chimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscribe-alert').html('<h5 class="alert alert-success">' + resp.msg + '</h5>').fadeIn(1000);
            //$('.subscribe-alert').delay(6000).fadeOut();

        } else if (resp.result === 'error') {
            $('.subscribe-alert').html('<h5 class="alert alert-danger">' + resp.msg + '</h5>').fadeIn(1000);
        }
    }

    /* ------------------  AJAX CAMPAIGN MONITOR  ------------------ */
    $('#campaignmonitor').submit(function (e) {
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Error: " + data.Message);
                } else { // 200
                    alert("Success: " + data.Message);
                }
            });
    });

    /* ------------------ OWL CAROUSEL ------------------ */
    $(".carousel").each(function () {
        var $Carousel = $(this);
        $Carousel.owlCarousel({
            loop: $Carousel.data('loop'),
            autoplay: $Carousel.data("autoplay"),
            margin: $Carousel.data('space'),
            nav: $Carousel.data('nav'),
            dots: $Carousel.data('dots'),
            center: $Carousel.data('center'),
            dotsSpeed: $Carousel.data('speed'),
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: $Carousel.data('slide-rs'),
                },
                1000: {
                    items: $Carousel.data('slide'),
                }
            }
        });
    });
    /* ------------------ MAGNIFIC POPUP ------------------ */
    var $imgPopup = $(".img-popup");
    $imgPopup.magnificPopup({
        type: "image"
    });
    $('.img-gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */
    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /* ------------------  ROUNDED SKILL ------------------ */
    $(window).on("scroll", function () {
        var skill = $('.skill'),
            scrollTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            roundedSkill = $('.rounded-skill');
        if (roundedSkill.length) {
            var wScroll = scrollTop + windowHeight,
                skillScroll = skill.offset().top + skill.outerHeight();
            if (wScroll > skillScroll) {
                roundedSkill.each(function () {
                    $(this).easyPieChart({
                        duration: 1000,
                        enabled: true,
                        scaleColor: false,
                        size: $(this).attr('data-size'),
                        trackColor: false,
                        lineCap: $(this).attr('data-line'),
                        lineWidth: $(this).attr('data-width'),
                        barColor: $(this).attr('data-color'),
                        animate: 5000,
                        onStep: function (from, to, percent) {
                            $(this.el).find('.prcent').text(Math.round(percent));
                        }
                    });
                });
            }
        }
    });

    /* ------------------ GALLERY FLITER ------------------ */
    var $galleryFilter = $(".gallery-filter"),
        galleryLength = $galleryFilter.length,
        galleryFinder = $galleryFilter.find("a"),
        $galleryAll = $("#gallery-all");

    // init Isotope For gallery
    galleryFinder.on("click", function (e) {
        e.preventDefault();
        $galleryFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (galleryLength > 0) {
        $galleryAll.imagesLoaded().progress(function () {
            $galleryAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    galleryFinder.on("click", function (e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $galleryAll.imagesLoaded().progress(function () {
            $galleryAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------  FOLLOW INSTAGRAM ------------------ */
    var instafeedSidebar = $('#instafeedSidebar').length,
        InstaUserID = '6541563850',
        /*YOUR_USER_ID*/
        InstaAccessToken = '6541563850.1677ed0.dd29bed64bee43e1be15068bf2b92687'; /*YOUR_ACCESS_TOKEN*/

    if (instafeedSidebar > 0) {

        var userFeedSidebar = new Instafeed({
            target: 'instafeedSidebar',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-plus"></i></div></a>',
            resolution: 'low_resolution',
        });
        userFeedSidebar.run();
    }

    /* ------------------  SCROLL TO ------------------ */
    var aScroll = $('a[data-scroll="scrollTo"]');
    aScroll.on('click', function (event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            if ($(this).hasClass("menu-item")) {
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
            }
        }
    });

    /* ------------------ PROGRESS BAR ------------------ */
    if ($(".skills").length > 0) {
        $(window).scroll(function () {
            var skillsTop = $(".skills").offset().top - 50,
                skillsHight = $(this).outerHeight(),
                wScroll = $(window).scrollTop();
            if (wScroll > skillsTop - 1 && wScroll < skillsTop + skillsHight - 1) {
                $(".progress-bar").each(function () {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
            }
        });
    }

    if ($(".skills-scroll").length > 0) {
        $(".progress-bar").each(function () {
            $(this).width($(this).attr('aria-valuenow') + '%');
        });
    }

    /* ------------------ SLIDER RANGE ------------------ */
    var $sliderRange = $("#slider-range"),
        $sliderAmount = $("#amount");
    $sliderRange.slider({
        range: true,
        min: 0,
        max: 500,
        values: [50, 300],
        slide: function (event, ui) {
            $sliderAmount.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $sliderAmount.val("$" + $sliderRange.slider("values", 0) + " - $" + $sliderRange.slider("values", 1));

}(jQuery));
