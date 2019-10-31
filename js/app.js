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
  // let creatureClone = $('#photo-template, #photo-template-p2').clone();
  // let $creatureClone = $(creatureClone[0].content);
  // $creatureClone.find('h2').text(this.title);
  // $creatureClone.find('img').attr('src', this.image_url);
  // $creatureClone.find('p').text(this.description);
  // $creatureClone.find('section').attr('class', this.keyword);
  // $creatureClone.removeClass('clone');
  // $creatureClone.attr('class', this.title);
  // $creatureClone.appendTo('main');
  // Creature.keywords.push(this.keyword);


}

Creature.prototype.toHtml = function() {
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
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

$(() => Creature.readJson())
