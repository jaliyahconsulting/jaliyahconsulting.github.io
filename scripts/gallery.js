var $, Hammer;

const debounce = (func, wait = 0) => {
  let calling;
  return (...args) => {
    clearTimeout(calling);
    calling = setTimeout(() => func(...args), wait);
  };
};

const gallery = {
  init() {
    this.imgs = Array.from($('.hover-img-container'));
    this.arrows();
    this.galleryModals();
    this.bottomSelect();
    this.gallerySwipe();
  },
  currImg: 0,
  changeImage(newImageIndex) {
    $(this.imgs[this.currImg]).removeClass('current-img');
    $(this.imgs[newImageIndex]).addClass('current-img');

    $(this.imgs[newImageIndex]).addClass('animated fadeIn');

    $(`[data-index=${this.currImg}]`).removeClass('bottom-current');
    $(`[data-index=${newImageIndex}]`).addClass('bottom-current');
    this.currImg = newImageIndex;
  },
  lastImg() {
    let changeTo = this.currImg;
    if (this.currImg - 1 < 0) changeTo = this.imgs.length;
    this.changeImage(changeTo - 1);
  },
  nextImg() {
    let changeTo = this.currImg;
    if (this.currImg + 1 >= this.imgs.length) changeTo = -1;
    this.changeImage(changeTo + 1);
  },
  arrows() {
    $('.last-img, .next-img').hover(
      function() { $(this).children('a').children('i').addClass('shake'); },
      function() { $(this).children('a').children('i').removeClass('shake'); }
    );

    $('.last-img a').click(() => this.lastImg());

    $('.next-img a').click(() => this.nextImg());
  },
  galleryModals() {
    const modal = (e, id) => {
      id = `modal-${id}`;

      const desc = e.children('.description').clone();
      const img = e.children('img').clone();
      const content = $('<div class="modal-content">');
      const dialog = $('<div class="modal-dialog modal-lg" role="document">');
      const modal = $(`<div class="modal fade" id=${id} tabindex="-1" role="dialog" aria-hidden="true">`);

      content.append(img, desc);
      dialog.append(content);
      modal.append(dialog);

      return modal.append(dialog);
    };
    let imgs = $('.hover-img-container');
    imgs = Array.from(imgs)
      .map($)
      .map(e => e.attr('data-toggle', 'modal'))
      .map((e, i) => e.attr('data-target', `#modal-${i}`))
      .map((e, i) => $('.imgs').append(modal(e, i)));
  },
  bottomSelect() {
    Array.from($('.bottom-image')).forEach((e, i) => $(e).attr('data-index', i));

    $('.bottom-image').click(function() {
      const index = $(this).attr('data-index');
      gallery.changeImage(Number(index));
    });
  },
  gallerySwipe() {
    const gallery = new Hammer($('.imgs')[0]);

    gallery.on('panleft', debounce(() => this.lastImg(), 100));
    gallery.on('panright', debounce(() => this.nextImg(), 100));
  },
};

$(() => gallery.init());
