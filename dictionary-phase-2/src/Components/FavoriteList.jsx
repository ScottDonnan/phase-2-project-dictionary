import { useEffect, useState } from "react"
import Card from "../styled/card"

function FavoriteList({handleDeleteFavorite, favList, grabFavorites, isLoggedIn, loggedInUser, favoriteWords}) {
    // const [favoriteWords, setFavoriteWords] = useState([])

    // useEffect(()=>{
    //     if(isLoggedIn === true){ 
    //         fetch(`users/favorite_words/${loggedInUser.id}`)
    //         .then(resp => resp.json())
    //         .then(words => setFavoriteWords(words))
    //     } 
    // },[isLoggedIn]) 
    
    


    let listOfFavorites =
        favoriteWords.map(word => {
        return <li key={word.id}>
                    {word.name}
                    <button onClick={() => handleDeleteFavorite(word)}>❌</button>
                </li>
        })

    // favList.map(fav=>
    //     <>
    //         <li key={fav.id}>
    //             {fav.name}
    //             <button onClick={() => handleDeleteFavorite(fav.favoriteID)}>❌</button>
    //         </li>
    //     </>
    // )
        
    
    // if (isLoggedIn === false){
    //     listOfFavorites = [null]
    //     }

    
    return(
        <Card>
            <h2>{loggedInUser ? `${loggedInUser.username}'s Favorite Words` : 'Favorite Words'}</h2>
            {listOfFavorites}
        </Card>
    )
}

export default FavoriteList