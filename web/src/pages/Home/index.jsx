import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../../context/Status';
import { IconBolt, IconSafe, IconVerify, IconCode, IconUserAdd } from '@douyinfe/semi-icons';

/**
 * =========================================================================
 * 1. 静态图标 (不用管这些乱码，它们是画图的坐标)
 * =========================================================================
 */
const SvgIcons = {
  OpenAI: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.558 1.558 0 0 1 .6983 1.37v6.0769a4.462 4.462 0 0 1-5.1548 2.6821zM2.948 14.5199a4.46 4.46 0 0 1 .6136-5.2718l1.3823 2.395a1.5644 1.5644 0 0 1-.2274 1.6369l-1.6853 2.3278a4.4578 4.4578 0 0 1-.0832-1.0879zm3.5658-9.451a4.4925 4.4925 0 0 1 2.8988.384l-3.2355 1.8681a1.5473 1.5473 0 0 1-.2195.1235L2.366 3.1206a4.502 4.502 0 0 1 4.1478 1.9482zm13.1257 5.5682l-2.02-1.1686-3.7915 2.1884a.7845.7845 0 0 0-.3927.6813v6.7369l3.4687-2.0025a1.558 1.558 0 0 1 .7363-.298v-6.1375zm1.5656-2.2036a4.4727 4.4727 0 0 1 .0832 1.0879 4.4952 4.4952 0 0 1-.6215 5.2718l-1.3823-2.395a1.5644 1.5644 0 0 1 .2274-1.6369l1.6932-2.3278zM8.3802 2.6042l2.02 1.1686-2.02 1.1686-2.02-1.1686 2.02-1.1686zM9.9882 12l2.02 1.1686-2.02 1.1686-2.02-1.1686L9.9882 12zm2.02 9.3958l-2.02-1.1686 2.02-1.1686 2.02 1.1686-2.02 1.1686zm3.336-3.8475a1.5473 1.5473 0 0 1 .2195-.1235l3.5915 4.3238a4.502 4.502 0 0 1-4.1478-1.9482 4.4925 4.4925 0 0 1-2.8988-.384l3.2356-1.8681z"></path></svg>),
  Claude: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M17.76 12.02c0 3.2-2.58 5.79-5.76 5.79s-5.76-2.59-5.76-5.79c0-3.19 2.58-5.79 5.76-5.79s5.76 2.6 5.76 5.79zm1.75 0c0-4.16-3.36-7.53-7.51-7.53S4.49 7.86 4.49 12.02c0 4.15 3.36 7.53 7.51 7.53s7.51-3.38 7.51-7.53zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>),
  Gemini: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12.87 2.07l.86 3.14c.45 1.63 1.69 2.87 3.32 3.32l3.14.86c.64.18.64 1.09 0 1.27l-3.14.86c-1.63.45-2.87 1.69-3.32 3.32l-.86 3.14c-.18.64-1.09.64-1.27 0l-.86-3.14c-.45-1.63-1.69-2.87-3.32-3.32l-3.14-.86c-.64-.18-.64-1.09 0-1.27l3.14-.86c1.63-.45 2.87-1.69 3.32-3.32l.86-3.14c.18-.64 1.09-.64 1.27 0z"/></svg>),
  MJ: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12.92 2.62c-2.34-1.55-6.6-1.55-9.8.96 0 0 1.93 2.15 2.1 6.58.12 3.12-1.92 5.09-1.92 5.09s4.23-.74 6.78-3.66c3.27-3.76 2.84-8.97 2.84-8.97zm-5.02 5.34c-.46-.47-.46-1.23 0-1.69.46-.47 1.22-.47 1.68 0 .47.46.47 1.22 0 1.69-.46.47-1.22.47-1.68 0zm10.74 3.25c-2.61-3.26-6.86-3.67-6.86-3.67s1.42 5.25-2.29 8.35c-2.73 2.29-6.31 1.9-6.31 1.9s3.37 3.34 9.4 1.36c5.75-1.89 6.06-7.94 6.06-7.94z"/></svg>),
  DeepSeek: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>),
  Github: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>),
  Meta: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M17.155 2.193a7.86 7.86 0 0 0-5.185 2.122 7.846 7.846 0 0 0-5.178-2.122C3.155 2.193 0 5.483 0 10.384c0 3.315 2.26 7.509 6.22 8.718 1.942.593 4.288-.344 6.22-3.399.73 1.162 1.61 2.22 2.585 3.093 1.127.994 2.535 1.614 3.978 1.586 3.155-.06 5.244-3.156 4.977-7.462-.313-5.06-3.793-10.728-6.825-10.728zm-11.05 13.914c-1.895-.578-2.986-2.906-2.986-5.723 0-3.328 1.957-5.26 3.673-5.26 1.413 0 2.946 1.487 3.655 4.38.167.683.256 1.348.256 1.968 0 2.275-.826 4.103-4.6 4.635zm11.238 2.395c-1.378.026-2.717-1.026-3.664-2.616l-.289-.488c2.192-3.75 3.395-8.204 3.626-8.204.62 0 1.83 2.454 1.984 4.965.132 2.13-1.01 4.23-1.657 6.343z"/></svg>),
  Nvidia: () => (<svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M3.56 16.59c-.27 2.08-1.2 4.49-3.56 3.33v-12.7c3.42 1.58 3.56 7.28 3.56 9.37zm8.38-4.6c.16 2.37-2.73 6.91-7.1 6.32 0-7.39 3.99-9.98 7.1-6.32zm6.64 1.37c.12 1.98-2.58 5.76-6.07 4.96.01-6.53 3.4-8.49 6.07-4.96zm5.42 1.44c.09 1.76-2.45 5.12-5.45 4.19.01-6.03 3.05-7.65 5.45-4.19z"/></svg>)
};

