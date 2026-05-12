export default function BearIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="120"
      height="120"
      aria-label="くまさんのイラスト"
      role="img"
    >
      {/* 耳 */}
      <circle cx="38" cy="30" r="14" fill="#8B6914" />
      <circle cx="82" cy="30" r="14" fill="#8B6914" />
      {/* 耳の内側 */}
      <circle cx="38" cy="30" r="9" fill="#E8A87C" />
      <circle cx="82" cy="30" r="9" fill="#E8A87C" />
      {/* 頭 */}
      <circle cx="60" cy="55" r="30" fill="#A0792A" />
      {/* 体 */}
      <ellipse cx="60" cy="96" rx="24" ry="18" fill="#A0792A" />
      {/* 顔の白い部分 */}
      <ellipse cx="60" cy="62" rx="16" ry="13" fill="#D4A574" />
      {/* 目 */}
      <circle cx="51" cy="50" r="4" fill="#2C1810" />
      <circle cx="69" cy="50" r="4" fill="#2C1810" />
      {/* 目のハイライト */}
      <circle cx="52.5" cy="48.5" r="1.5" fill="white" />
      <circle cx="70.5" cy="48.5" r="1.5" fill="white" />
      {/* 鼻 */}
      <ellipse cx="60" cy="59" rx="5" ry="4" fill="#2C1810" />
      {/* 口 */}
      <path
        d="M54 65 Q60 71 66 65"
        stroke="#2C1810"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* ほっぺ */}
      <circle cx="43" cy="60" r="6" fill="#FF9E9E" opacity="0.65" />
      <circle cx="77" cy="60" r="6" fill="#FF9E9E" opacity="0.65" />
    </svg>
  )
}
