'use strict';

function Creature(creature) {
  this.title = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
}

Creature.allCreatures = [];
Creature.keywords = [];

Creature.prototype.render = function() {
  let creatureClone = $('#photo-template').clone();
  let $creatureClone = $(creatureClone[0].content);
  $creatureClone.find('h2').text(this.title);
  $creatureClone.find('img').attr('src', this.image_url);
  $creatureClone.find('p').text(this.description);
  $creatureClone.find('section').attr('class', this.keyword);
  $creatureClone.removeClass('clone');
  $creatureClone.attr('class', this.title);
  $creatureClone.appendTo('main');
  Creature.keywords.push(this.keyword);
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
  Creature.allCreatures.forEach(creature => creature.render());
  Creature.popList();
};

Creature.popList = () => {
  const set = new Set(Creature.keywords);
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
