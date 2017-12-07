
const content = {
  "combined": [],
  "people": [
    {
      "title": "Dr. Ysaye M. Barnwell",
      "text": "Dr. Barnwell is a wonderful person. You can visit their website here: <a href=\"http://www.ymbarnwell.com/\">http://www.ymbarnwell.com/</a>",
      "image": {
        "src": "resources/websites/dr-barnwell.jpeg",
        "href": "http://www.ymbarnwell.com/",
        "alt": "Dr. Barnwell's Website"
      }
    },
    {
      "title": "Melissa Cardona",
      "text": "Melissa Cardona is a fantasic photographer. You can visit their website here: <a href=\"http://www.melisacardona.com/\">http://www.melisacardona.com/</a>",
      "image": {
        "src": "resources/websites/melissa-cardona.jpeg",
        "href": "http://www.melisacardona.com/",
        "alt": "Melissa Cardona's Website"
      }
    },
    {
      "title": "Hiroka (Hero) Mcrae",
      "text": "Hero is a extremely talented dancer . You can visit her on facebook here: <a href=\"https://www.facebook.com/hiroka.mcrae.7\">https://www.facebook.com/hiroka.mcrae.7</a>",
    },
  ],
  "books": [
    {
      "title": "Don't Start Me To Talking...",
      "text": "My father John O'Neal published the book <i>Don't Start Me To Talking...</i> You can find it at the <a href=\"https://www.ashecac.org/\">Ashé Cutural Arts Center</a> or the <a href=\"https://www.facebook.com/Community-Book-Center-178125373443/\">Community Book Center</a>",
      "image": {
        "src": "images/dont-start-me-to-talking.jpg",
        "href": "",
        "alt": "Don't Start Me To Talking..."
      }
    }
  ],
  "videos": [
    {
      "title": "A Conversation with John O'Neal",
      "text": "I love this video of my father.",
      "video": {
        "link": "https://www.youtube.com/watch?v=lnwQ4Lr0lqU",
        "embedded": "https://www.youtube.com/embed/lnwQ4Lr0lqU"
      }
    },
    {
      "title": "John O'Neal Performance and Social Change - USA",
      "text": "My father speaking.",
      "video": {
        "link": "https://www.youtube.com/watch?v=evv64tv8cYQ",
        "embedded": "https://www.youtube.com/embed/evv64tv8cYQ"
      }
    }
  ],
  "organizations": [
    {
      "title": "Junebug Productions",
      "text": "Junebug Productions has been with me for a long time. Check out their website here: <a href=\"https://junebugproductions.org/\">https://junebugproductions.org/</a>",
      "image": {
        "src": "resources/websites/junebug-productions.png",
        "href": "https://junebugproductions.org/",
        "alt": "Junebug Productions's website"
      }
    },
    {
      "title": "Alternate ROOTS",
      "text": "Alternate ROOTS is a great organization. Visit their website here: <a href=\"https://alternateroots.org/\">https://alternateroots.org/</a>",
      "image": {
        "src": "resources/websites/alternate-roots.jpeg",
        "href": "https://alternateroots.org/",
        "alt": "Alternate ROOTS's website"
      }
    },
    {
      "title": "Highlander Center",
      "text": "Highlander Center is an organization with a beautiful mission. Find out more about them on their website here: <a href=\"http://highlandercenter.org/\">http://highlandercenter.org/</a>",
      "image": {
        "src": "resources/websites/highlander-center.png",
        "href": "http://highlandercenter.org/",
        "alt": "Highlander Center's website"
      }
    },
    {
      "title": "Southerners On New Ground (SONG)",
      "text": "Southerners On New Ground is a great organization. Head on over to their website here: <a href=\"http://southernersonnewground.org/\">http://southernersonnewground.org/</a>",
      "image": {
        "src": "resources/websites/southerners-on-new-ground.png",
        "href": "http://southernersonnewground.org/",
        "alt": "Southerners On New Ground's website"
      }
    },
  ]
};

function shuffle(arr) {
  let curr = 0;
  let temp;
  let rand;

  while (curr < arr.length) {
    rand = Math.floor(Math.random() * curr);

    temp = arr[curr];
    arr[curr] = arr[rand];
    arr[rand] = temp;

    curr += 1;
  }

  return arr;
}
const { people, books, videos, organizations } = content;
content.combined = shuffle(people.concat(books, videos, organizations));

function el(elm='div', classes='', r='') {
  classes = classes ? `class="${classes}"` : '';
  return $(`<${elm} ${classes} ${r}>`);
}

var $;

const resources = {
  init() {
    this.handlers();
    this.filterContent(content.combined);
  },
  filterSelected: null,
  handlers() {
    const { combined, people, books, videos, organizations } = content;
    const filterContent = this.filterContent;

    function filterClick(filtering) {
      return function () {
        const clicked = $(this);

        if (resources.filterSelected && resources.filterSelected[0] === this) {
          clicked.removeClass('selected');
          clicked.blur();
          filterContent(combined, clicked);
        } else {
          clicked.addClass('selected');
          filterContent(filtering, clicked);
        }
      };
    }

    $('#people').click(filterClick(people));
    $('#books').click(filterClick(books));
    $('#videos').click(filterClick(videos));
    $('#organizations').click(filterClick(organizations));
  },
  filterContent(filter, clicked = null) {
    $('.content').empty();

    if (filter === content.combined) {
      resources.filterSelected = null;
    } else {
      if (resources.filterSelected) {
        console.log(resources.filterSelected)
        resources.filterSelected.removeClass('selected');
      }
      resources.filterSelected = clicked;
    }

    filter
      .map((e) => {
        const container = el('div', 'card');
        const bodyContainer = el('div', 'card-body');
        const title = el('h4', 'card-title').text(e.title);
        const text = el().append(el('p', 'card-text').html(e.text));

        let body = el();
        let mediaCol = el();
        let contentCol = el();
        let media = el();

        if (e.image) {
          body = el('div', 'row');
          mediaCol = el('div', 'mediaCol col-md-4 image');
          contentCol = el('div', 'col-md-8');

          media
            .append(el('a', '', `href="${e.image.href}" target="_blank"`)
              .append(el('img', '', `src="${e.image.src}" alt="${e.image.alt}"`)));
        } else if (e.video) {
          mediaCol = el('div', 'mediaCol video');

          media
            .append(el('iframe', '', `src="${e.video.embedded}" frameborder="0" allowfullscreen`));
        }

        mediaCol.append(media);
        contentCol.append(text);
        body.append(mediaCol, contentCol);
        bodyContainer.append(title, el('hr'), body);
        container.append(bodyContainer);

        return container;
      })
      .map(e => $('.content').append(e));
  },
};

$(() => resources.init());
