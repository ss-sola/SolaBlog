---
outline: deep
---

# 文件配置

## 文件/文件夹 名配置

插件默认开启 文件/文件夹 名下标提取排序功能，可以按 `[index].` 开头的结果进行排序。

::: code-group

```sh [目录结构]
├── guide
│   ├── config
│   │   ├── 1.types.md
│   │   ├── 2.files.md
│   │   └── index.md
│   └── index.md
└── index.md
```

```json [输出路由]
{
  "/guide/": [
    {
      "text": "Guide",
      "items": [
        {
          "text": "开始",
          "link": "guide/index.md"
        }
      ],
      "collapsed": false
    },
    {
      "text": "Config",
      "items": [
        {
          "text": "TS 类型",
          "link": "guide/config/1.types.md"
        },
        {
          "text": "文件配置",
          "link": "guide/config/2.files.md"
        },
        {
          "text": "插件可选项",
          "link": "guide/config/index.md"
        }
      ],
      "collapsed": false
    }
  ]
}
```

:::

## 文件配置

指定于文章内部 frontmatter 配置，同 [vitepress frontmatter 配置](https://vitepress.dev/zh/reference/frontmatter-config#outline)。

```md
---
title: Web Title
collapsed: false
---
```

### title

- 类型: `string`

文章显示标题，优先级最高。

```md
---
title: Web Title
---
```

### index

- 类型: `number`

文章排序顺序，优先级高于文件名称下标。

```md
---
index: 1
---
```

### hide

- 类型: `boolean`
- 默认值: `false`

是否隐藏文章。

```md
---
hide: true
---
```

### sortPrev

- 类型: `string`

输入指定文件名，排序于指定文件之前。

```md
---
sortPrev: filesName
---
```

### sortNext

- 类型: `string`

输入指定文件名，排序于指定文件之后。

```md
---
sortNext: filesName
---
```

> [!WARNING] 优先级
> 如果同时设置了 `sortPrev` 和 `sortNext`，`sortPrev` 优先级高于 `sortNext`

## 文件夹配置

> [!IMPORTANT] 以下配置可设置于文件夹下 `index.md` 文件内，如果设置会自动提取至文件夹配置并生效。

```sh {1-3,6}
├── guide
│   ├── config
│   │   ├── index.md
│   │   ├── files.md
│   │   └── types.md
│   └── index.md
└── index.md
```

### group

- 类型: `boolean`

是否为文件夹分组，会被提取到分组级别。

::: code-group

```md [config/index.md]
---
group: true
---
```

```sh [目录结构]
├── guide
│   ├── config
│   │   ├── index.md
│   │   ├── files.md
│   │   └── types.md
│   └── index.md
└── index.md
```

```json [输出路由]
{
  "/guide/": [
    {
      "text": "Guide",
      "items": [
        {
          "text": "开始",
          "link": "guide/index.md"
        }
      ],
      "collapsed": false
    },
    {
      "text": "Config",
      "items": [
        {
          "text": "插件可选项",
          "link": "guide/config/index.md"
        },
        {
          "text": "文件配置",
          "link": "guide/config/files.md"
        },
        {
          "text": "TS 类型",
          "link": "guide/config/types.md"
        }
      ],
      "collapsed": false
    }
  ]
}
```

:::

### groupTitle

- 类型: `string`

文件夹分组标题，同 [title](#title) 功效，但针对文件夹。

```md
---
groupTitle: Hello Web 🤖
---
```

### groupIndex

- 类型: `number`

文件夹分组排序顺序，同 [index](#index) 功效，但针对文件夹。

```md
---
groupIndex: 1
---
```

### groupAlone

- 类型: `boolean`

是否提取为单独分组，可设置多级目录中单独提取至顶层路由。

::: info 注意
设置独立分组为 true 后 [`group`](#group) 字段默认强制设为 true，主动设置 false 不生效。
:::

::: code-group

```md [config/index.md]
---
groupAlone: true
---
```

```sh [目录结构]
guide
├── config
│   ├── index.md
└── index.md
```

```json [输出路由]
{
  "/guide/": [
    {
      "text": "Guide",
      "items": [
        {
          "text": "开始",
          "link": "guide/index.md"
        }
      ],
      "collapsed": false
    }
  ],
  "/guide/config/": [
    {
      "text": "Config",
      "items": [
        {
          "text": "插件可选项",
          "link": "guide/config/index.md"
        }
      ],
      "collapsed": false
    }
  ]
}
```

:::

### collapsed

- 类型: `boolean`

是否折叠文件夹，默认不显示折叠按钮。

设置 `false` 情况下折叠为打开状态，如果希望加载时关闭，将 `collapsed` 设置为 `true`

```md
---
collapsed: true
---
```