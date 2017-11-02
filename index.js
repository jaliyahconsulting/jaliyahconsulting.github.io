var $;

const index = {
    init() {
        this.sendEventListeners();
    },
    sendEventListeners() {
        $('#nav-hamburger').click(() => $('#nav-hamburger nav').slideToggle(400));    
    }
};

$(() => index.init());
