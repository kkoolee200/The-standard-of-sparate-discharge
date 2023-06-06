import React, { Component } from 'react';
import './App.css';

import ReactPlayer from 'react-player'
 
class Video extends Component {
  render () {
    return <ReactPlayer id="video"
    url='https://www.youtube.com/watch?v=R0emsxjTkdw' controls/>
  }
}

export default Video;