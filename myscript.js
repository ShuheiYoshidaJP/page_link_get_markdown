function copyTextToClipboard(getPageTitle,pageUrl){
  let title = getPageTitle;
  let url = pageUrl;
  let textVal = "["+title+"]("+url+")";
  // テキストエリアを用意する
  var copyFrom = document.createElement("textarea");
  // テキストエリアへ値をセット
  copyFrom.textContent = textVal;

  // bodyタグの要素を取得
  var bodyElm = document.getElementsByTagName("body")[0];
  // 子要素にテキストエリアを配置
  bodyElm.appendChild(copyFrom);

  // テキストエリアの値を選択
  copyFrom.select();
  // コピーコマンド発行
  var retVal = document.execCommand('copy');
  // 追加テキストエリアを削除
  bodyElm.removeChild(copyFrom);
  // 処理結果を返却
  return retVal;
}

// 'use strict';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
        {
            "title": 'get markdown',
            "id" : "page",
            "type" : "normal",
    		"contexts" : ["all"]
        }
    );

});
chrome.contextMenus.onClicked.addListener(function(info) {

    if (info.linkUrl == undefined) {
        copyTextToClipboard(info.selectionText,info.pageUrl);
    } else {
        copyTextToClipboard(info.selectionText,info.linkUrl);
    }

});
