package com.reactnative_eyepetizer;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

import com.facebook.react.ReactActivity;
import com.reactnative_eyepetizer.voice.VoiceManager;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  public static final int RECOGNIZER_REQUEST_CODE = 0x0010;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactnative_eyepetizer";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this,true);
    super.onCreate(savedInstanceState);
    VoiceManager.getInstance().init(this);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == RECOGNIZER_REQUEST_CODE) {
      if (grantResults.length > 0) {
        int grantedSize = 0;
        for (int grantResult : grantResults) {
          if (grantResult == PackageManager.PERMISSION_GRANTED) {
            grantedSize++;
          }
        }
        if (grantedSize == grantResults.length) {
          VoiceManager.getInstance().recognize();
        } else {
          showWaringDialog();
        }
      } else {
        showWaringDialog();
      }
    }
  }

  private void showWaringDialog() {
    new AlertDialog.Builder(this, android.R.style.Theme_Material_Light_Dialog_Alert)
            .setTitle(R.string.waring)
            .setMessage(R.string.permission_waring)
            .setPositiveButton(R.string.sure, new DialogInterface.OnClickListener() {
              @Override
              public void onClick(DialogInterface dialog, int which) {
                go2AppSettings();
              }
            }).setNegativeButton(R.string.cancel, null).show();
  }

  private void go2AppSettings() {
    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    Uri uri = Uri.fromParts("package", getPackageName(), null);
    intent.setData(uri);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    startActivity(intent);
  }
}
