import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Item} from '@/model/Daily';

interface IProps {
  item: Item;
}

class TitleItem extends React.Component<IProps> {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{item.data.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF3D',
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    color: '#000000DD',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default TitleItem;
