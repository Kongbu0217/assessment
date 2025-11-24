'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  function() {
    const userName = userNameInput.value; //入力欄inputの値を取得
    if (userName.length === 0) {
      //文字数が0であったら（名前が空の時）は処理を終了する。
      //関数の中にあるのでreturnが使える、ここでのreturnは関数の処理を終了する効果がある。
      return;
    }

    //診断結果表示エリアの作成
    resultDivision.innerText = '';  //divタグを空文字列で上書き→ボタンを押すと一度空になって要素が表示されるので、連続して結果が表示されるのを防ぐ。
    tweetDivision.innerText = '';
    const header = document.createElement('h3');  //h3タグの作成
    header.innerText = '診断結果';  //タグの内側のテキストを設定
    resultDivision.appendChild(header);  //divタグの子要素として追加


    //ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a'); //aタグの作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue); //属性hrefを追加
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('date-text','result');
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);


    const paragraph = document.createElement('p');
    const result = assessment(userName);  //診断結果を作成
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    console.log(assessment(userName));

    
  }
);

    //Enterで実行されるようにする
    userNameInput.addEventListener(
      'keydown',
      (event) => {
        if(event.code === 'Enter') {
          assessmentButton.dispatchEvent(new Event('click'));
        }
      }
    )

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
];

// use strict:厳格モードとは
// 自由度を制限するもの
//constは定数！変数の値をあとから変更（再代入）できない
//基本的に変数constを使うが、変数の値を変更する場合のみletを使う
//予期せぬ動挙動を制限し安全性の高いコードを書くための概念

//関数には名前をつけることができる。関数名は何をするものができるかを名前にすると良い。
//関数は使い回すことができる。このボタンを押したら、こうなる、というようなものをいくつかのボタンで使い回すなどができる。

// /**        JSDoc
//  * 名前の文字列を渡すと診断結果を返す関数
//  * @param {string} userName ユーザの名前
//  * @return {string} 診断結果
//  */

function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  const index =sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName)
  return result
}

//replaceAll()関数→何らかしらの文字列や文章を置き換えることができる。
//console.assertで関数が正しく動いているかをテストすることもできる。

//動作確認
// console.log(assessment('太郎'))
// console.log(assessment('太郎'))
// console.log(assessment('郎'))


