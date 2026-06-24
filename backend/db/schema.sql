-- Smart Campus Database Schema

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'admin',
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    gender      TEXT NOT NULL,
    major       TEXT NOT NULL,
    grade       TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    status      TEXT NOT NULL DEFAULT '在读',
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    code        TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    teacher     TEXT NOT NULL,
    credits     INTEGER NOT NULL DEFAULT 3,
    students    INTEGER NOT NULL DEFAULT 0,
    status      TEXT NOT NULL DEFAULT '待开课',
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- Schedule table
CREATE TABLE IF NOT EXISTS schedule (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL,
    day         INTEGER NOT NULL,
    time        TEXT NOT NULL,
    room        TEXT NOT NULL,
    color       TEXT NOT NULL
);

-- Library books table
CREATE TABLE IF NOT EXISTS books (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    author      TEXT NOT NULL,
    category    TEXT NOT NULL,
    available   INTEGER NOT NULL DEFAULT 0,
    total       INTEGER NOT NULL DEFAULT 0,
    rating      REAL NOT NULL DEFAULT 0.0,
    isbn        TEXT UNIQUE
);

-- Canteen transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    type        TEXT NOT NULL,
    desc        TEXT NOT NULL,
    amount      REAL NOT NULL,
    time        TEXT NOT NULL,
    created_at  TEXT DEFAULT (datetime('now'))
);

-- Canteen menu floors
CREATE TABLE IF NOT EXISTS menu_floors (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    floor_name  TEXT NOT NULL,
    rating      REAL NOT NULL DEFAULT 0.0
);

-- Canteen menu dishes
CREATE TABLE IF NOT EXISTS menu_dishes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    floor_id    INTEGER NOT NULL,
    name        TEXT NOT NULL,
    price       REAL NOT NULL,
    calories    TEXT,
    protein     TEXT,
    tag         TEXT,
    FOREIGN KEY (floor_id) REFERENCES menu_floors(id)
);

-- Dormitory buildings
CREATE TABLE IF NOT EXISTS buildings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    rooms       INTEGER NOT NULL,
    capacity    INTEGER NOT NULL,
    occupied    INTEGER NOT NULL DEFAULT 0,
    type        TEXT NOT NULL,
    floor_count TEXT NOT NULL
);

-- Dormitory repair requests
CREATE TABLE IF NOT EXISTS repair_requests (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    building_id INTEGER NOT NULL,
    room        TEXT,
    category    TEXT NOT NULL,
    description TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT '待处理',
    time        TEXT NOT NULL,
    created_at  TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (building_id) REFERENCES buildings(id)
);

