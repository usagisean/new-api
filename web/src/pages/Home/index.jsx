import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// 引入 Semi UI 图标用于功能区
import { IconBolt, IconSafe, IconVerify } from '@douyinfe/semi-icons';

/**
 * =========================================================================
 * 1. 静态 SVG 图标库 (直接把图画在代码里，永不失效)
 * =========================================================================
 */
const SvgIcons = {
  // OpenAI (ChatGPT)
  OpenAI: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.558 1.558 0 0 1 .6983 1.37v6.0769a4.462 4.462 0 0 1-5.1548 2.6821zM2.948 14.5199a4.46 4.46 0 0 1 .6136-5.2718l1.3823 2.395a1.5644 1.5644 0 0 1-.2274 1.6369l-1.6853 2.3278a4.4578 4.4578 0 0 1-.0832-1.0879zm3.5658-9.451a4.4925 4.4925 0 0 1 2.8988.384l-3.2355 1.8681a1.5473 1.5473 0 0 1-.2195.1235L2.366 3.1206a4.502 4.502 0 0 1 4.1478 1.9482zm13.1257 5.5682l-2.02-1.1686-3.7915 2.1884a.7845.7845 0 0 0-.3927.6813v6.7369l3.4687-2.0025a1.558 1.558 0 0 1 .7363-.298v-6.1375zm1.5656-2.2036a4.4727 4.4727 0 0 1 .0832 1.0879 4.4952 4.4952 0 0 1-.6215 5.2718l-1.3823-2.395a1.5644 1.5644 0 0 1 .2274-1.6369l1.6932-2.3278zM8.3802 2.6042l2.02 1.1686-2.02 1.1686-2.02-1.1686 2.02-1.1686zM9.9882 12l2.02 1.1686-2.02 1.1686-2.02-1.1686L9.9882 12zm2.02 9.3958l-2.02-1.1686 2.02-1.1686 2.02 1.1686-2.02 1.1686zm3.336-3.8475a1.5473 1.5473 0 0 1 .2195-.1235l3.5915 4.3238a4.502 4.502 0 0 1-4.1478-1.9482 4.4925 4.4925 0 0 1-2.8988-.384l3.2356-1.8681z"></path></svg>
  ),
  // Anthropic (Claude)
  Claude: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M17.76 12.02c0 3.2-2.58 5.79-5.76 5.79s-5.76-2.59-5.76-5.79c0-3.19 2.58-5.79 5.76-5.79s5.76 2.6 5.76 5.79zm1.75 0c0-4.16-3.36-7.53-7.51-7.53S4.49 7.86 4.49 12.02c0 4.15 3.36 7.53 7.51 7.53s7.51-3.38 7.51-7.53zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
  ),
  // Google Gemini (Sparkle)
  Gemini: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12.87 2.07l.86 3.14c.45 1.63 1.69 2.87 3.32 3.32l3.14.86c.64.18.64 1.09 0 1.27l-3.14.86c-1.63.45-2.87 1.69-3.32 3.32l-.86 3.14c-.18.64-1.09.64-1.27 0l-.86-3.14c-.45-1.63-1.69-2.87-3.32-3.32l-3.14-.86c-.64-.18-.64-1.09 0-1.27l3.14-.86c1.63-.45 2.87-1.69 3.32-3.32l.86-3.14c.18-.64 1.09-.64 1.27 0z"/></svg>
  ),
  // Midjourney (Boat)
  MJ: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12.92 2.62c-2.34-1.55-6.6-1.55-9.8.96 0 0 1.93 2.15 2.1 6.58.12 3.12-1.92 5.09-1.92 5.09s4.23-.74 6.78-3.66c3.27-3.76 2.84-8.97 2.84-8.97zm-5.02 5.34c-.46-.47-.46-1.23 0-1.69.46-.47 1.22-.47 1.68 0 .47.46.47 1.22 0 1.69-.46.47-1.22.47-1.68 0zm10.74 3.25c-2.61-3.26-6.86-3.67-6.86-3.67s1.42 5.25-2.29 8.35c-2.73 2.29-6.31 1.9-6.31 1.9s3.37 3.34 9.4 1.36c5.75-1.89 6.06-7.94 6.06-7.94z"/></svg>
  ),
  // DeepSeek (Whale/Brain concept)
  DeepSeek: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
  ),
  // GitHub
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  ),
  // Meta
  Meta: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M17.155 2.193a7.86 7.86 0 0 0-5.185 2.122 7.846 7.846 0 0 0-5.178-2.122C3.155 2.193 0 5.483 0 10.384c0 3.315 2.26 7.509 6.22 8.718 1.942.593 4.288-.344 6.22-3.399.73 1.162 1.61 2.22 2.585 3.093 1.127.994 2.535 1.614 3.978 1.586 3.155-.06 5.244-3.156 4.977-7.462-.313-5.06-3.793-10.728-6.825-10.728zm-11.05 13.914c-1.895-.578-2.986-2.906-2.986-5.723 0-3.328 1.957-5.26 3.673-5.26 1.413 0 2.946 1.487 3.655 4.38.167.683.256 1.348.256 1.968 0 2.275-.826 4.103-4.6 4.635zm11.238 2.395c-1.378.026-2.717-1.026-3.664-2.616l-.289-.488c2.192-3.75 3.395-8.204 3.626-8.204.62 0 1.83 2.454 1.984 4.965.132 2.13-1.01 4.23-1.657 6.343z"/></svg>
  ),
  // NVIDIA
  Nvidia: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24"><path d="M3.56 16.59c-.27 2.08-1.2 4.49-3.56 3.33v-12.7c3.42 1.58 3.56 7.28 3.56 9.37zm8.38-4.6c.16 2.37-2.73 6.91-7.1 6.32 0-7.39 3.99-9.98 7.1-6.32zm6.64 1.37c.12 1.98-2.58 5.76-6.07 4.96.01-6.53 3.4-8.49 6.07-4.96zm5.42 1.44c.09 1.76-2.45 5.12-5.45 4.19.01-6.03 3.05-7.65 5.45-4.19z"/></svg>
  )
};

