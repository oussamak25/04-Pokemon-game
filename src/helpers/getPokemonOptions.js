import pokemonApi from "@/api/pokemonApi"


const getPokemons = ()=>{
    //array de 650 pokemons esos son los pokemon que tiene la api 

    const pokemonsArr = Array.from(Array(650))

    //con la funcion map de los array podemos recorrer los arrays
    return pokemonsArr.map(( _ , index)=> index+1)
} 


//metodo que mezcla el array
const getPokemonsOptions = async() => {
   

    //asi mezclamos el array
    const mixedPokemons =getPokemons().sort(()=>Math.random() - 0.5)

    //splice para cortar desde el 0 al 4 y esoos valores son los que recive getPOkemonNames por argumentos
    const pokemons = await getPokemonsNames(mixedPokemons.splice(0,4))

    return pokemons
    
}

//npm install axios para crear peticiones http

const getPokemonsNames = async ([a,b,c,d]=[])=>{
    

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]
//promise .all permiite disparar varias promesas de forma simultanea como si fuesen hilos
    const [p1, p2, p3, p4] = await Promise.all(promiseArr)


    return[
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id}
    ]

}


export default getPokemonsOptions