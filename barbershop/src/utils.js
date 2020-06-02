import jQuery from 'jquery'

export const updatePageWithJQuery = () => {
    const $ = jQuery

   /* ------------------  LOADING SCREEN ------------------ */
   // $(window).on("load", function () {
   $(".preloader").fadeOut(5000);
   $(".preloader").remove();
//   });

  /* ------------------  Background INSERT ------------------ */
  var $bgSection = $(".bg-section"),
      $bgPattern = $(".bg-pattern"),
      $colBg = $(".col-bg");

  $bgSection.each(function () {
      var bgSrc = $(this).children("img").attr("src");
      var bgUrl = 'url(' + bgSrc + ')';
      $(this).parent().css("backgroundImage", bgUrl);
      $(this).parent().addClass("bg-section");
      $(this).remove();
  });
  

  $bgPattern.each(function () {
      var bgSrc = $(this).children("img").attr("src");
      var bgUrl = 'url(' + bgSrc + ')';
      $(this).parent().css("backgroundImage", bgUrl);
      $(this).parent().addClass("bg-pattern");
      $(this).remove();
  });

  $colBg.each(function () {
      var bgSrc = $(this).children("img").attr("src");
      var bgUrl = 'url(' + bgSrc + ')';
      $(this).parent().css("backgroundImage", bgUrl);
      $(this).parent().addClass("col-bg");
      $(this).remove();
  });
  
}