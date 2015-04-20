
$(function() {
// this makes the images on the front page shuffle
    $('.frontPageImage img:gt(0)').hide(); // to hide all but the first image when page loads

    setInterval(function()
    {
        $('.frontPageImage :first-child').fadeOut(1000)
            .next().fadeIn(1000).end().appendTo('.frontPageImage');
    },2000);


// To highlight the current nav
  $("#About a:contains('About')").parent().addClass('active');
  $("#Viewall a:contains('View all')").parent().addClass('active');
  $("#Signup a:contains('Sign up')").parent().addClass('active');

});


