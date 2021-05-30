import { Component, defineComponent, ref } from 'vue';

import AxiosTest from './components/axios';
import BaseTest from './components/1.base';
import BaseSearchTest from './components/2.base-search';
import BaseBodyTest from './components/3.base-body';
import BaseResponseHeader from './components/4.base-response-header';
import BaseError from './components/5.error';
import BaseExtennd from './components/6.extend';
import BaseOverload from './components/7.overload';
import BaseGeneriacity from './components/8.genericity';
import BaseInterceptors from './components/9.interceptors';
import BaseMergeConfig from './components/10.merge-config';
import BaseTransform from './components/11.transform';
import BaseInstance from './components/12.instance';
import BaseCancel from './components/13.cancel';
import BaseWithCredentials from './components/14.withCredentials';
import BaseXsrf from './components/15.xsrf';
import BaseProgress from './components/16.progress';
import BaseAuth from './components/17.auth';
import BaseValidDateStatus from './components/18.validateStatus';
import BaseParams from './components/19.parseParams';
import BaseUrl from './components/20.base-url';
import BaseSpreadAll from './components/21.all-spread';
import GuoguoAxios from './components/guoguo-ts-axios';

import classes from './index.module.scss';

const testList: Array<{ key: string; component: Component }> = [
  {
    key: 'axios',
    component: AxiosTest,
  },
  {
    key: 'base test',
    component: BaseTest,
  },
  {
    key: 'base search test',
    component: BaseSearchTest,
  },
  {
    key: 'base body test',
    component: BaseBodyTest,
  },
  {
    key: 'base response header',
    component: BaseResponseHeader,
  },
  {
    key: 'base error ',
    component: BaseError,
  },
  {
    key: 'base extend',
    component: BaseExtennd,
  },
  {
    key: 'base overload',
    component: BaseOverload,
  },
  {
    key: 'base generiactry',
    component: BaseGeneriacity,
  },
  {
    key: 'base generiactry',
    component: BaseGeneriacity,
  },
  {
    key: 'base interception',
    component: BaseInterceptors,
  },
  {
    key: 'base merge-config',
    component: BaseMergeConfig,
  },
  {
    key: 'base transform',
    component: BaseTransform,
  },
  {
    key: 'base instance',
    component: BaseInstance,
  },
  {
    key: 'base cancel',
    component: BaseCancel,
  },
  {
    key: 'base withCredentials',
    component: BaseWithCredentials,
  },
  {
    key: 'base xsrf',
    component: BaseXsrf,
  },
  {
    key: 'base progress',
    component: BaseProgress,
  },
  {
    key: 'base auth',
    component: BaseAuth,
  },
  {
    key: 'base validDateStatus',
    component: BaseValidDateStatus,
  },
  {
    key: 'base params',
    component: BaseParams,
  },
  {
    key: 'base url',
    component: BaseUrl,
  },
  {
    key: 'base spread all',
    component: BaseSpreadAll,
  },
  {
    key: 'guoguo-axios',
    component: GuoguoAxios,
  },
];

export default defineComponent({
  name: 'App',
  setup() {
    const current = ref<string>(testList[0].key);

    const getComponentByKey = (key: string) => {
      // @ts-ignore
      const component = testList.filter(com => com.key === key)[0].component;
      return <component />;
    };

    const btnClick = (key: string) => {
      current.value = key;
    };

    return () => (
      <div class={classes.root}>
        <p>current: {current.value}</p>
        <div class={classes.rootTest}>
          <div class={classes.left}>
            {testList.map((it, index) => {
              return (
                <p key={index}>
                  <button onClick={() => btnClick(it.key)}>{it.key}</button>
                </p>
              );
            })}
          </div>
          <div class={classes.right}>{getComponentByKey(current.value)}</div>
        </div>
      </div>
    );
  },
});
