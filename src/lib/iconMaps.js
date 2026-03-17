import { Award, Trophy, UserRoundCheck } from 'lucide-react';

const iconMap = {
  award: Award,
  trophy: Trophy,
  'user-round-check': UserRoundCheck,
};

export function resolvePortfolioIcon(icon) {
  if (typeof icon === 'function') {
    return icon;
  }

  return iconMap[icon] || Award;
}
