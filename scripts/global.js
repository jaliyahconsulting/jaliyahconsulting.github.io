var $;

const dropDown = {
  init() {
    this.eventListeners();
    this.slide();
    this.resize();
  },
  eventListeners() {
    $('.hamburger').click(() => $('.nav').slideToggle());
    $('.nav-item.dropdown').click(() => window.location = 'about.html');
  },
  slide() {
    $('.dropdown').hover(() => $('.dropdown-menu').slideToggle('fast'));
  },
  resize() {
    const resize = () => $('.dropdown-menu').css('width', $('.about-dropdown').css('width'));
    resize();
    $(window).resize(resize);
  },
};

$(() => dropDown.init());
