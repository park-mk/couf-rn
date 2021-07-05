import React from 'react';
import {
  StyleSheet,
  Text,
  View,

  FlatList,
  Dimensions,
  Button,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
// import { FileSystem } from 'expo';
import ImageTile from './ImageTile';
import { timestamp } from 'rxjs/operators';
import CameraRoll from "@react-native-community/cameraroll";
import * as MediaLibrary from 'expo-media-library'

const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photos_info:[],
      selected: {},
      after: null,
      has_next_page: true
    }
  }

  componentDidMount() {
    setInterval(
      () => this.getPhotos(),

      1000
  );


  }

  selectImage = (index) => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
  }

  getPhotos =  async () => {
   

    let { status } = await MediaLibrary.requestPermissionsAsync();
    
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
      first:10,
      after: this.state.after,
      sortBy: MediaLibrary.SortBy.creationTime,
    }).then(this.processPhotos)

   

  } 

  processPhotos = (r) => {
    
     if (this.state.after === r.end_cursor){
       alert("-1");
       return -1;
     }
     if(this.state.has_next_page===false)
     return;
   
    
    
    if(r.hasNextPage===false){
     
      return;}
   
    this.setState({
      photos_info: this.state.photos_info.concat(r.assets)
    });
   
     

     this.state.photos_info.sort(function (a, b) {
      if (a.creationTime < b.creationTime) {
        return 1;
      }
      if (a.creationTime > b.creationTime) {
        return -1;
      }
      return 0;
    });
   
    let uris = this.state.photos_info.map(i => i.uri);
   
    this.setState({
      photos: [...new Set(uris)],
      after: r.endCursor,
      has_next_page: r.hasNextPage 
    });
  }

  getItemLayout = (data, index) => {
    let length = width / 4;
    return { length, offset: length * index, index }
  }

  prepareCallback() {
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      return (selected[index])
    });

    let files = selectedPhotos
        .map(i => FileSystem.getInfoAsync(i, { md5: true }))
    let callbackResult = Promise
        .all(files)
        .then(imageData => {
          return imageData.map((data, i) => {
            return { file: selectedPhotos[i], ...data }
          })
        })
    this.props.callback(callbackResult)
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText = selectedCount + ' Selected';
    if (selectedCount === this.props.max) headerText = headerText + ' (Max)';
    return (
        <View style={styles.header}>

          <TouchableOpacity

              onPress={() => this.props.callback(Promise.resolve([]))}

          >
            <Image
                style={{
                  width: 90, flex: 1,
                  height: 90, alignContent: 'center',
                }}
                resizeMode={'contain'}
                source={require('../../../assets/clear.png')}
            />
          </TouchableOpacity>
          <Text
              style={{
                fontSize: 30,
                fontFamily: 'title-font'
              }}
          >{headerText}</Text>

          <TouchableOpacity


              onPress={() => this.prepareCallback()}

          >
            <Image
                style={{
                  width: 90, flex: 1, marginLeft: 18,
                  height: 90, alignContent: 'center',
                }}
                resizeMode={'contain'}
                source={require('../../../assets/submit.png')}
            />
          </TouchableOpacity>
        </View>
    )
  }

  renderImageTile = ({ item, index }) => {
    let selected = this.state.selected[index] ? true : false
    return (
        <ImageTile
            item={item}
            index={index}
            camera={false}
            selected={selected}
            selectImage={this.selectImage}
        />
    )
  }
  renderImages() {
    return (
        <FlatList
            data={this.state.photos}
            numColumns={4}
            renderItem={this.renderImageTile}
            keyExtractor={(_, index) => index}
            onEndReached={() => { this.getPhotos() }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={

              <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 30, fontFamily: 'content-font', color: 'grey', marginRight: 20 }}>if this screen is not changing ,please go to the "settings" and allow this app to access your storage space, and restart the app</Text>

            }
            initialNumToRender={24}
            getItemLayout={this.getItemLayout}
        />
    )
  }

  render() {
    return (
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderImages()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 40
  },
})
