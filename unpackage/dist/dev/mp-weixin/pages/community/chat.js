(global.webpackJsonp=global.webpackJsonp||[]).push([["pages/community/chat"],{108:
/*!***************************************************************************************!*\
  !*** C:/Users/Thinkpad/Desktop/PetSocial/main.js?{"page":"pages%2Fcommunity%2Fchat"} ***!
  \***************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){n(/*! uni-pages */4),n(/*! @dcloudio/uni-stat */5);e(n(/*! vue */2));function e(t){return t&&t.__esModule?t:{default:t}}t(e(n(/*! ./pages/community/chat.vue */109)).default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).createPage)},109:
/*!********************************************************************!*\
  !*** C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue ***!
  \********************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! ./chat.vue?vue&type=template&id=5e6d10bc& */110),a=n(/*! ./chat.vue?vue&type=script&lang=js& */112);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n(/*! ./chat.vue?vue&type=style&index=0&lang=less& */116);var s=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */14),c=Object(s.default)(a.default,i.render,i.staticRenderFns,!1,null,null,null,!1,i.components,void 0);c.options.__file="C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue",e.default=c.exports},110:
/*!***************************************************************************************************!*\
  !*** C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=template&id=5e6d10bc& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=5e6d10bc& */111);n.d(e,"render",function(){return i.render}),n.d(e,"staticRenderFns",function(){return i.staticRenderFns}),n.d(e,"recyclableRender",function(){return i.recyclableRender}),n.d(e,"components",function(){return i.components})},111:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=template&id=5e6d10bc& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e),n.d(e,"render",function(){return i}),n.d(e,"staticRenderFns",function(){return o}),n.d(e,"recyclableRender",function(){return a}),n.d(e,"components",function(){});var i=function(){var t=this.$createElement;this._self._c},a=!1,o=[];i._withStripped=!0},112:
