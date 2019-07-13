import React, { Component, Fragment } from 'react';
import { Button, Text, View, Content, Thumbnail, Spinner } from 'native-base';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet } from "react-native";
import fakeData from "./data.json";
import RadioForm from 'react-native-simple-radio-button';

const baseUrl = 'http://192.168.56.1';

export default class Gallery extends Component {
  state = {
    images: []
  };

  _sortData = (byLikes, d) => {
    if (byLikes) {
      d.sort((a, b) => {
        return b.likes - a.likes;
      });
    } else {
      d.sort((a, b) => {
        let dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
    }
    return d;
  };

  _fetchData = () => {
    return fetch(`${baseUrl}/myphpcode/gallary.php`);
  };

  componentDidMount() {
    // let sortedData = this._sortData(0, fakeData); // by defualt data should be order by date
    // this.setState({
    //   images: sortedData
    // });
    this._fetchData()
      .then(data => data.json())
      .then(d => {
        const transformedData = d.map(item => ({
          id: item.id,
          placeName: item.place_name,
          location: item.location,
          description: item.description,
          url: `${baseUrl}/${item.image}`, //image should be converted base64 format or blob
          // url: 'https://picsum.photos/400/400?' + parseInt(Math.random() * 500),
          photographer: item.photographer_name,
          // likes: parseInt(item.likes),
          likes: parseInt(Math.random() * 1000),
          createdAt: item.date
        }));

        let sortedData = this._sortData(0, transformedData); // by defualt data should be order by date

        this.setState({
          images: sortedData
        });
        // console.log(this.state.images);
      })
      .catch(e => console.log(e.message));
  }

  _handleRadioClick = value => {
    const sortedData = this._sortData(value, this.state.images);
    this.setState({
      images: sortedData,
    });
  };

  _renderThumbnail = ({ item, index }) => {
    const { navigation } = this.props;

    return (
      <CustomThumbnail
        navigation={navigation}
        image={item}
        images={this.state.images}
        index={index}
      />
    );
  };

  render() {
    if (!this.state.images.length) {
      return (
        <View style={styles.center}>
          <Spinner color="#04293F" size={50} />
        </View>
      );
    }
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.btnContainer}>
          <RadioForm
            radio_props={[
              { label: "Most Recent", value: 0 },
              { label: "Most Popular", value: 1 }
            ]}
            style={styles.RadioForm}
            initial={0}
            onPress={this._handleRadioClick}
            formHorizontal={true}
            animation={true}
            labelHorizontal={true}
            buttonColor={'#04293F'}
            selectedButtonColor={'#04293F'}
          />
        </View>
        <FlatGrid
          spacing={2}
          itemDimension={100}
          items={this.state.images}
          renderItem={this._renderThumbnail}
        />
      </ScrollView>
    );
  }
}

const CustomThumbnail = ({ image, index, navigation, images }) => {
  const handlePress = () => {
    navigation.navigate("ImageSlider", {
      images,
      index
    });
  };
  return (
    <TouchableOpacity style={{ height: 100, flex: 1 }} onPress={handlePress}>
      <Image source={{ uri: image.url }} style={styles.item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 5,
  },
  item: {
    flex: 1
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RadioForm: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingTop: 6,
    paddingBottom: 6
  }
});
