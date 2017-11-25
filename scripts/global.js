var $;

const jáliyah = {
  init() {
    this.eventListeners();
    this.dropDown();
  },
  eventListeners() {
    $('.hamburger').click(() => $('.nav').slideToggle());
    $('.nav-item.dropdown').click(() => window.location = 'about.html');
  },
  dropDown() {
    $('.dropdown-menu').css('width', $('.about-dropdown').css('width'));
    $(window).resize(() =>
      $('.dropdown-menu').css('width', $('.about-dropdown').css('width')));
  },
};

$(() => jáliyah.init());
