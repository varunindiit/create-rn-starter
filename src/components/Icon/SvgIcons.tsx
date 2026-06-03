import React from "react";
import Svg, { Path, Circle, Rect, Line, Polygon, G } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
}

/* -------------------------------------------------------- */
/* Navigation / Common                                       */
/* -------------------------------------------------------- */

export const ChevronLeftIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 6l-6 6 6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 15l6-6 6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#94A6B1",
}) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path
      d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#7C7BA4",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#7C7BA4",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 1l22 22"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#7C7BA4",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
    <Path
      d="M20 20l-3.5-3.5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const MoreIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#7C7BA4",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={5} cy={12} r={1.6} fill={color} />
    <Circle cx={12} cy={12} r={1.6} fill={color} />
    <Circle cx={19} cy={12} r={1.6} fill={color} />
  </Svg>
);

export const MenuIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 7h18M3 12h12M3 17h18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M13 5l7 7-7 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FeatherIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#7C7BA4",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8L2 22"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M17.5 15H9"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#22C55E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill={color} />
    <Path
      d="M8.5 12.5l2.4 2.4 4.6-4.6"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CrownIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M6.08 15.82c-.35 0-.74-.28-.86-.61L1.77 5.56c-.49-1.39.08-1.81 1.27-.96l3.25 2.32c.54.38 1.16.19 1.4-.42L9.15 2.6c.46-1.25 1.24-1.25 1.7 0l1.47 3.9c.23.61.85.8 1.38.42l3.05-2.17c1.3-.94 1.93-.46 1.39 1.05l-3.37 9.43c-.13.32-.52.59-.87.59H6.08Z"
      stroke={color}
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.42 18.33h9.16"
      stroke={color}
      strokeWidth={1.3}
      strokeLinecap="round"
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Tab bar                                                   */
/* -------------------------------------------------------- */

export const HomeTabIcon: React.FC<IconProps & { filled?: boolean }> = ({
  size = 24,
  color = "#0B0F2E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.28 2.77C13 1.75 11 1.74 9.73 2.76L3.18 8.01C2.24 8.76 1.67 10.26 1.87 11.44l1.26 7.54C3.42 20.67 4.99 22 6.7 22h10.6c1.69 0 3.29-1.36 3.58-3.03l1.26-7.54c.18-1.17-.39-2.67-1.31-3.42L14.28 2.77ZM12 18.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75Z"
      fill={color}
    />
  </Svg>
);

export const LifemapTabIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#0B0F2E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.32 19.75c-1.16 0-2.17-.7-2.57-1.78-.41-1.08-.11-2.27.76-3.04l7.99-6.99c.48-.42.49-.99.35-1.38-.15-.39-.53-.81-1.17-.81H11.99c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.68c1.16 0 2.17.7 2.57 1.78.41 1.08.11 2.27-.76 3.04l-7.99 6.99c-.48.42-.49.99-.35 1.38.15.39.53.81 1.17.81h2.68c.41 0 .75.34.75.75s-.34.75-.75.75H9.32Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 15c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-3Zm.51 3.5c0-.55.44-1 1-1h.01c.55 0 1 .45 1 1s-.45 1-1.01 1-1-.45-1-1Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.97 5.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5S7.41 2 5.47 2c-1.93 0-3.5 1.57-3.5 3.5Zm2.54 0c0-.55.44-1 1-1h.01c.55 0 1 .45 1 1s-.45 1-1.01 1-1-.45-1-1Z"
      fill={color}
    />
  </Svg>
);

export const ReviewTabIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12h3l2-7 4 14 2-7h7"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileTabIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#0B0F2E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.25 6.75c0 2.57 2.01 4.65 4.63 4.74h.29C14.73 11.4 16.74 9.32 16.75 6.75 16.75 4.13 14.62 2 12 2S7.25 4.13 7.25 6.75Z"
      fill={color}
    />
    <Path
      d="M6.93 14.15c-1.27.85-1.97 2-1.97 3.23 0 1.23.7 2.37 1.96 3.21 1.4.94 3.24 1.41 5.08 1.41 1.84 0 3.68-.47 5.08-1.41 1.26-.85 1.96-1.99 1.96-3.23-.01-1.23-.7-2.37-1.96-3.21-2.79-1.86-7.34-1.86-10.15 0Z"
      fill={color}
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Node types                                                */
/* -------------------------------------------------------- */

