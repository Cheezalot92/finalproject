import React, { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";

const StyleLi = styled.li`
  list-style-type: none;
`;

const Description = styled.p`
  font-size: 20px;
  padding-inline: 50px;
`;

const Youtube = styled.a`
  padding: 10px;
`;

const StyledButtons = styled.button`
  background-color: #ffba08;
  margin: 10px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #ffba08;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const TopAnime = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex;
  background-color: #222;
  padding: 40px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const TopAnimeTitle = styled.h2`
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const TopAnimeList = styled.ul`
  align-items: flex-end;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TopAnimeListItem = styled.li`
  padding: 20px;
  margin-left: 20px;
`;

const TopAnimeLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

const TopAnimeImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const TopAnimeRating = styled.p`
  color: #fff;
  font-size: 14px;
  margin: 0;
`;

const ShowList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  const [topAnimeList, setTopAnimeList] = useState([]);

  const fetchTopAnimeData = async () => {
    try {
      const response = await fetch(
        "https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=5&page[offset]=0"
      );
      const data = await response.json();
      setTopAnimeList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTopAnimeData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.body.scrollTop;
      if (scrollTop > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return;

    () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <NavBar />
      <div>
        <TopAnime>
          <TopAnimeTitle>Top 5 Anime</TopAnimeTitle>
          <TopAnimeList>
            {topAnimeList.map((anime) => (
              <TopAnimeListItem key={anime.id}>
                {console.log(topAnimeList)}
                <TopAnimeLink href={`/anime/${anime.id}`}>
                  <h3>{anime.attributes.canonicalTitle}</h3>
                </TopAnimeLink>
                <TopAnimeImage
                  src={anime.attributes.posterImage.small}
                  alt={anime.attributes.titles.en}
                />
                <TopAnimeRating>
                  Rating: {anime.attributes.averageRating}
                </TopAnimeRating>
              </TopAnimeListItem>
            ))}
          </TopAnimeList>
        </TopAnime>
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
          <StyledButtons onClick={() => handleCategorySearch(searchCategory)}>
            Search
          </StyledButtons>
        </div>
        <div>
          <label>
            Search by Name:
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <StyledButtons onClick={handleNameSearch}>Search</StyledButtons>
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
              <Description>
                Description: {anime.attributes.synopsis}
              </Description>
              {anime.attributes.youtubeVideoId && (
                <Youtube
                  href={`https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`}
                >
                  Watch Trailer Here!
                </Youtube>
              )}
              <StyledButtons
                onClick={() => {
                  console.log({ anime });
                  handleAddToWatchLater({
                    show_id: anime.id,
                    title: anime.attributes.titles.en,
                    year: parseInt(anime.attributes.startDate),
                    description: anime.attributes.synopsis,
                    ratings: anime.attributes.averageRating,
                    category_id: anime.attributes.parent_id,
                  });
                }}
              >
                Add To Show's I've Watched
              </StyledButtons>
            </StyleLi>
          ))}
        </ul>
        <StyledButtons onClick={() => fetchAnimeData()}>
          Load More
        </StyledButtons>
        {showScrollButton && (
          <ScrollToTopButton onClick={handleScrollToTop}>
            Scroll to Top
          </ScrollToTopButton>
        )}
      </div>
    </>
  );
};

export default ShowList;
