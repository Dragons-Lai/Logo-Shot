# LOGO SHOT
## 專案介紹
商標是識別某商品、服務，或企業的顯著標誌，因此快速地搜尋、查找、甚至是產生商標，能夠協助一般人的日常行為及專業人士的工作需求。現有的商標局網站僅能使用文字搜尋，無法以照片進行搜尋，也因此增加了商標查找的難度。

本 App 利用影像處理、資訊檢索、機器學習技術，不僅強化了文字搜尋結果，也可以進行以圖找圖，還有獨特的商標生成系統，為想申請商標的公司提供方向與靈感。

在以圖找圖方面，使用者可以上傳既有的商標圖片或是拍下身邊的商標，後端伺服器會用深度學習模型萃取出該圖片的特徵向量。再來計算該特徵向量與資料庫中圖片特徵向量的相似度，依照相似度大小依序將資料庫圖片回傳給使用者。

在文字搜尋方面，使用者輸入關鍵字後，會先使用 N-gram 與 Word Segmentation 進行比對。接著使用訓練好的 WordEmbedding 模型，得到關鍵字的近義詞進行搜尋。最後用 TF-IDF 統計方法，找出與原搜尋結果相似的商標，擴充搜尋結果。

在商標生成方面，主要使用商標局資料庫內已存在的商標圖案作為訓練資料，並利用 GAN(生成對抗網路) 生成全新的商標。

## APP介面
主畫面|搜尋頁面|
-|-|
<img src="https://i.imgur.com/6F3DvqC.png" height="500" />|<img src="https://i.imgur.com/1QII33x.png" height="500" />|

搜尋結果頁面|靈感啟發頁面|
-|-|
<img src="https://i.imgur.com/y9GLxv9.png" height="500" />|<img src="https://i.imgur.com/iozkqMv.png" height="500" />|

## 下載連結
Google Play：https://play.google.com/store/apps/details?id=meow.logoshot

註：因預算考量，團隊目前已將後端伺服器關閉，實際的demo可見下方[介紹影片](#介紹影片)。

<img src="https://i.imgur.com/tzqdG13.png" height="500" />

## 介紹影片
Demo影片(1分30秒)：[[Demo影片] 商標圖樣搜尋與生成 APP – LOGO SHOT](https://www.youtube.com/watch?v=RFrpexPjAhY&ab_channel=%E8%B3%B4%E7%BE%A4%E9%BE%8D)

## 專案架構
![](https://i.imgur.com/motb8a9.png)
說明：我們使用Node.js的RN作為前端框架，並用Python的Flask（RESTful）作為後端框架，並串連到採用PG的資料庫。使用者在APP上傳文字跟圖片後，後端伺服器會去搜索與其最相似的商標圖片，接著會向資料庫送出Query請求，最後資料會被回傳給後端伺服器，並再回傳給使用者。

## 專案成果
<img src="https://i.imgur.com/0UOsQgJ.png" height="400" />
說明：總結來說，本項專案使用兩項NLP技術，以及兩項Deep Learning技術，以及兩項的前後端技術。我們將其運用在商標領域上面，希望能藉此達到 協助一般人的日常行為 以及 協助專業人士的工作需求 的這兩項商業價值。



