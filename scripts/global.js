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
    const resize = () => $('.dropdown-menu').css('width', $('.about-dropdown').css('width'));
    resize();
    $(window).resize(resize);
  },
};

$(() => jáliyah.init());