/**
 * =========================================================================
 * 2. 字典配置 (6种语言 - 厂商维度版)
 * =========================================================================
 */
const contentMap = {
  // 1. 中文：强调“全系列”
  zh: {
    title: "ZX AI 聚合网关",
    subtitle: "企业级大模型 API 统一接入平台",
    desc: "万模归一 · 毫秒响应 · 官方直连 · 隐私盾",
    startBtn: "立即注册",
    docsBtn: "开发文档",
    // 修改点：去掉了 GPT-4o，改为 OpenAI / DeepSeek，暗示支持全系列
    giftContent: "🎁 开发者测试通道：注册即享免费试用额度，零成本评测 DeepSeek / OpenAI 全系模型",
    card1: "全球边缘加速", card1_desc: "智能路由网络覆盖全球，延迟低至毫秒级，拒绝丢包",
    card2: "纯净官方渠道", card2_desc: "拒绝逆向/掺水，直连 OpenAI / DeepSeek 原厂 API",
    card3: "数据零留存", card3_desc: "企业级加密隧道传输，无日志策略，守护业务核心机密",
    trusted: "已赋能 20+ 创新业务",
    dev: "API BaseUrl:"
  },
  
  // 2. English: Access to Providers
  en: {
    title: "ZX AI Gateway",
    subtitle: "Enterprise Unified Interface for LLMs",
    desc: "One Interface for All Models · Ultra-Low Latency · Native Channels · Secure",
    startBtn: "Get Started",
    docsBtn: "Documentation",
    // "Access to DeepSeek & OpenAI models"
    giftContent: "🎁 Developer Trial: Start building for free with instant access to DeepSeek & OpenAI models.",
    card1: "Global Edge CDN", card1_desc: "Intelligent routing network with millisecond latency worldwide.",
    card2: "Official Pipelines", card2_desc: "Direct connection to OpenAI/Claude. Zero reverse-engineered APIs.",
    card3: "Zero-Log Privacy", card3_desc: "End-to-end encryption tunnel. Your business data remains yours.",
    trusted: "Trusted by 40+ Tech Teams",
    dev: "API BaseUrl:"
  },

  // 3. French
  fr: {
    title: "Passerelle IA ZX",
    subtitle: "Interface unifiée pour les grands modèles de langage",
    desc: "Une API pour tout connecter · Latence ultra-faible · Canaux natifs · Sécurisé",
    startBtn: "Commencer",
    docsBtn: "Documentation",
    // 替换为 OpenAI
    giftContent: "🎁 Essai Développeur : Accès gratuit immédiat aux modèles DeepSeek & OpenAI pour évaluation.",
    card1: "CDN Edge Mondial", card1_desc: "Réseau de routage intelligent avec une latence millimétrée.",
    card2: "Canaux Officiels", card2_desc: "Connexion directe. Aucune API issue de rétro-ingénierie.",
    card3: "Confidentialité Totale", card3_desc: "Chiffrement de bout en bout. Politique stricte de zéro log.",
    trusted: "Utilisé par 40+ équipes tech",
    dev: "API BaseUrl:"
  },

  // 4. Japanese
  ja: {
    title: "ZX AI ゲートウェイ",
    subtitle: "エンタープライズ向けLLM統一プラットフォーム",
    desc: "万能インターフェース · 超低遅延 · 公式ルート · 完全なプライバシー",
    startBtn: "今すぐ始める",
    docsBtn: "開発ドキュメント",
    // 强调厂商
    giftContent: "🎁 開発者トライアル：登録後すぐにDeepSeekやOpenAIのモデルを無料で評価可能。",
    card1: "グローバルEdge CDN", card1_desc: "世界規模のインテリジェントルーティングでミリ秒単位の応答を実現。",
    card2: "純正公式ルート", card2_desc: "OpenAI/DeepSeekと直接接続。リバースエンジニアリングなし。",
    card3: "ログなしポリシー", card3_desc: "エンドツーエンド暗号化。業務データの保存は一切なし。",
    trusted: "40以上の技術チームが導入",
    dev: "API BaseUrl:"
  },

  // 5. Russian
  ru: {
    title: "Шлюз ZX AI",
    subtitle: "Единый корпоративный интерфейс для LLM",
    desc: "Один API для всего · Ультра-низкая задержка · Официальные каналы · Безопасность",
    startBtn: "Начать",
    docsBtn: "Документация",
    // 强调厂商
    giftContent: "🎁 Тестовый доступ: Бесплатная оценка моделей DeepSeek и OpenAI сразу после регистрации.",
    card1: "Глобальный Edge CDN", card1_desc: "Умная маршрутизация с миллисекундной задержкой по всему миру.",
    card2: "Официальные каналы", card2_desc: "Прямое подключение к OpenAI. Никакого реверс-инжиниринга.",
    card3: "Приватность данных", card3_desc: "Сквозное шифрование. Политика полного отсутствия логов.",
    trusted: "Выбор 40+ технологических команд",
    dev: "API BaseUrl:"
  },

  // 6. Vietnamese
  vi: {
    title: "Cổng Kết Nối ZX AI",
    subtitle: "Nền tảng hợp nhất API LLM cấp doanh nghiệp",
    desc: "Một kết nối cho tất cả · Độ trễ cực thấp · Kênh chính hãng · Bảo mật tuyệt đối",
    startBtn: "Bắt đầu ngay",
    docsBtn: "Tài liệu",
    // 强调厂商
    giftContent: "🎁 Dùng thử cho Developer: Trải nghiệm miễn phí các mô hình DeepSeek & OpenAI ngay khi đăng ký.",
    card1: "CDN Edge Toàn cầu", card1_desc: "Mạng định tuyến thông minh với độ trễ tính bằng mili giây.",
    card2: "Kênh chính hãng", card2_desc: "Kết nối trực tiếp. Nói không với API dịch ngược.",
    card3: "Không lưu nhật ký", card3_desc: "Mã hóa đầu cuối. Bảo vệ tuyệt đối dữ liệu doanh nghiệp.",
    trusted: "Được tin dùng bởi 40+ đội ngũ công nghệ",
    dev: "API BaseUrl:"
  }
};

