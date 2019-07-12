import React, { Component } from "react";
import {
  View,
  Text,
  Content,
  Spinner,
  Icon,
  Col,
  Grid,
  Row,
  Card,
  CardItem,
  Body,
  H1,
} from "native-base";
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";

const sliderWidth = Dimensions.get("window").width;
const itemWidth = sliderWidth;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const sliderHeight = parseInt(viewportHeight * 0.5);
export default class ImageSlider extends Component {
  state = {
    data: [],
    currentIndex: 0
  };
  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    const currentIndex = this.props.navigation.getParam('index');

    this.setState({
      data,
      currentIndex,
    });
  }
  _share = async () => {
    const { longitude, latitude } = this.state.data[this.state.currentIndex];
    const url = encodeURI(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${latitude},${longitude}&zoom=100`
    );

    // const shareOptions = {
    //   title: 'Share Place',
    //   url,
    //   failOnCancel: false,
    //   social: Share.Social.WHATSAPP,
    // };

    // try {
    //   const ShareResponse = await Share.open(shareOptions);
    //   console.log(JSON.stringify(ShareResponse));
    // } catch (error) {
    //   console.log('Error =>', error);
    // }
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.url }}
          style={{ ...styles.itemImage }}
          resizeMode="cover"
        />
      </View>
    );
  }

  _handleSnap = index => {
    this.setState({
      currentIndex: index
    });
  };

  render() {
    if (!this.state.data.length) {
      return (
        <View style={styles.center}>
          <Spinner color="#04293F" size={50} />
        </View>
      );
    }

    const firstItem = this.props.navigation.getParam('index');
    const currentData =
      this.state.data.length && this.state.data[this.state.currentIndex];
    return (
      <Content>
        <View style={{ ...styles.contentContainer }}>
          <Carousel
            data={this.state.data}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            slideStyle={{ width: viewportWidth, marginLeft: 0, marginRight: 0 }}
            firstItem={firstItem}
            useScrollView={true}
            onSnapToItem={this._handleSnap}
            activeSlideOffset={10}
            style={{ ...styles.items }}
          />
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.6]}
            colors={["transparent", "rgba(0,0,0,0.4)"]}
            style={{ ...styles.items, ...styles.iconsContainer }}
          >
            <TouchableOpacity style={{ ...styles.iconsBtn }}>
              <Icon
                style={{ color: "#fff" }}
                name="thumbs-up"
                type="FontAwesome"
              />
              <Text style={{ ...styles.iconText }}>{currentData.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._share}
              style={{ ...styles.iconsBtn }}
            >
              <Icon
                style={{ color: "#fff" }}
                name="share-alt"
                type="FontAwesome"
              />
              <Text style={{ ...styles.iconText }}>Share </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <Card>
          <CardItem>
            <Body>
              <Row>
                <Col>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Photographer
                  </Text>
                  <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                    {currentData.photographer}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Location
                  </Text>
                  <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                    Lat: {" " + currentData.latitude},
                    {` Long:${currentData.longitude}`}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Date</Text>
                  <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                    {new Date(currentData.createdAt).toDateString()}
                  </Text>
                </Col>
              </Row>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <H1>Description</H1>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                {currentData.description}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    height: sliderHeight
  },

  itemImage: {
    flex: 1,
    height: sliderHeight
  },

  contentContainer: {
    position: 'relative',
    height: sliderHeight
  },
  items: {
    position: 'absolute',
    left: 0,
    right: 0,
    left: 0
  },
  itemImage: {
    flex: 2,
    height: sliderHeight
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
    bottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconsBtn: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: 'center',
  }
});
