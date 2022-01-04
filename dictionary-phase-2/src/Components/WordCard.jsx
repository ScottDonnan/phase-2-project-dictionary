import { useState } from "react"
import Card from "../styled/card"
import styled from "styled-components"

function WordCard({isLiked, searchWord, addWordToDatabase, isLoggedIn, loggedInUser, addWordToFavorites, favoriteWords}) {
    // const [isLiked, setIsLiked] = useState(true)

   const subdirectory = searchWord.hwi?.prs[0].sound.audio[0]
   const soundFile = searchWord.hwi?.prs[0].sound.audio 
   const audioElement = new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${soundFile}.mp3`)

   let isImage = true
   let image

   const searchWordOrg = searchWord.hwi.hw
   const searchWordName = searchWordOrg.replace('*', '')

   if(searchWord.art?.artid) {
    isImage = true
    const imageDirectory = searchWord.art.artid 
    image = `https://www.merriam-webster.com/assets/mw/static/art/dict/${imageDirectory}.gif`
   } else {
       isImage = false
   }
    
   const wordToBeFavorite = { name: searchWord.meta.id,
                      pronunciation: searchWord.hwi.prs[0].mw
                    }

   const playAudio = () => {
       audioElement.play()
   }

   function removeWordFromFavorites() {
       console.log('remove favorite')
   }

   const favNameList = favoriteWords.map(fav => fav.name)
   const favoriteButton = <div>{favNameList?.includes(searchWord.meta.id) ? <LikeButton onClick={() => removeWordFromFavorites(wordToBeFavorite, loggedInUser)}>'❤️'</LikeButton> : 
   <LikeButton onClick={() => addWordToFavorites(wordToBeFavorite, loggedInUser)}>'🤍'</LikeButton>}</div>

  
   let count = 1
    return(
        <Card>
            <h2>{searchWordName} 
                {loggedInUser ? favoriteButton : null}
            </h2>
            <h3>{searchWord.hwi.prs[0].mw}</h3>
            <PlayButton onClick={playAudio}>Say Word</PlayButton>
            {searchWord.shortdef.map((word, index) => {
                return <p key={index}>Definition {count}: {word}</p>
                console.log('counter', count)
                count = count + 1
                })}
            {isImage ? <img src={image}/> : null}            
        </Card>
    )
}

export default WordCard

const PlayButton = styled.button`
    background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6  51%, #2BC0E4  100%)}  
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    font-family: Helvetica; sans-serif;
    transition: 0.5s;
    background-size: 200% auto;
    color: black;            
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: center;
          }

          &:hover {
            background-position: right center; 
            color: #fff;
            text-decoration: none;       
`

const LikeButton = styled.button`
    background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6  51%, #2BC0E4  100%)}  
    padding: 15px;
    text-align: center;
    text-transform: uppercase;
    font-family: Helvetica; sans-serif;
    transition: 0.5s;
    background-size: 200% auto;
    color: black;            
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: center;
          }

          &:hover {
            background-position: right center; 
            color: #fff;
            text-decoration: none;       
`