# 使用ESlint自动格式化代码

当搜索如何使用ESlint在保存时自动格式化代码时，通常会出现很多无效的解决方式(大多需要prettier,并且需要额外的配置文件)，大多会推荐安装`prettier`或者`standard`，但其实仅使用ESlint就可以满足按项目风格自动格式化代码的要求，并且配置非常简单。

## 全局安装`eslint`

```shell
npm insatll -g eslint
```

## 新建文件`eslint-demo`

```shell
mkdir eslint-demo
```

## 创建`.eslintrc.js`配置文件

```shell
# 进入项目目录
cd eslint-demo
# 新建.eslintrc.js文件
npx eslint --init
# 按提示进行配置，完成后会在项目根目录生成.eslintec.js文件
```

## 在`VsCode`中配置自动格式化

实际上`eslint`的格式化配置非常简单，不需要其他插件的配合，只需要在`vscode`的`settings.json`中简单配置即可使用

```json
// 文件 => 首选项 => 设置 => (右上角)打开设置json即可进入settings.json文件
{
  // 保存时启动eslint的自动格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // eslint格式化匹配文件
  "eslint.validate": [
    "javascript",
    "vue",
  ]
}
```

这样在编辑代码的时候，如果不符合`eslint`的配置规则，则会根据配置选项给出相应的提示，并且在保存时会自动格式化代码

`eslint`的具体`rules`可[点击](https://eslint.bootcss.com/docs/rules/)查看