/*!*********************************************************************************************!*\
  !*** C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */113),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e.default=a.a},113:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n(/*! @/public/js/jmessage-wxapplet-sdk-1.4.2.min.js */114)),a=n(/*! @/public/js/md5.js */58),o=s(n(/*! @/public/js/emoji.js */115));n(/*! @/public/js/formatTime.js */81);function s(t){return t&&t.__esModule?t:{default:t}}var c=new i.default({}),r={data:function(){return{showEmoji:!1,message:"",chatBoxHeight:0,id:"",JiGuangId:"",chatList:[],avatar:"",consultantAvatar:"",now_page:1,page_size:10,total:0,currentList:[],historyList:[],accoutId:"",previewImgList:[],api:this.$API,ImgList:[],hasLoading:!0,result:""}},onLoad:function(e){t.setNavigationBarTitle({title:"用户AAA"}),t.showToast({title:"正在初始化...",icon:"loading",duration:1e3}),this.accoutId=t.getStorageSync("accoutId"),this.id=e.Id,this.JiGuangId=e.JiGuangId,this.consultantAvatar=e.consultantAvatar,this.avatar=t.getStorageSync("avatar"),this.getLogChatList(this.now_page,this.page_size),this.jim_init()},onShow:function(){this.jim_init()},onReady:function(){this.jim_init()},computed:{emojiList:function(){return o.default}},onPullDownRefresh:function(){var e=this;t.showToast({title:"加载中",icon:"loading",duration:500}),setTimeout(function(){e.getLogChatList(e.now_page+1,e.page_size),t.stopPullDownRefresh()},500)},methods:{getLogChatList:function(e,n){var i=this;this.$http.get("/API/Consultation/GetLogChatList",{pageIndex:e,pageSize:n,Id:this.id}).then(function(e){i.now_page=e.Data.PageIndex,i.page_size=e.Data.PageSize,i.total=e.Data.TotalPage,i.historyList=e.Data.PageList.reverse(),i.currentList.unshift.apply(i.currentList,i.historyList);var n=new Date,a=n.getHours(),o=n.getMinutes();a<10&&(a="0"+a),o<10&&(o="0"+o);var s=a+":"+o;i.result=s;for(var c=0;c<i.historyList.length;c++)1==i.historyList[c].ContentType&&i.previewImgList.push(i.historyList[c].Content);0==i.historyList.length&&t.showToast({title:"暂无更多消息!",icon:"none"})})},addImg:function(){var e=this,n=this;t.getStorageSync("accoutId");t.chooseImage({count:1,success:function(i){var o="b70a470571c6cc121be728f4",s="022cd9fd995849b58b3ef0e943421ed9",r=(new Date).getTime(),u=(0,a.hex_md5)("appkey="+o+"&timestamp="+r+"&random_str="+s+"&key=245cf3e7fc7c75369eeeefc0"),l="NervesourceBladder"+t.getStorageSync("accoutId");c.init({appkey:o,random_str:s,signature:u,timestamp:r}).onSuccess(function(a){c.login({username:l,password:"NervesourceBladder123123"}).onSuccess(function(a){var o=i.tempFilePaths[0],s=e.JiGuangId,c="";t.uploadFile({url:n.$API+"/API/Common/Upload?Type=2",filePath:o,name:"file",success:function(t){e.showEmoji=!1,c=JSON.parse(t.data).Data.filename,n.sendImg(s,"b70a470571c6cc121be728f4",o,c),e.previewImgList.push(e.$API+"/UploadFile/chat/"+JSON.parse(t.data).Data.filename)},fail:function(t){}})}).onFail(function(t){})}).onFail(function(t){})},fail:function(t){}})},previewImg:function(e){var n=e.target.dataset.src;t.previewImage({current:n,urls:this.previewImgList})},sendImg:function(t,e,n,i){var a=this;this.chatList.push({user:2,avatar:this.avatar,image:this.$API+"/UploadFile/chat/"+i}),c.sendSinglePic({target_username:t,appkey:e,image:n}).onSuccess(function(t,e){a.$http.post("/API/Consultation/AddLogChat",{Id:a.id,Content:i,ContentType:1}).then(function(t){}),wx.createSelectorQuery().select("#x_chat").boundingClientRect(function(t){wx.pageScrollTo({scrollTop:t.height+200,duration:100})}).exec()}).onFail(function(t){})},showEmojiList:function(){this.showEmoji=!this.showEmoji},chooseEmoji:function(t){this.message+=t},closeOther:function(){this.showEmoji=!1},jim_init:function(){var e=this,n="b70a470571c6cc121be728f4",i="022cd9fd995849b58b3ef0e943421ed9",o=(new Date).getTime(),s=(0,a.hex_md5)("appkey="+n+"&timestamp="+o+"&random_str="+i+"&key=245cf3e7fc7c75369eeeefc0"),r="NervesourceBladder"+t.getStorageSync("accoutId");c.init({appkey:n,random_str:i,signature:s,timestamp:o}).onSuccess(function(t){e.jim_login(r)}).onFail(function(t){})},jim_login:function(t){var e=this;c.login({username:t,password:"NervesourceBladder123123"}).onSuccess(function(t){e.jim_onMsgReceive(),e.jim_sendMsg(),e.hasLoading=!1,wx.createSelectorQuery().select("#x_chat").boundingClientRect(function(t){wx.pageScrollTo({scrollTop:t.height+200,duration:100})}).exec()}).onFail(function(t){})},jim_sendMsg:function(){var t=this;if(""!=this.message&&null!=this.message){this.chatList.push({user:2,avatar:this.avatar,text:this.message});var e=this,n=this.JiGuangId,i=this.message;this.message="",c.sendSingleMsg({target_username:n,content:i}).onSuccess(function(n){t.message="",e.$http.post("/API/Consultation/AddLogChat",{Id:e.id,Content:i,ContentType:0}).then(function(t){})}).onFail(function(t){}).onAck(function(t){}),this.message="",this.showEmoji=!1,wx.createSelectorQuery().select("#x_chat").boundingClientRect(function(t){wx.pageScrollTo({scrollTop:t.height+200,duration:100})}).exec()}else this.message=""},jim_onMsgReceive:function(){var t=this;c.onMsgReceive(function(e){"text"==e.messages[0].content.msg_type?t.chatList.push({user:1,avatar:t.consultantAvatar,text:e.messages[0].content.msg_body.text}):c.getResource({media_id:e.messages[0].content.msg_body.media_id}).onSuccess(function(e){t.chatList.push({user:1,avatar:t.consultantAvatar,image:e.url}),t.previewImgList.push(e.url)}).onFail(function(t){}),t.$http.get("/API/Consultation/SetNewsSee",{Id:t.id}).then(function(t){wx.createSelectorQuery().select("#x_chat").boundingClientRect(function(t){wx.pageScrollTo({scrollTop:t.height+200,duration:100})}).exec()})})}}};e.default=r}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).default)},116:
/*!******************************************************************************************************!*\
  !*** C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=style&index=0&lang=less& */117),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e.default=a.a},117:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Thinkpad/Desktop/PetSocial/pages/community/chat.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}},[[108,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community/chat.js.map