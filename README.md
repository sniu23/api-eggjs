
## 初始模板

- [egg-boilerplate-simple](https://github.com/eggjs/egg-boilerplate-simple)

## 异常处理

- 可预见的异常： 直接抛出 `Error` 后由中间件 `errorHander` 捕获并调整响应json格式
- 未捕获的异常： 由框架统一处理。（ 定义默认 `500` 和 `404` 重定向html页面 ）

## 接口定义

- 除 `服务器发生异常未捕获（500）` 或 `访问不存在的uri（404）` 之外，正常情况下，**无论响应成功或失败，`status` 均为 `200`**
- 响应 JSON 格式：
    - 成功：
        - 查询 (如：GET) 类： `{ success: true, data: any }`
        - 非查询 (如：POST) 类： `{ success: true, message: string, data: null | any }`
    - 失败： 
        - 统一定义： `{ success: false, message: string }`
- 查询无数据： `{ success: true, data: null }`

## 常见命名

|ui          |uri                 |controller|service  |orm         |
|-           |-                   |-         |-        |-           |
|search/list |get  /user          |list      |select   |select/count/query|
|info        |get  /user/:id      |info      |get      |get/queryOne|
|edit        |post /user          |make      |insert   |insert/query|
|edit        |post /user/:id      |edit      |update   |update/query|
|drop        |del  /user/:id      |drop      |delete   |delete/query|
|*Muti       |post /user/*Muti    |*Muti     |*Muti    |*           |

- service 多是数据库存取视角， 上层 controller 多是业务数据操作视角

```js
/* 
many：ctx.query -> where, columns, orders, limit, offset
    select(where, columns, orders, limit=20, offset=0)
    get(where, columns, orders)
one ：ctx.request.body -> row, ctx.params -> where (keys), ctx.query -> columns, orders
    insert(row, columns)
    update(row, where, columns)
    delete(where)
*/
```

|easy-mock  |axios |eggjs |
|-          |-     |-     |
|_req.params|      |params|
|_req.query |params|query |
|_req.body  |data  |body  |

## 数据存取

[ali-rds](https://github.com/ali-sdk/ali-rds/)

|function |params                  |params detail                                    |return  |return detail|
|-        |-                       |-                                                |-       |-            |
|*query   |(sql, values)           |                                                 |        |             |
|*queryOne|(sql, values)           |                                                 |row     |{} / null    |
|*select  |(table, options)        |table, { columns, where, orders, limit, offset } |rows    |[]           |
|*get     |(table, where,  options)|table, where, { columns }                        |row     |{} / null    |
|*insert  |(table, row[s], options)|table, row[s]: [] / {}, { columns=firstRowKeys } |result  |             |
|*update  |(table, row,    options)|table, row: {}, { columns=rowKeys, where=id }    |result  |             |
|*delete  |(table, where)          |                                                 |result  |             |
|*count   |(table, where)          |                                                 |number  |             |

- format(sql, values, stringifyObjects, timeZone) [出处](https://github.com/mysqljs/sqlstring)

**注意：**  
- update: columns 会自动排除 where 中的字段不去更新
- insert: 一次可以是多条记录，默认插入的 columns 是第一行记录的字段

```js
let rows = yield db.select('table-name', {
  where: {
    type: 'javascript'
  },
  columns: ['author', 'title'],
  orders: [['id', 'desc']]
});

=> SELECT `author`, `title` FROM `table-name` WHERE `type` = 'javascript' ORDER BY `id` DESC

//transaction
let tran = yield db.beginTransaction();
try {
  yield tran.insert(table, row1);
  yield tran.update(table, row2);
  yield tran.commit();
} catch (err) {
  yield tran.rollback(); // rollback call won't throw err
  throw err;
}

// result
{
fieldCount: 0,
affectedRows: 1,
insertId: 0,
serverStatus: 2,
warningCount: 0,
message: '(Rows matched: 1  Changed: 1  Warnings: 0',
protocol41: true,
changedRows: 1
}

// literals
yield app.mysql.insert(table, {
  create_time: app.mysql.literals.now
});
```