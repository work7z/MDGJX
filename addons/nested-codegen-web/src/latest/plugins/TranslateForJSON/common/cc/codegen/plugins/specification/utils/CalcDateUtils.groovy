package cc.codegen.plugins.specification.utils

import org.apache.commons.lang3.StringUtils
import org.apache.commons.lang3.time.DateUtils

class CalcDateUtils {
    public static final long LIMIT_FOR_SECONDS_DESC = 60 * 1000; // 一分钟内称为几秒前
    public static final long LIMIT_FOR_MINUTES_DESC = 60 * 60 * 1000; // 一小时内称为40分钟前
    public static final long LIMIT_FOR_HOUR_DESC = 24 * 60 * 60 * 1000; // 24小时之内称为3小时51分钟前，剩下的都以天数描述，3559天前/39天前之类

    public static String getDateCalcStr(Date oldDate, String lang) {
        long currentTimeMillis = System.currentTimeMillis();
        long oldTimeMiles = oldDate.getTime();
        List<String> timeUnitDescList = new ArrayList<>();
        long diffValueInMiles = currentTimeMillis - oldTimeMiles;
//        System.out.println("init diff " + diffValueInMiles);
        getTimeDescBetweenTwoMiles(diffValueInMiles, timeUnitDescList, lang);
        timeUnitDescList.add(getTimeDesc('ago', lang))
        return StringUtils.join(timeUnitDescList, isEnglishModeLang(lang) ? " " : "");
    }

    public static Date wHourwMinutes(Date oldDate) {
        oldDate = DateUtils.addHours(oldDate, -4);
        oldDate = DateUtils.addMinutes(oldDate, -3);
        oldDate = DateUtils.addSeconds(oldDate, -19);
        return oldDate;
    }

    public static String getTimeDesc(String key, String lang) {
        return timeStrMap[lang][key];
    }

    static def timeStrMap = [
            'zh_CN': [
                    'SECOND': '几秒',
                    'MIN'   : '分钟',
                    'HOUR'  : '小时',
                    'DAY'   : '天',
                    'ago'   : '前'
            ],
            'zh_HK': [
                    'SECOND': '幾秒',
                    'MIN'   : '分鐘',
                    'HOUR'  : '小時',
                    'DAY'   : '天',
                    'ago'   : '前'
            ],
            'en_US': [
                    'SECOND': 'a few seconds',
                    'MIN'   : 'minute',
                    'HOUR'  : 'hour',
                    'DAY'   : 'day',
                    'ago'   : 'ago'
            ]
    ]

    public static void getTimeDescBetweenTwoMiles(long diffValueInMiles, List<String> timeUnitDescList, String lang) {
        long remainValueInMiles = 0;
        if (diffValueInMiles <= 0) {
            return;
        }
        if (diffValueInMiles < LIMIT_FOR_SECONDS_DESC) {
            if (timeUnitDescList.size() == 0) {
                timeUnitDescList.add(getTimeDesc('SECOND', lang));
            } else {
                return;
            }
        } else if (diffValueInMiles < LIMIT_FOR_MINUTES_DESC) {
            long crtMinutesValue = diffValueInMiles / 1000 / 60;
            timeUnitDescList.add(('' + judgeTime(crtMinutesValue, lang)));
            timeUnitDescList.add(getTimeDesc('MIN', lang) + appendixVal(crtMinutesValue, lang))
        } else if (diffValueInMiles < LIMIT_FOR_HOUR_DESC) {
            long l = diffValueInMiles / 1000 / 60 / 60;
            timeUnitDescList.add(('' + judgeTime(l, lang)));
            timeUnitDescList.add(getTimeDesc('HOUR', lang) + appendixVal(l, lang))
            remainValueInMiles = diffValueInMiles % (1000 * 60 * 60);
        }
        if (diffValueInMiles > LIMIT_FOR_HOUR_DESC) {
            long l = diffValueInMiles / 1000 / 60 / 60 / 24;
            timeUnitDescList.add(('' + judgeTime(l, lang)));
            timeUnitDescList.add(getTimeDesc('DAY', lang) + appendixVal(l, lang))
        }
        if (remainValueInMiles != 0) {
            getTimeDescBetweenTwoMiles(remainValueInMiles, timeUnitDescList, lang);
        }
    }

    public static String judgeTime(long rawval, String lang) {
        if (isEnglishModeLang(lang)) {
//            if(rawval == 1){
//                return 'a'
//            }else if(rawval == 2){
//                return 'a couple'
//            }
        }
        return '' + rawval;
    }

    private static boolean isEnglishModeLang(String lang) {
        return lang.startsWith("en")
    }

    private static String appendixVal(long crtMinutesValue, String lang) {
        crtMinutesValue > 1 && lang.startsWith("en") ? 's' : ''
    }

    static void main(String[] args) {
        Date date = Calendar.getInstance().getTime();
        date.setTime(1643441249190);
        println getDateCalcStr(date, 'zh_CN')
        println getDateCalcStr(date, 'en_US')
    }
}
