import React from "react"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

import axios from "../axios"
import "./Row.css"

const BASE_URL = "https://image.tmdb.org/t/p/original"

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = React.useState([])
  const [trailerUrl, setTrailerUrl] = React.useState("")

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl)

      setMovies(response.data.results)
      return response
    }

    fetchData()
  }, [fetchUrl])

  const chooseMovie = async (_movie) => {
    if (trailerUrl) {
      setTrailerUrl("")
    } else {
      try {
        const movieTrailerUrl = await movieTrailer(_movie?.name || "")
        const urlParams = new URLSearchParams(new URL(movieTrailerUrl).search)

        setTrailerUrl(urlParams.get("v"))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <div className="row">
      <h3 className="row__title"> {title}</h3>
      <div className="row__posters">
        {movies.map((_movie) => (
          <div
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={_movie.id}
            onClick={() => chooseMovie(_movie)}
          >
            <img
              className="row__poster--img"
              src={`${BASE_URL}${
                isLargeRow ? _movie.poster_path : _movie.backdrop_path
              }`}
              alt={_movie.name}
            />
            {/* <p className="row__poster--label">{_movie.name}</p> */}
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
