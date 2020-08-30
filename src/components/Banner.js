import React from "react"
import axios from "../axios"
import request from "../requests"
import { trunccate } from "../services/helpers"

import "./Banner.css"

const BASE_URL = "https://image.tmdb.org/t/p/original"

const Banner = (props) => {
  const [movie, setMovie] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchRomanceMovies)
      const { results } = response.data

      setMovie(results[Math.floor(Math.random() * results.length - 1)])

      return response
    }

    fetchData()
  }, [])

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundImage: `url(${BASE_URL}${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.original_title}
          </h1>
          <div className="banner__buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <p className="banner__description">
            {trunccate(movie?.overview, 150)}
          </p>
        </div>
        <div className="banner__fadeBottom"></div>
      </header>
    </>
  )
}

Banner.propTypes = {}

export default Banner
