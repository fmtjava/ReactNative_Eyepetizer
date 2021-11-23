import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconWantempty from '@/assets/iconfont/IconWantempty';

export default function EmptyView() {
  return (
    <View style={styles.empty}>
      <IconWantempty size={60} />
      <Text style={styles.emptyText}>暂时木有数据</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 5,
  },
});