/**
 * =========================================================================
 * 2. 字典配置 (中/英)
 * =========================================================================
 */
const contentMap = {
  zh: {
    title: "ZX AI 算力中心",
    subtitle: "企业级大模型接口聚合网关",
    desc: "一站式接入全球顶尖 AI 模型 · 稳定 · 高速 · 隐私安全",
    giftTitle: "🎁 新用户福利",
    giftContent: "注册即送 $0.2 美金 · 免费体验 DeepSeek / GPT-4o",
    card1: "全球加速", card1_desc: "全球 CDN 节点覆盖，毫秒级低延迟",
    card2: "官方同源", card2_desc: "直连 OpenAI/DeepSeek 官方渠道，拒绝掺水",
    card3: "隐私安全", card3_desc: "企业级加密传输，数据无痕，无日志留存",
    trusted: "已接入 40+ 主流业务线",
    dev: "开发者接入：请将 BaseUrl 替换为"
  },
  en: {
    title: "ZX AI Compute Center",
    subtitle: "Enterprise-grade GenAI Gateway",
    desc: "Next Generation of API Aggregation · Stable · High Speed · Secure",
    giftTitle: "🎁 New User Benefit",
    giftContent: "Get $0.2 Free Credit · Try DeepSeek / GPT-4o for Free",
    card1: "Global CDN", card1_desc: "Low Latency & High Availability Worldwide",
    card2: "Official API", card2_desc: "Direct connection to OpenAI/Claude",
    card3: "Private & Secure", card3_desc: "Enterprise encryption, Zero logs policy",
    trusted: "40+ Mainstream Models Integrated",
    dev: "Developers: Replace BaseUrl with"
  }
};

