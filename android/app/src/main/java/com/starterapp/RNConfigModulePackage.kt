package com.starterapp

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.starterapp.RNConfigModule.RNConfigModule

    class RNConfigModulePackage : ReactPackage {

        override fun createViewManagers(
            reactContext: ReactApplicationContext
        ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

        override fun createNativeModules(
            reactContext: ReactApplicationContext
        ): MutableList<NativeModule> = listOf(RNConfigModule(reactContext)).toMutableList()
}