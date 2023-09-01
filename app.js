const div = document.querySelector('div')

let players;

const fetchPlayers = async () => {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players') ;
    const json = await response.json() ;
    players = json.data.players; 
    console.log(players) ;
    render() ;
} ;

const render = () => {
    const hash = window.location.hash.slice(1)*1 ;

    const html = players.map( element => {
        return ` <div> 
        <h2><a href="#${element.id !== hash ? element.id : ''}" class = "${ element.id === hash ? 'selected':''}"> 
        ${element.name} </a></h2> 
          <h2> ${element.breed} </h2>
        </div><hr>` ;
    }).join('');

    div.innerHTML = html ;

    
}

window.addEventListener('hashchange', () => {
    render() ;
})

fetchPlayers();