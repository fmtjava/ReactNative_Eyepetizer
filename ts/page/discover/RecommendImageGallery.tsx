import IconAiArrowDown from '@/assets/iconfont/IconAiArrowDown';
import {ModalStackParamList} from '@/navigator/Router';
import {goBack, STATUSBAR_HEIGHT} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';

export interface IImageUrl {
  url: string;
}

interface IProps {
  route: RouteProp<ModalStackParamList, 'Gallery'>;
}

class RecommendImageGallery extends React.Component<IProps> {
  onPress = () => {
    goBack();
  };

  render() {
    const {route} = this.props;
    return (
      <View style={styles.container}>
        <ImageViewer
          imageUrls={route.params.images}
          renderImage={(props) => <FastImage {...props} />}
          loadingRender={() => <ActivityIndicator size="large" color="red" />}
        />
        <TouchableOpacity style={styles.backContainer} onPress={this.onPress}>
          <IconAiArrowDown size={12} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'grey',
    left: 15,
    top: STATUSBAR_HEIGHT + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecommendImageGallery;
