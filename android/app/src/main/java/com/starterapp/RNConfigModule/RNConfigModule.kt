package com.starterapp.RNConfigModule

import android.content.res.Resources
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.starterapp.BuildConfig
import com.starterapp.R

//import


class RNConfigModule (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    var baseUrl: String? = ""
    var env: String? = ""

    init {
        env = reactContext.getString(R.string.BUILD_ENV)
        baseUrl = reactContext.getString(R.string.base_url)
    }

    override fun getName(): String {
        return "RNConfigModule"
    }

    @ReactMethod // @ReactMethod(isBlockingSynchronousMethod = false)
    fun getBuildInfo(promise: Promise) {
        val item: WritableMap = WritableNativeMap()
        item.putString("BASE_URL", baseUrl)
        item.putString("BUILD_ENV", env)
        promise.resolve(item)
    }

    //@ReactMethod(isBlockingSynchronousMethod = true)
    @ReactMethod
    fun createCalendarEvent(name: String, location: String) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")
    }

    override fun getConstants(): MutableMap<String, Any>? {
        val con: MutableMap<String, Any> = HashMap()
        // con.put("evn",BuildConfig.FLAVOR);
        con["BASE_URL"] = baseUrl!!
        con["BUILD_ENV"] = env!!
        return con
    }
}