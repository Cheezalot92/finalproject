import React, { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";

const StyleLi = styled.li`
  list-style-type: none;
`;

const ShowList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");

  const fetchAnimeData = async () => {
    try {
      let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=${
        (currentPage - 1) * 10
      }`;

      // category search..
      if (searchCategory) {
        apiUrl += `&filter[categories]=${searchCategory}`;
      }

      // name search..
      if (searchName) {
        apiUrl += `&filter[text]=${searchName}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (currentPage === 1) {
        // first page , set new data.
        setAnimeList(data.data);
      } else {
        // if not first page , add more data.
        setAnimeList((prevList) => [...prevList, ...data.data]);
      }

      if (data.links.next) {
        setCurrentPage(currentPage + 1);
      }
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySearch = (category) => {
    setSearchCategory(category);
    setCurrentPage(1);
    setAnimeList([]);
    fetchAnimeData();
  };

  const handleNameSearch = () => {
    setCurrentPage(1);
    setAnimeList([]);
    fetchAnimeData();
  };

  useEffect(() => {
    fetchAnimeData();
  }, [searchCategory, searchName]);

  const handleAddToWatchLater = async (show) => {
    await fetch("http://127.0.0.1:8000/shows/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(show),
    });
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>Anime List</h2>
        <div>
          <label>
            Search by Category:
            <input
              type="text"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
          </label>
          <button onClick={() => handleCategorySearch(searchCategory)}>
            Search
          </button>
        </div>
        <div>
          <label>
            Search by Name:
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button onClick={handleNameSearch}>Search</button>
          </label>
        </div>
        <ul>
          {animeList.map((anime) => (
            <StyleLi key={anime.id}>
              <a href={`/anime/${anime.id}`}>
                <h3>{anime.attributes.titles.en}</h3>
              </a>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.titles.en}
              />
              <p>Rating: {anime.attributes.averageRating}</p>
              <p>Description: {anime.attributes.synopsis}</p>
              <button
                onClick={() => {
                  console.log({ anime });
                  handleAddToWatchLater({
                    show_id: anime.id,
                    title: anime.attributes.titles.en,
                    year: parseInt(anime.attributes.startDate),
                    description: anime.attributes.synopsis,
                    ratings: anime.attributes.averageRating,
                    category_id: anime.attributes.parent_id,
                    // category: ,
                    // category_name: ,
                  });
                }}
              >
                Add To Watch Later
              </button>
            </StyleLi>
          ))}
        </ul>
        <button onClick={() => fetchAnimeData()}>Load More</button>
      </div>
    </>
  );
};

export default ShowList;