export const QuestionIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#7F22FE",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M17.5 10A7.5 7.5 0 1 1 10 2.5 7.5 7.5 0 0 1 17.5 10Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M10.01 14.17h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M7.5 8a2.5 2.5 0 1 1 3.5 2.3c-.8.3-1 .8-1 1.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChoiceIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E60076",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Rect
      x={1.2}
      y={1.2}
      width={10.5}
      height={9.6}
      rx={1.6}
      stroke={color}
      strokeWidth={1.4}
    />
    <Rect
      x={8.3}
      y={9.2}
      width={10.5}
      height={9.6}
      rx={1.6}
      stroke={color}
      strokeWidth={1.4}
    />
    <Path
      d="M10.5 13.5l1.6 1.6 3.2-3.2"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.8 3.8l5.2 5.2M9 3.8L3.8 9"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

export const RecoveryIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#00A63E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M16.67 10.83c0 4.17-2.92 6.25-6.39 7.46-.18.06-.38.06-.56 0-3.48-1.2-6.39-3.29-6.39-7.46V5c0-.46.37-.83.83-.83 1.67 0 3.75-1 5.2-2.27.36-.31.9-.31 1.26 0 1.46 1.28 3.54 2.27 5.2 2.27.46 0 .83.37.83.83v5.83"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 10l1.67 1.67 3.33-3.34"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SingleStepIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#0069A8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M6.67 4.17H17.5M10.83 10H17.5M10.83 15.83H17.5M2.5 8.33c0 .92.75 1.67 1.67 1.67h2.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 4.17v10c0 .92.75 1.67 1.67 1.67h2.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GuardrailIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#F54900",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M16.67 10.83c0 4.17-2.92 6.25-6.39 7.46-.18.06-.38.06-.56 0-3.48-1.2-6.39-3.29-6.39-7.46V5c0-.46.37-.83.83-.83 1.67 0 3.75-1 5.2-2.27.36-.31.9-.31 1.26 0 1.46 1.28 3.54 2.27 5.2 2.27.46 0 .83.37.83.83v5.83"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TriggerIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#C10007",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={8.3} stroke={color} strokeWidth={1.25} />
    <Path
      d="M13.09 12.65L10.51 11.11c-.45-.27-.82-.91-.82-1.43V6.26"
      stroke={color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Profile / Settings                                        */
/* -------------------------------------------------------- */

export const CardIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={5}
      width={20}
      height={14}
      rx={2.5}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path d="M2 10h20" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <Path
      d="M6 15h2M11 15h4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.27 21a2 2 0 0 0 3.46 0"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.26 15.33c-.27.3-.34.72-.18 1.08.16.36.52.59.92.59h16c.4 0 .76-.23.92-.59.16-.36.09-.78-.18-1.08-1.33-1.37-2.74-2.83-2.74-7.33A6 6 0 0 0 12 2a6 6 0 0 0-6 6c0 4.5-1.41 5.96-2.74 7.33Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CountryIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={11}
      width={18}
      height={11}
      rx={2.5}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const PrivacyIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ReceiptIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l3-2 2 2 2-2 2 2 2-2 3 2Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 8h8M8 12h6" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

export const ProfileAvatarIcon: React.FC<IconProps> = ({
  size = 56,
  color = "#1B2148",
}) => (
  <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <Circle cx={28} cy={28} r={28} fill={color} />
    <Circle cx={28} cy={22} r={7} fill="#4A3E78" />
    <Path
      d="M14 46c1.6-7 7.4-12 14-12s12.4 5 14 12"
      fill="#4A3E78"
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Subscription                                              */
/* -------------------------------------------------------- */

export const InfinityIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 10.7c3.3 0 4.7-5.4 8-5.4 1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7c-3.3 0-4.7-5.4-8-5.4-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const NodesIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 2v4"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Circle cx={8} cy={8} r={2} stroke={color} strokeWidth={1.4} />
    <Path
      d="M8 10v4"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

export const BoltIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M2.67 9.33c-.26 0-.49-.15-.6-.38-.11-.23-.08-.5.08-.7L8.75 1.45c.1-.12.27-.15.4-.08.14.07.21.23.17.38l-1.28 4.02c-.07.2-.05.43.08.6.12.18.33.29.55.29h4.66c.26 0 .49.15.6.38.11.23.08.5-.08.7L7.25 14.55c-.1.12-.27.15-.4.08-.14-.07-.21-.23-.17-.38l1.28-4.02c.07-.2.05-.43-.08-.6-.12-.18-.33-.29-.55-.29H2.67Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M13.3 8.67c0 3.33-2.33 5-5.1 5.96-.14.05-.3.05-.44 0-2.78-.96-5.1-2.63-5.1-5.96V4c0-.37.3-.67.67-.67 1.33 0 3-.8 4.16-1.81.29-.25.72-.25 1.01 0 1.17 1.02 2.83 1.81 4.16 1.81.37 0 .67.3.67.67v4.67"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 8l1.33 1.33L10 6.67"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChartIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M3.33 14v-4M8 14V2M12.67 14V6"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

export const TemplateIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#A294E8",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Rect x={2} y={2} width={12} height={4.7} rx={0.8} stroke={color} strokeWidth={1.4} />
    <Rect x={2} y={9.3} width={6} height={4.7} rx={0.8} stroke={color} strokeWidth={1.4} />
    <Rect x={10.67} y={9.3} width={3.33} height={4.7} rx={0.8} stroke={color} strokeWidth={1.4} />
  </Svg>
);

/* -------------------------------------------------------- */
/* Home / category cards                                     */
/* -------------------------------------------------------- */

export const SunriseIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 18a5 5 0 0 0-10 0M12 2v3M4.2 10.2l2.1 2.1M2 18h2M20 18h2M17.7 12.3l2.1-2.1M19 6l-2 2M7 8 5 6M3 22h18"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeartIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoonIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 7.5l.5-1.5.5 1.5L16.5 8l-1.5.5-.5 1.5-.5-1.5L12.5 8z"
      fill={color}
    />
  </Svg>
);

