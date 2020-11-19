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
            "title": 'このページ→マークダウン',
            "id" : "page",
            "type" : "normal",
    		"contexts" : ["all"]
        }
    );
    chrome.contextMenus.create(
        {
            "title": 'リンク→マークダウン',
            "id" : "link",
            "type" : "normal",
    		"contexts" : ["all"]
        }
    );

});
chrome.contextMenus.onClicked.addListener(function(info) {
    const selectedMenu = info.menuItemId;
    switch (selectedMenu) {　//呼び出されたメニューによりﾊｧﾊｧする回数を変える

        case 'page':
        copyTextToClipboard(info.selectionText,info.pageUrl);
            break;

        case 'link':
        copyTextToClipboard(info.selectionText,info.linkUrl);
            break;
    }

    });
