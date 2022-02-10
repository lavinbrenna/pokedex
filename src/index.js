import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './pokemon.js';

function clearFields(){
  $("#nameInput").val("");
  $("#showErrors").text("");
}

function getElements(response){
  if (response){
    $("#name").text(response.name);
    $("#output").append(`<img src="${response.sprites.front_default}">`);
    $("#output").append(`<ul id="abilities">`);
    console.log(response.name);
    for(let i = 0; i < response.abilities.length; i++){
      $("#abilities").append(`<li>${response.abilities[i].ability.name}</li>`);
    }
  }else{
    $("#showErrors").text( `There was an error: ${response}`);
  }
}

$(document).ready(function(){
  $("#pokeSearch").on("click", function(){
    console.log("click");
    const pokeName = $("#nameInput").val();
    clearFields();
    Pokemon.getPokemon(pokeName)
      .then(function(response){
        getElements(response);
      });
  });
});