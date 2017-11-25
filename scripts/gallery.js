var $;

const gallery = {
  init() {
    this.imgs = Array.from($('.hover-img-container'));
    this.arrows();
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
    $('.last-img').click(() => {
      let changeTo = this.currImg;
      if (this.currImg - 1 < 0) changeTo = this.imgs.length;
      this.changeImage(changeTo - 1);
    });

    $('.next-img').click(() => {
      let changeTo = this.currImg;
      if (this.currImg + 1 >= this.imgs.length) changeTo = -1;
      this.changeImage(changeTo + 1);
    });
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
