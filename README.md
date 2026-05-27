# 生物会考冲刺刷题 - 部署指南

## 方法一：通过本地服务器部署（推荐）

### Windows 系统

#### 1. 使用 Python（如果已安装）
```bash
# 在 BIOLOGY 文件夹中打开命令行，运行：
python -m http.server 8000

# 或者 Python 3
python3 -m http.server 8000
```

#### 2. 使用 Node.js（如果已安装）
```bash
# 安装 serve
npm install -g serve

# 在 BIOLOGY 文件夹中运行
serve .
```

#### 3. 使用 VS Code Live Server 插件
- 安装 VS Code 的 Live Server 插件
- 右键点击 `biology-quiz.html`
- 选择 "Open with Live Server"

### 手机访问
1. 确保手机和电脑连接到同一个 Wi-Fi
2. 在电脑上打开命令行，输入 `ipconfig` 查看本机 IP 地址（如 192.168.1.100）
3. 在手机浏览器中访问：`http://192.168.1.100:8000/biology-quiz.html`
4. 等待页面加载完成后，应用会自动缓存，之后可离线使用

---

## 方法二：通过 GitHub Pages 部署

### 步骤：
1. 在 GitHub 创建新仓库
2. 上传所有文件（biology-quiz.html、manifest.json、sw.js、image 文件夹）
3. 进入仓库 Settings → Pages
4. Source 选择 "Deploy from a branch"，选择 main 分支
5. 等待几分钟后访问：`https://你的用户名.github.io/仓库名/biology-quiz.html`

### 优点：
- 免费托管
- 自动 HTTPS
- 支持安装为 APP

---

## 方法三：直接安装到手机（Android）

### 通过 Chrome 浏览器：
1. 用 Chrome 打开网页（本地服务器或 GitHub Pages）
2. 等待几秒，会弹出"添加到主屏幕"提示
3. 或者点击浏览器菜单 → "添加到主屏幕"
4. 安装后可在桌面找到应用图标，像原生 APP 一样使用

### 特点：
- 离线可用
- 全屏运行
- 有独立的 APP 图标

---

## 方法四：iOS 设备安装

### 步骤：
1. 用 Safari 打开网页
2. 点击分享按钮（向上箭头）
3. 选择"添加到主屏幕"
4. 命名后点击"添加"

### 特点：
- 会缓存到本地
- 从桌面启动时全屏显示
- 像原生 APP 一样运行

---

## 离线使用说明

### 首次访问需要联网：
- 应用会自动缓存所有资源
- 包括题库、图片、样式等
- 缓存完成后会显示"离线可用"提示

### 之后可完全离线：
- 在飞机、地铁等无网络环境下使用
- 学习进度保存在本地
- 再次联网时会自动同步

---

## 文件清单

```
BIOLOGY/
├── biology-quiz.html      # 主应用文件
├── manifest.json          # PWA 配置文件
├── sw.js                 # Service Worker（离线支持）
├── README.md             # 本说明文档
├── questions-data.js     # 题库数据（已集成到 HTML）
└── image/                # 图片素材
    ├── biology.png       # APP 图标
    ├── panda*.png        # 熊猫表情
    ├── coin*.png         # 奖励图标
    └── ...
```

---

## 常见问题

### Q: 为什么点击按钮没反应？
A: 需要通过 HTTP/HTTPS 协议访问，不能直接双击打开 HTML 文件。请使用上述部署方法之一。

### Q: 如何清除缓存和进度？
A: 
- Chrome: 设置 → 隐私和安全 → 清除浏览数据
- 或在应用中右键 → 检查 → Application → Clear storage

### Q: 如何更新题库？
A: 
- 联网访问网页时会自动检查更新
- 或清除缓存后重新访问

### Q: iOS 上为什么没有离线提示？
A: iOS Safari 的缓存机制不同，但添加到主屏幕后可以离线使用。

---

## 技术支持

如遇到问题，请检查：
1. 浏览器是否支持 PWA（Chrome、Edge、Safari 等）
2. 是否通过 HTTP/HTTPS 访问
3. 浏览器控制台是否有错误信息
