export const isIos = ({userAgent, maxTouchPoints}: Navigator): boolean =>
    /ipad|iphone|ipod|mac/i.test(userAgent) ||
    (/^((?!chrome|android).)*safari/i.test(userAgent) && maxTouchPoints > 1);
