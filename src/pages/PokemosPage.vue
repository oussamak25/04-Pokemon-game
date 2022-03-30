<template>
    <!-- como tenemos unas condiciones que dependen una de otra podemos usar el if y el else -->
    <h1 v-if="!pokemon">Espere porfavor</h1>
    <div v-else>
      <h1>Quien es este Pokemón?</h1>
      <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <pokemon-options :pokemons="pokemonArr" @selectionPokemon="checkAnswer"/>
      <!-- podemos usar template en vez de div -->
      <template v-if="showAnswer">
            <h2 >{{message}}</h2>
            <button @click="newGame">Nuevo juego</button>
      </template>
    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/Pokemon-options.vue'
import getPokemonsOptions from '@/helpers/getPokemonOptions'

console.log(getPokemonsOptions())
export default {
  components: { PokemonPicture, PokemonOptions },
  //data metodo que debe retornar un objeto y es reactivo si cambia algo se renderiza y se cambia
  data(){
    return{
      pokemonArr:[],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray(){
      this.pokemonArr=await getPokemonsOptions()
      //floor redondera y quitar decimales
      const rndInt = Math.floor (Math.random() * 4)

      this.pokemon = this.pokemonArr[ rndInt]
    },
    checkAnswer(pokemonId){
        this.showPokemon=true
        this.showAnswer=true
        if(pokemonId===this.pokemon.id){
          this.message=`Correcto, ${this.pokemon.name}`
        }else{
          this.message=`Ooops, era ${this.pokemon.name}`
        }
    },
    newGame(){
      this.pokemonArr=[],
      this.pokemon= null,
      this.showPokemon= false,
      this.showAnswer= false,
      this.message= '',
      this.mixPokemonArray()
    }
  },
  mounted(){
    this.mixPokemonArray()
  }

}
</script>

<style>

</style>