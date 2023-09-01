//variable that lets me make changest to certain parts of HTML by unique id
const list = document.getElementById('list') ;
const detail = document.getElementById('detail') ;

//variable that store my selected API data
let players;

//function that lets me fetch API data to render
const fetchPlayers = async () => {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players') ;
    const json = await response.json() ;
    players = json.data.players; 
    console.log(players) ;
    render() ;
} ;

//function that helps me locate hash and render data upon hash change
const render = () => {
    const hash = window.location.hash.slice(1)*1 ;

    const html = players.map( element => {
        return ` <div> 
        <h2><a href="#${element.id !== hash ? element.id : ''}" class = "${ element.id === hash ? 'selected':''}"> 
        ${element.name} </a></h2> 
          <h2> ${element.breed} </h2>
        </div><hr>` ;
    }).join('');

    list.innerHTML = html ;

    const info = players.find( player => { return player.id === hash });
    
    let detailHTML = '' ;
    if(info){
      detailHTML = `
        <div> <h1>${info.name}</h1> <h2> ${info.breed} </h2> 
        <img src="${info.imageUrl}"> </div> `;
    } ;

    detail.innerHTML = detailHTML ;
    
} ;

//function that allows me to trigger a hashchange event listener
//triggers function to scroll to bottom of page
window.addEventListener('hashchange', () => { 
    render() ;
    window.scrollTo(0, document.body.scrollHeight);
}) ;

//calls my fetchPlayers function to page
fetchPlayers();