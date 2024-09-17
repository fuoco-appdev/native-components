import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 6V2L7 7l5 5V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Zm-2.44 8.49h.45c.21 0 .37-.05.48-.16.11-.11.16-.25.16-.43a.538.538 0 0 0-.15-.39.418.418 0 0 0-.18-.11.935.935 0 0 0-.25-.04.78.78 0 0 0-.22.03.4.4 0 0 0-.18.1c-.05.05-.09.09-.12.15s-.05.13-.05.2h-.85a1.06 1.06 0 0 1 .41-.85c.13-.1.27-.18.44-.23.17-.05.35-.08.54-.08.21 0 .41.03.59.08s.33.13.46.23.23.23.3.38c.07.15.11.33.11.53a.842.842 0 0 1-.17.52 1.1 1.1 0 0 1-.48.39c.24.09.42.21.54.39.12.18.18.38.18.61 0 .2-.04.38-.12.53a1.1 1.1 0 0 1-.32.39c-.14.1-.29.19-.48.24-.19.05-.38.08-.6.08-.18 0-.36-.02-.53-.07-.17-.05-.33-.12-.46-.23-.13-.11-.25-.23-.33-.38-.08-.15-.12-.34-.12-.55h.85c0 .08.02.15.05.22.03.07.07.12.13.17.06.05.12.09.2.11.08.02.16.04.25.04.1 0 .19-.01.27-.04a.561.561 0 0 0 .33-.3c.03-.07.04-.15.04-.24 0-.11-.02-.21-.05-.29a.508.508 0 0 0-.36-.31c-.09-.02-.18-.04-.29-.04h-.47v-.65Zm5.74.75c0 .32-.03.6-.1.82-.07.22-.17.42-.29.57-.12.15-.28.26-.45.33-.17.07-.37.1-.59.1-.22 0-.41-.03-.59-.1s-.33-.18-.46-.33c-.13-.15-.23-.34-.3-.57-.07-.23-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82.07-.22.17-.42.29-.57.12-.15.28-.26.45-.33.17-.07.37-.1.59-.1.22 0 .41.03.59.1s.33.18.46.33c.13.15.23.34.3.57.07.23.11.5.11.82v.74Zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31a.389.389 0 0 0-.19-.17.655.655 0 0 0-.5 0c-.07.03-.14.09-.19.17-.05.08-.09.18-.12.31s-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32c.05.08.11.14.19.17s.16.05.25.05.18-.02.25-.05c.07-.03.14-.09.19-.17.05-.08.09-.19.11-.32.03-.13.04-.29.04-.48v-.97h.01Z" />
  </Svg>
)

export default Icon