export const SmileIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.6} />
    <Path
      d="M8 14s1.5 2 4 2 4-2 4-2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Circle cx={9.2} cy={10} r={0.9} fill={color} />
    <Circle cx={14.8} cy={10} r={0.9} fill={color} />
  </Svg>
);

/* -------------------------------------------------------- */
/* MasterCard                                                */
/* -------------------------------------------------------- */

export const MastercardIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <Svg width={size * 1.5} height={size} viewBox="0 0 32 22" fill="none">
    <Circle cx={11} cy={11} r={9} fill="#EB001B" />
    <Circle cx={21} cy={11} r={9} fill="#F79E1B" />
    <Path
      d="M16 4.6a8.97 8.97 0 0 1 0 12.8 8.97 8.97 0 0 1 0-12.8Z"
      fill="#FF5F00"
    />
  </Svg>
);

export const VisaIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <Svg width={size * 1.5} height={size} viewBox="0 0 32 22" fill="none">
    <Rect x={0} y={0} width={32} height={22} rx={3} fill="#1A1F71" />
    <Path
      d="M12.4 8.4l-1.9 5.5h-1.5l-.93-3.6c-.06-.22-.1-.3-.27-.39-.28-.14-.74-.27-1.14-.36l.04-.15h2.43c.31 0 .59.2.66.55l.5 2.65 1.23-3.2h1.47Zm5.78 3.7c0-1.43-1.98-1.51-1.97-2.15.01-.2.2-.41.61-.46.21-.03.79-.05 1.44.25l.24-1.13c-.35-.13-.81-.25-1.37-.25-1.44 0-2.46.77-2.47 1.86-.01.81.73 1.27 1.28 1.54.57.28.76.45.76.7-.01.38-.45.55-.87.56-.74.01-1.16-.2-1.5-.36l-.26 1.17c.35.16 1 .3 1.66.31 1.54 0 2.55-.76 2.56-1.94Zm3.83 1.8h1.36l-1.18-5.5h-1.25c-.28 0-.52.16-.62.42l-2.21 5.08h1.54l.31-.85h1.88l.17.85Zm-1.63-2.02l.77-2.13.45 2.13h-1.22Zm-6.16-3.48l-1.21 5.5h-1.46l1.21-5.5h1.46Z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const VisaCardIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <Svg width={size * 1.5} height={size} viewBox="0 0 32 22" fill="none">
    <Path
      d="M14.6 14.9h-2L14 7.2h2l-1.4 7.7Zm7.3-7.5c-.4-.16-1-.32-1.8-.32-2 0-3.4 1.06-3.42 2.58-.01 1.12 1 1.74 1.77 2.11.79.38 1.05.62 1.05.96-.01.52-.62.76-1.2.76-.79 0-1.22-.12-1.88-.4l-.26-.13-.28 1.74c.47.21 1.34.4 2.24.41 2.13 0 3.5-1.05 3.52-2.66.01-.89-.52-1.56-1.68-2.12-.71-.36-1.14-.6-1.14-.97 0-.32.36-.66 1.14-.66.65-.01 1.12.14 1.49.3l.18.09.27-1.67ZM26.2 7.2h-1.55c-.48 0-.84.14-1.05.65l-2.98 7.05h2.11l.42-1.16h2.58l.24 1.16h1.86L26.2 7.2Zm-2.45 4.95c.17-.45.8-2.18.8-2.18-.01.02.16-.45.27-.74l.13.67s.39 1.85.47 2.25h-1.67ZM12.5 7.2 10.42 12.47l-.22-1.13c-.39-1.3-1.6-2.7-2.95-3.4l1.9 6.95h2.13L14.66 7.2H12.5Z"
      fill="#1A1F71"
    />
    <Path
      d="M8.59 7.2H5.34l-.04.16c2.54.65 4.22 2.2 4.92 4.07L9.5 7.85c-.12-.5-.48-.64-.92-.65Z"
      fill="#F7B600"
    />
  </Svg>
);

