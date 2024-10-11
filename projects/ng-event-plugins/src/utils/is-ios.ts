export const isIos = ({userAgent, maxTouchPoints}: Navigator): boolean =>
    /ipad|iphone|ipod/i.test(userAgent) ||
    (/^((?!chrome|android).)*safari/i.test(userAgent) && maxTouchPoints > 1);
