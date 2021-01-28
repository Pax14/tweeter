$(document).ready(function() {

  $('textarea').keyup(function() {

    let textCount = $(this).val().length;

    if (textCount <= 140) {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .text(140 - textCount)
    } else {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .text(140 - textCount)
        .addClass("negative")
    }
  });
}); 