export const CameraIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.5 4h5l1.5 2.5h3.5A1.5 1.5 0 0 1 21 8v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5V8a1.5 1.5 0 0 1 1.5-1.5H8L9.5 4Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={13} r={3.5} stroke={color} strokeWidth={1.6} />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 7h16"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <Path
      d="M10 4.5h4a1 1 0 0 1 1 1V7H9V5.5a1 1 0 0 1 1-1Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 7v11a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 18 18V7"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 11v5.5M13.5 11v5.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const DownloadIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CloudUploadIcon: React.FC<IconProps> = ({
  size = 28,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 18a4.5 4.5 0 1 1 .39-8.98A6 6 0 0 1 19.5 11 4 4 0 0 1 18 18.86"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12v7M9 14.5l3-3 3 3"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PersonAvatarIcon: React.FC<IconProps> = ({
  size = 56,
  color = "#F0BFA0",
}) => (
  <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <Circle cx={28} cy={20} r={8} fill={color} />
    <Path
      d="M11 44c2-7.5 9.3-12 17-12s15 4.5 17 12v3H11v-3Z"
      fill={color}
    />
  </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={5}
      width={18}
      height={16}
      rx={2.5}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path
      d="M3 10h18M8 3v4M16 3v4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const ActivityIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 12h-4l-3 9L9 3l-3 9H2"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MessageIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.5 8.5 0 0 1 4 12a8.38 8.38 0 0 1 8.5-8.5A8.38 8.38 0 0 1 21 11.5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShieldKeyIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5 11.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm2.5 0v3"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

export const AtSignIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.6} />
    <Path
      d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.6} />
    <Circle cx={12} cy={10} r={3} stroke={color} strokeWidth={1.6} />
    <Path
      d="M5.5 19c1.3-3 3.9-4.5 6.5-4.5s5.2 1.5 6.5 4.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const MailIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={5}
      width={18}
      height={14}
      rx={2.5}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path
      d="m4 7 8 6 8-6"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.29-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.57 2.79.7A2 2 0 0 1 22 16.92Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SimChipIcon: React.FC<IconProps> = ({
  size = 28,
  color = "#FFD08C",
}) => (
  <Svg width={size * 1.4} height={size} viewBox="0 0 36 26" fill="none">
    <Rect
      x={1}
      y={1}
      width={34}
      height={24}
      rx={4}
      fill={color}
      opacity={0.95}
    />
    <Path
      d="M1 8h14M1 18h14M21 8h14M21 18h14M14 1v24M22 1v24"
      stroke="rgba(0,0,0,0.18)"
      strokeWidth={1.1}
    />
    <Rect
      x={14}
      y={8}
      width={8}
      height={10}
      rx={1.4}
      stroke="rgba(0,0,0,0.18)"
      strokeWidth={1}
      fill={color}
    />
  </Svg>
);

export const WifiContactlessIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 8c2.5 1.5 4 4 4 4s-1.5-2.5-4-4ZM11 5c4.5 2.5 7 7 7 7s-2.5-4.5-7-7ZM14 2c6.5 3.5 10 10 10 10S20.5 5.5 14 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Constellation / Decorative                                */
/* -------------------------------------------------------- */

export const ConstellationDecor: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({ width = 220, height = 100, color = "rgba(255,255,255,0.55)" }) => (
  <Svg width={width} height={height} viewBox="0 0 220 100" fill="none">
    <Circle cx={20} cy={50} r={2} fill={color} />
    <Circle cx={60} cy={20} r={2} fill={color} />
    <Circle cx={110} cy={45} r={2.4} fill={color} />
    <Circle cx={160} cy={20} r={2} fill={color} />
    <Circle cx={200} cy={50} r={2} fill={color} />
    <Circle cx={140} cy={70} r={1.6} fill={color} />
    <Line
      x1={20}
      y1={50}
      x2={60}
      y2={20}
      stroke={color}
      strokeWidth={0.8}
    />
    <Line
      x1={60}
      y1={20}
      x2={110}
      y2={45}
      stroke={color}
      strokeWidth={0.8}
    />
    <Line
      x1={110}
      y1={45}
      x2={160}
      y2={20}
      stroke={color}
      strokeWidth={0.8}
    />
    <Line
      x1={160}
      y1={20}
      x2={200}
      y2={50}
      stroke={color}
      strokeWidth={0.8}
    />
    <Line
      x1={110}
      y1={45}
      x2={140}
      y2={70}
      stroke={color}
      strokeWidth={0.8}
    />
  </Svg>
);

export const FileTextIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 3v5h5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 13h8M8 17h8M8 9h2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const HeadphonesIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 14v-2a8 8 0 0 1 16 0v2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M4 14h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm16 0h-3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/* -------------------------------------------------------- */
/* Habit Flow / Routine Map icons                            */
/* -------------------------------------------------------- */

export const XCircleIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={8.4} stroke={color} strokeWidth={1.4} />
    <Path
      d="M7 7l6 6M13 7l-6 6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export const CheckCircleSmallIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={8.4} stroke={color} strokeWidth={1.4} />
    <Path
      d="M6.6 10.3l2.3 2.3 4.5-4.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const XCircleOutlineIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#2C1A0E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={8.4} stroke={color} strokeWidth={1.4} />
    <Path
      d="M7 7l6 6M13 7l-6 6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PencilEditIcon: React.FC<IconProps> = ({
  size = 14,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14.06 4.94l5 5L8.5 20.5H3.5v-5L14.06 4.94z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 6.5l5 5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BedWindIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 7c2.5 0 5 0 5 2.5S5 12 3 12M14 5c3 0 5 0 5 2.7S16 10.5 13 10.5M3 17c3.5 0 7.5 0 7.5 2.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12c0-.55.45-1 1-1h12c2.76 0 5 2.24 5 5v4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const InstagramSquareIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={5}
      stroke={color}
      strokeWidth={1.7}
    />
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.7} />
    <Circle cx={17.2} cy={6.8} r={1.1} fill={color} />
  </Svg>
);

