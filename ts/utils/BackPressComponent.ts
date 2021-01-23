import {BackHandler} from 'react-native';

interface IProps {
  handler: () => boolean | null | undefined;
}
/**
 * 物理返回键监听
 */
export class BackPressComponent {
  handler: () => boolean | null | undefined;
  constructor(props: IProps) {
    this.handler = props.handler;
  }
  //模拟组件声明周期
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handler);
  }
}
