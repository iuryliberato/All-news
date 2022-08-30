import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from "./images/logo.png"
import spinner from "./images/spinner1.gif"


const App = () => {

  const [articleNews, setArticleNews] = useState([])
  const [activeArticle, setActiveArticle] = useState()
  const [search, setSearch] = useState('')
  const [url, setUrl] = useState('all')
  const [error, setError] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://free-news.p.rapidapi.com/v1/search?q=${url}&page=${pageNumber}`,
          {
            headers: {
              'X-RapidAPI-Key': '09842dab04mshe31fa8e370e59f8p1e602ajsn6ac665e52cc0',
              'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
            }
          }) // * <-- replace with your endpoint
        console.log('e', url)
        setArticleNews(currentArticles => currentArticles.concat(data.articles))

        console.log(data.page)
      } catch (error) {
        setError(true)
      }

    }
    getData()
  }, [url, pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setArticleNews([])
  }, [url])


  useEffect(() => {
    if (activeArticle) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [activeArticle])

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }


  return (

    <>
      <header>
        <img className="logo" src={logo} alt="logo" />
      </header>
      <nav>
        <div className="search">
          <input type="search" placeholder="Search News 🔎" onChange={onSearch}></input>
        </div>
        <select onChange={handleUrl}>
          <option value="all">All News</option>
          <option value="Sports">Sports</option>
          <option value="tv">TV</option>
          <option value="weather">Weather</option>
          <option value="politics">Politics</option>
          <option value="music">Music</option>
          <option value="travel">Travel</option>
          <option value="health">Heath</option>
          <option value="culinary">Culinary</option>
        </select>
      </nav>
      {articleNews.length ? (
        <>
          {
            articleNews.filter(news => (
              news.title.toLowerCase().includes(search.toLowerCase())
            )).map(news => (
              <div className="container">
                <div key={news._id} className="card">
                  <img className="images-card" src={news.media} alt={news.title} />
                  <div className="description">
                    <h2>{news.title}</h2>
                    <p>{news.published_date}</p>
                    <button onClick={() => setActiveArticle(news)}>View more</button>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="load-more-bt">
            <button onClick={() => setPageNumber(pageNumber + 1)} className="load-more">Load more</button>
          </div>
          {
            activeArticle && (
              <div>
                <div className="popUp active">
                  <div className="popUpInner">
                    <div>
                      <img className="image" src={activeArticle.media} alt={activeArticle.title} />
                      <h2>{activeArticle.title}</h2>
                      <p>{activeArticle.topic}</p>
                      <p>{activeArticle.published_date}</p>
                    </div>
                    <p className="summary">{activeArticle.summary}</p>

                    <p className="summary">Rights: {activeArticle.rights}</p>

                    <div className="buttons">
                      <a className="close" href={activeArticle.link} target="_blank" rel="noreferrer">View full Article</a>
                      <button className="close" onClick={() => setActiveArticle(null)}>Close</button>
                    </div>
                  </div>
                </div>

              </div>
            )
          }
        </>
      )
        :
        <>
          {error ?
            <h3>Oops something went wrong.</h3>
            :
            <div className="load-more-bt">
              <img src={spinner} alt={spinner} />
            </div>
          }
        </>
      }

    </>

  )

}

export default App
