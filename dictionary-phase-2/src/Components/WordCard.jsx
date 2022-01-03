import { useState } from "react"
import Card from "../styled/card"
import styled from "styled-components"

function WordCard({isLiked, searchWord, addWordToDatabase, isLoggedIn, loggedInUser}) {
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
//    const handleLike = () => {       
//        if (isLiked === true){
//            addWordToDatabase(likedObj)
//        } else if (isLiked === false){
//            console.log('nothing to add here!')
//        }
//    }
   
   


   const playAudio = () => {
       audioElement.play()
   }

  
   let count = 1
    return(
        <Card>
            <h2>{searchWordName} 
                {isLoggedIn ? <LikeButton onClick={() => addWordToDatabase(wordToBeFavorite, loggedInUser.id)}>{isLiked ? '❤️' : '🤍' }</LikeButton> : null}
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