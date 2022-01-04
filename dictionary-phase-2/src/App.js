import React from 'react';
import { useState } from 'react';
import Search from './Components/Search';
import WordOfTheDay from './Components/WordOfTheDay';
import FavoriteList from './Components/FavoriteList';
import NavBar from './Components/NavBar';
import NewUserForm from './Components/NewUserForm';
import WordCard from './Components/WordCard';
import ThesaurusCard from './Components/ThesaurusCard';
import { Route, Switch } from 'react-router-dom'


function App() {
  const [searchWord, setSearchWord] = useState('')
  const [loggedInUser, setLoggedInUser] = useState([{}])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [favList, setFavList] = useState([])
  const [thesaurusSearchWord, setThesaurusSearchWord] = useState("")
  const [isLiked, setIsLiked] = useState(true)
  const [favoriteArray, setFavoriteArray] = useState([])
 
  
  function getWordDefinition(searchValue) {
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${searchValue}?key=818a2b96-1647-4667-8769-8f3de5ad1509`)
    .then(r => {
          
            if (r.ok) {
              r.json().then(data => {
                  if (data[0].meta) {
                    setSearchWord(data)
                  } else {
                    alert("word not found")
                  }
              })
            }
    })}

  function getWordSynonym(searchValue) {
    fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${searchValue}?key=bf67571a-955e-4874-aa11-d4d40d976166`)
    .then(r => r.json())
    .then(data => setThesaurusSearchWord(data))
  }

  function userLogin(e, creds) {
    e.preventDefault()
    fetch("users/1")
    .then(resp=>{
      if (resp.ok) {
        resp.json().then(user => {
          setLoggedInUser(user)
          setIsLoggedIn(true)
        })
      } else {
        resp.json().then(data => console.log(data))
      }
    })}

      // if(users.length > 0){
      //   setLoggedInUser(users)
      //   setIsLoggedIn(true)
      //   alert('good job brother u logged in')
     


  // const addWordToDatabase = (favoritedWordObj, userObj) => { 
  //   fetch('words', {
  //     method: 'POST', 
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(favoritedWordObj)
  //     }
  //   )
  //   .then(res=>res.json())
  //   .then(wordObj=>linkedFavorites(wordObj, userObj))
  // }

  
  const addWordToFavorites = (wordObj, userObj) => {
    const userFavObj ={
      user_id: userObj.id,
      name: wordObj.name
        }
      fetch('favorites', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userFavObj)
      })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setIsLiked(true)
            console.log(data)
          })
        }
      })
      
  }

  // const grabFavorites = () => {
  //   setFavList(value => value = [])
  //   fetch(`http://localhost:3001/user/${loggedInUser.id}/favorites?_expand=words`)
  //   .then(res=>res.json())
  //   .then(data => anotherFunction(data))
  // }
      

  const anotherFunction = (data) => {
      data.forEach(objs=>{ 
      fetch(`http://localhost:3001/words/${objs.wordId}`)
      .then(res=>res.json())
      .then(data=> {
        const favObj = {...data, favoriteID: objs.id}
        setFavList(value=>[...value, favObj])})
      })
    }
      

  function handleDeleteFavorite(favID) {
    fetch(`http://localhost:3001/favorites/${favID}`, {
      method: 'DELETE'
    })
    // .then(grabFavorites())
  }
  
  return (
    <div>
      <Switch>
          <Route path="/newuser">
            <NewUserForm />
          </Route>
          <Route path="/randomword">
            <WordOfTheDay />
          </Route>
          <Route path="/">
            <NavBar userLogin={userLogin} loggedInUser={loggedInUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <Search getWordDefinition={getWordDefinition} getWordSynonym={getWordSynonym} setSearchWord={setSearchWord} setThesaurusSearchWord={setThesaurusSearchWord}/> 
            {searchWord? <WordCard isLiked={isLiked} addWordToFavorites={addWordToFavorites} isLiked={isLiked} searchWord={searchWord[0]} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/> : null}
            {thesaurusSearchWord? <ThesaurusCard thesaurusSearchWord={thesaurusSearchWord[0]} /> : null}
            <FavoriteList handleDeleteFavorite={handleDeleteFavorite} favList={favList} isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;

