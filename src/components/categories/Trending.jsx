import React, { Component } from 'react';
import axios from 'axios'

import AnimatedBox  from '../reusable/AnimatedBox.jsx'

import '../styles/Trending.css'

class Trending extends Component {
  state = {
    recentItems: []
  }
  componentWillMount() {
    const quantity = { quantity: 8 }
    axios.post('http://localhost:4000/api/listing/recents', quantity)
    .then(res => {
      console.log(res)
      let { recentItems } = this.state
      recentItems = [...recentItems, ...res.data]
      this.setState({ recentItems: recentItems })
    })
  }
  render() {

    return (
      <div>
        <AnimatedBox />
        <div className="hotContainer">
          <h1>New Gear</h1>
          <hr />
            <div className="hotItems">
              {
                this.state.recentItems.map((item, key) => {
                  return (
                    <div key={key} className="imgContainer">
                      <div className="imgPreview no-hover">
                        <a href={`/listings/${item._id}`}>
                        <img
                          src={item.photos[0].image} 
                          alt={item.brand}
                          className="imgContent"
                          />
                        </a>
                        <p>{item.brand}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        </div>
      </div>
    )
  }
}

export default Trending
