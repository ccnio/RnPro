package com.ccnio.rn

import android.content.Context
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.ccnio.rn.databinding.ActivityReactBinding
import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

class ReactWareActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {
    private lateinit var binding: ActivityReactBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityReactBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val pageName = intent.getStringExtra(KEY_PAGE_NAME)
        val param = intent.getBundleExtra(KEY_PAGE_PARAM)
        if (pageName.isNullOrEmpty()) return
        val reactNativeFragment = ReactFragment.Builder()
            .setComponentName(pageName)
            .setLaunchOptions(param)
            .build()
        supportFragmentManager
            .beginTransaction()
            .add(R.id.container, reactNativeFragment)
            .commit()
    }

    override fun invokeDefaultOnBackPressed() {
        onBackPressedDispatcher.onBackPressed()
    }

    companion object {
        const val PAGE_RN_PRO = "RnPro"
        const val PAGE_RN_SECOND = "SecondPage"
        private const val KEY_PAGE_NAME = "rn_page"
        private const val KEY_PAGE_PARAM = "rn_param"

        fun start(context: Context, page: String, param: Bundle? = null) {
            val intent = android.content.Intent(context, ReactWareActivity::class.java).apply {
                putExtra(KEY_PAGE_NAME, page)
                putExtra(KEY_PAGE_PARAM, param)
            }
            context.startActivity(intent)
        }
    }
}
