import React, { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";

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

      // Add category search parameter
      if (searchCategory) {
        apiUrl += `&filter[categories]=${searchCategory}`;
      }

      // Add name search parameter
      if (searchName) {
        apiUrl += `&filter[text]=${searchName}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (currentPage === 1) {
        // If it's the first page, set the new data
        setAnimeList(data.data);
      } else {
        // If it's not the first page, append the new data to the existing list
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
    setCurrentPage(1); // Reset page to 1 when searching
    setAnimeList([]); // Clear existing data when searching
    fetchAnimeData();
  };

  const handleNameSearch = () => {
    setCurrentPage(1); // Reset page to 1 when searching
    setAnimeList([]); // Clear existing data when searching
    fetchAnimeData();
  };

  useEffect(() => {
    fetchAnimeData();
  }, [searchCategory, searchName]);

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
          </label>
          <button onClick={handleNameSearch}>Search</button>
        </div>
        <ul>
          {animeList.map((anime) => (
            <li key={anime.id}>
              <h3>{anime.attributes.titles.en}</h3>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.titles.en}
              />
              <p>Rating: {anime.attributes.averageRating}</p>
              <p>Description: {anime.attributes.synopsis}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => fetchAnimeData()}>Load More</button>
      </div>
    </>
  );
};

export default ShowList;
