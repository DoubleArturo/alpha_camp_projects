
'use strict' // 啟用strict mode，參考小鹿Kerwin同學作業

const express = require('express')


const restaurantList = require('./restaurant.json').results //Sam助教：建議簡化coding style
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')

//setting static files
app.use(express.static('public'))

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // console.log(req)
  console.log(req.params)
  // console.log(restaurant)
  res.render('show', { restaurantsDetails: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })

  /*原始想法，
  1. 將關鍵字.trim() || 直接判斷length
  2. DOM的做法是用alert，但彈跳視窗在手機的體驗很差，新增一個noresult頁面
  但遇到一個問題 search?keyword=++++++，不知如何處理 ++ 因此觀摩同學的寫法
   if (keyword.trim().length === 0) {
     alert(`I am sorry, the {{keyword}} you search is not exist`)
  */

  //參考白白同學的code，不判斷輸入的關鍵字，直接看 restaurants陣列是否有東鄉
  if (!restaurants.length) {
    return res.render('noresults', { restaurants: restaurants, keyword: keyword })
  }

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port} `)
})