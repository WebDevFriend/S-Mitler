import "./import/modules";
import $ from "jquery";
import "./import/mmenu";
import "../../node_modules/slick-carousel/slick/slick";
import "../../node_modules/selectize/dist/js/standalone/selectize.min";
import "../../node_modules/jquery.maskedinput/src/jquery.maskedinput";

const jQuery = $;

$(function() {

	if(window.matchMedia('(max-width: 480px)').matches){
		// do functionality on screens smaller than 480px
		$(".site-header").css("background", "linear-gradient(132deg, rgba(21,21,21,1) 15%, rgba(85,85,85,1) 94%)");
	}

	new Mmenu( "#my-menu", {
       "extensions": [
          "pagedim-black",
          "position-right",
          "theme-dark"
       ],
       "navbar": {
          	"title": '<img src="../img/svg/logo-1.svg" alt="Салон красоты Смитлер">'
          }

    });

	 var menu = new Mmenu( "#my-menu" );
	    var api = menu.API;

	    api.bind( "open:finish", function() {
	    	$('.hamburger').addClass('is-active');
	    });
	    api.bind( "close:finish", function() {
	    	$('.hamburger').removeClass('is-active');
	    });

    $('.carousel__services').slick({
    	prevArrow: '<i class="fas fa-angle-double-left prev-arrow"></i>',
    	nextArrow: '<i class="fas fa-angle-double-right next-arrow"></i>',
    	slidesToShow: 3,
	    slidesToScroll: 1,
	    responsive: [
	    	{
		      breakpoint: 1200,
		      settings: {
		        arrows: false,
		        slidesToShow: 2,
		        autoplay: true,
					autoplaySpeed: 4000
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        arrows: false,
		        slidesToShow: 1,
		        autoplay: true,
					autoplaySpeed: 4000
		      }
		    }
		  ]
    });

     $('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  asNavFor: '.slider-for',
	  dots: false,
	  arrows: true,
	  centerMode: true,
	  focusOnSelect: true,
	  variableWidth: true,
	  responsive: [
	    	{
		      breakpoint: 576,
		      settings: {
		        arrows: false
		      }
		    }
	  	]
	});

    var t;
    (t = jQuery).fn.equalHeights = function() {
        var n = 0
          , e = t(this);
        return e.each(function() {
            var e = t(this).innerHeight();
            n < e && (n = e)
        }),
        e.css("height", n)
    }
    ,
    t("[data-equal]").each(function() {
        var e = t(this)
          , n = e.data("equal");
        e.find(n).equalHeights()
    }),
    $(".carousel__services_content").equalHeights();

	function carouselService(){
		$('.carousel__services_item').each(function(){
			var ths  = $(this),
				thsh = ths.find('.carousel__services_content').outerHeight();
				ths.find('.carousel__services_img').css('min-height', thsh);
		});
	}setTimeout(function() {
	    		carouselService();
	    	}, 100);

	$('.carousel__services_composition .h3').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	}); 
	$('section .h2').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
	});   

	$('select').selectize({
		create: true
	});

	$('.reviews').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true
	});

	$('.partners-carousel').slick({
		prevArrow: '<i class="fas fa-angle-left prev-arrow"></i>',
    	nextArrow: '<i class="fas fa-angle-right next-arrow"></i>',
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
	    	{
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        autoplay: true,
		        // fade: true,
				autoplaySpeed: 4000
		      }
		    },
		    {
		      breakpoint: 576,
		      settings: {
		        arrows: false,
		        slidesToShow: 1,
		        autoplay: true,
				autoplaySpeed: 4000
		      }
		    }
		  ]
	});

	$(window).scroll(function(event) {
		if($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
		/* Act on the event */
	});
	$('.top').click(function(event) {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
		/* Act on the event */
	});

	//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});
	
	jQuery(function($){
	   $("#phone").mask("+7 (999) 999-99-99");
	});

});

$(window).on('load', function(){
	$('.preloader').delay(1000).fadeOut('slow');
});