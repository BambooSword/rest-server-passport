# 这是我在coursera网站 学习的node课程作业仓库

## 学习日报 - Friday, December 7, 2018
***

今天的主题是OAuth and	User	Authentication。
下面是OAuth的定义：

`Authorization	framework	based	on	open standards	for	Internet	users	to	log	into third	party	websites/apps	using	their	Social	Network	accounts`

我们现在都是用的OAuth2 protocol
### OAuth2 有4个roles,分别为

 - Resource	owner（你的第三方（eg:facebook）账号）
 - Client	Application（目前你使用的app）
 - Resource	Server (第三方的resource server)
 - Authorization	Server(处理 client application 的请求和 resource server授权结果等 的 server)

### OAuth2 Tokens
OAuth2 有Access token 和 Refress token
 - Access	token:	allows	access	to	user	data	by	the	client
application
 - Refresh	token:	Used	to	refresh	an	expired	access	token

### 注册一个client application 需要提供什么
  - Client App Id
  - Client Secret
  - Redirect URL: URLs	for	the	client	for	receiving	the
authorization	code	and	access	token

### 图解授权过程
![Authorization Code Grant Approach](/public/images/Picture.png)

### 本次练习内容
  - 利用 `passport-facebook`模块来对本应用进行Facebook登录授权
  - 如果使用proxy可能会导致授权失败，这个具体问题可以google（目前暂时不研究）


[markdown语法说明-en](https://daringfireball.net/projects/markdown/syntax)
[markdown语法说明-cn](https://markdown.tw/)
