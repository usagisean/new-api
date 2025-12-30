import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@douyinfe/semi-ui';
import { getFooterHTML, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status'; // 重新引入状态上下文

const FooterBar = () => {
  const { t } = useTranslation();
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName() || 'ZX AI Center';
  
  // 获取服务器状态，拿到启动时间
  const [statusState] = useContext(StatusContext);
  const startTime = statusState?.status?.start_time || 0;

  const [uptime, setUptime] = useState('');

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const currentYear = new Date().getFullYear();

  // --- 核心逻辑：计算运行时长 ---
  useEffect(() => {
    const updateUptime = () => {
      // 如果没有获取到启动时间，就不显示
      if (!startTime) return;

      const now = Math.floor(Date.now() / 1000);
      const duration = now - startTime;

      const days = Math.floor(duration / 86400);
      const hours = Math.floor((duration % 86400) / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      // 格式化输出：例如 "5天 12小时 30分 45秒"
      setUptime(`${days} ${t('天')} ${hours} ${t('小时')} ${minutes} ${t('分')} ${seconds} ${t('秒')}`);
    };

    // 立即执行一次
    updateUptime();
    
    // 每秒刷新一次
    const timer = setInterval(updateUptime, 1000);

    return () => clearInterval(timer);
  }, [startTime, t]);

  const customFooter = useMemo(
    () => (
      <footer className='relative h-auto py-8 px-6 w-full flex flex-col items-center justify-center overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-[1110px] gap-2'>
          <div className='flex flex-wrap items-center gap-2 justify-center'>
            
            {/* 版权信息 */}
            <Typography.Text className='text-sm !text-semi-color-text-1'>
              © {currentYear} {systemName} {t('版权所有')}
            </Typography.Text>
            
            <span className='hidden md:inline text-gray-400'>|</span>

            {/* 技术支持 */}
            <Typography.Text className='text-sm !text-semi-color-text-1'>
              Powered by 
              <a
                href='#' 
                target='_blank' 
                rel='noopener noreferrer'
                className='ml-1 !text-semi-color-primary font-medium no-underline hover:underline'
              >
                ZX Tech
              </a>
            </Typography.Text>

            {/* --- 新增：运行时长模块 --- */}
            {uptime && (
              <>
                <span className='hidden md:inline text-gray-400'>|</span>
                <div className='flex items-center select-none cursor-help' title={`系统已稳定运行 ${uptime}`}>
                  {/* CSS 呼吸灯小绿点 */}
                  <span className="relative flex h-2.5 w-2.5 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  
                  <Typography.Text className='text-sm !text-semi-color-text-1 font-mono'>
                    {t('已运行')}: {uptime}
                  </Typography.Text>
                </div>
              </>
            )}
            
          </div>
        </div>
      </footer>
    ),
    [systemName, t, currentYear, uptime],
  );

  useEffect(() => {
    loadFooter();
  }, []);

  return (
    <div className='w-full'>
      {footer ? (
        <div className='custom-footer' dangerouslySetInnerHTML={{ __html: footer }}></div>
      ) : (
        customFooter
      )}
    </div>
  );
};

export default FooterBar;