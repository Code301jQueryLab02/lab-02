'use strict';

function Creature(creature) {
  // this.title = creature.title;
  // this.image_url = creature.image_url;
  // this.description = creature.description;
  // this.keyword = creature.keyword;
  // this.horns = creature.horns;

  for(let key in creature){
    this[key] = creature[key];
  }
}

Creature.allCreatures = [];
Creature.keywords = [];

Creature.prototype.render = function() {
}

Creature.prototype.toHtml = function() {
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}

let pageNumber = 1;

Creature.readJson = () => {
  // $('main').empty();
  $.get(`../data/page-${pageNumber}.json`)
    // issue right now is that it's reinstatiating everything
    .then(data => {
      data.forEach(item => {
        Creature.allCreatures.push(new Creature(item));
      });
    })
    .then(Creature.loadCreatures);
};

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(creature => {
    // creature.render();
    $('#creatures').append(creature.toHtml());
  });
  Creature.popList();
};

Creature.popList = () => {
  const keywordsTemp = [];
  Creature.allCreatures.forEach(item => keywordsTemp.push(item.keyword));
  const set = new Set(keywordsTemp);
  set.forEach( element => {
    $('select').append($('<option></option>)').text(element).val(element));
  });
}

$('select').on('change', function() {
  let $targetImage = $(this).val();
  $('section').hide();
  $(`section.${$targetImage}`).show();
});

// nav handler
$('nav a').on('click', function() {
  let $whereToGo = $(this).data('tab');  
  if ($whereToGo === 'page1') {
    pageNumber = 1;
    Creature.readJson();
  } else if ($whereToGo === 'page2') {
    pageNumber = 2;
    Creature.readJson();
  }
});

$(() => Creature.readJson())
