import { useEffect, useState } from "react"
import Card from "../styled/card"

function FavoriteList({handleDeleteFavorite, loggedInUser, favoriteWords}) {

    let listOfFavorites =
        favoriteWords.map(word => {
        return <li key={word.id}>
                    {word.name}
                    <button onClick={() => handleDeleteFavorite(word)}>❌</button>
                </li>
        })
    
    return(
        <Card>
            <h2>{loggedInUser ? `${loggedInUser.username}'s Favorite Words` : 'Favorite Words'}</h2>
            {listOfFavorites}
        </Card>
    )
}

export default FavoriteList