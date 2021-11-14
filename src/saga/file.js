import {actionTypes as order} from '../reducers/order'
import {actionTypes as handleOrder} from '../reducers/saveOrder'
import {actionTypes as file} from '../reducers/handleFile'
import {actionsTypes as gobal} from '../reducers'
import {put, take, call, select } from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {get, post, remove, patch } from '../util/fetch'
import {generateSheet} from '../util/sheet'


export function* getWorkbook(req) {
   //   console.log('begin loading')
   //   console.log(req)
    yield put({type: gobal.LOAD_START});
      try {
       return yield call(post,'/writeToSheetTemplate',req) 
      } catch (err) {
        console.log('err')
      } finally {
         yield put({type: gobal.LOAD_END});
      }
}



export function* getWorkbookFlow() {
   while (true) {
       let req =  yield take(file.GET_WORKBOOK);//监听 ，拦截
       let res = yield call(getWorkbook, req) 
      if(res){
         if (res.code == 0) {
            yield put({type: gobal.SET_MESSAGE, messageContent: '加载模板成功，开始下载文件' });
            yield call (delay , 1000);
            yield call(generateSheet, res.data)
          } else {
            yield put({type: gobal.SET_MESSAGE, messageContent: '加载模板失败，请更新或检查模板' });
          }

      } else {
         yield put({type: gobal.SET_MESSAGE, messageContent: '操作失败，Api服务器断开'});
      }

      yield put({type: gobal.SET_MESSAGE, messageContent: ''});

   }
}
