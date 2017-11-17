
const jáliyah = {
  init() {
    this.eventListeners();
  },
  eventListeners() {
    $('.hamburger').click(() => $('.nav').slideToggle());
    $('.nav-item.dropdown').click(() => window.location = 'about.html');
  }
};

$(() => jáliyah.init());
