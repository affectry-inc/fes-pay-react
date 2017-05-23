import React, { PropTypes, Component } from 'react'

const styles = {
  content: {
    marginLeft: '25px',
    paddingLeft: '21px',
    paddingRight: '16px',
    overflow: 'hidden',
    borderLeft: '1px solid rgb(189, 189, 189)',
  },
  img: {
    width: '500px',
  }
};

class FinishedStepContent extends Component {

  render() {
    const { text, imageUrl } = this.props;

    return (
      <div style={styles.content}>
        <span>
          {text && (<span>{text}</span>)}
          {imageUrl && (<img src={imageUrl} style={styles.img}/>)}
        </span>
      </div>
    )
  }
}

FinishedStepContent.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default FinishedStepContent;
