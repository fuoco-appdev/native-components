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
      d="M6.85 7.08c0 .64.13 1.19.39 1.67.032.063.076.133.118.2L7.39 9H12c-.64-.22-1.03-.45-1.41-.7-.49-.33-.74-.73-.74-1.21 0-.23.05-.45.15-.66.1-.21.25-.39.44-.55.19-.15.43-.27.72-.36.29-.09.64-.13 1.03-.13.4 0 .76.06 1.06.16.3.11.55.25.75.44.2.19.35.41.44.68.1.26.15.54.15.85h3.01c0-.66-.13-1.26-.38-1.81s-.61-1.03-1.08-1.43a4.94 4.94 0 0 0-1.69-.94c-.67-.23-1.4-.34-2.21-.34-.79 0-1.52.1-2.18.29-.65.2-1.22.48-1.7.83-.48.36-.85.79-1.11 1.29-.27.51-.4 1.06-.4 1.67ZM21 10v2.02h-3.87c.06.1.12.22.17.33.21.47.31 1.01.31 1.61 0 .64-.13 1.21-.38 1.71s-.61.93-1.07 1.27c-.46.34-1.02.6-1.67.79-.65.19-1.38.28-2.18.28-.48 0-.96-.05-1.44-.13a7.82 7.82 0 0 1-1.38-.39 5.69 5.69 0 0 1-1.22-.65c-.38-.26-.7-.57-.98-.92-.28-.36-.49-.76-.65-1.21-.16-.45-.24-1.03-.24-1.58h2.97c0 .45.11.9.25 1.21.14.31.34.56.59.75.25.19.56.33.91.42.35.09.75.13 1.18.13.38 0 .72-.05 1.01-.13.29-.09.52-.2.71-.35.19-.15.33-.33.42-.53.09-.21.14-.43.14-.66 0-.26-.04-.49-.11-.69-.08-.21-.22-.4-.43-.57-.21-.17-.5-.34-.87-.51a6.617 6.617 0 0 0-.269-.098A8.948 8.948 0 0 1 12.62 12H3v-2h18Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
