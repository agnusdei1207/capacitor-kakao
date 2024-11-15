package com.kakao.kakaoLogin

import android.content.ContentValues.TAG
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.user.UserApiClient
import com.google.gson.Gson
import com.kakao.sdk.common.util.KakaoCustomTabsClient
import com.kakao.sdk.template.model.FeedTemplate
import com.kakao.sdk.share.ShareClient
import com.kakao.sdk.share.model.SharingResult
import com.kakao.sdk.talk.TalkApiClient
import com.kakao.sdk.template.model.Button
import com.kakao.sdk.template.model.Content
import com.kakao.sdk.template.model.Link
import com.kakao.sdk.common.KakaoSdk
import android.util.Log
import java.lang.Exception

@CapacitorPlugin(name = "KakaoPlugin")
class KakaoPlugin : Plugin() {
    override fun load() {
        super.load()
        val context = context
        val clientId = getConfig().getString("clientId", "default_client_id")

        Log.i("KakaoPlugin", "clientId >>>>> $clientId")

        // 카카오 SDK 초기화
        KakaoSdk.init(context, clientId)

        Log.i("KakaoPlugin", "카카오 로그인 플러그인 로드 완료 ✅")
    }
    
    companion object {
        @JvmStatic
        private val gson = Gson()
    }

    private fun parseToken(token: OAuthToken): JSObject {
        val tokenInfo = JSObject().also {
            it.putSafe("success", true)
            it.putSafe("accessToken", token.accessToken)
            it.putSafe("expiredAt", token.accessTokenExpiresAt.toString())
            it.putSafe("refreshToken", token.refreshToken)
        }
        token.apply {
            idToken?.let {
                tokenInfo.putSafe("idToken", token.idToken)
            }
            refreshTokenExpiresAt.let {
                tokenInfo.putSafe("refreshTokenExpiresAt", it.toString())
            }
        }
        return tokenInfo
    }

    @PluginMethod
    fun goLogin(call: PluginCall) {
        val callback: (OAuthToken?, Throwable?) -> Unit = { token, error -> 
            if (error != null) {
                call.reject(error.toString())
            } else if (token == null) {
                call.reject("no_data")
            } else {
                call.resolve(parseToken(token))
            }
        }

        if (UserApiClient.instance.isKakaoTalkLoginAvailable(context)) {
            UserApiClient.instance.loginWithKakaoTalk(context, callback = callback)
        } else {
            UserApiClient.instance.loginWithKakaoAccount(context, callback = callback)
        }
    }

    @PluginMethod
    fun talkInChannel(call: PluginCall) {
        try {
            val publicId: String = call.getString("publicId") ?: ""
            if (publicId != "") {
                val url = TalkApiClient.instance.channelChatUrl(publicId)
                KakaoCustomTabsClient.openWithDefault(context, url)
                call.resolve()
            } else {
                Log.e("KakaoPlugin", publicId)
                call.reject("채팅 보내기 실패")
            }
        } catch (e: Exception) {
            call.reject(e.toString())
        }
    }

    @PluginMethod
    fun sendLinkFeed(call: PluginCall) {
        val imageLinkUrl = call.getString("imageLinkUrl")
        val imageUrl = call.getString("imageUrl") ?: ""
        val link = call.getString("link") ?: ""
        val title = call.getString("title") ?: ""
        val description = call.getString("description") ?: ""
        val buttonTitle = call.getString("buttonTitle") ?: ""
        val imageWidth: Int? = call.getInt("imageWidth")
        val imageHeight: Int? = call.getInt("imageHeight")
        val content = Content(title, imageUrl, link, description, imageWidth, imageHeight)
        val buttons = ArrayList<Button>()
        buttons.add(Button(buttonTitle, link))
        val feed = FeedTemplate(content, null, null, buttons)
        ShareClient.instance
            .shareDefault(
                activity,
                feed
            ) { linkResult: SharingResult?, error: Throwable? -> 
                if (error != null) {
                    call.reject("kakao link failed: $error")
                } else if (linkResult != null) {
                    activity.startActivity(linkResult.intent)
                }
                call.resolve()
            }
    }

    @PluginMethod
    fun getUserInfo(call: PluginCall) {
        UserApiClient.instance.me { user, error -> 
            if (error != null) {
                Log.e("KakaoPlugin", "Kakao user request failed", error)
                call.reject(error.toString())
            } else if (user != null) {
                Log.i(
                    "KakaoPlugin", "Kakao user request succeed" +
                            "\nid: ${user.id}" +
                            "\nemail: ${user.kakaoAccount?.email}" +
                            "\nnickname: ${user.kakaoAccount?.profile?.nickname}" +
                            "\nthumbnail: ${user.kakaoAccount?.profile?.thumbnailImageUrl}"
                )
                val userJsonData = JSObject(gson.toJson(user).toString())
                call.resolve(JSObject().also {
                    it.put("value", userJsonData)
                })
            } else {
                call.reject("user is null")
            }
        }
    }

    @PluginMethod
    fun goLogout(call: PluginCall) {
        UserApiClient.instance.logout { error -> 
            if (error != null) {
                call.reject("Logout Failed")
            } else {
                call.resolve()
            }
        }
    }
}