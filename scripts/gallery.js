var $, ZingTouch;

const debounce = (func, wait = 0) => {
  let calling;
  return (...args) => {
    clearTimeout(calling);
    calling = setTimeout(() => func(...args), wait);
  };
};

const gallery = {
  init(images) {
    this.images = images;

    this.createImages();
    this.arrows();
    this.galleryModals();
    this.bottomSelect();
    this.gallerySwipe();
  },
  currImg: 0,
  createImages() {
    // gallery
    this.images
      .map(({ src, description, credit }) => {
        const container = $('<div class="hover-img-container">');
        const img = $(`<img src="${src}" />`);
        const desc = $('<div class="description">').text(description);

        if (credit) {
          const cred = $('<div class="credit">').text(credit);
          desc.append(cred);
        }

        return container.append(img).append(desc);
      })
      .map((c, i) => i === 0 ? c.addClass('current-img') : c)
      .reverse()
      .map(c => c.insertAfter('.imgs .last-img'));

    // bottom select
    this.images
      .map(({ src }) => {
        const container = $('<div class="bottom-image">');
        const img = $(`<img src="${src}" />`);
        return container.append(img);
      })
      .map((c, i) => i === 0 ? c.addClass('bottom-current first-img') : c)
      .map(c => $('.bottom-select').append(c));

    this.imgs = Array.from($('.hover-img-container'));
  },
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
    Number.prototype.isAround = function isAround(n, range = 20) {
      return this < n + range && this > n - range;
    };

    const containerElement = $('.imgs')[0];
    const activeRegion = ZingTouch.Region(containerElement);
    Array.from($('.hover-img-container')).forEach((c) =>
      activeRegion.bind(c, 'swipe', (event) => {
        console.log('swipping');
        const direction = event.detail.data[0].currentDirection;
        if (direction.isAround(180)) { // 180 - left
          // console.log('left');
          this.nextImg();
        } else if (direction.isAround(360)) { // 360 - right
          // console.log('right');
          this.lastImg();
        } else {
          // console.log(direction);
        }
      }));
  },
};

$(() => {
  $.getJSON('resources/gallery.json', ({ images }) => gallery.init(images));
});
