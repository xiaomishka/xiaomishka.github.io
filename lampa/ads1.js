setInterval(() => {
    if (typeof user_data !== "undefined") {
        user_data.premium = Date.now() + 1000 * 60 * 60 * 24 * 365 * 100;
    }
    if (typeof Utils$2 !== "undefined") {
        Utils$2.countDays = () => 9999;
    }
}, 1000);
