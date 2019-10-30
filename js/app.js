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
  $creatureClone.removeClass('clone');
  $creatureClone.attr('class', this.title);
  $creatureClone.appendTo('main');
  Creature.keywords.push(this.keyword);
}

Creature.readJson = () => {
  $.get('../data/page-1.json')
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
  console.log(set);
  set.forEach( element => {
    $('select').append($('<option></option>)').text(element).val(element));
  });
}

$(() => {
  Creature.readJson();
});