const Home = () => {
  const { i18n } = useTranslation();
  const text = contentMap[i18n.language] || contentMap.en;
  const [statusState] = useContext(StatusContext);
  const docsLink = statusState?.status?.docs_link || 'https://docs.newapi.pro';

  useEffect(() => {
    document.title = text.title;
  }, [text.title]);

  const handleStart = () => window.location.href = '/register';
  const handleDocs = () => window.open(docsLink, '_blank');

  return (
    <div style={styles.container}>
      {/* 这里移除了极光背景，因为极光是深色的，在浅色模式下会很脏。
        如果你需要极光，需要写复杂的判断逻辑。现在先保证干净、可用。
      */}

      <div style={styles.contentWrapper}>
        
        {/* Hero 区域 */}
        <div style={styles.heroSection}>
          <div style={styles.badge}>⚡️ ZX High-Performance Gateway</div>
          <h1 style={styles.mainTitle}>{text.title}</h1>
          <p style={styles.subTitle}>{text.subtitle}</p>
          <p style={styles.description}>{text.desc}</p>
          
          {/* 按钮组 */}
          <div style={styles.buttonGroup}>
            <button style={styles.primaryBtn} onClick={handleStart}>
              <IconUserAdd style={{marginRight:8}} /> {text.startBtn}
            </button>
            {/* 隐藏了开发文档按钮 */}
          </div>
        </div>

        {/* 福利条 */}
        <div style={styles.noticeBar}>
            {text.giftContent}
        </div>

        {/* 特性卡片 */}
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={{...styles.iconWrapper, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8'}}>
              <IconBolt size="extra-large" />
            </div>
            <h3 style={styles.cardTitle}>{text.card1}</h3>
            <p style={styles.cardDesc}>{text.card1_desc}</p>
          </div>
          <div style={styles.featureCard}>
            <div style={{...styles.iconWrapper, background: 'rgba(129, 140, 248, 0.15)', color: '#818cf8'}}>
              <IconVerify size="extra-large" />
            </div>
            <h3 style={styles.cardTitle}>{text.card2}</h3>
            <p style={styles.cardDesc}>{text.card2_desc}</p>
          </div>
          <div style={styles.featureCard}>
            <div style={{...styles.iconWrapper, background: 'rgba(52, 211, 153, 0.15)', color: '#34d399'}}>
              <IconSafe size="extra-large" />
            </div>
            <h3 style={styles.cardTitle}>{text.card3}</h3>
            <p style={styles.cardDesc}>{text.card3_desc}</p>
          </div>
        </div>

        {/* Logo 墙 */}
        <div style={styles.logoSection}>
          <p style={styles.logoTitle}>{text.trusted}</p>
          <div style={styles.logoRow}>
            <LogoBox icon={<SvgIcons.DeepSeek />} name="DeepSeek" />
            <LogoBox icon={<SvgIcons.OpenAI />} name="OpenAI" />
            <LogoBox icon={<SvgIcons.Claude />} name="Claude" />
            <LogoBox icon={<SvgIcons.Gemini />} name="Gemini" />
            <LogoBox icon={<SvgIcons.MJ />} name="Midjourney" />
            <LogoBox icon={<SvgIcons.Github />} name="Github" />
            <LogoBox icon={<SvgIcons.Nvidia />} name="NVIDIA" />
            <LogoBox icon={<SvgIcons.Meta />} name="Meta" />
          </div>
        </div>

          {text.dev} <code style={styles.code}>{window.location.origin}</code>
      </div>
    </div>
  );
};

// 小组件
const LogoBox = ({ icon, name }) => (
  <div style={styles.logoBox} title={name}>
    {icon}
    <span style={{fontSize:'12px', marginTop:'4px', opacity:0.7}}>{name}</span>
  </div>
);

/**
 * =========================================================================
 * 3. 样式定义 - 关键修改！使用 New API 自带的 CSS 变量
 * var(--semi-color-bg-0)  -> 会自动变成 白色(日间) 或 黑色(夜间)
 * var(--semi-color-text-0) -> 会自动变成 黑色(日间) 或 白色(夜间)
 * =========================================================================
 */
const styles = {
  container: {
    position: 'relative',
    backgroundColor: 'var(--semi-color-bg-0)',
    // 科技感网格与顶部柔和光晕背景
    backgroundImage: `
      radial-gradient(circle at 50% 0%, var(--semi-color-primary-light-default) 0%, transparent 60%),
      linear-gradient(var(--semi-color-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--semi-color-border) 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 30px 30px, 30px 30px',
    backgroundPosition: 'center top, center top, center top',
    minHeight: 'calc(100vh - 64px)',
    color: 'var(--semi-color-text-0)',
    overflow: 'hidden',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  // Hero Styles
  heroSection: { marginBottom: '60px', maxWidth: '800px' },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    // 使用变量：背景填充色
    background: 'var(--semi-color-fill-0)',
    border: '1px solid var(--semi-color-border)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: 'var(--semi-color-text-2)',
    marginBottom: '20px',
    fontWeight: 500
  },
  mainTitle: {
    fontSize: '3.8rem',
    fontWeight: 800,
    marginBottom: '20px',
    lineHeight: 1.1,
    // 这里的渐变色可能在浅色模式下不明显，我们简单处理：直接用主文字色
    // 如果你想要渐变，必须写两套逻辑，这里先保证能看清
    color: 'var(--semi-color-text-0)', 
  },
  subTitle: { fontSize: '1.5rem', fontWeight: 500, color: 'var(--semi-color-text-1)', marginBottom: '16px' },
  description: { fontSize: '1.1rem', color: 'var(--semi-color-text-2)', lineHeight: 1.6 },

  // Buttons
  buttonGroup: { marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' },
  primaryBtn: {
    background: 'var(--semi-color-primary)', // 使用主题主色
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  secondaryBtn: {
    background: 'var(--semi-color-fill-0)',
    color: 'var(--semi-color-text-0)',
    border: '1px solid var(--semi-color-border)',
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },

  // Notice Bar
  noticeBar: {
    background: 'rgba(250, 204, 21, 0.1)',
    border: '1px solid rgba(250, 204, 21, 0.2)',
    color: '#EAB308', // 黄色字体加深一点，防止在白底看不清
    padding: '10px 24px',
    borderRadius: '30px',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: '80px',
  },

  // Feature Grid
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    width: '100%',
    marginBottom: '100px',
  },
  featureCard: {
    // 关键：卡片背景色自适应
    background: 'var(--semi-color-fill-0)',
    border: '1px solid var(--semi-color-border)',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'left',
    transition: 'transform 0.2s',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: { color: 'var(--semi-color-text-0)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' },
  cardDesc: { color: 'var(--semi-color-text-2)', fontSize: '0.95rem', lineHeight: 1.6 },

  // Logo Section
  logoSection: { width: '100%' },
  logoTitle: { color: 'var(--semi-color-text-2)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px' },
  logoRow: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' },
  logoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'var(--semi-color-text-1)', // Logo 颜色也随主题变
    opacity: 0.8,
    cursor: 'pointer',
    width: '80px'
  },

  footer: { marginTop: '80px', color: 'var(--semi-color-text-2)', fontSize: '0.85rem' },
  code: { background: 'var(--semi-color-fill-1)', padding: '4px 8px', borderRadius: '4px', color: 'var(--semi-color-primary)', fontFamily: 'monospace', marginLeft: '10px' }
};

export default Home;