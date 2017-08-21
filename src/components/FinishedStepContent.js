import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

const styles = {
  content: {
    marginLeft: '25px',
    paddingLeft: '21px',
    paddingRight: '16px',
    overflow: 'hidden',
    borderLeft: '1px solid rgb(189, 189, 189)',
    fontSize: '1.4em',
  },
  img: {
    width: '40%',
  },
  hide: {
    display: 'none',
  },
};

class FinishedStepContent extends Component {

  render() {
    const { text, imageUrl, hide } = this.props;

    const spanStyle = hide ? {display: 'none'} : {}

    return (
      <div style={styles.content}>
        <span style={ spanStyle }>
          {text && (<span>{text}</span>)}
          {imageUrl && (<img src={imageUrl} alt='' style={styles.img}/>)}
        </span>
      </div>
    )
  }
}

FinishedStepContent.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  hide: PropTypes.bool,
}

export default FinishedStepContent;