const Home = () => {
  const { i18n } = useTranslation();
  const text = i18n.language.startsWith('zh') ? contentMap.zh : contentMap.en;

  useEffect(() => {
    document.title = text.title;
  }, [text.title]);

  return (
    <div style={styles.container}>
      {/* 顶部极光 */}
      <div style={styles.heroGlow}></div>

      <div style={styles.contentWrapper}>
        
        {/* 1. 标题区 */}
        <div style={styles.headerSection}>
          <h1 style={styles.mainTitle}>{text.title}</h1>
          <p style={styles.subTitle}>{text.subtitle}</p>
          <p style={styles.description}>{text.desc}</p>
        </div>

        {/* 2. 福利区 */}
        <div style={styles.giftCapsule}>
          <div style={styles.giftTitle}>{text.giftTitle}</div>
          <div style={styles.giftText}>{text.giftContent}</div>
        </div>

        {/* 3. 卡片区 */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <div style={styles.iconBox}><IconBolt size="large" style={{color:'#38bdf8'}} /></div>
            <h3 style={styles.cardTitle}>{text.card1}</h3>
            <p style={styles.cardDesc}>{text.card1_desc}</p>
          </div>
          <div style={styles.card}>
            <div style={styles.iconBox}><IconVerify size="large" style={{color:'#818cf8'}} /></div>
            <h3 style={styles.cardTitle}>{text.card2}</h3>
            <p style={styles.cardDesc}>{text.card2_desc}</p>
          </div>
          <div style={styles.card}>
            <div style={styles.iconBox}><IconSafe size="large" style={{color:'#34d399'}} /></div>
            <h3 style={styles.cardTitle}>{text.card3}</h3>
            <p style={styles.cardDesc}>{text.card3_desc}</p>
          </div>
        </div>

        {/* 4. Logo 墙 (使用内联 SVG 组件) */}
        <div style={styles.logoSection}>
          <p style={styles.logoTitle}>{text.trusted}</p>
          <div style={styles.logoGrid}>
            <LogoBox icon={<SvgIcons.OpenAI />} name="OpenAI" />
            <LogoBox icon={<SvgIcons.Claude />} name="Claude" />
            <LogoBox icon={<SvgIcons.Gemini />} name="Gemini" />
            <LogoBox icon={<SvgIcons.MJ />} name="Midjourney" />
            <LogoBox icon={<SvgIcons.DeepSeek />} name="DeepSeek" />
            <LogoBox icon={<SvgIcons.Github />} name="Github" />
            <LogoBox icon={<SvgIcons.Meta />} name="Meta" />
            <LogoBox icon={<SvgIcons.Nvidia />} name="NVIDIA" />
            
            {/* 更多占位符 */}
            <div style={styles.logoBox}>
               <span style={{fontSize:'12px', color:'#94a3b8', fontWeight:'bold'}}>+20</span>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          {text.dev} <code style={styles.code}>https://zxai.zixiang.us</code>
        </div>
      </div>
    </div>
  );
};

// --- 小组件：图标方块 (接收 icon 组件) ---
const LogoBox = ({ icon, name }) => (
  <div style={styles.logoBox} title={name}>
    <div style={{color: '#fff', opacity: 0.9, display:'flex', alignItems:'center', justifyContent:'center'}}>
      {icon}
    </div>
  </div>
);

/**
 * =========================================================================
 * 3. 样式定义
 * =========================================================================
 */
const styles = {
  container: {
    position: 'relative',
    background: '#0B0C15',
    minHeight: 'calc(100vh - 64px)',
    color: '#fff',
    overflow: 'hidden',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  heroGlow: {
    position: 'absolute',
    top: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    height: '600px',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(11, 12, 21, 0) 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerSection: { marginBottom: '50px' },
  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    marginBottom: '20px',
    background: 'linear-gradient(to right, #fff, #a5b4fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subTitle: { fontSize: '1.8rem', fontWeight: 600, color: '#818cf8', marginBottom: '15px' },
  description: { fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' },
  
  giftCapsule: {
    background: 'linear-gradient(90deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    padding: '15px 30px',
    borderRadius: '50px',
    marginBottom: '80px',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
  },
  giftTitle: { fontSize: '0.9rem', color: '#facc15', fontWeight: 'bold', marginBottom: '4px' },
  giftText: { fontSize: '1.1rem', color: '#fff' },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '80px',
    width: '100%',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'left',
    transition: 'transform 0.2s',
  },
  iconBox: { marginBottom: '15px' },
  cardTitle: { color: '#fff', marginBottom: '8px', fontSize: '1.2rem' },
  cardDesc: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' },

  logoSection: {
    width: '100%',
    padding: '40px 0',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  logoTitle: {
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: '30px',
  },
  logoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  logoBox: {
    width: '48px',
    height: '48px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  footer: { marginTop: '60px', color: '#475569', fontSize: '0.9rem' },
  code: { background: '#1e293b', padding: '4px 8px', borderRadius: '4px', color: '#38bdf8', marginLeft: '10px' }
};

export default Home;