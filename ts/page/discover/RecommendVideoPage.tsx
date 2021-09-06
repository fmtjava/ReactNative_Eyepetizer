import IconAiArrowDown from '@/assets/iconfont/IconAiArrowDown';
import {ModalStackParamList} from '@/navigator/Router';
import {goBack, STATUSBAR_HEIGHT} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Video from '@/components/video';

interface IProps {
  route: RouteProp<ModalStackParamList, 'RecommendVideo'>;
}

function RecommendVideoPage(props: IProps) {
  const onPress = () => {
    goBack();
  };

  const {route} = props;
  return (
    <View style={styles.container}>
      <Video
        url={route.params.masonry.playUrl}
        logo={undefined}
        hideFullScreenControl={false}
        autoPlay={true}
        rotateToFullScreen
        playInBackground={false}
        playWhenInactive={true}
        scrollBounce={true}
        lockPortraitOnFsExit={true}
        lockRatio={16 / 9}
      />
      <TouchableOpacity style={styles.backContainer} onPress={onPress}>
        <IconAiArrowDown size={12} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
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

export default RecommendVideoPage;
