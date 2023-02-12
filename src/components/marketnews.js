import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./marketnews.css"

function MarketNews() {
    const [news, setNews] = useState([]);
    const [hover, setHover] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c438c515ea0b4fbeac4abe9f87b6a396`);
            setNews(response.data.articles);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Latest Market News</h2>
            <div className="row">
                {news.map((item, index) => (
                    <div key={index} className="col-3 " onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}>
                        <div className={`card ${hover === index ? 'hovered' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <a href={item.url} className="btn btn-primary">Read more</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MarketNews;
