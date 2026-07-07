# TripType Lab｜TPTI 旅行人格测试

**Travel Personality Type Indicator** — 个人作品集 demo

**线上地址：** https://zhuhanyu-growprety.github.io/triptype-lab/

## 项目定位

这是一个个人学习 / 作品集展示项目，用于演示移动端 H5 风格的互动测试产品：场景化题库、答题流程、结果计算与结果页呈现。

- 无后端
- 无登录
- 无数据库
- 无真实接口
- 不代表任何官方平台或真实商业服务

## 技术栈

- React
- Vite
- react-router-dom（HashRouter）
- 普通 CSS
- localStorage

## 核心功能

- **首页**：展示测试介绍、Hero 图与开始入口；若已有历史结果，可快速查看上次结果
- **答题页**：12 道旅行场景选择题，带进度条、题目插画与选项卡片；支持上一题回溯
- **结果页**：根据四维偏好模型计算 16 种旅行人格之一，展示结果文案与独立人格插画
- **本地持久化**：最近一次答案、分数、typeCode 与结果保存在 localStorage
- **结果分享**：支持通过 URL 参数分享测试结果

## 本地运行

```bash
npm install
npm run dev
```

浏览器访问终端提示的本地地址（通常为 `http://localhost:5173`）。

## 构建

```bash
npm run build
```

产物输出至 `dist/` 目录。

### GitHub Pages

项目已配置 Vite `base` 路径，可通过环境变量切换：

```bash
GITHUB_PAGES=true npm run build
```

使用 HashRouter，部署到 GitHub Pages 后刷新与路由均可正常工作。

## 素材说明

- 题库内容：`src/data/tptiContent.json`
- 图片资源：`public/assets/tpti/` 与 `public/assets/tpti/results/`

## 免责声明

本测试为个人作品集 demo，用于展示 C 端互动产品策划、内容设计与结果页表达能力。测试结果仅代表旅行偏好倾向，不属于严肃心理测评，也不代表任何官方平台、品牌活动或真实商业服务。
