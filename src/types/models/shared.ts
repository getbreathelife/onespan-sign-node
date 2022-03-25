/**
 * Timezone IDs as defined in the {@link https://www.iana.org/time-zones | Time Zone Database}.
 *
 * @remarks
 * - {@link https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/configuring-time-zones | Configuring time zones}
 *
 * - {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones | List of tz database time zones (Wikipedia)}
 */
export type TimeZoneId = string;

/**
 * String in date-time notation as defined by {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339, section 5.6}
 */
export type DateTimeString = string;

/**
 * Custom data embedded into parent object
 */
export type CustomData = Record<string, any>;
