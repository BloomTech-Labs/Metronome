$(document).ready(function(e) {

    'use strict';

     setTimeout(function(e){
          $('body').addClass('loaded');
      }, 5000);

    $('#countdown').countdown({
        timestamp : (new Date('2017/09/21 12:34:56'))
    });

    $('#countdown2').countdown({
        timestamp : (new Date('2016/12/21 12:34:56'))
    });


    $('.main-open').click(function(e){
      $('.main-nav').slideToggle(300); 
    });

     $('.main-nav').onePageNav();

     $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });


  


    $('.popup-img').magnificPopup({
    delegate: '.lightbox',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    },
    retina: {
      ratio: 2, // Increase this number to enable retina image support.
      // Image in popup will be scaled down by this number.
      // Option can also be a function which should return a number (in case you support multiple ratios). For example:
      // ratio: function(e) { return window.devicePixelRatio === 1.5 ? 1.5 : 2 }
      
      
      replaceSrc: function(item) {
        return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
      } // function that changes image source
    }
  });



    $('.owlCarousel').owlCarousel({
        items:3,
        margin:20,
        dots:true,
        nav:true,
        autoplay:true,
        navText:['',''],
        navSpeed:600,
        autoHeight : true,
        responsive:true,
        responsive:{
          
           991:{
            items:3,
           },
           767:{
            items:2,
           },
            480:{
                items:1,
           },

           100:{
                items:1,
           }
        }
    });

    $('.banner-owlCarousel').owlCarousel({
        items:1,
        margin:0,
        dots:false,
        nav:false,
        autoplay:true,
        navText:['',''],
        navSpeed:600,
        autoHeight : true,
    });

    $('.single_slider').owlCarousel({
        items:1,
        margin:0,
        dots:true,
        autoplay:true,
        nav:false,
        navText:['',''],
        navSpeed:600,
        autoHeight : true,
    });

    $('.client-slider').owlCarousel({
        items:4,
        margin:20,
        autoplay:true,
        dots:false,
        nav:false,
        navText:['',''],
        navSpeed:600,
        autoHeight : true,
        responsive:true,
        responsive:{
          
           991:{
            items:4,
           },
           767:{
            items:3,
           },
           480:{
            items:2,
           },
           100:{
            items:1,
           }
        }
    });

    $('#tab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical    
        width: 'auto', //auto or any width like 600px
        fit: true,   // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        activate: function(event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#tabInfo');
            var $name = $('span', $info);

            $name.text($tab.text());

            $info.show();
        }
    });


    $('#slider').owlCarousel({
      stagePadding: 150,
      loop:true,
      margin:0,
      autoplay:false,
      dots:false,
      nav:true,
      navText:[,],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:1
          }
      }
    })

     $("#testimonial-slider").owlCarousel({
        items:2,
        itemsDesktop:[1000,2],
        itemsDesktopSmall:[979,2],
        itemsTablet:[767,1],
        pagination:true,
        autoPlay:true
    });



    // validate form on keyup and submit
    $("#contactform").validate({
      rules: {
        contactname: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        subject: {
          required: true,
          minlength: 2
        },
        message: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        contactname: {
          required: "Please enter your name",
          minlength: jQuery.format("Your name needs to be at least {0} characters")
        },
        email: {
          required: "Please enter a valid email address",
          minlength: "Please enter a valid email address"
        },
        subject: {
          required: "You need to enter a subject!",
          minlength: jQuery.format("Enter at least {0} characters")
        },
        message: {
          required: "You need to enter a message!",
          minlength: jQuery.format("Enter at least {0} characters")
        }
      },
      // set this class to error-labels to indicate valid fields
      success: function(label) {
        label.addClass("checked");
      },
      submitHandler: function(e) {
        $('#contactform').prepend('<p class="loaderIcon"><img src="img/loader.gif" alt="Loading..."></p>');
        var name = $('input#contactname').val();
        var email = $('input#email').val();
        var subject = $('input#subject').val();
        var message = $('textarea#message').val();

        $.ajax({
          type: 'post',
          url: 'sendMail.php',
          data: 'contactname=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message,
          success: function(results) {
            $('#contactform p.loaderIcon').fadeOut(1000);
            $('#contactform div.response').html(results);
          }
        }); 

        $(':input','#contactform').not(':button, :submit, :reset, :hidden').val('');

      }
    });

 
    //Theme settings
    var con     = $('.themes_settings'),
      opener    = $('.trigger a'),
      colorGroup  = $('.color-set .tot-colors a'),
      bgGroup     = $('.bgTheme .groupBg a'),
      cssName, cssUrl;

    //Check Session
    if(typeof($.session.get("cssName")) != "undefined" && $.session.get("cssName") !== null){

      cssName = $.session.get('cssName');
      cssUrl = "css/colors-css/" + cssName + '.css';
      $('.colorCssStyles').prop('href', cssUrl);

      colorGroup.removeClass('active');
      $('.'+cssName).addClass('active');
    }else{
      //Set default color in session
      $.session.set("cssName", "default");
    }
    //console.log(cssName);

    con.animate({right: '-214px'},800);
    $.session.set("compareLeftContent", "value");
    //Open & Close
    opener.click(function(e){
      e.preventDefault();
      //con = $(this).parents().find(con);
      var conPos = con.css('right');
      if(conPos != '0px'){
        con.animate({right: '0px'},700,'swing');
      }
      else{
        con.animate({right: '-214px'},900,'swing');
      }
    });

    //Color Settings
    colorGroup.click(function(e){
      colorGroup.removeClass('active');
      var $this = $(this);
      $this.addClass('active');
      cssName = $.session.set("cssName", $this.data('css')).get('cssName');
      cssUrl = "css/colors-css/" + cssName + '.css';
      //console.log(cssName);
      $('.colorCssStyles').prop('href', cssUrl);
      
      e.preventDefault();
      
    });
    
  
});


