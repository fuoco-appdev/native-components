import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M3 5h2V3H3v2Zm4 16h2v-2H7v2ZM9 5H7V3h2v2Zm-2 8h2v-2H7v2Zm-2 8H3v-2h2v2Zm6 0h2v-2h-2v2Zm-6-8H3v-2h2v2Zm-2 4h2v-2H3v2Zm2-8H3V7h2v2Zm6 8h2v-2h-2v2Zm6-4h-2v-2h2v2Zm2-10v18h2V3h-2Zm-2 18h-2v-2h2v2ZM15 5h2V3h-2v2Zm-2 8h-2v-2h2v2Zm-2-8h2V3h-2v2Zm2 4h-2V7h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
