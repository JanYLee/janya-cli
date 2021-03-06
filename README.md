# 个人的前端脚手架

## 安装
```bash
yarn global add janya-cli
# or
npm install janya -g
```

## 使用

1. 直接使用, 会拉取我的帐号下的 [janya-tpl-fe-base](https://github.com/JanYLee/janya-tpl-fe-base) 仓库代码
   ```bash
   janya init
   # or
   janya i
   ```

2. 设置仓库来源, 你可以把来源设成你自己git名字, 然后拉取自己的仓库
   ```bash
   janya config set registry xxx

   e.g. janya config set registry JanYLee
   ```
3. 查看仓库来源
   ```bash
   janya config get

      registry=xxx
      type=users
   ```
4. 拉取这个源的仓库
   ```bash
   janya init <templateName> <projectName>

   e.g. janya init employ-app myapp
   ```
5. 移除仓库来源
   ```bash
   janya remove registry xxx
   ```