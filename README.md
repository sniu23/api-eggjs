
## 模板

- [egg-boilerplate-simple](https://github.com/eggjs/egg-boilerplate-simple)

## 异常处理

- 可预见的异常： 直接抛出 `Error` 后由中间件 `errorHander` 捕获并调整响应json格式
- 未捕获的异常： 由框架统一处理。（ 定义默认 `500` 和 `404` 重定向html页面 ）

## 接口定义

- 除 `服务器发生异常未捕获（500）` 或 `访问不存在的uri（404）` 之外，正常情况下，**无论响应成功或失败，`status` 均为 `200`**
- 响应 JSON 格式：
    - 成功：
        - 查询 (如：GET) 类： `{ success: true, data: any }`
        - 非查询 (如：POST) 类： `{ success: true, message: string, data: any | none }`
    - 失败： 
        - 统一定义： `{ success: false, message: any }`