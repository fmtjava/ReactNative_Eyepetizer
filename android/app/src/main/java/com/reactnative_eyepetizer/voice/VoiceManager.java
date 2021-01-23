package com.reactnative_eyepetizer.voice;

import android.content.Context;
import android.util.Log;
import com.iflytek.cloud.InitListener;
import com.iflytek.cloud.RecognizerResult;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechUtility;
import com.iflytek.cloud.ui.RecognizerDialog;
import com.iflytek.cloud.ui.RecognizerDialogListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.LinkedHashMap;

public class VoiceManager {

    private static String TAG = VoiceManager.class.getSimpleName();

    private RecognizerDialog mIatDialog;

    private HashMap<String, String> mIatResults = new LinkedHashMap<>();

    private static VoiceManager speechManager = new VoiceManager();

    private VoiceManager() {

    }

    public static VoiceManager getInstance() {
        return speechManager;
    }

    public void init(Context context) {
        SpeechUtility.createUtility(context, "appid=5e63940d");
        mIatDialog = new RecognizerDialog(context, mInitListener);
        mIatDialog.setListener(mRecognizerDialogListener);
    }

    private InitListener mInitListener = code -> Log.d(TAG, "SpeechRecognizer init() code = " + code);

    public void recognize(RecognizerResultListener recognizerResultListener) {
        if (mResultListener == null) mResultListener = recognizerResultListener;
        recognize();
    }

    public void recognize() {
        mIatResults.clear();
        mIatDialog.show();
    }

    public void setRecognizerResultListener(RecognizerResultListener recognizerResultListener){
        this.mResultListener = recognizerResultListener;
    }

    private RecognizerDialogListener mRecognizerDialogListener = new RecognizerDialogListener() {
        public void onResult(RecognizerResult results, boolean isLast) {
            printResult(results);
        }

        /**
         * 识别回调错误.
         */
        public void onError(SpeechError error) {
            if (mResultListener != null) {
                mResultListener.onError(error.getErrorDescription());
            }
        }

    };

    private void printResult(RecognizerResult results) {
        String text = JsonParser.parseIatResult(results.getResultString());

        String sn = null;
        // 读取json结果中的sn字段
        try {
            JSONObject resultJson = new JSONObject(results.getResultString());
            sn = resultJson.optString("sn");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        mIatResults.put(sn, text);

        StringBuilder stringBuilder = new StringBuilder();
        for (String key : mIatResults.keySet()) {
            stringBuilder.append(mIatResults.get(key));
        }

        if (mResultListener != null) {
            mResultListener.onResult(stringBuilder.toString());
        }
    }

    private RecognizerResultListener mResultListener;

    public interface RecognizerResultListener {
        void onResult(String result);

        void onError(String errorMsg);
    }

}
