!function(e,o){function n(o){this.config=o,this.activityQueue=[],this.ssFbConnectReady=!0,this.fbErrorCodes={INVALID_ACCESS_TOKEN:190,REQUIRES_EXTENDED_PERMISSIONS:200},this.linkFbProfileResponse={PROFILE_LINKED:1,NOT_LOGGED_IN:2,USER_ALREADY_EXISTS:3,NO_PUBLISH_PERMISSIONS:4},this.perms={scope:e.fb_permissions,return_scopes:!0},this.emailRerequestPerm={scope:"email",return_scopes:!0,auth_type:"rerequest"},this.reAuthPerm={return_scopes:!0,auth_type:"reauthenticate"}}function t(e){n.call(this,e),this.fbCallbacks=[]}function i(e){n.call(this,e)}n.prototype.init=function(){this.loadScript()},n.prototype.loadScript=function(){window.fbAsyncInit=o.proxy(function(){FB.init(e.fb_init_params),o(document).trigger("fbinitialized"),this.onFbInitialized(),e.user.loggedin||FB.Event&&FB.Event.subscribe("auth.statusChange",o.proxy(this.onFBStatusChange,this))},this),o("body").append('<div id="fb-root"></div>');var n=document.createElement("script");n.src=document.location.protocol+e.fb_sdk_url,n.id="facebook-jssdk",n.async=!0,document.getElementById("fb-root").appendChild(n)},n.prototype.onFbInitialized=function(){o("#fb-login").removeClass("disabled"),window.FB&&e.isSlideViewPage()&&FB.Event.subscribe("edge.create",function(e){_gaq.push(["_trackSocial","facebook","like",e]),_gaq.push(["_trackEvent","bigfoot_slideview","viralsharefacebook"])})},n.prototype.onFBStatusChange=function(o){if(this.disable_autologin!==!0){var n=o.status;"connected"===n&&"true"!==cookie("autologin_disabled")&&(e.ga("fb_opengraph","auto_login","connected"),this.fbAutoLogin(o.authResponse.accessToken,o.authResponse.userID))}},n.prototype.fbAutoLogin=function(o,n){this.ssFbConnect("/fbconnect/create_account_or_login?from=fb_auto_login",{access_token:o,fb_user_id:n,auto_login:!0},function(o){o.status<4?(e.ga("fb_opengraph","auto_login","login_successful"),e.fbConnect.reloadPage()):e.ga("fb_opengraph","auto_login","login_failed")})},n.prototype.reloadPage=function(){window.location.reload()},n.prototype.showEmailRerequestBanner=function(n){o(".j-fb-email-rerequest-banner").removeClass("hide").slideDown(),e.fbConnect.fbLoginHtml=n,o("#fb-login").html("Connecting...").addClass("disabled")},n.prototype.closeEmailRerequestBanner=function(){o(".j-fb-email-rerequest-banner").hide(),o("#fb-login").html(e.fbConnect.fbLoginHtml).removeClass("disabled")},n.prototype.emailRerequestBannerCallback=function(){var n="login";window.fromSource=getUrlVar("from_source")||encodeURIComponent("/"),o("#j-fb-login-indicator").show();var t=e.fbConnect.emailRerequestPerm;e.fbConnect.unsubscribeFBStatusChange(),window.FB&&FB.login(function(t){t&&t.authResponse?-1==t.authResponse.grantedScopes.indexOf("email")?e.fbConnect.showEmailRerequestBanner(e.fbConnect.fbLoginHtml):(o(".j-fb-email-rerequest-banner").length&&o(".j-fb-email-rerequest-banner").is(":visible")&&o(".j-fb-email-rerequest-banner").hide(),e.user.loggedin?e.user.is_valid_fbuser||o.post("/fbconnect/link_facebook_profile",{access_token:t.authResponse.accessToken,fb_user_id:t.authResponse.userID,granted_perms:t.authResponse.grantedScopes},function(o){e.fbConnect.fbconnect_login_redirect_link(o)},"json"):o.post("/fbconnect/fb_login",{},function(o){e.fbConnect.ssFbConnect("/fbconnect/create_account_or_login",{access_token:t.authResponse.accessToken,fb_user_id:t.authResponse.userID,login_source:window.loginSource,granted_perms:t.authResponse.grantedScopes},function(o){e.fbConnect.fbconnect_login_redirect(o,n)})},"json")):o("#j-fb-login-indicator").hide()},t)},n.prototype.showEmailRerequestModal=function(){o("#fblogin-modal-cta").length?o("#fblogin-modal-cta").replaceWith(o(".j-fb-email-rerequest-html").html()):o("#fb-login-modalbox").replaceWith(o(".j-fb-email-rerequest-html").html())},n.prototype.emailRerequestModalCallback=function(n){window.fromSource=window.fromSource||getUrlVar("from_source");var t="fancybox";o("#j-fb-modalbox-indicator").show();var i=e.fbConnect.emailRerequestPerm;e.fbConnect.unsubscribeFBStatusChange(),window.FB&&FB.login(function(i){i&&i.authResponse&&(-1==i.authResponse.grantedScopes.indexOf("email")?e.fbConnect.showEmailRerequestModal():e.fbConnect.ssFbConnect("/fbconnect/create_account_or_login"+(e.isDownloadUrl()?"?from_page=download":""),{access_token:i.authResponse.accessToken,fb_user_id:i.authResponse.userID,login_source:window.loginSource},function(e){"undefined"!=typeof n&&n(e,t)})),o("#j-fb-modalbox-indicator").hide()},i)},n.prototype.fbconnect_delink_callback=function(e){window.location.reload()},n.prototype.fbconnect_login_redirect_from_iframe=function(n,t){var i=o("#target_url").val(),a="fbconnectDefault";switch(n.status){case 1:e.ga("Signup","fb_login","fb_signup_from_"+t),a="fbconnectNewUser";break;case 2:e.ga("Login","fb_login","fb_ss_user_from_"+t),a="fbconnectExistingUser";break;case 3:e.ga("Login","fb_login","fb_login_from_"+t),a="fbconnectExistingUserWithLinkedAccount";break;case 4:a="fbconnectFailed";break;case 5:a="fbconnectSuspendedUser"}o.postMessage(a,i,parent)},n.prototype.fbconnect_login_redirect_link=function(e){switch(o("#j-fb-topnav-indicator").hide(),o("#j-fb-login-indicator").hide(),e.status){case this.linkFbProfileResponse.PROFILE_LINKED:window.location.reload();break;case this.linkFbProfileResponse.USER_ALREADY_EXISTS:o("#page-error").append("We could not connect your SlideShare account to Facebook. This Facebook login is already being used with another SlideShare account.").show();break;default:o("#page-error").append("There was an error.").show()}},n.prototype.fbconnect_login_redirect=function(n,t){var i=escape(window.location.href),a=window.fromSource,s=window.fromType||getUrlVar("from");switch(!window.location.pathname.startsWith("/upload")||1!==n.status&&2!==n.status&&3!==n.status||(e.ga("Upload","fb_login_successful"),i=i.replace("loggedout_","loggedin_loggedout_")),n.status){case 1:e.ga("Signup","fb_login","fb_signup_from_"+t),"undefined"!=typeof a?window.location.replace("/fbconnect/landingpage?from="+a):window.location.replace("/fbconnect/landingpage?from="+i);break;case 2:e.ga("Login","fb_login","fb_ss_user_from_"+t),"undefined"!=typeof a?window.location.replace("/fbconnect/landingpage?from="+a):window.location.replace("/fbconnect/landingpage?from="+i);break;case 3:e.ga("Login","fb_login","fb_login_from_"+t);var r=decodeURIComponent(a);if(void 0!==getUrlVars().from_logout&&"undefined"==typeof s)window.location.replace("/");else{if(window.location.pathname.startsWith("/upload"))return window.location.replace(window.location.href.replace("loggedout_","loggedin_loggedout_")),!1;a&&a.length>1&&isInternalRedirect(a)&&window.location.href!==r?window.location.href=r:window.location.reload()}break;case 4:o(".j-alert").html("Login unsuccessful. Please try again."),o(".j-alert").removeClass("hide");break;case 5:o(".j-alert").html(n.message),o(".j-alert").removeClass("hide");break;default:window.location.reload()}},n.prototype.modalLoginFbButtonClickCallback=function(n){window.fromSource=window.fromSource||getUrlVar("from_source");var t="fancybox";o("#j-fb-modalbox-indicator").show();var i=e.fbConnect.perms;e.fbConnect.unsubscribeFBStatusChange(),window.FB&&FB.login(function(i){i&&i.authResponse&&(-1==i.authResponse.grantedScopes.indexOf("email")?e.fbConnect.showEmailRerequestModal():e.fbConnect.ssFbConnect("/fbconnect/create_account_or_login"+(e.isDownloadUrl()?"?from_page=download":""),{access_token:i.authResponse.accessToken,fb_user_id:i.authResponse.userID,login_source:window.loginSource},function(e){"undefined"!=typeof n&&n(e,t)})),o("#j-fb-modalbox-indicator").hide()},i)},n.prototype.bindEvents=function(){e.user.loggedin||(o("body").on("click","#fb-login-modalbox, #fblogin-modal-cta",function(){e.fbConnect.modalLoginFbButtonClickCallback(o.proxy(e.fbConnect.fbconnect_login_redirect_from_iframe,e.fbConnect))}),o("body").on("click",".fb-email-rerequest-modal-cta",function(){e.fbConnect.emailRerequestModalCallback(o.proxy(e.fbConnect.fbconnect_login_redirect_from_iframe,e.fbConnect))})),o("body").on("click",".fb-email-rerequest-banner-cta",function(){e.fbConnect.emailRerequestBannerCallback()}),o("body").on("click",".j-fb-email-rerequest-close",function(){e.fbConnect.closeEmailRerequestBanner()}),o("#j-delink-fb").on("click",function(n){n.preventDefault(),o.post("/fbconnect/delink_facebook_profile",{},e.fbConnect.fbconnect_delink_callback,"json")}),o("#fb-login").click(function(n){if(!o(this).hasClass("disabled")){var t="login",i=o(this).html();n.preventDefault(),window.fromSource=getUrlVar("from_source")||encodeURIComponent("/"),o("#j-fb-login-indicator").show(),o(this).hasClass("fb-login-new")||o(this).html("Connecting...").addClass("disabled");var a=void 0!==getUrlVar("re_auth"),s=a?e.fbConnect.reAuthPerm:e.fbConnect.perms;e.fbConnect.unsubscribeFBStatusChange(),window.FB&&FB.login(function(n){n&&n.authResponse?a||-1!=n.authResponse.grantedScopes.indexOf("email")?(o(".j-fb-email-rerequest-banner").length&&o(".j-fb-email-rerequest-banner").is(":visible")&&o(".j-fb-email-rerequest-banner").hide(),e.user.loggedin&&!a?e.user.is_valid_fbuser||o.post("/fbconnect/link_facebook_profile",{access_token:n.authResponse.accessToken,fb_user_id:n.authResponse.userID,granted_perms:n.authResponse.grantedScopes},function(o){e.fbConnect.fbconnect_login_redirect_link(o)},"json"):o.post("/fbconnect/fb_login",{},function(i){return!a||e.user.is_valid_fbuser&&void 0!==n.authResponse.grantedScopes&&e.user.fb_userid==n.authResponse.userID?void e.fbConnect.ssFbConnect("/fbconnect/create_account_or_login",{access_token:n.authResponse.accessToken,fb_user_id:n.authResponse.userID,login_source:window.loginSource,granted_perms:n.authResponse.grantedScopes},function(o){e.fbConnect.fbconnect_login_redirect(o,t)}):(o(".j-alert").html("Login does not match, please try again."),o(".j-alert").removeClass("hide").show(),void e.ga("Login","fb_login","fb_re_auth_failure"))},"json")):e.fbConnect.showEmailRerequestBanner(i):o("#j-fb-login-indicator").hide()},s)}})},n.prototype.ssFbConnect=function(e,n,t){this.ssFbConnectReady===!0&&(this.ssFbConnectReady=!1,o.post(e,n,function(e){this.ssFbConnectReady=!0,t(e)},"json"))},n.prototype.unsubscribeFBStatusChange=function(){this.disable_autologin=!0},t.prototype=new n,t.prototype.init=function(){e.registerMessageReceiver(o.proxy(this.messageReceiver,this)),o("body").append('<iframe id="'+this.config.fbApiIframeId+'" style="display:none"></iframe>');var n=o("#"+this.config.fbApiIframeId);n.length>0&&(n.attr("src",this.config.fbApiIframeUrl),this.fbApiIframeWindow=window.frames[this.config.fbApiIframeId].contentWindow)},t.prototype.messageReceiver=function(e){"fbinitialized"==e?(o(document).trigger("fbinitialized"),this.onFbInitialized()):"reloadPage"==e&&this.reloadPage()},t.prototype.postMessageToFbApiIframe=function(e){o.postMessage(e,this.config.fbApiIframeUrl,this.fbApiIframeWindow)},i.prototype=new n,i.prototype.onFbInitialized=function(){this.postMessage("fbinitialized")},i.prototype.postMessage=function(e){var n=o("#target_url").val();o.postMessage(e,n,parent)},i.prototype.reloadPage=function(){this.postMessage("reloadPage")},e.setup_fbconnect_interaction=function(){e.fbConnect.bindEvents()},e.fb_api_iframe===!0?e.fbConnect=new i:e.user.loggedin||e.is_ssl?e.fbConnect=new n:e.fbConnect=new t({fbApiIframeId:"fb-api-iframe",fbApiIframeUrl:"https://"+o(location).attr("hostname")+"/fbconnect/fb_api_iframe"}),o(window).load(function(){e.fbConnect.init()})}(slideshare_object,jQuery);