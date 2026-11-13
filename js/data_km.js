'use strict';
// 昆明 · 2000 场景（社区修改版新增地图）。地理来自 OpenStreetMap（geo_km.js，现代数据），本文件补充 2000 年起的区域开放（按街道划分）、
// 人口就业中心、地标、历史事件、本地任务与人民币经营参数。坐标单位为格（250 m），用 ll(纬度, 经度) 换算。
// 真实性：呈贡新城、长水机场、昆明南站、地铁开通、COP15 等为史实参考；2000 年人口与就业分布、增长曲线、造价与票价为估算。
(function (CM) {
  const G = CM.GEOS && CM.GEOS.km; if (!G) return;
  const P = G.proj, ll = function (lat, lon) { return [+((lon - P.lon0) * P.kx).toFixed(2), +((P.lat0 - lat) * P.ky).toFixed(2)]; };
  const poly = function (pts) { return pts.map(function (p) { return ll(p[0], p[1]); }); };
  const at = function (lat, lon, o) { const p = ll(lat, lon); return Object.assign({ x: p[0], y: p[1] }, o); };
  const anchor = function (name, lat, lon, r) { const p = ll(lat, lon); return { name: name, x: p[0], y: p[1], r: r }; };

  // 西山（碧鸡山）山体：沿滇池西岸的狭长山地，不能开发
  const xishan = poly([[25.0720, 102.6080], [25.0720, 102.6670], [25.0300, 102.6720], [24.9600, 102.6600], [24.9380, 102.6300], [24.9800, 102.6020]]);
  // 巫家坝机场（1922–2012）：跑道 03/21 走向，机场范围 2012 年后才可开发
  const wujiaba = poly([[24.9523, 102.7229], [24.9843, 102.7439], [24.9957, 102.7321], [24.9637, 102.7111]]);

  const data = {
    traits: [
      { use: 'scenic', star: true, icon: 'mountain', label: '滇池与西山', text: '滇池水面与西山森林不能开发，线路只能从地下穿过或绕行，还要另付环境费', why: '滇池是国家级风景名胜区的核心，西山是森林公园与自然保护区，两者都严格限制开发。' },
      { use: 'crossing', star: true, icon: 'wave', label: '滇池与盘龙江', text: '跨过滇池出水口、盘龙江和入湖河道要另付造价，湖面越宽越贵', why: '昆明主城依滇池北岸展开，盘龙江、宝象河、大观河把城区切成几片，跨水是绕不开的工程。' },
      { use: 'mountain', level: 'mid', label: '西山山地', why: '西山山体陡峭，只能以隧道通过，造价明显高于平地。' },
      { use: 'carLimit', level: 'light', label: '2007 年禁摩', on: { y: 2007, m: 5, title: '昆明主城禁止摩托车通行', desc: '5 月 1 日起，昆明主城区道路禁止摩托车通行，短途出行更多转向公交与自行车。' }, why: '昆明自 2007 年 5 月 1 日起在主城区实施禁摩。' },
      { use: 'finance', flavor: 'cn' },
    ],
    city: '昆明', riverName: '盘龙江', hsrYear: 2016,
    stages: [[2003, '现代新昆明'], [2011, '呈贡新区'], [2016, '高铁时代']], stageLast: '滇池时代',
    eras: [
      { id: 'km-e1', from: 2000, name: '单中心期', tag: '史实',
        summary: '史实：2000 年的昆明是典型的单中心城市，东风广场、南屏街一带是商业中心，翠湖与圆通山以北是文教区，西郊马街与北郊茨坝是工厂区；城市紧贴滇池北岸，南面是农田与湖滨。估算：新增人口主要落在北市区与东市区，呈贡尚未开发。',
        grow: { pop: { center: 0.85, beishi: 1.25, dongshi: 1.2, nanshi: 1.15, xishi: 1.1 }, jobs: { center: 1.0, guandu: 1.15, xishi: 1.2, jinqma: 1.1 } },
        demand: { decayHW: 0.95 }, corridors: [{ a: 'beishi', b: 'center', f: 1.1 }],
        goals: [{ id: 'km-g1', type: 'connect', months: 48, reward: 38000, title: '东风广场与火车南站', desc: '昆明站是全省的铁路门户，东风广场是商业中心，两者之间公交拥挤。用地铁把昆明站与东风广场连起来。', anchors: [anchor('昆明站', 25.0169, 102.7221, 3), anchor('东风广场', 25.0389, 102.7183, 3)] }] },
      { id: 'km-e2', from: 2003, name: '现代新昆明', tag: '史实',
        summary: '史实：2003 年云南提出建设「现代新昆明」，确定「一湖四片」的格局，呈贡新城开始建设，主城开始向外疏解。估算：呈贡与经开区获得新的岗位，北市区与南市区继续吸纳居住人口。',
        grow: { pop: { beishi: 1.3, nanshi: 1.3, chenggong: 1.5, xishi: 1.15 }, jobs: { center: 0.9, chenggong: 1.4, jingkai: 1.5, guandu: 1.2 } },
        relocate: { jobs: { center: 0.0003 }, pop: { center: 0.0002 } },
        demand: { sc: 1.05, decayHW: 1.05 },
        corridors: [{ a: 'beishi', b: 'center', f: 1.15 }, { a: 'chenggong', b: 'center', f: 1.1 }] },
      { id: 'km-e3', from: 2011, name: '呈贡新区', tag: '史实',
        summary: '史实：2011 年昆明市级行政中心迁入呈贡，呈贡大学城陆续建成；2012 年长水国际机场启用、地铁 6 号线机场段开通。估算：呈贡的岗位快速增长，主城与呈贡之间的通勤成为新的主要走廊。',
        grow: { pop: { chenggong: 1.5, nanshi: 1.25, beishi: 1.2 }, jobs: { chenggong: 1.8, center: 0.85, jingkai: 1.4, dabanqiao: 1.3 } },
        relocate: { jobs: { center: 0.0005 } },
        demand: { sh: 1.05, hub: 1.1, decayHW: 1.1 },
        corridors: [{ a: 'chenggong', b: 'center', f: 1.2 }, { a: 'chenggong', b: 'nanshi', f: 1.15 }],
        goals: [{ id: 'km-g2', type: 'connect', months: 60, reward: 52000, title: '主城到呈贡', desc: '行政中心迁到呈贡后，每天有大量通勤往来于主城与呈贡之间。用地铁把东风广场一带与呈贡连起来。', anchors: [anchor('东风广场', 25.0389, 102.7183, 4), anchor('呈贡（龙城）', 24.8917, 102.8046, 4)] }] },
      { id: 'km-e4', from: 2016, name: '高铁时代', tag: '史实',
        summary: '史实：2016 年 12 月沪昆高铁开通，昆明南站成为西南地区的重要高铁枢纽；2021 年中老铁路通车，昆明成为面向南亚东南亚的枢纽。估算：呈贡与经开区的岗位继续增长，主城人口缓慢外迁。',
        grow: { pop: { chenggong: 1.35, nanshi: 1.2, dabanqiao: 1.2 }, jobs: { chenggong: 1.5, jingkai: 1.4, center: 0.85, guandu: 1.15 } },
        demand: { lz: 1.1, hub: 1.2, decayHW: 1.1 },
        corridors: [{ a: 'chenggong', b: 'center', f: 1.2 }, { a: 'dabanqiao', b: 'chenggong', f: 1.15 }],
        goals: [{ id: 'km-g3', type: 'connect', months: 60, reward: 50000, title: '高铁站接驳', desc: '昆明南站投用后，旅客要在南站与主城之间换乘。用地铁把昆明南站与主城中心连起来。', anchors: [anchor('昆明南站', 24.8800, 102.8600, 4), anchor('东风广场', 25.0389, 102.7183, 3)] }] },
      { id: 'km-e5', from: 2021, name: '模拟未来', tag: '模拟',
        summary: '模拟：此后的发展按模型推演，不代表真实历史。估算：呈贡、经开区与长水机场一带继续成长，主城保持稳定。',
        grow: { pop: { chenggong: 1.25, dabanqiao: 1.2, nanshi: 1.15 }, jobs: { chenggong: 1.3, jingkai: 1.25, center: 0.85 } },
        demand: { lz: 1.05, decayHW: 1.1 }, corridors: [{ a: 'chenggong', b: 'jingkai', f: 1.15 }] },
    ],
    briefing: {
      lead: '2000 年的昆明还没有地铁。城市紧贴滇池北岸，东风广场与南屏街是唯一的市中心，北面是文教区，西郊与北郊是工厂；滇池西岸的西山把城市挡在湖边，往南则是一片农田与湖滨。',
      modes: [['metro', '地铁', '尚无地铁，你将规划昆明的第一条线路。'], ['bus', '公交与自行车', '主干道集中在东风路、北京路、人民路一带，高峰拥堵明显。'], ['bridge', '跨水', '盘龙江、宝象河与大观河穿过城区，跨河桥不多，滇池沿岸只有少数几条路。'], ['rail', '铁路', '昆明站是全省门户，成昆、贵昆、南昆三条铁路在此交汇。列车本身不参与模拟，但车站会产生市内接驳出行，地面铁路会阻隔步行。']],
    },
    airport: { name: '巫家坝机场', closeYear: 2012.5, buildable: 'underground', runway: [ll(24.9580, 102.7170), ll(24.9900, 102.7380)] },
    runways: [{ a: ll(25.1010, 102.9130), b: ll(25.1105, 102.9430), from: 2012.49 }],
    regions: [
      { id: 'xishan', name: '西山（碧鸡山）', poly: xishan, scenic: true, open: null, relief: 620, note: '西山森林公园与滇池西岸山地，不能开发，只能以隧道通过（史实）' },
      { id: 'airport', name: '巫家坝机场（旧址）', poly: wujiaba, open: 2012, plan: 'newtown', note: '1922 年通航、2012 年 6 月关闭；机场运营期间范围内可以地下设站与地下穿越，关闭后改为巫家坝新中心（史实）' },
      { id: 'dianchi_resort', name: '滇池度假区（海埂）', geo: { admin: '昆明滇池国家旅游度假区' }, open: 2000, plan: 'res', note: '1992 年设立昆明滇池国家旅游度假区（史实）' },
      { id: 'center', name: '东风广场·南屏街（老城中心）', streets: ['护国街道', '华山街道', '大观街道', '金碧街道'], open: 2000, plan: 'oldmix' },
      { id: 'beishi', name: '北市区（小菜园·火车北站·茨坝）', streets: ['鼓楼街道', '联盟街道', '金辰街道', '东华街道', '莲华街道', '龙翔街道', '红云街道', '丰宁街道', '茨坝街道'], open: 2000, plan: 'res' },
      { id: 'dongshi', name: '东市区（董家湾·东站·白塔路）', streets: ['拓东街道', '太和街道', '吴井街道'], open: 2000, plan: 'mix' },
      { id: 'guandu', name: '官渡（关上·金马·小板桥）', streets: ['关上街道', '小板桥街道', '阿拉街道', '金马街道'], open: 2000, plan: 'mix' },
      { id: 'jinqma', name: '六甲·矣六（东南郊区）', streets: ['六甲街道', '矣六街道'], open: 2000, plan: 'resind' },
      { id: 'nanshi', name: '南市区（前卫·福海·永昌）', streets: ['前卫街道', '福海街道', '永昌街道', '官渡街道'], open: 2000, plan: 'res' },
      { id: 'xishi', name: '西市区（马街·棕树营·黑林铺）', streets: ['马街街道', '棕树营街道', '西苑街道', '黑林铺街道', '普吉街道'], open: 2000, plan: 'resind' },
      { id: 'biji', name: '碧鸡（滇池西岸）', streets: ['碧鸡街道'], open: 2000, plan: 'res' },
      { id: 'chenggong', name: '呈贡（龙城·斗南·雨花）', streets: ['龙城街道', '洛龙街道', '斗南街道', '乌龙街道', '雨花街道', '吴家营街道'], open: 2003, plan: 'newtown', note: '2003 年提出「现代新昆明」，呈贡新城开始建设（史实）' },
      { id: 'jingkai', name: '经开区（洛羊·马金铺）', streets: ['洛羊街道', '马金铺街道'], open: 2006, plan: 'ind', note: '昆明经济技术开发区（史实）' },
      { id: 'dabanqiao', name: '大板桥·长水（机场一带）', streets: ['大板桥街道', '长水街道', '小哨街道'], open: 2005, plan: 'resind', note: '长水国际机场 2012 年启用（史实）' },
      { id: 'qingyun', name: '青云·龙泉·双龙（东北郊山地）', streets: ['青云街道', '龙泉街道', '双龙街道', '松华街道'], open: 2006, plan: 'res' },
      { id: 'taiping', name: '太平新城', streets: ['太平新城街道'], open: 2012, plan: 'res' },
      { id: 'haikou', name: '海口（西郊工业区）', streets: ['海口街道'], open: 2000, plan: 'ind' },
      { id: 'yangzong', name: '阳宗·七甸', streets: ['七甸街道', '阳宗镇', '大渔街道'], open: 2012, plan: 'res' },
    ],
    defaultRegion: { id: 'outer', name: '外围（安宁·富民·晋宁方向）', open: 2015, plan: 'res' },
    plans: CM.DATA.plans,
    // 2000 年人口与就业中心（估算，人/km²；r 约为影响半径 km）
    centers: [
      at(25.0389, 102.7183, { pop: 34000, jobs: 52000, r: 1.2 }),   // 东风广场
      at(25.0347, 102.7137, { pop: 32000, jobs: 26000, r: 1.1 }),   // 南屏街、金马坊
      at(25.0430, 102.7060, { pop: 26000, jobs: 14000, r: 1.1 }),   // 小西门
      at(25.0520, 102.7060, { pop: 22000, jobs: 20000, r: 1.2 }),   // 翠湖、云南大学
      at(25.0570, 102.7250, { pop: 22000, jobs: 10000, r: 1.2 }),    // 火车北站、白云路
      at(25.0750, 102.7280, { pop: 12000, jobs: 3500, r: 1.4 }),     // 北辰、金星（1999 年前后开发）
      at(25.0400, 102.7350, { pop: 18000, jobs: 13000, r: 1.2 }),   // 董家湾、白塔路
      at(25.0150, 102.7300, { pop: 18000, jobs: 19000, r: 1.2 }),   // 螺蛳湾、南窑
      at(25.0029, 102.7394, { pop: 12000, jobs: 9000, r: 1.3 }),   // 关上
      at(25.0206, 102.6357, { pop: 13000, jobs: 12000, r: 1.4 }),   // 马街（工业）
      at(25.0789, 102.6332, { pop: 11000, jobs: 9000, r: 1.4 }),    // 黑林铺
      at(25.1668, 102.7354, { pop: 6000, jobs: 12000, r: 1.4 }),    // 茨坝（机床厂、重机厂）
      at(25.0330, 102.6800, { pop: 11000, jobs: 5000, r: 1.4 }),    // 西园路、梁家河
      at(25.0290, 102.6700, { pop: 12000, jobs: 3000, r: 1.3 }),    // 大观楼、滇池路北段
      at(24.9850, 102.7150, { pop: 7000, jobs: 4000, r: 1.5 }),     // 六甲、滇池北岸
      at(24.8917, 102.8046, { pop: 11000, jobs: 7000, r: 1.4 }),    // 呈贡龙城
      at(24.8840, 102.7586, { pop: 4000, jobs: 2500, r: 1.6 }),     // 斗南
      at(25.0627, 102.9353, { pop: 1800, jobs: 1600, r: 1.5 }),     // 大板桥
      at(24.8367, 102.6199, { pop: 5000, jobs: 7000, r: 1.5 }),     // 海口（磷化工）
      at(25.0121, 102.8444, { pop: 2500, jobs: 4000, r: 1.6 }),     // 阿拉（东郊）
      at(24.9410, 102.8490, { pop: 2500, jobs: 4500, r: 1.5 }),     // 洛羊（经开区）
    ],
    rural: { pop: 300, jobs: 80 },
    roadYears: {
      '北京路': 2003, '东风路': 2000, '人民路': 2000, '青年路': 2000, '巡津街': 2000, '西昌路': 2000, '白塔路': 2000, '拓东路': 2000,
      '二环北路': 2006, '二环南路': 2006, '二环东路': 2006, '二环西路': 2006, '昆明二环': 2006, '昆玉高速': 1999, '昆石高速': 2000,
      '昆曲高速': 1996, '昆楚高速': 2005, '昆武高速': 2013, '昆明绕城高速': 2009, '东绕城高速': 2009, '南绕城高速': 2010,
      '机场高速': 2012, '长水机场高速': 2012, '彩云路': 2005, '呈黄路': 2006, '广福路': 2004, '金马大道': 2008, '滇池路': 2000,
      '西二环': 2006, '三环': 2010, '昌宏路': 2008, '彩云北路': 2006, '滇缅大道': 2000, '穿金路': 2000, '普吉路': 2000,
      '石安公路': 1990, '昆石公路': 1990, '环湖东路': 2012, '环湖南路': 2015, '环湖路': 2012,
    },
    bridgeYears: {}, bridgeDefaultYear: 2000,
    simRoads: [],
    landmarks: [
      Object.assign(at(25.03470, 102.71370), { id: 'km_jinma', name: '金马碧鸡坊', w: 60, d: 40, year: 1999, kind: 'arch' }),
      Object.assign(at(25.03330, 102.71630), { id: 'km_dongsi', name: '东寺塔', w: 60, d: 60, year: 1840, kind: 'pagoda', h: 41 }),
      Object.assign(at(25.03340, 102.71260), { id: 'km_xisi', name: '西寺塔', w: 60, d: 60, year: 1840, kind: 'pagoda', h: 36 }),
      Object.assign(at(25.05600, 102.71300), { id: 'km_yuantong', name: '圆通寺', w: 200, d: 260, year: 1300, kind: 'temple' }),
      Object.assign(at(25.05300, 102.70200), { id: 'km_yunda', name: '云南大学', w: 700, d: 650, year: 1922, kind: 'campus' }),
      Object.assign(at(25.05220, 102.70980), { id: 'km_jiangwutang', name: '云南陆军讲武堂', w: 180, d: 130, year: 1909, kind: 'memorial' }),
      Object.assign(at(25.01690, 102.72210), { id: 'km_station', name: '昆明站', w: 320, d: 170, year: 1970, kind: 'rail' }),
      Object.assign(at(24.88000, 102.86000), { id: 'km_south', name: '昆明南站', w: 720, d: 460, year: 2016, kind: 'rail' }),
      Object.assign(at(25.10190, 102.92920), { id: 'km_airport', name: '长水国际机场', w: 2400, d: 1100, year: 2012, kind: 'airport' }),
      Object.assign(at(25.08300, 102.76000), { id: 'km_shibo', name: '昆明世博园', w: 900, d: 800, year: 1999, kind: 'garden' }),
      Object.assign(at(25.02700, 102.67200), { id: 'km_daguan', name: '大观楼', w: 260, d: 200, year: 1690, kind: 'pagoda', h: 30 }),
      Object.assign(at(25.04000, 102.72800), { id: 'km_tuodong', name: '拓东体育场', w: 420, d: 360, year: 1958, kind: 'stadium' }),
      Object.assign(at(25.03960, 102.71210), { id: 'km_museum', name: '云南省博物馆（老馆）', w: 160, d: 140, year: 1951, kind: 'museum' }),
      Object.assign(at(25.01500, 102.73550), { id: 'km_huizhan', name: '昆明国际会展中心', w: 500, d: 300, year: 1993, kind: 'conference' }),
    ],
    // 重要设施：位置与启用年份为史实参考，规模为估算。pax 为市内接驳出行（万人次/日）
    facilities: [
      { id: 'km_station', n: '昆明站', t: 'rail', lm: 'km_station', pax: [[2000, 5.5], [2010, 8], [2016, 6.5], [2024, 6]] },
      { id: 'km_south', n: '昆明南站', t: 'rail', lm: 'km_south', y0: [2016, 12], pax: [[2017, 4], [2019, 7], [2030, 9]] },
      { id: 'km_airport', n: '长水机场', label: '长水国际机场', t: 'air', lm: 'km_airport', y0: [2012, 6], pax: [[2012.5, 2], [2015, 4.2], [2019, 6.2], [2030, 8]], note: '2012 年 6 月 28 日启用，替代巫家坝机场（旅客量为估算）。' },
      { id: 'km_wujiaba', n: '巫家坝机场', t: 'air', at: ll(25.0280, 102.7350), pax: [[2000, 1.6], [2005, 2.4], [2010, 3.4], [2012.4, 3.6], [2012.6, 0], [2030, 0]], note: '1922 年通航的老机场，2012 年 6 月长水机场启用后关闭，用地随后改建为巫家坝新中心（旅客量为估算）。' },
      { id: 'km_yunda', n: '云南大学', t: 'uni', lm: 'km_yunda', w: 0.03 },
      { id: 'km_kust', n: '昆明理工大学（莲华）', t: 'uni', at: ll(25.0660, 102.7060), w: 0.025 },
      { id: 'km_ynnu', n: '云南师范大学', t: 'uni', at: ll(25.0630, 102.7030), w: 0.018 },
      { id: 'km_ynau', n: '云南农业大学', t: 'uni', at: ll(25.1170, 102.7420), w: 0.015 },
      { id: 'km_chenggong_uni', n: '呈贡大学城', t: 'uni', at: ll(24.8450, 102.8350), r: 3, y0: 2009, w: [[2009, 0.008], [2014, 0.05]] },
      { id: 'km_kmust_cg', n: '昆明理工大学（呈贡）', t: 'uni', at: ll(24.8480, 102.8600), y0: [2011, 9], w: 0.02 },
      { id: 'km_hosp1', n: '昆明医科大学第一附属医院', t: 'hosp', at: ll(25.0400, 102.7020), w: 0.06 },
      { id: 'km_hosp2', n: '云南省第一人民医院', t: 'hosp', at: ll(25.0330, 102.7120), w: 0.05 },
      { id: 'km_hosp3', n: '昆明市第一人民医院', t: 'hosp', at: ll(25.0300, 102.7060), w: 0.04 },
      { id: 'km_shop_nanping', n: '南屏街商圈', t: 'shop', at: ll(25.0350, 102.7130), w: [[2000, 0.06], [2010, 0.07]] },
      { id: 'km_shop_xiaoximen', n: '小西门商圈', t: 'shop', at: ll(25.0430, 102.7060), w: 0.05 },
      { id: 'km_shop_luosivan', n: '螺蛳湾批发市场', t: 'shop', at: ll(25.0130, 102.7330), w: [[2000, 0.05], [2009, 0.08], [2018, 0.04]], note: '2009 年后主要批发功能迁往呈贡（史实）。' },
      { id: 'km_cbd', n: '东风广场商务区', t: 'cbd', at: ll(25.0389, 102.7183), w: [[2000, 0.03], [2010, 0.05], [2020, 0.06]] },
      { id: 'km_wujiaba_cbd', n: '巫家坝新中心', t: 'cbd', at: ll(25.0230, 102.7390), y0: [2016, 1], w: [[2016, 0.002], [2025, 0.02], [2035, 0.035]] },
      { id: 'km_scenic_dianchi', n: '滇池·海埂大坝', t: 'scenic', at: ll(24.9560, 102.6810), r: 2.5, w: 0.07 },
      { id: 'km_scenic_xishan', n: '西山龙门', t: 'scenic', at: ll(24.9600, 102.6520), w: 0.02 },
      { id: 'km_scenic_daguan', n: '大观楼', t: 'scenic', at: ll(25.0270, 102.6720), w: 0.012 },
      { id: 'km_scenic_yuantong', n: '圆通山·动物园', t: 'scenic', at: ll(25.0570, 102.7100), w: 0.012 },
      { id: 'km_shibo', n: '昆明世博园', t: 'park', lm: 'km_shibo', w: [[2000, 0.02], [2010, 0.012]] },
      { id: 'km_tuodong', n: '拓东体育场', t: 'stadium', lm: 'km_tuodong', w: 0.012 },
      { id: 'km_huizhan', n: '昆明国际会展中心', t: 'venue', lm: 'km_huizhan', w: 0.008 },
      { id: 'km_dounan', n: '斗南花卉市场', t: 'venue', at: ll(24.8640, 102.7680), y0: [2000, 1], w: [[2000, 0.004], [2010, 0.012]] },
    ],
    districtLabels: [['东风广场', ['护国街道', '华山街道']], ['南屏街', ['大观街道', '金碧街道']], ['北市区', ['龙翔街道', '莲华街道', '红云街道', '丰宁街道', '鼓楼街道', '联盟街道', '金辰街道', '东华街道']], ['东市区', ['拓东街道', '太和街道', '吴井街道']], ['官渡', ['关上街道', '金马街道', '小板桥街道', '阿拉街道']], ['南市区', ['前卫街道', '福海街道', '永昌街道', '官渡街道']], ['西市区', ['马街街道', '棕树营街道', '西苑街道', '黑林铺街道', '普吉街道']], ['六甲', ['六甲街道', '矣六街道']], ['呈贡', ['龙城街道', '洛龙街道', '斗南街道', '乌龙街道', '雨花街道', '吴家营街道']], ['经开区', ['洛羊街道', '马金铺街道']], ['长水', ['大板桥街道', '长水街道', '小哨街道']]],
    events: [
      { y: 2000, m: 1, tag: '史实', title: '2000 年的昆明', desc: '市区人口约 240 万，城市集中在滇池北岸，东风广场与南屏街是商业中心，西郊与北郊是工厂；没有地铁，出行依靠公交、自行车与中巴。' },
      { y: 2003, m: 5, tag: '史实', title: '建设「现代新昆明」', desc: '云南省提出建设现代新昆明，确定「一湖四片」的城市格局，呈贡新城开始规划建设。', fx: { grow: { region: ['chenggong', 'jingkai'], pop: 1.3, jobs: 1.3, years: 6 } } },
      { y: 2005, m: 1, tag: '史实', title: '主城道路改造', desc: '昆明对北京路、东风路等主干道进行改造，公交专用道与快速路网开始成形。', fx: { demand: { hw: 0.92, months: 18 } } },
      { y: 2007, m: 5, tag: '史实', title: '主城禁摩', desc: '5 月 1 日起主城区禁止摩托车通行，短途出行转向公交与自行车。', fx: { demand: { sc: 1.05, months: 24 } } },
      { y: 2008, m: 1, tag: '史实', title: '城中村改造启动', desc: '昆明启动大规模的城中村改造，主城外围的居住区快速扩张。', fx: { grow: { region: ['beishi', 'nanshi', 'guandu'], pop: 1.2, years: 6 } } },
      { y: 2011, m: 1, tag: '史实', title: '市级行政中心迁入呈贡', desc: '昆明市级机关迁往呈贡新区，呈贡开始承接行政与文教功能。', fx: { grow: { region: 'chenggong', jobs: 1.5, pop: 1.25, years: 8 } } },
      { y: 2012, m: 6, tag: '史实', title: '长水国际机场启用', desc: '6 月 28 日长水国际机场通航，巫家坝机场同日关闭，地铁 6 号线机场段同时开通。', fx: { grow: { region: 'dabanqiao', jobs: 1.4, years: 8 } } },
      { y: 2013, m: 5, tag: '史实', title: '地铁 1 号线首段开通', desc: '昆明第一条地铁（1 号线首期）开通运营，城市进入地铁时代。', fx: { demand: { sh: 1.04, months: 12 } } },
      { y: 2016, m: 12, tag: '史实', title: '昆明南站与沪昆高铁', desc: '12 月 28 日沪昆高铁开通，昆明南站投用，昆明进入高铁时代。', fx: { grow: { region: 'chenggong', jobs: 1.3, pop: 1.15, years: 8 } } },
      { y: 2021, m: 1, tag: '史实', title: 'COP15 与中老铁路', desc: '10 月《生物多样性公约》第十五次缔约方大会在昆明举行；12 月中老铁路通车。', fx: { demand: { lz: 1.15, hub: 1.1, months: 2 }, sat: { v: 1.5, months: 6 } } },
      { y: 2021, m: 7, tag: '模拟', title: '进入模拟发展阶段', desc: '此后人口、道路和区域变化按模拟规则推演，不代表真实历史。' },
    ],
    // 本地历史主题任务：参考昆明的发展需求，不要求复刻真实线路走向（奖励单位：万元）
    histTasks: [
      { id: 'km1', appear: [2002, 1], deadline: [2012, 12], type: 'connect', reward: 60000, title: '南北主轴', desc: '昆明站与东风广场之间公交拥挤，北市区居民进城也绕不开这条轴。沿北京路把火车北站、东风广场与昆明站连起来。', anchors: [anchor('火车北站', 25.0570, 102.7250, 3), anchor('东风广场', 25.0389, 102.7183, 3), anchor('昆明站', 25.0169, 102.7221, 3)] },
      { id: 'km2', appear: [2002, 1], deadline: [2012, 12], type: 'connect', reward: 50000, title: '东西干线', desc: '西郊马街的工厂与东郊的金马寺、关上之间往来频繁。用地铁连接马街、小西门与董家湾。', anchors: [anchor('马街', 25.0206, 102.6357, 3), anchor('小西门', 25.0430, 102.7060, 3), anchor('董家湾', 25.0400, 102.7350, 3)] },
      { id: 'km3', appear: [2004, 1], deadline: [2014, 12], type: 'connect', reward: 55000, title: '连接呈贡', desc: '呈贡新城开始建设，行政与文教功能陆续迁入，主城到呈贡的通勤需求出现。用地铁把东风广场一带与呈贡龙城连起来。', anchors: [anchor('东风广场', 25.0389, 102.7183, 3), anchor('呈贡', 24.8917, 102.8046, 4)] },
      { id: 'km4', appear: [2004, 1], deadline: [2014, 12], type: 'connect', reward: 45000, title: '大学城', desc: '云南大学、昆明理工与师大都在北面，学生与教职工的出行集中在文教区。用地铁连接云南大学、火车北站与东风广场。', anchors: [anchor('云南大学', 25.0530, 102.7020, 3), anchor('火车北站', 25.0570, 102.7250, 3), anchor('东风广场', 25.0389, 102.7183, 3)] },
      { id: 'km5', appear: [2010, 1], deadline: [2018, 12], type: 'connect', reward: 60000, title: '机场线', desc: '长水机场 2012 年启用，旅客要在机场与主城之间换乘。用地铁把长水机场与东部客运站、东风广场连起来。', anchors: [anchor('长水机场', 25.1019, 102.9292, 5), anchor('东风广场', 25.0389, 102.7183, 3)] },
      { id: 'km6', appear: [2010, 1], deadline: [2016, 12], type: 'coverage', target: 0.28, reward: 65000, title: '主城覆盖', desc: '2016 年前，步行 15 分钟可到达地铁站的人口不低于全市人口的 28%。' },
      { id: 'km7', appear: [2016, 1], deadline: [2023, 12], type: 'connect', reward: 60000, title: '高铁接驳', desc: '昆明南站投用后，高铁旅客要在南站与主城之间换乘。用地铁把昆明南站与东风广场连起来。', anchors: [anchor('昆明南站', 24.8800, 102.8600, 4), anchor('东风广场', 25.0389, 102.7183, 3)] },
    ],
    taskNote: '历史主题任务参考昆明 2000 年起的城市发展（南北主轴、东西干线、呈贡新区、大学城、长水机场与高铁站），不要求按真实线路走向建设，只需满足目标描述。',
    scenarios: [
      { id: 'km-sc1', theme: '昆明：绕开滇池', title: '南北一条线，别碰滇池', type: 'budgetConnect', from: [2002, 1], to: [2014, 12], months: 60, rewardMonths: 3, budgetX: 1.2,
        anchors: [['火车北站', 3], ['东风广场', 3], ['呈贡', 4]],
        desc: '滇池与西山不能开发，跨河与湖滨段造价很高。用有限的预算把主城南北轴与呈贡连起来，还得绕开湖面。',
        tips: ['沿北京路—东风路的老城走廊走，避开湖滨', '过盘龙江时选窄处，一次跨过', '呈贡段站距可以放长，省下钱补老城'] },
      { id: 'km-sc2', theme: '昆明：新区与老城', title: '让呈贡用上地铁', type: 'regionCov', from: [2006, 1], to: [2020, 12], months: 48, rewardMonths: 3,
        regions: ['chenggong'], areaName: '呈贡新区', target: 0.5,
        desc: '行政中心与大学城迁入呈贡后，新区人口与岗位快速增长，地铁却还集中在主城。让呈贡一半以上的人步行就能到地铁站。',
        tips: ['打开「地铁覆盖」图层，看新区哪里是空白', '大学城与龙城是两个主要客源，先各设一站', '用一条线串起呈贡与主城，比单修区内支线更划算'] },
    ],
    dataNote: [
      ['真实地理', 'hist', '滇池与入湖河道、道路与桥隧、铁路、公园与风景区、街道边界与地名来自 OpenStreetMap（© OpenStreetMap 贡献者，ODbL），为现代数据，按 250 m 网格投影。'],
      ['史实参考', 'hist', '呈贡新城（2003 年）、长水机场启用（2012 年）、昆明南站与沪昆高铁（2016 年）、地铁 1 号线开通（2013 年）、主城禁摩（2007 年）、COP15（2021 年）。'],
      ['估算', 'est', '2000 年人口与就业分布、人口增长曲线、出行率、时间价值、造价、票价与运营费用。'],
      ['模拟', 'sim', '2005 年之后的发展、居民出行选择、道路拥堵、客流与财政结果。普通铁路与高速铁路不参与乘客出行与运营模拟，车站与机场的旅客量为估算、只模拟其市内接驳出行；地面铁路按真实线位阻隔步行与小路；真实的昆明地铁不会自动出现。'],
      ['', '', '模拟结果不得作为真实昆明交通规划预测。'],
    ],
    lineColorsNice: ['#e60012', '#0072bc', '#f39800', '#00a651', '#8e44ad', '#00b7c3', '#c8102e', '#7f8c8d', '#b5a642', '#e4007f', '#0062ac', '#6d6e71'],
    places: (G.places || []).map(function (p) { return [p[0], p[1], p[2], p[3]]; }),
  };

  (CM.MAP_LIST = CM.MAP_LIST || []).push({
    id: 'km', name: '昆明', title: '昆明 · 2000', sub: '真实地理 · 2000 年起 · 人民币',
    desc: '从 2000 年尚无地铁的昆明开始：城市紧贴滇池北岸，东风广场与南屏街是唯一的市中心，滇池西岸的西山挡住去路。滇池水面与西山不能开发，跨越盘龙江与入湖河道要另付造价，往南是正在规划的呈贡新城。',
    facts: [['范围', '36 km × 36 km'], ['起始', '2000 年'], ['人口', '约 240 万'], ['货币', '人民币（元）'], ['模式', '经营挑战 / 自由建造']],
    modes: ['challenge', 'free'], kind: 'real', mapVersion: 1, extent: [],
    scenario: 'km-2000',
    region: '中国内地', tagline: '从单中心走向环滇池时代', difficulty: 2, tags: ['无地铁开局', '滇池', '山水城市'],
    intro: '2000 年的昆明围着滇池北岸生长，还没有地铁。东风广场是全城唯一的中心，北面是文教区，西郊与北郊的工厂在冒烟，南面是农田与湖滨。滇池与西山不能开发，你要在湖山之间找到线路的走法。',
    features: [['building', '呈贡新城与长水机场', '新中心与机场随年份出现']],
    highlights: [[2003, '建设现代新昆明'], [2011, '行政中心迁入呈贡'], [2012, '长水机场启用'], [2016, '昆明南站与沪昆高铁'], [2021, 'COP15 与中老铁路']],
    geo: G, data: data,
    econ: { devOffset: 2, money: 1 },
    cfg: {
      W: 144, H: 144, START: { y: 2000, m: 1, d: 1, minute: 360 },
      growth: Object.assign({}, CM.CFG.growth, { popCurve: [[2000, 2.4e6], [2005, 2.8e6], [2010, 3.4e6], [2015, 4.0e6], [2020, 4.8e6], [2030, 5.6e6], [2050, 6.1e6], [2300, 6.4e6]], histEnd: 2020, jobsRatio: [[2000, 0.55], [2010, 0.58], [2020, 0.6], [2040, 0.62]] }),
      money: { code: 'CNY', unit: '元', wan: '万元', yi: '亿元', sym: '¥' },
      econBase: 2000,
      cost: Object.assign({}, CM.CFG.cost, {
        trackPerKm: { underground: 45000, surface: 8000, elevated: 18000 },
        riverPerKm: { underground: 28000, surface: 20000, elevated: 20000 },
        hillPerKm: 14000, protectedPerKm: 7000,
        station: { underground: { S: 20000, M: 32000, L: 50000 }, elevated: { S: 11000, M: 17000, L: 25000 }, surface: { S: 6500, M: 10000, L: 14000 } },
        demolishPerCell: 45000,
      }),
      ops: Object.assign({}, CM.CFG.ops, { carKmCost: 0.0012, stationDaily: { S: 2.0, M: 3.4, L: 5.8 } }),
      fareDefault: { mode: 'flat', flat: 2 }, fareRange: { min: 0, max: 10, step: 0.1, scale: true },
      economy: Object.assign({}, CM.CFG.economy, { startFunds: 450000, grantBase: [[2000, 22000], [2005, 36000], [2010, 65000], [2015, 92000], [2020, 110000], [2050, 160000]], debtLimit: -280000, rewardScale: 1.5 }),
      macro: {
        area: '地图范围（主城四区、滇池北岸与呈贡）', region: '中国内地',
        gdp0: 5200000, revRatio: [[2000, 0.14], [2010, 0.18], [2020, 0.19], [2040, 0.17]], revElastic: 1.45,
        prod: [[2000, 0.09], [2005, 0.088], [2010, 0.07], [2015, 0.055], [2020, 0.042], [2030, 0.026], [2050, 0.016], [2080, 0.012]],
        infl: 'cn', longRun: { infl: 0.02 }, histEnd: 2020, ref: 'cn',
        struct: { trade: 0.55, fin: 0.3, ind: 0.55, tour: 0.7, prop: 0.5 },
        events: [
          { id: 'wto2001', y: 2001, m: 12, desc: '加入世贸后云南的烟草、有色金属与农产品出口扩大，昆明的商贸与物流业起步。' },
          { id: 'sars2003', y: 2003, m: 4, scale: 0.6 },
          { id: 'tight2004', y: 2004, m: 4 },
          { id: 'gfc2008', y: 2008, m: 9, desc: '外需下滑冲击云南的有色金属与出口加工，昆明的工业增速放缓。' },
          { id: 'stim2008', y: 2008, m: 11 },
          { id: 'cnstock2015', y: 2015, m: 6 },
          { id: 'trade2018', y: 2018, m: 7 },
          { id: 'covid2020', y: 2020, m: 1, scale: 0.6, fx: { demand: { sc: 0.7, sh: 0.8, lz: 0.6, hub: 0.5, months: 3, fade: 1 } } },
        ],
      },
    },
    cam: { cx: 46, cy: 62, zoom: 15 },
  });
})(window.CM);
