import {create} from 'dva-core-ts';
import models from '@/model/dva/Models';
import hotTab from '@/model/dva/HotTabModel';
import modelExtend from 'dva-model-extend';

//创建实例
const app = create();
//加载model对象
models.forEach((model) => {
  app.model(model);
});
//启动dva
app.start();
//导出dva的数据
export default app._store;

//防止Model被重复创建,类似与Map
const cached = new Map<string, boolean>();

export function createHotTabModel(namespace: string) {
  if (!cached.get(namespace)) {
    const model = modelExtend(hotTab, {namespace});
    app.model(model);
    cached.set(model.namespace, true);
  }
}
