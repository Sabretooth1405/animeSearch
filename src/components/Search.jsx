import React, { useState } from 'react'

import './Search.css'
const normaliseString = (str1, str2) => {
    const len = Math.min(str1.length, str2.length)
    let str3;
    let str4;
    if (len !== 0) {
        str3 = str1.substring(0, len - 1)
        str4 = str2.substring(0, len - 1)
    }
    return [str3, str4]
}
const validator = (str1, str2) => {
    let str3 = str1.replace(/\s/g, '').toLowerCase()
    let str4 = str2.replace(/\s/g, '').toLowerCase()

    if (str4.includes(str3) || str3.includes(str4)) {

        return true;
    }
    return false;
}
const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const searchValueChangeHandler = (e) => {
        setSearchValue(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        search(props.resultHandler)
        setSearchValue('')
    }
    async function search(queryResultHandler) {
        let mangaObj = {}
        let animeObj = {}
        let jsonId;
        let id;
        try {
            const resIdFetch = await fetch(`https://api.consumet.org/manga/mangadex/${searchValue}`)
            jsonId = await resIdFetch.json()
            id = jsonId.results[0].id
        }
        catch (err) {
            console.log(err)
            mangaObj = {}
            animeObj = {}
            queryResultHandler([mangaObj, animeObj])
            return;
        }



        console.log(id)
        const mangaTitle = jsonId.results[0].title
        let mangaDescription = jsonId.results[0].description
        const mangaStatus = jsonId.results[0].status
        let currenChapterJson;
        let currentChapterId;
        try {
            const currentChapterFetch = await fetch(`https://api.mangadex.org/chapter?manga=${id}&translatedLanguage[]=en&order[volume]=desc&order[chapter]=desc`)
            currenChapterJson = await currentChapterFetch.json()
            currentChapterId = currenChapterJson.data[0].id
        }
        catch (err) {
            console.log(err)
            mangaObj = {}
            animeObj = {}
            queryResultHandler([mangaObj, animeObj])
            return;
        }
        let animeTitle;

        const currenChapterNum = currenChapterJson.data[0].attributes.chapter

        const currentChapterLink = `https://mangadex.org/chapter/${currentChapterId}`
        let animeFetch;
        let animeJson;
        try {
            animeFetch = await fetch(`https://api.consumet.org/anime/enime/${searchValue}`)
            animeJson = await animeFetch.json()
            animeTitle = animeJson.results[0].title
        }
        catch (err) {
            console.log(err)
            mangaObj = {
                'title': mangaTitle,
                'description': mangaDescription,
                'status': mangaStatus,
                'chap': currenChapterNum,
                'link': currentChapterLink,
                'img': null
            }
            animeObj = {}
            queryResultHandler([mangaObj, animeObj])
            return;
        }
        const mangaImageUrl = animeJson.results[0].image
        const animeImageUrl = animeJson.results[0].cover
        const officialName = animeJson.results[0].title
        const animeStatus = animeJson.results[0].status
        let animeDescription = animeJson.results[0].description
        const urlTitle = officialName.replace(/\s+/g, '-').toLowerCase();
        const firstEpisodeurl = `https://enime.moe/watch/${urlTitle}/1`
        const normalDescription = normaliseString(mangaDescription, animeDescription)
        mangaDescription = normalDescription[0]
        animeDescription = normalDescription[1]
        mangaObj = {
            'title': mangaTitle,
            'description': mangaDescription,
            'status': mangaStatus,
            'chap': currenChapterNum,
            'link': currentChapterLink,
            'img': mangaImageUrl
        }

        animeObj = {
            'title': animeTitle,
            'description': animeDescription,
            'status': animeStatus,
            'link': firstEpisodeurl,
            'img': animeImageUrl
        }
        if (!validator(searchValue, mangaTitle)) {
            mangaObj = {}
        }
        if (!validator(searchValue, animeTitle)) {
            animeObj = {}
        }



        queryResultHandler([mangaObj, animeObj])
    }
    return (
        <section id="search">

            <div class="search">
                <input type="text" class="searchTerm" placeholder="What are you looking for?" value={searchValue} onChange={searchValueChangeHandler} />
                <button type="submit" class="searchButton" onClick={submitHandler}>
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <h2>Search from our Database of 25,000 Manga and Anime</h2>

        </section>
    )


}
export default Search;