export const ShowerIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11c1.5-2.5 4-4 7-4M21 11c-1.5-2.5-4-4-7-4M12 4v3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 11h14"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M8 15l-1 3M12 15l-1 3M16 15l-1 3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const CoffeeIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10h13v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 11h2.5a2.5 2.5 0 0 1 0 5H16"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 3c0 1 1 1.5 1 2.5S7 6.5 7 7.5M11 3c0 1 1 1.5 1 2.5S11 6.5 11 7.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 7v10M15 7v10"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M5 9v6M19 9v6M3 11v2M21 11v2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path d="M9 12h6" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

export const FlagIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 21V4M5 4h11l-2 4 2 4H5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RefreshIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.5 12a8.5 8.5 0 0 1 14.7-5.8M20.5 12a8.5 8.5 0 0 1-14.7 5.8"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polygon points="18,2 19,7 14,6" fill={color} />
    <Polygon points="6,22 5,17 10,18" fill={color} />
  </Svg>
);

export const ShieldBlockIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CursorPointerIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3l5.4 16 2.2-6.4L19 10.4 5 3Z"
      fill={color}
      stroke={color}
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </Svg>
);

export const ZoomInIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
    <Path
      d="M20 20l-3.5-3.5M11 8v6M8 11h6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const ZoomOutIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
    <Path
      d="M20 20l-3.5-3.5M8 11h6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const StarTwinkleIcon: React.FC<IconProps> = ({
  size = 14,
  color = "rgba(255,255,255,0.7)",
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <G>
      <Path d="M8 1v14M1 8h14" stroke={color} strokeWidth={0.8} strokeLinecap="round" />
      <Circle cx={8} cy={8} r={1.6} fill={color} />
    </G>
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.14 12.94a7.5 7.5 0 0 0 0-1.88l2.03-1.58a.5.5 0 0 0 .11-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.34 7.34 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.88 2h-3.76a.5.5 0 0 0-.5.42l-.36 2.54c-.59.23-1.14.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.72 8.48a.5.5 0 0 0 .11.64l2.03 1.58a7.5 7.5 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.11.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.49.39 1.04.71 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.76a.5.5 0 0 0 .5-.42l.36-2.54c.59-.23 1.14-.55 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.11-.64l-2.03-1.58Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.5} />
  </Svg>
);

