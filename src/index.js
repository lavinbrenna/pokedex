import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './pokemon.js';

function clearFields(){
  $("#nameInput").val("");
  $("#showErrors").text("");
  $("#output").text("");
}

function getElements(response){
  if (response){
    let name = toTitleCase(response.name);
    $("#output").append(`<h2>${name}</h2>
    <img src="${response.sprites.front_default}">
    <h4>Type</h4>
    <ul id="type">`);
    for(let i = 0; i < response.types.length; i++){
      $("#type").append(`<li>${response.types[i].type.name}</li>`);
    }
    $("#output").append(`</ul><h4>Abilities</h4><ul id="abilities">`);
    console.log(response.name);
    for(let i = 0; i < response.abilities.length; i++){
      $("#abilities").append(`<li>${response.abilities[i].ability.name}</li>`);
    }
  }else{
    $("#showErrors").text( `There was an error: ${response}`);
  }
}
function toTitleCase(str){
  let name = [];
  name = str.split('');
  let firstLetter = name[0].toUpperCase();
  name.shift();
  name.unshift(firstLetter);
  return name.join('');
}
$(document).ready(function(){
  $("#pokeSearch").on("click", function(){
    console.log("click");
    const pokeName = $("#nameInput").val().toLowerCase();
    if(pokeName != ""){
      clearFields();
      Pokemon.getPokemon(pokeName)
        .then(function(response){
          getElements(response);
        });
    }else{
      $("#showErrors").text(`I'm sorry you must enter the name of a pokemon`);
    }

  });
});