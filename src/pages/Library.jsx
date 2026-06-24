import React from 'react'
import { BookOpen, Search, Clock, TrendingUp } from 'lucide-react'
import { SimpleStatCard } from '../components/StatCard'

function Library() {
  const books = [
    { title: '深入理解计算机系统', author: 'Randal E. Bryant', category: '计算机科学', available: 3, total: 5, rating: 4.9 },
    { title: '算法导论', author: 'Thomas H. Cormen', category: '计算机科学', available: 1, total: 8, rating: 4.8 },
    { title: '设计模式', author: 'GoF', category: '软件工程', available: 5, total: 5, rating: 4.6 },
    { title: '操作系统概念', author: 'Abraham Silberschatz', category: '计算机科学', available: 0, total: 4, rating: 4.7 },
    { title: '计算机网络', author: 'Andrew S. Tanenbaum', category: '网络工程', available: 2, total: 3, rating: 4.5 },
  ]

  const stats = [
    { icon: BookOpen, label: '馆藏总量', value: '1,258,000', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: '本月借阅', value: '12,450', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Clock, label: '当前在馆', value: '3,280', color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">图书馆</h1>
        <p className="text-sm text-gray-500 mt-1">图书检索、借阅管理和阅读推荐</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item) => (
          <SimpleStatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-glow">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索书名、作者、ISBN..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-300"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {books.map((book) => (
            <div key={book.title} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer glow-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900">{book.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{book.author} · {book.category}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-amber-500">★</span>
                    <span className="text-xs text-gray-600">{book.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {book.available}/{book.total} 在馆
                  </p>
                  <div
                    className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={book.available}
                    aria-valuemin={0}
                    aria-valuemax={book.total}
                    aria-label={`${book.title} 在馆 ${book.available}/${book.total}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        book.available === 0
                          ? 'bg-red-400'
                          : book.available < book.total / 2
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${(book.available / book.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library
