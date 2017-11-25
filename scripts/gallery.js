var $;

const gallery = {
  init() {
    this.imgs = Array.from($('.hover-img-container'));
    this.arrows();
    this.galleryModals();
    this.bottomSelect();
  },
  currImg: 0,
  changeImage(newImageIndex) {
    $(this.imgs[this.currImg]).removeClass('current-img');
    $(this.imgs[newImageIndex]).addClass('current-img');

    $(`[data-index=${this.currImg}]`).removeClass('bottom-current');
    $(`[data-index=${newImageIndex}]`).addClass('bottom-current');
    this.currImg = newImageIndex;
  },
  arrows() {
    $('.last-img a').click(() => {
      let changeTo = this.currImg;
      if (this.currImg - 1 < 0) changeTo = this.imgs.length;
      this.changeImage(changeTo - 1);
    });

    $('.next-img a').click(() => {
      let changeTo = this.currImg;
      if (this.currImg + 1 >= this.imgs.length) changeTo = -1;
      this.changeImage(changeTo + 1);
    });
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
};

$(() => gallery.init());
