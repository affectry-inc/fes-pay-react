import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

class ComAct extends Component {
  render() {
    return (
      <Grid>
        <Row center='xs'>
          <Col xs={ 12 }>
            <h2>特定商取引法に基づく表記</h2>
          </Col>
        </Row>
        <Row center='xs'>
          <Col xsOffset={ 1 } xs={ 10 } sm={ 8 } md={ 6 }>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>事業者</p>
              </Col>
              <Col xs={ 8 }>
                <p>株式会社JEPCO</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>代表者</p>
              </Col>
              <Col xs={ 8 }>
                <p>代表取締役　守屋　大</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>所在地</p>
              </Col>
              <Col xs={ 8 }>
                <p>〒107-0052<br/>東京都港区赤坂2-13-5 赤坂會舘ビルB1</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>電話番号</p>
              </Col>
              <Col xs={ 8 }>
                <p>03-6385-0904<br/>※電話でのお問い合わせは対応致しかねます。下記、お問い合わせ先へご連絡ください。</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>お問い合わせ</p>
              </Col>
              <Col xs={ 8 }>
                <p>info@fespay.ioまでお問合せ下さい。<br/>お問い合わせ順に対応しておりますが､回答までお時間をいただく場合がございます｡何卒ご了承下さいませ｡<br/>受付時間：平日10:00-18:00（土日祝日を除く）</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>サービスのホームページ</p>
              </Col>
              <Col xs={ 8 }>
                <p>https://www.fespay.io</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>商品代金</p>
              </Col>
              <Col xs={ 8 }>
                <p>各店舗の店頭に掲示</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>商品代金以外の必要料金</p>
              </Col>
              <Col xs={ 8 }>
                <p>消費税</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>商品引渡時期</p>
              </Col>
              <Col xs={ 8 }>
                <p>店頭にて即時</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>支払方法</p>
              </Col>
              <Col xs={ 8 }>
                <p>QRコードに事前登録済みのクレジットカード</p>
              </Col>
            </Row>
            <Row start='xs' middle='xs'>
              <Col xs={ 4 }>
                <p>返品・交換について</p>
              </Col>
              <Col xs={ 8 }>
                <p>商品を購入した各店舗に直接お問い合わせください。返品の場合はクレジットカード決済のキャンセル処理が行われます。</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComAct)