export const LogoutIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 17l-5-5 5-5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 12H5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const HomeOutlineIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-4V14h-7v7.5h-4A1.5 1.5 0 0 1 3 20v-9.5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MapOutlineIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#BCA0CB",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 4v14M15 6v14"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const SparkleIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#A78BFA",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3 13.5 9.5 20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3Z"
      fill={color}
    />
  </Svg>
);

export const CarIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 16V11l2-5h10l2 5v5"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 16h18v3a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3Z"
      stroke={color}
      strokeWidth={1.7}
      strokeLinejoin="round"
    />
    <Circle cx={7.5} cy={16} r={1.2} fill={color} />
    <Circle cx={16.5} cy={16} r={1.2} fill={color} />
  </Svg>
);

export const PinIcon: React.FC<IconProps> = ({
  size = 14,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z"
      stroke={color}
      strokeWidth={1.7}
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={10} r={2.5} stroke={color} strokeWidth={1.7} />
  </Svg>
);

export const SwapVerticalIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 4v16M7 4l-3 3M7 4l3 3"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 20V4M17 20l-3-3M17 20l3-3"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const UserOutlineIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.7} />
    <Path
      d="M4.5 20c1.4-3.5 4.4-5.5 7.5-5.5s6.1 2 7.5 5.5"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
    />
  </Svg>
);

