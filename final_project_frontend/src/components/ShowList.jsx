import React, { useState, useEffect } from "react";

const ShowList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAnimeData = async () => {
    try {
      const response = await fetch(
        `https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=${
          (currentPage - 1) * 10
        }`
      );
      const data = await response.json();
      setAnimeList([...animeList, ...data.data]);

      if (data.links.next) {
        setCurrentPage(currentPage + 1);
      }
      console.log(data.length);
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };
    
  useEffect(() => {
    fetchAnimeData();
  }, []);

  return (
    <div>
      <h2>Anime List</h2>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            <h3>{anime.attributes.titles.en}</h3>
            <img
              src={anime.attributes.posterImage.small}
              alt={anime.attributes.titles.en}
            />
                <p>Rating: {anime.attributes.averageRating}</p>
                <p>Description: {anime.attributes.synopsis }</p>
          </li>
        ))}
      </ul>
      <button onClick={() => fetchAnimeData()}>Load More</button>
    </div>
  );
};

export default ShowList;
