// Seasonal encounter system
// Uses real-world date to determine which creatures are available

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonalConfig {
  seasons?: Season[];   // If set, only available in these seasons
  months?: number[];    // If set, only available in these months (1-12)
}

/**
 * Get the current month (1-12) from real date
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1; // getMonth() returns 0-11
}

/**
 * Get the current season based on Northern Hemisphere months
 * Spring: March-May (3-5)
 * Summer: June-August (6-8)
 * Fall: September-November (9-11)
 * Winter: December-February (12, 1-2)
 */
export function getCurrentSeason(): Season {
  const month = getCurrentMonth();

  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter'; // December, January, February
}

/**
 * Check if an encounter is available based on seasonal config
 * If no seasonal config is set, the encounter is always available
 */
export function isAvailableThisSeason(seasonal?: SeasonalConfig): boolean {
  // No seasonal restrictions = always available
  if (!seasonal) return true;

  const currentMonth = getCurrentMonth();
  const currentSeason = getCurrentSeason();

  // Check month restrictions first (more specific)
  if (seasonal.months && seasonal.months.length > 0) {
    if (!seasonal.months.includes(currentMonth)) {
      return false;
    }
  }

  // Check season restrictions
  if (seasonal.seasons && seasonal.seasons.length > 0) {
    if (!seasonal.seasons.includes(currentSeason)) {
      return false;
    }
  }

  return true;
}

/**
 * Get a display string for when an encounter is available
 * Useful for Sharkedex entries
 */
export function getAvailabilityString(seasonal?: SeasonalConfig): string {
  if (!seasonal) return 'Year-round';

  const parts: string[] = [];

  if (seasonal.seasons && seasonal.seasons.length > 0) {
    const seasonNames = seasonal.seasons.map(s =>
      s.charAt(0).toUpperCase() + s.slice(1)
    );
    parts.push(seasonNames.join(', '));
  }

  if (seasonal.months && seasonal.months.length > 0) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months = seasonal.months.map(m => monthNames[m - 1]);
    parts.push(months.join(', '));
  }

  return parts.length > 0 ? parts.join(' / ') : 'Year-round';
}