-- System settings (key-value)
CREATE TABLE IF NOT EXISTS settings (
    key         TEXT PRIMARY KEY,
    value       TEXT NOT NULL,
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- ===== SEED DATA =====

-- Admin user (password: admin123)
INSERT INTO users (username, password, role, name, email) VALUES
('admin', '$2b$10$MgznGR37srH7vjVhqIy66.2m1DV5jnEaQHq5TO8aUtbRZQyw3voAm', 'admin', '管理员', 'admin@campus.edu');

-- Students (matching frontend mock data)
INSERT INTO students (id, name, gender, major, grade, email, phone, status) VALUES
('2024001', '李明', '男', '计算机科学', '2024级', 'liming@campus.edu', '138****1234', '在读'),
('2024002', '王芳', '女', '经济管理', '2024级', 'wangfang@campus.edu', '139****5678', '在读'),
('2023001', '张伟', '男', '机械工程', '2023级', 'zhangwei@campus.edu', '137****9012', '在读'),
('2023002', '刘洋', '男', '计算机科学', '2023级', 'liuyang@campus.edu', '136****3456', '休学'),
('2022001', '陈静', '女', '艺术设计', '2022级', 'chenjing@campus.edu', '135****7890', '在读'),
('2022002', '赵磊', '男', '计算机科学', '2022级', 'zhaolei@campus.edu', '134****2345', '毕业'),
('2021001', '孙丽', '女', '经济管理', '2021级', 'sunli@campus.edu', '133****6789', '毕业'),
('2024003', '周杰', '男', '机械设计制造', '2024级', 'zhoujie@campus.edu', '132****0123', '在读');

-- Courses (matching frontend mock data)
INSERT INTO courses (code, name, teacher, credits, students, status) VALUES
('CS101', '数据结构与算法', '王教授', 4, 128, '进行中'),
('CS201', '操作系统', '李教授', 3, 96, '进行中'),
('MA101', '高等数学', '张教授', 5, 256, '进行中'),
('EN201', '大学英语', '刘老师', 2, 180, '进行中'),
('PH301', '大学物理', '陈教授', 3, 88, '已结束'),
('CS301', '计算机网络', '赵教授', 3, 72, '进行中'),
('SE401', '软件工程', '孙教授', 3, 64, '待开课');

-- Schedule (Monday-Friday timetable)
INSERT INTO schedule (course_code, day, time, room, color) VALUES
('MA101', 0, '08:00', 'A-301', 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800'),
('CS101', 0, '10:00', 'B-205', 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-800'),
('CS201', 1, '09:00', 'B-303', 'from-purple-50 to-indigo-50 border-purple-200 text-purple-800'),
('EN201', 1, '14:00', 'C-102', 'from-amber-50 to-yellow-50 border-amber-200 text-amber-800'),
('CS301', 2, '10:00', 'A-201', 'from-rose-50 to-pink-50 border-rose-200 text-rose-800'),
('MA101', 2, '14:00', 'A-301', 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800'),
('SE401', 3, '08:00', 'D-401', 'from-teal-50 to-emerald-50 border-teal-200 text-teal-800'),
('PH301', 3, '16:00', 'E-105', 'from-orange-50 to-red-50 border-orange-200 text-orange-800'),
('CS101', 4, '09:00', 'B-205', 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-800'),
('EN201', 4, '15:00', 'C-102', 'from-amber-50 to-yellow-50 border-amber-200 text-amber-800');

-- Library books
INSERT INTO books (title, author, category, available, total, rating) VALUES
('深入理解计算机系统', 'Randal E. Bryant', '计算机科学', 12, 15, 4.9),
('算法导论', 'Thomas H. Cormen', '计算机科学', 8, 20, 4.8),
('设计模式', 'Erich Gamma', '计算机科学', 5, 10, 4.6),
('操作系统概念', 'Abraham Silberschatz', '计算机科学', 15, 18, 4.7),
('计算机网络', 'Andrew S. Tanenbaum', '计算机科学', 3, 12, 4.5),
('线性代数', 'Gilbert Strang', '数学', 20, 25, 4.4);

-- Canteen menu floors and dishes
INSERT INTO menu_floors (floor_name, rating) VALUES
('一楼大厅', 4.5),
('二楼面点', 4.3),
('三楼特色', 4.7),
('四楼快餐', 4.2),
('五楼自助餐', 4.6);

-- Floor 1 dishes
INSERT INTO menu_dishes (floor_id, name, price, calories, protein, tag) VALUES
(1, '红烧肉', 28, '450kcal', '28g', '热门'),
(1, '宫保鸡丁', 22, '380kcal', '25g', '经典'),
(1, '麻婆豆腐', 15, '280kcal', '12g', '实惠'),
(1, '番茄炒蛋', 12, '220kcal', '15g', '经典'),
(1, '清蒸鱼', 35, '320kcal', '32g', '健康'),
(1, '回锅肉', 25, '420kcal', '26g', '热门'),
(1, '酸辣土豆丝', 10, '180kcal', '4g', '实惠'),
(1, '蒜蓉西兰花', 12, '150kcal', '8g', '健康');

-- Floor 2 dishes
INSERT INTO menu_dishes (floor_id, name, price, calories, protein, tag) VALUES
(2, '小笼包', 18, '350kcal', '14g', '经典'),
(2, '豆浆油条', 8, '320kcal', '12g', '经典'),
(2, '鲜肉馄饨', 15, '280kcal', '16g', '热门'),
(2, '牛肉面', 22, '480kcal', '30g', '热门'),
(2, '刀削面', 18, '420kcal', '18g', '经典'),
(2, '蒸饺', 16, '300kcal', '12g', '健康'),
(2, '烧麦', 14, '260kcal', '10g', '实惠'),
(2, '煎饼果子', 10, '350kcal', '14g', '实惠');

-- Floor 3 dishes
INSERT INTO menu_dishes (floor_id, name, price, calories, protein, tag) VALUES
(3, '水煮牛排', 58, '520kcal', '42g', '热门'),
(3, '酸菜鱼', 45, '380kcal', '35g', '热门'),
(3, '烤羊排', 68, '620kcal', '45g', '新品'),
(3, '糖醋鲤鱼', 52, '450kcal', '38g', '经典'),
(3, '剁椒鱼头', 48, '360kcal', '32g', '热门'),
(3, '北京烤鸭', 88, '580kcal', '40g', '经典'),
(3, '佛跳墙', 128, '420kcal', '36g', '新品'),
(3, '东坡肉', 55, '480kcal', '30g', '经典');

-- Floor 4 dishes
INSERT INTO menu_dishes (floor_id, name, price, calories, protein, tag) VALUES
(4, '炸鸡汉堡', 25, '550kcal', '22g', '热门'),
(4, '披萨', 32, '480kcal', '20g', '经典'),
(4, '意面', 28, '420kcal', '18g', '经典'),
(4, '沙拉', 18, '200kcal', '10g', '健康'),
(4, '咖喱饭', 22, '450kcal', '20g', '热门'),
(4, '寿司拼盘', 38, '320kcal', '16g', '新品'),
(4, '三明治', 15, '280kcal', '14g', '实惠'),
(4, '薯条可乐', 20, '480kcal', '8g', '实惠');

-- Floor 5 dishes
INSERT INTO menu_dishes (floor_id, name, price, calories, protein, tag) VALUES
(5, '海鲜拼盘', 68, '380kcal', '40g', '热门'),
(5, '自助火锅', 58, '520kcal', '35g', '热门'),
(5, '烤肉自助', 55, '480kcal', '38g', '经典'),
(5, '蔬菜沙拉吧', 25, '180kcal', '8g', '健康'),
(5, '水果吧', 20, '120kcal', '2g', '健康'),
(5, '甜品区', 15, '350kcal', '6g', '热门'),
(5, '饮品吧', 12, '80kcal', '1g', '实惠'),
(5, '主食区', 18, '400kcal', '15g', '经典');

-- Canteen transactions
INSERT INTO transactions (user_id, type, desc, amount, time) VALUES
(1, 'consume', '午餐 - 一楼红烧肉', -18.5, '2024-06-20 12:15:00'),
(1, 'consume', '早餐 - 二楼豆浆油条', -8.0, '2024-06-20 07:45:00'),
(1, 'recharge', '校园卡充值', 100.0, '2024-06-19 10:00:00'),
(1, 'consume', '晚餐 - 三楼酸菜鱼', -45.0, '2024-06-19 18:30:00'),
(1, 'consume', '午餐 - 四楼咖喱饭', -22.0, '2024-06-18 12:00:00'),
(1, 'recharge', '校园卡充值', 200.0, '2024-06-17 09:00:00');

-- Dormitory buildings
INSERT INTO buildings (name, rooms, capacity, occupied, type, floor_count) VALUES
('男生1号楼', 24, 96, 78, 'male', '4层'),
('男生2号楼', 24, 96, 82, 'male', '4层'),
('男生3号楼', 24, 96, 70, 'male', '4层'),
('女生1号楼', 24, 96, 88, 'female', '4层'),
('女生2号楼', 24, 96, 85, 'female', '4层'),
('女生3号楼', 24, 96, 76, 'female', '4层');

-- System settings
INSERT INTO settings (key, value) VALUES
('site_name', '智慧校园管理系统'),
('site_url', 'http://localhost:5173'),
('maintenance_mode', 'false'),
('email_notifications', 'true'),
('sms_notifications', 'false'),
('push_notifications', 'true');
