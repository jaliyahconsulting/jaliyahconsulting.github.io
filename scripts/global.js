
const jáliyah = {
  init() {
    this.eventListeners();
  },
  eventListeners() {
    $('.hamburger').click(() => $('.nav').slideToggle());
  }
};

$(() => jáliyah.init());
