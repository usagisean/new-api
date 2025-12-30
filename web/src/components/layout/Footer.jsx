import React, { useEffect, useState, useMemo, useContext } from 'react';
// 移除了 useTranslation，因为我们要强制英文
import { getFooterHTML, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName() || 'ZX AI Center';
  
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

  useEffect(() => {
    const updateUptime = () => {
      if (!startTime) return;
      const now = Math.floor(Date.now() / 1000);
      const duration = now - startTime;
      const days = Math.floor(duration / 86400);
      const hours = Math.floor((duration % 86400) / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;
      
      // 修改为极客风简写: 12d 5h 30m 20s
      setUptime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    updateUptime();
    const timer = setInterval(updateUptime, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const customFooter = useMemo(
    () => (
      <footer className='relative h-auto py-8 px-6 w-full flex flex-col items-center justify-center overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-[1110px] gap-2 select-none'>
          
          <div className='flex flex-wrap items-center gap-3 justify-center'>
            
            {/* Copyright 部分 - 纯英文 */}
            <span className='footer-text'>
              Copyright © {currentYear} {systemName}. All Rights Reserved.
            </span>
            
            <span className='hidden md:inline text-gray-700'>|</span>

            {/* 技术支持 - 纯英文 */}
            <span className='footer-text'>
              Powered by 
              <a
                href='#' 
                target='_blank' 
                rel='noopener noreferrer'
                className='ml-1 footer-link'
              >
                ZX Tech
              </a>
            </span>

            {/* 运行时长 - 纯英文 + 极客简写 */}
            {uptime && (
              <>
                <span className='hidden md:inline text-gray-700'>|</span>
                
                <div className='flex items-center cursor-help' title='System Operational'>
                  {/* 呼吸灯容器 */}
                  <div className="status-dot-container">
                    <div className="status-dot"></div>
                  </div>
                  
                  {/* Uptime: 10d 2h 30m 15s */}
                  <span className='footer-text font-mono' style={{ fontSize: '13px' }}>
                    System Uptime: {uptime}
                  </span>
                </div>
              </>
            )}
            
          </div>
        </div>
      </footer>
    ),
    [systemName, currentYear, uptime],
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