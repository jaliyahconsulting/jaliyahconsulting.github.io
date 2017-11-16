
$(() => {
  $('.submit').click(() =>
    setTimeout(() => $('.submitted').fadeIn(), 1000)
  );
});
