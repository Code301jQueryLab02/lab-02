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
  $.get(`../data/page-${pageNumber}.json`) //replace 1 with template literal variable and then depending on which button you click it will set variable to one or two
    .then(data => {
      data.forEach(item => {
        Creature.allCreatures.push(new Creature(item));
      });
    })
    .then(Creature.loadCreatures);
};

// Creature.readJson2 = () => {
//   $.get('../data/page-2.json') //replace 1 with template literal variable and then depending on which button you click it will set variable to one or two
//     .then(data => {
//       data.forEach(item => {
//         Creature.allCreatures.push(new Creature(item));
//         console.log(Creature.allCreatures);
//       });
//     })
//     .then(Creature.loadCreatures);
// };

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(creature => creature.render());
  Creature.popList();
};

Creature.popList = () => {
  const set = new Set(Creature.keywords);
  // console.log(set);
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
  // the following outputs "where to go page1" or "where to go page2" to the console depending on which link is clicked
  
  // $('#' + $whereToGo).Creature.readJson();
  
  if ($whereToGo === 'page1') {
    pageNumber = 1;
    Creature.readJson();
  } else if ($whereToGo === 'page2') {
    // console.log('hi');
    pageNumber = 2;
    // console.log(pageNumber);
    Creature.readJson();
    // console.log(Creature.allCreatures)
  }
  
  
  // $('.tab-content').hide();
  // // we want $('#delegation')
  // $('#' + $whereToGo).fadeIn(750);
});


// $('a').on('click', function() {
//   console.log('hi');
// });

$(() => Creature.readJson())




// // nav handler
// $('nav a').on('click', function() {
//   let $whereToGo = $(this).data('tab');
//   // what is $whereToGo
//   // gives us 'delegation' or 'attributes'
//   console.log('$where to go', $whereToGo);
//   $('.tab-content').hide();
//   // we want $('#delegation')
//   $('#' + $whereToGo).fadeIn(750);
// });

// // event logger
// function logTarget() {
//   console.log('this', this);
//   console.log('$(this)', $(this));

//   let $target = $(this).text();
//   let $newFeedback = $('#feedback p:first-child').clone();

//   $newFeedback.text(`You clicked on ${$target}`);
//   $('#feedback').append($newFeedback);
// }

// // not delegated - event bound to all the 'li's
// // no selector specified in .on() method
// $('#menu-main li').on('click', logTarget);

// // delegated - event is bound to parent
// // 'li' is specified in .on()
// $('#menu-secondary').on('click', 'li', logTarget);

// // button handlers
// $('button[name=add-main]').on('click', function() {
//   let $newLi1 = $('#menu-main li:first').clone();
//   $newLi1.text('New primary list item');
//   $('#menu-main').append($newLi1);
// });

// $('button[name=add-secondary]').on('click', function() {
//   let $newLi2 = $('#menu-secondary li:first').clone();
//   $newLi2.text('New secondary list item');
//   $('#menu-secondary').append($newLi2);
// });

// $('button[name=clear]').on('click', function() {
//   $('.log-item:first').siblings().remove();
// });

// // checkbox handler - change event.
// // shows difference between attr & prop
// $('input[name=check]').on('change', function() {
//   let $checkbox = $(this);

//   $('#checked-state').html('.attr("checked"): ' + $checkbox.attr('checked') + '<br>.prop( "checked" ): ' + $checkbox.prop('checked'));

// }).change();

// // select box filtering
// $('select[name="icecream"]').on('change', function() {
//   let $selection = $(this).val();
//   $('img').hide();
//   $(`img[data-flavor="${$selection}"]`).show();

// // DOM-ready function
// $(document).ready(function() {
//   $('.tab-content').hide();
// });
