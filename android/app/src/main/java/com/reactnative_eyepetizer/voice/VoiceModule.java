package com.reactnative_eyepetizer.voice;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactnative_eyepetizer.MainActivity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class VoiceModule extends ReactContextBaseJavaModule {

    private Promise mPromise;

    public VoiceModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Voice";
    }

    @ReactMethod
    public void startVoice(Promise promise) {
        this.mPromise = promise;
        List<String> checkResultList = checkPermissions();
        if (checkResultList.size() > 0) {
            VoiceManager.getInstance().setRecognizerResultListener(recognizerResultListener);
            ActivityCompat.requestPermissions(Objects.requireNonNull(getCurrentActivity()), checkResultList.toArray(new String[0]), MainActivity.RECOGNIZER_REQUEST_CODE);
        } else {
            Objects.requireNonNull(getCurrentActivity()).runOnUiThread(() -> VoiceManager.getInstance().recognize(recognizerResultListener));
        }
    }

    private List<String> checkPermissions() {
        List<String> checkResultList = new ArrayList<>();

        if (Build.VERSION.SDK_INT >= 23) {
            String[] permissions = new String[]
                    {Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            Manifest.permission.READ_PHONE_STATE,
                            Manifest.permission.READ_EXTERNAL_STORAGE,
                            Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_CONTACTS,
                            Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION};

            for (String permission : permissions) {
                if (ActivityCompat.checkSelfPermission(Objects.requireNonNull(getCurrentActivity()),
                        permission) != PackageManager.PERMISSION_GRANTED) {
                    checkResultList.add(permission);
                }
            }
        }

        return checkResultList;
    }

    private VoiceManager.RecognizerResultListener recognizerResultListener = new VoiceManager.RecognizerResultListener() {
        @Override
        public void onResult(String result) {
            if (mPromise != null) {
                mPromise.resolve(result);
            }
        }

        @Override
        public void onError(String errorMsg) {
            if (mPromise != null) {
                mPromise.reject(new Exception(errorMsg));
            }
        }
    };
}
