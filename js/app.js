'use strict';

function Creature(creature) {
  for(let key in creature){
    this[key] = creature[key];
  }
}

Creature.allCreatures = [];
Creature.keywords = [];

const sortByHorns = (arr) => {
  return arr.sort((a, b) => a.horns - b.horns);
}

const sortByTitle = (arr) => {
  return arr.sort((a, b) => {
    if(a.title.toLowerCase() < b.title.toLowerCase()){
      return -1;
    }
    if(a.title.toLowerCase() > b.title.toLowerCase()){
      return 1;
    }
    return 0;
  });

}

Creature.prototype.toHtml = function() {
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}

let pageNumber = 1;

Creature.readJson = () => {
  $('main').empty();
  $.get(`../data/page-${pageNumber}.json`)
    .then(data => {
      data.forEach(item => {
        Creature.allCreatures.push(new Creature(item));
      });
      sortByTitle(Creature.allCreatures)
    })
    .then(Creature.loadCreatures);
};

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(creature => {
    $('#creatures').append(creature.toHtml());
  });
  Creature.popList();
};

Creature.popList = () => {
  Creature.keywords = [];
  Creature.allCreatures.forEach(item => Creature.keywords.push(item.keyword));
  const set = new Set(Creature.keywords);
  set.forEach( element => {
    $('#filter').append($('<option></option>)').text(element).val(element));
  });
}

// Filters what creatures are shown based on what keyword is chosen from the dropdown list
$('#filter').on('change', function() {
  let $targetImage = $(this).val();
  $('section').hide();
  $(`section.${$targetImage}`).show();
});

// Sorts creature array by horns when number of horns is chose from the dropdown list
$('#sort').on('change', function() {
  if($(this).val() === 'horns'){
    sortByHorns(Creature.allCreatures);
    $('section').remove();
    Creature.loadCreatures();
  } else if($(this).val() === 'title'){
    sortByTitle(Creature.allCreatures);
    $('section').remove();
    Creature.loadCreatures();
  }
})

$('nav a').on('click', function() {
  let $whereToGo = $(this).data('tab');
  if ($whereToGo === 'page1') {
    pageNumber = 1;
    Creature.allCreatures.length = 0;
    $('#filter').empty();
    $('#filter').append($('<option></option>)').text('Filter by Keyword').val('default'));
    Creature.readJson();
  } else if ($whereToGo === 'page2') {
    pageNumber = 2;
    Creature.allCreatures.length = 0;
    $('#filter').empty();
    $('#filter').append($('<option></option>)').text('Filter by Keyword').val('default'));
    Creature.readJson();
  }
});

$(() => Creature.readJson())

