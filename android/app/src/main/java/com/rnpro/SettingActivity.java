package com.rnpro;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Locale;

public class SettingActivity extends AppCompatActivity {
    
    private TextView currentLanguageText;
    private Button switchLanguageButton;
    private String currentLanguage = "zh";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 创建简单的布局
        createLayout();
        
        // 获取当前语言
        getCurrentLanguage();
        
        // 设置点击事件
        setupClickListeners();
    }
    
    private void createLayout() {
        // 创建根布局
        android.widget.LinearLayout rootLayout = new android.widget.LinearLayout(this);
        rootLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
        rootLayout.setPadding(50, 50, 50, 50);
        
        // 标题
        TextView titleText = new TextView(this);
        titleText.setText("设置页面");
        titleText.setTextSize(24);
        titleText.setPadding(0, 0, 0, 30);
        rootLayout.addView(titleText);
        
        // 当前语言显示
        currentLanguageText = new TextView(this);
        currentLanguageText.setTextSize(18);
        currentLanguageText.setPadding(0, 0, 0, 20);
        rootLayout.addView(currentLanguageText);
        
        // 切换语言按钮
        switchLanguageButton = new Button(this);
        switchLanguageButton.setTextSize(16);
        rootLayout.addView(switchLanguageButton);
        
        // 返回按钮
        Button backButton = new Button(this);
        backButton.setText("返回RN页面");
        backButton.setOnClickListener(v -> finish());
        rootLayout.addView(backButton);
        
        setContentView(rootLayout);
    }
    
    private void getCurrentLanguage() {
        Locale currentLocale = getResources().getConfiguration().locale;
        currentLanguage = currentLocale.getLanguage();
        updateLanguageDisplay();
    }
    
    private void updateLanguageDisplay() {
        String languageName = currentLanguage.equals("zh") ? "中文" : "English";
        currentLanguageText.setText("当前语言: " + languageName);
        switchLanguageButton.setText("切换到 " + (currentLanguage.equals("zh") ? "English" : "中文"));
    }
    
    private void setupClickListeners() {
        switchLanguageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switchLanguage();
            }
        });
    }
    
    private void switchLanguage() {
        // 切换语言
        String newLanguage = currentLanguage.equals("zh") ? "en" : "zh";
        
        // 创建新的配置
        Configuration config = new Configuration(getResources().getConfiguration());
        Locale newLocale = new Locale(newLanguage);
        config.setLocale(newLocale);
        
        // 应用新配置
        getResources().updateConfiguration(config, getResources().getDisplayMetrics());
        
        // 更新当前语言
        currentLanguage = newLanguage;
        updateLanguageDisplay();
        
        // 重新创建Activity以应用语言变化
        recreate();
    }
    
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        
        // 检测语言变化并通知RN层
        String newLanguage = newConfig.locale.getLanguage();
        if (!newLanguage.equals(currentLanguage)) {
            currentLanguage = newLanguage;
            updateLanguageDisplay();
            
            // 这里可以发送事件到RN层，但我们的实现会在应用状态变化时自动检测
            System.out.println("SettingActivity: 语言已切换到 " + newLanguage);
        }
    }
}
