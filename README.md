# 冠金環保有限公司 - 網站

這是「冠金環保有限公司」的企業官方網站。本網站主要提供中彰投雲苗地區專業的廢棄物清理服務資訊，包含服務項目介紹、合法執照展示，並提供客戶線上免費估價的表單功能。

網站網址
由於此公司並沒有購買域名故綁定在GITHUB


*   **RWD 響應式設計**：完美適配手機、平板與桌上型電腦螢幕。
*   **線上免費估價系統**：內建即時表單驗證，並透過 [Formspree](https://formspree.io/) 串接，將客戶需求直接發送至指定的電子信箱。
*   **動態使用者體驗**：
    *   網頁元素捲動進場動畫 (Fade In Up)。
    *   滑動時導覽列自動變色與毛玻璃效果 (Backdrop-filter)。
    *   手機版專屬漢堡選單 (Hamburger Menu)。
*   **快速聯絡按鈕**：右下角常駐 LINE 官方帳號浮動按鈕，方便客戶隨時諮詢。
*   **剪貼簿複製功能**：點擊聯絡資訊的文字即可快速複製（例如電子郵件、電話）。

## 🛠️ 開發技術 (Tech Stack)

*   **HTML5**: 語意化標籤架構。
*   **CSS3**: 
    *   純 CSS 排版 (Flexbox & Grid)。
    *   客製化 CSS 動畫 (Keyframes)。
    *   無依賴任何前端 CSS 框架 (如 Bootstrap 或 Tailwind)。
*   **JavaScript (Vanilla JS)**: 處理 DOM 操作、表單驗證、非同步表單提交 (Fetch API) 與捲動監聽。

## 📦 第三方資源與服務 (Third-Party Resources)

*   **字體**: [Google Fonts - Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC) (思源黑體)。
*   **圖示**: [Font Awesome 6.0.0](https://fontawesome.com/)。
*   **表單處理**: [Formspree](https://formspree.io/) (API Endpoint: `https://formspree.io/f/mwpnrklz`)。

## 📂 檔案結構 (File Structure)

```text
guanjin-main/
│
├── index.html          # 網站首頁
├── evaluate.html       # 免費線上估價頁面
├── license.html        # 執照資訊與相關法規頁面
├── 404.html            # 自訂 404 錯誤頁面
│
├── styles.css          # 全域與各頁面 CSS 樣式表
├── script.js           # 全域 JavaScript 邏輯控制
│
├── logo.png            # 網站 Logo
├── IMG_0690.png        # 首頁 Hero 區塊背景圖
├── favicon_rounded.ico # 網站圖示 (Favicon)
├── site.webmanifest    # PWA Web Manifest (選用)
└── README.md           # 專案說明文件
