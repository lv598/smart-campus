import React, { useState, useEffect } from 'react'
import { UtensilsCrossed, Star, Clock, TrendingUp, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Receipt, Plus, Minus } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'
import { canteen } from '../lib/api'

function Canteen() {
  const [menus, setMenus] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMenus = async () => {
    try {
      const result = await canteen.menus()
      setMenus(result.data)
    } catch (err) {
      console.error('Failed to load menus:', err)
    }
  }

  const loadTransactions = async () => {
    try {
      const result = await canteen.transactions()
      setTransactions(result.data)
    } catch (err) {
      console.error('Failed to load transactions:', err)
    }
  }

  useEffect(() => {
    Promise.all([loadMenus(), loadTransactions()]).finally(() => setLoading(false))
  }, [])

  // Transform backend menu data to frontend format
  const formattedMenus = menus.map(floor => ({
    name: floor.floor_name,
    dishes: floor.dishes.map(d => `${d.name} ¥${d.price}`),
    rating: floor.rating
  }))

  // Transform transactions
  const formattedTransactions = transactions.map(tx => ({
    id: tx.id,
    type: tx.type,
    desc: tx.desc,
    amount: tx.amount,
    time: tx.time || '未知',
    icon: tx.type === 'consume' ? ArrowDownRight : ArrowUpRight,
    color: tx.type === 'consume' ? 'text-red-500 bg-red-50' : 'text-emerald-500 bg-emerald-50'
  }))

  const balance = transactions.filter(t => t.type === 'recharge').reduce((s, t) => s + t.amount, 0) -
                  Math.abs(transactions.filter(t => t.type === 'consume').reduce((s, t) => s + t.amount, 0))
  const monthlySpent = Math.abs(transactions.filter(t => t.type === 'consume').reduce((s, t) => s + t.amount, 0))
  const rechargeCount = transactions.filter(t => t.type === 'recharge').length

  const allDishes = menus.flatMap(f => f.dishes || [])
  const todaySpecials = allDishes.slice(0, 6).map(d => ({
    name: d.name,
    price: `¥${d.price}`,
    cal: d.calories || '-',
    tag: d.tag || '推荐',
    protein: d.protein || '-'
  }))

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">餐饮服务</h1>
        <p className="text-sm text-gray-500 mt-1">食堂菜单、营养分析和在线订餐</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SimpleStatCard icon={UtensilsCrossed} label="今日菜谱" value={`${allDishes.length}道`} color="text-orange-600" bg="bg-orange-50" />
        <SimpleStatCard icon={TrendingUp} label="满意度" value="92.5%" color="text-emerald-600" bg="bg-emerald-50" />
        <SimpleStatCard icon={Clock} label="营业时间" value="06:30-21:00" color="text-blue-600" bg="bg-blue-50" />
      </div>

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
            <p className="text-lg font-bold mt-1">¥{monthlySpent.toFixed(2)}</p>
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
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-medium"><Plus size={16} />充值</button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-medium"><Receipt size={16} />消费明细</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2"><Receipt size={18} className="text-primary-600" />最近消费</h3>
          <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">查看全部 →</button>
        </div>
        {loading ? (
          <div className="text-center py-4 text-gray-400">加载中...</div>
        ) : (
          <div className="space-y-2">
            {formattedTransactions.slice(0, 6).map((tx) => (
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
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <h3 className="text-base font-semibold text-gray-900 mb-4">今日推荐</h3>
          <div className="grid grid-cols-2 gap-3">
            {todaySpecials.map((dish) => (
              <div key={dish.name} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer glow-amber">
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

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-glow">
          <h3 className="text-base font-semibold text-gray-900 mb-4">各楼层菜单</h3>
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {formattedMenus.map((canteen) => (
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
                    <span key={dish} className="text-xs px-2 py-1 bg-white rounded-lg text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-600 transition-colors cursor-pointer">{dish}</span>
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
