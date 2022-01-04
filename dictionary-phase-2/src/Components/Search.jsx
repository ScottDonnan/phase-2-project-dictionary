import { useState } from "react";
import styled from "styled-components";

function Search ({getWordDefinition, getWordSynonym, setSearchWord, setThesaurusSearchWord}) {
    const [searchValue, setSearchValue] = useState("") 
    const [searchSwitcher, setSearchSwitcher] = useState(true)
    
    function handleChange(e) {
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // setSearchWord(value => value = '')
        // setThesaurusSearchWord(value => value = '')
        searchSwitcher ? getWordDefinition(searchValue) : getWordSynonym(searchValue)
    }

    const setSwitchTrue = () => setSearchSwitcher(switcher => switcher = true)
    const setSwitchFalse = () => setSearchSwitcher(switcher => switcher = false)
    
    
    return(
        <SearchPage>
            <Form onSubmit={handleSubmit}>
                <SearchBar type="text" name="search" value={searchValue} onChange={handleChange} />
                <SearchButton type="submit" value="Submit">Search</SearchButton>
            </Form>
            {searchSwitcher ? <ButtonStyled onClick={setSwitchTrue}>Dictionary</ButtonStyled> : <Button onClick={setSwitchTrue}>Dictionary</Button>}
            {searchSwitcher ? <Button onClick={setSwitchFalse}>Thesaurus</Button> : <ButtonStyled onClick={setSwitchTrue}>Thesaurus</ButtonStyled>}
        </SearchPage>
    )
}

export default Search

const SearchPage = styled.div `
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 20px;
  font-family: Helvetica, sans-serif
  margin: 80px 100px;
  box-shadow: 0 0 20px rgba(0, 0, 0, .5), 0 0 40px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`

const Form = styled.form `
    display: flex;
    font-family: Helvetica, sans-serif;
    border-radius: 15px;
`
const ButtonStyled = styled.button `
    font-family: Helvetica, sans-serif;
    background-color: #3165a5;
    padding: 15px 45px;
    margin: 10px;
    
    color: white;
    border-radius: 15px;

`
const Button = styled.button`
    background-color: white;
    font-family: Helvetica, sans-serif;
    padding: 15px 45px;
    margin: 10px;
    color: black;
    border-radius: 15px;
`
const SearchButton = styled.button`
    background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6  51%, #2BC0E4  100%)}  
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    font-family: Helvetica; sans-serif;
    transition: 0.5s;
    background-size: 200% auto;
    color: black;            
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: block;
          }

          &:hover {
            background-position: right center; 
            color: #fff;
            text-decoration: none;
          
         
`

const SearchBar = styled.input `
    font-family: Helvetica, sans-serif;
    display: flex;
    border-radius: 15px;
    width: 75%;
    height: 75%;
    font-size: 30px;

`