export const ArrowRightSmallIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#9A9A9A",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FunnelIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#2C1A0E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4.5 5.25c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25 0 .31-.12.61-.33.84l-5.42 5.97a1.5 1.5 0 0 0-.39 1v5.13c0 .43-.22.83-.58 1.06l-2.5 1.6a.75.75 0 0 1-1.16-.63V13.06a1.5 1.5 0 0 0-.39-1L4.83 6.09a1.25 1.25 0 0 1-.33-.84Z"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GalleryIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#FFFFFF",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={4}
      width={18}
      height={16}
      rx={3}
      stroke={color}
      strokeWidth={1.6}
    />
    <Circle cx={9} cy={10} r={1.6} stroke={color} strokeWidth={1.6} />
    <Path
      d="M4 17l4.5-4.5a2 2 0 0 1 2.8 0L16 17m-1.5-2.2 1.7-1.7a2 2 0 0 1 2.8 0L21 14.6"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#9A9A9A",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} />
    <Path
      d="M12 7v5l3 2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LocateIcon: React.FC<IconProps> = ({
  size = 22,
  color = "#2C1A0E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M12 2v3M12 19v3M2 12h3M19 12h3"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={12} r={1.4} fill={color} />
  </Svg>
);

export const CircleXIcon: React.FC<IconProps> = ({
  size = 18,
  color = "#9A9A9A",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill={color} />
    <Path
      d="M9 9l6 6M15 9l-6 6"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const SmokingIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={14}
      width={16}
      height={4}
      rx={1}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path d="M14 14v4" stroke={color} strokeWidth={1.6} />
    <Path
      d="M17 4c0 2 2 2 2 4M20 6c0 2 2 2 2 4M19 12v2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const PawIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={6.5} cy={9} r={1.8} fill={color} />
    <Circle cx={17.5} cy={9} r={1.8} fill={color} />
    <Circle cx={9.5} cy={5.5} r={1.6} fill={color} />
    <Circle cx={14.5} cy={5.5} r={1.6} fill={color} />
    <Path
      d="M12 11.5c-3.5 0-6 3-6 5.5 0 2 1.7 3 3 3 1 0 1.8-.5 3-.5s2 .5 3 .5c1.3 0 3-1 3-3 0-2.5-2.5-5.5-6-5.5Z"
      fill={color}
    />
  </Svg>
);

export const WomanIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={5} r={2.5} stroke={color} strokeWidth={1.6} />
    <Path
      d="M9 14h6l-2-6h-2l-2 6Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
    <Path
      d="M10 14v5M14 14v5M10 17h4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const SnowflakeIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M9 4l3 3 3-3M9 20l3-3 3 3M4 9l3 3-3 3M20 9l-3 3 3 3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlugIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 2v4M15 2v4"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M7 6h10v5a5 5 0 0 1-5 5 5 5 0 0 1-5-5V6Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
    <Path d="M12 16v6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const LuggageIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={5}
      y={7}
      width={14}
      height={13}
      rx={2}
      stroke={color}
      strokeWidth={1.6}
    />
    <Path
      d="M9 7V4h6v3M9 12v4M15 12v4M5 20v1M19 20v1"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

export const MusicIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18V5l11-2v13"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={6.5} cy={18} r={2.5} stroke={color} strokeWidth={1.7} />
    <Circle cx={17.5} cy={16} r={2.5} stroke={color} strokeWidth={1.7} />
  </Svg>
);

export const UsbIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#E87C3E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22V8M12 8l-3 3M12 8l3 3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={5} r={3} stroke={color} strokeWidth={1.6} />
    <Path
      d="M9 15l-3-2v-2M15 17l3-1v-3"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GlobeIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#2C1A0E",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} />
    <Path
      d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
