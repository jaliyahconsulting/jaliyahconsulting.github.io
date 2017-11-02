var $;

const index = {
    init() {
        this.sendEventListeners();
    },
    sendEventListeners() {
        // hamburger slide toggle
        $('#nav-hamburger').click(() => $('#nav-hamburger nav').slideToggle(400));    
    }
};

$(() => index.init());
