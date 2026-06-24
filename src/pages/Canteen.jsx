import React from 'react'
import { UtensilsCrossed, Star, Clock, TrendingUp, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Receipt, Plus, Minus } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'

function Canteen() {
  const balance = 48.50
  const monthlySpent = 326.80
  const rechargeCount = 12

  const recentTransactions = [
    { id: 1, type: 'consume', desc: '午餐 - 一楼大厅', amount: -12.5, time: '今天 11:45', icon: ArrowDownRight, color: 'text-red-500 bg-red-50' },
    { id: 2, type: 'consume', desc: '早餐 - 二楼面点', amount: -5.0, time: '今天 07:30', icon: ArrowDownRight, color: 'text-red-500 bg-red-50' },
    { id: 3, type: 'recharge', desc: '余额充值', amount: 100, time: '昨天 18:20', icon: ArrowUpRight, color: 'text-emerald-500 bg-emerald-50' },
    { id: 4, type: 'consume', desc: '晚餐 - 三楼特色', amount: -18.0, time: '昨天 17:50', icon: ArrowDownRight, color: 'text-red-500 bg-red-50' },
    { id: 5, type: 'consume', desc: '午餐 - 一楼大厅', amount: -10.0, time: '前天 12:00', icon: ArrowDownRight, color: 'text-red-500 bg-red-50' },
    { id: 6, type: 'recharge', desc: '余额充值', amount: 200, time: '3天前', icon: ArrowUpRight, color: 'text-emerald-500 bg-emerald-50' },
  ]

  const menus = [
    { name: '一楼大厅', dishes: ['红烧排骨 ¥12', '糖醋里脊 ¥14', '清蒸鱼 ¥18', '麻婆豆腐 ¥6', '宫保鸡丁 ¥10', '西红柿炒蛋 ¥8', '青椒肉丝 ¥10', '鱼香肉丝 ¥12'], rating: 4.5 },
    { name: '二楼面点', dishes: ['兰州拉面 ¥10', '小笼包 ¥8', '煎饺 ¥6', '馄饨 ¥7', '刀削面 ¥9', '油条豆浆 ¥5', '包子 ¥4', '煎饼果子 ¥6'], rating: 4.3 },
    { name: '三楼特色', dishes: ['麻辣香锅 ¥16', '烤鱼 ¥28', '黄焖鸡 ¥15', '煲仔饭 ¥14', '烧腊 ¥12', '酸菜鱼 ¥22', '水煮鱼 ¥25', '毛血旺 ¥20'], rating: 4.7 },
    { name: '四楼快餐', dishes: ['盖浇饭 ¥10', '炒饭 ¥8', '三明治 ¥6', '沙拉 ¥12', '便当 ¥15', '米线 ¥9', '凉皮 ¥7', '肉夹馍 ¥8'], rating: 4.1 },
    { name: '五楼咖啡', dishes: ['美式咖啡 ¥12', '拿铁 ¥18', '抹茶蛋糕 ¥15', '果汁 ¥10', '冰淇淋 ¥8', '三明治 ¥12', '酸奶 ¥6', '沙拉 ¥14'], rating: 4.6 },
  ]

  const todaySpecials = [
    { name: '红烧排骨', price: '¥12', cal: '450kcal', tag: '热门', protein: '28g' },
    { name: '清蒸鲈鱼', price: '¥18', cal: '320kcal', tag: '健康', protein: '32g' },
    { name: '宫保鸡丁', price: '¥10', cal: '380kcal', tag: '经典', protein: '24g' },
    { name: '麻婆豆腐', price: '¥6', cal: '220kcal', tag: '实惠', protein: '12g' },
    { name: '番茄牛腩', price: '¥16', cal: '420kcal', tag: '新品', protein: '30g' },
    { name: '蒜蓉西兰花', price: '¥5', cal: '120kcal', tag: '素食', protein: '6g' },
  ]

  const stats = [
    { icon: UtensilsCrossed, label: '今日菜谱', value: '48道', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: TrendingUp, label: '满意度', value: '92.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Clock, label: '营业时间', value: '06:30-21:00', color: 'text-blue-600', bg: 'bg-blue-50' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">餐饮服务</h1>
        <p className="text-sm text-gray-500 mt-1">食堂菜单、营养分析和在线订餐</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => (
          <SimpleStatCard key={item.label} {...item} />
        ))}
      </div>

      {/* 校园一卡通卡片 */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-6 text-white shadow-lg card-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={18} className="text-primary-200" />
              <span className="text-sm font-medium text-primary-200">校园一卡通</span>
            </div>
            <p className="text-xs text-primary-300">2024年秋季学期</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary-200">账户余额</p>
            <p className="text-3xl font-bold mt-1">¥{balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs text-primary-200">本月消费</p>
            <p className="text-lg font-bold mt-1">¥{monthlySpent}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs text-primary-200">充值次数</p>
            <p className="text-lg font-bold mt-1">{rechargeCount}次</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs text-primary-200">日均消费</p>
            <p className="text-lg font-bold mt-1">¥{(monthlySpent / 30).toFixed(1)}</p>
          </div>
        </div>
        <div className="relative flex items-center gap-3 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 text-sm font-medium">
            <Plus size={16} />
            充值
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 text-sm font-medium">
            <Receipt size={16} />
            消费明细
          </button>
        </div>
      </div>

      {/* 最近消费记录 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Receipt size={18} className="text-primary-600" />
            最近消费
          </h3>
          <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">查看全部 →</button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer glow-hover">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${tx.color} rounded-xl flex items-center justify-center`}>
                  <tx.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.time}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount}元
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Specials */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <h3 className="text-base font-semibold text-gray-900 mb-4">今日推荐</h3>
          <div className="grid grid-cols-2 gap-3">
            {todaySpecials.map((dish) => (
              <div key={dish.name} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer glow-amber">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{dish.name}</span>
                  <span className="text-xs font-semibold text-primary-600">{dish.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{dish.cal} · 蛋白质{dish.protein}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-md">{dish.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canteen Menus */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <h3 className="text-base font-semibold text-gray-900 mb-4">各楼层菜单</h3>
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {menus.map((canteen) => (
              <div key={canteen.name} className="p-3 bg-gray-50 rounded-xl card-glow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">{canteen.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs text-gray-600">{canteen.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {canteen.dishes.map((dish) => (
                    <span key={dish} className="text-xs px-2 py-1 bg-white rounded-lg text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-600 transition-colors cursor-pointer">
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canteen
