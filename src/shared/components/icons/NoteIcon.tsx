interface NoteIconProps {
  width?: number
  height?: number
  checked?: boolean
}

export default function NoteIcon({ width, height, checked = false }: NoteIconProps) {
  if (checked) {
    return (
      <svg width={width ?? 165} height={height ?? 177} viewBox="0 0 165 177" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M70.9725 15.7289L32.3666 26.0734C18.3632 29.8256 12.407 40.2096 16.1715 54.259L28.9215 101.843C32.7478 116.122 43.0487 121.953 57.052 118.201L95.658 107.856C109.887 104.044 115.662 93.9056 111.836 79.6258L99.0861 32.0421C95.3216 17.9927 85.2016 11.9163 70.9725 15.7289Z" fill="url(#paint0_linear_388_2845)"/>
        <g filter="url(#filter0_f_388_2845)">
          <rect x="44.5542" y="101.601" width="61.5873" height="52.1528" rx="16.7915" transform="rotate(-105 44.5542 101.601)" fill="#8237FF" fillOpacity="0.5"/>
        </g>
        <path d="M107.277 39.7525C114.756 39.7525 120.661 41.9096 124.694 45.9927C128.726 50.0748 130.81 56.0025 130.81 63.3853V112.648C130.81 120.148 128.727 126.089 124.693 130.155C120.658 134.221 114.753 136.329 107.277 136.329H67.3091C59.9475 136.329 54.0427 134.22 49.979 130.157C45.9152 126.093 43.771 120.153 43.771 112.648V63.3853C43.7711 55.9981 45.9167 50.0718 49.978 45.9918C54.04 41.9113 59.9438 39.7525 67.3091 39.7525H107.277Z" fill="#BA90FF" fillOpacity="0.35" stroke="url(#paint1_linear_388_2845)" strokeWidth="1.19939" strokeLinecap="round" strokeLinejoin="round"/>
        <g filter="url(#filter2_d_388_2845)">
          <mask id="path-4-inside-1_388_2845" fill="white">
            <path d="M68.5971 105.879H105.985C107.887 106.07 109.323 107.691 109.323 109.646C109.322 111.549 107.887 113.175 105.985 113.366H68.5971C67.1665 113.557 65.783 112.841 65.0199 111.649C64.257 110.41 64.2571 108.836 65.0199 107.643C65.783 106.404 67.1664 105.736 68.5971 105.879ZM105.984 84.1278C108.034 84.1278 109.703 85.802 109.704 87.8524C109.704 89.9031 108.034 91.5722 105.984 91.5722H68.5961C66.5408 91.5721 64.8764 89.903 64.8764 87.8524C64.8765 85.802 66.5409 84.1279 68.5961 84.1278H105.984ZM82.85 62.5292C84.9054 62.5292 86.5746 64.1983 86.5746 66.244C86.5746 68.3471 84.9054 70.0165 82.85 70.0165H68.5961C66.5409 70.0164 64.8765 68.3473 64.8764 66.2968C64.8764 64.2462 66.5408 62.5771 68.5961 62.5771V62.5292H82.85Z"/>
          </mask>
          <path d="M68.5971 105.879H105.985C107.887 106.07 109.323 107.691 109.323 109.646C109.322 111.549 107.887 113.175 105.985 113.366H68.5971C67.1665 113.557 65.783 112.841 65.0199 111.649C64.257 110.41 64.2571 108.836 65.0199 107.643C65.783 106.404 67.1664 105.736 68.5971 105.879ZM105.984 84.1278C108.034 84.1278 109.703 85.802 109.704 87.8524C109.704 89.9031 108.034 91.5722 105.984 91.5722H68.5961C66.5408 91.5721 64.8764 89.903 64.8764 87.8524C64.8765 85.802 66.5409 84.1279 68.5961 84.1278H105.984ZM82.85 62.5292C84.9054 62.5292 86.5746 64.1983 86.5746 66.244C86.5746 68.3471 84.9054 70.0165 82.85 70.0165H68.5961C66.5409 70.0164 64.8765 68.3473 64.8764 66.2968C64.8764 64.2462 66.5408 62.5771 68.5961 62.5771V62.5292H82.85Z" fill="url(#paint2_linear_388_2845)"/>
          <path d="M68.5971 105.879L68.5493 106.356L68.5732 106.359H68.5971V105.879ZM105.985 105.879L106.033 105.401L106.009 105.399H105.985V105.879ZM109.323 109.646L109.802 109.646V109.646H109.323ZM105.985 113.366V113.846H106.009L106.033 113.843L105.985 113.366ZM68.5971 113.366V112.886H68.5652L68.5337 112.891L68.5971 113.366ZM65.0199 111.649L64.6113 111.901L64.6159 111.908L65.0199 111.649ZM65.0199 107.643L65.4241 107.902L65.4285 107.895L65.0199 107.643ZM109.704 87.8524H110.183V87.8524L109.704 87.8524ZM68.5961 91.5722L68.5961 92.0519H68.5961V91.5722ZM64.8764 87.8524L64.3966 87.8524V87.8524H64.8764ZM68.5961 84.1278V83.6481H68.5961L68.5961 84.1278ZM86.5746 66.244H87.0544V66.244L86.5746 66.244ZM68.5961 70.0165L68.5961 70.4963H68.5961V70.0165ZM64.8764 66.2968H64.3966V66.2968L64.8764 66.2968ZM68.5961 62.5771L68.5961 63.0568L69.0759 63.0568V62.5771H68.5961ZM68.5961 62.5292V62.0494H68.1163V62.5292H68.5961Z" fill="url(#paint3_linear_388_2845)" mask="url(#path-4-inside-1_388_2845)"/>
        </g>
        <rect x="99.21" y="111.793" width="65" height="65" rx="32.5" fill="url(#paint4_linear_388_2845)" fillOpacity="0.8"/>
        <path d="M116.937 141.398L128.755 153.932L147.664 135.43" stroke="white" strokeWidth="8.59042" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <filter id="filter0_f_388_2845" x="0.000125885" y="3.8147e-06" width="123.544" height="130.215" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="16.1918" result="effect1_foregroundBlur_388_2845"/>
          </filter>
          <filter id="filter2_d_388_2845" x="46.4568" y="44.5383" width="81.2377" height="86.8494" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="5.99697" dy="5.99697"/>
            <feGaussianBlur stdDeviation="5.99697"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.577356 0 0 0 0 0.359375 0 0 0 0 0.9375 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_388_2845"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_388_2845" result="shape"/>
          </filter>
          <linearGradient id="paint0_linear_388_2845" x1="51.6673" y1="20.9018" x2="76.3527" y2="113.029" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BC94FF"/>
            <stop offset="1" stopColor="#9F66FF"/>
          </linearGradient>
          <linearGradient id="paint1_linear_388_2845" x1="58.0349" y1="51.4637" x2="119.908" y2="120.432" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.25"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_388_2845" x1="106.495" y1="71.7149" x2="56.0731" y2="73.1775" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="paint3_linear_388_2845" x1="71.6517" y1="68.4553" x2="104.689" y2="104.859" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.25"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_388_2845" x1="131.71" y1="111.793" x2="131.71" y2="176.793" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34C759"/>
            <stop offset="1" stopColor="#34C759" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <svg width={width ?? 88} height={height ?? 92} viewBox="0 0 88 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.3148 10.486L21.5775 17.3823C12.2419 19.8837 8.27107 26.8064 10.7808 36.1727L19.2808 67.8952C21.8316 77.415 28.6989 81.302 38.0344 78.8005L63.7717 71.9042C73.2578 69.3624 77.108 62.6037 74.5572 53.0839L66.0571 21.3614C63.5475 11.9951 56.8008 7.94421 47.3148 10.486Z" fill="url(#paint0_linear_388_2435)"/>
      <g filter="url(#filter0_f_388_2435)">
        <rect x="29.7026" y="67.7339" width="41.0582" height="34.7685" rx="11.1944" transform="rotate(-105 29.7026 67.7339)" fill="#8237FF" fillOpacity="0.5"/>
      </g>
      <path d="M71.5176 26.502C76.504 26.502 80.4401 27.94 83.1289 30.6622C85.817 33.3836 87.206 37.335 87.2061 42.2569V75.0987C87.2061 80.0984 85.8182 84.059 83.1289 86.7696C80.4389 89.4806 76.5017 90.8858 71.5176 90.8858H44.8721C39.9644 90.8858 36.0285 89.4797 33.3193 86.7706C30.6102 84.0614 29.1807 80.1016 29.1807 75.0987V42.2569C29.1807 37.3321 30.6108 33.3812 33.3184 30.6612C36.0263 27.9409 39.962 26.502 44.8721 26.502H71.5176Z" fill="#BA90FF" fillOpacity="0.35" stroke="url(#paint1_linear_388_2435)" strokeWidth="0.799597" strokeLinecap="round" strokeLinejoin="round"/>
      <g filter="url(#filter2_d_388_2435)">
        <mask id="path-4-inside-1_388_2435" fill="white">
          <path d="M45.7303 70.5856H70.6561C71.9245 70.7128 72.8816 71.7939 72.8817 73.0973C72.8817 74.3657 71.9245 75.4495 70.6561 75.5768H45.7303C44.7767 75.7038 43.8552 75.227 43.3465 74.4323C42.838 73.6057 42.8379 72.5571 43.3465 71.7623C43.8552 70.9358 44.7767 70.4903 45.7303 70.5856ZM70.6561 56.0856C72.023 56.0858 73.1356 57.202 73.1356 58.569C73.1353 59.9357 72.0228 61.0482 70.6561 61.0485H45.7303C44.3603 61.0484 43.2511 59.9358 43.2508 58.569C43.2508 57.2019 44.3601 56.0856 45.7303 56.0856H70.6561ZM55.2333 41.6862C56.6034 41.6862 57.7156 42.7989 57.7157 44.1627C57.7157 45.5647 56.6035 46.6773 55.2333 46.6774H45.7303C44.3602 46.6773 43.2509 45.5649 43.2508 44.1979C43.2508 42.8308 44.3601 41.7184 45.7303 41.7184V41.6862H55.2333Z"/>
        </mask>
        <path d="M45.7303 70.5856H70.6561C71.9245 70.7128 72.8816 71.7939 72.8817 73.0973C72.8817 74.3657 71.9245 75.4495 70.6561 75.5768H45.7303C44.7767 75.7038 43.8552 75.227 43.3465 74.4323C42.838 73.6057 42.8379 72.5571 43.3465 71.7623C43.8552 70.9358 44.7767 70.4903 45.7303 70.5856ZM70.6561 56.0856C72.023 56.0858 73.1356 57.202 73.1356 58.569C73.1353 59.9357 72.0228 61.0482 70.6561 61.0485H45.7303C44.3603 61.0484 43.2511 59.9358 43.2508 58.569C43.2508 57.2019 44.3601 56.0856 45.7303 56.0856H70.6561ZM55.2333 41.6862C56.6034 41.6862 57.7156 42.7989 57.7157 44.1627C57.7157 45.5647 56.6035 46.6773 55.2333 46.6774H45.7303C44.3602 46.6773 43.2509 45.5649 43.2508 44.1979C43.2508 42.8308 44.3601 41.7184 45.7303 41.7184V41.6862H55.2333Z" fill="url(#paint2_linear_388_2435)"/>
        <path d="M45.7303 70.5856L45.6985 70.9038L45.7144 70.9054H45.7303V70.5856ZM70.6561 70.5856L70.688 70.2673L70.6721 70.2657H70.6561V70.5856ZM72.8817 73.0973H73.2015V73.0973L72.8817 73.0973ZM70.6561 75.5768V75.8966H70.6721L70.688 75.895L70.6561 75.5768ZM45.7303 75.5768V75.2569H45.7091L45.6881 75.2597L45.7303 75.5768ZM43.3465 74.4323L43.0741 74.5999L43.0771 74.6047L43.3465 74.4323ZM43.3465 71.7623L43.616 71.9348L43.6189 71.93L43.3465 71.7623ZM70.6561 56.0856L70.6562 55.7657H70.6561V56.0856ZM73.1356 58.569L73.4554 58.569V58.569H73.1356ZM70.6561 61.0485V61.3683H70.6562L70.6561 61.0485ZM45.7303 61.0485L45.7303 61.3683H45.7303V61.0485ZM43.2508 58.569H42.931L42.931 58.569L43.2508 58.569ZM45.7303 56.0856V55.7657H45.7303L45.7303 56.0856ZM55.2333 41.6862L55.2333 41.3663H55.2333V41.6862ZM57.7157 44.1627H58.0355V44.1627L57.7157 44.1627ZM55.2333 46.6774V46.9972H55.2333L55.2333 46.6774ZM45.7303 46.6774L45.7303 46.9972H45.7303V46.6774ZM43.2508 44.1979H42.931L42.931 44.1979L43.2508 44.1979ZM45.7303 41.7184L45.7303 42.0382L46.0502 42.0382V41.7184H45.7303ZM45.7303 41.6862V41.3663H45.4105V41.6862H45.7303Z" fill="url(#paint3_linear_388_2435)" mask="url(#path-4-inside-1_388_2435)"/>
      </g>
      <defs>
        <filter id="filter0_f_388_2435" x="3.8147e-06" y="3.8147e-06" width="82.3623" height="86.81" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="10.7946" result="effect1_foregroundBlur_388_2435"/>
        </filter>
        <filter id="filter2_d_388_2435" x="30.9711" y="29.6922" width="54.1583" height="57.8989" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="3.99798" dy="3.99798"/>
          <feGaussianBlur stdDeviation="3.99798"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.577356 0 0 0 0 0.359375 0 0 0 0 0.9375 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_388_2435"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_388_2435" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_388_2435" x1="34.4446" y1="13.9345" x2="50.9016" y2="75.3528" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BC94FF"/>
          <stop offset="1" stopColor="#9F66FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_388_2435" x1="38.6896" y1="34.3091" x2="79.9382" y2="80.2878" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.25"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint2_linear_388_2435" x1="70.9965" y1="47.8098" x2="37.382" y2="48.7849" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0.2"/>
        </linearGradient>
        <linearGradient id="paint3_linear_388_2435" x1="47.7677" y1="45.6368" x2="69.7924" y2="69.9061" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.25"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
